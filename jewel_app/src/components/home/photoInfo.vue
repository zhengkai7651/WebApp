<template>
    <div>
        <h3>图片详情 ==={{ $route.params.id }}</h3>
        <ul class="mui-table-view mui-grid-view">
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <a href="#">
                    <img class="mui-media-object" src="http://g-search3.alicdn.com/img/bao/uploaded/i4/i1/2057798118/TB2vTZbwY1YBuNjSszhXXcUsFXa_!!2057798118-0-item_pic.jpg_230x230.jpg_.webp">
                    </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <a href="#">
                    <img class="mui-media-object" src="http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/1732515655/TB1EIMUy1uSBuNjSsziXXbq8pXa_!!0-item_pic.jpg_230x230.jpg_.webp">
                    </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <a href="#"><img class="mui-media-object" src="http://g-search1.alicdn.com/img/bao/uploaded/i4/i3/TB1tV0dRVXXXXXjXFXXXXXXXXXX_!!0-item_pic.jpg_230x230.jpg_.webp">
                    </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4">
                <a href="#">
                    <img class="mui-media-object" src="http://g-search2.alicdn.com/img/bao/uploaded/i4/i4/796527731/O1CN014kxTQm26yqUIk8YgH_!!0-item_pic.jpg_230x230.jpg_.webp">
                    </a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "photoInfo",
        data(){
            return {

            }
        },
        created(){
            console.log(this.$route.params.id)
        },

        mounted(){

        },

        methods: {

        }
    }
</script>

<style scoped>

</style>