<template>
    <div >
        <!-- 购物车清单列表 -->
        <section id="jd-shop-cart">
            <div class='car_empty' v-if="!prodList.length">
                <img src="/image/cart-null.png" class="cart-image" />
                <div>购物车空空如也</div>
            </div>
            <div class='header'>
                <div class="weui-check__hd_in-checkbox" style='display:inline' @click.stop='checked = !checked'>
                    <img class="icon" style="vertical-align: sub" src="image/radio_off.png" v-if="!checked"></img>
                    <img class="icon" style="vertical-align: sub" src="image/radio_on.png" v-if="checked"></img>
                    <span>全选</span>
                </div>
                <span class='del' @click.stop='delShopCar'>删除</span>
            </div>
            <div class="cart-list">
                <div class="cart-item">
                    <ul>
                        <li v-for="item in prodList">
                            <span class="checkbox">
                                <img class="icon" :src="item.status ? 'image/radio_on.png': 'image/radio_off.png' " alt="checkbox">
                            </span>
                            <div class="p-img">
                                <img src="image/detail01.jpg" alt="prod-img"/>
                            </div>
                            <div class="product-info">
                                <a class="p-name" href="#" v-text="item.name"></a>
                                <span>¥{{item.price}}</span>
                                <div class="mui-numbox">
                                    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                                    <input class="mui-input-numbox" type="number" v-model="item.num">
                                    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

    </div>

</template>

<script>
    export default {
        name: "shopcar",
        data(){
            return {
                checked: false,  // 是否全选
                prodList: [
                    {
                        key_id: 25879293162684941,
                        name: "流光 18K金钻石耳钉/耳饰",
                        sale_unit: "mm",
                        status: 1,
                        price: 4800.00,
                        num: 1,
                        status: false,
                        syscate_keyid: 25879293162684639,
                    },
                    {
                        key_id: 25879293162684941,
                        name: "彩金 18K钻石戒指",
                        sale_unit: "mm",
                        status: 1,
                        price: 19800.00,
                        num: 1,
                        status: false,
                        syscate_keyid: 25879293162684639,
                    }
                ],
            }
        },
        methods: {

        }

    }
</script>

<style scoped>
    select, input,img {
        vertical-align: middle;
    }
    header .cart-title {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-family: sans-serif;
        text-align: center;
        background-color: #f0f0f0;
        font-weight: inherit
    }

    header .hint-text {
        width: 100%;
        height: 35px;
        text-align: center;
        color: #76777a;
        border-top: 1px solid #dfdfdf;
        border-bottom: 1px solid #dfdfdf;
        line-height: 35px;
        background-color: #fff
    }

    .line {
        height: 10px;
        background-color: #f0f0f0
    }

    #jd-shop-cart {
        margin-bottom: 20px;
    }
    .header {
        background-color: #fff;
        padding: 10px;
    }
    .header .del { float: right; }
    .cart-list {
        margin-top: 10px;
        background-color: #fff
    }

    section .c-title {
        height: 35px;
        line-height: 35px;
        border-top: 1px solid #dfdfdf;
        border-bottom: 1px solid #dfdfdf
    }

    section .c-title>p {
        margin-left: 40px;
        padding-left: 24px;
        background: url(../image/buy-logo.png) no-repeat left center;
        background-size: 20px 20px
    }

    section .cart-item > ul { padding: 0; }
    section .cart-item>ul li {
        display: block;
        width: 100%;
        height: 100px;
        border-bottom: 1px solid #dfdfdf;
        position: relative
    }

    section .cart-item>ul li .p-img {
        float: left;
        margin: 10px 10px 0;
        width: 81px;
        height: 81px;
        border: 1px solid #dfdfdf
    }

    section .cart-item>ul li .p-img>img {
        width: 100%
    }
    .checkbox {
        float: left;
        margin-left: 10px;
        width: 42px;
        line-height: 86px;
        text-align: center;
    }
    .icon {
        width: 24px;
    }
    .mui-numbox {
        width: 108px;
        height: 26px;
        padding: 0 36px;
        float: right;
    }
    .mui-numbox [class*=btn-numbox], .mui-numbox [class*=numbox-btn] {
        width: 36px;
    }

    .product-info {
        float: left;
        width: 56%;
        padding-top: 10px;
        font-size: 13px;
        /*position: absolute;*/
        /*left: 135px*/
    }

    .product-info .p-name {
        height: 36px;
        display: -webkit-box;
        font-size: 14px;
        margin-bottom: 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical
    }

    .product-info > p {
        height: 20px;
        line-height: 20px;
        color: #ee3131;
        padding-top: 5px;
        margin-bottom: 5px
    }

    .product-info .product-number {
        font-size: 0
    }

    .product-info .product-number .cart-btn {
        width: 32px;
        height: 26px;
        font-size: 14px;
        border: 1px solid #dfdfdf;
        background-color: #fff
    }

    .product-info .product-number .text-num {
        border-left: none;
        border-right: 0;
        font-size: 14px;
        text-align: center
    }

    .product-info .product-number .text-num:focus {
        border: 1px solid #8fbbfc
    }

    .product-info .product-number [type="button"]:hover {
        background-color: #ddd
    }

    .product-info .product-number .btn-delete {
        width: 50px;
        position: absolute;
        right: 15px;
        color: #ee3131;
        background-color: #fff
    }

    .settle-bottom {
        width: 100%;
        height: 50px;
        background-color: #565555;
        position: fixed;
        bottom: 0
    }

    .check-all {
        width: 80px;
        height: 50px;
        color: #fff;
        line-height: 50px;
        text-align: center
    }

    .settle-bottom .right {
        width: 100px;
        height: 100%;
        line-height: 50px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        background-color: #f04947;
        position: absolute;
        right: 0;
        bottom: 0
    }

    .settle-bottom .right:hover {
        background-color: #e83633
    }

    .del-dialog {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
        background-color: rgba(0,0,0,0.5)
    }

    .del-hidden {
        display: none
    }

    .del-dialog .confirm {
        width: 78%;
        height: 125px;
        top: 50%;
        left: 11%;
        margin-top: -125px;
        position: absolute;
        text-align: center;
        background-color: #fff;
        border-radius: 8px;
        padding: 10px;
        z-index: 1002
    }

    .del-dialog .confirm>p {
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        margin-bottom: 10px;
        border-bottom: 1px solid #eee
    }

    .del-dialog .confirm .cancel {
        height: 36px;
        width: 45%;
        display: block;
        border: 1px solid #e0e0e0;
        text-align: center;
        line-height: 36px;
        border-radius: 4px;
        font-size: 16px;
        float: left
    }

    .del-dialog .confirm .submit {
        height: 36px;
        width: 45%;
        display: block;
        background: #f15353;
        text-align: center;
        line-height: 36px;
        border-radius: 4px;
        color: #fff;
        font-size: 16px;
        margin-left: 10%;
        float: left
    }

</style>