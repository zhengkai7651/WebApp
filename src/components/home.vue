<template>
    <div class="index-container">
        <!-- 轮播图组件 -->
        <swiper :banners="topBanners" :isAuto="false" v-show="topBanners.length"></swiper>
        <!--<mt-swipe :auto="3000">-->
            <!--<mt-swipe-item v-for="banner in topBanners" :key="banner.key_id">-->
                <!--<img :src=" $store.state.base_img_url + banner.pic" alt="silder-img">-->
            <!--</mt-swipe-item>-->
        <!--</mt-swipe>-->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9" v-show="menu_grids.length">
                <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3" v-for="menu in menu_grids" :key="menu.key_id" v-if="menu.key_id != '25932594394694472'">
                    <router-link :to="'/home/navbarBlock/' + menu.key_id">
                        <img :src="$store.state.base_img_url + menu.icon" alt="categroy">
                        <div class="mui-media-body" v-text="menu.title"></div>
                    </router-link>
                </li>
            </ul>
            <div class='exposed' >
                <img src='http://www.hjzscn.com/themes/xn_moban/images/imgshow/c72482194b3ed643a3dd4e8d4ec82813.png'></img>
            </div>
            <div class="news_product">
                <div class="h_title">
                    <div class="line_flag"></div>
                    <span>{{news_product.name}}</span>
                </div>
                <!-- 纵向排版  -->
                <div class='content page'>
                    <div class="double_list">
                        <div class='item' v-for="item in news_product.block_product" :key="item.key_id" @click='showDetail(item)'>
                            <img :src='$store.state.base_img_url + item.pic'></img>
                            <div class='placeholder'>
                                <div class='info'>{{item.name}}</div>
                                <div class='price'>￥{{item.price}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //导入轮播组件
    import swiper from './subComponents/swiper.vue';
    import Toast from  'mint-ui';
    import  { Indicator } from 'mint-ui';

    export default {
        name: "home",
        data() {
            return {
                name: '这是主页的内容',
                topBanners: [],    // banner 广告图
                menu_grids : [],        // 分类菜单
                news_product: [],        // 新品推荐
            }
        },
        components: {
            'swiper': swiper
        },
        created() {
            this.initHome();
        },

        mounted(){},

        methods: {
            initHome(){
                let gridsMenu = localStorage.getItem("gridsMenu");
                let homeBlock = localStorage.getItem("homeBlock");
                let cacheTime = localStorage.getItem("cacheTime");
                if (gridsMenu && homeBlock && cacheTime > Date.now()) {
                    gridsMenu = JSON.parse(gridsMenu);
                    homeBlock = JSON.parse(homeBlock);
                    this.menu_grids = gridsMenu;
                    this.topBanners = homeBlock.banner_list;
                    this.news_product = homeBlock.block['1'];
                }else {
                    this.getBanners();
                }
            },
            //获取banner 图片
            getCategory() {
                // this.$http.get("http://vue.studyit.io/api/getlunbo").then(result => {
                //     console.log(result);
                // })
                Indicator.open();
                this.axios.post('csapi/products/get_category',{
                    prodcut_type: "product" // 门店k_id
                }).then((result)=>{
                    Indicator.close();
                    // console.log('cate===',result);
                    this.menu_grids = result.data.data;
                    localStorage.setItem("gridsMenu",JSON.stringify(result.data.data));
                    localStorage.setItem("cacheTime", new Date().getTime() + 1 * 24 * 60 * 60 * 1000);
                }).catch((err)=>{
                    Indicator.close();
                    console.log(err);
                })
            },
            getBanners(){
                Indicator.open();
                this.axios.post('capi/mobile/index/get_index',{
                    page_keyid : "25879293162684604" // 门店k_id
                }).then((result)=>{
                    Indicator.close();

                    this.topBanners = result.data.data.block_list.banner_list;
                    this.news_product =  result.data.data.block_list.block['1'];
                    // console.log(this.news_product);
                    localStorage.setItem("homeBlock",JSON.stringify(result.data.data.block_list));
                }).catch((err)=>{
                    Indicator.close();
                    console.log(err);
                }).then(() => {
                    this.getCategory()
                });
            },

            // 显示详情
            showDetail(item) {
                // 注意区分 this.$router 和 this.$route
                // 其中this.$route 是路由对象 ,所有路由中的参数, params,query 属性都属于它
                // this.$router 是一个路由导航对象, 用它可以方便的使用js代码 实现路由的前进，后退
                // 跳转到新的URL地址
                // console.log("new_prod-=-==-=-===",item)
                this.$router.push('/home/goodsList/' + item.pro_keyid);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .mint-swipe .mint-swipe-item img {
        width: 100%;
    }
    .index-container {
        height: 100%;
        background-color: #efeff4;
    }
    .mui-content > .mui-table-view:first-child {
        margin-top: 0;
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        background-color: #fff;
        border: none;
        padding: 5px 10px;
        .mui-media-body {
          font-size: 14px;
        }
        img {
          width: 42px;
        }
    }
    .exposed {
        img {
            width: 100%;
            vertical-align: middle;
        }
    }
    .news_product {
        background-color: #fff;
    }
    .h_title {
        text-align: center;
        padding: 10px 0;
      border-bottom: 1px solid #eee;
        > span{
          color: #353535;
          font-size: 14px;
          /* text-shadow: 0 3px 2px #999; */
        }
    }


    .item{
      .site_price {
        font-size: 12px;
        color: #999;
        margin-left: 8px;
        /* text-decoration: line-through; */
      }
      .p_name {
        margin-bottom: 6px;
        font-size: 14px;
      }
    }
    .prod_info {
      padding: 3px 5px;
    }

    .content {
        padding: 0 10px 20px;
    }

    .double_item {
        width: 100%;
    }
    .double_list {
        width: 100%;
        white-space: normal;
    }

    .double_list .item {
        display: inline-block;
        width: 48%;
        margin-top: 10px;
        background-color: #fff;
    }
    .double_list .item:nth-child(2n) {
        margin-left: 10px;
    }

    .double_list .item img {
        width: 100%;
        vertical-align: middle;
    }

    .double_list .item .placeholder {
        padding: 5px 0;
        width: 100%;
        height: auto;
        font-size: 14px;
        text-align: center;
    }

    .item .placeholder .info {
        padding: 0 5px;
        height: 50px;
        line-height: 25px;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
    }
    .item .placeholder .price {
        padding:3px 5px 0;
        color: #f8673c;
    }
    .summer {
        background-color: #00a2e8;
        box-shadow: 1px 1px 1px #666;
    }


</style>
