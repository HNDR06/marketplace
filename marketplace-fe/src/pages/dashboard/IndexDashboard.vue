<template>
  <q-page v-if="loading" class="q-pa-sm q-pb-lg">
    <div class="row q-col-gutter-sm">
      <div v-for="n in 4" :key="n" class="col-md-3 col-sm-12 col-xs-12">
        <q-skeleton width="100%" height="75px" class="q-my-sm" />
      </div>
    </div>
    <q-skeleton width="100%" height="400px" class="q-my-sm" />
    <q-skeleton width="100%" height="500px" class="q-my-sm" />
  </q-page>
  <q-page v-else class="q-pa-sm q-mb-lg">
    <!-- Card -->
    <q-card class="bg-transparent no-shadow no-border q-mt-md" bordered>
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm">
          <div v-for="(card, index) in filteredCards" :key="index" class="col-md-3 col-sm-12 col-xs-12">
            <q-item :style="`background-color: ${card.color}`" class="q-pa-none">
              <q-item-section class="q-pa-md q-ml-none text-white">
                <q-item-label class="text-white text-h6 text-weight-bolder">{{ card.length }}</q-item-label>
                <q-item-label>{{ card.title }}</q-item-label>
              </q-item-section>
              <q-item-section class="q-mr-md text-white" side>
                <q-icon :name="card.icon" color="white" size="35px"></q-icon>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Chart -->
    <q-card class="q-mt-sm no-shadow" bordered>
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="primary" name="shopping_cart" size="44px" />
          </q-item-section>

          <q-item-section>
            <div class="text-h6">Statistik Penjualan Produk</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
            <q-item>
              <q-item-section top avatar>
                <q-avatar color="grey" text-color="white" icon="payment" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-h6 text-grey text-bold">{{ items.transactionNotyetpaids }}</q-item-label>
                <q-item-label caption>Belum Dibayar</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
            <q-item>
              <q-item-section top avatar>
                <q-avatar color="warning" text-color="white" icon="payment" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-h6 text-warning text-bold">{{ items.transactionPackageds }}</q-item-label>
                <q-item-label caption>Sedang Dikemas</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
            <q-item>
              <q-item-section top avatar>
                <q-avatar color="green" text-color="white" icon="payment" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-h6 text-green text-bold">{{ items.transactionSents }}</q-item-label>
                <q-item-label caption>Sedang Dikirim</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
            <q-item>
              <q-item-section top avatar>
                <q-avatar color="blue" text-color="white" icon="payment" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-h6 text-blue text-bold">{{ items.transactionFinisheds }}</q-item-label>
                <q-item-label caption>Selesai</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
        <div>
          <ECharts :option="transactionchart" class="q-mt-md" :resizable="true" style="height: 250px" autoresize />
        </div>
      </q-card-section>
    </q-card>

    <!-- Transaction Table -->
    <q-card class="q-mt-sm no-shadow" bordered>
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="primary" name="payments" size="44px" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <div class="text-h6">Penjualan Terbaru</div>
            </q-item-label>
            <q-item-label caption class="text-black">Memantau produk Anda. Melacak penjualan, dan status pengiriman di sini.</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="q-pa-none q-ma-none">
        <q-table class="no-shadow no-border" :rows="transactiondata" :columns="transactioncolumn" v-model:pagination="pagination" :rows-per-page-options="[10, 20, 30]" virtual-scroll flat bordered>
          <!-- No Data -->
          <template v-slot:no-data>
            <div class="text-subtitle2 text-bold text-grey-7 text-center q-pa-md">
              <q-icon name="warning_amber" size="25px" class="q-mx-sm" />
              Tidak ada data yang tersedia.
            </div>
          </template>

          <!-- Invoice -->
          <template v-slot:body-cell-invoice="props">
            <q-td :props="props">
              <div class="bg-yellow-3 q-pa-xs q-my-sm" style="max-width: 250px; border-radius: 20px">
                <div class="text-yellow-10 text-center">{{ props.row.invoice }}</div>
              </div>
            </q-td>
          </template>

          <!-- Products -->
          <template v-slot:body-cell-products="props">
            <q-td :props="props">
              <div dense square>
                <div v-for="transaction_detail in props.row.transaction_details" :key="transaction_detail.id" class="q-my-sm">
                  <q-img :src="url + '/products/' + transaction_detail.product.photos[0].photo" :ratio="1 / 1" class="q-mx-sm" style="width: 30px" />
                  {{ transaction_detail.product.name }}
                  <span class="q-mx-sm text-bold text-grey-6">x {{ transaction_detail.quantity }}</span>
                </div>
              </div>
            </q-td>
          </template>

          <!-- Buyer -->
          <template v-slot:body-cell-buyer="props">
            <q-td :props="props">
              <q-item>
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="url + '/avatars/' + props.row.user.avatar" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-bold">{{ props.row.user.name }}</q-item-label>
                  <q-item-label>{{ props.row.user.username }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
          </template>

          <!-- Total Price -->
          <template v-slot:body-cell-total_price="props">
            <q-td :props="props">
              <div class="text-bold text-red">{{ formattedRupiah(props.row.total_price) }}</div>
            </q-td>
          </template>

          <!-- Shipping Status -->
          <template v-slot:body-cell-shipping_status="props">
            <q-td :props="props" class="text-left">
              <q-chip class="text-white text-capitalize" :label="getShippingStatusTitle(props.row.shipping_status)" :color="getShippingStatusColor(props.row.shipping_status)" />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ECharts from 'vue-echarts'
import * as echarts from 'echarts'
import { url } from '/src/boot/axios'
import { useUserStore } from 'src/stores/user-store'
import { useSettingStore } from '/src/stores/setting-store'

const route = useRoute()
const router = useRouter()
const loading = ref(true)

// Profile
const profile = ref([])
const getProfile = async () => {
  try {
    const res = await useUserStore().profile()

    profile.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getProfile()
})

// Get
const items = ref([])
const getItem = async () => {
  loading.value = true
  try {
    const res = await useSettingStore().cart()

    items.value = res.data
  } catch (error) {
    console.error('Error fetching data:', error)
    if (error.response.data.status === 'failed') {
      router.push('/notfound')
    }
  }
  loading.value = false
}
watchEffect(() => {
  if (route.name == 'dashboard.home') {
    getItem()
  }
})

// Card
const cards = ref([
  {
    title: 'Total Pengguna',
    icon: 'users',
    length: 0,
    color: '#546bfa'
  },
  {
    title: 'Total Kategori',
    icon: 'categories',
    length: 0,
    color: '#3a9688'
  },
  {
    title: 'Total Produk',
    icon: 'inventory_2',
    length: 0,
    color: '#7cb342'
  },
  {
    title: 'Total Transaksi',
    icon: 'payments',
    length: 0,
    color: '#f88c2b'
  }
])
const filteredCards = computed(() => {
  if (profile.value.role == 'Mitra') {
    return cards.value.filter((card) => card.title !== 'Total Pengguna')
  }
  return cards.value
})
watchEffect(() => {
  if (route.name == 'dashboard.home') {
    cards.value[0].length = items.value.userlength
    cards.value[1].length = items.value.categorylength
    cards.value[2].length = items.value.productlength
    cards.value[3].length = items.value.transactionlength
  }
})

// Chart
const transactionchart = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '2%',
    right: '2%',
    top: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        show: false
      }
    }
  ],
  series: [
    {
      name: 'Pendapatan',
      type: 'line',
      data: [],
      color: '#546bfa'
    }
  ]
}
watchEffect(() => {
  if (route.name == 'dashboard.home') {
    transactionchart.xAxis[0].data = items.value.months
    transactionchart.series[0].data = items.value.transactionMonthly
  }
})

