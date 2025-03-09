<template>
  <q-page v-if="loading">
    <q-skeleton height="200px" class="q-my-md" />
    <q-skeleton height="300px" class="q-my-md" />
    <q-skeleton height="300px" class="q-my-md" />
  </q-page>
  <q-page v-if="!loading && transactions && transactions.length > 0">
    <router-link v-for="transaction in transactions" :key="transaction.id" :to="{ name: 'home.transaction', params: { invoice: transaction.invoice } }" class="products-link text-dark">
      <q-card v-if="!loading" class="my-card q-my-md q-pb-lg">
        <q-card-section class="bg-grey-2 text-body1 text-bold text-primary">
          <q-icon name="shopping_cart_checkout" size="20px" class="q-mx-sm" />
          <span>Pesanan</span>
          <q-badge v-if="transaction.shipping_status == 0" color="grey" class="float-right">Belum Dibayar</q-badge>
          <q-badge v-if="transaction.shipping_status == 1" color="warning" class="float-right">Sedang Dikemas</q-badge>
          <q-badge v-if="transaction.shipping_status == 2" color="green" class="float-right">Sedang Dikirim</q-badge>
          <q-badge v-if="transaction.shipping_status == 3" color="blue" class="float-right">Selesai</q-badge>
          <q-badge v-if="transaction.shipping_status == 4" color="red" class="float-right">Dibatalkan</q-badge>
          <div class="text-grey-5 transaction-subtitle q-mx-sm">{{ transaction.invoice }}</div>
        </q-card-section>
        <q-card-section class="q-pa-lg">
          <div v-for="transactiondetail in transaction.transaction_details" :key="transactiondetail.id" class="text-subtitle2 q-my-md">
            <div class="">
              <div class="float-right transaction-title">{{ formattedRupiah(transactiondetail.product.price) }}</div>
              <div class="row">
                <div class="col-md-1 col-sm-2 col-xs-3 q-mx-xs">
                  <q-img :src="url + '/products/' + transactiondetail.product.photos[0].photo" :ratio="1 / 1" class="q-mx-sm transaction-image" />
                </div>
                <div class="col-5 q-mx-xs">
                  <div class="transaction-title" style="line-height: 1.2">
                    {{ transactiondetail.product.name }}
                  </div>
                  <div class="text-grey-10 transaction-title" style="line-height: 1.2">x {{ transactiondetail.quantity }}</div>
                  <div class="text-grey-7 transaction-subtitle">{{ transactiondetail.product.category.name }}</div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="large-screen transaction-title text-bold q-mb-sm float-right">
            Total Pesanan :
            <span class="text-primary" style="font-size: 18px">{{ formattedRupiah(transaction.total_price) }}</span>
          </div>
          <div class="small-screen transaction-title text-bold q-mb-sm">
            Total Pesanan :
            <span class="text-primary" style="font-size: 18px">{{ formattedRupiah(transaction.total_price) }}</span>
          </div>
          <div v-if="transaction.resi" class="transaction-title">Resi : {{ transaction.resi }}</div>
          <q-btn v-if="transaction.shipping_status == 0" :to="{ name: 'home.transaction', params: { invoice: transaction.invoice } }" color="primary" label="Bayar Sekarang" dense no-caps />
        </q-card-section>
      </q-card>
    </router-link>
  </q-page>
  <div v-else class="text-subtitle1 text-center text-grey-7 q-mt-md">Data tidak ditemukan.</div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { url } from '/src/boot/axios'
import { useTransactionStore } from '/src/stores/transaction-store'

const route = useRoute()
const loading = ref(true)

//  Transaction By User
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
  if (route.name == 'home.order') {
    transactionByUser()
  }
})

// Product Price
const formattedRupiah = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}
</script>
