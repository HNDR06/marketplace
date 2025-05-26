<template>
  <q-page class="q-my-lg">
    <div class="table-container">
      <table class="responsive-table">
        <!-- Header -->
        <th class="table-header">
          <div class="table-row-header">
            <td class="table-cell-checklist">
              <q-checkbox v-model="allSelected" @update:model-value="toggleAll" />
            </td>
            <td class="table-cell-header-product">Produk</td>
            <td class="table-cell">Harga Satuan</td>
            <td class="table-cell">Kuantitas</td>
            <td class="table-cell">Total Harga</td>
            <td class="table-cell">Aksi</td>
          </div>
        </th>

        <!-- Loading -->
        <tr v-if="loading" class="table-body">
          <q-skeleton height="180px" class="q-my-md" />
          <q-skeleton height="180px" class="q-my-md" />
          <q-skeleton height="180px" class="q-my-md" />
        </tr>

        <!-- Carts -->
        <tr v-else class="table-body">
          <div v-if="carts && carts.length > 0">
            <div class="table-row q-my-md" v-for="cart in carts" :key="cart.id">
              <td class="table-cell-checklist">
                <q-checkbox v-model="cart.cartselected" :value="cart.id" @update:model-value="updateProductSelected" />
              </td>
              <td class="table-cell-product">
                <div class="row justify-center">
                  <div class="col-10">
                    <router-link :to="{ name: 'home.showproduct', params: { slug: cart.product.slug } }" class="products-link">
                      <div class="component-products">
                        <q-img :src="url + '/products/' + cart.product.photos[0].photo" :ratio="16 / 9" class="products-image" />
                      </div>
                      <div class="products-title text-h6 q-mt-sm q-ml-sm">{{ cart.product.name }}</div>
                      <div class="products-price text-body2 q-ml-sm" style="color: #ff7158">{{ formattedRupiah(cart.product.price) }}</div>
                    </router-link>
                  </div>
                </div>
              </td>
              <td class="table-cell">{{ formattedRupiah(cart.product.price) }}</td>
              <td class="table-cell">
                <q-input type="number" v-model.number="cart.quantity" input-class="text-center" @input="handleManualInput(event, cart)" dense borderless />
              </td>
              <td class="table-cell text-primary text-bold">{{ formattedRupiah(cart.product.price * cart.quantity) }}</td>
              <td class="table-cell text-primary text-bold">
                <q-btn color="red" icon="delete" @click="deleteCart(cart.id)" />
              </td>
            </div>
          </div>
          <div v-else class="text-subtitle1 text-center text-grey-7 q-mt-md">Tidak ada produk di keranjang.</div>
        </tr>
      </table>
    </div>
    <q-separator class="q-my-lg" />
    <div class="text-h6 text-bold q-mt-md">Informasi Pembayaran</div>
    <div class="row q-my-sm">
      <div class="col-sm-5 col-xs-8 q-my-sm">
        <div class="text-body1 text-grey-7 text-bold">Produk yang dipilih</div>
        <div v-for="item in productSelected" :key="item.id" class="text-subtitle2">- {{ item.product.name }}</div>
      </div>
      <div class="col-sm-3 col-xs-8 q-my-sm">
        <div class="text-body1 text-grey-7 text-bold">Jumlah yang dibeli</div>
        <div v-for="item in productSelected" :key="item.id" class="text-subtitle2">x {{ item.quantity }}</div>
      </div>
      <div class="col-sm-2 col-xs-8 q-my-sm">
        <div class="text-body1 text-grey-7 text-bold">Total Harga</div>
        <div class="text-body1 text-red text-bold">{{ formattedRupiah(totalSelectedPrice) }}</div>
      </div>
      <div class="col-sm-2 col-xs-8 q-my-sm">
        <q-btn color="primary" label="Beli Sekarang" @click="createTransaction" :loading="transactionloading" :disable="transactionloading" no-caps>
          <template v-slot:loading>
            <q-spinner-gears />
          </template>
        </q-btn>
      </div>
    </div>
    <div v-if="carts.length < 3" style="margin-bottom: 280px" />
  </q-page>
</template>

