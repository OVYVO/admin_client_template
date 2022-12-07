import { defineStore } from 'pinia'

interface userInfo {
  user_id: number | string
  user_name: string
}

export const useStore = defineStore('user', {
  state: (): userInfo => {
    return {
      user_id: '',
      user_name: 'Admin'
    }
  },
  getters: {
    userName: state => state.user_name
  },
  actions: {
    changeName() {
      this.user_name = 'viewer'
    }
  }
})
