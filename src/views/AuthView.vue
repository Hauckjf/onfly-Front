<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import { useRouter } from 'vue-router'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const authStore = useAuthStore()
const router = useRouter()

// Remove cookies quando o componente é montado
onMounted(() => {
    if(cookies.get('token'))
    {
       authStore.logout()
    }
})

const credentials = ref({
  email: '',
  password: '',
  remember: false
})
const errors = ref({})
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  errors.value = {}
  try {
    await authStore.login(credentials.value)
    router.push('/dashboard')
  } catch (error) {
    errors.value = error.errors || { general: 'Credenciais inválidas' }
  } finally {
    loading.value = false
  }
}
</script>

<template>
    <div class="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">

            <a href="/" class="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
                <img class="mx-auto h-20 w-auto rounded-full" src="../assets/onfly_logo.jpg" alt="Workflow">
            </a>
            <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                Acessar sua conta
            </h2>
            <p class="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
                Ainda não tem conta?
                <a href="/register"
                    class="font-medium text-blue-500 uppercase hover:bg-blue-500 hover:text-white focus:outline-none focus:underline transition ease-in-out duration-150 p-2 rounded-full">
                    Cadastre-se aqui
                </a>
            </p>
        </div>


        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form @submit.prevent="handleLogin">
                    <div>
                        <label for="email" class="block text-sm font-medium leading-5  text-gray-700">Email</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <input id="email" v-model="credentials.email" type="email" required autocomplete="email"
                                placeholder="seuemail@exemplo.com" :class="[
                                    'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm',
                                    errors.email ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' :
                                        'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                ]" />
                            <div class="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4">
                        <label for="password" class="block text-sm font-medium leading-5 text-gray-700">Senha</label>
                        <div class="mt-1 rounded-md shadow-sm">
                            <input id="password" v-model="credentials.password" type="password" required
                                autocomplete="current-password" :class="[
                                    'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm',
                                    errors.password ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' :
                                        'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                ]" />
                            <div v-if="errors.password"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password }}</p>
                    </div>

                    <div class="mt-4 flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember_me" v-model="credentials.remember" type="checkbox"
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <label for="remember_me" class="ml-2 block text-sm text-gray-900">Lembrar-me</label>
                        </div>

                        <div class="text-sm leading-5">
                            <a href="#"
                                class="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                                Esqueceu a senha?
                            </a>
                        </div>
                    </div>

                    <div class="mt-4">
                        <span class="block w-full rounded-md shadow-sm">
                            <button type="submit" :disabled="loading"
                                class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                {{ loading ? 'Carregando...' : 'Acessar' }}
                            </button>
                        </span>
                    </div>
                </form>
                <div v-if="errors.general" class="text-red-500 text-sm mt-2">
                    {{ errors.general }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AuthView'
}
</script>