interface RouterInfo {
  id: number,
  path: string,
  name: string,
  component: string,
  redirect: string,
  title: string,
  icon: string,
  frameSrc: string,
  hideInMenu: boolean,
  hideInBread: boolean,
  noCloseTab: boolean,
  sort: number,
  isNew: boolean,
  children: Array<RouterInfo> | null
}

interface RType {
  id: number
  path: string
  name: string
  component: unknown
  redirect: string
  meta: {
    title: string,
    icon: string
    frameSrc: string
    hideInMenu: boolean
    hideInBread: boolean
    noCloseTab: boolean
    sort: number
    isNew: boolean
  },
  children: Array<RType>
}

export const formatRouter = (routerList: Array<RouterInfo>) => {
  /**
   * vite动态导入文件要使用import.meta.glob()
   */
  const formatComp = import.meta.glob('../views/**/*.vue')
  const router = []
  let rNew
  let component: any
  for (const n of routerList) {
    component = formatComp[`../views/${n.component}`]
    rNew = {
      id: n.id,
      path: n.path,
      name: n.name,
      redirect: n.redirect,
      component: component
    } as RType
    rNew = {
      ...rNew,
      meta: {
        title: n.title,
        icon: n.icon,
        frameSrc: n.frameSrc,
        hideInMenu: n.hideInMenu,
        hideInBread: n.hideInBread,
        noCloseTab: n.noCloseTab,
        sort: n.sort,
        isNew: n.isNew
      }
    }
    if (n.children) {
      const children: any[] = formatRouter(n.children)
      rNew = { ...rNew, children: children }
    } else {
      rNew = { ...rNew, children: null }
    }
    router.push(rNew)
  }
  console.log(router);

  return router
}

export const filterRouter = (routerList: Array<RType>, param: string) => {
  const router = []
  let rNew
  for (const r of routerList) {
    if (r.meta[param]) return
    rNew = {
      id: r.id,
      path: r.path,
      name: r.name,
      redirect: r.redirect,
      component: r.component,
      meta: r.meta
    } as RType
    if (r.children) {
      const children: any = filterRouter(r.children, param)
      rNew = { ...rNew, children: children }
    }
    router.push(rNew)
  }

  return router
}