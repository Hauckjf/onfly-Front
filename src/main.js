import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index.ts'
import './assets/tailwind.css'

const app = createApp(App)
app.use(router)
app.mount('#app')