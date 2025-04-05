<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthView from '../src/views/AuthView.vue'
import RegisterView from '../src/views/RegisterView.vue'
import HomeView from '../src/views/HomeView.vue'
import DashboardView from './views/DashboardView.vue'

const route = useRoute()

const layout = computed(() => {
   return route.meta.layout === 'login' ? AuthView : 
   route.meta.layout === 'register' ? RegisterView : 
   route.meta.layout === 'dashboard' ? DashboardView : HomeView
   
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>