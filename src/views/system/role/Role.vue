<template>
  <div id="role-container">
    <div>
      <el-form class="action"
               :inline="true">
        <el-form-item>
          <el-button :icon="Plus"
                     plain
                     @click="handEdit"
                     type="primary">添加</el-button>
          <el-button :icon="Delete"
                     plain
                     @click="handDelete"
                     type="danger">批量删除</el-button>
        </el-form-item>
        <div>
          <el-form-item>
            <el-input v-model="queryForm.roleName"
                      clearable
                      @keyup.enter="querySearch"
                      placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search"
                       @click="querySearch"
                       type="primary">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <vxe-table border
               show-footer
               align="center"
               :loading="loading"
               ref="xTable"
               :row-config="{ isHover:true }"
               :data="tableData"
               @checkbox-change="checkboxChangeEvent"
               @checkbox-all="checkboxChangeEvent">
      <vxe-column type="checkbox"
                  width="60"></vxe-column>
      <vxe-column title="NO"
                  width="60"
                  field="id"></vxe-column>
      <vxe-column title="角色名称"
                  width="140"
                  field="roleName"></vxe-column>
      <vxe-column title="角色类型"
                  width="140"
                  field="type">
        <template #default="{row}">
          <el-tag v-if="row.type"
                  type="success"> 数据关联类角色 </el-tag>
          <el-tag v-else> 非数据关联类角色 </el-tag>
        </template>
      </vxe-column>
      <vxe-column title="角色描述"
                  width="250"
                  show-overflow
                  field="desc"></vxe-column>
      <vxe-column title="状态"
                  field="role"
                  min-width="60">
        <template #default="{row}">
          <el-switch v-model="row.status"
                     :active-value="1"
                     :inactive-value="0"
                     @change="handleStatusChange(row)"></el-switch>
        </template>
      </vxe-column>
      <vxe-column title="修改时间"
                  width="180"
                  field="datetime"></vxe-column>
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
          <el-button :icon="DArrowRight"
                     @click="handleMenu(row)"
                     plain
                     size="small"
                     type="warning"></el-button>
        </template>
      </vxe-column>
    </vxe-table>
    <vxe-pager style="height:80px"
               perfect
               align="center"
               size="small"
               :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes','FullJump', 'Total']"
               v-model:current-page="queryForm.pageNum"
               v-model:page-size="queryForm.pageSize"
               :total="total"
               @page-change="handlePageChange"
               :page-sizes="[
               5,
               10,
               20,
               50,
               100,
               {label:'大量数据',value:1000},
               {label:'全量数据',value:-1}]">
    </vxe-pager>
    <AddOrEdit ref="AddOrEditRef"
               @refresh="getUserInfo" />
    <RoleDrawer ref="RoleDrawerRef" />
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
import { userApi } from "@/api";
import { ElMessageBox } from "element-plus";
import { messageSuccess, messageError } from "@/utils/message";
import AddOrEdit from "./components/AddOrEdit.vue";
import RoleDrawer from "./components/RoleDrawer.vue";
interface SonData {
  init: () => void;
}
const AddOrEditRef = ref<InstanceType<typeof AddOrEdit> & SonData>();

const state = reactive({
  queryForm: {
    roleName: "",
    pageNum: 1,
    pageSize: 5,
  },
  loading: false,
  total: 0,
  tableData: [],
  selectIds: [],
});
const getRoleList = async () => {
  state.loading = true;
  const {
    data: { list, total },
  } = await userApi.getRoleList(state.queryForm);
  state.tableData = list;
  state.total = total;
  state.loading = false;
};
getRoleList();
const checkboxChangeEvent = (param: any): void => {
  state.selectIds = [];
  const selectedRows = param.records;
  for (const { id } of selectedRows) {
    state.selectIds.push(id);
  }
};
const handlePageChange = (param: any): void => {
  if (param.type == "size") state.queryForm.pageNum = 1;
  getRoleList();
};
const querySearch = (): void => {
  state.queryForm.pageNum = 1;
  getRoleList();
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
  if (row?.id) {
    AddOrEditRef.value.init(row);
  } else {
    AddOrEditRef.value.init();
  }
};
const handleStatusChange = (row: any) => {
  const text = row.status == 0 ? "停用" : "启用";
  ElMessageBox.confirm(`您确定要${text}${row.roleName}角色吗?`, "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      messageSuccess("模拟操作成功");
    })
    .catch(() => {});
};
const RoleDrawerRef = ref<InstanceType<typeof RoleDrawer> & SonData>();
const handleMenu = (row: any) => {
  RoleDrawerRef.value.init(row);
};
const { queryForm, tableData, loading, total } = toRefs(state);
</script>

<style lang="scss" scoped>
#role-container {
  .action {
    display: flex;
    justify-content: space-between;
  }
}
</style>