// Transaction Table
const transactioncolumn = [
  {
    name: 'invoice',
    label: 'invoice',
    field: 'Invoice',
    sortable: true,
    align: 'left'
  },
  {
    name: 'products',
    field: 'products',
    label: 'Produk',
    sortable: true,
    align: 'left'
  },
  {
    name: 'buyer',
    field: 'buyer',
    label: 'Pembeli',
    sortable: true,
    align: 'left'
  },
  {
    name: 'total_price',
    field: 'total_price',
    label: 'Total Harga',
    sortable: true,
    align: 'right',
    classes: 'text-bold'
  },
  {
    name: 'shipping_status',
    field: 'shipping_status',
    label: 'Status',
    sortable: true,
    align: 'left',
    classes: 'text-bold'
  }
]
const transactiondata = ref([])
const pagination = ref({})
watchEffect(() => {
  if (route.name == 'dashboard.home') {
    transactiondata.value = items.value.transactionAll
  }
})

const getColor = (val) => {
  if (val > 70 && val <= 100) {
    return 'green'
  } else if (val > 50 && val <= 70) {
    return 'blue'
  }
  return 'red'
}

// Shipping Status
const getShippingStatusColor = (status) => {
  if (status == 0) {
    return 'grey'
  } else if (status == 1) {
    return 'warning'
  } else if (status == 2) {
    return 'green'
  } else if (status == 3) {
    return 'blue'
  } else {
    return 'red'
  }
}
const getShippingStatusTitle = (status) => {
  if (status == 0) {
    return 'Belum Dibayar'
  } else if (status == 1) {
    return 'Sedang Dikemas'
  } else if (status == 2) {
    return 'Sedang Dikirim'
  } else if (status == 3) {
    return 'Selesai'
  } else {
    return 'Dibatalkan'
  }
}

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
