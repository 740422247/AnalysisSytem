/*
 * @Descripttion: 折线图
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-29 10:27:18
 * @LastEditors: joykit
 * @LastEditTime: 2020-06-03 16:33:04
 */
const year = new Date().getFullYear() + "年";
export const lineChart = {
  symbol: [`${year}{name}:{value}万元`, `${year}{name}:{value}万次`],
  choice: {
    showX: true,
    showY: true
  },
  all: [],
  value: [
    [1.39603, 1.94, 1.92, 9.54925, 6.605, 4.66, 1.881084, 1, 1, 8, 6, 5.44],
    [1, 8.94, 5.92, 11.54925, 5.605, 3.66, 1.881084, 6, 9, 1, 6, 5.33]
  ],
  label: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月"
  ],
  path: []
};
