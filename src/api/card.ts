import request from '@/utils/request'

export default {
  getIconList: () => {
    return request({
      url: 'card/getIconList',
      method: 'get'
    })
  }
}