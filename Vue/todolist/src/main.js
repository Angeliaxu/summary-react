import Vue from 'vue'
import Vuex from 'vuex'

import 'es6-promise/auto';

// import Todo from './App.vue'

import Count from './components/count.vue'

Vue.config.productionTip = false

// 在最开头的时候注入vuex
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        count:0
    },
    mutations:{
        increment(state){
            state.count++
        },
        decrement(state){
            state.count--
        }
    }
})

new Vue({
  render: h => h(Count),
  store
}).$mount('#app')
