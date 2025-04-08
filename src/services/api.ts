import axios, { type AxiosInstance } from 'axios'
import { useAuthStore } from '../stores/auth.store'
import { useLoadingStore } from '../stores/loading.store'

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

api.interceptors.request.use(config => {
  const authStore = useAuthStore()
  const loadingStore = useLoadingStore()

  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }

  loadingStore.startLoading()
  return config
})

api.interceptors.response.use(
  response => {
    const loadingStore = useLoadingStore()
    loadingStore.stopLoading()
    return response
  },
  error => {
    const loadingStore = useLoadingStore()
    loadingStore.stopLoading()

    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default api
