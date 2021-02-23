/*
 * @Descripttion: 柱状图
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-29 10:27:18
 * @LastEditors: wss
 * @LastEditTime: 2020-09-27 15:08:27
 */
const year = new Date().getFullYear() + "年";
export const qxList = {
  areaStyle: true, //折线图阴影
  symbol: ["万元", "人", "人次"],
  choice: { showX: true, showY: true },
  all: [78217.577915, 1336937, 1843764],
  value: [
    [
      2865.717006,
      3208.320131,
      3191.809502,
      4836.144516,
      9892.120273,
      28292.747673,
      25929.868814,
      null,
      null,
      null,
      null,
      0.85
    ],
    [50945, 82196, 51290, 106430, 183029, 594653, 268377, 0, 0, 0, 0, 17],
    [55169, 86910, 55716, 129385, 259342, 740896, 516329, 0, 0, 0, 0, 17]
  ],
  // options: {
  //   series: [
  //     {
  //       symbolSize: 6, //拐点大小
  //       symbol: "triangle", //拐点图像
  //       smooth: false, //平滑区县
  //       showSymbol: false //默认显示拐点
  //       // lineStyle: {
  //       //   type: "dashed" //'solid','dashed','dotted'
  //       // }
  //     },
  //     { symbolSize: 6 }
  //   ]
  // },
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
