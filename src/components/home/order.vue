<template>
  <div class='page'>
    <div class='box address'>
      <label class="ship-type" >
        <div class="express" @click="shipType = 2">
          <img v-show="shipType == 2" src="../../image/radio_on.png" alt="radio-img"/>
          <img v-show="shipType == 1" src="../../image/radio_off.png" alt="radio-img"/>
          <span>现在配送</span>
        </div>
        <div class="site" :class="shipType == 2 ? 'eain':'eaout'" @click='selectAddress'>
          <span v-if="!user_address.address">添加收货地址</span>
          <span style='display:inline-block;width: 86%;' v-if="user_address.address">{{ user_address.address }}</span>
          <span class='change'>更换</span>
          <div v-if=" user_address.address ">
            <span style='margin-right:20px;'>{{user_address.name }}</span>
            <span>{{user_address.mobile }}</span>
          </div>
        </div>
      </label>
      <label class="ship-type" >
        <div class="express" style="border-top: 1px solid #ddd;" @click="shipType = 1">
          <img v-show="shipType == 1" src="../../image/radio_on.png" alt="radio-img"/>
          <img v-show="shipType == 2" src="../../image/radio_off.png" alt="radio-img"/>
          <span>放入存货库</span>
        </div>
      </label>
    </div>
    <div class='box orderList'>
      <div class='orderTitle'>
        <img src='../../image/order.png' />
        <span class='title'>购物清单</span>
      </div>
      <div class='prodList'>
        <!-- <div class='category_title'>已选商品</div> -->
        <template v-for="(item,index) in prodList" >
          <div class="weui-media-box  weui-media-box_appmsg" >
            <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <img class="weui-media-box__thumb" :src='item.img_icon' />
            </div>
            <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <div class="weui-cell__bd">{{item.name}}</div>
              <div class='prod_info'>
                <span class="price">￥{{item.price}}</span>
                <span class="amount"> x {{item.num}}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
      <!--<div class='box total_prod'>-->
        <!--<span> 商品总金额: ￥{{totalPrice}} </span>-->
      <!--</div>-->
    </div>

    <div class='box '>
      <div class='leave_msg'>
        <div class='item'>
          <span>订单留言 </span>
          <input class='msg' type='text' placeholder='请输入备注信息'></input>
        </div>
      </div>
    </div>

    <!--<div class='bottom'>-->
      <!--<div class='cartPrice'> 应付总金额:-->
        <!--<span style='color:#f21918;'>￥{{ totalPrice }}</span>-->
      <!--</div>-->
      <!--<div class=" cartBtn " @click='submitOrder'>去支付</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: "order",
    data() {
      return {
        user_address: {
          id	:	197,
          key_id	:	25884969867935975,
          name	:	"张三",
          members_key_id	:	25879293162685086,
          mobile	:	18116728806,
          province	:	"福建省",
          city	:	"福州市",
          district	:	"平潭县",
          address	:	"福建省福州市平潭县新港中路397号",
          status	:	1,
          addtime	:	1542941119,
          origin_province	:	1250,
          origin_city	:	1251,
          origin_district	:	1263,
        },
        prodList: [
          {
            "img_icon": "http://img.store.v-union.cn/pics/2018/25845749652652465/pro/201847/1542764161449.png",
            "name": "天使之翼 白18K金灵动耳钉",
            "num": 3,
            "package_type": 2,
            "price": 0.01,
            "sale_unit": "元",
            "sku_keyid": "25902690315800027",
            "spec_info": [],
            "spec_name": "",
            "stock_num": "0.00",
            "stop_sale": 1,
            "unit_price": 0
          }
        ],
        shipType: 2,
        totalPrice: 0,
        totalNum: 0,
        msgInfo: "",
        myCoupon: {
          couponList: [],
        },
        coupon: {
          gwqmoneystart: '请选择优惠券'
        },
        isCoupon: false, // 显示优惠券
        totalPrice: 0,
      }
    },
    created() {

    },

    methods:{

      // 获取默认地址
      getDefaultAddress() {
        var locateList = wx.getStorageSync("myAddress");
        // console.log("默认地址===",locateList)
        if (locateList.length == 0) {
          this.getMyAddress();
        } else {
          var curAddress = this.setAddress(locateList);
          // console.log(curAddress)
          curAddress.address = curAddress.province + curAddress.city + curAddress.district + curAddress.address;
          this.setData({
            user_address: curAddress
          })
        }
      },


      // 修改配送方式
      changeShip(e) {
        // console.log(e.detail.value);
        // console.log(typeof e.detail.value);
        this.setData({
          shipType: parseInt(e.detail.value)
        })
      },

      // 设置地址
      setAddress(locateList) {
        var curAddress = "";
        // 获取默认地址
        for (var i = 0; i < locateList.length; i++) {
          if (locateList[i].status == 1) {
            curAddress = locateList[i];
            break;
          }
        }
        // 获取最近的地址
        if (curAddress == "") {
          curAddress = locateList[0];
          for (var i = 0; i < locateList.length; i++) {
            if (locateList[i].addtime > curAddress.addtime) {
              curAddress = locateList[i];
            }
          }
        }
        return curAddress;
      },

      // 设置订单信息
      setMsgInfo(e) {
        this.setData({
          msgInfo: e.detail.value
        })
      },

      // 选择收货地址
      selectAddress() {
        wx.navigateTo({
          url: '../../me/my_address/address?selected=' + true,
        })
      },

      // 获取当前地址列表
      getMyAddress() {
        app.loading();
        let auth = wx.getStorageSync("auth");
        const url_info = {
          url: 'member/my_address', data: {},
          header: { "Auth": auth }
        }

      },
      // 提交订单支付
      submitOrder(){
        let order_type = this.data.shipType;
        if (order_type == 1 && !this.data.user_address ) {
          app.showMsg("请添加收货地址！")
          return;
        }
        const auth = wx.getStorageSync("auth");
        let goodsList = this.data.prodList;
        const address_id = this.data.user_address.key_id;
        const coupon = this.data.coupon;
        const url_info = {
          url: 'orders/menu_order',
          data: {
            root_id: "25597708681087648",
            goods_car: goodsList,
            api_type : "medium",
            send_type: order_type, //1. 配送  寄存 4
            address_id: address_id,  // 地址的key_id
            member_remark: this.data.msgInfo,  // 备注信息
            shipping_fee: "",   // 运费
            coupon_saved: coupon.gwqmoneystart, // 优惠券金额
            couponId: coupon.key_id,
            origin: 4, //（单店小程序）
          },
          header: { "Auth": auth }
        }

      },

    }
  }
