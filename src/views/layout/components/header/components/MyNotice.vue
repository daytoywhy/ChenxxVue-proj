<template>
  <div class="my-notice">
    <el-badge type="danger"
              :value="badge"
              :max="99">
      <el-popover popper-class="notice-popper"
                  trigger="hover"
                  placement="bottom"
                  :width="320">
        <template #reference>
          <i class="iconfont icon-shengyin08-xianxing"></i>
        </template>

        <el-tabs stretch
                 v-model="activeName"
                 @tab-change="changeTab">
          <template v-for="item in noticeList"
                    :key="item.id">
            <el-tab-pane :label="`${item.name}(${item.noticeList.length})`"
                         :name="item.name">
              <el-scrollbar v-if="item.noticeList.length">
                <div class="notice-list">
                  <ul>
                    <li class="notice-container"
                        v-for="(i,index) in item.noticeList"
                        :key="index">
                      <el-avatar class="notice-avatar"
                                 :size="30"
                                 v-if="i.avatar"
                                 :src="i.avatar" />
                      <div class="notice-container-text">
                        <div class="notice-title">
                          <el-tooltip :disabled="!titleTooltip"
                                      :content="i.title">
                            <div class="notice-content"
                                 @mouseenter="hoverTitle($event)">{{i.title}}</div>
                          </el-tooltip>
                          <el-tag class="notice-tag"
                                  :type="i?.status"
                                  v-if="i?.extra">
                            {{ i.extra}}
                          </el-tag>
                        </div>
                        <el-tooltip :disabled="!descTooltip"
                                    placement="top"
                                    :content="i.description">
                          <div class="notice-desription"
                               @mouseenter="hoverDesc($event,i.description)">{{i.description}}</div>
                        </el-tooltip>
                        <div class="notice-datetime">
                          {{ i.datetime}}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-scrollbar>
              <el-empty v-else
                        :image-size="200" />
            </el-tab-pane>
          </template>
        </el-tabs>
        <div class="notice-clearBtn">
          <el-button text
                     @click="clearNotice">
            <i class="iconfont icon-anniu_guanbi"></i>
            <span>清空消息</span>
          </el-button>
        </div>
      </el-popover>
    </el-badge>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { noticeApi } from "@/api";
const activeName = ref("通知");
const noticeList = ref([]);
const badge: number = ref(0);
const titleTooltip = ref(false);
const descTooltip = ref(false);
const getNoticeList = async (): any => {
  const {
    data: { list },
  } = await noticeApi.getNoticeList();
  noticeList.value = list;
  badge.value = 0;
  for (let { noticeList } of list) {
    badge.value += noticeList.length;
  }
};
getNoticeList();

const changeTab = () => {
  getNoticeList();
};

const clearNotice = () => {
  badge.value = 0;
  for (const item of noticeList.value) {
    item.noticeList = [];
  }
};
const hoverTitle = (event) => {
  event.target?.scrollWidth > event.target?.clientWidth
    ? (titleTooltip.value = true)
    : (titleTooltip.value = false);
};
const hoverDesc = (event, desc) => {
  /**
   * 思路：创建一个装文本的容器，挂载后获取文本容器的宽度；
   * 拿到文本容器后记得移除文本容器，然后比较文本容器和内容容器的宽度；
   * 因为文本是默认超出两行后隐藏，所以内容容器的宽度*2
   */
  const spanDesc = document.createElement("span");
  spanDesc.innerHTML = desc;
  spanDesc.className = "calcDescWidth";
  document.querySelector("body")?.appendChild(spanDesc);
  const currentWidth = document.querySelector(".calcDescWidth").offsetWidth;
  document.querySelector(".calcDescWidth")?.remove();
  const contentWidth = event.target.offsetWidth;
  currentWidth > 2 * contentWidth
    ? (descTooltip.value = true)
    : (descTooltip.value = false);
};
</script>

<style lang="scss" scoped>
:deep(.el-tabs__nav-scroll) {
  display: flex;
  justify-content: center;
}
:deep(.el-tabs__header) {
  margin: 0;
}
.notice-list {
  height: 30vh;
  padding: 16px 24px 0;
  .notice-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
    .notice-avatar {
      background: #fff;
      margin-right: 16px;
    }
    .notice-container-text {
      display: flex;
      flex-direction: column;
      flex: 1;
      .notice-title {
        display: flex;
        margin-bottom: 8px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
        .notice-content {
          flex: 1;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .notice-tag {
          float: right;
          margin-top: -1.5px;
          font-weight: 400;
        }
      }
      .notice-desription,
      .notice-datetime {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.45);
        line-height: 1.5715;
      }
      .notice-desription {
        display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 2; //控制问下显示的行数
        -webkit-box-orient: vertical;
      }
      .notice-datetime {
        margin-top: 4px;
      }
    }
  }
}
.notice-clearBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  border-top: 1px solid #f0f0f0;
  i {
    margin-right: 4px;
  }
}
</style>

<style lang="scss" >
.notice-popper.el-popper {
  padding: 0;
}
</style>
