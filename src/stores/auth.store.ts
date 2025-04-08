
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
    duration: type === 'success' ? 3000 : 6000,
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
              showToast('Email e/ou Senha Invalidos!', 'error')
            }
          },
        async register(userData: any) {
            try {
                const response = await api.post('/auth/register', userData)
                showToast('Usuario criado com sucesso!')
                router.push('/login') 
            } catch (error: any) {
                console.log(error.response.data.errors)
                if(error.response.data.errors.password.length > 0){
                    error.response.data.errors.password.forEach((element : any) => {
                      showToast(element, 'error')
                    });  
                }
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