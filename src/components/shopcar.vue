<template>
  <div>
    <!-- 购物车清单列表 -->
    <section id="jd-shop-cart" v-show="prodList.length">
      <div class='header'>
        <div class="weui-check__hd_in-checkbox" @click='all()'>
          <img class="icon" src="../image/radio_off.png" v-show="!isAll"></img>
          <img class="icon" src="../image/radio_on.png" v-show="isAll"></img>
          <span>全选</span>
        </div>
        <span class='del' @click='delShopCar()'>删除</span>
      </div>
      <div class="cart-list">
        <div class="cart-item">
          <ul>
            <li v-for="(item,index) in prodList">
                            <span class="checkbox" @click="radioChecked(index,item)">
                                <img class="icon" v-if="item.status" src="../image/radio_on.png" alt="checkbox">
                                <img class="icon" v-else src="../image/radio_off.png" alt="checkbox">
                            </span>
              <div class="p-img">
                <img :src="item.img_icon" alt="prod-img"/>
              </div>
              <div class="product-info">
                <a class="p-name" href="#" v-text="item.name"></a>
                <span>¥{{item.price}}</span>
                <div class="mui-numbox">
                  <button class="mui-btn mui-btn-numbox-minus" :disabled="item.num == 1" type="button"
                          @click="lessShopCar(index)">-
                  </button>
                  <input class="mui-input-numbox" disabled="false" type="number" v-model="item.num">
                  <button class="mui-btn mui-btn-numbox-plus" type="button" @click="plusShopCar(index)">+</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <div class='car_empty' v-show="!prodList.length">
      <img src="../image/cart-null.png" class="cart-image"/>
      <div>购物车空空如也</div>
    </div>
    <div class='footer' v-show="totalPrice">
      <span class="total-val"> 总计:</span>
      <span class='total-price'> ￥{{$store.getters.getTotalPrice}}</span>
      <span class='go-pay' @click='placeOrder'>去结算</span>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue';
  import Toast from 'mint-ui';
  import {MessageBox} from 'mint-ui';

  export default {
    name: "shopcar",
    data() {
      return {
        isAll: false,  // 是否全选
        prodList: [],
        totalPrice: 0,
      }
    },
    created() {
      // var cartCache = this.$store.state.shopCartList;
      console.log(this.$store.state.shopCartList)
      // var total = localStorage.getItem("cartPrice");
      // if(total){
      this.prodList = this.$store.state.shopCartList;
      // this.totalPrice = parseFloat(total);
      // }

    },

    methods: {
      // 减
      lessShopCar(index) {
        let productList = this.prodList;
        var prod = productList[index];
        if (prod.num >= 1) {
          prod.num--;
          var total = this.totalPrice - parseFloat(prod.price);
          total = total.toFixed(2);
          this.totalPrice = parseFloat(total);
          this.prodList = productList;
          this.saveCartData(prod, -1);
        }

      },

      // 添加购物车商品
      plusShopCar(index) {
        let productList = this.prodList;
        var prod = productList[index];
        if (prod.num >= 999) {
          return;
        }
        prod.num++;
        var total = this.totalPrice + parseFloat(prod.price);
        total = total.toFixed(2);
        this.prodList = productList;
        this.totalPrice = parseFloat(total);
        this.saveCartData(prod, 1);
      },
      // 全选
      all() {
        let cartList = this.prodList;
        for (var i in cartList) {
          cartList[i].status = !this.isAll;
        }
        this.prodList = cartList,
          this.isAll = !this.isAll
      },
      // 单选
      radioChecked(index, item) {
        item.status = !item.status;
        let count = 0;
        this.prodList.forEach(item => {
          if (item.status) {
            count++;
          }
        })
        // for (var i in this.prodList) {
        //   if (this.prodList[i].status) {
        //     count++;
        //   }
        // }
        this.isAll = count == this.prodList.length ? true : false;
        Vue.set(this.prodList, index, item);
      },
      // 删除商品
      delShopCar() {
        MessageBox.confirm('确定删除?').then((success) => {
          this.removeCache();
        })
      },
      removeCache() {
        this.prodList = [];
        this.totalPrice = 0;
        this.isAll = false;
        this.$store.commit("removeCart");
        localStorage.removeItem("cartData");
        localStorage.removeItem('cartPrice');
        localStorage.removeItem('cartAmount');
        localStorage.removeItem('addCartTime');
      },
      //缓存购物车数据
      saveCartData(curProduct, amount) {
        // 更新购物车
        let cartList = [];
        let cartCache = localStorage.getItem("cartData");
        if (cartCache) {
          cartList = JSON.parse(cartCache);
        }
        var mark = false;
        if (cartList.length != 0) {
          // 将有规格的商品 单独处理
          for (var i = 0; i < cartList.length; i++) {
            if (cartList[i].key_id + cartList[i].spec_name == curProduct.key_id + curProduct.spec_name) {
              mark = true;
              cartList[i].num = cartList[i].num + amount;
              if (cartList[i].num == 0) {
                cartList.splice(i, 1);
              }
              break;
            }
          }
          if (!mark) {
            cartList.push(curProduct);
          }
        } else {
          cartList.push(curProduct);
        }
        var num = localStorage.getItem("cartAmount") || 0;
        var cartPrice = localStorage.getItem("cartPrice") || 0;
        num = parseInt(num) + amount;
        this.$store.commit("shopCartAmount", amount);
        cartPrice = parseFloat(cartPrice) + parseFloat(curProduct.price);
        cartPrice = cartPrice.toFixed(2);
        var date = new Date();
        var time = date.getMonth() + 1 + "-" + date.getDate();
        localStorage.setItem("cartData", JSON.stringify(cartList));
        localStorage.setItem('cartPrice', cartPrice);
        localStorage.setItem('cartAmount', num);
        localStorage.setItem('addCartTime', time);
      },

      // 下单结算
      placeOrder() {
        let productList = this.data.prodList;
        let newProd = [];
        var total = 0;
        for (var i in productList) {
          if (productList[i].status) {
            newProd.push(productList[i]);
            total = total + (parseFloat(productList[i].price) * productList[i].num);
          }
        }
        if (newProd.length == 0) {
          Toast('请选择需要结算的商品!')
          return;
        }

      },
    }

  }
