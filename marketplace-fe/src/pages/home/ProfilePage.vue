<template>
  <q-page class="q-my-lg">
    <div class="bg-primary text-white q-pb-lg">
      <div class="text-subtitle1 text-center text-bold q-pa-sm q-pb-lg">Akun Saya</div>
      <div v-if="loading">
        <div class="row justify-center">
          <div class="column self-center">
            <q-skeleton type="QAvatar" size="80px" class="q-ma-md" />
          </div>
        </div>
        <div class="row justify-center">
          <div class="column self-center">
            <q-skeleton width="155px" height="15px" class="q-my-xs" />
            <q-skeleton width="155px" height="12px" class="q-my-xs" />
          </div>
        </div>
      </div>
      <div v-else class="row justify-center">
        <div class="col-12 text-center">
          <q-avatar size="80px" class="q-ma-md">
            <img :src="url + '/avatars/' + profile.avatar" />
          </q-avatar>
        </div>
        <div class="col-12">
          <div class="text-body2 text-center text-bold">{{ profile.name }}</div>
          <div class="text-body2 text-center">{{ profile.email }}</div>
        </div>
      </div>
    </div>

    <div style="font-size: 12px">
      <div class="text-grey-9 bg-grey-4 q-pa-sm q-py-md q-pl-md border" style="font-size: 10px">PENGATURAN</div>
      <div class="q-pa-sm q-py-md q-pl-md border">
        <p class="float-left">Versi</p>
        <p class="float-right text-bold" style="letter-spacing: 3px; font-size: 15px">{{ setting.version }}</p>
        <br />
      </div>
      <div class="q-pa-sm q-py-md q-pl-md border" @click="navigateTo('home.setting')">
        <p class="float-left">Edit Profile</p>
        <p class="float-right"><q-icon name="manage_accounts" size="20px" /></p>
        <br />
      </div>
      <div class="q-pa-sm q-py-md q-pl-md border" @click="navigateTo('home.cart')">
        <p class="float-left">Keranjang Saya</p>
        <p class="float-right"><q-icon name="shopping_cart" size="20px" /></p>
        <br />
      </div>
      <div class="q-pa-sm q-py-md q-pl-md border" @click="navigateTo('home.order')">
        <p class="float-left">Pesanan Saya</p>
        <p class="float-right"><q-icon name="payments" size="20px" /></p>
        <br />
      </div>
      <div class="q-pa-sm q-py-md q-pl-md border" @click="logout">
        <div class="float-left">Keluar</div>
        <p class="float-right"><q-icon name="logout" size="20px" /></p>
        <br />
      </div>
      <div class="text-grey-9 bg-grey-4 q-pa-sm q-py-md q-pl-md border" style="font-size: 10px">INFORMASI UMUM</div>
      <div class="q-pa-sm q-py-md q-pl-md border" @click="navigateTo('home.tutorial')">
        <div class="float-right">
          <q-icon name="chevron_right" size="20px" />
        </div>
        <div>Tutorial</div>
      </div>
      <div class="q-pa-sm q-py-md q-pl-md border" @click="navigateTo('home.terms')">
        <div class="float-right">
          <q-icon name="chevron_right" size="20px" />
        </div>
        <div>Syarat dan Ketentuan</div>
      </div>
      <div class="q-pa-sm q-py-md q-pl-md border" @click="navigateTo('home.privacypolicy')">
        <div class="float-right">
          <q-icon name="chevron_right" size="20px" />
        </div>
        <div>Kebijakan Privasi</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { url, token } from '/src/boot/axios'
import { useUserStore } from '/src/stores/user-store'
import { useAuthStore } from '/src/stores/auth-store'
import { useSettingStore } from '/src/stores/setting-store'

const $q = useQuasar()
const router = useRouter()
const loading = ref(true)

// Profile
const profile = ref({})
const getProfile = async () => {
  try {
    const res = await useUserStore().profile()

    profile.value = res.data.data
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  if (token) {
    getProfile()
  }
})

// Get Setting
const setting = ref({})
const getSetting = async () => {
  try {
    const res = await useSettingStore().show()

    setting.value = res.data.data
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getSetting()
})

// Navigate
const navigateTo = (name, params) => {
  router.push({ name: name, params: params })
}

// Logout
const logout = async () => {
  $q.dialog({
    title: 'Logout',
    message: 'Apakah anda yakin?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await useAuthStore().logout()

      $q.notify({
        message: 'Logout Berhasil',
        icon: 'check',
        color: 'positive'
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      $q.notify({
        message: error.response.data.message || 'Logout Gagal',
        icon: 'warning',
        color: 'negative'
      })
    }
  })
}
</script>

<style scoped>
.border {
  border-top: 1px solid rgb(219, 219, 219);
}
.border:hover {
  cursor: pointer;
  background: linear-gradient(to left, var(--q-secondary), rgba(255, 255, 255, 0));
  transition: background-color 0.3s ease;
}
</style>
