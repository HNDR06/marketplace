<template>
  <q-page class="q-pa-sm">
    <q-table
      class="dashboard-table"
      table-header-class="bg-grey-2"
      title="Kategori"
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
        <div class="text-h5 q-pr-lg">Kategori</div>
        <q-btn color="primary" icon="add" class="shadow-3 q-my-sm" @click="addItemDialog = true" dense>
          <q-tooltip>Tambah Kategori</q-tooltip>
        </q-btn>
        <q-dialog v-model="addItemDialog" persistent>
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

      <!-- Icon -->
      <template #body-cell-icon="props">
        <q-td :props="props">
          <div dense square>
            <q-icon :name="props.row.icon" size="30px" class="bg-grey-4 q-pa-md q-my-sm" style="border-radius: 50%" />
          </div>
        </q-td>
      </template>

      <!-- Action -->
      <template #body-cell-action="props">
        <q-td :props="props">
          <q-btn color="warning" field="edit" icon="edit" class="q-mx-xs" @click="props.row.editItemDialog = true" dense round>
            <q-dialog v-model="props.row.editItemDialog" persistent>
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

                  <!-- Icon -->
                  <div v-else-if="col.name === 'icon'" dense square>
                    <q-icon :name="props.row.icon" size="30px" class="bg-grey-4 q-pa-md q-my-sm" style="border-radius: 50%" />
                  </div>

                  <!-- Action -->
                  <div v-else-if="col.name === 'action'">
                    <q-btn color="warning" field="edit" icon="edit" class="q-mx-xs" @click="props.row.editItemDialog = true" dense round>
                      <q-dialog v-model="props.row.editItemDialog" persistent>
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
import { useCategoryStore } from '/src/stores/category-store'
import CreateItem from './CreateCategory.vue'
import EditItem from './EditCategory.vue'

const $q = useQuasar()
const router = useRouter()

// Get
const items = ref([])
const getItem = async () => {
  try {
    const res = await useCategoryStore().dashboard()

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

// Delete
const deleteItemDialog = (row) => {
  $q.dialog({
    title: 'WARNING!!!',
    message: 'Apakah Anda yakin ingin menghapus data ini?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await useCategoryStore().delete(row.id)

      $q.notify({
        message: 'Kategori berhasil dihapus',
        icon: 'check',
        color: 'positive'
      })
      getItem()
    } catch (error) {
      console.error('Error submitting form:', error)
      $q.notify({
        message: error.response.data.message || 'Kategori gagal dihapus',
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
    name: 'icon',
    field: 'icon',
    label: 'Ikon',
    align: 'center',
    sortable: false,
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
    name: 'slug',
    field: 'slug',
    label: 'Slug',
    align: 'left',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'action',
    field: 'action',
    label: 'Aksi',
    align: 'center',
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
</script>
