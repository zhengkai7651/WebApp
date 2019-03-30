import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../components/home.vue';
import member from '../components/member.vue';
import shopcar from '../components/shopcar.vue';
import category from '../components/category.vue';
import newsList from '../components/home/newsList.vue';
import newsInfo from '../components/home/newsInfo.vue';
import photoList from '../components/home/photoList.vue';
import photoInfo from '../components/home/photoInfo.vue';
import goodsList from '../components/home/goodsList.vue';
import navbarBlock from '../components/home/navbarBlock.vue';

Vue.use(VueRouter);
//路由对象配置
// var router =
//导出路由对象
export default new VueRouter({
    routes: [
        {
          path: '/',
          redirect: '/home',
        },
        {
            path: '/home',
            name: 'home',
            component: home,
        },
        {
            path: '/home/newslist',
            name: 'newsList',
            component: newsList
        },
        {
            path: '/home/newsInfo/:id',
            name: 'newsInfo',
            component: newsInfo
        },
        {
            path: '/home/photoList',
            name: 'photoList',
            component: photoList
        },
        {
            path: '/home/photoInfo/:id',
            name: 'photoInfo',
            component: photoInfo
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
        },

    ],
    linkActiveClass: 'mui-active'
});