<template>
  <div class="text-center q-pa-md q-py-xl flex flex-center">
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <div v-if="!loading">
        <q-btn v-if="profile.role == 'Customer'" class="q-mt-xl" color="primary" :to="{ name: 'home' }" label="Kembali ke Beranda" unelevated no-caps />
        <q-btn v-else class="q-mt-xl" color="primary" :to="{ name: 'dashboard.home' }" label="Kembali ke Dashboard" unelevated no-caps />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from 'src/stores/user-store'

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
  }
}
onMounted(() => {
  getProfile()
})
</script>
