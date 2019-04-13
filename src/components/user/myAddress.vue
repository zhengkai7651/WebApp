<template>
  <div class='page'>
    <template v-for="(item,index) in user_address" >
      <div class='box address'>
        <div class='address_info' @click='selectAddress'>
          <div class='userInfo'>
            <span class='user'>收货人: {{item.name}} </span>
            <span class='tel'>{{item.mobile}}</span>
          </div>
          <div> 收货地址: {{item.province+item.city+item.district + item.address}}</div>
        </div>
        <div class='edit_box'>
          <label class="radio"  @click='setDefault' v-if="item.status == 1">
            <img src="../../image/radio_on.png"/>默认地址</label>
          <span class='h20'></span>
          <div class='edit_address'>
            <span class='edit' @click='editAddress'>编辑</span>
            <span class='del' @click='delAddress'>删除</span>
          </div>
        </div>
      </div>
    </template>
    <!--<div class='creatAddress'>-->
      <!--<div class='add_item'>-->
        <!--<span class='add_span' @click='new_address'>新增收货地址</span>-->
        <!--<span class='wx_address' > 从微信获取新地址 </span>-->
      <!--</div>-->
    <!--</div>-->
  </div>


</template>

<script>
  export default {
    name: "myAddress",
    data() {
      return {
        selected: false,  // 当前选中
        user_address:[  // 我的地址汇总
          {
            "address": "新港中路397号",
            "addtime": 1542941119,
            "city": "福州市",
            "district": "平潭县",
            "id": 197,
            "key_id": "25884969867935975",
            "members_key_id": "25879293162685086",
            "mobile": "18617856288",
            "name": "张三",
            "origin_city": 1251,
            "origin_district": 1263,
            "origin_province": 1250,
            "province": "福建省",
            "status": 1
          },
          {
            "address": "水城路123号鼓楼",
            "addtime": 1542881003,
            "city": "南京市",
            "district": "雨花台区",
            "id": 193,
            "key_id": "25884969867935837",
            "members_key_id": "25879293162685086",
            "mobile": "18117665201",
            "name": "李四",
            "origin_city": 877,
            "origin_district": 885,
            "origin_province": 876,
            "province": "江苏省",
            "status": 0
          },
        ],
      }
    },

    methods: {
      // 编辑地址
      editAddress(e) {
        let index = e.currentTarget.dataset.index;
        let curAddress = this.data.user_address[index];
        console.log(curAddress)
        onfire.fire('edit_address', curAddress);
        wx.navigateTo({
          url: './edit_address/edit_address?edit=' + index,
        })
      },

      // 删除地址
      delAddress(e) {
        let aresId = e.currentTarget.dataset.aresid;
        const auth = wx.getStorageSync("auth");
        const url_info = {
          url: 'member/delete_address',
          data: { key_id: aresId },
          header: { "Auth": auth }
        }

      },

      // 设置默认值
      setDefault(e) {
        const index = e.currentTarget.dataset.index;
        let userAddress = this.data.user_address;
        userAddress[index].checked = !userAddress[index].checked;
        this.setData({
          user_address: userAddress
        })
      },

      // 新增收货地址
      new_address() {
        wx.navigateTo({
          url: './edit_address/edit_address?edit=' + -1,
        })
      },
      // 选择收货地址
      selectAddress(e) {
        let index = e.currentTarget.dataset.index;
        // let curAddress = this.data.user_address[index];
        // console.log(curAddress)
        if (this.data.selected) {
          // console.log(this.data.user_address[index]);
          let curAddress = this.data.user_address[index];
          curAddress.address = curAddress.province + curAddress.city + curAddress.district + curAddress.address;
          onfire.fire("select_address", curAddress);
          wx.navigateBack({})
        }
      },
      // 获取当前地址列表
      getMyAddress() {
        app.loading();
        let auth = wx.getStorageSync("auth");
        const url_info = {
          url: 'member/my_address',
          data: {},
          header: { "Auth": auth }
        }

      },
    },

  }
</script>

<style scoped>
  .page { padding: 10px; margin-bottom: 50px;background-color: #eee;}
  .creatAddress {
    position: fixed;
    bottom: 0;
    display: block;
    width: 100%;
    font-size: 15px;
    background-color: #fff;
    z-index: 10;
  }
  .creatAddress.active{ background-color: #ddd; }

  .add_item { padding: 10px 15px; text-align: center; }
  .add_item text { display: inline-block; width: 45%; text-align: center; padding: 8px 0;}
  .add_item .add_text {  background-color: #353535; border: 1px solid #353535; color: #fff; }
  .add_item .wx_address { border: 1px solid #aaa; margin-left: 15px;}
  .h20 { display: inline-block; height: 18px; }
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
  .radio img {
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
