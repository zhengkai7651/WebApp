<template>
    <div>
        <!--<transition  @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">-->
            <!--<div class="ball" v-show="ballFlag"></div>-->
        <!--</transition>-->
        <!-- 轮播图组件 -->
        <swiper :banners="product.img_list" :isAuto="true"></swiper>
        <div class="prod-info" v-show="product">
            <div class="p-name">{{ product.name }}</div>
            <span class="p-price">￥{{ product.price }}</span>
            <img class="icon-cart" src="../../image/shop-car.png" alt="cart" @click="isShowSpec = !isShowSpec">
        </div>
        <div class="space"></div>
        <div class="descript" style='text-align:center;' v-if="product.intro">
            <div class='thead'>商品详情</div>
            <div class="img-info" v-html="product.intro">
            </div>
        </div>
        <div class="specMenu"  v-show="isShowSpec">
          <div class="mask" @click="isShowSpec = !isShowSpec"></div>
          <div class='showModal' >
            <div class="cartBox">
              <div class='pro_info'>
                <span class='close' @click='isShowSpec = !isShowSpec'>×</span>
                <img class='pro_img' :src='product.img_icon' ></img>
                <div class='info'>
                  <div class='name'>{{product.name}}</div>
                  <span class='price'>￥{{product.price}}</span>
                  <div class='surplus'>库存 {{product.stock_num}} </div>
                </div>
              </div>
              <div class='cartBd'>
                <div class='edit_num rale'>
                  <span class='span'>数量</span>
                  <div class='amount' >
                    <img class='amountBtn lessBtn' src='../../image/less.png' @click='cartReduce'></img>
                    <input type="number" disabled='true' class='amountIpt' v-model='product.num'></input>
                    <img class='amountBtn plusBtn' src='../../image/plus.png' @click='cardAdd'></img>
                  </div>
                  <div class='line'></div>
                </div>
              </div>
              <div class='select_btn'>
                <span class='btn addCar' @click='addCar'> 加入购物车</span>
                <span class='btn nowShop' @click='nowShop'> 立即购买</span>
              </div>
            </div>
          </div>
        </div>
    </div>



</template>

<script>
    import swiper from '../subComponents/swiper.vue';
    import Toast from  'mint-ui';
    import { Indicator } from 'mint-ui';

    export default {


        name: "goodsList",
        data() {
            return {
                product : '',
                topBanners: [],     // 顶部轮播数据
                isShowSpec: false,
            }
        },
        components: {
            'swiper': swiper
        },
        created(){
            this.getBanners();
            console.log(this.$route.params.pid);
            this.getProduct(this.$route.params.pid);
        },

        methods:{
            // 获取轮播数据
            getBanners(){
                this.axios.post('capi/mobile/index/get_index',{
                    page_keyid : "25879293162684604" // 门店k_id
                }).then((result)=>{
                    console.log('banner=====',result);
                    this.topBanners = result.data.data.block_list.banner_list;

                }).catch((err)=>{
                    console.log(err);
                })
            },
            getProduct(pid){
                Indicator.open();
                this.axios.post('mediumApi/products/detail',{
                    key_id : pid // 门店k_id
                }).then((result) => {
                    Indicator.close();
                    console.log('prod=====',result);
                    if (result.data.status == 200){
                        var prod = result.data.data._product;
                        prod.num = 1;
                        prod.img_list.forEach(item => {
                            console.log(item)
                            item.pic = item.path_m;
                        });
                        prod = this.initProd(prod);
                        prod = this.getSpecInfo(prod);
                        this.product= prod;
                    }else {
                        Toast(result.data.statusText);
                    }
                }).catch((err)=>{
                    Indicator.close();
                    console.log(err);
                });
            },



          initProd(prod) {
                if (prod.spec_info.length != 0) {
                    var defaultId = "";
                    var url = "";
                    for (var i = 0; i < prod.spec_info.length; i++) {
                        for (var j in prod.spec_info[i].guige_value) {
                            prod.spec_info[i].checkId = prod.spec_info[i].guige_value[j].key_id;
                        }
                    }
                    if (prod.spec_info[0].guige_value[0].img_info) {
                        prod.img_icon = this.$store.state.base_img_url + prod.spec_info[0].guige_value[0].img_info[0].path_m;
                    } else {
                        prod.img_icon = this.$store.state.base_img_url + prod.img_list[0].path_m;
                    }
                    if (prod.sku_price) {
                        prod.price = prod.sku_price[prod.default_sku].price
                        prod.stock_num = prod.sku_price[prod.default_sku].stock_num
                    }
                } else {
                    if (prod.img_list.length != 0) {
                        var url = "";
                        for (var i = 0; i < prod.img_list.length; i++) {
                            if (prod.img_list[i].is_list == 2) {
                                url = prod.img_list[i].path_m;
                            }
                        }
                        prod.img_icon = this.$store.state.base_img_url + url;
                    }
                }
                return prod
            },

            // 确定商品规格参数
            getSpecInfo(cur_product) {
                // console.log(cur_product);
                // return;
                let spec_args = []; // 商品规格名称
                let spec_keys = []; // 商品规格 key_id
                let spec_category = [];
                var spec_text = ""; // 规格值
                for (var i in cur_product.spec_info) {
                    if (spec_text != "") {
                        spec_text += ", "
                    }
                    spec_text += cur_product.spec_info[i].name + ":";
                    for (var j in cur_product.spec_info[i].guige_value) {

                        if (cur_product.spec_info[i].guige_value[j].active == true) {
                            // spec_args.push(cur_product.spec_info[i].guige_value[j].name);
                            spec_keys.push({
                                name: cur_product.spec_info[i].guige_value[j].name,
                                key_id: cur_product.spec_info[i].guige_value[j].key_id
                            });
                            spec_text += cur_product.spec_info[i].guige_value[j].name + " ";
                        }
                    }
                    spec_category.push({
                        category_key: cur_product.spec_info[i].key_id,
                        cate_name: cur_product.spec_info[i].name
                    });
                }
                for (var i in spec_category) {
                    spec_category[i]["spec_name"] = spec_keys[i].name
                    spec_category[i]["spec_key"] = spec_keys[i].key_id
                }
                // spec_args = spec_args.join(", ");
                // 添加 购物车中商品规格参数
                cur_product.spec_category = spec_category;
                cur_product.spec_name = spec_text;
                // cur_product.spec_info = {};
                return cur_product;
            },
            //缓存购物车数据
            saveCartData (curProduct, amount){
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
              this.$store.commit("shopCartAmount",num);
              cartPrice = cartPrice + parseFloat(curProduct.price) * num;
              cartPrice = cartPrice.toFixed(2);
              var date = new Date();
              var time = date.getMonth() + 1 + "-" + date.getDate();
              localStorage.setItem("cartData", JSON.stringify(cartList));
              localStorage.setItem('cartPrice', cartPrice);
              localStorage.setItem('cartAmount', num);
              localStorage.setItem('addCartTime', time);
            },
            // 加
            cardAdd() {
              this.product.num = this.product.num + 1;
            },
            // 减
            cartReduce() {
              if(this.product.num > 1){
                this.product.num = this.product.num - 1;
              }
            },
            // 立即购买
            nowShop() {
              this.showSpec();
              this.$router.push("/home/order");
            },

            //添加商品到购物车
            addCar(e) {
              let prod = this.product;
              // console.log(prod);
              if (prod.spec_info.length && !prod.spec_name ) {
                Toast("请选择" + prod.spec_info[i].name + "参数");
              }
              prod.status = false;
              // this.saveCartData(prod,prod.num);
              this.$store.commit("updateCar",prod);
              this.showSpec();
            },
            showSpec() {
              // 将规格中第一个选项默认选中
              this.isShowSpec = !this.isShowSpec;
            },

        }
    }
