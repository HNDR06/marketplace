<template>
  <q-page class="q-pa-sm">
    <q-table
      class="dashboard-table"
      table-header-class="bg-grey-2"
      title="Pengguna"
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
        <div class="text-h5 q-pr-lg">Pengguna</div>
        <q-btn color="primary" icon="add" class="shadow-3 q-my-sm" @click="addItemDialog = true" dense>
          <q-tooltip>Tambah Pengguna</q-tooltip>
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

      <!-- Avatar -->
      <template #body-cell-avatar="props">
        <q-td :props="props">
          <div dense square>
            <q-avatar size="60px">
              <img :src="url + '/avatars/' + props.row.avatar" />
            </q-avatar>
          </div>
        </q-td>
      </template>

      <!-- User -->
      <template #body-cell-user="props">
        <q-td :props="props">
          <div dense square>
            <div class="text-bold">{{ props.row.name }}</div>
            <div>{{ props.row.username }}</div>
          </div>
        </q-td>
      </template>

      <!-- Address -->
      <template #body-cell-address="props">
        <q-td :props="props">
          <div dense square>
            <div v-if="props.row.address_one">{{ props.row.address_one }},</div>
            <span v-if="props.row.village" class="q-mr-xs">{{ props.row.village }},</span>
            <span v-if="props.row.district" class="q-mr-xs">{{ props.row.district }},</span>
            <span v-if="props.row.regency" class="q-mr-xs">{{ props.row.regency }},</span>
            <span v-if="props.row.province" class="q-mr-xs">{{ props.row.province }},</span>
            <span v-if="props.row.country" class="q-mr-xs">{{ props.row.country }},</span>
            <span v-if="props.row.zip_code" class="q-mr-xs">{{ props.row.zip_code }}.</span>
            <div v-if="props.row.address_two">({{ props.row.address_two }})</div>
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

                  <!-- Avatar -->
                  <div v-else-if="col.name === 'avatar'" dense square>
                    <q-avatar size="60px">
                      <img :src="url + '/avatars/' + props.row.avatar" />
                    </q-avatar>
                  </div>

                  <!-- User -->
                  <div v-else-if="col.name === 'user'" dense square>
                    <div>
                      <span class="text-bold">{{ props.row.name && props.row.name.length > 10 ? props.row.name.substring(0, 10) + '...' : props.row.name }}</span>
                      ({{ props.row.username && props.row.username.length > 10 ? props.row.username.substring(0, 10) + '...' : props.row.username }})
                    </div>
                  </div>

                  <!-- Address -->
                  <div v-else-if="col.name === 'address'" dense square>
                    <div class="text-subtitle2">{{ props.row.address_one && props.row.address_one.length > 25 ? props.row.address_one.substring(0, 25) + '...' : props.row.address_one }}</div>
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
import { useUserStore } from '/src/stores/user-store'
import CreateItem from './CreateUser.vue'
import EditItem from './EditUser.vue'

const $q = useQuasar()
const router = useRouter()

// Get
const items = ref([])
const getItem = async () => {
  try {
    const res = await useUserStore().dashboard()

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
      await useUserStore().delete(row.id)

      $q.notify({
        message: 'Pengguna berhasil dihapus',
        icon: 'check',
        color: 'positive'
      })
      getItem()
    } catch (error) {
      console.error('Error submitting form:', error)
      $q.notify({
        message: error.response.data.message || 'Pengguna gagal dihapus',
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
    name: 'avatar',
    field: 'avatar',
    label: 'Foto Profil',
    align: 'center',
    sortable: false,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'user',
    field: 'name',
    label: 'Pengguna',
    align: 'left',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'email',
    field: 'email',
    label: 'Email',
    align: 'left',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'role',
    field: 'role',
    label: 'Role',
    align: 'left',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'address',
    field: 'address_one',
    label: 'Alamat',
    align: 'left',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'action',
    field: 'action',
    label: 'Aksi',
    align: 'center'
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
