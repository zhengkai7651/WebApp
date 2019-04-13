<template>
    <!-- 轮播图组件 -->
    <mt-swipe :auto="3000">
        <mt-swipe-item v-for="(item,index) in banners" :key="item.key_id" v-if="item.key_id != '25879293162684694'">
            <img :class="{ auto : isAuto }" :src=" $store.state.base_img_url + item.pic" alt="silder-img">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
    export default {
        props: ['banners','isAuto']
    }
</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 168px;
        text-align: center;
        background: #fff;
        .mint-swipe-item img {
            height: 100%;
        }
        .mint-swipe-item img.auto {
            width: auto;
        }
    }

</style>
