<template>
  <div id="cardDrag-container">
    <my-tab v-model="activeTab"
            @tab-click="handleTabClick">
      <my-tab-pane v-for="(item,index) in tabList"
                   :key="index"
                   :label="item.name"
                   :name="item.id"></my-tab-pane>
      <template #suffix>
        <div @click.stop>
          <el-popover popper-class="tab-set"
                      style="min-width:auto"
                      :width="80"
                      ref="popoverRef"
                      trigger="click">
            <template #reference>
              <el-icon :size="16"
                       style="padding:5px;cursor: pointer">
                <Tools />
              </el-icon>
            </template>
            <ul class="menu">
              <li class="menu-item">编辑</li>
              <li class="menu-item">删除</li>
            </ul>
          </el-popover>
        </div>
      </template>
      <template #append>
        <el-button :icon="Plus"
                   text>新建标签</el-button>
      </template>
    </my-tab>
    <el-row>
      <el-col :span="24">
        <el-alert title="是非在己毁誉由人得失不论"
                  type="success"
                  show-icon
                  :closable="false"></el-alert>
      </el-col>
    </el-row>
    <div class="main">
      <draggable v-model="data"
                 v-bind="dragOptions"
                 :component-data="{ tag: '', name: 'flip-list', type: 'transition' }"
                 item-key="id"
                 tag="transition"
                 @end="dragEnd">
        <template #item="{ element: item }">
          <div class="item-card">
            <div class="item-card-wrap">
              <h3 class="title">
                <div class="title-left">
                  <span class="text">{{item.name}}</span>
                  <el-popover :width="350"
                              trigger="click">
                    <p class="tip"
                       v-html="item.desc"></p>
                    <template #reference>
                      <el-icon :size="16"
                               style="padding:5px;cursor: pointer">
                        <QuestionFilled />
                      </el-icon>
                    </template>
                  </el-popover>
                </div>
                <div class="title-right">
                  <span class="label"
                        :style="{'color':item.color,'border-color':item.color}">
                    {{item.type}}</span>
                  <el-popover popper-class="tab-set"
                              style="min-width:auto"
                              :width="80"
                              trigger="click">
                    <template #reference>
                      <el-icon :size="16"
                               style="padding:5px;cursor: pointer">
                        <Operation />
                      </el-icon>
                    </template>
                    <ul class="menu">
                      <li class="menu-item">删除</li>
                    </ul>
                  </el-popover>
                </div>
              </h3>
              <div class="content">
                <div class="have-data"
                     v-if="item?.data?.length !== 0">
                  <div class="borde1"
                       v-if="item.visualizationMode === 'board1'">
                    {{ item.data[0].value}}{{ item.data[0].suffix}}
                  </div>
                  <EchartBord v-if="item.visualizationMode === 'bar1'"
                              :list="item.data" />
                </div>
                <div v-else
                     class="no-data">无数据</div>
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * vuedraggable版本问题，一开始默认安装2.x的版本，会报错Cannot read properties of undefined (reading 'header') at getSlot
 * 解决办法：vue3.x版本的，将vuedraggable省级成最新版本
 */
import { reactive, toRefs } from "vue";
import draggable from "vuedraggable";
import { EchartBord } from "./components";
import {
  Tools,
  Plus,
  QuestionFilled,
  Operation,
} from "@element-plus/icons-vue";
import { cardApi } from "@/api";
const state = reactive({
  tabList: [
    {
      id: 1,
      name: "卡片拖拽",
    },
    {
      id: 2,
      name: "自定义",
    },
    {
      id: 3,
      name: "模块",
    },
    {
      id: 4,
      name: "javascript",
    },
    {
      id: 5,
      name: "HTML",
    },
    {
      id: 6,
      name: "css",
    },
  ],
  activeTab: "2",
  data: [],
  dragOptions: {
    //用于分组，同一组的不同list可以相互拖动value:string/array
    animation: 600, //动画时间 单位:ms  value:Number
    disabled: false, //定义是否此sortable对象是否可用
    ghostClass: "ghost-item", //当拖动列表单元时会生成一个副本作为影子单元来模拟被拖动单元排序的情况，此配置项就是来给这个影子单元添加一个class
    scroll: true, //当排序的容器是个可滚动的区域，拖放可以引起区域滚动
    scrollSensitivity: 180, //就是鼠标靠近边缘多远开始滚动默认30
    scrollSpeed: 20, //滚动速度
    bubbleScroll: true, // 将自动滚动应用于所有父元素，以便更轻松地移动
    forceFallback: true, //如果设置为true时，将不使用原生的html5的拖放，可以修改一些拖放中元素的样式等
    fallbackClass: "drag-item", //当forceFallback设置为true时，拖放过程中鼠标附着单元的样式
    // fallbackOnBody: true
    // fallbackTolerance: 10 // 以像素为单位指定鼠标在被视为拖动以前应移动多远
    // swapThreshold: 0.65 // 交换区域将占据的目标百分比，介于0和之间1
  },
});
const getCardList = async () => {
  const {
    data: { list },
  } = await cardApi.getIconList();
  state.data = list;
};
getCardList();
const handleTabClick = (item, event: Event) => {
  state.activeTab = item.name;
};
const dragEnd = () => {};
const { tabList, dragOptions, activeTab, data } = toRefs(state);
</script>

<style lang="scss" scoped>
#cardDrag-container {
  .main {
    margin-top: 20px;
    transition {
      display: grid;
      grid-row-gap: 24px;
      grid-column-gap: 20px;
      grid-template-columns: 1fr 1fr 1fr;
      .item-card {
        border-radius: 10px;
        cursor: move;
        width: 100%;
        height: 278px;
        user-select: none; //防止用户选取到文本
        box-sizing: border-box;
        box-shadow: 0 0 14px #cfcfcf;
        border: 1px solid #cfcfcf;
        .item-card-wrap {
          height: 100%;
          .title {
            width: 100%;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title-left {
              margin-left: 4px;
              display: flex;
              align-items: center;
              .text {
                padding-left: 12px;
                border-left: 5px solid rgb(15, 57, 243);
                font-size: 16px;
              }
            }
            .title-right {
              display: flex;
              align-items: center;
              .label {
                display: block;
                border: 1px solid #fff;
                padding: 1px 3px;
              }
            }
          }
          .content {
            box-sizing: border-box;
            border-top: 2px dashed #666;
            height: calc(100% - 32px);
            padding: 15px;
            .have-data {
              height: 100%;
              width: 100%;
              position: relative;
              .borde1 {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 38px;
                color: #6192d3;
                font-weight: 700;
              }
            }
            .no-data {
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #e66;
              font-size: 38px;
              font-weight: 700;
            }
          }
        }
      }
    }
    .ghost-item {
      opacity: 0.5;
      background-color: #dcebf4;
    }
    .drag-item {
      border: 1px solid #cfcfcf;
      background-color: #f5f5f5;
    }
  }
}
</style>
<style lang="scss">
.tab-set {
  min-width: auto !important;
  padding: 5px 0 !important;
  .menu {
    .menu-item {
      padding: 5px 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        background-color: #f5f5f5;
        color: rgb(124, 149, 196);
      }
    }
  }
}
</style>