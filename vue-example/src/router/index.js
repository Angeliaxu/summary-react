import Vue from 'vue'
import Router from 'vue-router'
// import App from '@/App'
import home from '@/components/home'
import document from '@/components/document'
import about from '@/components/about'
import study from '@/components/study'
import hobby from '@/components/hobby'
import work from '@/components/work'
import notFound from '@/components/404'
// import navigator from '@/components/navigator'

Vue.use(Router)
// 默认是hash模式,低版本使用hash模式，高版本使用history模式(html5 API),
export default new Router({
  mode: 'history',
  // 路由点击高亮的别名,可以单独为routerLink设置active-class来显示当前路由的样式，给routerview设置class，class类名会传递给匹配组件的根节点
  linkActiveClass: 'is-active',
  routes: [
    // {
    //   path: '/',
    //   name: 'navigator',
    //   component: navigator
    // },
    {
      path: '/home',
      name: 'home',
      component: home,
      alias: '/index' // 当地址栏中输入/index，会出现/home对应的路由。与重定向不同的是重定向会替换路由地址，但是这个不会
      // 同时，还有一个问题需要注意，当前路由的链接样式linkactive的样式。
    },
    {
      path: '/document',
      name: 'document',
      component: document
    },
    {
      path: '/about',
      component: about,
      children: [
        /* 
          to="/about/hobby"
          使用:to="{name: 'hobby'}"和嵌套路由结合使用的时候
          子路由前要加上/，在地址栏上显示的就是/hobby，而不是
          /about/hobby
        */
        {
          path: '/study',
          component: study,
          name: 'study'
        },
        {
          path: '/hobby',
          component: hobby,
          name: 'hobby'
        },
        {
          path: '',
          /* 
          path为空设置为默认显示组件，如果一个嵌套路由有默认的子路由，
          那么这个嵌套路由不能有name属性。name属性得给默认的子路由 
          否则路由跳转的时候使用:to="{name: 'about'}" name属性，/about默认的子路由不会被渲染出来
          */ 
          name: 'about',
          component: work
        }
      ]
    },
    // {
    //   path: '/404',
    //   component: notFound
    // },
    {
      /* 当所输入的路由从上至下找不到的时候，重定向到某个页面或者直接显示404 */
      path: '*',
      // component: notFound
      /* 重定向 */
      // redirect: home
      /* 
      动态设置重定向
      */
     redirect:(to) => {
      // 接受一个参数,参数就是目标路由，根据判断to的属性来重定向路由
      console.log(to);
      // 记得一定要return
      return '/home'
     }
    }
  ]
})