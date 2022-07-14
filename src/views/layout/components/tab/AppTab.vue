<template>
  <div class="app-tabs">
    <el-tabs type="card"
             class="app-tabs-content"
             v-model="activeName"
             @tab-click="handleTabClick"
             @tab-remove="removeTab">
      <el-tab-pane v-for="item in visitedRoutes"
                   :key="item.path"
                   :label="item.meta.title"
                   :name="item.path"
                   :closable="!item.meta.noCloseTab"></el-tab-pane>
    </el-tabs>
    <el-dropdown placement="top"
                 @command="handleCommand">
      <span class="tabs-more">
        <span class="tabs-more-icon">
          <i class="box box-t"></i>
          <i class="box box-b"></i>
        </span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="closeOther"> <i class="iconfont icon-guanbi"></i>关闭其他</el-dropdown-item>
          <el-dropdown-item command="closeLeft"> <i class="iconfont icon-jiantou_xiangzuo"></i>关闭左侧</el-dropdown-item>
          <el-dropdown-item command="closeRight"> <i class="iconfont icon-jiantou_xiangyou"></i>关闭右侧</el-dropdown-item>
          <el-dropdown-item command="closeAll"> <i class="iconfont icon-guanbi"></i>关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from "vue";
import { useTabStore } from "@/store/modules/tab";
import { useRouterStore } from "@/store/modules/router";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const route = useRoute();
const router = useRouter();
const tabStore = useTabStore();
const routerStore = useRouterStore();
const { routes } = storeToRefs(routerStore);
const {
  addVisitedRoute,
  delVisitedRoute,
  delOtherRoute,
  delLeftRoute,
  delRightRoute,
  delAllRoute,
} = tabStore;
const activeName = ref("");
const visitedRoutes = computed(() => tabStore.getVisitedRouteList);
const initNoCLosableTabs = (routes) => {
  for (const item of routes) {
    const { meta, children } = item;
    if (meta && meta.noCloseTab) addTabs(item);
    if (children) initNoCLosableTabs(children);
  }
};
const addTabs = (tab: any) => {
  addVisitedRoute(tab);
  activeName.value = tab.path;
};
const handleTabClick = (tab, event) => {
  router.push(visitedRoutes.value[tab.index]);
};
const removeTab = (pathName) => {
  toLastRouter();
  delVisitedRoute(pathName);
};
const toLastRouter = () => {
  const lastRouteView = visitedRoutes.value
    .filter((item) => item.path != route.path)
    .slice(-1)[0];
  if (lastRouteView) router.push(lastRouteView);
  else router.push("/");
};
initNoCLosableTabs(routes.value);
const handleCommand = (command) => {
  switch (command) {
    case "closeOther":
      delOtherRoute(route.path);
      break;
    case "closeLeft":
      delLeftRoute(route.path);
      break;
    case "closeRight":
      delRightRoute(route.path);
      break;
    case "closeAll":
      delAllRoute();
      toLastRouter();
      break;
  }
};
watch(
  () => route.path,
  () => addTabs(route),
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.app-tabs {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $base-tabs-height;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  :deep(.el-tabs) {
    height: 34px;
    .el-tabs__header {
      border-bottom: none;
      .el-tabs__nav {
        border: none;
      }
      .el-tabs__item {
        box-sizing: border-box;
        height: 100%;
        line-height: 34px;
        margin-right: 5px;
        border: none;
        transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
        &::after {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 2px;
          background-color: $base-color-blue;
          content: "";
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), border 0s,
            color 0.1s, font-size 0s;
        }
        &:hover {
          background: #e8f4ff;
        }
        &.is-active {
          background: #e8f4ff;
        }
      }
    }
  }
  .tabs-more {
    position: relative;
    box-sizing: border-box;
    &-icon {
      display: inline-block;
      color: #9a9a9a;
      cursor: pointer;
      transition: transform 0.3s ease-out;
      .box {
        width: 14px;
        height: 8px;
        display: block;
        position: relative;
        &::before {
          position: absolute;
          top: 2px;
          left: 0;
          width: 6px;
          height: 6px;
          content: "";
          background-color: #9a9a9a;
        }
        &::after {
          top: 2px;
          right: 0;
          position: absolute;
          width: 6px;
          height: 6px;
          content: "";
          background-color: #9a9a9a;
        }
        .box-t {
          &::before {
            transition: transform 0.3s ease-out 0.3s;
          }
        }
      }
    }
    &-active,
    &:hover {
      .tabs-more-icon {
        transform: rotate(90deg);
        .box-t {
          &::before {
            transform: rotate(45deg);
          }
        }
        .box {
          &::before,
          &::after {
            background-color: #5fa4d1;
          }
        }
      }
    }
  }
}
</style>
