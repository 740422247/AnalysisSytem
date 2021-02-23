/*
 * @Descripttion: 配置
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-11 09:31:23
 * @LastEditors: wss
 * @LastEditTime: 2021-01-07 10:20:55
 */

import {
  typeRank,
  typeGraph,
  typeCard,
  typeMaps,
  typeForms
} from "@config/_type.js";
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
    isRadio: true,
    // 可用于渲染类型选择框
    choice: typeRank,
    isHandle: false, // 是否具备操作 比如: 联动
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
    text: "单行滚动列表", //组件标题
    path: "", // 顶部跳转按钮
    border: false, // 显示组件边框
    grid: false, // 显示背景网格
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
    isRadio: false,
    // 可用于渲染类型选择框
    choice: typeRank,
    isHandle: false, // 是否具备操作 比如: 联动
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
    text: "双行滚动列表", //组件标题
    path: "", // 顶部跳转按钮
    border: false, // 显示组件边框
    grid: false, // 显示背景网格
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
    style: { height: "500px" }, // 样式
    isHandle: false, // 是否具备操作 比如: 联动
    text: "折线图", //组件标题
    path: "", // 顶部跳转按钮
    border: false, // 显示组件边框
    grid: false, // 显示背景网格

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
    isRadio: true,
    choice: typeGraph,
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
    isHandle: false, // 是否具备操作 比如: 联动
    text: "柱状图", //组件标题
    path: "", // 顶部跳转按钮
    border: false, // 显示组件边框
    grid: false, // 显示背景网格

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
    type: "jkGraph:pieChart", // lineChart twoBarChart barChart
    // 可用于渲染类型选择框
    isRadio: true,
    choice: typeGraph,
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
    isHandle: false, // 是否具备操作 比如: 联动
    text: "饼状图", //组件标题
    path: "", // 顶部跳转按钮
    border: false, // 显示组件边框
    grid: false, // 显示背景网格

    service: {
      api: "", //api地址
      params: {}, // api参数
      data: {
        // 返回的字段
      }
    },
    option: {},
    data: {}
  },
  {
    type: "jkGraph:radarChart", // lineChart twoBarChart barChart
    // 可用于渲染类型选择框
    isRadio: true,
    choice: typeGraph,
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
    isHandle: false, // 是否具备操作 比如: 联动
    text: "雷达图", //组件标题
    path: "", // 顶部跳转按钮
    border: false, // 显示组件边框
    grid: false, // 显示背景网格

    service: {
      api: "", //api地址
      params: {}, // api参数
      data: {
        // 返回的字段
      }
    },
    option: {},
    data: {}
  },
  {
    type: "jkGraph:scatterChart", // lineChart twoBarChart barChart
    // 可用于渲染类型选择框
    isRadio: true,
    choice: typeGraph,
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
    isHandle: false, // 是否具备操作 比如: 联动
    text: "散点图", //组件标题
    path: "", // 顶部跳转按钮
    border: false, // 显示组件边框
    grid: false, // 显示背景网格

    service: {
      api: "", //api地址
      params: {}, // api参数
      data: {
        // 返回的字段
      }
    },
    option: {},
    data: {}
  },
  {
    type: "jkGraph:pieChartDouble", // lineChart twoBarChart barChart
    // 可用于渲染类型选择框
    isRadio: true,
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
    isHandle: false, // 是否具备操作 比如: 联动
    text: "复合饼图", //组件标题
    path: "", // 顶部跳转按钮
    border: false, // 显示组件边框
    grid: false // 显示背景网格
  },

  // 待加入  2020/12/04
  // {
  //   type: "jkGraph:ratioChart", // lineChart twoBarChart barChart
  //   // 可用于渲染类型选择框
  //   isRadio: true,
  //   className: ["jk-col-24", "handle"], // 类名
  //   style: { height: "300px" }, // 样式
  //   isHandle: false, // 是否具备操作 比如: 联动
  //   text: "比例图", //组件标题
  //   path: "", // 顶部跳转按钮
  //   border: false, // 显示组件边框
  //   grid: false // 显示背景网格
  // },
  // 待加入   2020/12/04
  // {
  //   type: "jkGraph:dashBoard", // lineChart twoBarChart barChart
  //   // 可用于渲染类型选择框
  //   isRadio: true,
  //   className: ["jk-col-24", "handle"], // 类名
  //   style: { height: "300px" }, // 样式
  //   isHandle: false, // 是否具备操作 比如: 联动
  //   text: "仪表盘", //组件标题
  //   path: "", // 顶部跳转按钮
  //   border: false, // 显示组件边框
  //   grid: false // 显示背景网格
  // },
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
  //     // choice: choice,
  //     all: [3], // 不需要此属性
  //     value: [1.39603],
  //     label: [],
  //     path: [] // 不需要此属性
  //   }
  // },

  /** 排行榜
   * jkRank:singleRank 注意事项:
   * choice: 组件额外参数配置 可选
   * symbol、all、value、label、path: 一维数组
   * label: 排行榜每项名字
   * symbol: 排行榜每项数值单位
   * all: 排行榜所有数据总和(后台传)
   * path: 排行榜每项点击跳转的路径
   */
  // {
  //   type: "jkCard:colum", // row  cloum
  //   choice: typeCard, // 可用于渲染类型选择框
  //   isHandle: false, // 是否具备操作 比如: 联动
  //   className: ["jk-col-24", "handle"], // 类名
  //   style: {}, // 样式
  //   text: "卡片", //组件标题
  //   path: "", // 顶部跳转按钮
  //   border: false, // 显示组件边框
  //   grid: false, // 显示背景网格
  //   service: {
  //     api: "", //api地址
  //     params: {}, // api参数
  //     data: {
  //       // 返回的字段
  //     }
  //   },
  //   data: {
  //     symbol: [""], // 无
  //     all: [], // 无
  //     value: [10], // 单值
  //     label: [], // 单值
  //     choice: {
  //       src: [""] // 单值
  //     },
  //     path: [] // 每项跳转路径
  //   }
  // },
  // 卡片组
  {
    type: "jkCard:columList", //
    choice: typeCard, // 可用于渲染类型选择框
    isHandle: false, // 是否具备操作 比如: 联动
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
    text: "卡片组", //组件标题
    path: "", // 顶部跳转按钮
    border: true, // 显示组件边框
    grid: false, // 显示背景网格
    service: {
      api: "", //api地址
      params: {}, // api参数
      data: {
        // 返回的字段
      }
    },
    data: {}
  },
  // {
  //   type: "jkCard:columList", //
  //   choice: typeCard, // 可用于渲染类型选择框
  //   isHandle: false, // 是否具备操作 比如: 联动
  //   className: ["jk-col-24", "handle"], // 类名
  //   style: { height: "300px" }, // 样式
  //   text: "卡片组colum", //组件标题
  //   path: "", // 顶部跳转按钮
  //   border: true, // 显示组件边框
  //   grid: false, // 显示背景网格
  //   service: {
  //     api: "", //api地址
  //     params: {}, // api参数
  //     data: {
  //       // 返回的字段
  //     }
  //   },
  //   data: {}
  // },
  ///////////////////////////////////////////////////// 定制组件 ///////////////////////////////////////////////////
  // 横向对比柱状图
  {
    type: "jkGraph:twoBarChart", // lineChart twoBarChart barChart
    // 可用于渲染类型选择框
    choice: typeGraph,
    custom: true,
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
    isHandle: false, // 是否具备操作 比如: 联动
    text: "横向对比柱状图", //组件标题
    path: "", // 顶部跳转按钮
    border: false, // 显示组件边框
    grid: false, // 显示背景网格
    service: {
      api: "", //api地址
      params: {}, // api参数
      data: {
        // 返回的字段
      }
    },
    option: {},
    //用于组件多路径配置信息

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
  // 地图（重庆）
  {
    type: "wssMaps:cq",
    custom: true,
    configUrl: [
      { name: "地区页面", value: "map" },
      { name: "底部页面", value: "bottom" }
    ],
    componentImg: require("@assets/images/custom/map.png"),
    choice: typeMaps, // 可用于渲染类型选择框
    isHandle: false, // 是否具备操作 比如: 联动
    className: ["jk-col-24", "handle"], // 类名
    style: {}, // 样式
    text: "地图(重庆)/定制", //组件标题
    path: "", // 顶部跳转按钮
    border: false, // 显示组件边框
    grid: false, // 显示背景网格
    pageForms: {
      map: "fdsafdasfda",
      bottom: "fdsafdas"
    },
    data: null
  },
  // 重庆区县地图
  {
    type: "wssMaps:cqCounty",
    custom: true,
    componentImg: require("@assets/images/custom/map.png"),
    choice: typeMaps, // 可用于渲染类型选择框
    isHandle: false, // 是否具备操作 比如: 联动
    className: ["jk-col-24", "handle"], // 类名
    style: {}, // 样式
    text: "地图(重庆区县)/定制", //组件标题
    path: "", // 顶部跳转按钮
    border: false, // 显示组件边框
    grid: false, // 显示背景网格
    data: null
  },
  // {
  //   type: "wssMaps:cqCounty",
  //   custom: true,
  //   // isNoPath: true,
  //   // configUrl: [
  //   //   { name: "地区页面", value: "path1" },
  //   //   { name: "底部页面", value: "path2" }
  //   // ],
  //   componentImg: require("@assets/images/custom/map.png"),
  //   choice: typeMaps, // 可用于渲染类型选择框
  //   isHandle: false, // 是否具备操作 比如: 联动
  //   className: ["jk-col-24", "handle"], // 类名
  //   style: {}, // 样式
  //   text: "重庆区县地图", //组件标题
  //   path: "", // 顶部跳转按钮
  //   border: false, // 显示组件边框
  //   grid: false, // 显示背景网格
  //   data: null
  // },
  // jkCustom 定制1
  {
    type: "jkCustom: Earth2", // lineChart twoBarChart barChart
    // 是否定制
    custom: true,
    isNoPath: true,
    configUrl: [
      { name: "年度分析", value: "path1" },
      { name: "年龄段", value: "path2" },
      { name: "错误统计", value: "path3" },
      { name: "发放统计", value: "path4" },
      { name: "发放列表", value: "path5" }
    ],
    componentImg: require("@assets/images/custom/earth2.png"),
    className: ["jk-col-24", "handle"], // 类名
    style: {}, // 样式
    isHandle: false, // 是否具备操作 比如: 联动
    text: "地球图/定制", //组件标题
    path: "", // 顶部跳转按钮
    border: false, // 显示组件边框
    grid: false // 显示背景网格
  },
  // 乡镇定制
  {
    type: "PoorCountry",
    // 是否定制
    custom: true,
    componentImg: require("@assets/images/custom/poorCountry.jpg"),
    className: ["jk-col-24", "handle"], // 类名
    style: {}, // 样式
    isHandle: false, // 是否具备操作 比如: 联动
    text: "乡镇/定制", //组件标题
    path: "", // 顶部跳转按钮
    border: false, // 显示组件边框
    grid: false // 显示背景网格
  },
  // 系统监控
  {
    type: "SystemMonitoring",
    // 是否定制
    custom: true,
    // 定制接口
    configApi: [
      { name: "同步接口", value: "QxInflexion" },
      { name: "手动同步", value: "ManualQxInflexion" },
      { name: "CPU接口", value: "CpuInflexion" },
      { name: "内存接口", value: "NcInflexion" },
      { name: "硬盘接口", value: "YpInflexion" }
    ],
    componentImg: require("@assets/images/custom/SystemMonitoring.jpg"),
    className: ["jk-col-24", "handle"], // 类名
    style: {}, // 样式
    isHandle: false, // 是否具备操作 比如: 联动
    text: "系统监控/定制", //组件标题
    path: "", // 顶部跳转按钮
    border: false, // 显示组件边框
    grid: false // 显示背景网格
  },
  // 比例图组
  {
    type: "ratioChartList2", // lineChart twoBarChart barChart
    // 可用于渲染类型选择框
    custom: true,
    choice: typeForms,
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
    text: "比例图组", //组件标题
    border: true, // 显示组件边框
    grid: true, // 显示背景网格
    line: true, //背景发光
    // configUrl: [{ name: "跳转ID", value: "SDKADAKLDJD", param: {} }], //无跳转,数组传空或者NULL
    data: {
      value: [
        {
          name: "男女年龄段分析2",
          value: {
            percent: 24.19,
            sex: 0,
            txt: "男：8513/人次"
          },
          path: []
        },
        {
          name: "男女年龄段分析2",
          value: {
            percent: 74.19,
            sex: 1,
            txt: "女：1365393/人次"
          },
          path: []
        }
      ]
    }
  },
  ///////////////////////////////////////////////////// 定制组件 ///////////////////////////////////////////////////
  // jkTable
  {
    type: "jkTable:simple", // lineChart twoBarChart barChart
    // 可用于渲染类型选择框
    isRadio: true,
    choice: typeGraph,
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
    isHandle: false, // 是否具备操作 比如: 联动
    text: "表格", //组件标题
    path: "", // 顶部跳转按钮
    border: false, // 显示组件边框
    grid: false, // 显示背景网格

    service: {
      api: "", //api地址
      params: {}, // api参数
      data: {
        // 返回的字段
      }
    },
    option: {},
    data: {
      value: {
        Headers: [
          [
            {
              rowSpan: 2,
              colSpan: 1,
              headerAlign: "center",
              isFixed: false,
              bodyAlign: "center",
              formatting: "String",
              headerName: "名字",
              minWidth: "80",
              isSort: true,
              isSerialNumBer: true, //是否显示序号
              sortord: "front", //只有sortord为front采用前端排序
              bodyCode: "NAME",
              path: "Q7zFKm6I3U6KhRG6RPAbPA",
              param: ["CODE", "NAME", "PERSON"],
              headerStyle: { textAlign: "center", minWidth: "80px" },
              bodyStyle: { textAlign: "center" },
              location: {
                path: "Q7zFKm6I3U6KhRG6RPAbPA",
                param: ["CODE", "NAME", "PERSON"]
              }
            },
            {
              rowSpan: 1,
              colSpan: 2,
              headerAlign: "center",
              isFixed: false,
              bodyAlign: "center",
              formatting: "String",
              headerName: "区县",
              minWidth: "159",
              headerStyle: { textAlign: "center", minWidth: "159px" },
              bodyStyle: { textAlign: "center" }
            }
          ],
          [
            {
              rowSpan: 1,
              colSpan: 1,
              headerAlign: "center",
              isFixed: false,
              bodyAlign: "right",
              formatting: "N2S",
              headerName: "渝北区",
              minWidth: "80",
              bodyCode: "PERSON",
              path: "744fc770d93a457c926e3940a6cdf8e7",
              param: ["PERSON", "NAME"],
              headerStyle: { textAlign: "center", minWidth: "80px" },
              bodyStyle: { textAlign: "right" },
              location: {
                path: "744fc770d93a457c926e3940a6cdf8e7",
                param: ["NAME"]
              }
            },
            {
              rowSpan: 1,
              colSpan: 1,
              headerAlign: "center",
              isFixed: false,
              bodyAlign: "center",
              formatting: "n2",
              headerName: "武隆区",
              bodyCode: "PERSONTIME",
              path: "f6b46c53bb254981bc4d7b1e4229559c",
              param: ["PERSON", "PERSONTIME", "CODE"],
              isSort: true,
              headerStyle: { textAlign: "center", minWidth: "undefinedpx" },
              bodyStyle: { textAlign: "center" },
              location: {
                path: "f6b46c53bb254981bc4d7b1e4229559c",
                param: ["PERSON", "CODE"]
              }
            }
          ]
        ],
        Bodys: [
          {
            NAME: "张三",
            PERSON: 3148.0,
            PERSONTIME: 256.353
          },
          {
            NAME: "王五",
            PERSON: 888,
            PERSONTIME: 253
          }
        ],
        headersIdentity: [
          {
            id: "bm0vTy-f_Um38A44kzzM4A",
            parentId: "ROOT",
            index2: 3,
            level: 2,
            index: 5,
            fieldName: "YEAR",
            isFixed: false,
            headerName: "年份",
            alignment: "Left",
            formatType: "Default"
          },
          {
            id: "iWc085kUokWqJuO6S-6Zbw",
            parentId: "MgU6Bv_4HEeLYdjIrfSz4w",
            index2: 1,
            level: 3,
            index: 3,
            fieldName: "DISTRICTNAME",
            isFixed: false,
            headerName: "名称",
            alignment: "Left",
            formatType: "Default"
          },
          {
            id: "LJm9lVPSzki_Z0wzncbEHA",
            parentId: "MgU6Bv_4HEeLYdjIrfSz4w",
            index2: 2,
            level: 3,
            index: 4,
            fieldName: "DISTRICTID",
            isFixed: false,
            headerName: "编码",
            alignment: "Left",
            formatType: "Default"
          },
          {
            id: "KYmy72D_y0-oXXbClic2Zg",
            parentId: "D2oF3zRNokW0sZ32Df0QDw",
            index2: 4,
            level: 3,
            index: 7,
            fieldName: "RC",
            isFixed: false,
            headerName: "人次（人次）",
            alignment: "Left",
            formatType: "N0S"
          },
          {
            id: "kLgf5Z4ST0e0qdIYgt7DdQ",
            parentId: "D2oF3zRNokW0sZ32Df0QDw",
            index2: 5,
            level: 3,
            index: 8,
            fieldName: "RS",
            isFixed: false,
            headerName: "人数（人）",
            alignment: "Left",
            formatType: "N2S"
          },
          {
            id: "txeFy_0J3EOhaokuaAvCMA",
            parentId: "D2oF3zRNokW0sZ32Df0QDw",
            index2: 6,
            level: 3,
            index: 9,
            fieldName: "XMS",
            isFixed: false,
            headerName: "项目数（个）",
            alignment: "Left",
            formatType: "Default"
          }
        ]
      }
    }
  },
  // 卡片2
  {
    type: "wssFiche", // lineChart twoBarChart barChart
    // 可用于渲染类型选择框
    choice: typeForms,
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "300px" }, // 样式
    text: "卡片2", //组件标题
    border: true, // 显示组件边框
    grid: true, // 显示背景网格
    line: true, //背景发光
    // configUrl: [{ name: "跳转ID", value: "SDKADAKLDJD", param: {} }], //无跳转,数组传空或者NULL
    data: {
      titleName: "香港特别行政区",
      amount: "8654",
      unit: "元"
    }
  },
  // 时间线
  {
    type: "timeLine", // lineChart twoBarChart barChart
    // 可用于渲染类型选择框
    choice: typeForms,
    componentImg: require("@assets/images/custom/timeLine.jpg"),
    className: ["jk-col-24", "handle"], // 类名
    style: { height: "800px" }, // 样式
    text: "时间线", //组件标题
    border: true, // 显示组件边框
    grid: true, // 显示背景网格
    configUrl: [{ name: "跳转ID", value: "SDKADAKLDJD" }],
    data: {
      border: true,
      value: [
        {
          JE: "64,374.00",
          RC: 7.0,
          YM: "2020-02",
          PROJECTID: "500101wzXM05808",
          MONTH: "02",
          YEAR: "2020"
        }
        // {
        //   JE: "75,705.00",
        //   RC: 8.0,
        //   YM: "2020-06",
        //   PROJECTID: "500101wzXM05808",
        //   MONTH: "06",
        //   YEAR: "2020"
        // },
        // {
        //   JE: "50,713.00",
        //   RC: 6.0,
        //   YM: "2020-07",
        //   PROJECTID: "500101wzXM05808",
        //   MONTH: "07",
        //   YEAR: "2020"
        // },
        // {
        //   JE: "50,713.00",
        //   RC: 6.0,
        //   YM: "2020-07",
        //   PROJECTID: "500101wzXM05808",
        //   MONTH: "07",
        //   YEAR: "2020"
        // },
        // {
        //   JE: "50,713.00",
        //   RC: 6.0,
        //   YM: "2020-07",
        //   PROJECTID: "500101wzXM05808",
        //   MONTH: "07",
        //   YEAR: "2020"
        // },
        // {
        //   JE: "50,713.00",
        //   RC: 6.0,
        //   YM: "2020-07",
        //   PROJECTID: "500101wzXM05808",
        //   MONTH: "07",
        //   YEAR: "2020"
        // }
      ]
    }
  }
];
export const components = {
  jkRank: () => import("@components/chart/jkRank"),
  jkGraph: () => import("@components/chart/jkGraph"),
  wssFiche: () => import("@components/chart/wssFiche/wssFiche"),
  timeLine: () => import("@components/base/timeLine/timeLine"),
  wssMaps: () => import("@components/customization/maps"),
  wssForms: () => import("@components/searchFrame/searchFrame"),
  jkTable: () => import("@components/basics/moreTable/moreTable"),
  jkCustom: () => import("@components/custom/Earth/Earth2"),
  jkCard: () => import("@components/chart/jkCard"),
  PoorCountry: () => import("@components/custom/PoorCountry/PoorCountry"),
  SystemMonitoring: () =>
    import("@views/customization/SystemMonitoring/SystemMonitoring.vue"),
  ratioChartList2: () =>
    import("@components/customization/ratioChartList/ratioChartList2.vue")
};
