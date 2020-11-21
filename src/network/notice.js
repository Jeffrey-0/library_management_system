import { request } from './request'

// 公告

// 查找最新公告
export function getNewNotice () {
  return request({
    url: 'notice/2'
  })
}
