import { createApp } from 'vue'
import App from 'app/src/App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '559652152434-fkrgre1cjkaoqgvd55o71ki55gjotu00.apps.googleusercontent.com'
})

app.mount('#app')
