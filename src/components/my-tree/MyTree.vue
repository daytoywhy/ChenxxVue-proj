<template>
  <div class="my-tree-container"
       :style="{width:setWidth}">
    <el-select ref="mySelectRef"
               style="width:100%;"
               :multiple="isMultiple"
               clearable
               v-model="treeDataValue"
               :disabled="disabled"
               @clear="handleClear"
               :teleported="false">
      <el-option :value="treeDataValue">
        <el-tree ref="treeRef"
                 :expand-on-click-node="false"
                 :data="treeData"
                 :props="defaultProps"
                 node-key="id"
                 highlight-current
                 :default-expanded-keys="expandTreeIds"
                 @node-click="handleNodeClick">
          <template #default="{node}">
            <span>{{node.label}}</span></template>
        </el-tree>
      </el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { reactive, PropType, toRefs, watch, nextTick } from "vue";
const state = reactive({
  treeDataValue: "",
  mySelectRef: null,
  treeRef: null,
  expandTreeIds: [],
});
interface ConfigType {
  label: string;
  value: string;
  children: string;
}
interface dataType {
  id: string;
  parentId: string;
  path: string;
  name: string;
  component: string;
  redirect: string;
  title: string;
  icon: string;
  frameSrc: string;
  hideInMenu: boolean;
  hideInBread: boolean;
  noCloseTab: boolean;
  sort: number;
  isNew: number;
  children: DataType[] | null;
}
const props = defineProps({
  setWidth: { type: String, default: "100%" },
  modelValue: { type: String, default: () => "" },
  isMultiple: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  defaultProps: {
    type: Object as PropType<ConfigType>,
    default: () => {
      return { label: "title", value: "id", children: "children" };
    },
  },
  treeData: {
    type: Array as PropType<dataType>,
    default: () => [],
  },
});
const { setWidth, modelValue, isMultiple, disabled, defaultProps, treeData } =
  toRefs(props);
const getExpandTree = () => {
  state.expandTreeIds.push(treeData.value[0].id);
};
getExpandTree();
const getTreeDataValue = (arr, param) => {
  if (!param) {
    state.treeDataValue = "";
    return;
  }

  const label = defaultProps.value.label;
  const value = defaultProps.value.value;
  const children = defaultProps.value.children;
  for (const item of arr) {
    if (item[value] === param) {
      state.treeDataValue = item[label];
      nextTick(() => {
        state.treeRef.setCurrentKey(param);
      });
      break;
    }
    if (item[children] && item[children].length > 0) {
      getTreeDataValue(item.children, param);
    }
  }
};
watch(
  () => modelValue.value,
  () => {
    getTreeDataValue(treeData.value, modelValue.value);
  },
  { immediate: true }
);
const handleClear = () => {};
const emit = defineEmits(["select"]);
const handleNodeClick = (node) => {
  state.treeDataValue = node.title;
  state.mySelectRef.blur();
  emit("select", node);
};

const { treeDataValue, mySelectRef, expandTreeIds, treeRef } = toRefs(state);
</script>

<style lang="scss" scoped>
:deep() {
  .el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
    height: auto !important;
    padding: 0 !important;
  }
}
</style>
