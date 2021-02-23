/*
 * @Descripttion: 折线图
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-29 10:27:18
 * @LastEditors: wss
 * @LastEditTime: 2020-09-27 11:22:43
 */
const year = new Date().getFullYear() + "年";
export const qxList = {
  // symbol: [`${year}{name}:{value}万元`, `${year}{name}:{value}万次`],
  symbol: [`万元`, `钻石`],
  // choice: {
  //   showX: true,
  //   showY: true
  // },
  areaStyle: true, //折线图阴影
  // 混入配置项
  // options: {
  //   series: [
  //     {
  //       symbolSize: 6, //拐点大小
  //       symbol: "triangle", //拐点图像
  //       smooth: false, //平滑区县
  //       showSymbol: false, //默认显示拐点
  //       // lineStyle: {
  //       //   type: "dashed" //'solid','dashed','dotted'
  //       // }
  //     },
  //     { symbolSize: 6 }
  //   ]
  // },
  all: [],
  value: [
    // 1.39603, 1.94, 1.92, 9.54925, 6.605, 4.66, 1.881084, 1, 1, 8, 6, 5.44
    [1.39603, 1.94, 1.92, 9.54925, 6.605, 4.66, 1.881084, 1, 1, 8, 6, 5.44],
    [1, 8.94, 5.92, 11.54925, 5.605, 3.66, 1.881084, 6, 9, 1, 6, 5.33]
  ],
  showData: ["LASTMONEY"],
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
