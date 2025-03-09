<template>
  <q-page>
    <!-- Redirect to My Order -->
    <router-link :to="{ name: 'home.order' }" class="link text-primary transaction-title q-mb-xl">
      <q-icon name="arrow_back" size="20px" class="q-mx-sm" />
      Kembali ke halaman pesanan saya
    </router-link>

    <!-- Loading -->
    <div v-if="ongkirloading">
      <q-skeleton height="250px" class="q-my-md" />
      <q-skeleton height="400px" class="q-my-md" />
      <q-skeleton height="300px" class="q-my-md" />
    </div>

    <!-- Data -->
    <div v-else>
      <!-- Address -->
      <q-card class="my-card q-my-md">
        <q-card-section class="bg-grey-2 text-body1 text-bold text-primary">
          <q-icon name="pin_drop" size="20px" class="q-mx-sm" />
          Alamat Pengiriman
        </q-card-section>
        <q-card-section class="q-px-lg transaction-title">
          <div class="text-bold text-grey-7 transaction-title">Alamat Penerima</div>
          <div class="row">
            <div class="col-sm-4 col-xs-10 q-my-xs">
              <div class="text-bold">
                {{ profile.name }}
                <span v-if="profile.phone_number">({{ profile.phone_number }})</span>
              </div>
            </div>
            <div class="col-sm-7 col-xs-10 q-my-xs">
              <div v-if="profile.province && profile.regency">
                <span v-if="profile.address_one" class="q-mr-xs">{{ profile.address_one }}.</span>
                <span v-if="profile.address_two" class="q-mr-xs">({{ profile.address_two }})</span>
                <span v-if="profile.village" class="q-mr-xs">{{ profile.village }},</span>
                <span v-if="profile.district" class="q-mr-xs">{{ profile.district }},</span>
                <span v-if="profile.regency" class="q-mr-xs">{{ profile.regency }},</span>
                <span v-if="profile.province" class="q-mr-xs">{{ profile.province }},</span>
                <span v-if="profile.country" class="q-mr-xs">{{ profile.country }},</span>
                <span v-if="profile.zip_code" class="q-mr-xs">{{ profile.zip_code }}.</span>
              </div>
              <div v-else>
                <div class="text-grey-7 text-subtitle2">
                  Anda belum mempunyai alamat.
                  <router-link :to="{ name: 'home.setting' }" class="link text-primary">Silahkan membuat terlebih dahulu</router-link>
                </div>
              </div>
            </div>
            <div class="col-sm-1 col-xs-10 q-my-xs">
              <router-link v-if="transaction.shipping_status == 0" :to="{ name: 'home.setting' }" class="link text-primary">Ubah</router-link>
            </div>
          </div>
        </q-card-section>
        <q-card-section v-if="!loading" class="q-px-lg transaction-title">
          <div class="text-bold text-grey-7 transaction-title">Alamat Pengirim</div>
          <div class="row">
            <div class="col-sm-4 col-xs-10 q-my-xs">
              <div class="text-bold">
                {{ transaction.transaction_details[0].product.user.name }}
                <span v-if="transaction.transaction_details[0].product.user.phone_number">({{ transaction.transaction_details[0].product.user.phone_number }})</span>
              </div>
            </div>
            <div class="col-sm-7 col-xs-10 q-my-xs">
              <div v-if="transaction.transaction_details[0].product.user.address_one">
                <span v-if="transaction.transaction_details[0].product.user.address_one" class="q-mr-xs">{{ transaction.transaction_details[0].product.user.address_one }}.</span>
                <span v-if="transaction.transaction_details[0].product.user.address_two" class="q-mr-xs">({{ transaction.transaction_details[0].product.user.address_two }})</span>
                <span v-if="transaction.transaction_details[0].product.user.village" class="q-mr-xs">{{ transaction.transaction_details[0].product.user.village }},</span>
                <span v-if="transaction.transaction_details[0].product.user.district" class="q-mr-xs">{{ transaction.transaction_details[0].product.user.district }},</span>
                <span v-if="transaction.transaction_details[0].product.user.regency" class="q-mr-xs">{{ transaction.transaction_details[0].product.user.regency }},</span>
                <span v-if="transaction.transaction_details[0].product.user.province" class="q-mr-xs">{{ transaction.transaction_details[0].product.user.province }},</span>
                <span v-if="transaction.transaction_details[0].product.user.country" class="q-mr-xs">{{ transaction.transaction_details[0].product.user.country }},</span>
                <span v-if="transaction.transaction_details[0].product.user.zip_code" class="q-mr-xs">{{ transaction.transaction_details[0].product.user.zip_code }}.</span>
              </div>
              <div v-else>
                <div class="text-grey-7 text-subtitle2">Alamat tidak tersedia.</div>
              </div>
            </div>
            <div class="col-sm-1 col-xs-10 q-my-xs"></div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Product -->
      <q-card class="my-card q-my-md">
        <q-card-section class="bg-grey-2 text-body1 text-bold text-primary">
          <q-icon name="shopping_cart_checkout" size="20px" class="q-mx-sm" />
          Pesanan
        </q-card-section>
        <q-card-section class="q-pa-lg">
          <div class="row text-grey-7 text-bold">
            <div class="col-sm-7 col-xs-4 transaction-title">Produk</div>
            <div class="col-sm-2 col-xs-3 text-center transaction-title">Harga Satuan</div>
            <div class="col-sm-1 col-xs-2 text-center transaction-title">Jumlah</div>
            <div class="col-sm-2 col-xs-3 text-center transaction-title">Total</div>
          </div>
          <div v-for="transactiondetail in transaction.transaction_details" :key="transactiondetail.id" class="row text-subtitle2 q-my-md">
            <div class="col-sm-7 col-xs-4">
              <div class="flex">
                <q-img :src="url + '/products/' + transactiondetail.product.photos[0].photo" :ratio="1 / 1" class="q-mx-sm" style="width: 30px" />
                <span class="transaction-subtitle">
                  {{ transactiondetail.product.name }}
                </span>
              </div>
            </div>
            <div class="col-sm-2 col-xs-3 flex flex-center transaction-subtitle">{{ formattedRupiah(transactiondetail.product.price) }}</div>
            <div class="col-sm-1 col-xs-2 flex flex-center transaction-subtitle">x {{ transactiondetail.quantity }}</div>
            <div class="col-sm-2 col-xs-3 flex flex-center transaction-subtitle">{{ formattedRupiah(transactiondetail.product.price * transactiondetail.quantity) }}</div>
          </div>
          <q-separator class="q-my-md" />
          <div class="row justify-between">
            <div v-if="transaction.shipping_status == 0 && transaction.shipping_status == 4" class="col-sm-5 col-xs-10">
              <div class="text-bold text-grey-7 q-mb-sm q-mt-md transaction-title">Pesan</div>
              <q-input v-model="data.note" label="Tinggalkan pesan (Opsional)" outlined dense />
            </div>
            <div v-else class="col-sm-5 col-xs-10">
              <div class="text-bold text-grey-7 q-mb-sm q-mt-md transaction-title">Pesan</div>
              <div class="transaction-subtitle">{{ transaction.note }}</div>
            </div>
            <div v-if="transaction.shipping_status == 0 || transaction.shipping_status == 4" class="col-sm-6 col-xs-10">
              <div v-if="ongkirSelected && profile.province && profile.regency" class="row">
                <div class="col-5">
                  <div class="text-bold text-grey-7 q-mb-sm q-mt-md transaction-title">Opsi Pengiriman</div>
                  <div class="text-bold transaction-title">{{ ongkirSelected.courier }} {{ ongkirSelected.service }}</div>
                  <div class="text-subtitle2 text-grey-8 transaction-subtitle">
                    <div>{{ ongkirSelected.description }}</div>
                    <div>
                      Estimasi : {{ ongkirSelected.etd }}
                      <span v-if="ongkirSelected.courier == 'JNE'">Hari</span>
                    </div>
                    <div>Harga : {{ formattedRupiah(ongkirSelected.price) }}</div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="q-mb-sm q-mt-md transaction-title">‎</div>
                  <div class="text-subtitle2 text-bold transaction-title">{{ formattedRupiah(ongkirSelected.price) }}</div>
                </div>
                <div v-if="transaction.shipping_status == 0" class="col-3">
                  <div class="q-mb-sm q-mt-md transaction-title">‎</div>
                  <div class="link text-subtitle2 text-primary cursor-pointer transaction-title" @click="ongkirListDialog = true">Ubah</div>
                </div>
              </div>
              <div v-else class="transaction-subtitle text-grey-7">
                <div class="text-bold text-grey-7 q-mb-sm q-mt-md transaction-title">Opsi Pengiriman</div>
                Anda belum mempunyai alamat.
                <router-link :to="{ name: 'home.setting' }" class="link text-primary">Silahkan membuat terlebih dahulu</router-link>
              </div>
            </div>
            <div v-if="transaction.shipping_status != 0 && transaction.shipping_status != 4" class="col-sm-6 col-xs-10">
              <div v-if="ongkirSelected" class="row">
                <div class="col-5">
                  <div class="text-bold text-grey-7 q-mb-sm q-mt-md transaction-title">Opsi Pengiriman</div>
                  <div class="text-bold transaction-title">{{ transaction.courier }}</div>
                  <div class="text-subtitle2 text-grey-8 transaction-subtitle">
                    <div>{{ transaction.shipping_description }}</div>
                    <div>
                      Estimasi : {{ transaction.shipping_estimation }}
                      <span v-if="transaction.courier == 'JNE'">Hari</span>
                    </div>
                    <div>Harga : {{ formattedRupiah(transaction.shipping_price) }}</div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="q-mb-sm q-mt-md transaction-title">‎</div>
                  <div class="text-subtitle2 text-bold transaction-title">{{ formattedRupiah(transaction.shipping_price) }}</div>
                </div>
                <div class="col-3"></div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Payment -->
      <q-card class="my-card q-my-md">
        <q-card-section class="bg-grey-2 text-body1 text-bold text-primary">
          <q-icon name="payments" size="20px" class="q-mx-sm" />
          Pembayaran
          <q-badge v-if="transaction.shipping_status == 0" color="grey" class="float-right">Belum Dibayar</q-badge>
          <q-badge v-if="transaction.shipping_status == 1" color="warning" class="float-right">Sedang Dikemas</q-badge>
          <q-badge v-if="transaction.shipping_status == 2" color="green" class="float-right">Sedang Dikirim</q-badge>
          <q-badge v-if="transaction.shipping_status == 3" color="blue" class="float-right">Selesai</q-badge>
          <q-badge v-if="transaction.shipping_status == 4" color="red" class="float-right">Dibatalkan</q-badge>
        </q-card-section>
        <q-card-section class="q-pa-lg">
          <div class="row">
            <div class="col-md-6 col-sm-2 col-xs-2"></div>

            <div class="col-md-4 col-sm-6 col-xs-8 transaction-title q-ml-auto">
              <!-- Product Price -->
              <div class="row">
                <div class="col-7">Subtotal Produk</div>
                <div class="col-5">
                  {{ formattedRupiah(data.product_price) }}
                </div>
              </div>

              <!-- Shipping Price -->
              <div class="row">
                <div class="col-7">Ongkos Kirim</div>
                <div class="col-5">
                  {{ formattedRupiah(data.shipping_price) }}
                </div>
              </div>

              <!-- Total Price -->
              <div class="row q-my-sm">
                <div class="col-7">Total Pembayaran</div>
                <div class="col-5 text-bold text-primary transaction-total">
                  {{ formattedRupiah(totalPrice) }}
                </div>
              </div>
            </div>

            <!-- Action -->
            <div v-if="transaction.shipping_status == 0" class="large-screen col-12 flex justify-end q-mt-xl">
              <q-btn color="red" label="Batalkan Pesanan" :loading="cancelloading" :disable="cancelloading" @click="cancelOrder" class="q-ma-xs" flat no-caps>
                <template v-slot:loading>
                  <q-spinner-gears />
                </template>
              </q-btn>
              <q-btn color="primary" label="Bayar Nanti" :loading="paylaterloading" :disable="paylaterloading" @click="payLater" class="q-ma-xs" flat no-caps>
                <template v-slot:loading>
                  <q-spinner-gears />
                </template>
              </q-btn>
              <q-btn color="primary" label="Bayar Sekarang" :loading="paynowloading" :disable="!ongkirSelected" @click="payNow" class="q-ma-xs" no-caps>
                <template v-slot:loading>
                  <q-spinner-gears />
                </template>
              </q-btn>
            </div>
            <div v-if="transaction.shipping_status == 0" class="small-screen col-12 flex justify-end q-mt-xl">
              <q-btn color="red" size="sm" label="Batalkan Pesanan" :loading="cancelloading" :disable="cancelloading" @click="cancelOrder" class="q-ma-xs" flat no-caps>
                <template v-slot:loading>
                  <q-spinner-gears />
                </template>
              </q-btn>
              <q-btn color="primary" size="sm" label="Bayar Nanti" :loading="paylaterloading" :disable="paylaterloading" @click="payLater" class="q-ma-xs" flat no-caps>
                <template v-slot:loading>
                  <q-spinner-gears />
                </template>
              </q-btn>
              <q-btn color="primary" size="md" label="Bayar Sekarang" :loading="paynowloading" :disable="!ongkirSelected" @click="payNow" class="q-ma-xs" no-caps>
                <template v-slot:loading>
                  <q-spinner-gears />
                </template>
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Ongkir List -->
    <q-dialog v-model="ongkirListDialog">
      <q-card>
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">Pilih Opsi Pengiriman</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="height: 77vh">
          <q-item tag="label" v-for="ongkir in ongkirList" :key="ongkir.id" class="q-my-sm" clickable v-ripple>
            <q-radio v-model="ongkirSelected" :val="ongkir" />
            <q-item-section class="q-px-md">
              <div class="text-bold transaction-title">{{ ongkir.courier }} {{ ongkir.service }}</div>
              <div class="text-subtitle2 text-grey-8 transaction-subtitle">{{ ongkir.description }}</div>
              <div class="text-subtitle2 text-grey-8 transaction-subtitle">
                Estimasi : {{ ongkir.etd }}
                <span v-if="ongkir.courier == 'JNE'">Hari</span>
              </div>
              <div class="text-subtitle2 text-grey-8 transaction-subtitle">Harga : {{ formattedRupiah(ongkir.price) }}</div>
            </q-item-section>
            <div class="text-subtitle2 text-bold float-right q-px-md transaction-title">{{ formattedRupiah(ongkir.price) }}</div>
          </q-item>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="text-primary">
          <q-btn label="Batal" color="primary" flat v-close-popup />
          <q-btn label="Pilih" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, watchEffect, computed, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { url } from '/src/boot/axios'
