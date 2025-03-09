<template>
  <q-page class="q-my-xl" style="max-width: 500px; margin: auto">
    <div class="text-h5 text-center q-mx-lg">Memulai untuk jual beli dengan cara terbaru</div>
    <q-form @submit="register" class="q-my-lg">
      <div class="row justify-between">
        <!-- Username -->
        <div class="col-5">
          <div class="q-my-xs">
            <label for="email">Username</label>
            <q-input v-model="username" type="text" id="username" :rules="rules.username" outlined dense />
          </div>
        </div>

        <!-- Name -->
        <div class="col-5">
          <div class="q-my-xs">
            <label for="email">Nama</label>
            <q-input v-model="name" id="name" :rules="rules.name" outlined dense />
          </div>
        </div>
      </div>

      <!-- Email -->
      <div class="q-my-xs">
        <label for="email">Email</label>
        <q-input v-model="email" type="email" id="email" :rules="rules.email" outlined dense />
      </div>

      <!-- Password -->
      <div class="q-my-xs">
        <label for="password">Kata Sandi</label>
        <q-input v-model="password" type="password" id="password" :rules="rules.password" outlined dense />
      </div>

      <!-- Confirm Password -->
      <div class="q-my-xs">
        <label for="confirm_password">Konfirmasi Kata Sandi</label>
        <q-input v-model="confirm_password" type="password" id="confirm_password" :rules="rules.confirm_password" outlined dense />
      </div>

      <!-- Submit -->
      <q-btn type="submit" color="primary" label="Daftar Sekarang" class="full-width q-mt-sm" :loading="loading" :disable="loading" no-caps>
        <template v-slot:loading>
          <q-spinner-gears />
        </template>
      </q-btn>

      <!-- Login -->
      <div class="q-mt-sm text-center" style="font-size: 12px">
        <div class="text-bold cursor-pointer">
          Sudah mempunyai akun?
          <router-link :to="{ name: 'login' }" class="link text-primary">Masuk</router-link>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from '/src/stores/auth-store'
import { useUserStore } from '/src/stores/user-store'

const $q = useQuasar()

// Data
const username = ref('')
const name = ref('')
const email = ref('')
const password = ref('')
const confirm_password = ref('')

// Get User
const users = ref([])
const getUser = async () => {
  try {
    const res = await useUserStore().all()

    users.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getUser()
})

// Validate
const rules = ref({
  username: [
    (v) => !!v || 'Username harus diisi',
    (v) => v.length >= 6 || 'Username minimal 6 karakter',
    (v) => v.length <= 20 || 'Username maksimal 20 karakter',
    (v) => {
      if (typeof v === 'string') {
        if (users.value) {
          return !users.value.some((user) => user.username.toLowerCase() === v.toLowerCase()) || 'Username sudah ada'
        }
      }
      return true
    }
  ],
  name: [(v) => !!v || 'Nama harus diisi', (v) => v.length <= 50 || 'Nama maksimal 50 karakter'],
  email: [
    (v) => !!v || 'Email harus diisi',
    (v) => /.+@.+/.test(v) || 'Email tidak valid',
    (v) => {
      if (typeof v === 'string') {
        if (users.value) {
          return !users.value.some((user) => user.email.toLowerCase() === v.toLowerCase()) || 'Email sudah ada'
        }
      }
      return true
    }
  ],
  password: [(v) => !!v || 'Password harus diisi', (v) => v.length >= 8 || 'Password minimal 8 karakter'],
  confirm_password: [(v) => !!v || 'Konfirmasi Password harus diisi', (v) => v === password.value || 'Password tidak sama']
})

// Register
const loading = ref(false)
const register = async () => {
  loading.value = true
  try {
    const res = await useAuthStore().register(username.value, name.value, email.value, password.value, confirm_password.value)

    localStorage.setItem('token', res.data.data.token)
    localStorage.setItem('role', res.data.data.user.role)
    $q.notify({
      message: 'Register Berhasil',
      icon: 'check',
      color: 'positive'
    })
    window.location.reload()
  } catch (error) {
    console.error('Error submitting form:', error)
    $q.notify({
      message: error.response.data.message || 'Format Email dan Password masih salah',
      icon: 'warning',
      color: 'negative'
    })
  }
  loading.value = false
}
</script>
