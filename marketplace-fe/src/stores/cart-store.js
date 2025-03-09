import { defineStore } from 'pinia'
import { server, headers } from '/src/boot/axios'

export const useCartStore = defineStore('cart', {
  actions: {
    async all() {
      return await server.get('api/cart', { headers })
    },

    async dashboard() {
      return await server.get('api/cart/dashboard', { headers })
    },

    async getByUser() {
      return await server.get(`api/cart/user`, { headers })
    },

    async show(id) {
      return await server.get(`api/cart/${id}`, { headers })
    },

    async create(data) {
      return await server.post('api/cart', data, { headers })
    },

    async edit(data) {
      return await server.put(`api/cart/${data.id}`, data, { headers })
    },

    async delete(data) {
      return await server.delete(`api/cart/${data}`, { headers })
    }
  }
})
