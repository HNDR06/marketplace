<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Navbar -->
    <q-header class="large-screen bg-white q-px-lg">
      <q-toolbar class="text-primary q-my-sm">
        <!-- Logo -->
        <router-link :to="{ name: 'home' }">
          <img src="/img/logo.png" width="80" class="q-pa-xs" />
        </router-link>

        <!-- Tab -->
        <q-toolbar-title class="q-py-sm q-mx-lg" style="font-size: 16px">
          <router-link :to="{ name: 'home' }" class="nav-link q-mx-sm text-bold" :class="$route.name === 'home' ? 'active-tab' : ''">Beranda</router-link>
          <router-link :to="{ name: 'home.categories' }" class="nav-link q-mx-sm text-bold" :class="$route.name === 'home.categories' ? 'active-tab' : ''">Kategori</router-link>
          <router-link :to="{ name: 'home.explore' }" class="nav-link q-mx-sm text-bold" :class="$route.name === 'home.explore' ? 'active-tab' : ''">Jelajahi</router-link>
        </q-toolbar-title>

        <!-- Authentication -->
        <div v-if="!token">
          <!-- Register -->
          <q-btn :to="{ name: 'register' }" color="primary" label="Daftar" class="q-mx-xs" no-caps flat />

          <!-- Login -->
          <q-btn :to="{ name: 'login' }" color="primary" label="Masuk" class="q-mx-xs" no-caps />
        </div>

        <div v-else>
          <!-- Cart -->
          <q-btn :to="{ name: 'home.cart' }" color="primary" size="18px" class="q-mx-lg" icon="shopping_cart" flat round />

          <!-- Profile Menu -->
          <q-btn-dropdown v-if="loading" color="primary" class="q-mx-xs" rounded dense flat push glossy split>
            <template v-slot:label>
              <q-skeleton type="QAvatar" size="26px" />
            </template>
          </q-btn-dropdown>

          <q-btn-dropdown v-else :to="{ name: 'home.profile' }" color="primary" class="q-mx-xs" rounded dense flat push glossy split>
            <template v-slot:label>
              <q-skeleton v-if="loading" type="QAvatar" size="26px" />

              <q-avatar v-else size="26px">
                <img :src="url + '/avatars/' + profile.avatar" />
              </q-avatar>
            </template>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <q-list class="nav-profile">
                  <q-item v-if="role === 'Admin' || role === 'Mitra'" @click="navigateTo('dashboard.home')" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>Dasbor</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item @click="navigateTo('home.profile')" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>Profil</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item v-if="role === 'Customer'" @click="navigateTo('home.order')" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>Pesanan Saya</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item @click="navigateTo('home.setting')" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>Pengaturan</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <q-separator vertical inset class="q-mx-md" />

              <div class="column items-center">
                <q-avatar size="72px" class="q-mx-md">
                  <img :src="url + '/avatars/' + profile.avatar" />
                </q-avatar>

                <div class="nav-profile text-subtitle1 text-grey-8 q-mt-sm">{{ profile.username }}</div>
                <div class="nav-profile text-subtitle2 text-bold q-mb-md q-mt-xs" style="max-width: 150px">{{ profile.name }}</div>

                <q-btn color="primary" label="Keluar" push size="sm" v-close-popup @click="logout" />
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Pages -->
    <q-page-container class="q-mb-lg container">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>

    <!-- Footer -->
    <footer class="bg-grey-3 q-py-lg">
      <div class="text-body1 text-center text-grey-8">2024 Copyright Store. All Rights Reserved.</div>
    </footer>

    <!-- Mobile -->
    <div class="small-screen">
      <!-- Header -->
      <q-header class="bg-white q-pt-sm">
        <q-toolbar class="text-primary">
          <!-- Logo -->
          <q-toolbar-title>
            <router-link :to="{ name: 'home' }">
              <img src="/img/logo.png" width="50" class="q-pa-xs q-mx-md" />
            </router-link>
          </q-toolbar-title>

          <!-- Register -->
          <div v-if="!token">
            <q-btn :to="{ name: 'register' }" color="primary" size="sm" label="Daftar" class="q-mx-xs" rounded />
          </div>

          <div v-else>
            <!-- Cart -->
            <q-btn :to="{ name: 'home.cart' }" color="primary" size="15px" class="q-mx-lg" icon="shopping_cart" flat round />

            <!-- Profile Menu -->
            <q-btn-dropdown v-if="loading" color="primary" class="q-mx-xs" rounded dense flat push glossy split>
              <template v-slot:label>
                <q-skeleton type="QAvatar" size="26px" />
              </template>
            </q-btn-dropdown>

            <q-btn-dropdown v-else :to="{ name: 'home.profile' }" color="primary" class="q-mx-xs" rounded dense flat push glossy split>
              <template v-slot:label>
                <q-skeleton v-if="loading" type="QAvatar" size="26px" />

                <q-avatar v-else size="26px">
                  <img :src="url + '/avatars/' + profile.avatar" />
                </q-avatar>
              </template>
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <q-list class="nav-profile">
                    <q-item v-if="role === 'Admin' || role === 'Mitra'" @click="navigateTo('dashboard.home')" clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>Dasbor</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item @click="navigateTo('home.profile')" clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>Profil</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item v-if="role === 'Customer'" @click="navigateTo('home.order')" clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>Pesanan Saya</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item @click="navigateTo('home.setting')" clickable v-close-popup>
                      <q-item-section>
                        <q-item-label>Pengaturan</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>

                <q-separator vertical inset class="q-mx-md" />

                <div class="column items-center">
                  <q-avatar size="72px" class="q-mx-md">
                    <img :src="url + '/avatars/' + profile.avatar" />
                  </q-avatar>

                  <div class="nav-profile text-subtitle1 text-grey-8 q-mt-sm">{{ profile.username }}</div>
                  <div class="nav-profile text-subtitle2 text-bold q-mb-md q-mt-xs" style="max-width: 150px">{{ profile.name }}</div>

                  <q-btn color="primary" label="Keluar" push size="sm" v-close-popup @click="logout" />
                </div>
              </div>
            </q-btn-dropdown>
          </div>
        </q-toolbar>
      </q-header>

      <!-- Footer -->
      <q-footer elevated>
        <q-tabs class="bg-primary" align="justify">
          <!-- Home -->
          <q-route-tab name="home" icon="home" :to="{ name: 'home' }" />

          <!-- Explore -->
          <q-route-tab name="explore" icon="search" :to="{ name: 'home.explore' }" />

          <!-- Categories -->
          <q-route-tab name="category" icon="category" :to="{ name: 'home.categories' }" />

          <!-- Order -->
          <q-route-tab v-if="token" name="order" icon="payments" class="larger-tab" :to="{ name: 'home.order' }" />

          <!-- Profile -->
          <q-route-tab v-if="!token" name="profile" :to="{ name: 'login' }">
            <q-avatar size="20px"><img :src="url + '/avatars/user-profile-default.jpg'" /></q-avatar>
          </q-route-tab>
          <q-route-tab v-else name="profile" :to="{ name: 'home.profile' }">
            <q-skeleton v-if="loading" type="QAvatar" size="20px" />

            <q-avatar v-else size="20px">
              <img :src="url + '/avatars/' + profile.avatar" />
            </q-avatar>
          </q-route-tab>
        </q-tabs>
      </q-footer>
    </div>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { url, token } from '/src/boot/axios'
import { useAuthStore } from '/src/stores/auth-store'
import { useUserStore } from '/src/stores/user-store'

const $q = useQuasar()
const router = useRouter()
const role = localStorage.getItem('role')

// Profile
const profile = ref({})
const loading = ref(true)
const getProfile = async () => {
  try {
    const res = await useUserStore().profile()

    profile.value = res.data.data
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    $q.notify({
      message: 'Sesi Habis',
      icon: 'warning',
      color: 'negative'
    })
    window.location.reload()
  }
}
onMounted(() => {
  if (token) {
    getProfile()
  }
})

// Navigate
const navigateTo = (name, params) => {
  router.push({ name: name, params: params })
}

// Logout
const logout = async () => {
  $q.dialog({
    title: 'Keluar',
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
