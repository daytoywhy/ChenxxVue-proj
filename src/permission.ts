import router from './router'
import { useRouterStoreHook } from '@/store/modules/router'
import { storeToRefs } from 'pinia'
import Cookies from 'js-cookie'

const routerStore = useRouterStoreHook()
const { setRouter } = routerStore
const { routes } = storeToRefs(routerStore)

const whiteList = ['/login']

let asyncRouterFlag: number = 0
const regRouter = async () => {
  await setRouter()

  // 打印所有已挂载的路由
  // "for...of" 语句的左侧不能使用类型批注
  // console.log(routes.value)

  for (const item of routes.value) {
    // addRoute添加的是路由对象
    router.addRoute(item)
  }

  // addRoute里的对象要是RouteRecordRaw类型
  // routes.value.forEach((item: RouteRecordRaw) => {
  //   // addRoute添加的是路由对象
  //   router.addRoute(item)
  // })
}


router.beforeEach(async (to, from, next) => {

  const token: string = Cookies.get('token')

  if (whiteList.includes(to.path)) {
    next()
    return
  }
  if (token) {
    if (!asyncRouterFlag) {
      asyncRouterFlag++
      await regRouter()

      next({ ...to, replace: true })
    } else {
      if (to.matched.length) {
        next()
      }
    }
  } else {
    next({ name: 'login' })
  }
})