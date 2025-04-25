import { defineStore } from 'pinia'
import { server, headers, headersImage } from '/src/boot/axios'

export const usePromotionStore = defineStore('promotion', {
  actions: {
    async all() {
      return await server.get('api/promotion')
    },

    async dashboard() {
      return await server.get('api/promotion/dashboard', { headers })
    },

    async show(slug) {
      return await server.get(`api/promotion/${slug}`)
    },

    async create(data) {
      return await server.post('api/promotion', data, { headers: headersImage })
    },

    async edit(data) {
      return await server.post(`api/promotion/${data.id}`, data, { headers: headersImage })
    },

    async delete(data) {
      return await server.delete(`api/promotion/${data}`, { headers })
    }
  }
})
