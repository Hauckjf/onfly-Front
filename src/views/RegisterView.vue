<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const userData = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const errors = ref({})
const loading = ref(false)

async function handleRegister() {
  loading.value = true
  errors.value = {}
  
  try {
    await authStore.register(userData.value)
    router.push('/login') // Só redireciona após registro bem-sucedido
  } catch (error) {
    errors.value = error.errors || { general: 'Erro ao registrar' }
  } finally {
    loading.value = false
  }
}
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <a href="/" class="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
                <img class="mx-auto h-20 w-auto rounded-full" src="../assets/onfly_logo.jpg" alt="Workflow">
            </a>
            <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                Registrar sua conta
            </h2>
            <p class="mt-2 text-center text-sm leading-5 text-blue-500 max-w">
                Já tem uma conta?
                <a href="/login"
                    class="font-medium text-blue-500 uppercase hover:bg-blue-500 hover:text-white focus:outline-none focus:underline transition ease-in-out duration-150 p-2 rounded-full">
                    Fazer login
                </a>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form @submit.prevent="handleRegister">
                    <div v-if="errors.general" class="mb-4 text-red-500 text-sm">
                        {{ errors.general }}
                    </div>
                    
                    <div>
                        <label for="name" class="block text-sm font-medium leading-5 text-gray-700">Nome</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <input id="name" v-model="userData.name" name="name" type="text" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                :class="{ 'border-red-500': errors.name }">
                            <div v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name[0] }}</div>
                        </div>
                    </div>

                    <div class="mt-4">
                        <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Email</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <input id="email" v-model="userData.email" name="email" placeholder="seuemail@exemplo.com" type="email" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                :class="{ 'border-red-500': errors.email }">
                            <div v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email[0] }}</div>
                        </div>
                    </div>

                    <div class="mt-4">
                        <label for="password" class="block text-sm font-medium leading-5 text-gray-700">Senha</label>
                        <div class="mt-1 rounded-md shadow-sm">
                            <input id="password" v-model="userData.password" name="password" type="password" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                :class="{ 'border-red-500': errors.password }">
                            <div v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password[0] }}</div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <label for="confirmPassword" class="block text-sm font-medium leading-5 text-gray-700">Confirmação da Senha</label>
                        <div class="mt-1 rounded-md shadow-sm">
                            <input id="confirmPassword" v-model="userData.password_confirmation" name="confirmPassword" type="password" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                :class="{ 'border-red-500': errors.password_confirmation }">
                            <div v-if="errors.password_confirmation" class="text-red-500 text-xs mt-1">{{ errors.password_confirmation[0] }}</div>
                        </div>
                    </div>

                    <div class="mt-6">
                        <span class="block w-full rounded-md shadow-sm">
                            <button type="submit" :disabled="loading"
                                class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                                :class="{ 'opacity-50 cursor-not-allowed': loading }">
                                <span v-if="!loading">Registrar</span>
                                <span v-else>Processando...</span>
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RegisterView'
}
</script>