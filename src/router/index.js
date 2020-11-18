import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/user/Index.vue'

import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'index',
        component: Login
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/index5',
        name: 'index',
        component: Index
    },
    {
        path: '/index6',
        name: 'index',
        component: Index
    }
]
const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    // routes
    routes,
    mode: 'history'
})

export default router