/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-06-02 16:00:34
 * @LastEditors: joykit
 * @LastEditTime: 2020-06-02 16:11:56
 */
export function op(option, t) {
  const color = t.default;
  const flat = option.value.flat();
  let len = flat.sort((a, b) => a - b)[flat.length - 1];
  len = len
    .toString()
    .split(".")[0]
    .toString().length;
  let xAxis = null;
  let series = null;
  return {
    tooltip: {
      trigger: "axis",
      formatter: item => {},
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      top: "8%",
      bottom: "16%",
      left: _left(len),
      right: "0"
    },
    xAxis: [
      {
        type: "value",
        axisTick: { show: false },
        max: max,
        min: -max,
        interval: oppt && !!oppt.interval ? max : (max * 2) / 10, //固定10根线
        // data:[-500,-400,-300,-200,-100,0,100,200,300,400,500],
        splitLine: {
          lineStyle: {
            color: ["rgba(7, 59, 151, 0.7)"]
          }
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "red"
          }
        },
        axisLabel: {
          textStyle: {
            color: "#81A7DC"
          },
          formatter: item => {
            if (item < 0) {
              return item * -1;
            } else {
              return item;
            }
          }
        }
      }
    ],
    yAxis: [
      {
        type: "category",
        axisTick: { show: false },
        // splitLine: {
        //   lineStyle: {
        //     color:["#000"]
        //   }
        // },
        axisLine: {
          lineStyle: {
            color: ["rgba(7, 59, 151, 0.7)"]
          }
        },
        axisLabel: {
          color: "red",
          textStyle: {
            color: "#81A7DC"
          }
        },
        // data: ["0-19岁", "20-29岁", "30-39岁", "40-49岁", "40-49岁", "50-59岁", "60-69岁", "70-79岁", "80-89岁", "90岁以上"]
        data: option.Ydata
      }
    ],
    series: [
      {
        name: "女",
        type: "bar",
        stack: "总量",
        barWidth: "12",
        xAxisIndex: 0,
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              {
                offset: 0,
                color: "rgba(220,153,24,1)"
              },
              {
                offset: 1,
                color: "#26297F"
              }
            ]),
            barBorderRadius: [0, 6, 6, 0],
            borderWidth: 0
          }
        },
        // data: [320, 302, 341, 374, 390, 450, 420, 390, 450, 420]
        data: option.data
      },
      {
        name: "男",
        type: "bar",
        barWidth: "12",
        xAxisIndex: 0,
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              {
                offset: 0,
                color: "#202582"
              },
              {
                offset: 1,
                color: "#06A8EB"
              }
            ]),
            barBorderRadius: [6, 0, 0, 6],
            borderWidth: 0
          }
        },
        stack: "总量",
        // data: [-120, -132, -101, -134, -190, -230, -210, -190, -230, -210],
        data: option.data1,
        label: {
          normal: {
            show: false,
            formatter: function(params) {
              // console.log(params)
              if (params.data < 0) {
                return params.data * -1;
              } else {
                return params.data;
              }
            }
          }
        }
      }
    ]
  };
}

function _left(len) {
  if (len === 1) return len * 20 + "px";
  if (len === 2) return len * 12 + "px";
  if (len === 3) return len * 11 + "px";
  if (len === 4) return len * 12 + "px";
  if (len === 5) return len * 10 + "px";
  if (len === 6) return len * 9 + "px";
  if (len === 7) return len * 10 + "px";
  if (len === 8) return len * 9 + "px";
  if (len === 9) return len * 9 + "px";
  return len * 9 + "px";
}