</script>

<style lang="scss" scoped>
    .ball {
        position: absolute;
        width: 20px;
        height: 20px;
        top: 293px;
        left: 60px;
        background-color: dodgerblue;
        border-radius: 50%;
        z-index: 99;
        transform: translate(88px,230px);
    }
    .prod-info {
        padding: 10px;
        font-size:16px;
        background-color: #fff;
        border-top: 1px solid #eee;
        .p-name{
            margin-bottom: 8px;
        }
        .p-price {
            color: #f31f1e;
        }
        .icon-cart {
            width: 48px;
            float: right;
            padding: 10px;
            margin-top: -10px;
        }
    }
    .space { height: 10px;  background-color: #f8f8f8; }
    .descript {
        background-color: #fff;
        .thead {
            font-size: 16px;
            padding: 10px 0;
            border: 1px solid #eee;
        }
        .img-info {
            text-align: center;
        }
    }
    /* 底部购买菜单  */
    .bottom {
        height: 50px;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 50px;
        background: #fff;
        z-index: 5;
        border-top: 1px solid #ddd;
    }

    .cart {
        height: 35px;
        width: 35px;
        float: left;
        margin: 7px 20px 0 15px;
        position: relative;
    }

    .cartImg {
        height: 35px;
        width: 35px;
    }

    .cartAmount {
        height: 18px;
        width: 18px;
        display: block;
        line-height: 18px;
        text-align: center;
        background: #ff1f49;
        color: #fff;
        font-size: 12px;
        border-radius: 50%;
        position: absolute;
        top: -3px;
        right: -10px;
    }

    .cartPrice {
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 22px;
        margin-top: 10px;
        float: left;
        text-shadow: 0 0 3px #000;
    }

    .cartPriceText {
        height: 30px;
        line-height: 30px;
        color: #999;
        font-size: 14px;
        margin-top: 10px;
        float: left;
    }
    .addcart {
        position:fixed;
        height: 50px;
        line-height: 50px;
        left:0;
        right:0;
        bottom:0px;
        color: #fff;
        text-align: center;
        font-size: 16px;
        background-color: #353535;
    }
    /* 底部 选购商品  */
    .cartBtn {
        width: 222px;
        height: 50px;
        float: right;
        line-height: 50px;
        font-size: 16px;
        color: #fff;
        text-align: center;
    }
    .addShop {
        background-color: #353535;
    }



    .bottom .user {
        background-color: #fff;
        display: inline-block;
        position: relative;
        height: 100%;
        padding: 5px 10px;
        text-align: center;
    }

    .bottom view image {
        width: 28px;
        height: 28px;
    }

    .bottom view .user_text {
        display: inline-block;
        position: absolute;
        font-size: 12px;
        color: #333;
        left: 12px;
        bottom: 10px;
    }

    /* modal 弹出窗口  */
    .showMoadl {
        width: 100%;
        height: 100%;
    }
    .mask {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        z-index: 10;
    }
    .cartBox {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        z-index: 100;
        animation: bottomUp 0.6s;
    }

    .pro_info {
        position: relative;
        padding: 12px 15px;
        border-bottom: 1px solid #eee;
    }
    .pro_info .info {
        display: inline-block;
        margin-left: 20px;
        width: 62%;
    }
    .pro_info .info .price {
        font-size: 16px;
        color: #232323
    }
    .pro_info .info .surplus {
        font-size: 14px; color: #666;
    }
    .pro_info img {
        width:86px;
        height:86px;
        border: 1px solid #ddd;
        vertical-align: top;
    }
    .pro_info .prod_text {
        margin-top: 10px;
        padding-right: 24px;
        font-size: 14px;
        color: #353535;
        font-weight: bold;
    }
    .pro_info .name {
        font-size: 16px;
        height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .pro_info .prod_text .price {
        font-size: 16px;
        font-weight: bold;
    }
    .hist_price {
        color: #999;
        font-size: 14px;
        margin-left: 5px;
        text-decoration: line-through;
    }
    .cartBoxTitle .del {
        font-size: 12px;
        float: right;
        color: #888;
        height: 14px;
        line-height: 14px;
    }

    .cartBoxTitle image {
        height: 26px;
        width: 26px;
        float: left;
        margin: 2px 10px 0 0;
    }

    .cartBd {
        display: block;
        overflow: auto;
        max-height: 560px;
        font-size: 14px;
    }

    .close {
        font-size: 20px;
        color: #888;
        width: 26px;
        height: 26px;
        text-align: center;
        line-height: 24px;
        position: absolute;
        right: 8px;
        top: 10px;
        border-radius: 50%;
        border: 1px solid #eee;
    }


    /*  购买 购物车按钮  */
    .select_btn {
        width: 100%;
        font-size: 16px;
        border-top: 1px solid #eee;
    }

    .select_btn > .btn {
        display: inline-block;
        width: 50%;
        color: #fff;
        text-align: center;
        height: 45px;
        line-height: 45px;
    }
    .select_btn .sumPrice {
        display: inline-block;
        width: 44%;
        color: #55504f;
        height: 45px;
        line-height: 45px;
    }

    .select_btn .addCar {
        background-color: #b3b3b3;
    }

    .select_btn .nowShop {
        background-color: #353535;
        float: right;
    }

    .specil {
        padding: 0 15px;
    }

    .specil .title {
        padding-bottom: 12px;
        color: #333;
    }

    .specil  .args text {
        display: inline-block;
        font-size: 26px;
        padding: 4px 26px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        border-radius: 3px;
        border: 1px solid #ccc;
        margin-right: 20px;
        margin-bottom: 24px;
    }
    .specil  .args text.active {
        color: #353535;
        border-color: #353535;

    }

    .specil_list {
        padding-top: 12px;
        border-bottom: 1px solid #eee;
    }
    .deposit{
        padding: 0 15px;
        color: #383838;
        font-size: 12px;
    }
    /* 编辑数量  */
    .edit_num {
        position: relative;
        width: 100%;
        padding: 12px;
        color: #333;
    }
    .edit_num .text{padding-left: 15px;}
    .edit_num .addCart {
        position: absolute;
        width: 36px;
        height: 24px;
        right: 15px;
    }

    .hint-msg { padding: 7px 0; border-top: 1px solid #eee;}
    /* .line { position: absolute; width: 250px; height: 1px; bottom: 0; background-color: #eee; left: -30px; right: 0;} */
    /* 编辑数量  */
    .amount{display:block; height:50px;  position: absolute; right: 10px; top: 9px;}
    .select_spec { font-size: 12px; background: #F55E0C; padding: 3px 10px; border-radius: 15px; color: #fff; }
    .amountBtn{ height:24px; width:24px; padding:0; margin:0; float:left; cursor:pointer; }
    .amountIpt{ height:24px; line-height: 24px; border:none; margin-top: 2px; outline:none; width: 32px; float: left; color:#353535; text-align: center;font-size: 16px; font-weight: bold; padding: 0; }
    .amount_none .amountIpt,.amount_none .lessBtn{display:none}


    @keyframes bottomUp {
        0% {
            bottom: -500px;
        }
        100% {
            bottom: 0;
        }
    }

</style>
