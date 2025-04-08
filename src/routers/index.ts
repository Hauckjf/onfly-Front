import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/AuthView.vue'),
    meta: { layout: 'login', guestOnly: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: { layout: 'register', guestOnly: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { layout: 'dashboard', requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  console.log(to.path);
  if (to.meta.requiresAuth) {
    if (!authStore.token) {
      if (to.path === '/login') {
        next('/login')
      }
      else if(to.path === '/register') {
      console.log(to.path);

        next('/register')
      }
      else {
        next('/login')
      }
    } else {
      next()
    }
    return
  }

  if (to.meta.guestOnly && authStore.token) {
    next('/dashboard')
    return
  }

  next()
})

export default router