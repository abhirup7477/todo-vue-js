import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

let app = null

export function mount(el) {
  app = createApp(App)
  app.use(router)
  app.mount(el)
}

export function unmount() {
  if (app) {
    app.unmount()
    app = null
  }
}

if (!window.__MICRO_FRONTEND_HOST__) {
  mount('#app')
}

export {mount}