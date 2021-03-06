<<<<<<< HEAD
import axios from 'axios'
export function request(config) {
    // 1.创建axios实例
    const instance = axios.create({
        // baseURL: 'http://127.0.0.1:8081',
        // baseURL: 'http://120.79.198.193:8081',
        baseURL: 'http://127.0.0.1:3000',

        timeout: 10000
    })

    // 2.axios的拦截器
    instance.interceptors.request.use(config => {
        if (window.sessionStorage.getItem('user')) {
            config.headers.sessionId = JSON.parse(window.sessionStorage.getItem('user')).userId
            console.log('axiso拦截', config.headers.sessionId)
        }

        if (config.method !== 'get') {
            if (config.url != '/UploadFile') {
                config.headers.ContentType = 'application/x-www-form-urlencoded'
                    // config.headers.ContentType = 'Multipart/form-data'
                config.transformRequest = [function(data) {
                    let ret = ''
                    for (const it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }]
            }
        }
        return config
    }, err => {
        console.log(err)
    })

    // 2.2响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err + '错误')
            // return err
    })

    // 3.发出真正网络请求
    return instance(config)
}
=======
import axios from 'axios'
export function request (config) {
  // 1.创建axios实例
  const instance = axios.create({
    // baseURL: 'http://127.0.0.1:8081',
    baseURL: 'http://120.79.198.193:8081',
    // baseURL: 'http://127.0.0.1:3000',

    timeout: 10000
  })

  // 2.axios的拦截器
  instance.interceptors.request.use(config => {
    if (window.sessionStorage.getItem('user')) {
      config.headers.sessionId = JSON.parse(window.sessionStorage.getItem('user')).userId
      console.log('axiso拦截', config.headers.sessionId)
    }

    if (config.method !== 'get') {
      if (config.url !== '/UploadFile') {
        config.headers.ContentType = 'application/x-www-form-urlencoded'
        // config.headers.ContentType = 'Multipart/form-data'
        config.transformRequest = [function (data) {
          let ret = ''
          for (const it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }]
      }
    }
    return config
  }, err => {
    console.log(err)
  })

  // 2.2响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err + '错误')
    // return err
  })

  // 3.发出真正网络请求
  return instance(config)
}
>>>>>>> 09c9168d4f7ecbd49e633406c551332b111bf4b5
