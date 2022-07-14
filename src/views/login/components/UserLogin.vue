<template>
  <div>
    <el-form :model="form"
             ref="formRef"
             :rules="rules"
             status-icon
             style="width: 350px">
      <el-form-item prop="username">
        <el-input v-model="form.username"
                  size="large"
                  placeholder="请输入用户名"
                  clearable
                  @keyup.enter="submit"
                  prefix-icon="user" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password"
                  type="password"
                  size="large"
                  placeholder="请输入密码"
                  clearable
                  prefix-icon="lock"
                  @keyup.enter="submit" />
      </el-form-item>
      <el-form-item prop="code">
        <el-row style="width:100%"
                justify="space-between">
          <el-col :span="14">
            <el-input v-model="form.code"
                      size="large"
                      clearable
                      placeholder="请输入验证码"
                      @keyup.enter="submit" />
          </el-col>
          <el-col :span="9">
            <img v-if="requestCodeSuccess"
                 @click="changeCode"
                 :src="form.svg">
            <img v-else
                 src="@/assets/image/checkcode.png">
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row style="width:100%"
                justify="space-between">
          <el-col :span="12">
            <el-checkbox v-model="autoSubmit">自动登录</el-checkbox>
          </el-col>
          <el-col :span="4">
            <route-link :to="{ name:'login'}">
              <a href="javascript:;"> 忘记密码</a>
            </route-link>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%"
                   type="primary"
                   size="large"
                   :loading="loading"
                   @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { loginApi } from "@/api";
import { reactive, ref, toRefs } from "vue";
import { useUserStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
const router = useRouter();

const userStore = useUserStore();
const { setLogin } = userStore;
const checkPassword = (rule: any, value: string, callback: any) => {
  if (value == "") callback(new Error("密码不能为空"));
  if (value.length < 6) callback(new Error("密码长度要大于6位"));
  callback();
};

const checkVerifyCode = (rule: any, value: string, callback: any) => {
  if (value == "") callback(new Error("验证码不能为空"));
  callback();
};
const state = reactive({
  formRef: null,
  loading: false,
  form: {
    username: "daytoywhy", //用户名
    password: "123456", //密码
    code: "Azt5", //验证码
    svg: "",
  },
  rules: {
    username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
    password: [{ required: true, trigger: "blur", validator: checkPassword }],
    code: [{ required: true, trigger: "blur", validator: checkVerifyCode }],
  },
});

const refreshGetVerify = async () => {
  const res = await loginApi.getCode();
  state.form.svg = res.data.kaptchaImg;
};

refreshGetVerify();

const changeCode = (): void => {
  refreshGetVerify();
};
const submit = async () => {
  state.formRef.validate(async (valid: any) => {
    if (valid) {
      try {
        state.loading = true;
        await setLogin(state.form);
        router.push("/");
      } finally {
        state.loading = false;
      }
    }
  });
};
const autoSubmit = ref(false);
const requestCodeSuccess = ref(true);
const { form, formRef, rules, loading } = toRefs(state);
</script>

<style lang="sass" scoped>
</style>
