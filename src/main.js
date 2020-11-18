import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

// 配置代理，解决跨域
Vue.prototype.HOST = {
  target: 'http://127.0.0.1:3000',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}
