import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

const app = createApp(App)

app.use(store).use(router).mount('#app')
