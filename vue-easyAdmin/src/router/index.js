import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import admin from '@/components/admin'
import project from '@/components/project'
import workbench from '@/components/workbench'
import document from '@/components/document'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        title: '个人管理后台'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '用户登录'
      }
    },
    {
      path: '/admin',
      component: admin,
      children: [
        {
          path: '/project',
          component: project,
          name: 'project',
          meta: {
            title: '我的项目',
            login: true
          }
        },
        {
          path: '/workbench',
          name: 'workbench',
          component: workbench,
          meta: {
            title: '我的工作台',
            login: true
          }
        },
        {
          path: '/document',
          name: 'document',
          component: document,
          meta: {
            title: '我的文档'
          }
        }
      ]
    },
    {
      path: '*',
      redirect: () => {
        return '/'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  // router.app就是Vue实例
  const token = router.app.$util.fetch('token')
  // 判断嵌套路由只要有一个需要登录都要登录
  if (to.matched.some((item) => item.meta.login)) {
    if (token.login) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.path.split('/')[1]
        }
      })
    }
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  if (to.meta.title) {
    window.document.title = to.meta.title
  } else {
    window.document.title = '个人管理后台'
  }
})
export default router
