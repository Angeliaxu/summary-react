import Vue from 'vue'
import App from './App.vue'
import Nestroute from './components/nestRoute'

import router from './router'
Vue.config.productionTip = false

new Vue({
  render: h => h(Nestroute),
  router
}).$mount('#app')