</script>

<style scoped>
  .page {
    font-size: 14px;
  }
  .box {
    padding: 6px 18px;
    background-color: #fff;
    margin-bottom: 10px;
  }
  /* 收货地址信息  */
  .ship-type .express {
    padding: 10px 0;
    font-size: 14px;
    font-weight: bold;
  }
  .site {
    padding: 10px 18px;
    font-weight: 300;
    border-top: 1px solid #ddd;
    font-size: 15px;
  }

  .site.eain {
    animation: slider 0.8s;
  }

  .site.eaout {
    display: none;
  }

  @keyframes slider {
    0% {
      padding: 0;
      opacity: 0;
    }
    100% {
      padding: 10px 18px;
      opacity: 1;
    }
  }

  .site .change {
    float: right;
    color: #00C65D;
  }

  .address.active {
    background-color: #eee;
  }

  .radio {
    display: block;
    padding: 0 10px;
    color: #222;
    font-weight: bold;
    font-size: 16px;
  }

  .radio img {
    width: 20px;
  }

  .add_item img {
    display: inline-block;
    width: 36px;
    height: 36px;
    vertical-align: middle;
  }

  .add_item .add_text {
    font-size: 16px;
    margin-left: 12px;
  }



  .address {
    padding: 10px 15px;
    background-color: #fff;
    margin-bottom: 10px;
    position: relative;
    font-size: 14px;
    border-bottom: 1px dashed #ddd;
  }

  .address.active {
    background-color: #eee;
  }

  .userInfo .tel {
    float: right;
  }

  .address .icon_address {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 45%;
  }

  .add_item img {
    display: inline-block;
    width: 72px;
    height: 72px;
    vertical-align: middle;
  }

  .add_item .add_text {
    font-size: 32px;
    margin-left: 12px;
  }
  .leave_msg input {
    width: 76%;
    display: inline-block;
    border: none;
    margin: 0;
    font-size: 14px;
  }

  /* 购物列表 标题  */
  .orderTitle {
    padding: 10px 0;
  }
  .orderTitle img {
    width: 24px;
    height: 24px;
    position: absolute;
  }

  .orderTitle .title {
    margin-left: 30px;
  }

  .prod_info {
    margin-top: 15px;
  }

  .prod_info .amount {
    float: right;
    color: #888;
    font-size: 14px;
  }

  /* 商品总计  */
  .orderList .total_prod {
    border-top: 1px solid #ddd;
  }

  .total_prod text {
    float: right;
  }

  .myCoupon .coupon_price {
    color: #E21918;
  }

  .bottom {
    height: 50px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 5;
    border-top: 1px solid #ddd;
  }

  .cart {
    height: 70px;
    width: 70px;
    float: left;
    margin: 7px 20px 0 15px;
    position: relative;
  }

  .cartImg {
    height: 70px;
    width: 70px;
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
    top: -5px;
    right: -10px;
  }

  .cartPrice {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
  }

  .cartPriceText {
    height: 30px;
    line-height: 30px;
    color: #999;
    font-size: 14px;
    margin-top: 10px;
    float: left;
  }

  .cartBtn {
    width: 124px;
    height: 25px;
    float: right;
    line-height: 25px;
    font-size: 16px;
    background: #353535;
    color: #fff;
    text-align: center;
  }
  /* 收货地址信息  */
  .address  {
    position: relative;
    font-size: 14px;
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 3px;
  }
  .active{ background-color: #ddd; }
  .userInfo .tel {float: right;}
  .address  .address_info { padding: 10px 15px; border-bottom: 1px solid #ddd; }
  .edit_box { padding: 10px 15px; font-size: 14px; z-index: 100;}
  .address img {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    vertical-align: middle;
  }
  .edit_box .edit_address { float: right; }
  .edit_box .edit_address span { color: #fff; padding: 4px 10px; font-size: 13px; border-radius: 2px;}
  .edit_box .edit_address .edit { margin-right: 10px; background-color: #353535; }
  .edit_box .edit_address .del { background-color: #888; }
</style>
