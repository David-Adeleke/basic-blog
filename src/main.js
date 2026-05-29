import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'
import './assets/styles/main.css'
import './assets/styles/animation.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
