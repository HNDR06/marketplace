<template>
  <q-page class="q-pa-sm">
    <div v-if="loading" class="q-my-lg">
      <q-skeleton height="300px" class="q-my-md" />
      <q-skeleton height="500px" class="q-my-md" />
      <q-skeleton height="500px" class="q-my-md" />
    </div>

    <div v-else class="q-my-lg">
      <!-- Config -->
      <q-card class="bg-white my-card q-my-md" bordered>
        <q-form @submit="editItem">
          <q-card-section class="bg-blue-grey-2 q-pa-lg">
            <div class="text-h5 text-bold text-center">Konfigurasi</div>
          </q-card-section>

          <q-card-section>
            <div class="row justify-center">
              <!-- Version -->
              <div class="col-10 q-ma-sm">
                <div class="text-bold">Versi :</div>
                <q-input v-model="data.version" label="Versi" class="q-mb-sm" :rules="rules.version" dense outlined required />
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn type="submit" label="Simpan" color="primary" :loading="settingloading" :disable="disabledButton" class="q-ma-md">
              <template v-slot:loading>
                <q-spinner-gears />
              </template>
            </q-btn>
          </q-card-actions>
        </q-form>
      </q-card>

      <!-- Tutorial -->
      <q-card class="bg-white my-card q-my-md" bordered>
        <q-card-section class="bg-blue-grey-2 q-pa-lg">
          <q-btn color="warning" field="edit" icon="edit" class="absolute absolute-top-right q-ma-md" @click="editTutorialDialog = true" dense round>
            <q-dialog v-model="editTutorialDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
              <EditItem @edited="itemEdited" title="Tutorial" :item="item" />
            </q-dialog>
          </q-btn>
          <div class="text-h5 text-bold text-center">Tutorial</div>
        </q-card-section>

        <q-card-section class="q-pa-md">
          <div v-html="item.tutorial"></div>
        </q-card-section>
      </q-card>

      <!-- Terms -->
      <q-card class="bg-white my-card q-my-md" bordered>
        <q-card-section class="bg-blue-grey-2 q-pa-lg">
          <q-btn color="warning" field="edit" icon="edit" class="absolute absolute-top-right q-ma-md" @click="editTermsDialog = true" dense round>
            <q-dialog v-model="editTermsDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
              <EditItem @edited="itemEdited" title="Syarat dan Ketentuan" :item="item" />
            </q-dialog>
          </q-btn>
          <div class="text-h5 text-bold text-center">Syarat dan Ketentuan</div>
        </q-card-section>

        <q-card-section class="q-pa-md">
          <div v-html="item.terms"></div>
        </q-card-section>
      </q-card>

      <!-- Terms -->
      <q-card class="bg-white my-card q-my-md" bordered>
        <q-card-section class="bg-blue-grey-2 q-pa-lg">
          <q-btn color="warning" field="edit" icon="edit" class="absolute absolute-top-right q-ma-md" @click="editPrivacypolicyDialog = true" dense round>
            <q-dialog v-model="editPrivacypolicyDialog" transition-show="slide-up" transition-hide="slide-down" full-width full-height persistent>
              <EditItem @edited="itemEdited" title="Kebijakan Privasi" :item="item" />
            </q-dialog>
          </q-btn>
          <div class="text-h5 text-bold text-center">Kebijakan Privasi</div>
        </q-card-section>

        <q-card-section class="q-pa-md">
          <div v-html="item.privacy_policy"></div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useSettingStore } from '/src/stores/setting-store'
import EditItem from './EditSetting.vue'

const $q = useQuasar()
const router = useRouter()
const data = ref({
  version: ''
})

// Get
const item = ref([])
const loading = ref(true)
const getItem = async () => {
  try {
    const res = await useSettingStore().dashboard()

    item.value = res.data.data
    loading.value = false
    data.value = res.data.data
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

// Edit Tutorial & Terms & Privacy Policy
const editTutorialDialog = ref(false)
const editTermsDialog = ref(false)
const editPrivacypolicyDialog = ref(false)
const itemEdited = () => {
  editTutorialDialog.value = false
  editTermsDialog.value = false
  editPrivacypolicyDialog.value = false
  getItem()
}

// Validate
const rules = ref({
  version: [(v) => !!v || 'Versi harus diisi']
})

// Disabled Button
const settingloading = ref(false)
const disabledButton = computed(() => {
  return settingloading.value || !data.value.version
})

// Edit
const editItem = async () => {
  settingloading.value = true

  try {
    await useSettingStore().edit(data.value)

    $q.notify({
      message: 'Konfigurasi berhasil diedit',
      icon: 'check',
      color: 'positive'
    })
    getItem()
  } catch (error) {
    console.error('Error submitting form:', error)
    $q.notify({
      message: error.response.data.message || 'Konfigurasi gagal diedit, Silahkan coba lagi nanti',
      icon: 'warning',
      color: 'negative'
    })
  }

  settingloading.value = false
}
</script>
