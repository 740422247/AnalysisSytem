/*
 * @Descripttion: 柱状图
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-29 10:27:18
 * @LastEditors: wss
 * @LastEditTime: 2020-10-16 15:43:10
 */
export const qxList = {
  symbol: [],
  legend: {
    color: "#fff"
  },
  value:
    // [83470, 13100, 49241, 28351, 26265],
    // [13256, 9888, 234456, 68351, 26265],
    // [13256, 9888, 234456, 68351, 26265],
    // [13256, 9888, 234456, 68351, 26265],
    [13256, 9888, 234456, 68351, 26265],
  label: ["赵大", "孙二", "张三", "李四", "王五"],
  config: {
    radiusWidth: 100, //单个圆环占比,
    radiusInterval: 10, //占比算在圆环以内
    type: "percentage",
    value: 20, //百分比,
    centerWidth: 10 //取值0-50
  },
  path: [],
  options: {
    // series: [
    //   {
    //     radius: ["0", "75%"]
    //   },
    //   {
    //     radius: ["0", "60%"]
    //   }
    // ]
  }
};
