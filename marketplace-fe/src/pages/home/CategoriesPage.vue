<template>
  <q-page>
    <!-- Categories -->
    <div class="text-h5 text-bold">Semua Kategori</div>
    <CategoriesView :categories="categories" :loading="loading" />

    <!-- Products -->
    <div class="text-h5 text-bold">Rekomendasi untuk Anda</div>
    <ProductsView :products="products" :loading="loading" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCategoryStore } from '/src/stores/category-store'
import { useProductStore } from '/src/stores/product-store'
import CategoriesView from '/src/components/CategoriesView.vue'
import ProductsView from '/src/components/ProductsView.vue'

const loading = ref(true)

// Get Category
const categories = ref([])
const getCategory = async () => {
  try {
    const res = await useCategoryStore().all()

    categories.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  loading.value = false
}
onMounted(() => {
  getCategory()
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
</script>
