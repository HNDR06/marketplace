<template>
  <!-- Loading -->
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

  <!-- View -->
  <div v-if="!loading" class="large-screen q-mb-md">
    <div class="row justify-between">
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
  <div v-if="!loading" class="small-screen q-mb-md">
    <div class="row justify-between">
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
</template>

<script setup>
const { categories, loading } = defineProps(['categories', 'loading'])
</script>
