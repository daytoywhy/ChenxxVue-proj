<template>
  <div>
    <div class="sidebar-logo">
      <transition name="sidebar-logo-demo">
        <router-link class="sidebar-logo-link"
                     to="/">
          <i class="iconfont icon-Vue"></i>
          <h3 class="sidebar-title">
            {{ '后台管理'}}
          </h3>
        </router-link>
      </transition>
    </div>
    <el-scrollbar wrap-class="scroll-wrapper">
      <el-menu :default-active="activeMenu"
               unique-opened
               mode="vertical"
               @select="MenuSelect"
               :collapse="!opened"
               :collapse-transition="false">
        <template v-for="item in menuList"
                  :key="item?.id">
          <MenuItem v-if="!item?.meta?.hideInMenu"
                    :menu-item="item">
          </MenuItem>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import MenuItem from "./components/MenuItem.vue";
import { useRouterStore } from "@/store/modules/router";
import { useSettingStore } from "@/store/modules/setting";
import { storeToRefs } from "pinia";
const route = useRoute();
const router = useRouter();
const routerStore = useRouterStore();
const settingStore = useSettingStore();
const { getSideMenu: menuList } = storeToRefs(routerStore);
const { opened } = storeToRefs(settingStore);
const activeMenu = computed((): string => {
  const { meta, name } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return name;
});
const MenuSelect = (index: number, path: string, el: any) => {
  const query = {};
  const params = {};
  el?.route?.parameters &&
    el?.route?.parameters.forEach((item) => {
      if (item.type === "query") {
        query[item.key] = item.value;
        return;
      }
      params[item.key] = item.value;
    });

  if (index == route.name) return;
  if (/http(s)?:/.test(index)) {
    window.open(index);
  } else {
    router.push({ name: index, query, params });
  }
};
</script>
