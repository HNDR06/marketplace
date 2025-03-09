<template>
  <!-- Loading -->
  <q-ajax-bar ref="searchBar" position="top" color="primary" size="8px" skip-hijack />
  <q-page>
    <!-- Banner -->
    <PromotionsView :promotions="promotions" :loading="loading" />

    <!-- Search -->
    <div class="search-container q-my-xl">
      <q-input type="text" v-model="search" label="Cari Produk..." class="search-all" @keyup.enter="searchData" dense borderless>
        <template v-slot:append>
          <q-icon name="search" class="search-icon" @click="searchData" />
        </template>
      </q-input>
    </div>

    <!-- Products -->
    <div class="text-h5 text-bold">Produk Terkait</div>
    <ProductsView :products="products" :loading="loading" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePromotionStore } from '/src/stores/promotion-store'
import { useProductStore } from '/src/stores/product-store'
import PromotionsView from '/src/components/PromotionsView.vue'
import ProductsView from '/src/components/ProductsView.vue'

const loading = ref(true)

// Get Promotion
const promotions = ref([])
const getPromotion = async () => {
  try {
    const res = await usePromotionStore().all()

    promotions.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  loading.value = false
}
onMounted(() => {
  getPromotion()
})

// Get Product
const products = ref([])
const getProduct = async () => {
  try {
    const res = await useProductStore().all()

    products.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  loading.value = false
}
onMounted(() => {
  getProduct()
})

// Search
const searchResults = ref([])
const search = ref('')
const searchBar = ref(null)
const searchloading = ref(false)
const searchData = async () => {
  searchloading.value = true
  try {
    searchResults.value = []
    const barRef = searchBar.value
    barRef.start()

    const res = await useProductStore().all()

    const productsData = res.data.data.filter((product) => {
      const nameMatches = product.name && product.name.toLowerCase().includes(search.value.toLowerCase())
      const descriptionMatches = product.description && product.description.toLowerCase().includes(search.value.toLowerCase())

      return nameMatches || descriptionMatches
    })

    products.value = [...productsData]

    barRef.stop()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  searchloading.value = false
}
</script>
