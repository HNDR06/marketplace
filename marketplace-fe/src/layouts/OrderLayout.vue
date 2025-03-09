<template>
  <q-layout view="lHh Lpr lFf">
    <div class="fixed-top order-tab" style="z-index: 99">
      <q-tabs v-model="ordertab" active-color="primary" indicator-color="primary" align="justify" class="bg-white q-ma-sm" dense no-caps outside-arrows mobile-arrows>
        <q-route-tab name="all" label="Semua" :to="{ name: 'home.order' }" exact replace />
        <q-route-tab name="notyetpaid" label="Belum Dibayar" :to="{ name: 'home.order.notyetpaid' }" exact replace>
          <q-badge v-if="badges.notyetpaid > 0" floating>{{ badges.notyetpaid }}</q-badge>
        </q-route-tab>
        <q-route-tab name="packaged" label="Sedang Dikemas" :to="{ name: 'home.order.packaged' }" exact replace>
          <q-badge v-if="badges.packaged > 0" floating>{{ badges.packaged }}</q-badge>
        </q-route-tab>
        <q-route-tab name="sent" label="Sedang Dikirim" :to="{ name: 'home.order.sent' }" exact replace>
          <q-badge v-if="badges.sent > 0" floating>{{ badges.sent }}</q-badge>
        </q-route-tab>
        <q-route-tab name="finished" label="Selesai" :to="{ name: 'home.order.finished' }" exact replace>
          <q-badge v-if="badges.finished > 0" floating>{{ badges.finished }}</q-badge>
        </q-route-tab>
        <q-route-tab name="canceled" label="Dibatalkan" :to="{ name: 'home.order.canceled' }" exact replace>
          <q-badge v-if="badges.canceled > 0" floating>{{ badges.canceled }}</q-badge>
        </q-route-tab>
      </q-tabs>
    </div>

    <!-- Pages -->
    <q-page-container class="q-my-xl">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useTransactionStore } from '/src/stores/transaction-store'

const route = useRoute()
const loading = ref(true)

// Transaction By User
const transactions = ref([])
const transactionByUser = async () => {
  loading.value = true
  try {
    const res = await useTransactionStore().getByUser()
    transactions.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  loading.value = false
}
watchEffect(() => {
  transactionByUser()
})

// Tabs
const ordertab = ref('')
watchEffect(() => {
  if (route.name === 'home.order') {
    ordertab.value = 'all'
  } else if (route.name === 'home.order.notyetpaid') {
    ordertab.value = 'notyetpaid'
  } else if (route.name === 'home.order.packaged') {
    ordertab.value = 'packaged'
  } else if (route.name === 'home.order.sent') {
    ordertab.value = 'sent'
  } else if (route.name === 'home.order.finished') {
    ordertab.value = 'finished'
  } else {
    ordertab.value = 'canceled'
  }
})

// Badges
const badges = computed(() => ({
  notyetpaid: transactions.value.filter((item) => item.shipping_status == 0).length,
  packaged: transactions.value.filter((item) => item.shipping_status == 1).length,
  sent: transactions.value.filter((item) => item.shipping_status == 2).length,
  finished: transactions.value.filter((item) => item.shipping_status == 3).length,
  canceled: transactions.value.filter((item) => item.shipping_status == 4).length
}))
</script>

<style scoped>
.order-tab {
  margin-top: 69px;
}
@media screen and (min-width: 691px) {
  .order-tab {
    margin-top: 92px;
  }
}
</style>
