import { request } from './request'
// 书本

// 分页查询书本
export function SelectBook(page = 1, rows = 5) {
    return request({
        url: 'SelectBook',
        params: {
            page: page,
            rows: rows
        }
    })
}
/* 
export function SelectBook(page, rows) {
    return request({
        url: 'books',
        method: 'get',
        params: {
            _page: page,
            _limit: rows
        }
    })
} */

// 查询书籍所有分类
export function SelectBookSort() {
    return request({
        url: 'booksorts'
    })
}

// 查询书籍所有出版社
export function SelectBookPub() {
    return request({
        url: 'bookpubs'
    })
}

// 筛选查询
export function SelectSelector(bookSort, bookPub, bookIsreturn, page = 1, rows = 5) {
    let data = {
        page: page,
        rows: rows
    }
    if (bookSort !== '所有') {
        data.bookSort = bookSort
    }
    if (bookPub !== '所有') {
        data.bookPub = bookPub
    }
    if (bookIsreturn !== '所有') {
        data.isreturn = bookIsreturn
    }
    return request({
        url: 'SelectBookByChiose',
        method: 'post',
        data: data
    })
}
/* export function SelectSelector (bookSort, bookPub, bookIsreturn, page = 1, rows = 5) {
  // rows = 3
  let params = {
    _page: page,
    _limit: rows
  }
  if (bookSort !== '所有') {
    params.bookSort = bookSort
  }
  if (bookPub !== '所有') {
    params.bookPub = bookPub
  }
  if (bookIsreturn !== '所有') {
    params.isreturn = bookIsreturn
  }
  console.log(bookSort, bookPub, bookIsreturn, page, rows)
  return request({
    url: 'books',
    params: params
  })
} */

// 模糊查询
export function SelectFuzzy(bookName, page = 1, rows = 5) {
    return request({
        url: 'SelectBookBookByLike',
        method: 'post',
        data: {
            bookName: bookName,
            page,
            rows
        }
    })
}
/* export function SelectFuzzyAdmin (bookName, page = 1, rows = 5) {
  // rows = 2
  console.log(bookName, page, rows)
  return request({
    url: 'books',
    params: {
      bookName_like: bookName,
      _page: page,
      _limit: rows
    }
  })
} */

// 查看书架书籍
export function SelectBookshelf(userId) {
    return request({
        url: '/mybook/listb',
        params: {
            userId
        }
    })
}
/* export function SelectBookshelf (userId) {
  console.log(userId)
  // return request({
  //   url: 'books',
  //   params: {
  //     _page: 1,
  //     _limit: 2
  //   }
  // })
  return request({
    url: 'borrowHistory2',
    params: {
      userId,
      isreturn: 0
    }
  })
} */

// 归还图书
// /mybook/return/{book_id}
export function returnBook(historyId) {
    return request({
        url: 'ReturnBookHistory',
        method: 'post',
        data: {
            historyId: historyId
        }
    })
}
// export function returnBook (history) {
//   return request({
//     url: 'borrowHistory2/' + history.id,
//     method: 'put',
//     data: history
//   })
// }
export function returnBookChange(history) {
    return request({
        url: 'books/' + history.bookId,
        method: 'put',
        data: history
    })
}

// 借书
export function borrowBook(history) {
    return request({
        url: 'SaveBorrowHistory',
        method: 'post',
        data: {
            userId: history.userId,
            bookId: history.bookId,
            validityDate: 60
        }
    })
}
/* export function borrowBook (history) {
  return request({
    url: 'borrowHistory2/',
    method: 'post',
    data: history
  })
} */
export function borrowBookChange(history) {
    return request({
        url: 'books/' + history.bookId,
        method: 'put',
        data: history
    })
}