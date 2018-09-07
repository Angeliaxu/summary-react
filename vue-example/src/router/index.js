import Vue from 'vue'
import Router from 'vue-router'
// import App from '@/App'
import home from '@/components/home'
import document from '@/components/document'
import about from '@/components/about'
import study from '@/components/study'
import hobby from '@/components/hobby'
import work from '@/components/work'

Vue.use(Router)
// 默认是hash模式,低版本使用hash模式，高版本使用history模式(html5 API),
export default new Router({
  mode: 'history',
  // 路由点击高亮的别名,可以单独为routerLink设置active-class来显示当前路由的样式，给routerview设置class，class类名会传递给匹配组件的根节点
  linkActiveClass: 'is-active',
  routes: [
    // {
    //   path: '/',
    //   name: 'App',
    //   component: App
    // },
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
