<template>
    <div class="member-container">
        <!--页面主内容区开始-->
        <div class="mui-content">
            <div class="user-header-bar">
                <div class="user-icon">
                    <div class="head-img">
                        <img id="trueimg" src="../image/yuantiao.jpg" style="width: 100%; height: 100%; border-radius: 50%;" />
                    </div>
                    <span id="username">请登录</span>
                </div>
            </div>
            <ul class="mui-table-view">
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right" >
                        <span class="mui-icon iconfont icon-wodedingdan"></span> 个人资料
                    </a>
                </li>
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right" >
                        <span class="mui-icon iconfont icon-wodedingdan"></span> 我的订单
                    </a>
                </li>
                <li class="mui-table-view-cell">
                    <a id="changeaddress" class="mui-navigate-right" >
                        <span class="mui-icon iconfont icon-dizhi"></span> 修改地址
                    </a>
                </li>
            </ul>
            <ul class="mui-table-view" style="margin-top: 10px;">
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right" >
                        <span class="mui-icon mui-icon-email"></span> 修改邮箱
                    </a>
                </li>
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right" >
                        <span class="mui-icon mui-icon-locked"></span> 修改密码
                    </a>
                </li>
            </ul>
            <ul class="mui-table-view" style="margin-top: 10px;">
                <li class="mui-table-view-cell">
                    <a class="mui-navigate-right" href="../mine/feedback-needtem.html">
                        <span class="mui-icon iconfont icon-xiaolian"></span> 用户反馈
                    </a>
                </li>
            </ul>

        </div>

    </div>
</template>

<script>
    export default {
        name: "member",
        data(){
            return {
                name: "这是会员中心的页面"
            }
        },

        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    /* 头部头像栏 */
    .member-container {
        background-color: #efeff4;
    }
    .user-header-bar { padding: 7% 0px 4% 0px; }
    .user-icon { text-align: center; }
    .user-icon >.head-img {
        width: 5em;
        height: 5em;
        padding: 0px;
        border-radius: 50%;
        border: 2px solid white;
        color: gray;
        margin: 0px auto;
        margin-bottom: 5px;
    }

    #username{
        display: inline-block;
        margin-top: 5px;
        padding: 5px;
        font-size: 14px;
        color: #007AFF;
        border: 1px solid #999;
        border-radius: 5px;
    }
    #username:hover,
    #username:focus {
        color: #fff;
        background-color: #007AFF;
    }
    /* 菜单列表 */

    .mui-views,
    .mui-view,
    .mui-pages,
    .mui-page,
    .mui-page-content {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: #efeff4;
    }

    .mui-pages {
        top: 46px;
        height: auto;
    }

    .mui-scroll-wrapper,
    .mui-scroll {
        background-color: #efeff4;
    }

    .mui-page.mui-transitioning {
        -webkit-transition: -webkit-transform 300ms ease;
        transition: transform 300ms ease;
    }

    .mui-page-left {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    .mui-ios .mui-page-left {
        -webkit-transform: translate3d(-20%, 0, 0);
        transform: translate3d(-20%, 0, 0);
    }

    .mui-navbar {
        position: fixed;
        right: 0;
        left: 0;
        z-index: 10;
        height: 44px;
        background-color: #f7f7f8;
    }

    .mui-navbar .mui-bar {
        position: absolute;
        background: transparent;
        text-align: center;
    }

    .mui-android .mui-navbar-inner.mui-navbar-left {
        opacity: 0;
    }

    .mui-ios .mui-navbar-left .mui-left,
    .mui-ios .mui-navbar-left .mui-center,
    .mui-ios .mui-navbar-left .mui-right {
        opacity: 0;
    }

    .mui-navbar .mui-btn-nav {
        -webkit-transition: none;
        transition: none;
        -webkit-transition-duration: .0s;
        transition-duration: .0s;
    }

    .mui-navbar .mui-bar .mui-title {
        display: inline-block;
        width: auto;
    }

    .mui-page-shadow {
        position: absolute;
        right: 100%;
        top: 0;
        width: 16px;
        height: 100%;
        z-index: -1;
        content: '';
    }

    .mui-page-shadow {
        background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, .01) 50%, rgba(0, 0, 0, .2) 100%);
        background: linear-gradient(to right, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, .01) 50%, rgba(0, 0, 0, .2) 100%);
    }

    .mui-navbar-inner.mui-transitioning,
    .mui-navbar-inner .mui-transitioning {
        -webkit-transition: opacity 300ms ease, -webkit-transform 300ms ease;
        transition: opacity 300ms ease, transform 300ms ease;
    }

    .mui-page {
        display: none;
    }

    .mui-pages .mui-page {
        display: block;
        .mui-table-view:first-child {
            margin-top: 15px;
        }
        .mui-table-view:last-child {
            margin-bottom: 30px;
        }
    }


    .mui-table-view {
        margin-top: 20px;
        span.mui-pull-right {
            color: #999;
        }
    }


    .mui-table-view-divider {
        background-color: #efeff4;
        font-size: 14px;
    }

    .mui-table-view-divider:before,
    .mui-table-view-divider:after {
        height: 0;
    }

    .head {
        height: 40px;
    }

    #head {
        line-height: 40px;
    }

    .head-img {
        width: 40px;
        height: 40px;
    }

    #head-img1 {
        position: absolute;
        bottom: 10px;
        right: 40px;
        width: 40px;
        height: 40px;
    }

    .update {
        font-style: normal;
        color: #999999;
        margin-right: -25px;
        font-size: 15px
    }

    .mui-fullscreen {
        position: fixed;
        z-index: 20;
        background-color: #000;
    }

    .mui-ios .mui-navbar .mui-bar .mui-title {
        position: static;
    }
</style>