<template>
    <div class="flex flex-col w-full min-h-dvh bg-back-50">
        <div class="w-full flex flex-col bg-white dark:bg-gray-900 border-b border-b-gray-200">
            <div class="flex flex-col md:flex-row items-center justify-between p-4">
                <div class="flex items-center gap-4 w-full md:w-auto">
                    <a href="/dashboard" class="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
                        <img class="h-12 w-12 rounded-full" src="../assets/onfly_logo.jpg" alt="Workflow">
                        <h1 class="text-lg font-semibold">Onfly</h1>
                    </a>
                    <button @click="isModalOpen = true, isCreate = true"
                        class="bg-blue-600 hover:bg-blue-400 text-white flex items-center gap-2 py-2 px-4 rounded-lg shadow-md ml-4">
                        <span>Criar Pedido</span>
                    </button>
                </div>

                <div class="mt-4 md:mt-0 w-full md:w-auto flex justify-end">
                    <button
                        class="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-400 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" viewBox="0 0 24 24"
                            class="mr-1">
                            <path fill="currentColor"
                                d="M15 2h-1c-2.828 0-4.243 0-5.121.879C8 3.757 8 5.172 8 8v8c0 2.828 0 4.243.879 5.121C9.757 22 11.172 22 14 22h1c2.828 0 4.243 0 5.121-.879C21 20.243 21 18.828 21 16V8c0-2.828 0-4.243-.879-5.121C19.243 2 17.828 2 15 2"
                                opacity=".6"></path>
                            <path fill="currentColor"
                                d="M8 8c0-1.538 0-2.657.141-3.5H8c-2.357 0-3.536 0-4.268.732S3 7.143 3 9.5v5c0 2.357 0 3.535.732 4.268S5.643 19.5 8 19.5h.141C8 18.657 8 17.538 8 16z"
                                opacity=".4"></path>
                            <path fill="currentColor" fill-rule="evenodd"
                                d="M4.47 11.47a.75.75 0 0 0 0 1.06l2 2a.75.75 0 0 0 1.06-1.06l-.72-.72H14a.75.75 0 0 0 0-1.5H6.81l.72-.72a.75.75 0 1 0-1.06-1.06z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span>Sair</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="flex-1 overflow-auto">
            <div class="w-full h-full flex flex-col bg-white dark:bg-gray-900 p-4">
                <div class="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
                    <header class="flex flex-col">
                        <h1 class="text-xl font-bold">Suas viagens a trabalho mais eficientes e transparentes</h1>
                        <h5 class="text-sm text-gray-600"></h5>
                    </header>

                    <div class="w-full md:max-w-3xl flex flex-wrap gap-2">
                        <div class="flex flex-col flex-1 min-w-[120px]">
                            <label class="text-sm font-medium text-gray-600">Status</label>
                            <select v-model="selectedStatus"
                                class="border rounded-lg px-3 py-2 text-sm w-full focus:border-blue-500 outline-none">
                                <option value="">Todos</option>
                                <option value="solicitado">Solicitado</option>
                                <option value="aprovado">Aprovado</option>
                                <option value="concluido">Concluído</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>

                        <div class="flex flex-col flex-1 min-w-[120px]">
                            <label class="text-sm font-medium text-gray-600">Destino</label>
                            <input type="text" v-model="destino" placeholder="Digite o destino"
                                class="border rounded-lg px-3 py-2 text-sm w-full focus:border-blue-500 outline-none" />
                        </div>

                        <div class="flex flex-col flex-1 min-w-[120px]">
                            <label class="text-sm font-medium text-gray-600">Período - Início</label>
                            <input type="datetime-local" v-model="dataInicio"
                                class="border rounded-lg px-3 py-2 text-sm w-full focus:border-blue-500 outline-none" />
                        </div>

                        <div class="flex flex-col flex-1 min-w-[120px]">
                            <label class="text-sm font-medium text-gray-600">Período - Fim</label>
                            <input type="datetime-local" v-model="dataFim"
                                class="border rounded-lg px-3 py-2 text-sm w-full focus:border-blue-500 outline-none" />
                        </div>

                        <div class="flex items-end min-w-[80px]">
                            <button @click="buscarPedidos"
                                class="bg-blue-600 hover:bg-blue-400 text-white flex items-center gap-2 py-2 px-4 rounded-lg shadow-md w-full justify-center">
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>

                <div class="flex-1 overflow-auto">
                    <div class="overflow-x-auto">
                        <table class="min-w-full bg-white border">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 h-6 sticky top-0 z-10">
                                <tr>
                                    <th class="px-2 py-3 bg-gray-200">ID</th>
                                    <th class="px-2 py-3 bg-gray-200">Nome</th>
                                    <th class="px-2 py-3 bg-gray-200">Destino</th>
                                    <th class="px-2 py-3 bg-gray-200">Data Ida</th>
                                    <th class="px-2 py-3 bg-gray-200">Data Volta</th>
                                    <th class="px-2 py-3 bg-gray-200">Status</th>
                                    <th class="px-2 py-3 bg-gray-200">Ações</th>
                                </tr>
                            </thead>
                            <tbody class="select-none">
                                <tr class="border-b">
                                    <td class="px-2 py-1.5 whitespace-nowrap text-sm text-center">1</td>
                                    <td class="px-2 py-1.5 whitespace-nowrap text-sm text-center">Fabio Dias Hauck</td>
                                    <td class="px-2 py-1.5 whitespace-nowrap text-sm text-center">Rio de Janeiro/RJ</td>
                                    <td class="px-2 py-1.5 whitespace-nowrap text-sm text-center">05/04/2025</td>
                                    <td class="px-2 py-1.5 whitespace-nowrap text-sm text-center">09/04/2025</td>
                                    <td class="px-2 py-1.5 whitespace-nowrap text-sm text-center">
                                        <span
                                            class="text-xs font-bold me-2 px-2.5 shadow py-1 bg-green-200 text-green-600 font-semibold rounded-lg">Concluido</span>
                                    </td>
                                    <td
                                        class="px-2 py-1.5 whitespace-nowrap text-sm flex justify-center items-center gap-2">
                                        <button @click="isModalOpen = true, isCreate = false"
                                            class="flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            Editar
                                        </button>
                                        <button
                                            class="flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            Cancelar
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
                <img class="mx-auto h-20 w-auto rounded-full" src="../assets/onfly_logo.jpg" alt="Workflow">
                <h2 class="text-xl font-bold mb-4 text-center">Criar Pedido</h2>
                <form>
                    <div>
                        <label for="name" class="block text-sm font-medium leading-5 text-gray-700">Destino</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <input id="name" name="name" type="text" required="" value=""
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
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
                        <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Data de Ida</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <input id="dateStart" type="datetime-local"
                                class="border border-gray-300 rounded-md px-3 py-2 w-full" />
                            <div class="hidden absolute inset-y-0 right-6 pr-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4">
                        <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Data de
                            Volta</label>
                        <div class="mt-1 relative rounded-md shadow-sm">
                            <input id="dateStart" type="datetime-local"
                                class="border border-gray-300 rounded-md px-3 py-2 w-full" />
                            <div class="hidden absolute inset-y-0 right-6 pr-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div class="block mt-4 row w-full">
                        <span class="flex flex-col sm:flex-row gap-2">
                            <button type="submit" v-if="isCreate"
                                class="flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">
                                Registrar
                            </button>
                            <button type="submit" v-if="!isCreate"
                                class="flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out">
                                Editar
                            </button>
                            <button @click="isModalOpen = false"
                                class="flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out">
                                Voltar
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isModalOpen = ref(false)
const isCreate = ref(false)
const selectedStatus = ref('')
const destino = ref('')
const dataInicio = ref('')
const dataFim = ref('')

function buscarPedidos() {
    console.log('Status:', selectedStatus.value)
    console.log('Destino:', destino.value)
    console.log('Data início:', dataInicio.value)
    console.log('Data fim:', dataFim.value)
}

defineOptions({
    name: 'Dashboard'
})
</script>