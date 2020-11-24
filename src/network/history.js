import { request } from './request'
// 借书历史

// 分页查询历史
export function SelectUserHistoryById(userId, page = 1, rows = 6) {
    return request({
        url: 'SelectUserHistoryById',
        method: 'post',
        data: {
            userId,
            page,
            rows
        }
    })
}
/* export function SelectUserHistory (userId, page = 1, rows = 6) {
  return request({
    url: 'borrowHistory2',
    method: 'get',
    params: {
      userId,
      _page: page,
      _limit: rows
    }
  })
} */

// 模糊查询某图书借阅历史
export function SelectHistoryFuzzy(userId, historyName, page = 1, rows = 6) {
    return request({
        url: 'SelectUserHistoryByIdLikeName',
        method: 'post',
        data: {
            userId,
            bookName: historyName,
            page,
            rows
        }
    })
}
/* export function SelectHistoryFuzzy (userId, historyName, page = 1, rows = 6) {
  console.log(historyName, page, rows)
  return request({
    url: 'borrowHistory2',
    params: {
      userId,
      bookName_like: historyName,
      _page: page,
      _limit: rows
    }
  })
} */

// 查看书架历史
/* export function Selecthistoryshelf (userId) {
  return request({
    url: '/myhistory/listb',
    params: {
      userId
    }
  })
} */
export function Selecthistoryshelf(userId) {
    console.log(userId)
    return request({
        url: 'borrowHistory2',
        params: {
            userId,
            isreturn: 0
        }
    })
}

// 归还图书
// /myhistory/return/{history_id}
// export function returnhistory (historyId) {
//   return request({
//     url: '/myhistory/return/' + historyId,
//     method: 'put',
//     body: {
//       historyId
//     }
//   })
// }
export function returnhistory(historyId) {
    return request({
        url: 'borrowHistory2/' + historyId,
        method: 'get'
    })
}

// 借书
// export function borrowhistory (historyId) {
//   return request({
//     url: 'myhistory/borrow/' + historyId,
//     method: 'post'
//   })
// }
export function borrowhistory(historyId) {
    return request({
        url: 'borrowHistory2/' + historyId,
        method: 'get'
    })
}

// 今日借出数
export function borrowToday() {
    return request({
        url: '/BorrowCollection/borrowtoday',
        methods: 'get'
    })
}
export function backToday() {
    return request({
        url: '/BorrowCollection/backtoday',
        methods: 'get'
    })
}
export function borrowThisMonth() {
    return request({
        url: '/BorrowCollection/borrowthismonth',
        methods: 'get'
    })
}
export function backThisMonth() {
    return request({
        url: '/BorrowCollection/backthismonth',
        methods: 'get'
    })
}
export function borrowThisYear() {
    return request({
        url: '/BorrowCollection/borrowthisyear',
        methods: 'get'
    })
}
export function backThisYear() {
    return request({
        url: '/BorrowCollection/backthisyear',
        methods: 'get'
    })
}

export function getNewNotice() {
    return request({
        url: 'admin/notice/select',
        methods: 'get'
    })
}
export function selectHistory(page = 1, rows = 5) {
    console.log(rows)
    return request({
        url: '/SelectHistoryAll',
        methods: 'get',
        params: {
            page: page,
            rows: rows
        }
    })
}