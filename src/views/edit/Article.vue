<template>
  <div id="article-container">
    <el-row :gutter="20">
      <el-col :xs="24"
              :sm="24"
              :md="5"
              :lg="5"
              :xl="5">
        <el-card>
          <template #header>
            <el-input v-model="name"
                      placeholder="请输入文章名"
                      :suffix-icon="Search"></el-input>
          </template>
          <el-tree ref="treeRef"
                   :data="list"
                   :props="defaultProps"
                   node-key="id"
                   :default-expanded-keys="[]"
                   :default-checked-keys="menuIds"
                   :filter-node-method="filterNode"></el-tree>
        </el-card>
      </el-col>
      <el-col :xs="24"
              :sm="24"
              :md="19"
              :lg="19"
              :xl="19">
        <el-card>
          <template #header>
            <el-tag size="large"
                    closable
                    v-for="tag in dynamicTags"
                    :key="tag"
                    :disable-transitions="false"
                    mr10
                    @close="del(tag)">{{tag}}</el-tag>
            <el-input v-if="inputVisible"
                      mr10
                      ref="inputRef"
                      style="width: 100px"
                      @keyup.enter="handleInputConfirm"
                      @blur="handleInputConfirm"
                      v-model="inputValue"></el-input>
            <el-button v-else
                       @click="showInput">新增标签</el-button>
          </template>
          <div class="full-screen-container"
               style="z-index:9999">
            <Toolbar style="border-bottom: 1px solid #ccc"
                     :editor="editorRef"
                     :defaultConfig="toolbarConfig"
                     :mode="mode" />
            <Editor style="height: 500px; overflow-y: hidden;"
                    v-model="valueHtml"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onCreated="handleCreated" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  ref,
  toRefs,
  watch,
  nextTick,
  onBeforeUnmount,
  shallowRef,
} from "vue";
import { Search } from "@element-plus/icons-vue";
import type { ElTree, ElInput } from "element-plus";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IToolbarConfig } from "@wangeditor/editor";
import { articleApi } from "@/api";
const state = reactive({
  list: [],
  defaultProps: {
    children: "children",
    label: "title",
  },
  name: "",
  menuIds: [2],
  dynamicTags: ["html", "css", "js"],
  inputValue: "",
  inputVisible: false,
  mode: "default",
});
const treeRef = ref<InstanceType<typeof ElTree>>();
const inputRef = ref<InstanceType<typeof ElInput>>();

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// 内容 HTML
const valueHtml = ref("");
// 编辑器配置
const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    /* 菜单配置，下文解释 */
  },
};
const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    // 菜单 key
    "headerSelect",

    // 分割线
    "|",

    // 菜单 key
    "fontSize",
    "fontFamily",
    "lineHeight",
    "bold",
    "underline",
    "italic",
    "through",
    "clearStyle",
    "color",
    "bgColor",

    // 菜单组，包含多个菜单
    {
      key: "group-more-style", // 必填，要以 group 开头
      title: "更多样式", // 必填
      iconSvg: "<svg>....</svg>", // 可选
      menuKeys: ["through", "code", "clearStyle"], // 下级菜单 key ，必填
    },
    // 继续配置其他菜单...
  ],
};
const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
const showInput = () => {
  state.inputVisible = true;
  nextTick(() => {
    inputRef.value.input?.focus();
  });
};
const handleInputConfirm = () => {
  if (state.inputValue) {
    state.dynamicTags.push(state.inputValue);
  }
  state.inputVisible = false;
  state.inputValue = "";
};
const getArticleList = async () => {
  const {
    data: { articles },
  } = await articleApi.getArticleList();
  state.list = articles;
};
getArticleList();
interface Tree {
  id: number;
  title: string;
  children?: Tree[];
}
const filterNode = (value: String, data: Tree) => {
  if (!value) return true;
  return data.title.includes(value);
};

const {
  defaultProps,
  list,
  name,
  dynamicTags,
  inputVisible,
  menuIds,
  inputValue,
  mode,
} = toRefs(state);
watch(name, (val) => {
  treeRef.value?.filter(val);
});
</script>

<style lang="scss" scoped>
:deep() {
  .el-card {
    height: calc($base-page-height - $base-padding * 2);
    box-sizing: border-box;
    overflow: hidden;
    .el-card__body {
      padding: 10px;
    }
  }
}
</style>