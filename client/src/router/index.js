import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import list from '@/components/tab-list'
import details from '@/components/file-details.vue'
import information from '@/components/user-information'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/tab-list',
      name: 'tab-list',
      component: list
    },
    {
      path: '/file-details/:hash_name',
      name: 'file-details',
      component: details
    },
    {
      path: '/user-information',
      name: 'user-information',
      component: information
    }
  ]
})
//  校验登录
router.beforeEach((to, from, next) => {
  if (to.name === 'tab-list' || to.name === 'user-information') {
    if (!sessionStorage.username) {
      window.alert('请您重新登录')
      return window.location.replace('/')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
