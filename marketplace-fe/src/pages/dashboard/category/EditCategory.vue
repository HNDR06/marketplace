<template>
  <div>
    <q-form @submit="editData">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">Edit Kategori</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="max-height: 77vh">
          <div class="row justify-center">
            <!-- Name -->
            <div class="col-10 q-ma-sm">
              <div class="text-bold">Nama :</div>
              <q-input v-model="data.name" label="Nama" class="q-my-xs" :rules="rules.name" dense outlined required autofocus />
            </div>

            <!-- Icon -->
            <div class="col-10 q-ma-sm">
              <div class="text-bold">Ikon :</div>
              <div class="row">
                <div class="col-3">
                  <q-icon :name="data.icon" size="30px" class="bg-grey-4 q-pa-md q-ma-sm" style="border-radius: 50%" />
                </div>
                <div class="col-9 self-center">
                  <q-input v-model="data.icon" label="Ikon" class="q-my-xs" :rules="rules.icon" dense outlined required />
                </div>
              </div>
              <div class="text-grey-6">
                CATATAN : Kamu dapat mencari ikon di
                <a href="https://fonts.google.com/icons?icon.set=Material+Icons" target="_blank" rel="noopener noreferrer" class="link text-primary">
                  https://fonts.google.com/icons?icon.set=Material+Icons
                </a>
              </div>
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
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useCategoryStore } from '/src/stores/category-store'

const $q = useQuasar()
const { item } = defineProps(['item'])
const emits = defineEmits(['edited'])
const data = ref({
  id: item.id,
  name: item.name,
  icon: item.icon
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
}
onMounted(() => {
  getCategory()
})

// Validate
const rules = ref({
  name: [
    (v) => !!v || 'Nama harus diisi',
    (v) => v.length <= 50 || 'Nama maksimal 50 karakter',
    (v) => {
      if (typeof v === 'string') {
        if (categories.value) {
          return !categories.value.some((category) => category.name.toLowerCase() === v.toLowerCase() && category.name.toLowerCase() !== item.name.toLowerCase()) || 'Kategori sudah ada'
        }
      }
      return true
    }
  ],
  icon: [(v) => !!v || 'Ikon harus diisi']
})

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => {
  return loading.value || !data.value.name || !data.value.icon
})

// Edit
const editData = async () => {
  loading.value = true

  try {
    await useCategoryStore().edit(data.value)

    $q.notify({
      message: 'Kategori berhasil diedit',
      icon: 'check',
      color: 'positive'
    })
    emits('edited')
  } catch (error) {
    console.error('Error submitting form:', error)
    $q.notify({
      message: error.response.data.message || 'Kategori gagal diedit, Silahkan coba lagi nanti',
      icon: 'warning',
      color: 'negative'
    })
  }

  loading.value = false
}
</script>
