import Vue from 'vue'
import Router from 'vue-router'
import Head from 'vue-head'
import Index from '@/views/Index'
import Dish from '@/views/Dish'
import CheckLogin from '@/views/CheckLogin'
import Search from '@/views/Search'
import isNil from 'lodash/isNil'
import store from '@/store'

Vue.use(Router)

/* If you don't know about VueHead, please refer to https://github.com/ktquez/vue-head */

Vue.use(Head, {
  complement: 'bento-starter'
})

/* If you don't know about VueRouter, please refer to https://router.vuejs.org/ */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/search/:query',
      name: 'search',
      component: Search,
      props: true,
      meta: {
        authNotRequired: true,
        dishEvent: true
      }
    },
    {
      path: '/dish/:id',
      name: 'dish',
      component: Dish,
      props: true,
      meta: {
        authNotRequired: true,
        dishEvent: true
      }
    },
    {
      path: '/check-login',
      name: 'check-login',
      component: CheckLogin,
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(
          /* webpackChunkName: "client-chunk-login" */
          '@/views/Login.vue'
        ),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

/**
 * Handle user redirections
 */
router.beforeEach((to, from, next) => {
  if (
    !(to.meta && to.meta.authNotRequired) &&
    isNil(store.state.authentication.user)
  ) {
    const path =
      store.state.authentication.user === null ? '/login' : '/check-login'
    return next(`${path}?redirectUrl=${to.path}`)
  }
  next()
})

export default router
