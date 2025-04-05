import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: AuthView,
    meta: { layout: 'login' }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { layout: 'register' }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: RegisterView,
    meta: { layout: 'dashboard' }
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router