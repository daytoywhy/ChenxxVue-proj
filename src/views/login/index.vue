<template>
  <div id="login">
    <header>
      <div class="header-logo">
        <a href="javascript:;"></a>
        <img src="@/assets/image/logo.jpg"
             class="logo"
             alt="">
        <span class="title">daytoywhy</span>
      </div>
      <div class="header-desc">心脏是一座有两间房子的卧室，一间住着痛苦，另一间住着快乐。人不能笑的太响，否责笑声会吵醒隔壁房间的痛苦 </div>
    </header>
    <div class="content">
      <el-tabs v-model="activeName"
               stretch>
        <el-tab-pane label="账号密码登录"
                     name="account">
          <UserLogin></UserLogin>
        </el-tab-pane>
        <el-tab-pane label="手机号登录"
                     name="phone">
          <PhoneLogin></PhoneLogin>
        </el-tab-pane>
      </el-tabs>
    </div>
    <footer>任何先进的技术，就像魔法一样</footer>
  </div>
</template>

<script setup lang="ts">
import { UserLogin, PhoneLogin } from "./components";
import { ref } from "vue";
const activeName = ref("account");
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background: #fff url(@/assets/image/background.svg) no-repeat 60px 60px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  header {
    .header-logo {
      @include box-center(center, center);
      .logo {
        height: 60px;
        vertical-align: top;
        margin-right: 16px;
      }
      .title {
        height: 60px;
        line-height: 60px;
        font-size: 30px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 600;
      }
    }
    .header-desc {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
      margin: 12px 0 60px 0;
    }
  }
  footer {
    position: fixed;
    bottom: 0;
    height: 60px;
    width: 100%;
    line-height: 60px;
    text-align: center;
    font-size: 12px;
  }
}
</style>