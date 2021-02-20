import { request } from './request'
// 分页查找用户
export function SelectUser(page, rows) {
    return request({
        url: '/SelectUserAll',
        method: 'get',
        params: {
            page: page,
            rows: rows
        }
    })
}

export function SelectFuzzy(userName, page = 1, rows = 5) {
    return request({
        url: '/SelectUserByLike',
        method: 'post',
        params: {
            userName: userName,
            page: page,
            rows: rows
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
//根据userId查找借书历史
export function searchBorrowHistory(userId, page = 1, rows = 100) {
    return request({
        url: '/SelectUserHistoryById',
        method: 'post',
        params: {
            userId: userId,
            page: page,
            rows: rows
        }
    })
}

//根据userId禁用用户
export function forbiddenUser(userId, userCategory) {
    return request({
        url: '/UpdateUser',
        method: 'post',
        params: {
            userId: userId,
            userCategory: userCategory
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