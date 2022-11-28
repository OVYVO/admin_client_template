import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { AIcon } from './utils/icon'

const app = createApp(App)
app.component('AIcon', AIcon)
app.use(router)
app.mount('#app')
