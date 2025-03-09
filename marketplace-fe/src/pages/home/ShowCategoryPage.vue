<template>
  <!-- Loading -->
  <q-ajax-bar ref="searchBar" position="top" color="primary" size="8px" skip-hijack />

  <q-page v-if="loading">
    <!-- Title -->
    <div>
      <div class="text-h4 text-bold text-center">Semua Produk di Kategori</div>
    </div>

    <!-- Search -->
    <div class="search-container q-my-xl">
      <q-input type="text" v-model="search" label="Cari Produk..." class="search-all" @keyup.enter="searchData" dense borderless>
        <template v-slot:append>
          <q-icon name="search" class="search-icon" @click="searchData" />
        </template>
      </q-input>
    </div>

    <!-- Products -->
    <div class="q-my-md">
      <div class="text-h5">Produk Terkait</div>
      <div class="row justify-center">
        <div class="col-sm-4 col-md-3 q-ma-sm" v-for="n in 6" :key="n">
          <q-skeleton width="100%" height="150px" style="border-radius: 20px" />
        </div>
      </div>
    </div>
  </q-page>

  <!-- Page -->
  <q-page v-else>
    <!-- Title -->
    <div>
      <div class="text-h4 text-bold text-center">Semua Produk di Kategori {{ category.name }}</div>
    </div>

    <!-- Search -->
    <div class="search-container q-my-xl">
      <q-input type="text" v-model="search" label="Cari Produk..." class="search-all" @keyup.enter="searchData" dense borderless>
        <template v-slot:append>
          <q-icon name="search" class="search-icon" @click="searchData" />
        </template>
      </q-input>
    </div>

    <!-- Products -->
    <div class="text-h5">Produk Terkait</div>
    <ProductsView :products="category.products" :loading="loading" />
  </q-page>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '/src/stores/category-store'
import ProductsView from '/src/components/ProductsView.vue'

const route = useRoute()
const loading = ref(true)

// Show Category
const category = ref([])
const showCategory = async (slug) => {
  loading.value = true
  try {
    const res = await useCategoryStore().show(slug)

    category.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  loading.value = false
}
watchEffect(() => {
  if (route.name == 'home.category.show') {
    showCategory(route.params.slug)
  }
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

    const res = await useCategoryStore().show(route.params.slug)

    const productsData = res.data.data.products.filter((product) => {
      const nameMatches = product.name && product.name.toLowerCase().includes(search.value.toLowerCase())
      const descriptionMatches = product.description && product.description.toLowerCase().includes(search.value.toLowerCase())

      return nameMatches || descriptionMatches
    })

    category.value.products = [...productsData]

    barRef.stop()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  searchloading.value = false
}
</script>
