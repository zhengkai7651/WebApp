import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home.vue';
import member from '@/components/member.vue';
import shopcar from '@/components/shopcar.vue';
import category from '@/components/category.vue';
import goodsList from '@/components/home/goodsList.vue';
import navbarBlock from '@/components/home/navbarBlock.vue';
import userInfo from '@/components/user/userInfo.vue';
import myAddress from '@/components/user/myAddress.vue';
import feedback from '@/components/user/feedback.vue';
import order from '@/components/home/order.vue';
import myCoupon from '@/components/user/myCoupon.vue';
import vueXTest from '@/components/vueXTest.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },{
      path: '/vueXTest',
      name: 'vueXTest',
      component: vueXTest
    },
    {
      path: '/home',
      name: 'home',
      component: home,
    },

    {
      path: '/member',
      name: 'member',
      component: member
    },
    {
      path: '/shopcar',
      name: 'shopcar',
      component: shopcar
    },
    {
      path: '/category',
      name: 'category',
      component: category
    },
    {
      path: '/home/goodsList/:pid',
      name: 'goodsList',
      component: goodsList
    },
    {
      path: '/home/navbarBlock/:sort_id',
      name: 'navbarBlock',
      component: navbarBlock
    },{
      path: '/home/order',
      name: 'order',
      component: order
    },{
      path: '/user/userInfo',
      name: 'userInfo',
      component: userInfo
    }, {
      path: '/user/myAddress',
      name: 'myAddress',
      component: myAddress
    },{
      path: '/user/feedback',
      name: 'feedback',
      component: feedback
    },{
      path: '/user/myCoupon',
      name: 'myCoupon',
      component: myCoupon
    },
  ],
  linkActiveClass: 'mui-active'
})
