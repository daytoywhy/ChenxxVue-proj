<template>
  <div id="layout">
    <div :class="['layout-container', opened ? 'open-sidebar' :'hidden-sidebar']">
      <AppSidebar class="sidebar-container" />
      <main class="main-container">
        <div class="app-header">
          <AppNav />
          <AppTab />
        </div>
        <AppPage class="app-page" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./layout.scss";
import { AppSidebar, AppNav, AppTab, AppPage } from "./components";
import { useSettingStore } from "@/store/modules/setting";
import { storeToRefs } from "pinia";
import { onUnmounted } from "vue";
const settingStore = useSettingStore();
const { opened, mobile } = storeToRefs(settingStore);
const resizeBody = () => {
  mobile.value = document.body.getBoundingClientRect().width - 1 < 992;
  opened.value = !mobile.value;
};
resizeBody();
window.addEventListener("resize", resizeBody);
onUnmounted(() => {
  window.removeEventListener("resize", resizeBody);
});
</script>
