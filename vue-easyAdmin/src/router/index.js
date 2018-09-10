import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import admin from '@/components/admin'
import project from '@/components/project'
import workbench from '@/components/workbench'
import document from '@/components/document'

Vue.use(Router)

const token = window.localStorage.getItem('token')

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
      // meta: {
      //   title: '后台管理'
      // },
      children: [
        {
          path: '/project',
          component: project,
          name: 'project',
          meta: {
            title: '我的项目'
          }
        },
        {
          path: '/workbench',
          name: 'workbench',
          component: workbench,
          meta: {
            title: '我的工作台'
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
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to)
  if (!token && (to.path === '/project' || to.path === '/workbench')) {
    if (to.path === '/project' && to.query) {
      next('/login?redirect=project')
    } else if (to.path === '/workbench' && to.query) {
      next('/login?redirect=workbench')
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
