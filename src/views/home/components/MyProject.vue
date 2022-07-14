<template>
  <div class="my-project">
    <el-card>
      <template #header>
        <div>
          <div><i class="iconfont icon-github-line"> 我的相册</i></div>
        </div>
      </template>
      <el-row>
        <el-col :span="12">
          <img class="my-img"
               src="@/assets/image/avatar.png">
        </el-col>
        <el-col :span="12">
          <img class="my-img"
               src="@/assets/image/huiye.png">
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.my-project {
  .my-img {
    width: 100%;
    height: 100%;
  }
}
</style>
