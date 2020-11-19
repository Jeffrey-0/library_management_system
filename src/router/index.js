import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/user/Index.vue'

import Home from '../views/admin/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'index',
        component: Index
    },
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
                    import ('../views/user/Info.vue')
            },
            {
                path: 'bookshelf',
                component: () =>
                    import ('../views/user/Bookshelf.vue')
            },
            {
                path: 'history',
                component: () =>
                    import ('../views/user/History.vue')
            },
            {
                path: 'library',
                component: () =>
                    import ('../views/user/Library.vue')
            },
            {
                path: 'notice',
                component: () =>
                    import ('../views/user/Notice.vue')
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

export default router