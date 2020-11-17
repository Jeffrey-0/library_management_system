import { request } from './request'

// 登录
// get请求测试
export function login (username, password) {
  return request({
    url:'users',
    params:{
      username,
      password
    }
  })
}

// post请求