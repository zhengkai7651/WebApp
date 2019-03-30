<template>
    <div class='page'>
            <div class='main-menu'>
                <div class="weui-flex specInfo">
                    <div class="weui-flex__item" @click='startSort'>
                        <span>重量排序</span>
                        <img class='icon icon-sort' src='image/sort.png' v-if="sortType[0].status == 1"></img>
                        <img class='icon icon-sort' src='image/sort_up.png' v-if="sortType[0].status == 2"></img>
                        <img class='icon icon-sort' src='image/sort_down.png' v-if="sortType[0].status == 3"></img>
                    </div>
                    <div class="weui-flex__item" @click='startSort'>
                        <span>价格排序</span>
                        <img class='icon icon-sort' src='image/sort.png' v-if=" sortType[1].status == 1"></img>
                        <img class='icon icon-sort' src='image/sort_up.png' v-if="sortType[1].status == 2"></img>
                        <img class='icon icon-sort' src='image/sort_down.png' v-if="sortType[1].status == 3"></img>
                    </div>
                    <div class="weui-flex__item"@click='rightMenu = !rightMenu'>
                        <img src='image/filter.png'></img>
                        <span>精准筛选</span>
                        <!-- <span class='val icon-right'></span> -->
                    </div>

                </div>
                <div class='spec-item weights' v-for="(item,index) in specList " :key="item.key_id" v-for-index="sindex" v-if="item.show">
                    <template v-for="(item,index) in item.guige_value" >
                        <span class="args" :class="item.check ? 'active':''" @click='setFilterVal'>{{ item.name }}</span>
                    </template>
                </div>
                <div class="weui-flex  theader">
                    <div class="weui-flex__item" style='flex:0.6;'></div>
                    <template v-for="(item,index) in dm_cate ">
                        <div class="weui-flex__item"  >
                            <span>{{ item }}</span>
                        </div>
                    </template>

                </div>
            </div>
            <div class='table-dom'>
                    <!--  tbody  -->
                    <div class="weui-flex tbody" v-for="(item,index) in diamonds" >
                        <div class="weui-flex__item" style='flex:0.6;'>
                            <img src="http://img.store.v-union.cn/pics/2019/25845749652652465/pro/201904/1548218565636_s.png"></img>
                        </div>
                        <template v-for="(val,index) in item">
                            <div class="weui-flex__item" v-if="index == 2 || index == 4 || index == 5 || index == 6|| index == 7|| index == 11"   @click='getSKUDetail' >
                                <span v-if="index == 11">￥</span>{{ val }}
                            </div>
                        </template>
                    </div>
                    <div class='histmsg' v-if="empty && diamonds.length == 0">未搜索到匹配条件的钻石</div>
            </div>

            <!--  右侧菜单  -->
            <div class='mask' v-if="rightMenu" @click='rightMenu = !rightMenu'></div>
            <div class='rightMenu' v-show="rightMenu">
                <div scroll-y="true" style='height:90%;'>
                    <div class='spec-item' >
                        <div class='title' >{{wgList.name}}</div>
                        <div class='weights' >
                            <template v-for="(item,index) in wgList.guige_value"  >
                                <span class="args" :class=" item.check ? 'active':''"  @click='setWgText'>{{item.name}}ct
                                    <span v-if="index == wgList.guige_value.length -1">以上</span>
                                </span>
                            </template>
                        </div>
                    </div>
                    <div class='spec-item'>
                        <div class='title'>{{psList.name}}</div>
                        <div class=' weights'>
                            <template v-for="(item,index) in psList.guige_value" >
                                <span class="args"  :class="item.check ? 'active':''" @click='setPsText'>{{item.name}}元
                                    <span v-if="index == psList.guige_value.length -1">以上</span>
                                </span>
                            </template>
                        </div>
                    </div>
                    <div class='spec-item' v-for="(item,index) in specList" >
                        <div class='title'>{{item.name}}</div>
                        <div class=' weights'>
                            <template v-for="(item,index) in item.guige_value"  >
                                <span class="args" :class=" item.check ? 'active':''" @click='setFilterVal'>{{item.name}}</span>
                            </template>
            </div>
          </div>
        </div>
        <div class='select_btn'>
          <span class='btn reset' @click='resetMenuFilters'> 重置</span>
          <span class='btn ok' @click='multistepFilter'> 确认</span>
        </div>
      </div>
    </div>

