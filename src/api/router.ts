import request from "@/utils/request";

export default {
  getRouter: (): any => {
    return request({
      url: 'router/getRouterList',
      method: 'get'
    })
  }
}