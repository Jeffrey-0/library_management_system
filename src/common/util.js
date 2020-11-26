// 日期加减法  date参数为计算开始的日期，days为需要加的天数
// 格式:addDate('2017-1-11',20)
export function addDate (date, days) {
  var d = new Date(date)
  d.setDate(d.getDate() + days)
  var m = d.getMonth() + 1
  return d.getFullYear() + '-' + m + '-' + d.getDate()
}

var baseImgUrl = 'http://127.0.0.1:8081'

export {baseImgUrl}