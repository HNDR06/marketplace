import { defineStore } from 'pinia'
import { server, headers } from '/src/boot/axios'

export const useCategoryStore = defineStore('category', {
  actions: {
    async all() {
      return await server.get('api/category')
    },

    async dashboard() {
      return await server.get('api/category/dashboard', { headers })
    },

    async show(slug) {
      return await server.get(`api/category/${slug}`)
    },

    async create(data) {
      return await server.post('api/category', data, { headers })
    },

    async edit(data) {
      return await server.put(`api/category/${data.id}`, data, { headers })
    },

    async delete(data) {
      return await server.delete(`api/category/${data}`, { headers })
    }
  }
})
