<template>
  <q-page>
    <!-- Banner -->
    <PromotionsView :promotions="promotions" :loading="loading" />

    <!-- Categories -->
    <div class="text-h5 text-bold">Kategori</div>
    <div v-if="loading" class="q-mb-md">
      <div class="row justify-between">
        <div v-for="n in 5" :key="n" class="large-screen col-sm-3 col-md-2 q-ma-sm">
          <q-skeleton width="100%" height="227px" />
        </div>
        <div v-for="n in 10" :key="n" class="small-screen col-2 q-ma-xs">
          <q-skeleton type="circle" />
        </div>
      </div>
    </div>
    <div v-if="!loading" class="large-screen row justify-between q-mb-md">
      <q-btn icon="arrow_back" class="col-1" @click="scrollLeft('largeScreenRow')" flat />
      <div class="col-10">
        <div class="row no-wrap justify-between" style="max-width: max-content; overflow: hidden" ref="largeScreenRow">
          <div v-for="category in categories" :key="category.id" class="col-sm-3 col-md-2 q-ma-sm">
            <router-link :to="{ name: 'home.category.show', params: { slug: category.slug } }" class="link component-categories q-py-xl q-px-lg">
              <div class="flex flex-center">
                <q-icon :name="category.icon" color="primary" size="50px" class="bg-grey-4 q-pa-md" style="border-radius: 50%" />
              </div>
              <p class="categories-text">{{ category.name }}</p>
            </router-link>
          </div>
        </div>
      </div>
      <q-btn icon="arrow_forward" class="col-1" @click="scrollRight('largeScreenRow')" flat />
    </div>
    <div v-if="!loading" class="small-screen row justify-between q-mb-md">
      <q-btn icon="arrow_back" class="col-1" @click="scrollLeft('smallScreenRow')" flat />
      <div class="col-9">
        <div class="row no-wrap justify-between" style="max-width: max-content; overflow: hidden" ref="smallScreenRow">
          <div v-for="category in categories" :key="category.id" class="col-2 q-ma-xs">
            <router-link :to="{ name: 'home.category.show', params: { slug: category.slug } }" class="products-link">
              <div class="flex flex-center">
                <q-icon :name="category.icon" color="primary" size="15px" class="bg-grey-4 q-pa-md" style="border-radius: 50%" />
              </div>
              <p class="categories-text text-center text-dark">{{ category.name }}</p>
            </router-link>
          </div>
        </div>
      </div>
      <q-btn icon="arrow_forward" class="col-1" @click="scrollRight('smallScreenRow')" flat />
    </div>

    <!-- Products -->
    <div class="text-h5 text-bold">Produk terbaru</div>
    <ProductsView :products="products" :loading="loading" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePromotionStore } from '/src/stores/promotion-store'
import { useCategoryStore } from '/src/stores/category-store'
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

// Categories Scroll
const largeScreenRow = ref(null)
const smallScreenRow = ref(null)

const scrollLeft = (refName) => {
  if (refName === 'largeScreenRow') {
    largeScreenRow.value.scrollBy({ left: -300, behavior: 'smooth' })
  } else if (refName === 'smallScreenRow') {
    smallScreenRow.value.scrollBy({ left: -200, behavior: 'smooth' })
  }
}

const scrollRight = (refName) => {
  if (refName === 'largeScreenRow') {
    largeScreenRow.value.scrollBy({ left: 300, behavior: 'smooth' })
  } else if (refName === 'smallScreenRow') {
    smallScreenRow.value.scrollBy({ left: 200, behavior: 'smooth' })
  }
}
</script>
