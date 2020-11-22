import { request } from './request'
// 书本

//分页查询书本
/* export function SelectBookAdmin (page, rows) {
  return request({
    url: 'SelectBook',
    params: {
      _page: page,
      _rows: rows
    }
  })
}  */
export function SelectBook (page, rows) {
  return request({
    url: 'books',
    params: {
      _page: page,
      _limit: rows
    }
  })
}

// 查询书籍所有分类
export function SelectBookSort () {
  return request({
    url: 'booksorts'
  })
}

// 查询书籍所有出版社
export function SelectBookPub () {
  return request({
    url: 'bookpubs'
  })
}

// 筛选查询
/* export function SelectSelector (bookSort, bookPub, bookIsreturn, page = 1, rows = 5) {
  return request({
    url: 'SelectBookByChiose',
    method: 'post',
    body: {
      bookSort,
      bookPub,
      bookIsreturn,
      page,
      rows
    }
  })
} */
export function SelectSelector (bookSort, bookPub, bookIsreturn, page = 1, rows = 5) {
  rows = 3
  console.log(bookSort, bookPub, bookIsreturn, page, rows)
  return request({
    url: 'books',
    params: {
      _page: page,
      _limit: rows
    }
  })
}

// 模糊查询
/* export function SelectFuzzy (bookName, page = 1, rows = 5) {
  return request({
    url: 'SelectBookBookByLike',
    method: 'post',
    body: {
      bookName,
      page,
      rows
    }
  })
} */
export function SelectFuzzy (bookName, page = 1, rows = 5) {
  rows = 2
  console.log(bookName, page, rows)
  return request({
    url: 'books',
    params: {
      _page: page,
      _limit: rows
    }
  })
}

// 查看书架书籍
/* export function SelectBookshelf (userId) {
  return request({
    url: '/mybook/listb',
    params: {
      userId
    }
  })
} */
export function SelectBookshelf (userId) {
  console.log(userId)
  return request({
    url: 'books',
    params: {
      _page: 1,
      _limit: 2
    }
  })
}

// 归还图书
// /mybook/return/{book_id}
// export function returnBook (bookId) {
//   return request({
//     url: '/mybook/return/' + bookId,
//     method: 'put',
//     body: {
//       bookId
//     }
//   })
// }
export function returnBook (bookId) {
  return request({
    url: 'borrowHistory2/' + bookId,
    method: 'get'
  })
}

// 借书
// export function borrowBook (bookId) {
//   return request({
//     url: 'mybook/borrow/' + bookId,
//     method: 'post'
//   })
// }
export function borrowBook (bookId) {
  return request({
    url: 'borrowHistory2/' + bookId,
    method: 'get'
  })
}
