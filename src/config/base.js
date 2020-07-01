/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-06-08 09:48:24
 * @LastEditors: joykit
 * @LastEditTime: 2020-06-08 10:24:53
 */
export const base = {
  type: "", // 组件类型
  // 可用于渲染类型选择框
  choice: [],
  className: [], // 类名
  style: {}, // 样式
  isHandle: false, // 是否具备操作 比如: 联动
  text: "", //组件标题
  path: "", // 顶部跳转按钮
  border: true, // 显示组件边框
  grid: true, // 显示背景网格
  service: {
    api: "", //api地址
    params: {}, // api参数
    data: {
      // 返回的字段
    }
  },
  option: {}, // echart 配置
  // 传与组件的数据
  data: {
    symbol: [], // 符号
    all: [[]], // value的综合
    value: [[]], // 数值
    label: [], // 标签
    // 组件内特殊选项
    choice: {
      showX: true, // 显示x轴 echart选项
      showY: true, // 显示y轴echart选项
      seriesColor: [""], // barChart 颜色
      src: [""] //card 需要的图片
    },
    path: [] // 路由
  }
};
