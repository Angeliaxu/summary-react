import Vue from 'vue'
import Vuex from 'vuex'

import 'es6-promise/auto';

// import Todo from './App.vue'
import Count from './components/count.vue'
// import asynccompenent from './components/asyncCompenent.vue'
// import boundarycompenent from './components/boundaryComponent.vue'

import store from './store'

Vue.config.productionTip = false

// 在最开头的时候注入vuex
Vue.use(Vuex)

new Vue({
  render: h => h(Count),
  store,
  data:{
    foo: 1
  }
}).$mount('#app')
