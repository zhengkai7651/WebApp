<template>
  <div>
    <h1>这是登录组件，使用 .vue 文件定义出来的 --- {{msg}}</h1>
    <mt-button type="default" size="small">default</mt-button>
    <mt-button type="primary" size="large" @click="show()">primary</mt-button>
    <mt-button type="danger" size="normal" plain @click="loading()">danger</mt-button>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import { Indicator } from 'mint-ui';

  export default {
     name: 'login',
    data() {
      // 注意：组件中的 data 必须是 function
      return {
        msg: "123"
      };
    },
    created(){
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
      this.getList();
    },

    methods: {
      getList() {
          setTimeout(function() {
              Indicator.close();
          },3000);
      },
      show() {
        Toast("提示信息");
      },
      loading(){

      },

    }
  };
</script>

<style scoped>
  mt-button {
    margin-bottom: 10px;
  }
</style>
