<template>
  <div id="index-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div class="box-card">
            <div class="flex-left-box">
              <img class="avatar-img"
                   src="@/assets/image/avatar.png">
              <div class="tip-title">
                <p>{{handTip()}}</p>
              </div>
            </div>
            <FlipClock v-if="!mobile" />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24"
              :sm="24"
              :md="6"
              :lg="6"
              :xl="6">
        <QuickNav />
      </el-col>
      <el-col :xs="24"
              :sm="24"
              :md="18"
              :lg="18"
              :xl="18">
        <TodoList />
      </el-col>
      <el-col :xs="24"
              :sm="24"
              :md="12"
              :lg="12"
              :xl="12">
        <VersionInfo />
      </el-col>
      <el-col :xs="24"
              :sm="24"
              :md="12"
              :lg="12"
              :xl="12">
        <MyProject />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {
  FlipClock,
  QuickNav,
  TodoList,
  VersionInfo,
  MyProject,
} from "./components";
import { ref } from "vue";
import { useSettingStore } from "@/store/modules/setting";
import { storeToRefs } from "pinia";
const settingStore = useSettingStore();
const { mobile } = storeToRefs(settingStore);
const handTip = () => {
  const hour = new Date().getHours();
  return hour < 8
    ? "早上好，旅行者，新的一天也要加倍努力哦～"
    : hour <= 11
    ? "上午好，旅行者，一日之计在于晨"
    : hour <= 13
    ? "中午好，旅行者，中午要好好吃饭哦～"
    : hour <= 18
    ? "下午好，旅行者，早点下班休息～"
    : "晚上好，旅行者，愿你三冬暖，愿你春不寒";
};
</script>

<style lang="scss" scoped>
#index-container {
  .box-card {
    display: flex;
    justify-content: space-between;
    .flex-left-box {
      display: flex;
      align-items: center;
      .avatar-img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 16px;
      }
      .tip-title {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
}
</style>
