<template>
  <div class="mui-content">
    <p>嘉华大厦可敬的哈萨克接电asdasdasd话</p>
    <input type="text" v-model="testVal">
    <span v-text="testVal"></span>
    <h1>{{ $store.state.count }}</h1>
    <h2>{{ $store.getters.getCount }}</h2>
    <button class="mui-btn mui-btn-primary" @click="add">添加</button>
    <button class="mui-btn mui-btn-danger" @click="subtract">递减</button>
  </div>
</template>

<script>
    export default {
        name: "vueXTest",
        data() {
          return {
            testVal: 0
          }
        },
        methods : {
          add(){
            var a = parseInt(this.testVal);
            this.$store.commit("increment",a);
          },
          subtract(){
            var b = parseInt(this.testVal);
            this.$store.commit("subtract",b);
          }

        }
    }
</script>

<style scoped>

</style>
