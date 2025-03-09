<template>
  <q-page class="q-pa-sm">
    <q-table
      class="dashboard-table"
      table-header-class="bg-grey-2"
      title="Produk"
      row-key="__index"
      :rows="currencyData"
      :columns="currencyColumns"
      :hide-header="grid"
      :grid="grid"
      :filter="filter"
      v-model:pagination="pagination"
      :rows-per-page-options="[10, 20, 30]"
      :separator="tableseparator"
      virtual-scroll
      flat
      bordered
    >
      <!-- Top -->
      <template v-slot:top-right="props">
        <!-- Table Type -->
        <q-option-group
          v-model="tableseparator"
          size="xs"
          :options="[
            { label: 'Horizontal', value: 'horizontal' },
            { label: 'Vertical', value: 'vertical' },
            { label: 'Cell', value: 'cell' },
            { label: 'None', value: 'none' }
          ]"
          class="q-mx-md"
          inline
        />

        <!-- Fullscreen -->
        <q-btn color="primary" :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="setFs(props)" flat round dense>
          <q-tooltip>{{ props.inFullscreen ? 'Keluar Layar Penuh' : 'Beralih ke Layar Penuh' }}</q-tooltip>
        </q-btn>

        <!-- Grid Switch -->
        <q-btn color="primary" :icon="grid ? 'list' : 'grid_on'" @click="grid = !grid" class="q-mr-sm" flat round dense>
          <q-tooltip>{{ grid ? 'List' : 'Grid' }}</q-tooltip>
        </q-btn>

        <!-- Search -->
        <q-input outlined dense debounce="300" v-model="filter" placeholder="Cari...">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- Create -->
      <template v-slot:top-left>
        <div class="text-h5 q-pr-lg">Produk</div>
        <q-btn color="primary" icon="add" class="shadow-3 q-my-sm" @click="addItemDialog = true" dense>
          <q-tooltip>Tambah Produk</q-tooltip>
        </q-btn>
        <q-dialog v-model="addItemDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
          <CreateItem @added="itemAdded" />
        </q-dialog>
      </template>

      <!-- Table -->
      <!-- No Data -->
      <template v-slot:no-data>
        <div class="text-body2 text-bold text-center q-pa-md">
          <q-icon name="warning_amber" size="25px" class="q-mx-sm" />
          Tidak ada data yang tersedia.
        </div>
      </template>

      <!-- ID -->
      <template #body-cell-id="props">
        <q-td :props="props">
          <div dense square>
            {{ props.rowIndex + 1 }}
          </div>
        </q-td>
      </template>

      <!-- User -->
      <template #body-cell-user="props">
        <q-td :props="props">
          <div dense square>
            <div class="text-bold">{{ props.row.user.name }}</div>
            <div>{{ props.row.user.username }}</div>
          </div>
        </q-td>
      </template>

      <!-- Weight -->
      <template #body-cell-weight="props">
        <q-td :props="props">
          <div dense square>
            <div class="text-bold">{{ props.row.weight }} Gram</div>
          </div>
        </q-td>
      </template>

      <!-- Stock -->
      <template #body-cell-stock="props">
        <q-td :props="props">
          <div dense square>
            <div class="text-bold">{{ props.row.stock }} pcs</div>
          </div>
        </q-td>
      </template>

      <!-- Price -->
      <template #body-cell-price="props">
        <q-td :props="props">
          <div dense square>
            <div class="text-bold text-red">{{ formattedRupiah(props.row.price) }}</div>
          </div>
        </q-td>
      </template>

      <!-- Category -->
      <template #body-cell-category="props">
        <q-td :props="props">
          <div dense square>
            <div v-if="props.row.category">
              <q-icon :name="props.row.category.icon" size="30px" class="bg-grey-4 q-pa-md q-my-sm" style="border-radius: 50%" />
              <div class="text-bold text-center">{{ props.row.category.name }}</div>
            </div>
          </div>
        </q-td>
      </template>

      <!-- Description -->
      <template #body-cell-description="props">
        <q-td :props="props">
          <div dense square>
            <div>{{ props.row.description && props.row.description.length > 100 ? props.row.description.substring(0, 100) + '...' : props.row.description }}</div>
          </div>
        </q-td>
      </template>

      <!-- Photos -->
      <template #body-cell-photos="props">
        <q-td :props="props">
          <div dense square>
            <span v-for="photo in props.row.photos" :key="photo.id" class="q-mx-md dashboard-image photo-container">
              <img :src="url + '/products/' + photo.photo" width="150" />
              <q-btn icon="cancel" size="sm" class="delete-icon" @click="deletePhoto(photo.id)" flat dense />
            </span>
          </div>
        </q-td>
      </template>

      <!-- Action -->
      <template #body-cell-action="props">
        <q-td :props="props">
          <q-btn color="warning" field="edit" icon="edit" class="q-mx-xs" @click="props.row.editItemDialog = true" dense round>
            <q-dialog v-model="props.row.editItemDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
              <EditItem @edited="itemEdited(props.row)" :item="props.row" />
            </q-dialog>
          </q-btn>
          <q-btn color="red" field="delete" icon="delete" class="q-mx-xs" @click="deleteItemDialog(props.row)" dense round />
        </q-td>
      </template>

      <!-- Grid -->
      <template v-slot:item="props">
        <div class="q-pa-md col-xs-12 col-sm-6 col-md-6 col-lg-6 grid-style-transition" :style="props.selected ? 'transform: scale(0.95);' : ''">
          <q-card class="q-pa-md">
            <q-list dense>
              <q-item v-for="col in props.cols" :key="col.id">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <!-- ID -->
                  <div v-if="col.name === 'id'" dense square>
                    {{ props.rowIndex + 1 }}
                  </div>

                  <!-- User -->
                  <div v-else-if="col.name === 'user'" dense square>
                    <div>
                      <span class="text-bold">{{ props.row.user.name && props.row.user.name.length > 10 ? props.row.user.name.substring(0, 10) + '...' : props.row.user.name }}</span>
                      ({{ props.row.user.username && props.row.user.username.length > 10 ? props.row.user.username.substring(0, 10) + '...' : props.row.user.username }})
                    </div>
                  </div>

                  <!-- Weight -->
                  <div v-else-if="col.name === 'weight'" dense square>
                    <div class="text-bold">{{ props.row.weight }} Gram</div>
                  </div>

                  <!-- Stock -->
                  <div v-else-if="col.name === 'stock'" dense square>
                    <div class="text-bold">{{ props.row.stock }} pcs</div>
                  </div>

                  <!-- Price -->
                  <div v-else-if="col.name === 'price'" dense square>
                    <div class="text-bold text-red">{{ formattedRupiah(props.row.price) }}</div>
                  </div>

                  <!-- Category -->
                  <div v-else-if="col.name === 'category'" dense square>
                    <div v-if="props.row.category">
                      <q-icon :name="props.row.category.icon" size="30px" class="bg-grey-4 q-pa-md q-my-sm" style="border-radius: 50%" />
                      <div class="text-bold text-center">{{ props.row.category.name }}</div>
                    </div>
                  </div>

                  <!-- Description -->
                  <div v-else-if="col.name === 'description'" dense square>
                    <div>{{ props.row.description && props.row.description.length > 20 ? props.row.description.substring(0, 20) + '...' : props.row.description }}</div>
                  </div>

                  <!-- Photos -->
                  <div v-else-if="col.name === 'photos'" dense square>
                    <span v-for="photo in props.row.photos" :key="photo.id" class="q-mx-md dashboard-image photo-container">
                      <img :src="url + '/products/' + photo.photo" width="150" />
                      <q-btn icon="cancel" size="sm" class="delete-icon" @click="deletePhoto(photo.id)" flat dense />
                    </span>
                  </div>

                  <!-- Action -->
                  <div v-else-if="col.name === 'action'">
                    <q-btn color="warning" field="edit" icon="edit" class="q-mx-xs" @click="props.row.editItemDialog = true" dense round>
                      <q-dialog v-model="props.row.editItemDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
                        <EditItem @edited="itemEdited(props.row)" :item="props.row" />
                      </q-dialog>
                    </q-btn>
                    <q-btn color="red" field="delete" icon="delete" class="q-mx-xs" @click="deleteItemDialog(props.row)" dense round />
                  </div>

                  <!-- DLL -->
                  <q-item-label v-else caption :class="col.classes ? col.classes : ''">{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { url } from '/src/boot/axios'
import { useProductStore } from '/src/stores/product-store'
import { useProductGaleryStore } from '/src/stores/productgalery-store'
import CreateItem from './CreateProduct.vue'
import EditItem from './EditProduct.vue'

const $q = useQuasar()
const router = useRouter()

// Get
const items = ref([])
const getItem = async () => {
  try {
    const res = await useProductStore().dashboard()

    items.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
    if (error.response.data.status === 'failed') {
      router.push('/notfound')
    }
  }
}
onMounted(() => {
  getItem()
})

// Create
const addItemDialog = ref(false)
const itemAdded = () => {
  addItemDialog.value = false
  getItem()
}

// Edit
const itemEdited = (item) => {
  item.editItemDialog = false
  getItem()
}

// Delete Photo
const deletePhoto = (id) => {
  $q.dialog({
    title: 'WARNING!!!',
    message: 'Apakah Anda yakin ingin menghapus foto ini?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await useProductGaleryStore().delete(id)

      $q.notify({
        message: 'Foto berhasil dihapus',
        icon: 'check',
        color: 'positive'
      })
      getItem()
    } catch (error) {
      console.error('Error submitting form:', error)
      $q.notify({
        message: error.response.data.message || 'Foto gagal dihapus',
        icon: 'warning',
        color: 'negative'
      })
    }
  })
}

