/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-06-03 14:55:03
 * @LastEditors: wss
 * @LastEditTime: 2020-09-17 17:38:30
 */

import "echarts/lib/chart/bar";
// 2020/07/29修改
import { getLinearColors } from "./colors";
function NumFormat(value) {
  var a = parseFloat(value);
  // console.log(a,value)
  // console.log("-------------分割线-------------")
  if (isNaN(a) || a < 1000) {
    return value;
  } else {
    if (a === value) {
      if (!value) return " ";
      var isz = Math.floor(value) === value;
      // console.log(isz, Math.floor(value), value);
      try {
        var intPart = Number(value).toFixed(); // 获取整数部分
      } catch (error) {}
      let intPartFormat;
      if (Math.floor(value) === value) {
        intPartFormat = intPart
          .toString()
          .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 将整数部分逢三一断
      } else {
        intPartFormat = parseFloat(value)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); //使用正则替换，每隔三个数加一个','
      }

      return intPartFormat;
    }
    return value.toFixed(2);
  }
}
// 2020/07/29修改
export function op(opt, echarts, t) {
  const colors = getLinearColors();
  const max1 = Math.max(...opt.value[0]);
  const max2 = Math.max(...opt.value[1]);
  console.log(max1);
  console.log(max2);
  const option = {
    source: opt.value,
    max1: max1,
    max2: max2
  };
  return {
    // backgroundColor: "#142058",
    color: ["rgba(7,162,230,1)", "rgba(52,188,123,1)", "rgba(217,151,26,1)"],
    // color: ["red", "red", "red"],
    title: {
      text: option.title,
      textStyle: {
        color: "#fff",
        fontWeight: "normal",
        fontSize: "18"
      }
    },
    legend: {
      //图例
      right: 20,
      itemWidth: 14,
      itemHeight: 14,
      // backgroundColor: "#fff",
      borderRadius: "5",
      selectedMode: false,
      icon: "circle",
      // data: [{
      //   name: "发放金额(万元)",
      //   icon: "image://img/one/zje.png",
      // },{
      //   name: "发放人次(人)",
      //   icon: "image://img/one/zrc.png"
      // }
      // ],
      textStyle: {
        color: "#81A7DC"
      }
    },
    grid: {
      top: "50px",
      left: "50px",
      right: "15px",
      bottom: "50px"
    },
    tooltip: { show: "true" },
    // tooltip: {
    //   show: "true",
    //   trigger: 'item',
    //   backgroundColor: 'rgba(0,0,0,0.7)', // 背景
    //   padding: [8, 10], //内边距
    //   extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
    //   formatter: function (params) {
    //     if (params.seriesIndex == "3" || params.seriesIndex == "4" || params.seriesIndex == "5") {
    //       return params.name + '<br>' + params.seriesName + ' ： 第 ' + params.value + ' 名';
    //     }
    //   }
    // },
    yAxis: [
      {
        show: false,
        max: max1,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#81A7DC"
          }
        }
      },
      {
        show: false,
        max: max2,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#81A7DC"
          }
        }
      }
    ],
    dataset: {
      source: option.source
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          show: false
        },
        axisLabel: {
          color: "#81A7DC"
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#073B97"
          }
        }
        // data: ["0-19岁", "20-29岁", "30-39岁", "40-49岁", "40-49岁", "50-59岁"]
      },
      {
        type: "category",
        color: "red",
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitArea: {
          show: false
        },
        splitLine: {
          show: false
        }
        // data: ["0-19岁", "20-29岁", "30-39岁", "40-49岁", "40-49岁", "50-59岁"]
      },
      {
        type: "category",
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitArea: {
          show: false
        },
        splitLine: {
          show: false
        }
        // data: ["0-19岁", "20-29岁", "30-39岁", "40-49岁", "40-49岁", "50-59岁"]
      }
    ],
    series: [
      {
        //背景柱子
        type: "bar",
        xAxisIndex: 1,
        // datasetIndex:0,
        barGap: "100%",
        // data: [30, 30, 30, 30, 30, 30],
        zlevel: 1,
        barWidth: "18",
        itemStyle: {
          normal: {
            color: "rgb(32,37,130)",
            borderWidth: 0,
            shadowBlur: {
              shadowColor: "rgba(255,255,255,0.31)",
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 2
            }
          }
        }
      },
      {
        type: "bar",
        xAxisIndex: 1,
        yAxisIndex: 1,

        barGap: "100%",
        // data: [30, 30, 30, 30, 30, 30],
        zlevel: 1,
        barWidth: "18",
        itemStyle: {
          normal: {
            color: "rgb(32,37,130)",
            borderWidth: 0,
            shadowBlur: {
              shadowColor: "rgba(255,255,255,0.31)",
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 2
            }
          }
        }
      },
      {
        //数据柱子
        // name: "发放人次(人)",
        type: "bar",
        barWidth: "18",
        label: {
          //文字配置
          show: true,
          position: "top",
          formatter: function(e) {
            // console.log(e)
            return NumFormat(e.data[3]);
          },
          color: "#fff"
        },
        itemStyle: {
          normal: {
            show: true,

            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#06A8EB"
              },
              {
                offset: 1,
                color: "#202784"
              }
            ]),
            barBorderRadius: 0,
            borderWidth: 0
          }
        },
        zlevel: 2,
        barGap: "100%"
        // data: [8, 17, 26, 12, 12, 25]
      },
      {
        // name: "发放金额(万元)",
        type: "bar",
        barWidth: "18",
        yAxisIndex: 1,
        label: {
          //文字配置
          formatter: function(e) {
            // console.log(e.data[4])
            return NumFormat(e.data[4]);
          },
          show: true,
          position: "top",
          color: "#fff"
        },
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#34BC7B"
              },
              {
                offset: 1,
                color: "#0F116A"
              }
            ]),
            barBorderRadius: 0,
            borderWidth: 0
          }
        },
        zlevel: 2,
        barGap: "100%"
        // data: [8, 17, 26, 12, 15, 12]
      },
      {
        //圆球，渐变影响，单独处理
        name: "发放人次(人)",
        type: "bar",
        xAxisIndex: 2,
        itemStyle: {
          normal: {
            show: false,
            color: "#06A8EB",
            barBorderRadius: 0,
            borderWidth: 0
          }
        },

        data: []
      },
      {
        name: "发放金额(万元)",
        type: "bar",
        xAxisIndex: 2,
        itemStyle: {
          normal: {
            show: false,
            color: "#34BC7B",
            barBorderRadius: 0,
            borderWidth: 0
          }
        },
        data: []
      }
    ]
  };
}
