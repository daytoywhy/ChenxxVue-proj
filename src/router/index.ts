import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录页'
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  router.push('/error/404')
  console.log(
    isChunkLoadFailed,
    '/Loading chunk (d)+ failed/g',
    '路由懒加载找不到对应的moudle'
  )
  if (isChunkLoadFailed) {
    // router.push('/404')
    // window.location.reload()
  } else {
    console.log(error)
  }
})

export default router