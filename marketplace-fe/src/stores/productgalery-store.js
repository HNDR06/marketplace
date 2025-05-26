import { defineStore } from 'pinia'
import { server, headers, headersImage } from '/src/boot/axios'

export const useProductGaleryStore = defineStore('productgalery', {
  actions: {
    async all() {
      return await server.get('api/productgalery')
    },

    async dashboard() {
      return await server.get('api/productgalery/dashboard', { headers })
    },

    async show(id) {
      return await server.get(`api/productgalery/${id}`)
    },

    async create(data) {
      return await server.post('api/productgalery', data, { headers: headersImage })
    },

    async edit(data) {
      return await server.put(`api/productgalery/${data.id}`, data, { headers: headersImage })
    },

    async delete(data) {
      return await server.delete(`api/productgalery/${data}`, { headers })
    }
  }
})
