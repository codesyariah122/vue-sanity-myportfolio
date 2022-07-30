import {
  createApp
} from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vue3MobileDetection from 'vue3-mobile-detection'

import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import '@/assets/gsap.min.js'

const app = createApp(App)

app.use(store).use(router).use(Vue3MobileDetection).use(VueAxios, axios).mount('#app')