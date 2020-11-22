import { request } from './request'

// 公告

// 查找最新公告
export function getNewNotice () {
  return request({
    url: 'notice/2'
  })
}

// 分页查找公告
export function SelectNotice (page, rows) {
  return request({
    url: 'notice',
    params: {
      _page: page,
      _limit: rows
    }
  })
}
