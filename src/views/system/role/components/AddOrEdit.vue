<template>
  <el-dialog v-model="visible"
             :title="title"
             width="500px"
             @close="handleClose">
    <el-form ref="formRef"
             label-width="80px"
             :model="form"
             :rules="rules">
      <el-form-item label="角色名称"
                    prop="roleName">
        <el-input v-model.trim="form.roleName"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="角色类型"
                    prop="type">
        <el-select v-model="form.type"
                   placeholder="请选择角色类型">
          <el-option label="数据关联类角色"
                     :value="1"></el-option>
          <el-option label="非数据关联类角色"
                     :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色描述"
                    prop="desc">
        <el-input v-model.trim="form.desc"
                  type="textarea"
                  placeholder="请输入角色描述"></el-input>
      </el-form-item>
      <el-form-item v-if="title == '编辑'"
                    label="更新时间"
                    prop="datetime">
        <el-input :disabled="title == '编辑'"
                  v-model.trim="form.datetime"></el-input>
      </el-form-item>
      <el-form-item label="状态"
                    prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1"> 正常 </el-radio>
          <el-radio :label="0"> 停用 </el-radio>
        </el-radio-group>
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
import {
  reactive,
  toRefs,
  defineExpose,
  PropType,
  defineEmits,
  nextTick,
} from "vue";
import { messageSuccess } from "@/utils/message";
interface FormType {
  roleName?: string;
  type?: number;
  desc?: string;
  status?: number;
  datetime?: string;
}
const state = reactive({
  form: {
    status: 1,
  } as FormType,
  formRef: null,
  visible: false,
  title: "",
  rules: {
    roleName: [{ required: true, trigger: "blur", message: "请输入角色名称" }],
    type: [{ required: true, trigger: "blur", message: "请选择角色类型" }],
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
const { formRef, form, visible, title, rules } = toRefs(state);
</script>
