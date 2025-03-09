import { defineStore } from 'pinia'
import { server, headers, headersImage } from '/src/boot/axios'

export const useProductStore = defineStore('product', {
  actions: {
    async all() {
      return await server.get('api/product')
    },

    async dashboard() {
      return await server.get('api/product/dashboard', { headers })
    },

    async show(slug) {
      return await server.get(`api/product/${slug}`)
    },

    async create(data) {
      return await server.post('api/product', data, { headers: headersImage })
    },

    async edit(data) {
      return await server.post(`api/product/${data.id}`, data, { headers: headersImage })
    },

    async delete(data) {
      return await server.delete(`api/product/${data}`, { headers })
    }
  }
})
