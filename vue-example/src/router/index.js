import Vue from 'vue'
import Router from 'vue-router'
// import App from '@/App'
import home from '@/components/home'
import document from '@/components/document'
import about from '@/components/about'
import study from '@/components/study'
import hobby from '@/components/hobby'
import work from '@/components/work'
// import notFound from '@/components/404'
import slider from '@/components/slider'
import user from '@/components/user'
// import navigator from '@/components/navigator'

Vue.use(Router)
// 默认是hash模式,低版本使用hash模式，高版本使用history模式(html5 API),
export default new Router({
  mode: 'history',
  // 路由点击高亮的别名,可以单独为routerLink设置active-class来显示当前路由的样式，给routerview设置class，class类名会传递给匹配组件的根节点
  linkActiveClass: 'is-active',
  /* 滚动行为:这个功能只在支持 history.pushState 的浏览器中可用
    scrollBehavior只会在导航切换和浏览器前进后退的时候触发，其中
    savePosition只会在浏览器前进和后退才会存在。
  */
  scrollBehavior: (to, from, savePosition) => {
    // to目标路由，from从哪个路由过来
    /* 就像原生浏览器表现的一样，导航切换滚动条始终在当前页面顶部
      浏览器导航滚动条在滚动的位置
    */
  //  console.log(to);
    // if(savePosition) {
    //   return savePosition
    // } else {
    //   return {x:0, y:0}
    // }
    // 或者使用hash来导航
    // if(to.hash) {
    //   return {
    //     selector: to.hash
    //   }
    // }
  },
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
      meta: {
        title: '主页'
      },
      alias: '/index' // 当地址栏中输入/index，会出现/home对应的路由。与重定向不同的是重定向会替换路由地址，但是这个不会
      // 同时，还有一个问题需要注意，当前路由的链接样式linkactive的样式。
    },
    {
      path: '/document',
      name: 'document',
      meta: {
        title: '文档页'
      },
      // component: document
      // 命名视图，左边是侧边栏导航,根据给router-view不同的名字
      // 来给出口渲染。
      components: {
        default: document,
        slider
      }
    },
    {
      path: '/about',
      component: about,
      // 嵌套路由
      children: [
        /*
          to="/about/hobby"
          使用:to="{name: 'hobby'}"和嵌套路由结合使用的时候
          子路由前要加上/，在地址栏上显示的就是/hobby，url路由不嵌套，但是
          组件是嵌套的，而不是
          /about/hobby
        */
        {
          path: '/study',
          /*
            若study是字符串，则是相对于about导航，但是加上/则是相对于
            根路径导航。
          */
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
          /* path为空设置为默认显示组件，如果一个嵌套路由有默认的子路由，
              那么这个嵌套路由不能有name属性。name属性得给默认的子路由 
              否则路由跳转的时候使用:to="{name: 'about'}" name属性，/about默认的子路由不会被渲染出来
          */
          name: 'about',
          meta: {
            title: '关于我们页'
          },
          component: work
        }
      ]
    },
    // {
    //   path: '/404',
    //   component: notFound
    // },
    {
      // 动态路由展示，若在地址栏里面直接访问/user是会重定向到home页
      /*
        那是因为在路由配置当中没有配置对应的组件
        此时是动态路由展示，path后面的字符串相当于
        正则表达式。在后面加一个？表示最多1个最少可以
        为0个
      */
      path: '/user/:id?',
      component: user,
      meta: {
        title: '用户页'
      }
    },
    {
      /* 当所输入的路由从上至下找不到的时候，重定向到某个页面或者直接显示404 */
      path: '*',
      // component: notFound
      /* 重定向 */
      // redirect: home
      /*
      动态设置重定向
      */
      redirect: (to) => {
      // 接受一个参数,参数就是目标路由，根据判断to的属性来重定向路由
      // console.log(to);
      // 记得一定要return
        return '/home'
      }
    }
  ]
})
