<template>
  <div class="my-avatar">
    <el-dropdown @visible-change="handleChange"
                 @command="handCommand">
      <span class="avatar-dropdown">
        <img class="user-avatar"
             src="@/assets/image/avatar.png">
        <div class="user-name">
          <span class="user-name-title">{{ username }}</span>
          <i :class="['user-name-dropdown iconfont icon-xiangxia2',
          {'user-name-dropdown-active':active}]"></i>
        </div>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="personalCenter">
            <i class="iconfont icon-wode1-xianxing"></i>
            <span>个人中心</span>
          </el-dropdown-item>
          <el-dropdown-item command="logout">
            <i class="iconfont icon-guanji"></i>
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
const active = ref(false);
const userStore = useUserStore();
const { setLogout } = userStore;
const { username, avatar } = storeToRefs(userStore);
const router = useRouter();
const handleChange = (val: boolean) => {
  active.value = val;
};
const handCommand = async (command) => {
  switch (command) {
    case "personalCenter":
      router.push("/personal-center");
      break;
    case "logout":
      await setLogout();
    // router.push("/login");
  }
};
</script>

<style lang="scss" scoped>
.my-avatar {
  margin-left: 12px;
  .avatar-dropdown {
    display: flex;
    justify-content: center;
    align-items: center;
    .user-avatar {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
    .user-name {
      .user-name-title {
        margin: 4px;
      }
      .user-name-dropdown {
        display: inline-block;
        font-size: 14px !important;
        font-weight: 700;
        transition: all 0.5s;
      }
      .user-name-dropdown-active {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
