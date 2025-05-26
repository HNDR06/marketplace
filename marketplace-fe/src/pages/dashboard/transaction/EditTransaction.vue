<template>
  <div>
    <q-form @submit="editData">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">Edit Transaksi</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="max-height: 77vh">
          <div class="row justify-center">
            <!-- Name -->
            <div class="col-10 q-ma-sm">
              <div class="text-bold">No Resi :</div>
              <q-input v-model="data.resi" label="No Resi" class="q-my-xs" dense outlined autofocus />
            </div>

            <!-- Icon -->
            <div class="col-10 q-ma-sm">
              <div class="text-bold">Status Pengiriman :</div>
              <q-btn
                v-for="option in shippingStatusOptions"
                :key="option.value"
                :color="colorButton(option.value)"
                :label="option.label"
                class="q-ma-xs"
                @click="data.shipping_status = option.value"
                :flat="data.shipping_status != option.value"
              />
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
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useTransactionStore } from '/src/stores/transaction-store'

const $q = useQuasar()
const { item } = defineProps(['item'])
const emits = defineEmits(['edited'])
const data = ref({
  id: item.id,
  resi: item.resi,
  shipping_status: item.shipping_status
})

// Shipping Status Options
const shippingStatusOptions = [
  { value: 0, label: 'Belum Dibayar' },
  { value: 1, label: 'Sedang Dikemas' },
  { value: 2, label: 'Sedang Dikirim' },
  { value: 3, label: 'Selesai' },
  { value: 4, label: 'Dibatalkan' }
]
const colorButton = (value) => {
  switch (value) {
    case 0:
      return 'grey'
    case 1:
      return 'warning'
    case 2:
      return 'green'
    case 3:
      return 'blue'
    case 4:
      return 'red'
    default:
      return {}
  }
}

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => {
  return loading.value
})

// Edit
const editData = async () => {
  loading.value = true

  try {
    await useTransactionStore().updateshipping(data.value)

    $q.notify({
      message: 'Transaksi berhasil diedit',
      icon: 'check',
      color: 'positive'
    })
    emits('edited')
  } catch (error) {
    console.error('Error submitting form:', error)
    $q.notify({
      message: error.response.data.message || 'Transaksi gagal diedit, Silahkan coba lagi nanti',
      icon: 'warning',
      color: 'negative'
    })
  }

  loading.value = false
}
</script>
