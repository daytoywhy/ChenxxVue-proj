import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { store } from './store'
import './permission'

import appComponent from './components'
import 'normalize.css/normalize.css'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'


// 引入全局阿里图标库
import '@/assets/font/iconfont.css'

import 'xe-utils'
// 给 vue 实例挂载内部对象，例如：
// app.config.globalProperties.$XModal = VXETable.modal
// app.config.globalProperties.$XPrint = VXETable.print
// app.config.globalProperties.$XSaveFile = VXETable.saveFile
// app.config.globalProperties.$XReadFile = VXETable.readFile
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

//在vite中使用环境变量，import.meta.env,并且在配置环境变量的文件里，要以VITE开头，才能被正确识别
import.meta.env.VITE_APP_MOCK == 'true' && import('./mock')

const app = createApp(App)
dayjs.extend(weekOfYear)
app.config.globalProperties.$dayjs = dayjs


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus).use(VXETable).use(router).use(store).use(appComponent).mount('#app')