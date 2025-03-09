<template>
  <div>
    <q-form @submit="createData">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">Tambah Produk</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="height: 77vh">
          <div class="row justify-center">
            <!-- Photos -->
            <div class="col-md-3 col-xs-10 q-ma-md">
              <div class="text-bold">Foto Produk :</div>
              <q-uploader v-model="photos" label="Foto Produk" style="width: 100%; min-height: 470px" @added="photosAdded" :rules="rules.photos" multiple batch />
            </div>

            <div class="col-md-7 col-xs-10 q-ma-md">
              <div class="row justify-between">
                <div class="col-md-7 col-xs-12 q-my-xs">
                  <!-- Name -->
                  <div class="text-bold">Nama :</div>
                  <q-input v-model="data.name" label="Nama" class="q-my-xs" :rules="rules.name" dense outlined required autofocus />

                  <!-- Price -->
                  <div class="text-bold">Harga :</div>
                  <q-input v-model="formattedPrice" label="Harga" class="q-my-xs" :rules="rules.price" @input="updatePrice" dense outlined required />

                  <div class="row justify-center">
                    <!-- Weight -->
                    <div class="col-md-5 col-xs-12 q-mx-sm">
                      <div class="text-bold">Berat (Gram) :</div>
                      <q-input type="number" v-model="data.weight" label="Berat" class="q-my-xs" :rules="rules.weight" dense outlined required />
                    </div>

                    <!-- Stock -->
                    <div class="col-md-5 col-xs-12 q-mx-sm">
                      <div class="text-bold">Stok :</div>
                      <q-input type="number" v-model="data.stock" label="Stok" class="q-my-xs" :rules="rules.stock" dense outlined required />
                    </div>
                  </div>
                </div>

                <!-- Category -->
                <div class="col-md-4 col-xs-12 q-my-xs">
                  <div class="text-bold">Kategori :</div>
                  <q-card flat bordered class="my-card q-my-xs" style="max-width: 300px">
                    <q-card-section>
                      <div class="text-body1 text-bold text-center">Kategori</div>
                    </q-card-section>

                    <q-separator inset />

                    <q-card-section>
                      <div v-if="selectedCategory">
                        <div class="flex flex-center">
                          <q-icon :name="selectedCategory.icon" size="50px" class="bg-grey-4 q-pa-md" style="border-radius: 50%" />
                        </div>
                        <p class="categories-text text-center text-bold">{{ selectedCategory.name }}</p>
                      </div>
                      <div v-else class="text-subtitle2 text-grey-7 text-center q-my-xl">Tidak ada Kategori yang dipilih</div>
                      <q-btn color="primary" size="sm" label="Pilih Kategori" @click="categoryList = true" no-caps dense />
                    </q-card-section>
                  </q-card>
                </div>
              </div>

              <!-- Description -->
              <div class="text-bold">Deskripsi :</div>
              <q-input type="textarea" :rows="15" v-model="data.description" label="Deskripsi" class="q-my-xs" :rules="rules.description" dense outlined required autofocus />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="text-primary">
          <q-btn label="Batal" color="primary" flat v-close-popup />
          <q-btn type="submit" label="Tambah" color="primary" :loading="loading" :disable="disabledButton">
            <template v-slot:loading>
              <q-spinner-gears />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>

  <!-- Choose Category -->
  <q-dialog v-model="categoryList">
    <q-card>
      <q-card-section class="row items-center">
        <q-input v-model="searchKeyword" label="Cari Kategori" class="q-my-sm" style="width: 300px" outlined dense />
        <q-space />
        <q-btn label="Pilih" color="primary" class="q-my-sm" v-close-popup />
      </q-card-section>
      <q-card-section class="scroll" style="height: 77vh">
        <div class="row justify-center">
          <q-item tag="label" v-for="category in filteredCategories" :key="category.id" class="col-xs-6 col-sm-4" v-ripple>
            <div class="q-pa-md">
              <div class="flex flex-center">
                <q-radio v-model="selectedCategory" :val="category" />
                <q-icon :name="category.icon" size="50px" class="bg-grey-4 q-pa-md" style="border-radius: 50%" />
              </div>
              <p class="categories-text text-center">{{ category.name }}</p>
            </div>
          </q-item>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useProductStore } from '/src/stores/product-store'
import { useCategoryStore } from '/src/stores/category-store'

const $q = useQuasar()
const emits = defineEmits(['added'])
const data = ref({
  name: '',
  price: null,
  weight: null,
  stock: null,
  description: '',
  category_id: null,
  photos: null
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

// Choose Category
const categoryList = ref(false)
const selectedCategory = ref(null)
const searchKeyword = ref('')
const filteredCategories = computed(() => {
  const keyword = searchKeyword.value.toLowerCase()
  return categories.value.filter((category) => category.name.toLowerCase().includes(keyword))
})

// Photos
const photos = ref([])
watch(photos, (newPhotos) => {
  data.value.photos = newPhotos
})
const photosAdded = (files) => {
  data.value.photos = files
}

// Validate
const rules = ref({
  name: [(v) => !!v || 'Nama harus diisi', (v) => v.length <= 255 || 'Nama maksimal 255 karakter'],
  price: [(v) => !!v || 'Harga harus diisi'],
  weight: [(v) => !!v || 'Berat harus diisi', (v) => /^[0-9]+$/.test(v) || 'Berat harus berupa angka'],
  stock: [(v) => !!v || 'Stok harus diisi', (v) => /^[0-9]+$/.test(v) || 'Stok harus berupa angka'],
  photos: [(v) => !!v || 'Foto harus diisi']
})

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => {
  return loading.value || !data.value.name || !data.value.weight || !data.value.price || !data.value.photos
})

// Create
const createData = async () => {
  loading.value = true

  try {
    if (selectedCategory.value) {
      data.value.category_id = selectedCategory.value.id
    }

    await useProductStore().create(data.value)

    $q.notify({
      message: 'Produk berhasil dibuat',
      icon: 'check',
      color: 'positive'
    })
    emits('added')
  } catch (error) {
    console.error('Error submitting form:', error)
    $q.notify({
      message: error.response.data.message || 'Produk gagal dibuat, Silahkan coba lagi nanti',
      icon: 'warning',
      color: 'negative'
    })
  }

  loading.value = false
}

// Money Input
const formattedPrice = computed({
  get() {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(data.value.price)
  },
  set(value) {
    const numericValue = value.replace(/[^\d]/g, '')
    data.value.price = parseInt(numericValue, 10) || 0
  }
})
const updatePrice = (value) => {
  const numericValue = value.replace(/[^\d]/g, '')
  data.value.price = parseInt(numericValue, 10) || 0
}
</script>
