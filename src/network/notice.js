import { request } from './request'

// 公告

// 查找最新公告
export function getNewNotice() {
    return request({
        // url: 'notices/2'
        url: 'admin/notice/select'
    })
}

// 分页查询历史
/* export function SelectUserNoticeById (userId, page, rows) {
  return request({
    url: 'SelectUserNoticeById',
    method: 'post',
    body: {
      userId
      page,
      rows
    }
  })
} */
export function SelectUserNotice(page = 1, rows = 6) {
    return request({
        url: 'admin/notice/noticeshow',
        method: 'get',
        params: {
            page: page,
            rows: rows
        }
    })
}

// 模糊查询
/* export function SelectNoticeFuzzy (noticeName, page = 1, rows = 5) {
  return request({
    url: 'SelectnoticenoticeByLike',
    method: 'post',
    body: {
      noticeName,
      page,
      rows
    }
  })
} */
export function SelectNoticeFuzzy(noticeContent, page = 1, rows = 5) {
    // rows = 2
    // console.log(noticeName, page, rows)
    return request({
        url: 'admin/notice/findNoticeByLike',
        method: 'get',
        params: {
            noticeContent: noticeContent,
            page: page,
            rows: rows
        }
    })
}

// 分页查找所有公告
export function SelectNotice(page = 1, rows = 5) {
    return request({
        url: 'admin/notice/noticeshow',
        params: {
            page: page,
            rows: rows
        }
    })
}

// 删除公告
export function deleteNotice(noticeId) {
    return request({
        url: 'admin/notice/delete',
        method: 'get',
        params: {
            noticeId: noticeId
        }
    })
}
// 添加公告
export function addNotice(Notice) {
    console.log(Notice)
    return request({
        url: 'admin/notice/insertall',
        method: 'post',
        params: Notice
    })
}