</template>

<script>
    import mui from "../lib/mui/js/mui.min";
    import '../lib/weui.css';

    export default {
        name: "category",
        data(){
            return {
                rightMenu: false,
                wgList: {
                    name: "重量", guige_value: [
                        { name: "0.3-0.59" },
                        { name: "0.6-0.99" },
                        { name: "1-1.99" },
                        { name: "2-2.99" },
                        { name: "3-20" },
                    ],
                },
                psList: {
                    name: "价格", guige_value: [
                        { name: "1000-5000", value: '1000-5000' },
                        { name: "5001-1万", value: '5001-10000' },
                        { name: "1万-2万", value: '1000-20000' },
                        { name: "2万-5万", value: '20000-50000' },
                        { name: "10万", value: '100000' },
                    ],
                },
                specInfo: {
                    weight: false,
                    colors: false,
                    clarity: false,
                },
                specList: [
                    {
                        "guige_value": [
                            {
                                "key_id": "25932594394702616",
                                "name": "EX",
                                "name_en": "EX"
                            },
                            {
                                "key_id": "25932594394702617",
                                "name": "GO",
                                "name_en": "GO"
                            },
                            {
                                "key_id": "25932594394702618",
                                "name": "VG",
                                "name_en": "VG"
                            }
                        ],
                        "key_id": "25932594394694498",
                        "name": "抛光",
                        "name_en": "Polishing"
                    },
                    {
                        "guige_value": [
                            {
                                "key_id": "25932594394702620",
                                "name": "F",
                                "name_en": "F"
                            },
                            {
                                "key_id": "25932594394702621",
                                "name": "M",
                                "name_en": "M"
                            },
                            {
                                "key_id": "25932594394702622",
                                "name": "N",
                                "name_en": "N"
                            },
                            {
                                "key_id": "25932594394702623",
                                "name": "S",
                                "name_en": "S"
                            },
                            {
                                "key_id": "25932594394703851",
                                "name": "EX",
                                "name_en": "EX"
                            }
                        ],
                        "key_id": "25932594394694500",
                        "name": "荧光",
                        "name_en": "fluorescence"
                    }
                ],
                page: 1,
                noMore: false,
                empty: false,
                dm_cate: ["重量", "形状", "颜色", "净度", "切工", "价格"], // 钻石SKU
                diamonds: [

                    [
                        "25932594394704420",
                        "/2019/25845749652652465/pro/201904/1548137863134_s.png",
                        "0.3",
                        "省检",
                        "定制",
                        "D-H",
                        "SI",
                        "EX",
                        "EX",
                        "EX",
                        "EX",
                        "2600.00"
                    ],
                    [
                        "25932594394699532",
                        "/2019/25845749652652465/pro/201904/1548137863134_s.png",
                        "0.4",
                        "省检",
                        "定制",
                        "D-H",
                        "SI",
                        "EX",
                        "EX",
                        "EX",
                        "EX",
                        "3100.00"
                    ],
                    [
                        "25932594394699850",
                        "/2019/25845749652652465/pro/201904/1548218565636_s.png",
                        "0.3",
                        "GIA",
                        "圆形",
                        "K",
                        "VS",
                        "EX",
                        "EX",
                        "EX",
                        "N",
                        "4000.00"
                    ],
                    [
                        "25932594394699851",
                        "/2019/25845749652652465/pro/201904/1548218565636_s.png",
                        "0.31",
                        "GIA",
                        "圆形",
                        "J",
                        "SI",
                        "EX",
                        "EX",
                        "EX",
                        "N",
                        "4000.00"
                    ],
                    [
                        "25932594394699848",
                        "/2019/25845749652652465/pro/201904/1548218565636_s.png",
                        "0.3",
                        "GIA",
                        "圆形",
                        "M",
                        "SI",
                        "EX",
                        "EX",
                        "EX",
                        "N",
                        "4000.00"
                    ],
                    [
                        "25932594394699849",
                        "/2019/25845749652652465/pro/201904/1548218565636_s.png",
                        "0.3",
                        "GIA",
                        "圆形",
                        "K",
                        "VS2",
                        "EX",
                        "EX",
                        "EX",
                        "N",
                        "4000.00"
                    ],
                    [
                        "25932594394699579",
                        "/2019/25845749652652465/pro/201904/1548137863134_s.png",
                        "0.56",
                        "省检",
                        "定制",
                        "E-H",
                        "P",
                        "EX",
                        "EX",
                        "EX",
                        "EX",
                        "4800.00"
                    ],
                    [
                        "25932594394699853",
                        "/2019/25845749652652465/pro/201904/1548218565636_s.png",
                        "0.34",
                        "GIA",
                        "圆形",
                        "G",
                        "VS2",
                        "EX",
                        "EX",
                        "EX",
                        "N",
                        "5000.00"
                    ],
                    [
                        "25932594394699843",
                        "/2019/25845749652652465/pro/201904/1548218565636_s.png",
                        "0.4",
                        "GIA",
                        "圆形",
                        "J",
                        "VS",
                        "EX",
                        "EX",
                        "EX",
                        "N",
                        "5000.00"
                    ],
                    [
                        "25932594394699842",
                        "/2019/25845749652652465/pro/201904/1548218565636_s.png",
                        "0.3",
                        "GIA",
                        "圆形",
                        "E",
                        "VVS2",
                        "EX",
                        "EX",
                        "EX",
                        "N",
                        "6000.00"
                    ],
                    [
                        "25932594394699845",
                        "/2019/25845749652652465/pro/201904/1548218565636_s.png",
                        "0.5",
                        "GIA",
                        "圆形",
                        "L",
                        "VS2",
                        "EX",
                        "EX",
                        "EX",
                        "N",
                        "6000.00"
                    ],[
                        "25932594394699841",
                            "/2019/25845749652652465/pro/201904/1548218565636_s.png",
                            "0.4",
                            "GIA",
                            "圆形",
                            "H",
                            "SI",
                            "EX",
                            "EX",
                            "EX",
                            "N",
                            "6000.00"
                        ],
                    [
                        "25932594394699852",
                        "/2019/25845749652652465/pro/201904/1548218565636_s.png",
                        "0.5",
                        "GIA",
                        "圆形",
                        "K",
                        "SI",
                        "EX",
                        "EX",
                        "EX",
                        "N",
                        "6500.00"
                    ],
                ],
                sortType: [ // 1 2 3 处理
                    { name: "重量排序", status: 1, stype: "weight", start: false },
                    { name: "价格排序", status: 1, stype: "price", start: false }
                ],
                sortObj:''
            }
        },

        created(){
            mui.init();
        },

        mounted(){

        },

        methods:{
            // 显示右侧筛选菜单列表
            toggleRight() {
                this.setData({
                    rightMenu: !this.data.rightMenu
                });
            },

            // 显示筛选条件
            showFilter(e) {
                let i = e.currentTarget.dataset.index;
                var specFilter = this.data.specList;
                console.log(specFilter[i])

                specFilter[i].show = !specFilter[i].show;
                this.setData({
                    specList: specFilter
                });
            },

            // 选择重量排序
            setWgText(e) {
                // let s = e.currentTarget.dataset.sindex;
                let v = e.currentTarget.dataset.vindex;
                // console.log( v);
                var wgFilter = this.data.wgList;
                var specVal = wgFilter.guige_value[v].name;
                // console.log(specVal);
                for (var i = 0; i < wgFilter.guige_value.length; i++) {
                    if (i != v) {
                        wgFilter.guige_value[i].check = false;
                    }
                }
                wgFilter.guige_value[v].check = !wgFilter.guige_value[v].check;
                wgFilter.wgtext = wgFilter.guige_value[v].check ? specVal: '';
                this.setData({ wgList: wgFilter });
            },

            // 选择重量排序
            setPsText(e) {
                // let s = e.currentTarget.dataset.sindex;
                let v = e.currentTarget.dataset.vindex;
                console.log(v);
                var psFilter = this.data.psList;
                var specVal = psFilter.guige_value[v].value;
                if (specVal.indexOf("-") == -1){
                    specVal = specVal + "-";
                }
                // console.log(specVal);
                for (var i = 0; i < psFilter.guige_value.length; i++) {
                    if (i != v) {
                        psFilter.guige_value[i].check = false;
                    }
                }
                psFilter.guige_value[v].check = !psFilter.guige_value[v].check;
                psFilter.pstext = psFilter.guige_value[v].check ? specVal:'';
                this.setData({
                    psList: psFilter
                });
            },

            // 选择筛选条件 参数
            setFilterVal(e) {
                let s = e.currentTarget.dataset.sindex;
                let v = e.currentTarget.dataset.vindex;
                console.log(s, v)
                var specFilter = this.data.specList;
                console.log(specFilter[s]);
                specFilter[s].guige_value[v].check = !specFilter[s].guige_value[v].check;
                this.setData({
                    specList: specFilter
                });
            },

            //用 ; 号拼接 已选添加参数
            getFilterVals() {
                var specFilter = this.data.specList;
                var specText = [];
                for (var i = 0; i < specFilter.length; i++) {
                    var curVals = [];
                    for (var j = 0; j < specFilter[i].guige_value.length; j++) {
                        if (specFilter[i].guige_value[j].check) {
                            curVals.push(specFilter[i].guige_value[j].name);
                        }
                    }
                    if (curVals.length > 0) {
                        curVals = curVals.join(",");
                        specText.push({ key_id: specFilter[i].key_id, spectext: curVals});
                    }
                }
                console.log(specText);
                return specText;
            },

            // 多级搜索
            multistepFilter() {
                specObj = this.getFilterVals();
                var psText = this.data.psList.pstext;
                var wgtext = this.data.wgList.wgtext;
                var sortObj = this.data.sortObj;;
                // console.log('spText----[ ',specObj);
                // return;
                this.setData({ page: 1, noMore: false });
                this.getDiamond(sortObj, specObj, wgtext, psText);
                this.toggleRight();
            },

            // 重置
            resetMenuFilters() {
                var specs = this.resetFilter(this.data.specList);
                var wgList = this.data.wgList;
                var psList = this.data.psList;
                var sorts = this.data.sortType;
                psList.pstext = '';
                wgList.wgtext = '';
                for (var w = 0; w < wgList.guige_value.length; w++) {
                    wgList.guige_value[w].check = false;
                }
                for (var p = 0; p < psList.guige_value.length; p++) {
                    psList.guige_value[p].check = false;
                }
                sorts[0].status = 1;
                sorts[0].start = false;
                sorts[1].status = 1;
                sorts[1].start = false;
                specObj = [];
                this.setData({
                    specList: specs,
                    wgList: wgList,
                    psList: psList,
                    sortType: sorts,
                    sortObj: '',
                });
            },


            // 规格参数显示
            toggleSpecInfo(e) {
                let i = e.currentTarget.dataset.index;
                console.log(i)
                switch (i) {
                    case 0:
                        this.setData({
                            'specInfo.weight': !this.data.specInfo.weight
                        })
                        break;
                    case 1:
                        this.setData({
                            'specInfo.colors': !this.data.specInfo.colors
                        })
                        break;
                    case 2:
                        this.setData({
                            'specInfo.clarity': !this.data.specInfo.clarity
                        });
                        break;
                }
            },

            // 获取筛选条件列表
            getFilters() {
                app.loading();
                const auth = wx.getStorageSync("auth");
                const url_info = {
                    url: 'https://api.sms.v-union.cn/mediumApi/products/get_cate_guige',
                    data: {
                        category_keyid: "25932594394694472", // 商品类型
                    },
                    header: { "Auth": auth }
                }
                // console.log(url_info)
                // 获取 authen 身份令牌
                app.getHttp(url_info).then((data) => {
                    // console.log(data.data);
                    if (data.data.status == 200) {
                        var filters = data.data.data.guige;
                        filters = this.data.specList.concat(filters);
                        filters = this.resetFilter(filters);
                        this.setData({ specList: filters });
                    } else { app.showMsg(data.data.statusText); }
                    this.setData({ fail: false });
                    wx.hideLoading();
                }, ((reject) => {
                    wx.hideLoading();
                    app.showMsg('网络异常,请检查网络后重试！');
                })).then(() => {
                    this.getDiamond('',[]);
                });
            },

            // 重置 钻石筛选条件
            resetFilter(filters) {
                specArr = [];
                for (var i = 0; i < filters.length; i++) {
                    filters[i].show = false;
                    specArr.push({ name: filters[i].name, val: [] });
                    for (var j = 0; j < filters[i].guige_value.length; j++) {
                        filters[i].guige_value[j].check = false;
                    }
                }
                return filters;
            },

            startSort(e) {
                var i = e.currentTarget.dataset.index;
                var sortTypes = this.data.sortType;
                // 对象{ “name”: ”weight”, value: ”asc” } ，name取值weight：重量、price：价	格、vaue取值asc: 升序、desc：降序
                var sortObj = '';
                if (sortTypes[i].stype === "weight") {
                    sortObj = {
                        "name": "weight",
                        value: sortTypes[i].start ? "asc" : 'desc'
                    };
                } else if (sortTypes[i].stype === "price") {
                    sortObj = {
                        "name": "price",
                        value: sortTypes[i].start ? "asc" : 'desc'
                    };
                }

                for (var y = 0; y < sortTypes.length; y++) {
                    if (y != i) {
                        sortTypes[y].start = false;
                        sortTypes[y].status = 1;
                    }
                }
                sortTypes[i].status = sortTypes[i].start ? 2 : 3;
                sortTypes[i].start = !sortTypes[i].start;
                var wgtext = this.data.wgList.wgtext || '';
                var pstext = this.data.psList.pstext || '';
                this.setData({
                    sortType: sortTypes,
                    sortObj: sortObj,
                    page: 1,
                    noMore: false,
                });
                this.getDiamond(sortObj, specObj, wgtext, pstext);
            },

            // 获取钻石 SKU
            // 排序方式 , 筛选条件 , 重量筛选 , 价格筛选
            getDiamond(sortObj, specObj, wgObj, psObj) {
                app.loading();
                const auth = wx.getStorageSync("auth");
                const url_info = {
                    url: 'https://api.sms.v-union.cn/mediumApi/products/get_cate_sku',
                    data: {
                        category_keyid: "25932594394694472", // 商品类型
                        com_key_id: "25879293162684510",
                        sort: sortObj,
                        weight_search: wgObj,
                        price_search: psObj,
                        guige_search: specObj,
                        page: this.data.page,
                        size: 30,
                    },
                    header: { "Auth": auth }
                }
                // console.log(url_info)
                // 获取 authen 身份令牌
                app.getHttp(url_info).then((data) => {
                    // console.log(data.data);
                    wx.hideLoading();
                    if (data.data.status == 200) {
                        var diamonds = data.data.data.sku;
                        var dm_cate = '';
                        if (diamonds.length) {
                            if (this.data.page == 1) {
                                dm_cate = diamonds.shift();
                            }
                            for (var i = 0; i < diamonds.length; i++) {
                                if (diamonds[i][2].indexOf("-") > 0) {
                                    if (parseFloat(diamonds[i][2].split('-')[1]) == 0) {
                                        diamonds[i][2] = parseFloat(diamonds[i][2].relace("-0.0000"));
                                    } else {
                                        var wgs = diamonds[i][2].split('-');
                                        diamonds[i][2] = parseFloat(wgs[0]) + '-' + parseFloat(wgs[1]);
                                    }
                                } else {
                                    diamonds[i][2] = parseFloat(diamonds[i][2]);
                                }
                                diamonds[i][11] = parseFloat(diamonds[i][11]);
                            }
                        }
                        var nowDm = this.data.diamonds;
                        if (this.data.page > 1 && nowDm.length && diamonds.length) {
                            diamonds = nowDm.concat(diamonds);
                        }
                        if (this.data.page > 1 && diamonds.length == 0) {
                            this.setData({ noMore: true });
                            app.showMsg("已经到底啦!");
                            return;
                        }
                        if (this.data.page == 1 && diamonds.length > 0) {
                            this.setData({ diamonds: diamonds });
                            return;
                        }
                        // if (diamonds.length) {
                        this.setData({
                            // dm_cate: dm_cate ? dm_cate : this.data.dm_cate,
                            diamonds: diamonds,
                            empty: diamonds.length == 0 ? true : false,
                        });
                        // }
                    } else {
                        app.showMsg(data.data.statusText);
                    }
                    this.setData({
                        fail: false
                    })
                }, ((reject) => {
                    wx.hideLoading();
                    app.showMsg('网络异常,请检查网络后重试！');
                })).then(() => { })
            },
            // 获取SKU商品
            getSKUDetail(e) {
                var kid = e.target.dataset.kid;
                // console.log(kid);
                app.loading();
                const auth = wx.getStorageSync("auth");
                const url_info = {
                    url: 'https://api.sms.v-union.cn/mediumApi/products/get_sku_detail',
                    data: { sku_keyid: kid },
                    header: { "Auth": auth }
                }
                // console.log(url_info)
                // 获取 authen 身份令牌
                app.getHttp(url_info).then((data) => {
                    console.log(data.data);
                    if (data.data.status == 200) {
                        var prod = data.data.data.sku_detail;
                        prod.spec_info = {};
                        this.showDetail(prod);
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
                })).then(() => { })
            },

            // 商品详情
            showDetail(prod) {
                console.log(prod)
                onfire.fire("prod", prod);
                wx.navigateTo({
                    url: '../detail/detail',
                })
            },

        },
    }
