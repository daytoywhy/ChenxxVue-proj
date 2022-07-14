<template>
  <el-dialog v-model="visible"
             :title="title"
             width="660px"
             @close="handleClose">
    <el-form ref="formRef"
             label-width="auto"
             :model="form"
             :rules="rules">
      <el-row :gutter="16">
        <el-col :span="24">
          <el-form-item label="上级菜单">
            <my-tree v-model="form.parentId"
                     :defaultProps="{label:'title',value:'id',children:'children'}"
                     :treeData="data"
                     @select="handleSelect($event)" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单类型"
                        prop="menuType">
            <el-radio-group v-model="form.menuType">
              <el-radio :label="0"> 目录 </el-radio>
              <el-radio :label="1"> 菜单 </el-radio>
              <el-radio :label="2"> 按钮 </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12"
                v-if="form.menuType != 2">
          <el-form-item label="菜单名称"
                        prop="title">
            <el-input v-model.trim="form.title"
                      placeholder="请输入菜单名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单图标"
                        prop="icon">
            <el-input v-model.trim="form.icon"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24"
                v-if="form.menuType != 2">
          <el-form-item label="组件路径"
                        prop="component">
            <el-input v-model.trim="form.component"
                      placeholder="请输入组件路径"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12"
                v-if="form.menuType != 2">
          <el-form-item label="路由地址"
                        prop="path">
            <el-input v-model.trim="form.path"
                      placeholder="请输入路由地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12"
                v-if="form.menuType == 1">
          <el-form-item prop="query">
            <template #label>
              <el-tooltip content='访问路由的默认传递参数，如：`{"id":1,"name":"xxx"}`'
                          placement="bottom"
                          effect="customized">
                <i class="iconfont icon-xinxi"></i>
              </el-tooltip>
              路由参数
            </template>
            <el-input v-model.trim="form.query"
                      placeholder="请输入路由地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示排序"
                        prop="sort">
            <el-input-number v-model.trim="form.sort"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12"
                v-if="form.menuType != 2">
          <el-form-item prop="hideInMenu">
            <template #label>
              <el-tooltip content="选择隐藏将不会出现在侧边菜单栏"
                          placement="bottom"
                          effect="customized">
                <i class="iconfont icon-xinxi"></i>
              </el-tooltip>
              侧边菜单
            </template>
            <el-radio-group v-model="form.hideInMenu">
              <el-radio :label="true"> 显示 </el-radio>
              <el-radio :label="false"> 隐藏 </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12"
                v-if="form.menuType != 2">
          <el-form-item prop="hideInBread">
            <template #label>
              <el-tooltip content="控制在面包屑导航中是否显示该菜单名"
                          placement="bottom"
                          effect="customized">
                <i class="iconfont icon-xinxi"></i>
              </el-tooltip>
              面包屑
            </template>
            <el-radio-group v-model="form.hideInBread">
              <el-radio :label="true"> 显示 </el-radio>
              <el-radio :label="false"> 隐藏 </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12"
                v-if="form.menuType === 1">
          <el-form-item prop="noCloseTab">
            <template #label>
              <el-tooltip content="控制是否在tab栏显示该页签"
                          placement="bottom"
                          effect="customized">
                <i class="iconfont icon-xinxi"></i>
              </el-tooltip>
              tab标签页
            </template>
            <el-radio-group v-model="form.noCloseTab">
              <el-radio :label="true"> 可关闭 </el-radio>
              <el-radio :label="false"> 不可关闭 </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12"
                v-if="form.menuType != 2">
          <el-form-item prop="isNew">
            <template #label>
              <el-tooltip content="设置为新增会在菜单栏上显示new标识"
                          placement="bottom"
                          effect="customized">
                <i class="iconfont icon-xinxi"></i>
              </el-tooltip>
              是否新增
            </template>
            <el-radio-group v-model="form.isNew">
              <el-radio :label="true"> 是 </el-radio>
              <el-radio :label="false"> 否 </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12"
                v-if="form.menuType == 2">
          <el-form-item prop="auth">
            <template #label>
              <el-tooltip content="权限字符格式，参照`system:user:delete`"
                          placement="bottom"
                          effect="customized">
                <i class="iconfont icon-xinxi"></i>
              </el-tooltip>
              权限字符
            </template>
            <el-input v-model.trim="form.auth"
                      placeholder="请输入权限字符"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
interface FormType {
  id?: number;
  parentId?: string;
  path?: string;
  name?: string;
  component?: string;
  redirect?: string;
  title?: string;
  icon?: string;
  frameSrc?: string;
  hideInMenu?: boolean;
  hideInBread?: boolean;
  noCloseTab?: boolean;
  sort?: number;
  isNew?: boolean;
  menuType?: number;
  auth?: string;
  query?: string;
  children?: any[];
}
const state = reactive({
  form: {
    id: "",
    parentId: "0",
    path: "",
    name: "",
    component: "",
    redirect: "",
    title: "",
    icon: "",
    frameSrc: "",
    hideInMenu: false,
    hideInBread: false,
    noCloseTab: false,
    sort: 1,
    isNew: true,
    menuType: 0,
    auth: "",
    query: "",
    children: null,
  } as FormType,
  formRef: null,
  visible: false,
  title: "",
  rules: {
    title: [{ required: true, trigger: "blur", message: "请输入菜单名称" }],
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
const handleSelect = (node): void => {
  state.form.parentId = node?.id;
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
const { data } = toRefs(props);
const { formRef, form, visible, title, rules } = toRefs(state);
</script>

<style lang="scss">
.el-popper.is-customized {
  width: 200px;
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(57, 110, 160), rgb(119, 225, 157));
  color: #fff;
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #6ab6ce, #6db9cb);
  right: 0;
}
</style>
