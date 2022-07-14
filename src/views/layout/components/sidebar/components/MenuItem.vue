<template>
  <el-sub-menu v-if="showMenuType === 1"
               :index="menuItem?.name">
    <!-- element-plus改为具名插槽 -->
    <template #title>
      <i :class="menuItem?.meta?.icon"
         style="font-size: 18px; vertical-align: bottom; margin-right: 8px"></i>
      <span>{{ menuItem?.meta?.title }}</span>
    </template>
    <template v-for="i in menuItem?.children"
              :key="i?.id">
      <!-- 判断子菜单下面是否还有三级和四级菜单 -->
      <!-- 在组件中调用自己，递归组件文档 -->
      <!-- https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E9%80%92%E5%BD%92%E7%BB%84%E4%BB%B6 -->
      <!-- v-if 加key值的作用 vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染 -->
      <MenuItem v-if="i?.children"
                :menu-item="i">
      </MenuItem>
      <el-menu-item v-else
                    :index="i?.name">
        {{ i?.meta?.title}}
      </el-menu-item>
    </template>
  </el-sub-menu>
  <!-- 无子菜单 -->
  <el-menu-item v-else
                :index="menuItem?.name">
    <i :class="menuItem?.meta?.icon"
       style="font-size: 18px; vertical-align: bottom; margin-right: 8px"></i>
    <template #title>
      {{ menuItem?.meta?.title }}
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import { computed, PropType, toRefs } from "vue";
interface MenuType {
  id: number;
  path: string;
  name: string;
  component: unknown;
  redirect?: string;
  meta: {
    title: string;
    icon: string;
    frameSrc?: string;
    hideInMenu?: boolean;
    hideInBread?: boolean;
    noCloseTab?: boolean;
  };

  // 泛型就是在编译期间不确定的类型，在调用时由程序员指定泛型具体指向什么类型
  // 在定义函数或是类时，如果遇到类型不明确就可以使用泛型
  // Array<> 泛型类写法
  children?: Array<MenuType>;
}

const props = defineProps({
  menuItem: {
    type: Object as PropType<MenuType>,
    require: true,
    default: () => {},
  },
});
const { menuItem } = toRefs(props);

const item = menuItem.value as MenuType;

const showMenuType = computed((): number => {
  if (item?.children?.length > 0) {
    return 1;
  } else {
    return 0;
  }
});
</script>
