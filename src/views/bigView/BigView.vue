<template>
  <div id="big-view">
    <div class="big-view-wrap"
         ref="screenRef">
      <div class="big-view-bg">
        <div class="loading"
             v-if="loading"
             v-loading.fullscreen.lock="true"
             element-loading-text="加载中..."
             element-loading-background="rgba(0,0,0,0.8)"></div>
        <div v-else
             class="big-view-body">
          <header>
            <div class="go-home"></div>
          </header>
          <main class="big-view-content">
            <!-- <my-count-to :startVal="1"
                         :endVal="29953"
                         :duration="3000"
                         color="#fff"
                         fontSize="100px" /> -->
            <div class="center-left"></div>
            <div class="center"></div>
            <div class="center-right"></div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./bigView.scss";
import adaptive from "@/utils/adaptive";
import { onMounted, ref, onBeforeUnmount } from "vue";
const loading = ref(true);
const { screenDraw, unScreenDraw, calcRate, screenRef } = adaptive();
const cancelLoading = () => {
  window.setTimeout(() => {
    loading.value = false;
  }, 1000);
};
onMounted(() => {
  screenDraw();
  calcRate();
  cancelLoading();
});
onBeforeUnmount(() => {
  unScreenDraw;
});
</script>

<style lang="scss" scoped>
</style>
