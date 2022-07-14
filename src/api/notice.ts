import request from '@/utils/request'

export default {
  getNoticeList: (): any => {
    return request({
      url: 'notice/getNoticeList',
      method: 'get',
    })
  }
}