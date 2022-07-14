<template>
  <div class="version-info">
    <el-card>
      <template #header>
        <div class="version-header">
          <div><i class="iconfont icon-xinxi"></i> 信息</div>
          <el-tag style="position:absolute;right:0">
            部署时间： {{ updateTime }}
          </el-tag>
        </div>
      </template>
      <el-scrollbar>
        <table class="table">
          <tr>
            <td>当前版本</td>
            <td>
              <el-tag>测试版本2.9.9.5.3</el-tag>
            </td>
          </tr>
          <tr>
            <td>vue</td>
            <td>{{dependencies['vue']}}
              <el-popover content="已升级至最新版本"
                          placement="top-start"
                          trigger="hover"
                          :width="200">
                <template #reference>
                  <i class="iconfont icon-jiantou_xiangshang"></i>
                </template>
              </el-popover>
            </td>
            <td>vite</td>
            <td>{{devDependencies['vite']}}</td>
          </tr>
          <tr>
            <td>pinia</td>
            <td>{{dependencies['pinia']}}</td>
            <td>vue-router</td>
            <td>{{dependencies['vue-router']}}</td>
          </tr>
          <tr>
            <td>element-plus</td>
            <td>{{dependencies['element-plus']}}</td>
            <td>axios</td>
            <td>{{dependencies['axios']}}</td>
          </tr>
          <tr>
            <td>sass</td>
            <td>{{dependencies['sass']}}</td>
            <td>typescript</td>
            <td>{{devDependencies['typescript']}}</td>
          </tr>
        </table>
      </el-scrollbar>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { appInfo } from "./data";
const { updateTime, dependencies, devDependencies } = appInfo;

// const { updateTime } = JSON.parse(import.meta.env.VITE_APP_INFO);
</script>

<style lang="scss" scoped>
.version-info {
  .version-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .table {
    width: 100%;
    color: #666;
    background-color: #f2f3f5;
    border-collapse: collapse;
    td {
      position: relative;
      padding: 9px 14px;
      border: 1px solid #e6e6e6;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      overflow: hidden;
      i {
        color: rgb(116, 212, 116);
        vertical-align: middle;
        cursor: pointer;
      }
    }
  }
}
</style>



