import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/tailwind.css'
import router from './routers/index'
import { createPinia } from 'pinia'


const pinia = createPinia()
const app = createApp(App)

app.use(pinia)  
app.use(router) 

app.mount('#app')
