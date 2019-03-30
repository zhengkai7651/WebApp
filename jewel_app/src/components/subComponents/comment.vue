<template>
    <div class="comment-box">
        <h3 class="title">评论</h3>
        <div class="mui-input-row" style="margin: 10px 5px;">
            <textarea id="textarea" rows="5" placeholder="多行文本框"></textarea>
        </div>
        <button type="button" class="mui-btn mui-btn-primary mui-btn-block">发表评论</button>

        <div class="cm-list">
            <div class="mui-card">
                <div class="mui-card-header mui-card-media">
                    <img src="../../image/logo.png">
                    <div class="mui-media-body">
                        小M
                        <p>发表于 2016-06-30 15:30</p>
                    </div>
                    <!--<img class="mui-pull-left" src="../images/logo.png" width="34px" height="34px" />
                    <h2>小M</h2>
                    <p>发表于 2016-06-30 15:30</p>-->
                </div>
                <div class="mui-card-content">
                    <img src="../../image/shuijiao.jpg" alt="" width="100%">
                </div>
                <div class="mui-card-footer">
                    <a class="mui-card-link">Like</a>
                    <a class="mui-card-link">Comment</a>
                    <a class="mui-card-link">Read more</a>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        name: "comment.vue"
    }
</script>

<style lang="scss" scoped>
    .comment-box {
        .title {
            padding: 10px 0 ;
            font-size: 16px;
            border-bottom: 1px solid #eee;
        }
        .mui-btn-block {
            font-size: 16px;
            padding: 10px 0;
        }
    }
</style>