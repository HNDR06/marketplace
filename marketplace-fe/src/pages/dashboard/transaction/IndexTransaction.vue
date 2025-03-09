<template>
  <q-page class="q-pa-sm">
    <q-table
      class="dashboard-table"
      table-header-class="bg-grey-2"
      title="Transaksi"
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
      dense
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

      <!-- Invoice -->
      <template #body-cell-invoice="props">
        <q-td :props="props">
          <div dense square>
            <div class="bg-yellow-3 q-pa-sm" style="border-radius: 20px">
              <div class="text-yellow-10 text-center">{{ props.row.invoice }}</div>
            </div>
          </div>
        </q-td>
      </template>

      <!-- Shipping Status -->
      <template #body-cell-shipping_status="props">
        <q-td :props="props">
          <div dense square>
            <q-badge v-if="props.row.shipping_status == 0" color="grey">Belum Dibayar</q-badge>
            <q-badge v-if="props.row.shipping_status == 1" color="warning">Sedang Dikemas</q-badge>
            <q-badge v-if="props.row.shipping_status == 2" color="green">Sedang Dikirim</q-badge>
            <q-badge v-if="props.row.shipping_status == 3" color="blue">Selesai</q-badge>
            <q-badge v-if="props.row.shipping_status == 4" color="red">Dibatalkan</q-badge>
          </div>
        </q-td>
      </template>

      <!-- Products -->
      <template #body-cell-transaction_details="props">
        <q-td :props="props">
          <div dense square>
            <div v-for="transaction_detail in props.row.transaction_details" :key="transaction_detail.id" class="q-my-xs">
              <q-img :src="url + '/products/' + transaction_detail.product.photos[0].photo" :ratio="1 / 1" class="q-mx-sm" style="width: 30px" />
              {{ transaction_detail.product.name }}
              <span class="q-mx-sm text-bold text-grey-6">x {{ transaction_detail.quantity }}</span>
            </div>
          </div>
        </q-td>
      </template>

      <!-- Buyer -->
      <template #body-cell-buyer="props">
        <q-td :props="props">
          <div dense square>
            <div class="text-bold">{{ props.row.user.name }}</div>
            <div>{{ props.row.user.username }}</div>
          </div>
        </q-td>
      </template>

      <!-- Seller -->
      <template #body-cell-seller="props">
        <q-td :props="props">
          <div dense square>
            <div class="text-bold">{{ props.row.transaction_details[0].product.user.name }}</div>
            <div>{{ props.row.transaction_details[0].product.user.username }}</div>
          </div>
        </q-td>
      </template>

      <!-- Product Price -->
      <template #body-cell-product_price="props">
        <q-td :props="props">
          <div dense square>
            <div class="text-bold text-red">{{ formattedRupiah(props.row.product_price) }}</div>
          </div>
        </q-td>
      </template>

      <!-- Shipping Price -->
      <template #body-cell-shipping_price="props">
        <q-td :props="props">
          <div dense square>
            <div class="text-bold text-red">{{ formattedRupiah(props.row.shipping_price) }}</div>
          </div>
        </q-td>
      </template>

      <!-- Total Price -->
      <template #body-cell-total_price="props">
        <q-td :props="props">
          <div dense square>
            <div class="text-bold text-red">{{ formattedRupiah(props.row.total_price) }}</div>
          </div>
        </q-td>
      </template>

      <!-- Courier -->
      <template #body-cell-courier="props">
        <q-td :props="props">
          <div dense square>
            <div class="text-bold">{{ props.row.courier }}</div>
            <div>{{ props.row.shipping_description }}</div>
          </div>
        </q-td>
      </template>

      <!-- Buyer Address -->
      <template #body-cell-buyer_address="props">
        <q-td :props="props">
          <div dense square>
            <div v-if="props.row.user.address_one">{{ props.row.user.address_one }},</div>
            <span v-if="props.row.user.village" class="q-mr-xs">{{ props.row.user.village }},</span>
            <span v-if="props.row.user.district" class="q-mr-xs">{{ props.row.user.district }},</span>
            <span v-if="props.row.user.regency" class="q-mr-xs">{{ props.row.user.regency }},</span>
            <span v-if="props.row.user.province" class="q-mr-xs">{{ props.row.user.province }},</span>
            <span v-if="props.row.user.country" class="q-mr-xs">{{ props.row.user.country }},</span>
            <span v-if="props.row.user.zip_code" class="q-mr-xs">{{ props.row.user.zip_code }}.</span>
            <div v-if="props.row.user.address_two">({{ props.row.user.address_two }})</div>
          </div>
        </q-td>
      </template>

      <!-- Seller Address -->
      <template #body-cell-seller_address="props">
        <q-td :props="props">
          <div dense square>
            <div v-if="props.row.transaction_details[0].product.user.address_one">{{ props.row.transaction_details[0].product.user.address_one }}.</div>
            <span v-if="props.row.transaction_details[0].product.user.village" class="q-mr-xs">{{ props.row.transaction_details[0].product.user.village }},</span>
            <span v-if="props.row.transaction_details[0].product.user.district" class="q-mr-xs">{{ props.row.transaction_details[0].product.user.district }},</span>
            <span v-if="props.row.transaction_details[0].product.user.regency" class="q-mr-xs">{{ props.row.transaction_details[0].product.user.regency }},</span>
            <span v-if="props.row.transaction_details[0].product.user.province" class="q-mr-xs">{{ props.row.transaction_details[0].product.user.province }}.</span>
            <span v-if="props.row.transaction_details[0].product.user.country" class="q-mr-xs">{{ props.row.transaction_details[0].product.user.country }},</span>
            <span v-if="props.row.transaction_details[0].product.user.zip_code" class="q-mr-xs">{{ props.row.transaction_details[0].product.user.zip_code }}.</span>
            <div v-if="props.row.transaction_details[0].product.user.address_two">({{ props.row.transaction_details[0].product.user.address_two }})</div>
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
              <div v-for="col in props.cols" :key="col.id">
                <div class="text-bold text-grey-7 q-mt-md">
                  <q-item-label>{{ col.label }}</q-item-label>
                </div>

                <div side>
                  <!-- ID -->
                  <div v-if="col.name === 'id'" dense square>
                    {{ props.rowIndex + 1 }}
                  </div>

                  <!-- Invoice -->
                  <div v-else-if="col.name === 'invoice'" dense square>
                    <div class="bg-yellow-3 q-pa-xs q-my-sm" style="max-width: 250px; border-radius: 20px">
                      <div class="text-yellow-10 text-center">{{ props.row.invoice }}</div>
                    </div>
                  </div>

                  <!-- Shipping Status -->
                  <div v-else-if="col.name === 'shipping_status'" dense square>
                    <q-badge v-if="props.row.shipping_status == 0" color="grey">Belum Dibayar</q-badge>
                    <q-badge v-if="props.row.shipping_status == 1" color="warning">Sedang Dikemas</q-badge>
                    <q-badge v-if="props.row.shipping_status == 2" color="green">Sedang Dikirim</q-badge>
                    <q-badge v-if="props.row.shipping_status == 3" color="blue">Selesai</q-badge>
                    <q-badge v-if="props.row.shipping_status == 4" color="red">Dibatalkan</q-badge>
                  </div>

                  <!-- Products -->
                  <div v-else-if="col.name === 'transaction_details'" dense square>
                    <div v-for="transaction_detail in props.row.transaction_details" :key="transaction_detail.id" class="q-my-xs">
                      <q-img :src="url + '/products/' + transaction_detail.product.photos[0].photo" :ratio="1 / 1" class="q-mx-sm" style="width: 30px" />
                      {{ transaction_detail.product.name }}
                      <span class="q-mx-sm text-bold text-grey-6">x {{ transaction_detail.quantity }}</span>
                    </div>
                  </div>

                  <!-- Buyer -->
                  <div v-else-if="col.name === 'buyer'" dense square>
                    <div class="text-bold">{{ props.row.user.name }}</div>
                    <div>{{ props.row.user.username }}</div>
                  </div>

                  <!-- Seller -->
                  <div v-else-if="col.name === 'seller'" dense square>
                    <div class="text-bold">{{ props.row.transaction_details[0].product.user.name }}</div>
                    <div>{{ props.row.transaction_details[0].product.user.username }}</div>
                  </div>

                  <!-- Product Price -->
                  <div v-else-if="col.name === 'product_price'" dense square>
                    <div class="text-bold text-red">{{ formattedRupiah(props.row.product_price) }}</div>
                  </div>

                  <!-- Shipping Price -->
                  <div v-else-if="col.name === 'shipping_price'" dense square>
                    <div class="text-bold text-red">{{ formattedRupiah(props.row.shipping_price) }}</div>
                  </div>

                  <!-- Total Price -->
                  <div v-else-if="col.name === 'total_price'" dense square>
                    <div class="text-bold text-red">{{ formattedRupiah(props.row.total_price) }}</div>
                  </div>

                  <!-- Courier -->
                  <div v-else-if="col.name === 'courier'" dense square>
                    <div class="text-bold">{{ props.row.courier }}</div>
                    <div>{{ props.row.shipping_description }}</div>
                  </div>

                  <!-- Buyer Address -->
                  <div v-else-if="col.name === 'buyer_address'" dense square>
                    <div v-if="props.row.user.address_one">{{ props.row.user.address_one }},</div>
                    <span v-if="props.row.user.village" class="q-mr-xs">{{ props.row.user.village }},</span>
                    <span v-if="props.row.user.district" class="q-mr-xs">{{ props.row.user.district }},</span>
                    <span v-if="props.row.user.regency" class="q-mr-xs">{{ props.row.user.regency }},</span>
                    <span v-if="props.row.user.province" class="q-mr-xs">{{ props.row.user.province }},</span>
                    <span v-if="props.row.user.country" class="q-mr-xs">{{ props.row.user.country }},</span>
                    <span v-if="props.row.user.zip_code" class="q-mr-xs">{{ props.row.user.zip_code }}.</span>
                    <div v-if="props.row.user.address_two">({{ props.row.user.address_two }})</div>
                  </div>

                  <!-- Seller Address -->
                  <div v-else-if="col.name === 'seller_address'" dense square>
                    <div v-if="props.row.transaction_details[0].product.user.address_one">{{ props.row.transaction_details[0].product.user.address_one }}.</div>
                    <span v-if="props.row.transaction_details[0].product.user.village" class="q-mr-xs">{{ props.row.transaction_details[0].product.user.village }},</span>
                    <span v-if="props.row.transaction_details[0].product.user.district" class="q-mr-xs">{{ props.row.transaction_details[0].product.user.district }},</span>
                    <span v-if="props.row.transaction_details[0].product.user.regency" class="q-mr-xs">{{ props.row.transaction_details[0].product.user.regency }},</span>
                    <span v-if="props.row.transaction_details[0].product.user.province" class="q-mr-xs">{{ props.row.transaction_details[0].product.user.province }}.</span>
                    <span v-if="props.row.transaction_details[0].product.user.country" class="q-mr-xs">{{ props.row.transaction_details[0].product.user.country }},</span>
                    <span v-if="props.row.transaction_details[0].product.user.zip_code" class="q-mr-xs">{{ props.row.transaction_details[0].product.user.zip_code }}.</span>
                    <div v-if="props.row.transaction_details[0].product.user.address_two">({{ props.row.transaction_details[0].product.user.address_two }})</div>
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
                </div>
              </div>
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
import { useTransactionStore } from '/src/stores/transaction-store'
import EditItem from './EditTransaction.vue'

