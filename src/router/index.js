import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/user/Index.vue'

import Home from '../views/admin/Home.vue'
import User from '../views/admin/User.vue'
import Books from '../views/admin/Books.vue'
import Notice from '../views/admin/Notice.vue'
import Login from '../views/Login.vue'
import HelloWorld from '../components/HelloWorld.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/user',
  name: 'user',
  component: User
},
{
  path: '/home',
  name: 'home',
  component: Home
},
{
  path: '/books',
  name: 'books',
  component: Books
},
{
  path: '/notice',
  name: 'notice',
  component: Notice
},
{
  path: '/helloWorld',
  name: 'HelloWorld',
  component: HelloWorld
},
{
  path: '/1',
  name: 'index',
  component: Index
},
{ path: '*', redirect: '/index' },
{
  path: '/login',
  name: 'login',
  component: Login
},
{
  path: '/index',
  name: 'index',
  component: Index,
  children: [{
    path: 'info',
    component: () =>
      import('../views/user/Info.vue')
  },
  {
    path: 'bookshelf',
    component: () =>
      import('../views/user/Bookshelf.vue')
  },
  {
    path: 'history',
    component: () =>
      import('../views/user/History.vue')
  },
  {
    path: 'library',
    component: () =>
      import('../views/user/Library.vue')
  },
  {
    path: 'notice',
    component: () =>
      import('../views/user/Notice.vue')
  },

  {
    path: '',
    component: () =>
      import('../views/user/Library.vue'),
    default: true
  }
  ]
},
{
  path: '/home',
  name: 'home',
  component: Home
}
]
const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  // routes
  routes,
  mode: 'history'
})

// 挂载路由导航守卫，如果用户未登陆，则跳转到登录页面
router.beforeEach((to, form, next) => {
  if (to.path === '/login') {
    return next()
  }
  const user = window.sessionStorage.getItem('user')
  console.log('tooken', user)
  if (!user) {
    return next('/login')
  } else {
    return next()
  }
})
export default router
