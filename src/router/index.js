import { createRouter,createWebHashHistory } from 'vue-router'
import App from '@/App.vue'
import HeatMap from '@/views/HeatMap'
import Home from '@/views/Home'

const routes = [
  {
    path: '/',
    name: 'App',
    redirect: '/home',
    component: App
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/heatmap',
    name: 'heatMap',
    component: HeatMap
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router