import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dotenv from 'dotenv'
dotenv.config()

import './assets/css/style.css';

createApp(App).use(store).use(router).mount('#app')
