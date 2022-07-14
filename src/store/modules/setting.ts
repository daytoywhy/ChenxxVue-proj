import { defineStore } from 'pinia'
import { handlerLocalStorage } from '@/utils/storage'
interface SettingType {
  opened: boolean,
  mobile: boolean
}

export const useSettingStore = defineStore('setting', {
  state: (): SettingType => ({
    opened: handlerLocalStorage.get('sidebarStatus') ?? true,
    mobile: false,
  }),
  getters: {},
  actions: {
    toggleSidebar() {
      this.opened = !this.opened
      handlerLocalStorage.set('sidebarStatus', this.opened)
    },
    toggleMobile(mobile: boolean) {
      this.mobile = mobile
    }
  }
})