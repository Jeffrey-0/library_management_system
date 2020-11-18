import axios from 'axios'
export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    // baseURL: 'http://127.0.0.1:8080',
    baseURL: 'http://127.0.0.1:3000',

    timeout: 10000
  })

  // 2.axios的拦截器
  instance.interceptors.request.use(config => {
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