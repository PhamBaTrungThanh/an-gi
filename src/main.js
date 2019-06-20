import Vue from 'vue'

import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/misc/register-service-worker'
import '@/misc/handle-network-status'
import '@/firebase/init'
import '@/firebase/authentication'
import '@/misc/handle-apple-install-prompt'
import 'pwacompat'
import '@/assets/css/variables.css'
import '@/assets/css/tailwind.css'
import '@/assets/css/custom-markers.css'

sync(store, router)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
