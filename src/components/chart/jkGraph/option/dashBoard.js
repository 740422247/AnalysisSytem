// import echarts from "echarts";
/*
仪表盘**/
import "echarts/lib/chart/gauge";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
// import "echarts/lib/util/graphic";
const graphic = require("echarts/lib/util/graphic");
export function op(option) {
  return {
    title: {
      //show:false,
      x: "center",
      top: 80,
      // text:'影响力指数：3.68',
      // subtext: '影响力指数：3.68',
      textStyle: {
        color: "#2cadff",
        fontSize: 12
      }
    },
    tooltip: {
      show: false,
      //  formatter: "{a} <br/>{b} {c}",
      backgroundColor: "#F7F9FB",
      borderColor: "#92DAFF",
      borderWidth: "1px",
      textStyle: {
        color: "black"
      },
      formatter: function(param) {
        return (
          '<em style="color:' +
          param.color +
          ';">影响力指数：' +
          param.value +
          "</em> "
        );
      }
    },
    series: [
      {
        name: "信用分",
        type: "gauge",
        // startAngle: 180,
        // endAngle: 0,
        min: 0,
        max: 100,
        radius: "85%",
        title: {
          color: "#fff",
          offsetCenter: ["0%", "110%"]
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 0,
            shadowBlur: 0,
            color: [
              [0.181818181818182, "#00ccd0"],
              // [0.4, '#E98E2C'],
              // [0.6, '#DDBD4D'],
              [0.818181818181818, "#2cadff"],
              [1, "#e75b64"]
            ]
          }
        },
        axisTick: {
          show: true,
          splitNumber: 1,
          length: 20, // 属性length控制线长
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "auto"
          }
        },
        splitNumber: 10,
        splitLine: {
          // 分隔线
          show: false,
          length: 30, // 属性length控制线长
          lineStyle: {
            // 属性lineStyle（详见lineStyle）控制线条样式
            color: "auto"
          }
        },
        axisLabel: {
          // formatter: function(e) {
          //     switch (e + "") {
          //         case "20":
          //             return "较小";
          //             //return "";
          //         case "100":
          //             return "较大";
          //             //return "";
          //         case "200":
          //             return "非常大";
          //             //return "";
          //         default:
          //             return e;
          //     }
          // },
          textStyle: {
            fontSize: 12,
            fontWeight: ""
          }
        },
        detail: {
          show: true,
          offsetCenter: ["0%", "60%"],
          color: "#fff",
          formatter: function(params) {
            return params + "%";
          },
          textStyle: {
            fontSize: 16
          }
        },
        data: [
          {
            value: option.value,
            name: option.name + `(` + option.label + `)`,
            color: "#fff"
          }
        ]
      },

      {
        type: "gauge",
        radius: "85%",
        title: {
          //标题
          color: "#fff",
          offsetCenter: ["0%", "90%"]
        },
        min: 0,
        max: 100,
        center: ["50%", "50%"],

        splitNumber: 10, //刻度数量
        startAngle: 230,
        endAngle: 310,
        axisLine: {
          show: true,
          lineStyle: {
            width: 7,
            color: [
              [
                1,
                new graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#01B8DA"
                  },

                  // {
                  //     offset: 0.2,
                  //     color: '#2CB7C7'
                  // },

                  {
                    offset: 0.5,
                    color: "#F3CF41"
                  },

                  // {
                  //     offset: 0.6,
                  //     color: '#2D89ED'
                  // },

                  // {
                  //     offset: 0.8,
                  //     color: '#7765B4'
                  // },

                  {
                    offset: 1,
                    color: "#F34141"
                  }
                ])
              ]
            ]
          }
        },
        //分隔线样式。
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },

        //仪表盘详情，用于显示数据。
        detail: {
          show: false,
          offsetCenter: [0, 0],
          color: "#ddd",
          formatter: function(params) {
            return params;
          },
          textStyle: {
            fontSize: 12
          }
        }
        // data: [{
        //     value: 40,
        //     name: '内存使用率(2G)',
        //     color: "#fff"
        // }]
      },
      {
        name: "最内层线",
        type: "gauge",
        radius: "25%",
        center: ["50%", "55%"],
        startAngle: 220,
        endAngle: -40,
        axisLine: {
          show: false,
          lineStyle: {
            opacity: 0
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            opacity: 0
          }
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          length: 1,
          lineStyle: {
            color: "#00b3ff",
            width: 1,
            type: "solid"
          }
        },
        detail: {
          show: false
        },
        pointer: {
          show: false
        }
      }
    ]
  };
}
