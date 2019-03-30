<template>
    <div>
        <!--<h3>新闻资讯列表</h3>-->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(news,index) in newsList" :key="news.id">
                <router-link :to="'/home/newsInfo/' + news.id">
                    <img class="mui-media-object mui-pull-left" src="../../image/shuijiao.jpg">
                    <div class="mui-media-body">
                        <h1>{{ news.title }}</h1>
                        <p class="mui-ellipsis">
                            <span>发表时间:{{ news.add_time | dateFomat }} </span>
                            <span>阅读: {{ news.pageview }} 次</span>
                        </p>
                    </div>
                </router-link>
            </li>
            <!--<li class="mui-table-view-cell mui-media">-->
                <!--<a href="javascript:;">-->
                    <!--<img class="mui-media-object mui-pull-left" src="../../image/muwu.jpg">-->
                    <!--<div class="mui-media-body">-->
                        <!--木屋-->
                        <!--<p class="mui-ellipsis">想要这样一间小木屋，夏天挫冰吃瓜，冬天围炉取暖.</p>-->
                    <!--</div>-->
                <!--</a>-->
            <!--</li>-->
            <!--<li class="mui-table-view-cell mui-media">-->
                <!--<a href="javascript:;">-->
                    <!--<img class="mui-media-object mui-pull-left" src="../../image/cbd.jpg">-->
                    <!--<div class="mui-media-body">-->
                        <!--CBD-->
                        <!--<p class="mui-ellipsis">烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>-->
                    <!--</div>-->
                <!--</a>-->
            <!--</li>-->

        </ul>
    </div>
</template>

<script>
    export default {
        name: "newsList",
        data() {
          return {
                newsList: [
                    {
                        id: 1, // 资讯id
                        title: '小米9发布会 ',
                        add_time: '2019-05-16T03：50:28.00Z',
                        article: "小米9 战斗天使 好看又能打,小米9探索版,更强 骁龙855, 更快 20W 无线闪充",  // 内容摘要
                        pageview: 868, // 点击数
                    },
                    {
                        id: 2, // 资讯id
                        title: '中国铁路旅客发送量创春运单日新高',
                        add_time: '2019-05-16T03：50:28.00Z',
                        article: "新华社北京2月24日电（记者樊曦）记者从中国铁路总公司获悉，2月23日，全国铁路发送旅客1316.9万人次，同比增加368.2万人次，增长38.8%，创春运单日旅客发送量历史新高.",  // 内容摘要
                        pageview: 158, // 点击数
                    },
                    {
                        id: 3, // 资讯id
                        title: '中国男篮大胜叙利亚',
                        add_time: '2015-05-16T03：50:28.00Z',
                        article: "小米9 战斗天使 好看又能打,小米9探索版,更强 骁龙855, 更快 20W 无线闪充",  // 内容摘要
                        pageview: 98, // 点击数
                    },
                    {
                        id: 4, // 资讯id
                        title: '湖南89岁老人无证驾驶被罚1000元',
                        add_time: '2015-05-16T03：50:28.00Z',
                        article: "小米9 战斗天使 好看又能打,小米9探索版,更强 骁龙855, 更快 20W 无线闪充",  // 内容摘要
                        pageview: 73, // 点击数
                    },
                    {
                        id: 5, // 资讯id
                        title: '四川自贡发生4.7级地震',
                        add_time: '2015-05-16T03：50:28.00Z',
                        article: "小米9 战斗天使 好看又能打,小米9探索版,更强 骁龙855, 更快 20W 无线闪充",  // 内容摘要
                        pageview: 148, // 点击数
                    },
                    {
                        id: 6, // 资讯id
                        title: '世界移动通信大会看点多',
                        add_time: '2015-05-16T03：50:28.00Z',
                        article: "小米9 战斗天使 好看又能打,小米9探索版,更强 骁龙855, 更快 20W 无线闪充",  // 内容摘要
                        pageview: 567, // 点击数
                    },
                    {
                        id: 7, // 资讯id
                        title: '一图看懂：全球首款5G折叠屏手机华为Mate X',
                        add_time: '2015-05-16T03：50:28.00Z',
                        article: "小米9 战斗天使 好看又能打,小米9探索版,更强 骁龙855, 更快 20W 无线闪充",  // 内容摘要
                        pageview: 567, // 点击数
                    },
                    {
                        id: 8, // 资讯id
                        title: '上海查处公职人员违规收受春节礼品问题',
                        add_time: '2015-05-16T03：50:28.00Z',
                        article: "小米9 战斗天使 好看又能打,小米9探索版,更强 骁龙855, 更快 20W 无线闪充",  // 内容摘要
                        pageview: 567, // 点击数
                    },
                    {
                        id: 9, // 资讯id
                        title: '民众抱怨连天，日本冲绳举行驻日美军基地搬迁公投',
                        add_time: '2015-05-16T03：50:28.00Z',
                        article: "小米9 战斗天使 好看又能打,小米9探索版,更强 骁龙855, 更快 20W 无线闪充",  // 内容摘要
                        pageview: 567, // 点击数
                    },




                ]
            }
        },

        created(){
            // this.getNewsList();
        },

        methods: {
            getNewsList() {
                this.$http.get("http://vue.studyit.io/api/getnewslist").then(result => {
                    // console.log(result);
                })
            },
        },

    }
</script>

<style lang="scss" scoped>
    .mui-table-view  {
        padding-bottom: 50px;
        li {
            h1 { font-size: 16px; margin-bottom: 18px; }
            .mui-media-object {
                max-width: 60px;
                height: 60px;
            }
            .mui-ellipsis {
                font-size: 12px;
                color: #888;
                display: flex;
                justify-content: space-between;
            }
            a:not(.mui-btn).mui-active {
                background-color: #fff;
            }
        }


    }
</style>