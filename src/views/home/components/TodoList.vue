<template>
  <div class="todo-list">
    <el-card>
      <template #header>
        <div class="title-content">
          <div>
            <div><i class="iconfont icon-daiban"></i> 待办事项</div>
          </div>
          <div class="right-title">
            <span>添加</span>
            <span>删除</span>
          </div>
        </div>
      </template>
      <vxe-table ref="vxeTableRef"
                 border="inner"
                 :data="state.tableData"
                 :checkbox-config="{checkRowKeys: defaultSelecteRows, highlight: true}"
                 @checkbox-change="selectChangeEvent"
                 height="120"
                 :show-header="false"
                 row-id="id">
        <vxe-column type="checkbox"
                    width="60"></vxe-column>
        <vxe-column field="description"
                    title="描述">
          <template #default="scope">
            <div :class="[{'todo-item-del':scope.row.status},'action']">{{scope.row.description}}</div>
          </template>
        </vxe-column>
        <vxe-column title="操作">
          <template #default>
            <div class="action">
              <i class="iconfont icon-bianji"></i>
              <i class="iconfont icon-lajitong"></i>
            </div>
          </template>
        </vxe-column>
      </vxe-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
const state = reactive({
  tableData: [
    {
      id: 1,
      description: "今天要修复10个bug",
      status: true,
    },
    {
      id: 2,
      description: "明天记得有迭代会",
      status: true,
    },
    {
      id: 3,
      description: "下周三有室内回顾会",
      status: false,
    },
    {
      id: 4,
      description: "快到年底了，记得备年货",
      status: false,
    },
    {
      id: 5,
      description: "明年的规划记得在近期完成",
      status: false,
    },
  ],
});
const defaultSelecteRows = [];
// const defaultSelecteRows = ref([]);
for (const { id, status } of state.tableData) {
  if (status) defaultSelecteRows.push(id);
}
const selectChangeEvent = (param) => {
  state.tableData[param.$rowIndex].status =
    !state.tableData[param.$rowIndex].status;
};
</script>

<style lang="scss" scoped>
.todo-list {
  .title-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .right-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        cursor: pointer;
        font-size: 12px;
        padding: 2px;
        &:nth-of-type(1) {
          color: rgb(75, 177, 50);
          margin: 0 10px;
        }
        &:nth-of-type(2) {
          color: rgb(182, 55, 55);
        }
      }
    }
  }

  .todo-item-del {
    text-decoration: line-through;
    color: #999;
  }
  .action {
    float: right;
    i {
      margin: 0 5px;
      cursor: pointer;
      color: rgb(56, 144, 185);
    }
  }
}
</style>