</script>

<style scoped>
  .car_empty {
    margin-top: 100px;
    text-align: center;
    font-size: 16px;
    color: #666;
  }

  .car_empty img {
    width: 86px;
  }

  select, input, img {
    vertical-align: middle;
  }

  header .cart-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-family: sans-serif;
    text-align: center;
    background-color: #f0f0f0;
    font-weight: inherit
  }

  header .hint-text {
    width: 100%;
    height: 35px;
    text-align: center;
    color: #76777a;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    line-height: 35px;
    background-color: #fff
  }

  .line {
    height: 10px;
    background-color: #f0f0f0
  }

  #jd-shop-cart {
    margin-bottom: 20px;
  }

  .header {
    background-color: #fff;
    padding: 10px;
  }

  .header .del {
    float: right;
    font-size: 14px;
    color: #1483d6;
  }

  .cart-list {
    margin-top: 5px;
    background-color: #fff
  }

  .weui-check__hd_in-checkbox {
    display: inline;
    font-size: 15px;
  }

  .weui-check__hd_in-checkbox .icon {
    vertical-align: sub;
  }

  section .c-title {
    height: 35px;
    line-height: 35px;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf
  }

  section .c-title > p {
    margin-left: 40px;
    padding-left: 24px;
    background: url(../image/buy-logo.png) no-repeat left center;
    background-size: 20px 20px
  }

  section .cart-item > ul {
    padding: 0;
  }

  section .cart-item > ul li {
    display: block;
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #dfdfdf;
    position: relative
  }

  section .cart-item > ul li .p-img {
    float: left;
    margin: 10px 10px 0;
    width: 81px;
    height: 81px;
    border: 1px solid #dfdfdf
  }

  section .cart-item > ul li .p-img > img {
    width: 100%;
    height: 100%;
  }

  .checkbox {
    float: left;
    margin-left: 10px;
    width: 42px;
    line-height: 86px;
    text-align: center;
  }

  .icon {
    width: 18px;
  }

  .mui-numbox {
    width: 108px;
    height: 26px;
    padding: 0 36px;
    float: right;
  }

  .mui-numbox [class*=btn-numbox], .mui-numbox [class*=numbox-btn] {
    width: 36px;
  }

  .product-info {
    float: left;
    width: 56%;
    padding-top: 10px;
    font-size: 14px;
  }

  .product-info .p-name {
    height: 38px;
    display: -webkit-box;
    font-size: 15px;
    margin-bottom: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical
  }

  .product-info > p {
    height: 20px;
    line-height: 20px;
    color: #ee3131;
    padding-top: 5px;
    margin-bottom: 5px
  }

  .product-info .product-number {
    font-size: 0
  }

  .product-info .product-number .cart-btn {
    width: 32px;
    height: 26px;
    font-size: 14px;
    border: 1px solid #dfdfdf;
    background-color: #fff
  }

  .product-info .product-number .text-num {
    border-left: none;
    border-right: 0;
    font-size: 14px;
    text-align: center
  }

  .product-info .product-number .text-num:focus {
    border: 1px solid #8fbbfc
  }

  .product-info .product-number [type="button"]:hover {
    background-color: #ddd
  }

  .product-info .product-number .btn-delete {
    width: 50px;
    position: absolute;
    right: 15px;
    color: #ee3131;
    background-color: #fff
  }

  .settle-bottom {
    width: 100%;
    height: 50px;
    background-color: #565555;
    position: fixed;
    bottom: 0
  }

  .check-all {
    width: 80px;
    height: 50px;
    color: #fff;
    line-height: 50px;
    text-align: center
  }

  .settle-bottom .right {
    width: 100px;
    height: 100%;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    background-color: #f04947;
    position: absolute;
    right: 0;
    bottom: 0
  }

  .settle-bottom .right:hover {
    background-color: #e83633
  }

  .del-dialog {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.5)
  }

  .del-hidden {
    display: none
  }

  .del-dialog .confirm {
    width: 78%;
    height: 125px;
    top: 50%;
    left: 11%;
    margin-top: -125px;
    position: absolute;
    text-align: center;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
    z-index: 1002
  }

  .del-dialog .confirm > p {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee
  }

  .del-dialog .confirm .cancel {
    height: 36px;
    width: 45%;
    display: block;
    border: 1px solid #e0e0e0;
    text-align: center;
    line-height: 36px;
    border-radius: 4px;
    font-size: 16px;
    float: left
  }

  .del-dialog .confirm .submit {
    height: 36px;
    width: 45%;
    display: block;
    background: #f15353;
    text-align: center;
    line-height: 36px;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    margin-left: 10%;
    float: left
  }

  .footer {
    position: fixed;
    bottom: 50px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    color: #111;
    font-size: 15px;
    z-index: 10;
    border-top: 1px solid #ddd;
    background-color: #fff;
    transition: ease;
  }

  .footer .total-val {
    margin-left: 15px;
  }

  .freight {
    position: absolute;
    font-size: 12px;
    color: #888;
    bottom: -15px;
    left: 55px;
  }

  .total-price {
    color: #FE3030;
    font-weight: bold;
  }

  .footer .go-pay {
    float: right;
    display: inline-block;
    color: #fff;
    padding: 0 32px;
    height: 45px;
    line-height: 45px;
    background-color: #353535;
  }

  @keyframes upFooter {
    0% {
      bottom: -50px;
    }
    100% {
      bottom: 50px;
    }
  }
</style>