// Delete
const deleteItemDialog = (row) => {
  $q.dialog({
    title: 'WARNING!!!',
    message: 'Apakah Anda yakin ingin menghapus data ini?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await useProductStore().delete(row.id)

      $q.notify({
        message: 'Produk berhasil dihapus',
        icon: 'check',
        color: 'positive'
      })
      getItem()
    } catch (error) {
      console.error('Error submitting form:', error)
      $q.notify({
        message: error.response.data.message || 'Produk gagal dihapus',
        icon: 'warning',
        color: 'negative'
      })
    }
  })
}

// Table
const currencyData = items
const currencyColumns = [
  {
    name: 'id',
    field: 'id',
    label: 'No',
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'action',
    field: 'action',
    label: 'Aksi',
    align: 'center',
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'user',
    field: 'user',
    label: 'Pengguna',
    align: 'left',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'name',
    field: 'name',
    label: 'Nama',
    align: 'left',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'weight',
    field: 'weight',
    label: 'Berat',
    align: 'left',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'stock',
    field: 'stock',
    label: 'Sisa Produk',
    align: 'center',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'price',
    field: 'price',
    label: 'Harga',
    align: 'left',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'category',
    field: 'category',
    label: 'Kategori',
    align: 'center',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'description',
    field: 'description',
    label: 'Deskripsi',
    align: 'left',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'photos',
    field: 'photos',
    label: 'Foto',
    align: 'left',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  }
]
const tableseparator = ref('horizontal')
const filter = ref('')
const grid = ref(false)
const pagination = ref({})
const setFs = (props) => {
  props.toggleFullscreen()
}

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

<style scoped>
.photo-container {
  position: relative;
  display: inline-block;
}

.delete-icon {
  position: absolute;
  top: 0px;
  right: 0px;
  border-radius: 50%;
  padding: 2px;
}
</style>
