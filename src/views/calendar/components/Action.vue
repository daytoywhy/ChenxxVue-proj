<template>
  <el-dialog :title="title"
             v-model="visible"
             @cancel="handleClose"
             width="800px">
    <el-form ref="formRef"
             :model="form"
             :rules="rules"
             :label-col="{ span:6 }"
             :wrapper-col="{ span:18}">
      <el-row>
        <el-col :span="12">
          <el-form-item label="工作类型"
                        prop="workType">
            <el-select v-model="form.workType"
                       labelInValue
                       allow-clear
                       placeholder="请选择">
              <el-select-opt-group v-for="item in workTypeList"
                                   :key="item.id">
                <span slot="label">
                  {{ item.text }}
                </span>
                <el-select-option v-for="ele in item.children"
                                  :key="ele.id"
                                  :value="ele.id">
                  {{ ele.text }}
                </el-select-option>
              </el-select-opt-group>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12"
                v-if="showNum">
          <el-form-item label="数量"
                        prop="num">
            <el-input-number v-model="form.num"
                             :min="0"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否完成">
            <el-radio-group v-model="form.isComplate">
              <el-radio :label="true">
                完成
              </el-radio>
              <el-radio :label="false">
                未完成
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="工作内容"
                    :label-col="{ span:3 }"
                    :wrapper-col="{ span:21}"
                    prop="workContent">
        <el-input v-model="form.workContent"
                  type="textarea"
                  placeholder="请填写工作内容，周报将依据这里的内容自动生成！"
                  :rows="8"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div v-if="type == 'add'">
        <el-button type="primary"
                   @click="addNew">新增</el-button>
      </div>
      <div v-else>
        <el-button type="primary"
                   @click="updateTask"
                   :disabled="!updateAuth">保存</el-button>
        <el-button @click="deleteTask"
                   :disabled="!deleteAuth">删除</el-button>
      </div>
    </template>
  </el-dialog>
</template>


<script setup lang="ts">
import { ElMessageBox } from "element-plus";
import { messageSuccess, messageError } from "@/utils/message";
import { defineProps, computed, reactive, toRefs, defineExpose } from "vue";
const props = defineProps({
  workTypeList: {
    type: Array,
    default: () => [],
  },
  configValue: {
    type: Array,
    default: () => [],
  },
});
const { configValue, workTypeList } = toRefs(props);
const state = reactive({
  visible: false,
  title: "新增工作",
  form: {
    isComplate: true,
    workType: undefined,
    workContent: "",
    num: 1,
  },
  rules: {
    workType: [
      { required: true, message: "请选择工作类型", trigger: "change" },
    ],
    workContent: [
      { required: true, message: "请输入工作内容", trigger: "change" },
    ],
  },
  type: null,
  arg: {},
  deleteAuth: true,
  updateAuth: true,
});

const { visible, title, form, rules, type, arg, deleteAuth, updateAuth } =
  toRefs(state);

const showNum = computed((): boolean => {
  let find = configValue.value.findIndex(
    (item) => item == this.form?.workType?.key
  );
  return find > -1 ? true : false;
});

const show = (typeValue: string, argObj: object) => {
  arg.value = argObj;
  typeValue == "add" ? (title.value = "新增工作") : (title.value = "编辑工作");
  type.value = typeValue;
  if (typeValue == "edit") {
    const extendedProps = arg.value.event.extendedProps;
    deleteAuth.value = extendedProps.deleteAuth;
    updateAuth.value = extendedProps.updateAuth;
    form.value.workContent = extendedProps.taskContent;
    form.value.isComplate = extendedProps.taskIsComplete;
    form.value.num = extendedProps.num;
    form.value.workType = {
      key: extendedProps.taskType,
      label: extendedProps.taskTypeName,
    };
  }
  visible.value = true;
};

const handleClose = () => {
  form.value.workContent = "";
  form.value.isComplate = true;
  form.value.workType = undefined;
  form.value.num = 1;
  visible.value = false;
};

const deleteTask = () => {
  ElMessageBox.confirm("任务删除后不可恢复，是否确认删除", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "danger",
  }).then(() => {
    messageSuccess("模拟删除成功");
    arg.value.event.remove();
    handleClose();
  });
};
const emit = defineEmits(["updataSuccess", "success"]);
const updateTask = () => {
  messageSuccess("模拟更新成功");
  arg.value.event.setProp("title", "模拟更新title");
  arg.value.event.setExtendedProp("taskType", form.value.workType.key);
  arg.value.event.setExtendedProp("taskIsComplete", form.value.taskIsComplete);
  arg.value.event.setExtendedProp("taskContent", form.value.taskContent);
  arg.value.event.setExtendedProp("num", form.value.num);
  arg.value.event.setExtendedProp("projectName", "模拟更新项目名称");
  emit("updataSuccess", arg.value.event);
  handleClose();
};

const addNew = () => {
  messageSuccess("模拟新增成功");
  handleClose();
  emit("success");
};
defineExpose({
  show,
});
</script>

<style scoped>
.ant-form >>> .ant-form-item {
  margin-bottom: 10px;
}
</style>