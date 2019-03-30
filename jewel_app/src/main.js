// 导包 查找包的规则
// 1. 找到项目中 node_moduless中根据包名 找对应的vue 文件夹文件中，
// 2. 在node_modules 中找一个叫 package.json的包配置文件
// 3.  在package.json 中 查找一个mian属性 [main属性]

// import Vue from '../node_modules/vue/dist/vue.js'
import Vue from 'vue';
import moment from 'moment';
import Vuex from 'vuex';
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(Vuex);
Vue.use(VueAxios,axios);

// 按需导入 Mint-UI 中的组件
import { Header, Swipe, SwipeItem,Button,Indicator } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
// Vue.component(Indicator.name, Indicator)
// Vue.use(Indicator);
import 'normalize.css';
import 'mint-ui/lib/style.css';
import mui from './lib/mui/css/mui.min.css';
import extra from './lib/mui/css/icons-extra.css';
// 导入自己的router 对象
import router from './router/router.js';
import app from './components/app.vue';

Vue.filter('dateFomat',function(dataStr,pattern = "YY-MM-DD HH:mm:ss"){
    moment(dataStr).format(pattern);
});



// axios默认配置
axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = "https://api.sms.v-union.cn/";  // 默认地址
axios.defaults.headers.common['auth'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.IntcImFwcGlkXCI6XCJ3eDhiMDRhNzM1MmFhZjM4Y2JcIixcImtleV9pZFwiOlwiMjU4NzkyOTMxNjI2ODUwODZcIixcImNvbV9pZFwiOlwiMjU4NzkyOTMxNjI2ODQ1MTBcIixcInJvb3RfaWRcIjpcIjI1ODQ1NzQ5NjUyNjUyNDY1XCIsXCJzZXNzaW9uX2tleVwiOlwiYXpPY1pMZ1hqN3pcXFwvWlpLRElRXFxcL0xjQT09XCIsXCJFWFBcIjoxNTUxOTA2OTgwfSI.OJNYEl4dB7hoIt3PGZv2cSx4C2vs0xsY5DkKCjvLaxWxIcx5uJtVOkdFQAdsnlfE7Q1DSzmsbjxgYhX3oVlyXA';

//交互初始设置
// axios.defaults.baseURL = baseURL;
// axios.defaults.headers.common['auth'] = _tmp?_tmp:'';
// config.data['comkey_id'] = comkey_id?comkey_id:cookie.get('comkey_id');
// config.data['root_id'] = root_id?root_id:cookie.get('root_id');
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest=[function (data) {
//     return Qs.stringify(data)
// }];
// var login = {
// 	template: "<h1>这是login组件, 是使用网页中形式创建的组件</h1>"
// }
//安装 Vue router 路由
//安装 mint-ui
// Vue.use(MintUI);
// const store = new Vuex.Store();
const store = new Vuex.Store({
    state: {
        count: 0,
        base_img_url: "http://img.store.v-union.cn/pics",
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
});
Vue.config.productionTip = false;
var vm = new Vue({
    el: '#zkApp',
    data: {
    },
    store,
    router,
    render: c => c(app),
    // components : {
    //    app
    // }
});

