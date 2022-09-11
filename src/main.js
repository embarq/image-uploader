import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

console.log(import.meta.env.PACKAGE_VERSION)

createApp(App).mount('#app')
