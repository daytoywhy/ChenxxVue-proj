<template>
  <el-dialog v-model="visible"
             :title="title"
             width="500px"
             @close="handleClose">
    <el-form ref="formRef"
             label-width="80px"
             :model="form"
             :rules="rules">
      <el-form-item label="用户名"
                    prop="username">
        <el-input v-model.trim="form.username"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="账号"
                    prop="account">
        <el-input v-model.trim="form.account"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="信息"
                    prop="info">
        <el-input v-model.trim="form.info"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item v-if="title == '编辑'"
                    label="更新时间"
                    prop="datetime">
        <el-input :disabled="title == '编辑'"
                  v-model.trim="form.datetime"></el-input>
      </el-form-item>
      <el-form-item label="角色"
                    prop="roleIds">
        <el-checkbox-group v-model="form.roleIds">
          <el-checkbox v-for="item in roleList"
                       :key="item.id"
                       :label="item.id">{{item.roleName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose"> 取 消 </el-button>
      <el-button @click="submit"
                 type="primary"> 确 定 </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, toRefs, defineExpose, PropType, nextTick } from "vue";
import { messageSuccess } from "@/utils/message";
interface FormType {
  username?: string;
  account?: string;
  info?: string;
  roleIds?: number[];
  datetime?: string;
}
const state = reactive({
  form: {} as FormType,
  formRef: null,
  visible: false,
  title: "",
  rules: {
    username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
    account: [{ required: true, trigger: "blur", message: "请输入账号" }],
  },
});
interface RoleList {
  id: number;
  roleName: string;
}
const props = defineProps({
  roleList: {
    type: Array as propType<RoleList[]>,
    require: true,
    default: () => [],
  },
});
const init = (row?: any) => {
  if (row?.id) {
    state.title = "编辑";
    nextTick(() => {
      state.form = Object.assign({}, row);
    });
  } else {
    state.title = "添加";
  }
  state.visible = true;
};
const handleClose = () => {
  state.formRef.resetFields();
  state.visible = false;
};
const emit = defineEmits(["refresh"]);
const submit = () => {
  state.formRef.validate(async (valid) => {
    if (!valid) return;
    messageSuccess("模拟新增成功");
    emit("refresh");
    handleClose();
  });
};
defineExpose({
  init,
});
const { roleList } = toRefs(props);
const { formRef, form, visible, title, rules } = toRefs(state);
</script>
