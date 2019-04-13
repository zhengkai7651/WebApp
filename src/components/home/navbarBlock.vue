<template>


    <div class='container'>
        <!-- f分类导航菜单  -->
        <div class='fixedHeader'>
            <div class='scroll-linear lear-navTabs' >
                <template v-for="(nav,index) in navMenu" >
                    <span class="cate-item" :class="{active :curTab == index }" @click="changeTab(index)">{{ nav.name }}</span>
                </template>
            </div>
            <div class="weui-flex sorts">
                <template v-for="item in sortType" >
                    <div class="weui-flex__item"  @click='startSort'>
                        <div class="placeholder">{{item.name}}
                            <img class='icon icon-sort' src='../../image/sort.png' v-if="item.status == 1"></img>
                            <img class='icon icon-sort' src='../../image/sort_up.png' v-if="item.status == 2"></img>
                            <img class='icon icon-sort' src='../../image/sort_down.png' v-if="item.status == 3"></img>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <!-- 纵向排版  -->
        <div class='content page'>
            <div class="double_list" v-show="curProds.length">
                <div class='item' v-for="item in curProds" :key="item.key_id" @click='showDetail(item.key_id)'>
                    <img :src="$store.state.base_img_url + item.img_list[0].path_m "></img>
                    <div class='placeholder'>
                        <div class='info'>{{item.name}}</div>
                        <div class='price'>￥{{item.price}}</div>
                    </div>
                </div>
            </div>
            <!--<h3> cate_di: {{ $route.params.sort_id }}</h3>-->
        </div>

    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';
    import Toast from  'mint-ui';
    export default {
        name: "navbarBlock",
        data() {
            return {
                navMenu: [],  // 分类菜单
                sortType: [  // 1 2 3 处理
                    { name: "新品排序", status: 3, stype: "set_time", start: true },
                    { name: "价格排序", status: 1, stype: "price", start: false }
                ],  // 商品排序规则
                showMenu: false,
                showModal: false,
                curTab: 0,
                series: 0,
                cate_id: "",
                cateW: 1,
                w: 1,
                c: 1,
                p: 1,
                all : [], // 全部分类商品
                curProds: [  // 当前分类商品
                ],
            }
        },

        created(){
            var sortObj = {name: "set_time", value: "desc"};
            this.getNavProduct(this.$route.params.sort_id,sortObj);
        },
        methods: {
            // 切换分类
            changeTab(i) {
                this.curTab = i;
                this.curProds = this.alls[i].pro_info;
            },
            // 排序
            startSort(e) {
                let i = e.currentTarget.dataset.index;
                // console.log(i);
                var sorts = this.data.sortType;
                for (var s = 0; s < sorts.length; s++) {
                    sorts[s].status = 1;
                }
                var sortObj = {
                    name: sorts[i].stype, value: sorts[i].start ? "asc" : "desc"
                };
                sorts[i].status = sorts[i].start ? 2 : 3;
                sorts[i].start = !sorts[i].start;
                this.setData({
                    sortType: sorts
                });
                this.getProductList(this.data.cate_id, sortObj);
            },

            // 价格排序
            priceSort() {
                var id = this.data.cate_id;
                var pSort = this.data.priceSort;
                var sortObj = {
                    name: "price", value: pSort ? "asc" : "desc"
                };
                this.setData({
                    priceSort: !pSort,
                    isPSort: true,
                })
                this.getProductList(id, sortObj);
            },

            // 商品详情
            showDetail(pid) {
                // console.log(pid)
                // onfire.fire("prod", prod);
                this.$router.push("/home/goodsList/" + pid);

            },
            // 获取分类产品
            getNavProduct(cate_id, sortObj){
                Indicator.open();
                this.axios.post('mediumApi/products/get_catepro_bycate', {
                    prodcut_type: "product", // 商品类型
                    com_key_id: "25879293162684510", // 门店k_id
                    category_keyid: cate_id,
                    sort: sortObj
                }).then( (result) => {
                    Indicator.close();
                    // console.log("products.children==",result.data.data.products[0].children)
                   if (result.data.status == 200) {
                       let curProdData = result.data.data.products[0];
                       let prodData = result.data.data.products[0].children;
                       let alls = [];
                       let leftMenu = [{name: "全部"}];
                       for (var i = 0; i < prodData.length; i++) {
                           leftMenu.push({ name: prodData[i].title });
                           alls.push.apply(alls, prodData[i].pro_info);
                       }
                       if (curProdData.pro_info.length) {
                           alls.push.apply(alls, curProdData.pro_info);
                       }
                       prodData.unshift({ title: "全部", pro_info: alls });
                       this.navMenu = leftMenu;    // 顶部分类菜单
                       this.curProds= prodData[0].pro_info;    // 当前商品
                       this.alls= prodData;        //全部分类商品
                   } else {
                       Toast(result.data.statusText);
                   }
                }).catch((err)=>{
                    Indicator.close();
                    // console.log(err);
                });
            },
            getProductList(cate_id, sortObj) {
                const auth = wx.getStorageSync("auth");
                const url_info = {
                    url: 'https://api.sms.v-union.cn/mediumApi/products/get_catepro_bycate',
                    data: { country_keyid: "", },
                    header: { "Auth": auth }
                }
                // console.log(url_info)
                // 获取 authen 身份令牌
                app.getHttp(url_info).then((data) => {
                    // console.log(data.data)
                    if (data.data.status == 200) {
                        if (data.data.data.products) {
                            var prodData = data.data.data.products[0].children;
                            // console.log(prodData.length)
                            const cateW = Math.ceil((prodData.length + 1) / 5);
                            // console.log(cateW)
                            // console.log(prodData[0].pro_info)
                            var alls = [];
                            var leftMenu = [{name: "全部"}];
                            for (var i = 0; i < prodData.length; i++) {
                                leftMenu.push({ name: prodData[i].title });
                                alls.push.apply(alls, prodData[i].pro_info);
                            }
                            if (data.data.data.products[0].pro_info.length) {
                                alls.push.apply(alls, data.data.data.products[0].pro_info);
                            }
                            prodData.unshift({ title: "全部", pro_info: alls });
                            // console.log(alls);
                            this.setData({
                                'topHeader.leftMenu': leftMenu,
                                allProd: prodData[this.data.topHeader.curTab].pro_info,
                                alls: prodData,
                                cateW: cateW
                            });
                        }
                    } else {
                        app.showMsg(data.data.statusText);
                    }
                    this.setData({
                        fail: false
                    })
                    wx.hideLoading();
                }, ((reject) => {
                    wx.hideLoading();
                    app.showMsg('网络异常,请检查网络后重试！');
                })).then(() => {

                })
            },

        },
    }
