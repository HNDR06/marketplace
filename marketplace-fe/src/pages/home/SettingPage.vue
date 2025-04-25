<template>
  <q-page class="q-my-xl">
    <hr class="q-my-md" />

    <!-- Loading -->
    <q-form v-if="loading" @submit="editProfile">
      <div class="row justify-center">
        <!-- Avatar card -->
        <div class="col-md-3 col-xs-12 q-ma-md">
          <q-skeleton width="100%" height="350px" />
        </div>

        <!-- Account details card -->
        <div class="col-md-8 col-xs-12 q-ma-md">
          <q-skeleton width="100%" height="350px" />
        </div>

        <!-- Account details card -->
        <div class="col-12 q-ma-md">
          <q-skeleton width="100%" height="450px" />
        </div>
      </div>

      <!-- Save -->
      <q-skeleton width="90px" height="38px" class="float-right" />
      <hr class="q-my-md" />
    </q-form>

    <!-- Form -->
    <q-form v-else @submit="editProfile">
      <div class="row justify-center">
        <!-- Avatar card -->
        <div class="col-md-3 col-xs-12 q-ma-md">
          <q-card style="height: 100%">
            <q-card-section class="bg-blue-grey-1">
              <div class="text-body1 text-bold">Foto profil</div>
            </q-card-section>

            <q-separator />

            <q-card-section class="text-center q-pa-md">
              <!-- Avatar -->
              <q-avatar size="100px" class="q-my-md">
                <img ref="avatar" :src="url + '/avatars/' + data.avatar" />
              </q-avatar>
              <div class="text-subtitle2 text-grey-7">JPG atau PNG tidak lebih besar dari 5 MB</div>
              <q-btn color="primary" class="q-my-md" label="Unggah Foto baru" @click="$refs.avatarInput.click()" no-caps />
              <input type="file" ref="avatarInput" id="avatarInput" style="display: none" accept="image/*" @change="avatarChange" />
            </q-card-section>
          </q-card>
        </div>

        <!-- Account details card -->
        <div class="col-md-8 col-xs-12 q-ma-md">
          <q-card style="height: 100%">
            <q-card-section class="bg-blue-grey-1">
              <div class="text-body1 text-bold">Detail Akun</div>
            </q-card-section>
            <q-separator />

            <q-card-section class="q-pa-md">
              <div class="row justify-center">
                <!-- UserName -->
                <div class="col-md-5 col-xs-10 q-mx-md">
                  <label class="small mb-1" for="username">Username</label>
                  <q-input v-model="data.username" id="username" label="Username" :rules="rules.username" outlined dense required autofocus />
                </div>

                <!-- Name -->
                <div class="col-md-5 col-xs-10 q-mx-md">
                  <label class="small mb-1" for="name">Nama</label>
                  <q-input v-model="data.name" id="name" label="Nama" :rules="rules.name" outlined dense required />
                </div>

                <!-- Email -->
                <div class="col-md-5 col-xs-10 q-mx-md">
                  <label class="small mb-1" for="email">Email</label>
                  <q-input type="email" v-model="data.email" id="email" label="Email" :rules="rules.email" outlined dense required />
                </div>

                <!-- Phone Number -->
                <div class="col-md-5 col-xs-10 q-mx-md">
                  <label class="small mb-1" for="phone_number">Nomor Telepon</label>
                  <q-input v-model="data.phone_number" id="phone_number" label="Nomor Telepon" mask="#### - #### - ######" outlined dense />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Address card -->
        <div class="col-12 q-ma-md">
          <q-card>
            <q-card-section class="bg-blue-grey-1">
              <div class="text-body1 text-bold">Alamat</div>
            </q-card-section>
            <q-separator />

            <q-card-section class="q-pa-md">
              <div class="row justify-center">
                <!-- Province -->
                <div class="col-md-5 col-xs-10 q-my-sm q-mx-md">
                  <label class="small mb-1" for="province">Provinsi</label>
                  <q-select
                    v-model="data.province"
                    :options="options.provinces"
                    @filter="filters.provinces"
                    id="province"
                    label="Provinsi"
                    input-debounce="0"
                    use-input
                    fill-input
                    emit-value
                    hide-selected
                    outlined
                    dense
                  />
                </div>

                <!-- Regency -->
                <div class="col-md-5 col-xs-10 q-my-sm q-mx-md">
                  <label class="small mb-1" for="regency">Kabupaten</label>
                  <q-select
                    v-model="data.regency"
                    :options="options.regencies"
                    @filter="filters.regencies"
                    id="regency"
                    label="Kabupaten"
                    input-debounce="0"
                    use-input
                    fill-input
                    emit-value
                    hide-selected
                    outlined
                    dense
                  />
                </div>

                <!-- District -->
                <div class="col-md-5 col-xs-10 q-my-sm q-mx-md">
                  <label class="small mb-1" for="district">Kecamatan</label>
                  <q-select
                    v-model="data.district"
                    :options="options.districts"
                    @filter="filters.districts"
                    id="district"
                    label="Kecamatan"
                    input-debounce="0"
                    use-input
                    fill-input
                    emit-value
                    hide-selected
                    outlined
                    dense
                  />
                </div>

                <!-- Village -->
                <div class="col-md-5 col-xs-10 q-my-sm q-mx-md">
                  <label class="small mb-1" for="village">Kelurahan</label>
                  <q-select
                    v-model="data.village"
                    :options="options.villages"
                    @filter="filters.villages"
                    id="village"
                    label="Kelurahan"
                    input-debounce="0"
                    use-input
                    fill-input
                    emit-value
                    hide-selected
                    outlined
                    dense
                  />
                </div>

                <!-- Country -->
                <div class="col-md-5 col-xs-10 q-my-sm q-mx-md">
                  <label class="small mb-1" for="country">Negara</label>
                  <q-input v-model="data.country" id="country" label="Negara" outlined dense />
                </div>

                <!-- Zip Code -->
                <div class="col-md-5 col-xs-10 q-my-sm q-mx-md">
                  <label class="small mb-1" for="zip_code">Kode Pos</label>
                  <q-input type="number" v-model="data.zip_code" id="zip_code" label="Kode Pos" outlined dense />
                </div>

                <!-- Address One -->
                <div class="col-md-5 col-xs-10 q-my-sm q-mx-md">
                  <label class="small mb-1" for="address_one">Alamat Lengkap</label>
                  <q-input type="textarea" v-model="data.address_one" id="address_one" label="Alamat Lengkap" outlined dense />
                </div>

                <!-- Address Two -->
                <div class="col-md-5 col-xs-10 q-my-sm q-mx-md">
                  <label class="small mb-1" for="address_two">Detail Alamat</label>
                  <q-input v-model="data.address_two" id="address_two" label="Detail Alamat (Contoh : Dekat pohon besar)" outlined dense />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Save -->
      <q-btn type="submit" label="Simpan" color="primary" class="float-right" :loading="saveloading" :disable="disabledButton">
        <template v-slot:loading>
          <q-spinner-gears />
        </template>
      </q-btn>
      <hr class="q-my-md" />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { url } from '/src/boot/axios'
