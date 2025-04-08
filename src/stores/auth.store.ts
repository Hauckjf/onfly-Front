
import { defineStore } from 'pinia'
import api from '../services/api'
import router from '../routers/index'
import Cookies from 'universal-cookie';
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const cookies = new Cookies();

function showToast(message: string, type: 'success' | 'error' = 'success') {
  Toastify({
    text: message,
    duration: 3000,
    gravity: 'top',
    position: 'right',
    backgroundColor: type === 'success' ? '#4caf50' : '#f44336',
    close: true
  }).showToast();
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: cookies.get('user') || null,
        token: cookies.get('token') || null
    }),
    actions: {
        async login(credentials: { email: string; password: string }) {
            try {
              const response = await api.post('/auth/login', credentials)
              this.token = response.data.access_token
              this.user = response.data.user
              
              if (this.token) {
                showToast('Login realizado com sucesso!')
                cookies.set('token', this.token)
                cookies.set('user', this.user)
                api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                router.push('/dashboard')
              }
            } catch (error: any) {
              if (error.response) {
                throw error.response.data
              }
              throw new Error('Network error')
            }
          },
        async register(userData: any) {
            try {
                const response = await api.post('/auth/register', userData)
                showToast('Usuario criado com sucesso!')
                this.token = response.data.token
                this.user = response.data.user
                
                router.push('/login') 
            } catch (error: any) {
                console.log(error.response.data)
            }
        },
        async logout() {
            try {
                await api.post('/auth/logout')
                showToast('Até logo!')
                cookies.remove('token')
                cookies.remove('user')
                this.token = null
                this.user = null
                router.push('/login')
            } catch (error: any) {
                throw error.response.data
            }
        },
        
    }
})