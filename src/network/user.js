import { request } from './request'
// 用户

// 修改用户信息
export function updateUser (user) {
  return request({
    // url: 'users/' + user.userId,
    url: 'update/user/' + user.userId,
    method: 'put',
    data: {
      id: user.id,
      userId: user.userId,
      userName: user.userName,
      userAge: user.userAge,
      userPassword: user.userPassword,
      userEmail: user.userEmail,
      userSex: user.userSex,
      userPhone: user.userPhone,
      userCategory: user.userCategory
    }
  })
}

// 修改密码
export function updateUserPass (userId, oldPassword, newPassword) {
  return request({
    url: 'update/userpassword',
    method: 'put',
    data: {
      userId,
      userPassword:oldPassword,
      newPassword
    }
  })
}
// export function updateUserPass (user) {
//   return request({
//     url: 'users/' + user.userId,
//     method: 'put',
//     data: {
//       id: user.id,
//       userId: user.userId,
//       userName: user.userName,
//       userAge: user.userAge,
//       userPassword: user.userPassword,
//       userEmail: user.userEmail,
//       userSex: user.userSex,
//       userPhone: user.userPhone,
//       userCategory: user.userCategory
//     }
//   })
// }
