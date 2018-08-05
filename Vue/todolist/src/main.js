import Vue from 'vue'
import Todo from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Todo)
}).$mount('#app')
