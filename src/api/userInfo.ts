import request from '@/utils/request'

export default {
  getUserList: (params: any): any => {
    return request({
      url: 'user/getUserList',
      method: 'get',
      params
    })
  },
  getRoleList: (params: any): any => {
    return request({
      url: 'role/getRoleList',
      method: 'get',
      params
    })
  }
}