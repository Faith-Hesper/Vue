import { createRouter,createWebHistory } from 'vue-router'
import Home from '@/views/Home'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/statistic',
        name: 'map',
        component: ()=>import ('@/components/MapContainer/MapContainer.vue')
      },
      {
        path: '/quakeInformation',
        name: 'quakeInformation',
        component: ()=>import ('@/views/EarthquakeInformation/EarthquakeInformation.vue')
      },
      {
        path: '/themetic',
        name: 'themetic',
        component: ()=>import ('@/views/HeatMap')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router