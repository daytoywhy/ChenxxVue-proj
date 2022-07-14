import { defineStore } from 'pinia'
import '@/mock/index'
import { formatRouter, filterRouter } from '@/utils/useRouter'
import { routerApi } from '@/api'
import { store } from '@/store'
interface RouterType {
  routes: any[]
}
export const useRouterStore = defineStore('router', {
  state: (): RouterType => ({
    routes: []
  }),
  getters: {
    getSideMenu(): any {
      return filterRouter(this.routes, 'hideInMenu')
    }
  },
  actions: {
    async setRouter() {
      const {
        data: { routers }
      } = await routerApi.getRouter()
      this.routes = formatRouter(routers)
    }
  }
})

export function useRouterStoreHook() {
  return useRouterStore(store)
}