import { defineStore } from "pinia";
import Cookies from 'js-cookie'
import { loginApi } from '@/api'
import { messageSuccess, messageError } from '@/utils/message'
import { handlerSessionStorage, handlerLocalStorage } from '@/utils/storage'
interface userType {
  username: string,
  token: string,
  avatar: string
}
export const useUserStore = defineStore('user', {
  state: (): userType => ({
    username: 'daytoywhy',
    token: Cookies.get('token'),
    avatar: ''
  }),
  getters: {},
  actions: {
    setCookies(token: string) {
      this.token = token
      Cookies.set('token', token)
    },
    setUsername(name: string) {
      this.username = name
    },
    setAvatar(avatar: string) {
      this.avatar = avatar
    },
    async setLogin(userInfo: object) {
      try {
        const res = await loginApi.signInSuccess(userInfo)
        const { avatar, username, token } = res.data
        this.setAvatar(avatar)
        this.setUsername(username)
        this.setCookies(token)
        const hour = new Date().getHours()
        const welcome =
          hour < 8
            ? '早上好～'
            : hour <= 11
              ? '上午好～'
              : hour <= 13
                ? '中午好～'
                : hour <= 18
                  ? '下午好～'
                  : '晚上好～'
        messageSuccess(`${welcome},欢迎回家`)
      } catch {
        const error = '接口登录异常，请稍后再试...'
        messageError(error)
        throw error
      }
    },
    async setLogout() {
      await loginApi.logout()
      handlerSessionStorage.clearAll()
      handlerLocalStorage.clearAll()
      Cookies.remove('token')
      location.reload()
    }
  }
})