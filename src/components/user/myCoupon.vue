<template>
  <div class="mui-content">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1" >可使用</mt-tab-item>
      <mt-tab-item id="2" >已使用</mt-tab-item>
      <mt-tab-item id="3" >已过期</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1" name="待使用">
        <!--<mt-cell v-for="n in usable" :title="'待使用 ' + n.gwqname" />-->
        <template v-for="item in usable" >
          <div class="yhq clearfix active" >
            <div class='yhq_l'>
              <div class='yhq_nr' v-if="item.PriceType==0">
                <div class='yhq_je'>
                  <span class='dollar'>￥</span>
                  <span class='price'>{{item.gwqmoneystart}}</span>
                </div>
                <!-- <div class='yhq_tj'>满{{item.limit_ordermoney}}可用</div> -->
              </div>
              <div class='yhq_nr' v-else>
                <div class='yhq_je'>{{item.gwqmoneystart}}折</div>
              </div>
            </div>
            <div class='yhq_m'>
              <div class='name'>{{item.gwqname}}</div>
              <div class='time'>仅限购买钻石系列可用</div>
              <div class='time'>{{item.start_time }} - {{item.end_time }}</div>
            </div>
          </div>
        </template>
        <div class='car_empty' v-show="!usable.length">
          <img src="../../image/empty_cp.png" class="empty-coupon" />
          <div>暂无可使用优惠券</div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2"  name="测试">
        <template v-for="item in useless" >
          <div class="yhq clearfix active" >
            <div class='yhq_l'>
              <div class='yhq_nr' v-if="item.PriceType==0">
                <div class='yhq_je'>
                  <span class='dollar'>￥</span>
                  <span class='price'>{{item.gwqmoneystart}}</span>
                </div>
                <!-- <div class='yhq_tj'>满{{item.limit_ordermoney}}可用</div> -->
              </div>
              <div class='yhq_nr' v-else>
                <div class='yhq_je'>{{item.gwqmoneystart}}折</div>
              </div>
            </div>
            <div class='yhq_m'>
              <div class='name'>{{item.gwqname}}</div>
              <div class='time'>仅限购买钻石系列可用</div>
              <div class='time'>{{item.start_time }} - {{item.end_time }}</div>
            </div>
          </div>
        </template>
        <div class='car_empty' v-show="!useless.length">
          <img src="../../image/empty_cp.png" class="empty-coupon" />
          <div>暂无已使用优惠券</div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3" name="选项">
        <template v-for="item in overtime" >
          <div class="yhq clearfix active" >
            <div class='yhq_l'>
              <div class='yhq_nr' v-if="item.PriceType==0">
                <div class='yhq_je'>
                  <span class='dollar'>￥</span>
                  <span class='price'>{{item.gwqmoneystart}}</span>
                </div>
                <!-- <div class='yhq_tj'>满{{item.limit_ordermoney}}可用</div> -->
              </div>
              <div class='yhq_nr' v-else>
                <div class='yhq_je'>{{item.gwqmoneystart}}折</div>
              </div>
            </div>
            <div class='yhq_m'>
              <div class='name'>{{item.gwqname}}</div>
              <div class='time'>仅限购买钻石系列可用</div>
              <div class='time'>{{item.start_time }} - {{item.end_time }}</div>
            </div>
          </div>
        </template>
        <div class='car_empty' v-show="!overtime.length">
          <img src="../../image/empty_cp.png" class="empty-coupon" />
          <div>暂无已过期优惠券</div>
        </div>
      </mt-tab-container-item>

    </mt-tab-container>

  </div>
</template>

<script>
    import Toast from 'mint-ui';
    import {Indicator} from 'mint-ui';
    export default {
        name: "myCoupon",
        data(){
          return {
            navTab: ["可使用","已使用","已过期"],
            usable: [], // 全部优惠券
            useless: [],
            overtime: [],
            couponList: [],
            curTab: 0,
            selected: "1",
          }
        },
        // data 创建完成
        created(){
          this.getCoupons();
        },
        mounted(){
        },


        methods: {
          getCoupons(){
            this.axios.post('capi/mobile/User/coupon_mine', {}).then((result) => {
              Indicator.close();
              if(result.data.status == 200){
                var coupon = result.data.data;
                // 可用的 过期的 已使用的
                var usable = [],
                  overtime = [],
                  useless = [];
                for (var i = 0; i < coupon.length; i++) {
                  coupon[i].gwqmoneystart = parseFloat(coupon[i].gwqmoneystart);
                  coupon[i].limit_ordermoney = parseFloat(coupon[i].limit_ordermoney);
                  if (coupon[i].PriceType == 1) {
                    coupon[i].gwqmoneystart = parseFloat(coupon[i].gwqmoneystart) * 10;
                  }
                  //可使用的
                  if (!coupon[i].used_time && coupon[i].is_overdue == 0) {
                    usable.push(coupon[i]);
                  } else if (coupon[i].is_overdue == 1) { // 已过期的
                    overtime.push(coupon[i]);
                  } else if (coupon[i].used_time) { // 已使用的
                    useless.push(coupon[i]);
                    usable.push(coupon[i]);
                  }
                }
                // this.couponList = [usable,useless,overtime]
                this.usable = usable;
                this.useless =  useless;
                this.overtime =  overtime;
              }else {
                Toast(result.data.statusText);
              }
            }).catch((err) => {
              Indicator.close();
              console.log(err);
            });
          },
        }
    }
</script>

<style scoped>
  .mint-tab-container {
    margin-top: 8px;
  }
  .mint-navbar .mint-tab-item {
    padding: 12px 0;
  }
  .yhq{ margin:0 15px 10px; padding: 8px 10px;  background:#fff;border-radius: 5px; overflow: hidden;}
  .redeem_code { margin-bottom: 10px; padding: 0 10px; }
  .redeem_code .inp { background-color: #fff; font-size: 15px; padding: 20px 0; }
  .yhq.active { opacity: 0.7;  }

  .redeem_code input {float: left; display: inline-block; width: 72%;  padding: 0 20px;  }
  .redeem_code .inp .btn_red {display: inline-block; width: 20%; text-align: center; color: #333; border-left: 1px solid #ddd; }
  .yhq_l{ float: left; width:85px;text-align: center; line-height: 62px; }
  .yhq_nr{  color:#111;  }
  .yhq_je .dollar { font-size: 14px;  }
  .yhq_je .price{ font-size:26px;}
  .yhq_tj{ font-size:12px;}
  .yhq_m{ width:72%; padding-right:10px;
    float: left; position:relative; color: #565656; }
  /* .yhq_m:before{content:''; height:21px; width:21px; background:#f1f1f1; border-radius:50%; position:absolute;right:-10px; top:-10px;} */
  /* .yhq_m:after{content:''; height:21px; width:21px; background:#f1f1f1; border-radius:50%; position:absolute;right:-10px; bottom:-10px;} */
  .name{ height:24px; line-height:24px;  font-size:15px; color:#333;}
  .time{ height:20px; line-height:20px;  font-size:13px; color:#999;}
  .yhq_r{ width:165px; height:180px; float:right;text-align: center;}
  .toUse{ font-size:14px; background-color: #EDAA00; padding: 8px 10px; border-radius: 15px; color: #fff; line-height:180px; }
  .car_empty {
    margin-top: 100px;
    text-align: center;
    font-size: 14px;
    color: #888;
    z-index: 100;
    opacity: .8;
  }
  .car_empty img {
    width: 64px;
  }
</style>
