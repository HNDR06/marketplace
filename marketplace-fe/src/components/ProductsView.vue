<template>
  <div v-if="loading" class="q-mb-md">
    <div class="row justify-between">
      <div v-for="n in 6" :key="n" class="large-screen col-sm-4 col-md-3 q-ma-xs">
        <q-skeleton width="100%" height="150px" style="border-radius: 20px" />
      </div>
      <div v-for="n in 6" :key="n" class="small-screen col-sm-4 col-md-3 q-ma-xs">
        <q-skeleton width="120px" height="80px" style="border-radius: 20px" />
      </div>
    </div>
  </div>

  <div v-else class="q-mb-md">
    <div v-if="products && products.length > 0" class="row justify-between">
      <div v-for="product in products" :key="product.id" class="col-sm-4 col-md-3 q-ma-xs">
        <router-link :to="{ name: 'home.showproduct', params: { slug: product.slug } }" class="products-link">
          <div class="component-products">
            <q-img :src="url + '/products/' + product.photos[0].photo" :ratio="16 / 9" class="products-image" />
          </div>
          <div class="products-title text-dark text-h6 q-mt-sm q-ml-sm">{{ product.name }}</div>
          <div class="products-price text-body2 q-ml-sm" style="color: #ff7158">{{ formattedRupiah(product.price) }}</div>
        </router-link>
      </div>
    </div>
    <div v-else class="text-h6 text-bold text-grey-7 text-center q-my-xl">Tidak ada produk terkait.</div>
  </div>
</template>

<script setup>
import { url } from '/src/boot/axios'

const { products, loading } = defineProps(['products', 'loading'])

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
