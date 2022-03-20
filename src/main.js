import { createApp } from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css'
import './assets/css/comman.css'
import {
  Location,
  Document,
  Menu as IconMenu,
  Expand,
  Fold,
  Setting,
} from '@element-plus/icons-vue'

const app = createApp(App)

app.component('location',Location)
app.component('document',Document)
app.component('icon-menu',IconMenu)
app.component('setting',Setting)
app.component('expand',Expand)
app.component('fold',Fold)


app.mount('#app')
