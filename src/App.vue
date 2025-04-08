<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthView from '../src/views/AuthView.vue'
import RegisterView from '../src/views/RegisterView.vue'
import HomeView from '../src/views/HomeView.vue'
import DashboardView from '../src/views/DashboardView.vue'
import { useLoadingStore } from './stores/loading.store'
const loadingStore = useLoadingStore()

const route = useRoute()

const layout = computed(() => {
  return route.meta.layout === 'login' ? AuthView :
    route.meta.layout === 'register' ? RegisterView :
      route.meta.layout === 'dashboard' ? DashboardView : HomeView

})
</script>

<template>
  <div class="fixed inset-0 overflow-hidden">
    <div v-if="loadingStore.isLoading" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="w-16 h-16 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
    </div>
    <component :is="layout" class="h-full w-full">
      <router-view class="h-full w-full" />
    </component>
  </div>
</template>

