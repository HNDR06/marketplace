import { defineStore } from 'pinia'
import { server, headers } from '/src/boot/axios'

export const useSettingStore = defineStore('setting', {
  actions: {
    async cart() {
      return await server.get(`api/setting`, { headers })
    },

    async show() {
      return await server.get(`api/setting/configuration`, { headers })
    },

    async dashboard() {
      return await server.get(`api/setting/dashboard`, { headers })
    },

    async edit(data) {
      return await server.put(`api/setting`, data, { headers })
    }
  }
})
