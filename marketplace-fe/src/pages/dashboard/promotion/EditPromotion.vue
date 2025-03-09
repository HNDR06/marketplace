<template>
  <div>
    <q-form @submit="editData">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">Edit Promosi</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="max-height: 77vh">
          <div class="row justify-center">
            <!-- Banner -->
            <div class="col-10 q-ma-sm">
              <div class="text-bold">Ganti Spanduk :</div>
              <q-uploader v-model="data.banner" label="Ganti Spanduk" style="width: 100%; height: 200px" @added="bannerAdded" :rules="rules.banner" />
            </div>

            <!-- URL -->
            <div class="col-10 q-ma-sm">
              <div class="text-bold">URL :</div>
              <q-input type="url" v-model="data.url" label="URL" class="q-my-xs" :rules="rules.url" dense outlined required autofocus />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="text-primary">
          <q-btn label="Batal" color="primary" flat v-close-popup />
          <q-btn type="submit" label="Edit" color="primary" :loading="loading" :disable="disabledButton">
            <template v-slot:loading>
              <q-spinner-hourglass class="on-center" />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useQuasar } from 'quasar'
import { usePromotionStore } from '/src/stores/promotion-store'

const $q = useQuasar()
const { item } = defineProps(['item'])
const emits = defineEmits(['edited'])
const data = ref({
  id: item.id,
  banner: item.banner,
  url: item.url
})

// Banner
const banner = ref({})
watch(banner, (newbanner) => {
  data.value.banner = newbanner
})
const bannerAdded = (files) => {
  data.value.banner = files[0]
}

// Validate
const rules = ref({
  banner: [(v) => !!v || 'Spanduk harus diisi'],
  url: [(v) => !!v || 'URL harus diisi']
})

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => {
  return loading.value || !data.value.url || !data.value.banner
})

// Edit
const editData = async () => {
  loading.value = true

  try {
    await usePromotionStore().edit(data.value)

    $q.notify({
      message: 'Promosi berhasil diedit',
      icon: 'check',
      color: 'positive'
    })
    emits('edited')
  } catch (error) {
    console.error('Error submitting form:', error)
    $q.notify({
      message: error.response.data.message || 'Promosi gagal diedit, Silahkan coba lagi nanti',
      icon: 'warning',
      color: 'negative'
    })
  }

  loading.value = false
}
</script>
