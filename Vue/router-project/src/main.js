import Vue from 'vue'
// import App from './App.vue'
// import Nestroute from './components/nestRoute'
import namedView from './components/namedView'

import router from './router'
Vue.config.productionTip = false

new Vue({
  render: h => h(namedView),
  router
}).$mount('#app')
