<template>
  <div id="error-container">
    <div class="error-wrapper">
      <div class="error-img">
        <img class="__parent"
             :src="fourZeroFour"
             alt="401">
        <img class="__child left"
             :src="cloud"
             alt="401">
        <img class="__child middle"
             :src="cloud"
             alt="401">
        <img class="__child right"
             :src="cloud"
             alt="401">
      </div>
      <div class="error-content">
        <div class="bullshit__title">404</div>
        <div class="bullshit__headline">当前页面不存在...</div>
        <div class="bullshit__info">请检查您输入的网址是否正确,或者点击下面的按钮返回首页。</div>
        <el-button type="primary"
                   round
                   @click="toHome">
          {{ jumpTime }}s 回到首页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./error.scss";
import fourZeroFour from "@/assets/image/404.png";
import cloud from "@/assets/image/cloud.png";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const jumpTime = ref(10);
const timer = ref(null);
const changeJumpTime = (): void => {
  timer.value = setInterval(() => {
    if (jumpTime.value) {
      jumpTime.value--;
    } else {
      router.push("/");
    }
  }, 1000);
};
const toHome = (): void => {
  router.push("/");
};
onMounted(() => {
  changeJumpTime();
});
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
  timer.value = null;
});
</script>

<style lang="scss" scoped>
</style>
