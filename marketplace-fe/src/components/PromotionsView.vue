<template>
  <!-- Loading -->
  <div v-if="loading" class="q-my-md">
    <q-skeleton width="100%" height="400px" class="large-screen" />
    <q-skeleton width="100%" height="200px" class="small-screen" />
  </div>

  <!-- View -->
  <div v-else class="q-my-md">
    <q-carousel
      v-model="slide"
      :autoplay="autoplay"
      transition-prev="slide-right"
      transition-next="slide-left"
      class="carousel-banner"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      animated
      navigation
      infinite
      arrows
    >
      <q-carousel-slide v-for="promotion in promotions" :key="promotion.id" :name="promotion.id">
        <a :href="promotion.url" target="_blank" rel="noopener noreferrer">
          <q-img :src="url + '/promotions/' + promotion.banner" class="carousel-img" style="width: 100%; height: auto" />
        </a>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { url } from '/src/boot/axios'

const { promotions, loading } = defineProps(['promotions', 'loading'])
const slide = ref(1)
const autoplay = ref(true)
</script>
