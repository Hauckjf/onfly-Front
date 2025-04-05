<template>
    <div class="h-full w-full">
    <div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div class="mb-12 justify-self-center text-center">
          <img 
          src="../assets/onfly_logo.jpg"
          alt="Logo"
          class="mx-auto h-32 w-auto rounded-full"
          >
          <h1 class="mt-4 text-3xl font-bold text-gray-900">ONFLY</h1>
        <h3 class="mt-4 text-1xl font-bold text-gray-900">Gerencie suas viagens corporativas</h3>
      </div>
  
      <div class="w-full max-w-xs space-y-4">
        <a 
          href="/login"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Entrar
        </a>
        
        <a
          href="/register" 
          class="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Criar Conta
        </a>
      </div>
    </div>
</div>
  </template>

  <script>
  export default {
      name: 'HomeView'
  }
  </script>