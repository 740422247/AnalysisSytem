/*
 * @Descripttion: 柱状图
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-29 10:27:18
 * @LastEditors: wss
 * @LastEditTime: 2020-09-17 15:27:29
 */
const year = new Date().getFullYear() + "年";
export const qxList = {
  symbol: [`人`],
  choice: {
    // seriesColor: ["rgba(6, 168, 235, 1)-rgba(12, 99, 215, 0.05)"],
    showX: true,
    showY: true
  },
  all: [],
  value: [
    [320, 302, 341, 374, 390, 450, 420, 390, 450, 420],
    [420, 132, 886, 234, 190, 230, 210, 190, 230, 210]
  ],
  label: [
    "0-19岁",
    "20-29岁",
    "30-39岁",
    "40-49岁",
    "40-49岁",
    "50-59岁",
    "60-69岁",
    "70-79岁",
    "80-89岁",
    "90岁以上"
  ],
  path: []
};
