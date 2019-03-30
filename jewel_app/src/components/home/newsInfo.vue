<template>
    <div class="newsinfo-container">
        <div class="header">
            <h1 class="title">新闻详情页 {{ $route.params.id }}</h1>
        </div>
        <div class="content">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media">
                    <a href="javascript:;" class="">
                        <img class="mui-media-object mui-pull-right"src="../../image/shuijiao.jpg">
                        <div class="mui-media-body">
                            远眺
                            <p class="mui-ellipsis">静静的看这个世界，最后终于疯了</p>
                        </div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media">
                    <a href="javascript:;" class="">
                        <img class="mui-media-object mui-pull-right" src="../../image/shuijiao.jpg">
                        <div class="mui-media-body">
                            幸福
                            <p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
                        </div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media">
                    <a href="javascript:;" class="">
                        <img class="mui-media-object mui-pull-right" src="../../image/shuijiao.jpg">
                        <div class="mui-media-body">
                            木屋
                            <p class="mui-ellipsis">想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>
                        </div>
                    </a>
                </li>
            </ul>
        </div>

        <!-- 评论子组件 -->
        <comment></comment>


    </div>
</template>
<script>
    import comment from '../subComponents/comment.vue';

    export default {
        name: "newsInfo",
        data(){
            return {
                id: this.$router.id
            }
        },

        components: {
           'comment': comment
        }
    }
</script>

<style lang="scss" scoped>
    .newsinfo-container {
        padding: 10px;
    }
    .header .title {
        text-align: center;
        padding: 0 15px;
        font-size: 16px;
    }

</style>