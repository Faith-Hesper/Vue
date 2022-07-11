import { createRouter,createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Main',
    redirect: '/home',
    component: ()=>import ('@/views/Main.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: ()=>import ('@/views/Home.vue')
      },
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