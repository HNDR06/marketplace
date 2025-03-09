<template>
  <div>
    <q-form @submit="createData">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">Tambah Pengguna</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll" style="max-height: 77vh">
          <div class="row justify-center">
            <!-- Avatar card -->
            <div class="col-md-3 q-ma-md">
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
            <div class="col-md-8 q-ma-md">
              <q-card style="height: 100%">
                <q-card-section class="bg-blue-grey-1">
                  <div class="text-body1 text-bold">Detail Akun</div>
                </q-card-section>
                <q-separator />

                <q-card-section class="q-pa-md">
                  <div class="row justify-center">
                    <!-- Username -->
                    <div class="col-md-5 col-xs-10 q-mx-md">
                      <label class="small mb-1" for="username">Username</label>
                      <q-input v-model="data.username" id="username" label="Username" :rules="rules.username" outlined dense required autofocus />
                    </div>

                    <!-- Name -->
                    <div class="col-md-5 col-xs-10 q-mx-md">
                      <label class="small mb-1" for="name">Name</label>
                      <q-input v-model="data.name" id="name" label="Name" :rules="rules.name" outlined dense required />
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

                    <!-- Password -->
                    <div class="col-md-5 col-xs-10 q-mx-md">
                      <label class="small mb-1" for="password">Kata Sandi</label>
                      <q-input type="password" v-model="data.password" id="password" label="Kata Sandi" :rules="rules.password" outlined dense />
                    </div>

                    <!-- Confirm Password -->
                    <div class="col-md-5 col-xs-10 q-mx-md">
                      <label class="small mb-1" for="confirm_password">Konfirmasi Kata Sandi</label>
                      <q-input type="password" v-model="data.confirm_password" id="confirm_password" label="Konfirmasi Kata Sandi" :rules="rules.confirm_password" outlined dense />
                    </div>

                    <!-- Role -->
                    <div class="col-10 q-mx-md">
                      <label class="small mb-1" for="confirm_password">Role</label>
                      <q-btn-toggle
                        v-model="data.role"
                        toggle-color="primary"
                        class="q-mx-md"
                        :options="[
                          { label: 'Admin', value: 'Admin' },
                          { label: 'Mitra', value: 'Mitra' },
                          { label: 'Customer', value: 'Customer' }
                        ]"
                        push
                        glossy
                      />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- Address card -->
            <div class="col-11 q-ma-md">
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
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { url } from '/src/boot/axios'
import { useUserStore } from '/src/stores/user-store'
import { useAddressStore } from '/src/stores/address-store'

const $q = useQuasar()
const emits = defineEmits(['added'])
const data = ref({
  avatar: 'user-profile-default.jpg',
  username: '',
  name: '',
  email: '',
  password: '',
  confirm_password: '',
  role: '',
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
  data.value.avatar = e.target.files[0]
  if (avatarImage) {
    const reader = new FileReader()
    reader.onload = () => {
      avatar.value.src = reader.result
    }
    reader.readAsDataURL(avatarImage)
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
          return !users.value.some((user) => user.username.toLowerCase() === v.toLowerCase()) || 'Username sudah ada'
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
          return !users.value.some((user) => user.email.toLowerCase() === v.toLowerCase()) || 'Email sudah ada'
        }
      }
      return true
    }
  ],
  password: [(v) => !!v || 'Password harus diisi', (v) => v.length >= 8 || 'Password minimal 8 karakter'],
  confirm_password: [(v) => !!v || 'Konfirmasi Password harus diisi', (v) => v === data.value.password || 'Password tidak sama']
})

// Disabled Button
const loading = ref(false)
const disabledButton = computed(() => loading.value || !data.value.username || !data.value.name || !data.value.email || !data.value.password || !data.value.confirm_password)

// Create
const createData = async () => {
  loading.value = true
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

    await useUserStore().create(data.value)

    $q.notify({
      message: 'Pengguna berhasil dibuat',
      icon: 'check',
      color: 'positive'
    })
    emits('added')
  } catch (error) {
    console.error('Error submitting form:', error)
    $q.notify({
      message: error.response.data.message || 'Pengguna gagal dibuat, Silahkan coba lagi nanti',
      icon: 'warning',
      color: 'negative'
    })
  }
  loading.value = false
}
</script>
