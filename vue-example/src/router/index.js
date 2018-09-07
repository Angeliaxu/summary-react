import Vue from 'vue'
import Router from 'vue-router'
import navigator from '@/components/navigator'
import home from '@/components/home'
import document from '@/components/document'
import about from '@/components/about'
import study from '@/components/study'
import hobby from '@/components/hobby'
import work from '@/components/work'

Vue.use(Router)
// 默认是hash模式,低版本使用hash模式，高版本使用history模式(html5 API)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'navigator',
      component: navigator
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/document',
      name: 'document',
      component: document
    },
    {
      path: '/about',
      name: 'about',
      component: about,
      children: [
        {
          path: 'study',
          component: study
        },
        {
          path: 'hobby',
          component: hobby
        },
        {
          path: 'work',
          component: work
        }
      ]
    }
  ]
})
