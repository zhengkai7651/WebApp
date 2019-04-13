<template>
  <div class='page'>
    <div class="content">
      <div class='authen_form'>
        <form class='authen_info'>
          <div class='section'>
            <span>昵称</span>
            <input name="input" type='span'  placeholder='请输入昵称' ></input>
          </div>
          <div class='section'>
            <span>性别</span>
              <label>
                <img class="icon" src="../../image/radio_on.png" alt="man">
                <span>男</span>
              </label>
              <label style='margin-left:10px;'>
                <img class="icon" src="../../image/radio_off.png" alt="woman">
                <span>女</span> </label>
          </div>
          <div class='section'>
            <span>生日</span>
            <input type="text " placeholder='选择生日有惊喜哦' bindinput='setBarthaday'></input>
          </div>

          <div class='section'>
            <span>个人喜好</span>
            <input name="input " placeholder='个人兴趣、喜好'></input>
          </div>
        </form>
        <button type='button' class='btn-commit' @click="saveUserInfo">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "userInfo",

        methods: {
          saveUserInfo(){},
        }
    }
</script>

<style scoped>
  .page {
    background: #fff;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .authen_form {
    background-color: #fff;
    padding: 20px 4%;
  }
  .authen_form input {
    border: none;
  }
    /* 头部标题  */
  .authen_form .title {
    width: 100%;
    height: 100px;
    line-height: 100px;
    display: block;
    text-align: center;
    font-size: 36px;
  }

  /* 门店头像  */
  .authen_form .header {
    width: 100%;
    height: 96px;
    text-align: center;
    font-size: 15px;
    position: relative;
  }
  .authen_form .header .head-img {
    position: absolute;
    left: 50%;
    margin-left: -31px;
    width: 81px;
    height: 81px;
    border-radius: 50%;
  }
  .authen_form .header > .img-title {
    display: block;
    width: 100%;
    position: absolute;
    bottom: -10px;
  }

  .authen_form .header > .head-img {
    border-radius: 50%;
    width: 36px;
    height: 36px;
  }


  /* 表单数据  */
  .authen_form .section {
    margin: 12px;
    padding: 8px 0;
    font-size: 15px;
    border-bottom: 1px solid #ddd;
  }
  .authen_form .section > span{
    float: left;
    width: 26%;
  }
  .section .icon {
    width: 20px;
    vertical-align: sub;
  }
  .authen_form .section .describe{
    width:100%;
    color:#999;
    font-size: 12px;
    margin-bottom: 10px;
  }

  .authen_form .section .upload-img {
    width: 60px;
    height: 60px;
    line-height: 60px;
    background: none;
    font-size: 100px;
    font-weight: inherit;
    color: #ccc;
    float: right;
    margin-top: 10px;
  }

  .authen_form .section.upload {
    margin-top: 30px;
    width: 90%;
    padding: 5px 0;
  }


  .btn-commit {
    width: 100%;
    margin-top: 60px;
    padding: 10px 0;
    background: #2292e6;
    color: #fff;
    border-radius: 30px;
  }
</style>
