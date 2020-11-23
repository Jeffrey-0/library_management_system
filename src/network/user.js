import { request } from './request'
// 分页查找用户
export function SelectUser(page, rows) {
    return request({
        url: 'users',
        params: {
            _page: page,
            _limit: rows
        }
    })
}

export function SelectFuzzy(userName, page = 1, rows = 5) {
    console.log(userName, page, rows)
    return request({
        url: 'users',
        params: {
            userName_like: userName,
            _page: page,
            _limit: rows
        }
    })
}


// 修改用户信息
export function updateUser(user) {
    return request({
        // url: 'users/' + user.userId,
        url: 'update/user/',
        method: 'post',
        data: {
            // id: user.id,
            userId: user.userId,
            userName: user.userName,
            userAge: user.userAge,
            userPassword: user.userPassword,
            userEmail: user.userEmail,
            userSex: user.userSex,
            userPhone: user.userPhone,
            userCategory: user.userCategory
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
                // 设置未form-data数据
        },
        // 格式化数据
        transformRequest: [function(data) {
            let ret = ''
            for (const it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }]
    })
}

// 修改密码
export function updateUserPass(userId, oldPassword, newPassword) {
    return request({
        url: 'update/userpassword',
        method: 'post',
        data: {
            userId,
            userPassword: oldPassword,
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