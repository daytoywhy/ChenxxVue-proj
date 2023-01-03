import request from '@/utils/request'

export default {
  getArticleList: () => {
    return request({
      url: 'article/getArticleList',
      method: 'get'
    })
  },
  getProjectList:()=>{
    return request({
      url:'calendar/getProjectList',
      method:'get'
    })
  },
  getCalendarList:()=>{
    return request({
      url:'calendar/getCalendarList',
      method:'get'
    })
  },
}