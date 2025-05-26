import { defineStore } from 'pinia'
import { server, headers, headersImage } from '/src/boot/axios'

export const useUserStore = defineStore('user', {
  actions: {
    async all() {
      return await server.get('api/user', { headers })
    },

    async dashboard() {
      return await server.get('api/user/dashboard', { headers })
    },

    async show(username) {
      return await server.get(`api/user/${username}`, { headers })
    },

    async create(data) {
      return await server.post('api/user', data, { headers: headersImage })
    },

    async edit(data) {
      return await server.post(`api/user/${data.id}`, data, { headers: headersImage })
    },

    async editavatar(data) {
      return await server.post(`api/user/${data.id}/avatar`, data, { headers: headersImage })
    },

    async delete(data) {
      return await server.delete(`api/user/${data}`, { headers })
    },

    async profile() {
      return await server.get('api/profile', { headers })
    },

    async editprofile(data) {
      return await server.put('api/profile/edit', data, { headers })
    },

    async editprofileavatar(data) {
      return await server.post('api/profile/edit/avatar', data, { headers: headersImage })
    }
  }
})