import { useUserStore } from '/src/stores/user-store'
import { useTransactionStore } from '/src/stores/transaction-store'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const loading = ref(true)
const ongkirloading = ref(true)

// Profile
const profile = ref({})
const getProfile = async () => {
  ongkirloading.value = true
  try {
    const res = await useUserStore().profile()

    profile.value = res.data.data
    ongkirdata.value.origin = res.data.data.regency_id
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Show Transaction
const transaction = ref([])
const showTransaction = async (invoice) => {
  loading.value = true
  try {
    const res = await useTransactionStore().show(invoice)

    transaction.value = res.data.data
    ongkirdata.value.destination = res.data.data.transaction_details[0].product.user.regency_id
    data.value.product_price = res.data.data.product_price
    data.value.id = res.data.data.id
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  loading.value = false
}
watchEffect(async () => {
  if (route.params.invoice) {
    await getProfile()
    await showTransaction(route.params.invoice)
    ongkirCheck()

    if (profile.value.id != transaction.value.user_id) {
      router.push('/notfound')
    }
  }
})

// Ongkir
const ongkirList = ref([])
const ongkirSelected = ref(null)
const ongkirListDialog = ref(false)
const ongkirdata = ref({
  origin: null,
  destination: null,
  weight: 0
})
const totalWeight = computed(() => {
  return transaction.value.transaction_details.reduce((acc, detail) => {
    return acc + detail.product.weight * detail.quantity
  }, 0)
})
const ongkirCheck = async () => {
  ongkirloading.value = true
  try {
    ongkirdata.value.weight = totalWeight.value

    if (profile.value.province && profile.value.regency) {
      const res = await useTransactionStore().ongkir(ongkirdata.value)

      ongkirList.value = res.data
      ongkirSelected.value = res.data[0]
      data.value.courier = res.data[0].courier + ' ' + res.data[0].service
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    $q.notify({
      message: error.response.data.message || 'Terjadi kesalahan, Silahkan coba lagi nanti',
      icon: 'warning',
      color: 'negative'
    })
  }
  ongkirloading.value = false
}
watch(
  () => ongkirSelected.value,
  (newVal) => {
    if (newVal) {
      data.value.courier = newVal.courier + ' ' + newVal.service
      data.value.shipping_estimation = newVal.etd
      data.value.shipping_description = newVal.description
      data.value.shipping_price = newVal.price
      data.value.total_price = parseInt(data.value.product_price) + parseInt(data.value.shipping_price)
    }
  }
)
const totalPrice = computed(() => {
  return parseInt(data.value.product_price) + data.value.shipping_price
})

// Edit Transaction
const paynowloading = ref(false)
const data = ref({
  id: null,
  product_price: null,
  shipping_price: null,
  total_price: null,
  courier: '',
  shipping_estimation: '',
  shipping_description: '',
  note: ''
})
// Pay Now
const payNow = async () => {
  paynowloading.value = true

  try {
    const res = await useTransactionStore().edit(data.value)

    // Midtrans
    const snapToken = res.data.data.snap_token
    window.snap.pay(snapToken, {
      onSuccess: function (result) {
        const successdata = ref({
          id: data.value.id,
          shipping_status: 1
        })

        useTransactionStore().updateshipping(successdata.value)

        $q.notify({
          message: 'Pembayaran berhasil',
          color: 'positive'
        })
        router.push({ name: 'home.order.packaged' })
      },
      onPending: function (result) {
        $q.notify({
          message: 'Menunggu pembayaran',
          color: 'warning'
        })
      },
      onError: function (result) {
        $q.notify({
          message: 'Pembayaran gagal',
          color: 'negative'
        })
      },
      onClose: function () {
        $q.notify({
          message: 'Pembayaran ditutup',
          color: 'info'
        })
      }
    })
  } catch (error) {
    console.error('Error submitting form:', error)
    $q.notify({
      message: error.response.data.message || 'Terjadi kesalahan, Silahkan coba lagi nanti',
      icon: 'warning',
      color: 'negative'
    })
  }

  paynowloading.value = false
}
// Pay Later
const paylaterloading = ref(false)
const payLater = async () => {
  paylaterloading.value = true

  try {
    await useTransactionStore().edit(data.value)

    router.push({ name: 'home.order.notyetpaid' })
  } catch (error) {
    console.error('Error submitting form:', error)
    $q.notify({
      message: error.response.data.message || 'Terjadi kesalahan, Silahkan coba lagi nanti',
      icon: 'warning',
      color: 'negative'
    })
  }

  paylaterloading.value = false
}
// Cancel
const cancelloading = ref(false)
const cancelOrder = async () => {
  $q.dialog({
    title: 'WARNING!!!',
    message: 'Apakah anda yakin ingin membatalkan pesanan ini?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    cancelloading.value = true

    try {
      const canceldata = ref({
        id: data.value.id,
        shipping_status: 4
      })

      await useTransactionStore().updateshipping(canceldata.value)

      $q.notify({
        message: 'Berhasil membatalkan pesanan',
        icon: 'check',
        color: 'positive'
      })
      router.push({ name: 'home.order.canceled' })
    } catch (error) {
      console.error('Error submitting form:', error)
      $q.notify({
        message: error.response.data.message || 'Terjadi kesalahan, Silahkan coba lagi nanti',
        icon: 'warning',
        color: 'negative'
      })
    }

    cancelloading.value = false
  })
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
