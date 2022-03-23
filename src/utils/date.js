// 月、日数据格式化
function formDate(time) {
  if (time <= 9) {
    return '0' + time
  }
  return time.toString()
}

// 获取几天前的月日数据0312
function recentDate(dayInternal) {
  let sevenAgoTime = []
  let nowTime = new Date()
  for (let i = 0; i < dayInternal; i++) {
    let timestamp = new Date()
    timestamp.setDate(nowTime.getDate() - i)
    let formtime = formDate(timestamp.getMonth() + 1) + formDate(timestamp.getDate())
    sevenAgoTime.push(formtime)
    // console.log(sevenAgoTime)
  }
  return sevenAgoTime
}

export { recentDate }
