<<<<<<< HEAD
import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入elementUi插件
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import moment from 'moment' // 时间格式化

//引入mavon-editor插件
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
//引用js文件
// import'./assets/js/jquery.min.js'

//引入mavon-editor插件
Vue.use(mavonEditor)

//引入elementUi插件
Vue.use(ElementUI)

Vue.prototype.$eventBus = new Vue()
Vue.prototype.$eventBusTag = new Vue()
Vue.prototype.$eventBusiIcon = new Vue()
Vue.prototype.$moment = moment
Vue.config.productionTip = false

Vue.prototype.$baseImgUrl = 'http://127.0.0.1:3000'
// Vue.prototype.$baseImgUrl = 'D:/图片/'

Vue.prototype.$user = Object.assign({
    id: '',
    userId: '',
    userName: '',
    userAge: '',
    userPassword: 'aA@000000',
    userEmail: '',
    userSex: '',
    userPhone: '',
    userCategory: ''
}, JSON.parse(window.sessionStorage.getItem('user')))


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

// 配置代理，解决跨域
Vue.prototype.HOST = {
    target: 'http://127.0.0.1:3000',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
}

// 保存登录用户的信息
=======
import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import moment from 'moment' // 时间格式化

Vue.use(ElementUI)

Vue.prototype.$eventBus = new Vue()
Vue.prototype.$eventBusTag = new Vue()
Vue.prototype.$eventBusiIcon = new Vue()
Vue.prototype.$moment = moment
Vue.config.productionTip = false

// Vue.prototype.$baseImgUrl = 'http://127.0.0.1:8081'
Vue.prototype.$baseImgUrl = 'http://xfz.zone:5000/library'
// Vue.prototype.$baseImgUrl = 'D:/图片/'

Vue.prototype.$user = Object.assign({
  id: '',
  userId: '',
  userName: '',
  userAge: '',
  userPassword: '',
  userEmail: '',
  userSex: '',
  userPhone: '',
  userCategory: ''
}, JSON.parse(window.sessionStorage.getItem('user')))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 配置代理，解决跨域
Vue.prototype.HOST = {
  target: 'http://127.0.0.1:3000',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}

// 保存登录用户的信息
>>>>>>> 09c9168d4f7ecbd49e633406c551332b111bf4b5