const $q = useQuasar()
const router = useRouter()

// Get
const items = ref([])
const getItem = async () => {
  try {
    const res = await useTransactionStore().dashboard()

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
      await useTransactionStore().delete(row.id)

      $q.notify({
        message: 'Transaksi berhasil dihapus',
        icon: 'check',
        color: 'positive'
      })
      getItem()
    } catch (error) {
      console.error('Error submitting form:', error)
      $q.notify({
        message: error.response.data.message || 'Transaksi gagal dihapus',
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
    name: 'invoice',
    field: 'invoice',
    label: 'Invoice',
    align: 'center',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'shipping_status',
    field: 'shipping_status',
    label: 'Status Pengiriman',
    align: 'center',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'transaction_details',
    field: 'transaction_details',
    label: 'Produk',
    align: 'left',
    sortable: false,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'resi',
    field: 'resi',
    label: 'Resi',
    align: 'center',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'buyer',
    field: 'buyer',
    label: 'Pembeli',
    align: 'left',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'seller',
    field: 'seller',
    label: 'Penjual',
    align: 'left',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'product_price',
    field: 'product_price',
    label: 'Total Harga Produk',
    align: 'center',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'shipping_price',
    field: 'shipping_price',
    label: 'Ongkos Kirim',
    align: 'center',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'total_price',
    field: 'total_price',
    label: 'Total Harga',
    align: 'center',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'courier',
    field: 'courier',
    label: 'Kurir',
    align: 'left',
    sortable: true,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'buyer_address',
    field: 'buyer_address',
    label: 'Alamat Pembeli',
    align: 'left',
    sortable: false,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'seller_address',
    field: 'seller_address',
    label: 'Alamat Penjual',
    align: 'left',
    sortable: false,
    headerStyle: 'font-weight: bolder; font-size: 13px;'
  },
  {
    name: 'note',
    field: 'note',
    label: 'Catatan',
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
