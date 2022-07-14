<template>
  <el-drawer v-model="drawer"
             title="菜单分配"
             direction="rtl"
             :close-on-click-modal="false"
             :before-close="handleClose">
    <el-tree ref="menuRef"
             :data="list"
             show-checkbox
             node-key="id"
             :props="defaultProps"
             :default-expanded-keys="[]"
             :default-checked-keys="menuIds">
      <template #default="{node}">
        <span>
          <span>{{node.label}}</span>
        </span>
      </template>
    </el-tree>
    <template #footer>
      <el-button size="small"
                 @click="handleClose">取消</el-button>
      <el-button size="small"
                 @click="selectAll">全选/反选</el-button>
      <el-select size="small"
                 @change="expanOrClose"
                 v-model="expandStatus"
                 style="width:110px;margin:0 10px;">
        <el-option label="展开所有"
                   value="1"></el-option>
        <el-option label="收合所有"
                   value="0"></el-option>
      </el-select>
      <el-button size="small"
                 @click="submit"
                 type="primary">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { defineEmits, defineExpose, reactive, toRefs, ref } from "vue";
import { routerApi } from "@/api";
import { messageSuccess } from "@/utils/message";
const state = reactive({
  drawer: false,
  list: [],
  defaultProps: {
    label: "title",
    children: "children",
  },
  menuIds: [2],
  expandStatus: "0",
  flag: false,
});
const init = (row: any) => {
  state.drawer = true;
};
const getRouterList = async () => {
  const {
    data: { routers },
  } = await routerApi.getRouter();
  state.list = routers;
};
getRouterList();
const menuRef = ref(null);
const selectAll = (): void => {
  state.flag = !state.flag;
  if (state.flag) {
    menuRef.value.setCheckedNodes(state.list);
  } else {
    menuRef.value.setCheckedNodes([]);
  }
};
const expanOrClose = (val): void => {
  const arr = menuRef.value.store._getAllNodes();
  if (val == 1) {
    for (const item of arr) {
      item.expanded = true;
    }
  } else if (val == 0) {
    for (const item of arr) {
      item.expanded = false;
    }
  }
};
const handleClose = (): void => {
  state.drawer = false;
};
const submit = (): void => {
  messageSuccess("模拟操作成功");
  handleClose();
};
defineExpose({
  init,
});
const { drawer, list, defaultProps, menuIds, expandStatus } = toRefs(state);
</script>
