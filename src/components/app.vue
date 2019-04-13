<template>
    <div class="home-container">

        <!--顶部Header-->
        <mt-header fixed title="千瑷珠宝" >
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="back()" v-show="flagBack">返回</mt-button>
            </router-link>
        </mt-header>

        <!-- 中间的 路由 router-view 区域 -->
        <transition >
            <router-view></router-view>
        </transition>
        <!-- 底部 Tabbar 区域 -->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item-zk" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item-zk" to="/category">
                <span class="mui-icon mui-icon-list"></span>
                <span class="mui-tab-label">挑选钻石</span>
            </router-link>
            <router-link class="mui-tab-item-zk" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" v-show="$store.getters.getCount">{{$store.getters.getCount}}</span>
				</span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item-zk" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "app",
        data(){
            return {
                flagBack: false,
            }
        },
        watch: {
            '$route.path': function(newVal) {
                // console.log(newVal);
                if(newVal == '/home' || newVal == '/category' || newVal == '/shopcar' || newVal == '/member') {
                    this.flagBack = false;
                } else {
                    this.flagBack = true;
                }
            }
        },
        methods: {
            back(){
                this.$router.go(-1);
            },
        }
    }
</script>

<style lang="scss" scoped>

    .home-container{
        padding: 40px 0 70px;
        overflow-x: hidden;
    }
    .v-enter {
        opacity: 0;
        transform: translateX(100%);
    }
    .v-leave-to {
        position: absolute;
        opacity: 0;
        transform: translateX(-100%);
    }
    .v-enter-active,.v-leave-active {
        transition: all 0.5s ease;
    }

    /* 解决tabbar 菜单与 sliderbar 冲突问题 */
    .mui-bar-tab .mui-tab-item-zk {
        display: table-cell;
        overflow: hidden;
        width: 1%;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #929292;
      .mui-icon~.mui-tab-label {
        font-size: 11px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .mui-icon {
        top: 3px;
        width: 24px;
        height: 24px;
        padding-top: 0;
        padding-bottom: 0;
      }
    }
    .mui-bar-tab .mui-tab-item-zk.mui-active {
        color: #007aff;
    }


</style>
