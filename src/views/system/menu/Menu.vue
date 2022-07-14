<template>
  <div id="menu-container">
    <div>
      <el-form class="action"
               :inline="true">
        <el-form-item>
          <el-button :icon="Plus"
                     plain
                     @click="handEdit"
                     type="primary">添加</el-button>
          <el-button :icon="Plus"
                     plain
                     @click="handleExpandAll"
                     type="primary">展开全部</el-button>
          <el-button :icon="Plus"
                     plain
                     @click="clearTreeExpand"
                     type="primary">折叠全部</el-button>
          <el-button :icon="Delete"
                     plain
                     @click="handDelete"
                     type="danger">批量删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <vxe-table border
               show-overflow
               align="center"
               :loading="loading"
               ref="xTree"
               :tree-config="tableTreeConfig"
               :row-config="{ isHover:true }"
               :data="tableData"
               @checkbox-change="checkboxChangeEvent"
               @checkbox-all="checkboxChangeEvent">
      <vxe-column type="checkbox"
                  width="60"
                  fixed="left"></vxe-column>
      <vxe-column title="菜单名称"
                  align="left"
                  tree-node
                  width="260"
                  field="title"
                  fixed="left">
        <template #default="{row}">
          <span>{{row.title}}</span>
        </template>
      </vxe-column>
      <vxe-column title="菜单类型"
                  width="80"
                  field="menuType">
        <template #default="{row}">
          <el-tag v-if="row.menuType == 0">目录</el-tag>
          <el-tag v-else>菜单</el-tag>
        </template>
      </vxe-column>
      <vxe-column title="访问路由"
                  align="left"
                  width="200"
                  field="path">
      </vxe-column>
      <vxe-column title="组件路径"
                  align="left"
                  width="200"
                  show-overflow
                  field="component"></vxe-column>
      <vxe-column title="图标"
                  field="icon"
                  min-width="200">
      </vxe-column>
      <vxe-column title="隐藏侧边栏"
                  width="80"
                  field="hideInMenu">
        <template #default="{row}">
          <el-tag v-if="row.hideInMenu"
                  type="warning">隐藏</el-tag>
          <span v-else>显示</span>
        </template>
      </vxe-column>
      <vxe-column title="面包屑"
                  width="80"
                  show-overflow
                  field="hideInBread">
        <template #default="{row}">
          <el-tag v-if="row.hideInBread"
                  type="warning">隐藏</el-tag>
          <span v-else>显示</span>
        </template>
      </vxe-column>
      <vxe-column title="不可关闭标签"
                  width="120"
                  show-overflow
                  field="noCloseTab">
        <template #default="{row}">
          <el-tag v-if="row.noCloseTab"
                  type="warning">是</el-tag>
          <span v-else>否</span>
        </template>
      </vxe-column>
      <vxe-column title="新增"
                  width="80"
                  show-overflow
                  field="isNew">
        <template #default="{row}">
          <el-tag v-if="row.isNew"
                  type="warning">是</el-tag>
          <span v-else>否</span>
        </template>
      </vxe-column>
      <vxe-column title="排序"
                  width="80"
                  show-overflow
                  field="sort"></vxe-column>
      <vxe-column title="操作"
                  fixed="right"
                  min-width="200">
        <template #default="{row}">
          <el-button :icon="EditPen"
                     @click="handEdit(row)"
                     plain
                     size="small"
                     type="primary"></el-button>
          <el-button :icon="Delete"
                     @click="handDelete(row)"
                     plain
                     size="small"
                     type="danger"></el-button>
        </template>
      </vxe-column>
    </vxe-table>
    <AddOrEdit ref="AddOrEditRef"
               :data="menuOptions"
               @refresh="getRouterList" />
  </div>
</template>

<script setup lang="ts">
import {
  Search,
  Plus,
  Delete,
  Download,
  DArrowRight,
  EditPen,
} from "@element-plus/icons-vue";
import { reactive, ref, onMounted, toRefs } from "vue";
import { routerApi } from "@/api";
import { ElMessageBox } from "element-plus";
import { messageSuccess, messageError } from "@/utils/message";
import { VxeTablePropTypes, VxeTableInstance } from "vxe-table";
import AddOrEdit from "./components/AddOrEdit.vue";
interface SonData {
  init: () => void;
}
const AddOrEditRef = ref<InstanceType<typeof AddOrEdit> & SonData>();
const xTree = ref<VxeTableInstance>();
const state = reactive({
  tableTreeConfig: {
    parentField: "parentId",
    iconOpen: "iconfont icon-suo",
    iconClose: "iconfont icon-shangxiazhankai",
  } as VxeTablePropTypes.TreeConfig,
  loading: false,
  total: 0,
  tableData: [],
  selectIds: [],
  menuOptions: [],
});
const handleExpandAll = () => {
  xTree.value?.setAllTreeExpand(true);
};
const clearTreeExpand = () => {
  xTree.value?.clearTreeExpand();
};
const getRouterList = async (): void => {
  state.loading = true;
  const {
    data: { routers },
  } = await routerApi.getRouter();
  state.tableData = routers;
  state.loading = false;
};
getRouterList();
const checkboxChangeEvent = (param: any): void => {
  state.selectIds = [];
  const selectedRows = param.records;
  for (const { id } of selectedRows) {
    state.selectIds.push(id);
  }
};
const handDelete = (row: any): void => {
  if (row?.id) {
    ElMessageBox.confirm("您确定要删除当前项吗？", "温馨提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        messageSuccess("模拟删除成功");
      })
      .catch(() => {});
  } else {
    if (state.selectIds.length > 0) {
      ElMessageBox.confirm("您确定要批量删除已选项吗？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          messageSuccess("模拟删除成功");
        })
        .catch(() => {});
    } else {
      messageError("未选中任何行");
    }
  }
};
const handEdit = (row: any): void => {
  state.menuOptions = [];
  const root = { id: "0", title: "根目录", parentId: null };
  state.menuOptions = [{ ...root, children: tableData.value }];
  if (row?.id) {
    AddOrEditRef.value.init(row);
  } else {
    AddOrEditRef.value.init();
  }
};

const { tableData, loading, total, tableTreeConfig, menuOptions } =
  toRefs(state);
</script>

<style lang="scss" scoped>
#menu-container {
  .action {
    display: flex;
    justify-content: space-between;
  }
}
</style>
