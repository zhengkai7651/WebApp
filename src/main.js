// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import moment from 'moment';
import Vuex from 'vuex';
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(Vuex);
Vue.use(VueAxios,axios);

// 按需导入 Mint-UI 中的组件
import { Header, Swipe, SwipeItem,TabContainer,TabContainerItem,Cell,Button,Navbar, TabItem } from 'mint-ui'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Cell.name, Cell);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
// Vue.component(Indicator.name, Indicator)
// Vue.use(Indicator);
import 'normalize.css';
import 'mint-ui/lib/style.css';
import mui from './lib/mui/css/mui.min.css';
import extra from './lib/mui/css/icons-extra.css';
// 导入自己的router 对象
import app from './components/app.vue';

Vue.filter('dateFomat',function(dataStr,pattern = "YY-MM-DD HH:mm:ss"){
  moment(dataStr).format(pattern);
});

// axios默认配置
axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = "https://api.sms.v-union.cn/";  // 默认地址
axios.defaults.headers.common['auth'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.IntcImFwcGlkXCI6XCJ3eDhiMDRhNzM1MmFhZjM4Y2JcIixcImtleV9pZFwiOlwiMjU4NzkyOTMxNjI2ODUwODZcIixcImNvbV9pZFwiOlwiMjU4NzkyOTMxNjI2ODQ1MTBcIixcInJvb3RfaWRcIjpcIjI1ODQ1NzQ5NjUyNjUyNDY1XCIsXCJzZXNzaW9uX2tleVwiOlwiYXpPY1pMZ1hqN3pcXFwvWlpLRElRXFxcL0xjQT09XCIsXCJFWFBcIjoxNTUxOTA2OTgwfSI.OJNYEl4dB7hoIt3PGZv2cSx4C2vs0xsY5DkKCjvLaxWxIcx5uJtVOkdFQAdsnlfE7Q1DSzmsbjxgYhX3oVlyXA';



var cartData = JSON.parse(localStorage.getItem("cartData") || '[]');


// VueX store
const store = new Vuex.Store({
  state: {
    count: 0,
    shopCartList: cartData,  // 购物车数据列表
    cartAmount: 0,    // 购物车总数量
    base_img_url: "http://img.store.v-union.cn/pics", // 全局的base 图片地址
  },

  mutations: {
    // 在mutations 的函数列表中，最多支持连个参数,其中,参数1: 是state 状态;
    // 参数2: 通过commit提交过来的 形参
    increment (state,a) {
      // console.log(a,b)
      state.count+= a;
    },

    subtract (state,b) {
      state.count-= b;
    },

    // 更新购物车数据
    updateCar(state,prod){
      // 1. 如果购物车 不存在 push 加入商品添加
      // 2. 如果存在 增加数量即可

      //查询购物车中是否存在这个商品
      var flag = false;
      state.shopCartList.some(item => {
        if(item.key_id == prod.key_id){
          item.num += prod.num;
          flag = true;
          return true;
        }
      })
      if(!flag) {
        state.shopCartList.push(prod);
      }

      localStorage.setItem("cartData",JSON.stringify(state.shopCartList));

    },
    // 更新购物车总数量
    shopCartAmount (state,count) {
      state.cartAmount = state.cartAmount + count;
    },
    // 删除购物车
    removeCart (state) {
      state.cartAmount = 0;
      state.shopCartList = [];
    },
  },

  // 注意: 这里的 getters 只负责 提供数据 不负责修改数据
  getters: {
    // 计算购物车总数
    getCount(state){
      var c = 0;
      state.shopCartList.forEach(item => {
        c = c + item.num;
      })
      return c;
    },
    // 计算购物车总价格
    getTotalPrice(state){
      var p = 0;
      state.shopCartList.forEach(item => {
        p = p + (item.num * item.price);
      })
      return p;
    },

  }
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
var vm =new Vue({
  el: '#app',
  store,
  router,
  render: c => c(app)
  // components: { App },
  // template: '<App/>'
})
vm.$mount();
