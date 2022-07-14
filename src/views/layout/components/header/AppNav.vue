<template>
  <div class="app-nav">
    <el-row :gutter="15"
            style="height:100%">
      <el-col :sm="12"
              :md="12"
              :lg="12"
              :xl="12"
              :xs="2">
        <div class="left-demo">
          <Collapse />
          <Breadcrumb />
        </div>
      </el-col>
      <el-col :sm="12"
              :md="12"
              :lg="12"
              :xl="12"
              :xs="22">
        <div class="right-demo">
          <MyNotice />
          <full-screen />
          <MyAvatar />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Collapse, Breadcrumb, MyNotice, MyAvatar } from "./components";
</script>
