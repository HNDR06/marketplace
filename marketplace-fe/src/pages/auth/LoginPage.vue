<template>
  <q-page class="row justify-center items-center self-center q-my-xl">
    <div class="col-md-6 text-center">
      <q-img src="/img/login-placeholder.png" alt="" class="q-mb-md" style="width: 500px" />
    </div>
    <div class="col-md-5">
      <div class="text-h5 q-mx-lg">Belanja kebutuhan utama, menjadi lebih mudah</div>
      <div class="row justify-center">
        <q-form @submit="login" class="col-9">
          <!-- Email -->
          <div class="q-my-sm">
            <label for="email">Email</label>
            <q-input v-model="email" type="email" id="email" :rules="rules.email" outlined dense />
          </div>

          <!-- Password -->
          <div class="q-my-sm">
            <label for="password">Password</label>
            <q-input v-model="password" type="password" id="password" :rules="rules.password" outlined dense />
          </div>

          <!-- Submit -->
          <q-btn type="submit" color="primary" label="Masuk ke Akun Saya" class="full-width q-mt-sm" :loading="loading" :disable="loading" no-caps>
            <template v-slot:loading>
              <q-spinner-gears />
            </template>
          </q-btn>

          <!-- Register -->
          <div class="q-mt-sm text-center" style="font-size: 12px">
            <div class="text-bold cursor-pointer">
              Belum mempunyai akun?
              <router-link :to="{ name: 'register' }" class="link text-primary">Daftar</router-link>
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from '/src/stores/auth-store'

const $q = useQuasar()

// Data
const email = ref('')
const password = ref('')

// Validate
const rules = ref({
  email: [(v) => !!v || 'Email harus diisi', (v) => /.+@.+/.test(v) || 'Email tidak valid'],
  password: [(v) => !!v || 'Password harus diisi', (v) => v.length >= 8 || 'Password minimal 8 karakter']
})

// Login
const loading = ref(false)
const login = async () => {
  loading.value = true
  try {
    const res = await useAuthStore().login(email.value, password.value)

    localStorage.setItem('token', res.data.data.token)
    localStorage.setItem('role', res.data.data.user.role)
    $q.notify({
      message: 'Login Berhasil',
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
