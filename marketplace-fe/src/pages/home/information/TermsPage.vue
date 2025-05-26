<template>
  <q-page>
    <router-link :to="{ name: 'home.profile' }" class="link text-primary transaction-title q-mb-xl">
      <q-icon name="arrow_back" size="20px" class="q-mx-sm" />
      Kembali ke menu Profile
    </router-link>

    <div class="text-h3 text-bold text-center q-my-lg">Syarat dan Ketentuan</div>
    <q-separator class="q-my-md" />

    <!-- Loading -->
    <div v-if="loading">
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
      <q-skeleton width="100%" class="q-my-xs" />
    </div>

    <!-- Data -->
    <div v-else v-html="setting.terms"></div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSettingStore } from '/src/stores/setting-store'

// Get Setting
const setting = ref({})
const loading = ref(true)
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
</script>
