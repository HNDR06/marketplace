import { defineStore } from 'pinia'
import { server, headers } from '/src/boot/axios'

export const useAuthStore = defineStore('auth', {
  actions: {
    async register(
      username,
      name,
      email,
      password,
      confirm_password,
      avatar,
      phone_number,
      province_id,
      regency_id,
      district_id,
      village_id,
      country,
      zip_code,
      address_one,
      address_two,
      store_name,
      category,
      store_status
    ) {
      return await server.post('api/auth/register', {
        username,
        name,
        email,
        password,
        confirm_password,
        avatar,
        phone_number,
        province_id,
        regency_id,
        district_id,
        village_id,
        country,
        zip_code,
        address_one,
        address_two,
        store_name,
        category,
        store_status
      })
    },

    async login(email, password) {
      return await server.post('api/auth/login', { email, password })
    },

    async logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      window.location.reload()

      return await server.get('api/auth/logout', { headers })
    }
  }
})
