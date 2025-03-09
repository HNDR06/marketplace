import { defineStore } from 'pinia'
import { server, headers } from '/src/boot/axios'

export const useTransactionDetailStore = defineStore('transactiondetail', {
  actions: {
    async all() {
      return await server.get('api/transactiondetail', { headers })
    },

    async dashboard() {
      return await server.get('api/transactiondetail/dashboard', { headers })
    },

    async show(id) {
      return await server.get(`api/transactiondetail/${id}`, { headers })
    },

    async create(data) {
      return await server.post('api/transactiondetail', data, { headers })
    },

    async edit(data) {
      return await server.put(`api/transactiondetail/${data.id}`, data, { headers })
    },

    async delete(data) {
      return await server.delete(`api/transactiondetail/${data}`, { headers })
    }
  }
})