<script setup>
import { ref, watchEffect, computed, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { url } from '/src/boot/axios'
import { useCartStore } from '/src/stores/cart-store'
import { useTransactionStore } from '/src/stores/transaction-store'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const loading = ref(true)

// Cart By User
const carts = ref([])
const cartByUser = async () => {
  try {
    const res = await useCartStore().getByUser()

    carts.value = res.data.data
    carts.value.forEach((cart) => {
      cart.cartselected = false
    })
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  loading.value = false
}
watchEffect(() => {
  if (route.name == 'home.cart') {
    cartByUser()
  }
})

// Checklist Product
const productSelected = ref([])
const allSelected = ref(false)
const toggleAll = (value) => {
  allSelected.value = value
  carts.value.forEach((cart) => {
    cart.cartselected = value
  })
  updateProductSelected()
}
const updateProductSelected = () => {
  productSelected.value = carts.value.filter((cart) => cart.cartselected)
  allSelected.value = carts.value.length > 0 && productSelected.value.length === carts.value.length
}
const totalSelectedPrice = computed(() => {
  return carts.value.filter((cart) => cart.cartselected).reduce((total, cart) => total + cart.product.price * cart.quantity, 0)
})

// Edit Quantity Cart
const handleManualInput = (event, cart) => {
  let input = parseInt(event.target.value)
  if (isNaN(input)) {
    input = 1
  } else if (input < 1) {
    input = 1
  } else if (input > parseInt(cart.product.stock)) {
    input = parseInt(cart.product.stock)
  }
  cart.quantity = input
}

const editQuantity = async (cart) => {
  try {
    await useCartStore().edit(cart)
  } catch (error) {
    console.error('Error submitting form:', error)
    $q.notify({
      message: 'Jumlah pesanan tidak boleh melebihi stok',
      icon: 'warning',
      color: 'negative'
    })
  }
  cartByUser()
}
watch(
  carts,
  (newCarts) => {
    newCarts.forEach((cart) => {
      watch(
        () => cart.quantity,
        (newQuantity) => {
          editQuantity(cart)
        }
      )
    })
  },
  { deep: true }
)

// Delete Cart
const deleteCart = (id) => {
  $q.dialog({
    title: 'WARNING!!!',
    message: 'Apakah anda yakin?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await useCartStore().delete(id)

      $q.notify({
        message: 'Berhasil menghapus produk dari keranjang',
        icon: 'check',
        color: 'positive'
      })
      cartByUser()
    } catch (error) {
      console.error('Error submitting form:', error)
      $q.notify({
        message: error.response.data.message || 'Gagal menghapus produk dari keranjang',
        icon: 'warning',
        color: 'negative'
      })
    }
  })
}

// Create Transaction
const data = ref({
  product_price: totalSelectedPrice,
  total_price: totalSelectedPrice,
  transactiondetail: []
})
const transactionloading = ref(false)
const createTransaction = async () => {
  transactionloading.value = true

  try {
    data.value.transactiondetail = productSelected.value.map((item) => ({
      product_id: item.product_id,
      price: item.product.price,
      quantity: item.quantity
    }))

    const res = await useTransactionStore().create(data.value)

    router.push({ name: 'home.transaction', params: { invoice: res.data.data.invoice } })
  } catch (error) {
    console.error('Error submitting form:', error)
    $q.notify({
      message: error.response.data.message ? 'Silahkan pilih produk yang akan dibeli' : 'Produk gagal dibuat, Silahkan coba lagi nanti',
      icon: 'warning',
      color: 'negative'
    })
  }

  transactionloading.value = false
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

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
}

.responsive-table {
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;
}

.table-header {
  font-weight: bold;
}

.table-row-header {
  display: flex;
  border-bottom: 1px solid #ddd;
}

.table-row {
  display: flex;
}

.table-cell {
  flex: 0;
  padding: 8px;
  min-width: 120px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.table-cell-header-product {
  flex: 1;
  padding: 8px 80px;
  min-width: 200px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.table-cell-product {
  flex: 1;
  padding: 8px;
  min-width: 200px;
  box-sizing: border-box;
}
.table-cell-checklist {
  padding: 8px;
  min-width: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
