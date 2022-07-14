<template>
  <div id="user-container">
    <div class="query-content">
      <el-form label-width="auto"
               :inline="true">
        <el-form-item label="用户名">
          <el-input v-model="queryForm.username"
                    clearable
                    @keyup.enter="querySearch"
                    placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="queryForm.account"
                    clearable
                    @keyup.enter="querySearch"
                    placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="网站角色">
          <el-select v-model="queryForm.role"
                     clearable
                     placeholder="请选择网站角色">
            <el-option label="管理员"
                       value="1" />
            <el-option label="角色管理员"
                       value="2" />
            <el-option label="用户管理员"
                       value="3" />
            <el-option label="VIP"
                       value="4" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="querySearch"
                     :icon="Search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="action">
      <el-button :icon="Plus"
                 plain
                 @click="handEdit"
                 type="primary">添加</el-button>

      <el-button :icon="Delete"
                 plain
                 @click="handDelete"
                 type="danger">批量删除</el-button>

      <el-button :icon="Download"
                 plain
                 type="info">导出</el-button>
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
      <vxe-column title="用户名"
                  width="100"
                  field="username"></vxe-column>
      <vxe-column title="账号"
                  width="120"
                  field="account"></vxe-column>
      <vxe-column title="信息"
                  width="200"
                  show-overflow
                  field="info"></vxe-column>
      <vxe-column title="修改时间"
                  width="180"
                  field="datetime"></vxe-column>
      <vxe-column title="角色"
                  field="role"
                  min-width="180">
        <template #default="{row}">
          <el-select multiple
                     collapse-tags
                     v-model="row.roleIds">
            <el-option v-for="item in roleList"
                       :key="item.id"
                       :label="item.roleName"
                       :value="item.id"></el-option>
          </el-select>
        </template>
      </vxe-column>
      <vxe-column title="操作"
                  fixed="right"
                  min-width="110">
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
               @refresh="getUserInfo"
               :roleList="roleList" />
  </div>
</template>

<script setup lang="ts">
import {
  Search,
  Plus,
  Delete,
  Download,
  EditPen,
} from "@element-plus/icons-vue";
import { reactive, ref, onMounted, toRefs } from "vue";
import { userApi } from "@/api";
import { ElMessageBox } from "element-plus";
import { messageSuccess, messageError } from "@/utils/message";
import AddOrEdit from "./components/AddOrEdit.vue";
interface SonData {
  init: () => void;
}
const AddOrEditRef = ref<InstanceType<typeof AddOrEdit> & SonData>();
const state = reactive({
  queryForm: {
    username: "",
    account: "",
    role: "",
    pageNum: 1,
    pageSize: 5,
  },
  loading: false,
  total: 0,
  tableData: [],
  roleList: [],
  selectIds: [],
});
const getRoleList = async () => {
  const {
    data: { list },
  } = await userApi.getRoleList();
  console.log(list, "data");

  state.roleList = list;
};
getRoleList();
const getUserInfo = async () => {
  state.loading = true;
  const {
    data: { list, total },
  } = await userApi.getUserList(state.queryForm);
  state.tableData = list;
  state.total = total;

  state.loading = false;
};
getUserInfo();
const checkboxChangeEvent = (param: any): void => {
  state.selectIds = [];
  const selectedRows = param.records;
  for (const { id } of selectedRows) {
    state.selectIds.push(id);
  }
};
const handlePageChange = (param: any): void => {
  if (param.type == "size") state.queryForm.pageNum = 1;
  getUserInfo();
};
const querySearch = (): void => {
  state.queryForm.pageNum = 1;
  getUserInfo();
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
const reset = (): void => {
  state.queryForm.username = "";
  state.queryForm.account = "";
  state.queryForm.role = "";
  querySearch();
};
const { queryForm, tableData, loading, roleList, total, formRef } =
  toRefs(state);
</script>

<style lang="scss" scoped>
#user-container {
  .query-content {
    border-bottom: 1px solid #e6e6e6;
  }
  .action {
    margin: 20px 0;
  }
}
</style>
