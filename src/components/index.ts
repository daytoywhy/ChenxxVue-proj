import { App } from 'vue'
import MyTree from './my-tree/MyTree.vue'
import MyTab from './my-tab/MyTab.vue'
import MyTabPane from './my-tab/MyTabPane.vue'
import MyCharts from './my-charts/MyCharts.vue'
import MyCountTo from './my-count-to/MyCountTo.vue'
import FullScreen from './fullScreen/FullScreen.vue'
const components: any = {
  MyTree,
  MyTab,
  MyTabPane,
  MyCharts,
  MyCountTo,
  FullScreen
}

const appComponent = {
  install(app: App) {
    /**
     * @description 注册全局组件
     */
    for (const key in components) {
      app.component(key, components[key])
    }
  }
}

export default appComponent