import { request } from './request'

// 登录
// get请求测试
export function loginT (id, password) {
  return request({
    url: 'users',
    params: {
      userId: id,
      userPassword: password
    }
  })
}

// post请求
export function login (id, password) {
  return request({
    // url: 'users',
    url: 'login',
    method: 'post',
    data: {
      userId: id,
      userPassword: password
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
      // 设置未form-data数据
    },
    // 格式化数据
    transformRequest: [function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      
      return ret
    }]
  })
}

// post请求
export function logon (id, username, password, email) {
  return request({
    // TODO
    // url: 'users',
    url: 'logon',
    method: 'post',
    data: {
      userId: id,
      userName: username,
      userPassword: password,
      userEmail: email
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
      // 设置未form-data数据
    },
    // 格式化数据
    transformRequest: [function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

// 判断userId是否存在
export function CheckuserId (id) {
  return request({
    // url: 'users',
    url: 'CheckuserId',
    method: 'post',
    data: {
      userId: id
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
      // 设置未form-data数据
    },
    // 格式化数据
    transformRequest: [function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}

// 判断userEmail是否存在
export function CheckuserEmail (userEmail) {
  return request({
    // url: 'users',
    url: 'CheckuserEmail',
    method: 'post',
    data: {
      userEmail: userEmail
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
      // 设置未form-data数据
    },
    // 格式化数据
    transformRequest: [function (data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}
