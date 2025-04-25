import { defineStore } from 'pinia'
import { server, headers } from '/src/boot/axios'

export const useTransactionStore = defineStore('transaction', {
  actions: {
    async all() {
      return await server.get('api/transaction', { headers })
    },

    async dashboard() {
      return await server.get('api/transaction/dashboard', { headers })
    },

    async getByUser() {
      return await server.get(`api/transaction/user`, { headers })
    },

    async show(invoice) {
      return await server.get(`api/transaction/${invoice}`, { headers })
    },

    async create(data) {
      return await server.post('api/transaction', data, { headers })
    },

    async ongkir(data) {
      return await server.post('api/transaction/ongkir', data, { headers })
    },

    async edit(data) {
      return await server.put(`api/transaction/${data.id}`, data, { headers })
    },

    async updateshipping(data) {
      return await server.put(`api/transaction/updateshipping/${data.id}`, data, { headers })
    },

    async delete(data) {
      return await server.delete(`api/transaction/${data}`, { headers })
    }
  }
})
