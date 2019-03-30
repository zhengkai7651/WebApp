<template>
    <div>
        <!--<transition  @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">-->
            <!--<div class="ball" v-show="ballFlag"></div>-->
        <!--</transition>-->
        <!-- 轮播图组件 -->
        <swiper :banners="product.img_list" :isAuto="true"></swiper>
        <div class="prod-info" v-show="product">
            <div class="p-name">{{ product.name }}</div>
            <div class="p-price">￥{{ product.price }}</div>
        </div>
        <div class="space"></div>
        <div class="descript" style='text-align:center;' v-if="product.intro">
            <div class='thead'>商品详情</div>
            <div class="img-info" v-html="product.intro">
            </div>
        </div>
    </div>
</template>

<script>
    import swiper from '../subComponents/swiper.vue';
    import Toast from  'mint-ui';
    import { Indicator } from 'mint-ui';

    export default {
        name: "goodsList",
        data() {
            return {
                product : '',
                topBanners: [],     // 顶部轮播数据
                ballFlag: false,    // 控制加购物车小球动画
            }
        },
        components: {
            'swiper': swiper
        },
        created(){
            this.getBanners();
            console.log(this.$route.params.pid);
            this.getProduct(this.$route.params.pid);
        },

        methods:{
            // 获取轮播数据
            getBanners(){
                this.axios.post('capi/mobile/index/get_index',{
                    page_keyid : "25879293162684604" // 门店k_id
                }).then((result)=>{
                    console.log('banner=====',result);
                    this.topBanners = result.data.data.block_list.banner_list;

                }).catch((err)=>{
                    console.log(err);
                })
            },
            getProduct(pid){
                Indicator.open();
                this.axios.post('mediumApi/products/detail',{
                    key_id : pid // 门店k_id
                }).then((result) => {
                    Indicator.close();
                    console.log('prod=====',result);
                    if (result.data.status == 200){
                        var prod = result.data.data._product;
                        prod.num = 1;
                        prod.img_list.forEach(item => {
                            console.log(item)
                            item.pic = item.path_m;
                        });
                        prod = this.initProd(prod);
                        prod = this.getSpecInfo(prod);
                        this.product= prod;
                    }else {
                        Toast(result.data.statusText);
                    }
                }).catch((err)=>{
                    Indicator.close();
                    console.log(err);
                });
            },
            // 加数量
            plus(){
                this.ballFlag = !this.ballFlag;
            },

            initProd(prod) {
                if (prod.spec_info.length != 0) {
                    var defaultId = "";
                    var url = "";
                    for (var i = 0; i < prod.spec_info.length; i++) {
                        for (var j in prod.spec_info[i].guige_value) {
                            prod.spec_info[i].checkId = prod.spec_info[i].guige_value[j].key_id;
                        }
                    }
                    if (prod.spec_info[0].guige_value[0].img_info) {
                        prod.img_icon = this.$store.state.base_img_url + prod.spec_info[0].guige_value[0].img_info[0].path_m;
                    } else {
                        prod.img_icon = this.$store.state.base_img_url + prod.img_list[0].path_m;
                    }
                    if (prod.sku_price) {
                        prod.price = prod.sku_price[prod.default_sku].price
                        prod.stock_num = prod.sku_price[prod.default_sku].stock_num
                    }
                } else {
                    if (prod.img_list.length != 0) {
                        var url = "";
                        for (var i = 0; i < prod.img_list.length; i++) {
                            if (prod.img_list[i].is_list == 2) {
                                url = prod.img_list[i].path_m;
                            }
                        }
                        prod.img_icon = this.$store.state.base_img_url + url;
                    }
                }
                return prod
            },

            // 确定商品规格参数
            getSpecInfo(cur_product) {
                // console.log(cur_product);
                // return;
                let spec_args = []; // 商品规格名称
                let spec_keys = []; // 商品规格 key_id
                let spec_category = [];
                var spec_text = ""; // 规格值
                for (var i in cur_product.spec_info) {
                    if (spec_text != "") {
                        spec_text += ", "
                    }
                    spec_text += cur_product.spec_info[i].name + ":";
                    for (var j in cur_product.spec_info[i].guige_value) {

                        if (cur_product.spec_info[i].guige_value[j].active == true) {
                            // spec_args.push(cur_product.spec_info[i].guige_value[j].name);
                            spec_keys.push({
                                name: cur_product.spec_info[i].guige_value[j].name,
                                key_id: cur_product.spec_info[i].guige_value[j].key_id
                            });
                            spec_text += cur_product.spec_info[i].guige_value[j].name + " ";
                        }
                    }
                    spec_category.push({
                        category_key: cur_product.spec_info[i].key_id,
                        cate_name: cur_product.spec_info[i].name
                    });
                }
                for (var i in spec_category) {
                    spec_category[i]["spec_name"] = spec_keys[i].name
                    spec_category[i]["spec_key"] = spec_keys[i].key_id
                }
                // spec_args = spec_args.join(", ");
                // 添加 购物车中商品规格参数
                cur_product.spec_category = spec_category;
                cur_product.spec_name = spec_text;
                // cur_product.spec_info = {};
                return cur_product;
            },

        }
    }
</script>

<style lang="scss" scoped>
    .ball {
        position: absolute;
        width: 20px;
        height: 20px;
        top: 293px;
        left: 60px;
        background-color: dodgerblue;
        border-radius: 50%;
        z-index: 99;
        transform: translate(88px,230px);
    }
    .prod-info {
        padding: 10px;
        font-size:18px;
        font-weight:bold;
        background-color: #fff;
        border-top: 1px solid #eee;
        .p-name{
            margin-bottom: 8px;
        }
        .p-price {
            color: #f31f1e;
        }
    }
    .space { height: 10px;  background-color: #f8f8f8; }
    .descript {
        background-color: #fff;
        .thead {
            font-size: 16px;
            padding: 10px 0;
            border: 1px solid #eee;
        }
        .img-info {
            text-align: center;
        }
    }

</style>