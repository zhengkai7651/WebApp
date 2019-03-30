<template>
    <div>
        <!--<h3>图片列表</h3>-->
        <!--<div id="slider" class="mui-slider" data-slider="5">-->
            <!--<div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">-->
                <!--<a class="mui-control-item mui-active" href="#item1mobile">-->
                    <!--推荐-->
                <!--</a>-->
                <!--<a class="mui-control-item" href="#item2mobile">热点</a>-->
                <!--<a class="mui-control-item" href="#item3mobile">社会</a>-->
                <!--<a class="mui-control-item" href="#item3mobile">体育</a>-->
                <!--<a class="mui-control-item" href="#item3mobile">娱乐</a>-->
            <!--</div>-->
            <!--<div id="sliderProgressBar" class="mui-slider-progress-bar mui-col-xs-4" style="transform: translate3d(0px, 0px, 0px) translateZ(0px);"></div>-->
        <!--</div>-->
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" >
                        {{ item.title }}
                    </a>
                </div>
            </div>

        </div>

        <div class="mui-content">
            <ul>
                <router-link tag="li" v-for="item in imgList" :key="item.id" :to="'/home/photoInfo/' + item.id">
                    <img v-lazy="item.img_url">
                    <div class="mui-slider-title">
                        <div class="info-title">幸福就是下午吃上一顿沙拉</div>
                        <div class="info-body">轻脂健康蔬菜沙拉,食材: 紫甘蓝，圆生菜，洋葱，圣女果，薄荷叶</div>
                    </div>
                </router-link>
            </ul>
        </div>

    </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui.min.js";




    export default {
        name: "photoList",
        data() {
            return {
                cates: [
                    { id: 1, title: "推荐" },
                    { id: 2, title: "热点" },
                    { id: 3, title: "社会" },
                    { id: 4, title: "体育" },
                    { id: 5, title: "娱乐"},
                    { id: 6, title: "游戏"},
                    { id: 7, title: "军事"},
                    { id: 7, title: "本地"},
                ], // 所有分类的列表数组
                imgList: [
                    { id: 1, img_url: 'http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg', title: "轻食紫甘蓝蔬菜沙拉" },
                    { id: 2, img_url: 'http://fuss10.elemecdn.com/3/1e/42634e29812e6594c98a89e922c60jpeg.jpeg', title: "轻食紫甘蓝蔬菜沙拉" },
                    { id: 3, img_url: 'http://fuss10.elemecdn.com/1/c5/95c37272d3e554317dcec1e17a9f5jpeg.jpeg', title: "轻食紫甘蓝蔬菜沙拉" },
                    { id: 4, img_url: 'http://fuss10.elemecdn.com/7/85/e478e4b26af74f4539c79f31fde80jpeg.jpeg', title: "轻食紫甘蓝蔬菜沙拉" },
                    { id: 5, img_url: 'http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg', title: "轻食紫甘蓝蔬菜沙拉" },
                ] // 图片列表的数组
            };
        },
        mounted(){
            console.log(123)
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });

        },
    }
</script>

<style lang="scss" scoped>
    * {
        touch-action: pan-y;
    }
    .mui-scroll-wrapper {
        .mui-control-item { line-height: 36px; border-bottom: 2px solid #ddd; }
        .mui-control-item.mui-active {
            border-bottom: 2px solid #007aff !important;
        }
    }
    .mui-slider {
        position: fixed;
        background-color: #fff;
        z-index: 5;
    }
    .mui-content {
        padding: 50px 20px 60px;
        background-color: #fff;
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            li {
                position: relative;
                background-color: #eee;
                margin-bottom: 10px;
                text-align: center;
                box-shadow: 2px 2px 2px #ddd;
                img {
                    width: 100%;
                    vertical-align: middle;
                    border-radius: 3px;
                }
                .mui-slider-title {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 100px;
                    margin: 0;
                    color: #fff;
                    font-size: 14px;
                    padding: 5px;
                    text-align: left;
                    text-indent: 12px;
                    background-color: rgba(0,0,0,0.5);
                }
            }

        }
        image[lazy=loading] {
            width: 60px;
            height: 60px;
            margin: auto;
        }
    }


</style>