/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-10-14 09:17:03
 * @LastEditors: wss
 * @LastEditTime: 2020-10-14 15:24:42
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
export function sortsTbody(fields, items, operator) {
  return items.sort((a, b) => {
    let h;
    if (a[fields].name >= b[fields].name) {
      h = 55;
    } else {
      h = -111;
    }
    return operator ? h : -h;
  });
}
