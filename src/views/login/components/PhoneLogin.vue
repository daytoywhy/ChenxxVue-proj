<template>
  <div>
    <el-form :model="form"
             ref="formRef"
             :rules="rules"
             status-icon
             style="width: 350px">
      <el-form-item prop="phoneNum">
        <el-input v-model="form.phoneNum"
                  size="large"
                  placeholder="手机号"
                  clearable
                  @keyup.enter="submit"
                  prefix-icon="iphone" />
      </el-form-item>
      <el-form-item prop="verifyCode">
        <el-row style="width:100%"
                justify="space-between">
          <el-col :span="15">
            <el-input v-model="form.verifyCode"
                      size="large"
                      clearable
                      placeholder="请输入验证码"
                      @keyup.enter="submit" />
          </el-col>
          <el-col :span="8">
            <el-button size="large"
                       @click="getVerifyCode"
                       :disabled="smsSendBtn"
                       style="width:100%">{{smsSendBtn ? time + 's后可重新发送':'获取验证码'}}</el-button>
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

<script setup lang="ts" >
import { useUserStore } from "@/store/modules/user";
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const { setLogin } = useUserStore();
const checkPhoneNumber = (rule: any, value: string, callback: any) => {
  if (
    value &&
    new RegExp(
      /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
    ).test(value)
  ) {
    callback();
  } else {
    callback(new Error("请输入正确的手机号"));
  }
};
const checkVerifyCode = (rule: any, value: any, callback: any) => {
  if (!value) callback(new Error("验证码不能为空"));
  callback();
};
const state = reactive({
  formRef: null,
  loading: false,
  form: {
    phoneNum: "",
    verifyCode: "",
  },
  rules: {
    phoneNum: [
      { required: true, trigger: "blur", validator: checkPhoneNumber },
    ],
    verifyCode: [
      { required: true, trigger: "blur", validator: checkVerifyCode },
    ],
  },
  time: 60,
  smsSendBtn: false,
});
const getVerifyCode = () => {
  state.formRef.validateField("phoneNum", (valid: any) => {
    if (valid) {
      state.smsSendBtn = true;
      const interval = window.setInterval(() => {
        if (state.time-- <= 0) {
          state.time = 60;
          state.smsSendBtn = false;
          window.clearInterval(interval);
        }
      }, 1000);
    }
  });
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
const { form, formRef, rules, smsSendBtn, time, loading } = toRefs(state);
</script>

<style lang="sass" scoped>
</style>
