<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in breadcrumbList"
                          :key="item.path">
        <span v-if="item.redirect">
          {{ item.meta.title }}
        </span>
        <span v-else
              @click="handleLink(item)">
          {{ item.meta.title}}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { ref, watch } from "vue";
const route = useRoute();
const router = useRouter();
const breadcrumbList = ref([]);

const getBreadcrumb = (): void => {
  breadcrumbList.value = route.matched.filter(
    (item) => item?.meta?.title && item?.meta?.hideInBread !== true
  );
};
getBreadcrumb();

watch(
  () => route.path,
  () => getBreadcrumb()
);
const handleLink = (item: any): any => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect);
    return;
  }
  router.push(path);
};
</script>
