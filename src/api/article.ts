import request from '@/utils/request'

export default {
  getArticleList: () => {
    return request({
      url: 'article/getArticleList',
      method: 'get'
    })
  }
}