import { request } from './request'
// 书本

// 分页查询书本
export function SelectBook (page = 1, rows = 5) {
  return request({
    // url: 'SelectBook',
    method: 'post',
    // url: 'SelectBookHistoryByChioseDescRecord',
    url: 'SelectBookHistoryByChioseDescRecord',
    data: {
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
export function SelectBookSort (page = 1, rows = 100) {
  return request({
    // url: 'booksorts'
    url: 'SelectSort',
    params: {
      page,
      rows
    }
  })
}

// 查询书籍所有出版社
export function SelectBookPub () {
  return request({
    // url: 'bookpubs'
    url: 'GetPub'
  })
}

// 筛选查询
export function SelectSelector (bookSort, bookPub, bookIsreturn, page = 1, rows = 5) {
  const data = {
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
    url: 'SelectBookHistoryByChioseDescRecord',
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
export function SelectFuzzy (bookName, page = 1, rows = 5) {
  return request({
    url: 'SelectHistoryByLike',
    // url: 'getHistoryAllByLike',
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
export function SelectBookshelf (userId, page = 1, rows = 10) {
  return request({
    url: '/SelectMyBook',
    method: 'post',
    data: {
      userId,
      page,
      rows
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
export function returnBook (history) {
  // console.log(historyId)
  return request({
    url: 'ReturnBookHistory',
    method: 'post',
    data: {
      historyId: history.historyId
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
/* export function returnBookChange (history) {
  return request({
    url: 'books/' + history.bookId,
    method: 'put',
    data: history
  })
} */

// 借书
export function borrowBook (history) {
  return request({
    url: 'SaveBorrowHistory',
    method: 'post',
    data: {
      userId: history.userId,
      bookId: history.bookId,
      validityDate: 60,
      isreturn: 0
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
export function borrowBookChange (history) {
  return request({
    url: 'books/' + history.bookId,
    method: 'put',
    data: history
  })
}
// 删除图书
export function DeleteBook (bookId) {
  return request({
    url: '/DeleteBook',
    method: 'get',
    params: {
      bookId: bookId
    }
  })
}

// 查询书籍分类
export function getSort (page = 1, rows = 100) {
  return request({
    // url: 'booksorts'
    url: 'GetSort',
    method: 'get',
    params: {
      page,
      rows
    }
  })
}

// 查询出版社
export function getPub (page = 1, rows = 100) {
  return request({
    // url: 'booksorts'
    url: 'GetPub',
    method: 'get',
    params: {
      page,
      rows
    }
  })
}

// 添加新图书
export function saveBook (Book) {
  return request({
    // url: 'booksorts'
    url: '/SaveBook',
    method: 'post',
    params: {
      bookName: Book.bookName,
      bookAuthor: Book.bookAuthor,
      bookPub: Book.bookPub,
      bookSort: Book.bookSort
    }
  })
}

// 根据bookId查找图书
export function selectBookById(Book) {
    return request({
        // url: 'booksorts'
        url: '/library/bookInfo/' + Book.book_id,
        method: 'get'
    })
}

// 修改图书
export function updateBook(Book) {
    console.log(Book)
    return request({
        // url: 'booksorts'
        url: '/UpdateBook',
        method: 'post',
        params: Book
    })
}
