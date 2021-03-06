// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import './scss/main.scss'
import App from './App'
import router from './router'
import utils from './libs/utils'
import fetch from './libs/axios'

// element-ui
import { 
  Button,
  Input,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Tag,
  Message,
  Loading
 } from 'element-ui'; 

Vue.config.productionTip = false

// 把工具函数挂在Vue的原型链上，Vue的组件实例可以通过this来拿到工具函数
Vue.prototype.$utils = '自定义属性'
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading
/*
  或者使用插件的模式,页面进来会加载插件
*/
// const obj = {
//   // 第一个参数Vue
//   install: function (vue, options) {
//     console.log(vue)
//     console.log(options)
//   }
// }
Vue.use(utils)

Vue.use(Button)
Vue.use(Input)
Vue.use(Tabs),
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(fetch)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
