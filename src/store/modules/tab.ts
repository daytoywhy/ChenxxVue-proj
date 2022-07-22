import { defineStore } from 'pinia'

interface TabType {
  visitedRouteList: any[]
}
export const useTabStore = defineStore('tab', {
  state: (): TabType => ({
    visitedRouteList: []
  }),
  getters: {
    getVisitedRouteList(): any {
      return this.visitedRouteList.filter(route => route.name !== 'login' && route.name !== 'bigView')
    }
  },
  actions: {
    /**
     * 
     * @param route 
     */
    addVisitedRoute(route: any) {
      const target = this.visitedRouteList.find(item => item.name == route.name)
      if (!target) {
        this.visitedRouteList.push(Object.assign({}, route))
      }
    },
    delVisitedRoute(pathName: any) {
      this.visitedRouteList.splice(
        this.visitedRouteList.findIndex(route => route.path == pathName),
        1
      )
    },
    /**
     * 
     * @param path 关闭其他的标签
     */
    delOtherRoute(path: any) {
      this.visitedRouteList = this.visitedRouteList.filter(
        route => route.meta.noCloseTab || route.path == path
      )
    },
    /**
     * 
     * @param path 关闭左侧标签
     */
    delLeftRoute(path: any) {
      let found = false
      this.visitedRouteList = this.visitedRouteList.filter(
        route => {
          if (route.path == path) found = true
          return route.meta.noCloseTab || found
        }
      )
    },
    /**
     * 
     * @param path 关闭右侧标签
     */
    delRightRoute(path: any) {
      let found = false
      this.visitedRouteList = this.visitedRouteList.filter(
        route => {
          const close = found
          if (route.path == path) found = true
          return route.meta.noCloseTab || !close
        }
      )
    },
    /**
     * @description 关闭所有标签
     */
    delAllRoute() {
      this.visitedRouteList = this.visitedRouteList.filter(route =>
        route.meta.noCloseTab
      )
    }
  }
})