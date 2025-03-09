<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-dark q-py-sm" elevated>
      <q-toolbar>
        <q-btn flat dense round @click="toggleDrawer" icon="menu" aria-label="Menu" />
        <q-toolbar-title>Dashboard {{ profile.role }}</q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <!-- Refresh -->
          <q-btn color="primary" icon="refresh" class="q-mx-sm" @click="$router.go()" round dense flat />

          <!-- FullScreen -->
          <q-btn v-if="$q.screen.gt.sm" color="primary" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" class="q-mx-sm" @click="$q.fullscreen.toggle()" round dense flat />

          <!-- Profile Menu -->
          <q-btn-dropdown v-if="loading" color="primary" class="q-mx-sm" rounded dense flat push no-caps>
            <template v-slot:label>
              <q-skeleton type="QAvatar" size="30px" />
            </template>
          </q-btn-dropdown>

          <q-btn-dropdown v-else color="primary" class="q-mx-sm" rounded dense flat push no-caps>
            <template v-slot:label>
              <q-avatar size="30px">
                <img :src="url + '/avatars/' + profile.avatar" />
              </q-avatar>
            </template>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <q-list class="nav-profile">
                  <q-item @click="navigateTo('home')" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>Beranda</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item @click="navigateTo('home.profile')" clickable v-close-popup>
                    <q-item-section>
                      <q-item-label>Profil</q-item-label>
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

    <q-drawer v-model="leftDrawerOpen" :mini="miniState" :width="250" :class="$q.dark.isActive ? 'bg-dark text-white' : 'bg-white text-dark'" bordered show-if-above>
      <q-list>
        <q-separator />

        <!-- Brand -->
        <q-item class="row justify-center q-py-lg">
          <q-item-section avatar>
            <img v-if="!miniState" src="/img/logo.png" width="100" />
            <img v-if="miniState" src="/img/logo.png" width="40" />
          </q-item-section>
        </q-item>

        <q-separator />

        <!-- Home -->
        <q-item :to="{ name: 'dashboard.home' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click q-py-md">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>

        <!-- User -->
        <q-item v-if="profile.role == 'Admin'" :to="{ name: 'dashboard.user' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click q-py-md">
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Pengguna</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Category -->
        <q-item v-if="profile.role == 'Admin'" :to="{ name: 'dashboard.category' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click q-py-md">
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Kategori</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Product -->
        <q-item :to="{ name: 'dashboard.product' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click q-py-md">
          <q-item-section avatar>
            <q-icon name="inventory_2" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Produk</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Promotion -->
        <q-item :to="{ name: 'dashboard.promotion' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click q-py-md">
          <q-item-section avatar>
            <q-icon name="discount" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Promosi</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Transaction -->
        <q-item :to="{ name: 'dashboard.transaction' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click q-py-md">
          <q-item-section avatar>
            <q-icon name="payments" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Transaksi</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Setting -->
        <q-item v-if="profile.role == 'Admin'" :to="{ name: 'dashboard.setting' }" active-class="q-item-no-link-highlighting menu-active" class="menu-click q-py-md">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Pengaturan</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { url } from '/src/boot/axios'
import { useUserStore } from 'src/stores/user-store'
import { useAuthStore } from 'src/stores/auth-store'

const $q = useQuasar()
const router = useRouter()

// Profile
const profile = ref([])
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
  getProfile()
})

// Sidebar
const leftDrawerOpen = ref(false)
const miniState = ref(false)
const desktop = ref(false)
const detectDesktop = () => {
  desktop.value = window.innerWidth > 1023
}
const toggleDrawer = () => {
  if (desktop.value) {
    miniState.value = !miniState.value
  } else {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }
}
onMounted(() => {
  detectDesktop()
  window.addEventListener('resize', detectDesktop)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', detectDesktop)
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

<style scoped>
.menu-click:hover {
  background: linear-gradient(to left, var(--q-secondary), rgba(255, 255, 255, 0));
  border-right: solid 0.313rem var(--q-primary);
  box-shadow: none;
}
.menu-active {
  background: linear-gradient(to left, var(--q-secondary), rgba(255, 255, 255, 0));
  border-right: solid 0.313rem var(--q-primary);
  box-shadow: none;
}
</style>
