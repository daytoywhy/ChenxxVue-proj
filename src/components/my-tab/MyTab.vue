<template>
  <div class="my-tabs">
    <div class="tab-container">
      <div v-if="$slots.preContent">
        <slot name="preContent" />
      </div>
      <div v-for="(item,index) in tabs"
           :key="index"
           :class="['tab-wrap',{ active: activeValue == item.name}]"
           @click="onTabClick(item,$event)">
        <span class="tab-title">{{ item.label }}</span>
        <span v-if="$slots.suffix">
          <slot name="suffix" />
        </span>
      </div>
      <div v-if="$slots.append">
        <slot name="append" />
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, computed, useSlots, watch } from "vue";
const slots = useSlots();
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
});
const { modelValue } = toRefs(props);
const state = reactive({
  activeValue: modelValue.value, //props里面的数据一般为只度，重新赋值可能会报错
  tabs: [],
  list: computed(() => slots?.default()), //通过计算属性获取插槽的数量
});
const getTabList = (arr) => {
  for (const item of arr) {
    if (item?.type?.name && item?.type?.name == "MyTabPane") {
      state.tabs.push(item?.props);
    }
    if (!Array.isArray(item.children)) continue;
    getTabList(item.children);
  }
};
watch(
  () => slots.default(),
  () => {
    state.tabs = [];
    getTabList(state.list);
  },
  { immediate: true, deep: true }
);
const emit = defineEmits(["tab-click"]);
const onTabClick = (item, event: Event) => {
  state.activeValue = item.name;
  emit("tab-click", item, event);
};
const { tabs, activeValue } = toRefs(state);
</script>

<style lang="scss" scoped>
.my-tabs {
  position: relative;
  margin-bottom: 20px;
  .tab-container {
    display: flex;
    align-items: center;
    border: none;
    border-bottom: 2px solid rgb(147, 204, 121);
    .tab-wrap {
      padding: 6px;
      font-size: 16px;
      position: relative;
      bottom: -2px;
      border: 2px solid #e6e5e1;
      border-bottom: none;
      border-radius: 5px 5px 0 0;
      margin-right: 5px;
      display: flex;
      align-items: center;
      transition: all 0.5s ease 0s;
      .tab-title {
        cursor: pointer;
      }
      &::before {
        content: "";
        display: block;
        height: 4px;
        position: absolute;
        background-color: #fff;
        bottom: -2px;
        left: 0;
        transition: all 0.5 ease-in-out 0s;
      }
      &.active {
        background-color: #fff;
        border: 2px solid rgb(147, 204, 121);
        border-bottom: none;
        color: rgb(147, 204, 121);
      }
    }
  }
}
</style>