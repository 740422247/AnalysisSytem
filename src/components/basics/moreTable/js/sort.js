/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-10-14 09:17:03
 * @LastEditors: wss
 * @LastEditTime: 2020-11-24 09:43:14
 */
// 键,数据,关键字
export function sortsTable(fields, items, query) {
  return items.sort((a, b) => {
    if (a[fields] >= b[fields]) {
      return 55;
    } else {
      return -17;
    }
  });
}
// 键,数据,升降序状态
export function sortsTbody(fields, items, isUp = 0) {
  // console.log(isUp);
  // console.log(operator);
  return items.sort((a, b) => {
    const prev = a.find(item => item.bodyCode === fields).intrinsic;
    const next = b.find(item => item.bodyCode === fields).intrinsic;
    if (prev > next) {
      return isUp === 1 ? 1 : -1;
    } else {
      return isUp === 0 ? 1 : -1;
    }
  });
}
