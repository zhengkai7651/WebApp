<template>
    <div class="mui-content">
      <div class="mui-input-row" style="margin: 10px 5px;">
        <textarea id="textarea" rows="5" placeholder="请输入您的建议..."></textarea>
        <button type="button" class="commit">提交</button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "feedback"
    }
</script>

<style scoped>
  .mui-content {
    padding: 10px;
  }
  .commit {
    display: block;
    width: 100%;
    padding: 8px 0;
    color: #fafafa;
    background-color: #3298e4;
  }
</style>