</script>

<style scoped>
    .mask { position: absolute; top: 0;left: 0; right: 0;bottom: 0; background-color: rgba(0,0,0,0.3); z-index: 30; }

    /* page/product_all/diamond/diamond.wxss */
    .sort-menu { width: 100%; height: 36px; padding: 8px 0; font-size: 16px; border-bottom: 1px solid #eee; }
    .sort{ float: left; padding: 0 10px; }
    .specInfo { border-bottom: 1px solid #ddd; z-index: 3; }
    .specInfo .color {  border-left: 1px solid #ddd;border-right: 1px solid #ddd; }
    .filter { float: right; padding: 0 10px; margin-right: 50px; }
    .filter img { width: 24px; height: 24px; vertical-align: middle; }
    .sort.active { font-weight: bold; }
    .table-dom {position: fixed; top: 120px; width: 100%; height: calc(100% - 170px); overflow-y: scroll;  }
    .weui-flex { font-size: 14px; background-color: #fff}
    .weui-flex__item img {width: 24px; height: 24px;vertical-align: middle; }
    .weui-flex__item .icon-sort { width: 16px;height: 18px;}
    .weui-flex__item .icon { position: absolute; top: 12px;}
    .histmsg { text-align: center; line-height: 50px; font-size: 14px; color: #888; }
    .theader {  border-bottom: 1px solid #eee; background-color: #fff; z-index: 3;}
    .weui-flex__item { padding: 8px 0;  text-align: center; position: relative; }
    .tbody { font-size: 14px;  }
    .tbody:nth-child(2n+1) { background-color: #F5F9FC; }
    /* position: fixed; width: 100%; */
    .icon-right:after{content:" ";display:inline-block;margin-left: 12px;height:6px;width:6px; margin-bottom: 2px;border-width:0px 2px 2px 0;border-color:#acacac;border-style:solid;-webkit-transform:matrix(.71,.71,-.71,.71,0,0);transform:matrix(.71,.71,-.71,.71,0,0);
    }
    /*  规格参数  */
    .spec-item {
        padding: 12px;
        font-size: 14px;
    }
    .spec-item .args {
        display: inline-block;
        /* width: 32.1%; */
        color: #787878;
        font-size: 14px;
        padding: 2px 10px;
        margin-right: 10px;
        text-align: center;
        background-color: #f5f5f5;
        margin-bottom: 5px;
    }

    .colors .args {
        width: 28px;
        margin-right: 3px;
    }

    .clarity .args {
        width: 32px;
        margin-right: 3px;
    }
    .args.active {
        color: #eee;
        background-color: #333;

    }
    .spec-item .title {
        font-size: 12px;
        color:#353535;
        margin-bottom: 10px;
    }
    .rightMenu {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 88%;
        height: 100%;
        z-index: 100;
        background-color: #fff;
        animation: rightAni 1s;
    }
    /*  购买 购物车按钮  */
    .select_btn {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 51px;
        font-size: 16px;
        border-top: 1px solid #999;
        z-index: 999;
    }

    .select_btn > .btn {
        display: inline-block;
        width: 50%;
        color: #fff;
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
    .select_btn .reset {
        color: #232323;
        background-color: #fff;
    }
    .select_btn .ok {
        float: right;
        color: #fff;
        background-color: #333;
    }
    @keyframes rightAni {
        0% {
            right: -88%;
        }
        100% {
            right: 0;
        }
    }
</style>