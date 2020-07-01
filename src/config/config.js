/*
 * @Descripttion: 配置
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-11 09:31:23
 * @LastEditors: joykit
 * @LastEditTime: 2020-06-08 10:25:18
 */

import { typeRank, typeGraph, typeCard } from "@config/_type.js";
const year = new Date().getFullYear() + "年";

export const config = [
  /** 排行榜
   * jkRank:singleRank 注意事项:
   * choice: 组件额外参数配置 可选
   * symbol、all、value、label、path: 一维数组
   * label: 排行榜每项名字
   * symbol: 排行榜每项数值单位
   * all: 排行榜所有数据总和(后台传)
   * path: 排行榜每项点击跳转的路径
   */
  {
    type: "jkRank:singleRank", // singleRank  multipleRank batteryRank
    // 可用于渲染类型选择框
    choice: typeRank,
    isHandle: false, // 是否具备操作 比如: 联动
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
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
    data: {
      symbol: [""],
      all: [666], // 总共多少数据， 用于计算占比
      value: [10, 20, 5555, 200], // 每项右侧数值 ,一维数组代表一条线
      label: [], // 每项小标题
      path: [] // 每项跳转路径
    }
  },
  /** 排行榜
   * jkRank:multipleRank 注意事项:
   * symbol、all、value: 二维数组
   * choice: 组件额外参数配置 可选
   * label: 排行榜每项名字 一维数组
   * symbol: 排行榜每项数值单位 二维数组
   * all: 排行榜所有数据总和(后台传) 二维数组
   * path: 排行榜每项点击跳转的路径 一维数组
   */
  {
    type: "jkRank:multipleRank", // singleRank  multipleRank batteryRank
    // 可用于渲染类型选择框
    choice: typeRank,
    isHandle: false, // 是否具备操作 比如: 联动
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
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
    data: {
      symbol: [`万元`, `万次`],
      all: [666666, 6666], // 总共多少数据， 用于计算占比
      value: [
        [1111, 222, 333],
        [111, 333, 444]
      ], // 每项右侧数值 二维数组代表 多条线
      label: ["盐湖区", "永济市", "垣曲县"], // 每项小标题
      path: ["#", "#", "#"] // 每项跳转路径
    }
  },

  //
  //
  //todo:所有echart 必须可配置option选项
  //
  //

  /**
   * echart
   * jkGraph:lineChart注意事项
   * option:外部配置option
   * symbol有所区别, 需要拼接, 用于鼠标悬停展示的提示信息
   * choice: 组件额外参数配置 可选
   * all: 可选项
   * value: 必须二维数组 , 二维数组可表示y轴
   * label: 一维数组, 只能有一个x轴
   * path: 可选
   */
  {
    type: "jkGraph:lineChart", // lineChart twoBarChart barChart
    // 可用于渲染类型选择框
    choice: typeGraph,
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
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
    option: {},
    data: {
      symbol: [`${year}{name}:{value}万元`, `${year}{name}:{value}万次`],
      all: [], // 不需要此属性
      value: [
        [3864.39603, 1508.94],
        [11125, 1108.94]
      ],
      choice: {
        showX: true, // 显示x轴 echart选项
        showY: true // 显示y轴echart选项
      },
      label: ["1月", "2月"],
      path: [] // 不需要此属性
    }
  },
  /**
   * echart
   * jkGraph:twoBarChart 用于双向坐标
   * option:外部配置option
   * choice: 组件额外参数配置 可选
   * symbol有所区别, 需要拼接, 用于鼠标悬停展示的提示信息
   * all: 可选项
   * value: 必须二维数组 , 必须有正有负
   * label: 一维数组, 只能有一个x轴
   * path: 可选
   */
  {
    type: "jkGraph:twoBarChart", // lineChart twoBarChart barChart
    // 可用于渲染类型选择框
    choice: typeGraph,
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
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
    option: {},
    data: {
      symbol: [`男:{value}人`, `女:{value}人`],
      all: [], // 不需要此属性
      value: [
        [4968, 5623, 14231, 30323, 41854, 41855, 27263, 8488, 605],
        [-4388, -3351, -6729, -12813, -14396, -21332, -23705, -12856, -1995]
      ],
      label: [
        "0-19岁",
        "20-29岁",
        "30-39岁",
        "40-49岁",
        "50-59岁",
        "60-69岁",
        "70-79岁",
        "80-89岁",
        "90岁以上"
      ],
      choice: {
        showX: true, // 显示x轴 echart选项
        showY: true // 显示y轴echart选项
      },
      path: [] // 不需要此属性
    }
  },
  /**
   * echart
   * jkGraph:barChart 柱状图
   * option:外部配置option
   * symbol有所区别, 需要拼接, 用于鼠标悬停展示的提示信息
   * choice: 组件额外参数配置 可选
   * color: 只修改柱状颜色, 可选 用于多条柱状
   * all: 可选项
   * value: 必须二维数组 , 必须有正有负
   * label: 一维数组, 只能有一个x轴
   * path: 可选
   */
  {
    type: "jkGraph:barChart", // lineChart twoBarChart barChart
    // 可用于渲染类型选择框
    choice: typeGraph,
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
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
    option: {},
    data: {
      symbol: [`${year}{name}:{value}人`],
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
      choice: {
        showX: true, // 显示x轴 echart选项
        showY: true // 显示y轴echart选项
      },
      path: [] // 不需要此属性
    }
    /**
     * echart
     * jkGraph:barChart 柱状图
     * option:外部配置option
     * symbol有所区别, 需要拼接, 用于鼠标悬停展示的提示信息
     * choice: 组件额外参数配置 可选
     * color: 只修改柱状颜色, 可选 用于多条柱状
     * all: 可选项
     * value: 必须二维数组 , 必须有正有负
     * label: 一维数组, 只能有一个x轴
     * path: 可选
     */
  },
  {
    type: "jkGraph:barChart", // lineChart twoBarChart barChart
    // 可用于渲染类型选择框
    choice: typeGraph,
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
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
    option: {},
    data: {
      symbol: [`${year}{name}:{value}人`],
      all: [], // 不需要此属性
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
      choice: {
        showX: true, // 显示x轴 echart选项
        showY: true, // 显示y轴echart选项
        seriesColor: ["rgba(6, 168, 235, 1)-rgba(12, 99, 215, 0.05)"]
      },
      path: [] // 不需要此属性
    }
    /**
     * echart
     * jkGraph:barChart 饼图
     * option:外部配置option
     * symbol有所区别, 需要拼接, 用于鼠标悬停展示的提示信息
     * choice: 组件额外参数配置 可选
     * color: 只修改柱状颜色, 可选 用于多条柱状
     * all: 可选项
     * value: 必须二维数组 , 必须有正有负
     * label: 一维数组, 只能有一个x轴
     * path: 可选
     */
  },
  // {
  //   type: "jkGraph:pieChart", // lineChart twoBarChart barChart pieChart
  //   // 可用于渲染类型选择框
  //   choice: typeGraph,
  //   className: ["jk-col-24", "handle"], // 类名
  //   style: { height: "300px" }, // 样式
  //   isHandle: false, // 是否具备操作 比如: 联动
  //   text: "", //组件标题
  //   path: "", // 顶部跳转按钮
  //   border: true, // 显示组件边框
  //   grid: true, // 显示背景网格
  //   service: {
  //     api: "", //api地址
  //     params: {}, // api参数
  //     data: {
  //       // 返回的字段
  //     }
  //   },
  //   option: {},
  //   data: {
  //     symbol: [`女：{value}/人次`],
  //     choice: choice,
  //     all: [3], // 不需要此属性
  //     value: [1.39603],
  //     label: [],
  //     path: [] // 不需要此属性
  //   }
  // }

  /** 排行榜
   * jkRank:singleRank 注意事项:
   * choice: 组件额外参数配置 可选
   * symbol、all、value、label、path: 一维数组
   * label: 排行榜每项名字
   * symbol: 排行榜每项数值单位
   * all: 排行榜所有数据总和(后台传)
   * path: 排行榜每项点击跳转的路径
   */
  {
    type: "jkCard:row", // row  cloum
    choice: typeCard, // 可用于渲染类型选择框
    isHandle: false, // 是否具备操作 比如: 联动
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
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
    data: {
      symbol: [""], // 无
      all: [], // 无
      value: [10], // 单值
      label: [], // 单值
      choice: {
        src: [""] // 单值
      },
      path: [] // 每项跳转路径
    }
  }
];
export const components = {
  jkRank: () => import("@components/chart/jkRank"),
  jkGraph: () => import("@components/chart/jkGraph")
};
