<template>
  <!-- Loading -->
  <q-page v-if="loading" class="q-py-lg">
    <div class="row justify-between">
      <div class="col-md-8 col-xs-12 q-mx-sm">
        <!-- Photos -->
        <q-skeleton width="100%" height="400px" />
        <div class="q-my-sm">
          <!-- Name -->
          <q-skeleton width="70%" height="50px" class="q-my-xs" />

          <!-- Price -->
          <q-skeleton width="30%" class="q-my-xs" />

          <!-- Description -->
          <q-skeleton width="100%" height="500px" class="q-my-lg" />
        </div>
      </div>
      <div class="col-md-3 col-xs-12 q-mx-sm q-my-xl">
        <q-skeleton width="270px" height="300px" class="q-my-lg" />
      </div>
    </div>
  </q-page>

  <!-- Product Detail -->
  <q-page v-else class="q-py-lg">
    <div class="row justify-between">
      <div class="col-md-8 col-xs-12 q-mx-sm">
        <!-- Photos -->
        <q-carousel v-model="slide" v-model:fullscreen="fullscreen" class="carousel-products" infinite navigation swipeable animated arrows>
          <q-carousel-slide v-for="photo in product.photos" :key="photo.id" :name="photo.id" :img-src="url + '/products/' + photo.photo" img-class="carousel-photo" />
          <template v-slot:control>
            <q-carousel-control position="bottom-right" :offset="[18, 18]">
              <q-btn color="primary" text-color="white" :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'" class="large-screen" @click="fullscreen = !fullscreen" round dense />
              <q-btn color="primary" size="sm" text-color="white" :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'" class="small-screen" @click="fullscreen = !fullscreen" round dense />
            </q-carousel-control>
          </template>
        </q-carousel>
        <div class="q-my-sm">
          <!-- Name -->
          <div class="text-h4 text-bold" style="letter-spacing: 0.01px">{{ product.name }}</div>

          <!-- Price -->
          <div class="text-h6 text-bold q-mb-md" style="color: #ff7158">{{ formattedRupiah(product.price) }}</div>

          <!-- Description -->
          <div class="text-subtitle1 text-grey-8 text-justify" v-html="formattedTextarea(product.description)"></div>
        </div>
      </div>
      <q-card class="col-md-3 col-xs-12 q-mx-sm q-my-xl q-pa-lg" style="max-width: 270px; max-height: 300px" flat bordered>
        <div class="text-body1 text-bold">Atur Jumlah Pesanan</div>
        <div class="text-subtitle2 q-mb-md">Stok : {{ product.stock }}</div>
        <div class="row items-center justify-between q-my-sm">
          <div class="col-md-2 col-sm-1 col-xs-2 q-mx-sm">
            <q-icon name="shopping_cart" size="32px" />
          </div>
          <div class="col-md-2 col-xs-2">
            <q-btn color="primary" icon="remove" @click="decreaseQuantity" dense flat />
          </div>
          <div class="col-md-2 col-xs-2">
            <input type="number" v-model.number="data.quantity" :max="product.stock" class="no-arrows" @input="handleManualInput" style="width: 32px" />
          </div>
          <div class="col-md-2 col-xs-2">
            <q-btn color="primary" icon="add" @click="increaseQuantity" dense flat />
          </div>
        </div>
        <q-btn v-if="token" color="primary" label="Tambahkan ke keranjang" class="q-my-md" @click="createCart" :loading="cartloading" :disable="cartloading" no-caps>
          <template v-slot:loading>
            <q-spinner-gears />
          </template>
        </q-btn>
        <div v-else class="q-my-lg">
          Kamu harus
          <router-link :to="{ name: 'login' }" class="link text-primary">Masuk</router-link>
          terlebih dulu untuk dapat membuat pesanan!
        </div>
        <div class="text-body1 float-right text-bold">{{ formattedRupiah(subtotal) }}</div>
        <div class="text-body1">Subtotal</div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import { url, token } from '/src/boot/axios'
import { useProductStore } from '/src/stores/product-store'
import { useCartStore } from '/src/stores/cart-store'

const $q = useQuasar()
const route = useRoute()
const loading = ref(true)
const slide = ref(null)
const fullscreen = ref(false)

// Show Product
const product = ref({})
const showProduct = async (slug) => {
  loading.value = true
  try {
    const res = await useProductStore().show(slug)

    product.value = res.data.data
    data.value.product_id = res.data.data.id
    if (product.value.photos && product.value.photos.length) {
      slide.value = product.value.photos[0].id
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  loading.value = false
}
watchEffect(() => {
  if (route.name == 'home.showproduct') {
    showProduct(route.params.slug)
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

// Product Description
const formattedTextarea = (textarea) => {
  if (!textarea) return ''
  return textarea.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')
}

// Product Subtotal
const subtotal = computed(() => {
  return product.value.price * data.value.quantity
})

// Product Cart
const data = ref({
  product_id: null,
  quantity: 1
})
const cartloading = ref(false)
const increaseQuantity = () => {
  if (data.value.quantity < product.value.stock) {
    data.value.quantity++
  } else {
    $q.notify({
      message: 'Jumlah pesanan tidak boleh melebihi stok',
      icon: 'warning',
      color: 'negative'
    })
  }
}
const handleManualInput = (event) => {
  let input = parseInt(event.target.value)
  if (isNaN(input)) {
    input = 1
  } else if (input < 1) {
    input = 1
  } else if (input > product.value.stock) {
    input = product.value.stock
    $q.notify({
      message: 'Jumlah pesanan tidak boleh melebihi stok',
      icon: 'warning',
      color: 'negative'
    })
  }
  data.value.quantity = input
}
const decreaseQuantity = () => {
  if (data.value.quantity > 1) {
    data.value.quantity--
  }
}
watchEffect(() => {
  if (data.value.quantity < 1) {
    data.value.quantity = 1
  }
})
const createCart = async () => {
  cartloading.value = true

  try {
    await useCartStore().create(data.value)

    $q.notify({
      message: 'Berhasil memasukkan produk ke keranjang',
      icon: 'check',
      color: 'positive'
    })
  } catch (error) {
    console.error('Error submitting form:', error)
    $q.notify({
      message: error.response.data.message || 'Gagal memasukkan produk ke keranjang',
      icon: 'warning',
      color: 'negative'
    })
  }

  cartloading.value = false
}
</script>
