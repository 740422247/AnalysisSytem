/*
 * @Descripttion: 柱状图
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-29 10:27:18
 * @LastEditors: joykit
 * @LastEditTime: 2020-06-08 10:11:39
 */
const year = new Date().getFullYear() + "年";
export const qxList = {
  symbol: [`${year}{name}:{value}人`],
  choice: {
    seriesColor: ["rgba(6, 168, 235, 1)-rgba(12, 99, 215, 0.05)"],
    showX: true,
    showY: true
  },
  all: [],
  value: [
    [1.39603, 1.94, 1.92, 9.54925, 6.605, 4.66, 1.881084, 1, 1, 8, 6, 5.44]
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
