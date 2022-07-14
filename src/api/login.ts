import request from "@/utils/request";

export default {
  getCode: (): any => {
    return request({
      url: 'login/kaptcha',
      method: 'get'
    })
  },
  signInSuccess: (data: object): any => {
    return request({
      url: 'login/signIn',
      method: 'post',
      data
    })
  },
  logout: (): any => {
    return request({
      url: 'login/signOut',
      method: 'get'
    })
  }
}
