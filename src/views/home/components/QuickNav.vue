<template>
  <div class="quick-nav">
    <el-card>
      <template #header>
        <div>
          <div><i class="iconfont icon-chaxun"></i> 快捷导航</div>
        </div>
      </template>
      <el-row>
        <el-col v-for="item in list"
                :key="item.url"
                :xs="12"
                :sm="12"
                :md="8"
                :lg="8"
                :xl="8">
          <div class="search-nav-item"
               @click="handleViewUrl(item.url)">
            <i :class="item.icon"></i>
            {{ item.title }}
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const list = [
  {
    title: "百度",
    url: "https://baidu.com",
    icon: "iconfont icon-BaiDu",
  },
  {
    title: "谷歌",
    url: "https://www.google.com.hk/",
    icon: "iconfont icon-Google",
  },
  {
    title: "SOF ",
    url: "https://stackoverflow.com/",
    icon: "iconfont icon-stack-overflow-fill",
  },
  {
    title: "掘金",
    url: "https://juejin.cn/",
    icon: "iconfont icon-juejin-logo",
  },
  {
    title: "简书",
    url: "https://www.jianshu.com/",
    icon: "iconfont icon-jianshu",
  },
  {
    title: "思否",
    url: "https://segmentfault.com/",
    icon: "iconfont icon-segmentfault",
  },
];
const handleViewUrl = (url: string): void => {
  window.open(url);
};
</script>

<style lang="scss" scoped>
.quick-nav {
  :deep() {
    .el-card__body {
      padding: 0;
      margin: -1px 0 0 -1px;
    }
  }
  .search-nav-item {
    cursor: pointer;
    width: 100%;
    float: left;
    padding: 15px;
    display: flex;
    border: 0;
    box-shadow: 1px 0 0 0 #f0f0f0, 0 1px 0 0 #f0f0f0, 1px 1px 0 0 #f0f0f0,
      1px 0 0 0 #f0f0f0 inset, 0 1px 0 0 #f0f0f0 inset;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    transition: all 0.3s;
    i {
      font-size: 18px;
      color: rgb(167, 231, 129);
      margin-bottom: 10px;
    }
    &:hover {
      position: relative;
      z-index: 1;
      box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%),
        0 5px 12px 4px rgb(0 0 0 / 9%);
    }
  }
}
</style>