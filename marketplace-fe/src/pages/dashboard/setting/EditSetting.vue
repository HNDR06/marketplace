<template>
  <div>
    <q-form @submit="editData">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">Edit {{ title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="height: 77vh">
          <div class="row justify-center">
            <!-- Tutorial -->
            <div v-if="title === 'Tutorial'" class="col-10 q-ma-sm">
              <q-editor v-model="data.tutorial" :toolbar="toolbar" :fonts="fonts" :rules="rules" style="width: 100%; min-height: 470px" />
            </div>

            <!-- Terms -->
            <div v-if="title === 'Syarat dan Ketentuan'" class="col-10 q-ma-sm">
              <q-editor v-model="data.terms" :toolbar="toolbar" :fonts="fonts" :rules="rules" style="width: 100%; min-height: 470px" />
            </div>

            <!-- Privacy Policy -->
            <div v-if="title === 'Kebijakan Privasi'" class="col-10 q-ma-sm">
              <q-editor v-model="data.privacy_policy" :toolbar="toolbar" :fonts="fonts" :rules="rules" style="width: 100%; min-height: 470px" />
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
import { useSettingStore } from '/src/stores/setting-store'

const $q = useQuasar()
const emits = defineEmits(['edited'])
const { title, edit, item } = defineProps(['title', 'edit', 'item'])
const data = ref({
  id: item.id,
  version: item.version,
  terms: item.terms,
  tutorial: item.tutorial,
  privacy_policy: item.privacy_policy
})

// Form Editor
const toolbar = ref([
  ['left', 'center', 'right', 'justify'],
  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
  ['token', 'hr', 'link', 'cut'],
  ['print', 'fullscreen'],
  [
    {
      label: $q.lang.editor.formatting,
      icon: $q.iconSet.editor.formatting,
      list: 'no-icons',
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
    },
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
    },
    {
      label: $q.lang.editor.defaultFont,
      icon: $q.iconSet.editor.font,
      fixedIcon: true,
      list: 'no-icons',
      options: ['default_font', 'poppins', 'arial', 'arial_black', 'comic_sans', 'courier_new', 'impact', 'lucida_grande', 'times_new_roman', 'verdana']
    },
    'removeFormat'
  ],
  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
  ['undo', 'redo'],
  ['viewsource']
])
const fonts = ref({
  poppins: 'Poppins',
  arial: 'Arial',
  arial_black: 'Arial Black',
  comic_sans: 'Comic Sans MS',
  courier_new: 'Courier New',
  impact: 'Impact',
  lucida_grande: 'Lucida Grande',
  times_new_roman: 'Times New Roman',
  verdana: 'Verdana'
})

// Validate
const rules = ref([(v) => !!v || 'Data harus diisi'])

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => {
  return loading.value
})

// Edit
const editData = async () => {
  loading.value = true

  try {
    await useSettingStore().edit(data.value)

    $q.notify({
      message: title + ' berhasil diedit',
      icon: 'check',
      color: 'positive'
    })
    emits('edited')
  } catch (error) {
    console.error('Error submitting form:', error)
    $q.notify({
      message: error.response.data.message || title + ' gagal diedit, Silahkan coba lagi nanti',
      icon: 'warning',
      color: 'negative'
    })
  }

  loading.value = false
}
</script>