import { useUserStore } from '/src/stores/user-store'
import { useAddressStore } from '/src/stores/address-store'

const $q = useQuasar()
const router = useRouter()
const loading = ref(true)
const data = ref({
  id: null,
  avatar: '',
  username: '',
  name: '',
  email: '',
  phone_number: '',
  province: '',
  province_id: null,
  regency: '',
  regency_id: null,
  district: '',
  district_id: null,
  village: '',
  village_id: null,
  country: '',
  zip_code: null,
  address_one: '',
  address_two: ''
})

// Profile
const getProfile = async () => {
  loading.value = true
  try {
    const res = await useUserStore().profile()

    data.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  loading.value = false
}
onMounted(() => {
  getProfile()
})

// Get User
const users = ref([])
const getUser = async () => {
  try {
    const res = await useUserStore().all()

    users.value = res.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  getUser()
})

// Get Address
const provinces = ref([])
const regencies = ref([])
const districts = ref([])
const villages = ref([])
const getAddress = async () => {
  try {
    const res = await useAddressStore().all()

    // Get Provinces
    provinces.value = res.data.provinces.map((province) => ({
      id: province.id,
      label: province.name,
      value: province.name
    }))
    options.value.provinces = [...provinces.value]

    // Get Regencies
    regencies.value = res.data.regencies.map((regency) => ({
      id: regency.id,
      label: regency.name,
      value: regency.name
    }))
    options.value.regencies = [...regencies.value]

    // Get Districts
    districts.value = res.data.districts.map((district) => ({
      id: district.id,
      label: district.name,
      value: district.name
    }))
    options.value.districts = [...districts.value]

    // Get Villages
    villages.value = res.data.villages.map((village) => ({
      id: village.id,
      label: village.name,
      value: village.name
    }))
    options.value.villages = [...villages.value]
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  loading.value = false
}
onMounted(() => {
  getAddress()
})

// Options
const options = ref({
  provinces: [],
  regencies: [],
  districts: [],
  villages: []
})

// Filters
const filters = {
  provinces(val, update) {
    update(() => {
      const needle = val.toLowerCase()
      options.value.provinces = provinces.value.filter((option) => option.value.toLowerCase().includes(needle))
    })
  },
  regencies(val, update) {
    update(() => {
      const needle = val.toLowerCase()
      options.value.regencies = regencies.value.filter((option) => option.value.toLowerCase().includes(needle))
    })
  },
  districts(val, update) {
    update(() => {
      const needle = val.toLowerCase()
      options.value.districts = districts.value.filter((option) => option.value.toLowerCase().includes(needle))
    })
  },
  villages(val, update) {
    update(() => {
      const needle = val.toLowerCase()
      options.value.villages = villages.value.filter((option) => option.value.toLowerCase().includes(needle))
    })
  }
}

// Avatar
const avatar = ref(null)
const avatarChange = async (e) => {
  e.preventDefault()

  const avatarImage = e.target.files[0]
  if (avatarImage) {
    const reader = new FileReader()
    reader.onload = () => {
      avatar.value.src = reader.result
    }
    reader.readAsDataURL(avatarImage)

    try {
      const res = await useUserStore().editprofileavatar({ avatar: avatarImage })

      data.value.avatar = res.data.data.avatar
      $q.notify({
        message: 'Foto Profil berhasil diubah',
        icon: 'check',
        color: 'positive'
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      $q.notify({
        message: error.response.data.message || 'Foto Profil gagal diubah',
        icon: 'warning',
        color: 'negative'
      })
    }
  }
}

// Validate
const rules = ref({
  username: [
    (v) => !!v || 'Username harus diisi',
    (v) => v.length >= 6 || 'Username minimal 6 karakter',
    (v) => v.length <= 20 || 'Username maksimal 20 karakter',
    (v) => {
      if (typeof v === 'string') {
        if (users.value) {
          return !users.value.some((user) => user.username.toLowerCase() === v.toLowerCase() && user.id !== data.value.id) || 'Username sudah ada'
        }
      }
      return true
    }
  ],
  name: [(v) => !!v || 'Nama harus diisi', (v) => v.length <= 50 || 'Nama maksimal 50 karakter'],
  email: [
    (v) => !!v || 'Email harus diisi',
    (v) => /.+@.+/.test(v) || 'Email tidak valid',
    (v) => {
      if (typeof v === 'string') {
        if (users.value) {
          return !users.value.some((user) => user.email.toLowerCase() === v.toLowerCase() && user.id !== data.value.id) || 'Email sudah ada'
        }
      }
      return true
    }
  ]
})

// Disabled Button
const saveloading = ref(false)
const disabledButton = computed(() => saveloading.value || !data.value.name || !data.value.email)

// Edit User
const editProfile = async () => {
  saveloading.value = true
  try {
    if (data.value.province) {
      data.value.province_id = provinces.value.find((province) => province.label === data.value.province).id
    }
    if (data.value.regency) {
      data.value.regency_id = regencies.value.find((regency) => regency.label === data.value.regency).id
    }
    if (data.value.district) {
      data.value.district_id = districts.value.find((district) => district.label === data.value.district).id
    }
    if (data.value.village) {
      data.value.village_id = villages.value.find((village) => village.label === data.value.village).id
    }

    await useUserStore().editprofile(data.value)

    $q.notify({
      message: 'Profil berhasil diedit',
      icon: 'check',
      color: 'positive'
    })
    router.back()
    setTimeout(() => {
      window.location.reload()
    }, 100)
  } catch (error) {
    console.error('Error submitting form:', error)
    $q.notify({
      message: error.response.data.message || 'Profil gagal diedit, Silahkan coba lagi nanti',
      icon: 'warning',
      color: 'negative'
    })
  }
  saveloading.value = false
}
</script>
