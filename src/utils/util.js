export function formateTime(value) {
  let time = parseFloat(value);  // 格式化数字
  if (String(time).length < 13) { // 秒  毫秒不做操作
    time = time * 1000;
  }
  let times = new Date(time);
  let year = times.getFullYear(); // 年
  let moth = (times.getMonth() + 1) < 10 ? '0' + (times.getMonth() + 1) : times.getMonth() + 1; // 月
  let day = times.getDate() < 10 ? '0' + times.getDate() : times.getDate(); // 日
  let horse = times.getHours() < 10 ? '0' + times.getHours() : times.getHours(); // 小时
  let minute = times.getMinutes() < 10 ? '0' + times.getMinutes() : times.getMinutes(); // 分
  return `${year}-${moth}-${day} ${horse}:${minute}`
}