</script>

<style lang="scss" scoped>

    ::-webkit-scrollbar{
        width: 0;
        height: 0;
        color: transparent;
    }
    .fixedHeader{
        position: fixed; top: 40px; width: 100%;
        height: 42px; background-color: #fff; z-index: 10;
    }
    .search { width: 90%; height: 56px; float: right; background-color: #fff;color: #666; font-size: 30px; text-align: center; border: 1px solid #ddd; border-radius: 15px;position: relative; }
    .search.active { background-color: #f3f3f3; }
    .header .sea_icon { position: absolute; left:33%; top: 5px; width: 42px; height: 42px;  }
    /* banner 广告图 大小  */
    .swiper {
      margin-top: 48px;
      .swiper-item, .slide-image  {
        width: 100%; height: 320px;
      }
    }
    .double_list {
        width: 100%;
        padding: 0 10px 10px 0;
        white-space: normal;
        .item {
            display: inline-block;
            width: 45%;
            margin-left: 15px;
            margin-bottom: 10px;
            img {
                width: 100%;
                height: 166px;
                vertical-align: middle;
            }
            .placeholder {
                position: relative; padding: 5px 0;
                height: auto; width: 100%;
                font-size: 14px; text-align: center;
                .info {
                    padding: 0 10px;
                    height: 45px;
                    color: #232323;
                    overflow: hidden;
                }
                .price {
                    padding: 0 10px;
                    color: #f31f1e;
                }
            }
        }
    }

    /*  导航滑动菜单  */
    .lear-navTabs {
        font-size: 0.68rem;
        height: 42px;
        white-space: nowrap;
        overflow-x: scroll;
        .cate-item { text-align: center; padding: 0 20px; line-height: 38px; display: inline-block;  min-width: 14%; }
    }

    .cate-item.active { font-weight: bold; border-bottom: 2px solid #555; }
    .content { padding-top: 85px; background-color: #fff; }


    .weui-grids { margin: 20px 0; background-color: #fff;  }
    .weui-grid {
        width: 25%;
        padding: 12px 10px;
    }

    /* 商品类别 title   */
    .h_title {
        margin-top: 5px;
        text-align: center;
        padding: 15px 0;
        .eng {
            font-size: 24px;
            color: #888;
            margin-top: -8px;
        }
    }
    .product_list {
        padding: 20px;
        .item {
            background-color: #fff;
            font-size: 30px;
        }
    }

    .sorts{
        display: flex;
        margin-top: -3px;
        color: #565656;
        .weui-flex__item { flex: 1; padding: 0.4rem 0; border-left: 1px solid #ddd;  text-align: center; }
        .placeholder {
            position: relative;
            .icon-sort {
                width: 16px;
                height: 18px;
            }
            .icon {
                position: absolute;
                top: 2px;
            }
            .icon.up { top: 0; }
            .icon.down { bottom: 0; }
            .icon.active {
                color: #222;
            }
        }
    }

    .product_list .sorts .weui-flex__item:nth-child(n) {
        margin-left: 10px;
    }

    .product_list .sorts .weui-flex__item image {
        width: 100%;
        height: 100px;
    }

    .prod_info {
        padding: 5px 10px;
    }

    .product_list .item  {
        .p_name{
            margin-bottom: 15px;
            font-size: 24px;
        }
        .price {
            font-size: 18px;
            color: #f31f1e;
        }
        .site_price {
            font-size: 22px;
            color: #999;
            margin-left: 15px;
        }
    }

    .double_item {
        width: 100%;
    }

    .summer {
        background-color: #00a2e8;
        box-shadow: 1px 1px 1px #666;
    }

    .sorts.weui-flex {  background-color: #fff;font-size: 14px;border-top: 1px solid #ddd; border-bottom: 1px solid #ddd;}

    /*  规格参数  */
    .spec-item {
        padding: 20px 30px;
        font-size: 28px;
    }
    .spec-item .args {
        display: inline-block;
        width: 32.1%;
        color: #787878;
        padding: 2px 0;
        text-align: center;
        background-color: #f5f5f5;
        margin-bottom: 5px;
    }
    .weights .args:nth-child(2){
        margin: 0 5px;
    }
    .weights .args:nth-child(3n + 2){
        margin: 0 5px;
    }

    .colors .args {
        width: 28px;
        margin-right: 6px;
    }

    .clarity .args {
        width: 30.1%;
        margin-right: 5px;
    }
    .args.active {
        color: #eee;
        background-color: #333;
        /* background-color: #fff; */
        /* border: 1px solid #333; */
    }

    .spec-item .title {
        font-size:26px;
        color:#353535;
        margin-bottom: 20px;
    }

</style>
