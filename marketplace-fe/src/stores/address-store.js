import { defineStore } from 'pinia'
import { server } from '/src/boot/axios'

export const useAddressStore = defineStore('address', {
  actions: {
    async all() {
      return await server.get(`api/address`)
    }
  }
})
