//发放人次
import "echarts/lib/chart/line";
export function op(option, echarts, t) {

  const color = t;
  const flat = option.value.flat();
  const showX = option.choice.showX;
  const showY = option.choice.showY;
  let xAxis = null;
  let series = null;
  if (Array.isArray(option.label)) {
    xAxis = {
      data: option.label,
      show: showX,
      axisTick: {
        show: true //隐藏X轴刻度
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: color.k9 //X轴文字颜色
        }
      },
      axisLine: {
        lineStyle: {
          color: color.k29
        }
      }
    };
  }

  if (Array.isArray(option.value) && !Array.isArray(option.value[0])) {
    series = {
      //name: "发放人次",
      type: "line",
      barWidth: 15,

      smooth: true, //平滑曲线显示
      showAllSymbol: true, //显示所有图形。
      symbol: "circle", //标记的图形为实心圆
      symbolSize: 6, //标记的大小
      itemStyle: {
        //折线拐点标志的样式
        color: color.white
      },
      lineStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: color.k30 // 0% 处的颜色
            },
            {
              offset: 1,
              color: color.k31 // 100% 处的颜色
            }
          ],
          false
        ),
        lineWidth: 4
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: color.k32 // 0% 处的颜色
            },
            {
              offset: 1,
              color: color.k33 // 100% 处的颜色
            }
          ],
          false
        )
      },
      data: option.value
    };
  } else if (Array.isArray(option.value) && Array.isArray(option.value[0])) {
    series = [];
    for (let i = 0; i < option.value.length; i++) {
      series.push({
        //name: "发放人次",
        type: "line",
        barWidth: 15,
        smooth: true, //平滑曲线显示
        showAllSymbol: true, //显示所有图形。
        symbol: "circle", //标记的图形为实心圆
        symbolSize: 6, //标记的大小
        itemStyle: {
          //折线拐点标志的样式
          color: color.white
        },
        lineStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: color.k30 // 0% 处的颜色
              },
              {
                offset: 1,
                color: color.k31 // 100% 处的颜色
              }
            ],
            false
          ),
          lineWidth: 4
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: color.k32 // 0% 处的颜色
              },
              {
                offset: 1,
                color: color.k33 // 100% 处的颜色
              }
            ],
            false
          )
        },
        data: option.value[i]
      });
    }
  }


  return {
    // color: ['red','blue', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
    backgroundColor: "transparent",
    grid: {
      top: "4%",
      bottom: "4%",
      left: 0,
      right: "0",
      containLabel: true
    },
    tooltip: {
      trigger: "axis",
      formatter: function (e) {
        const sy = option.symbol;
        let str = "";
        // 2020-07-06修改
        e.forEach((item, i) => str += item.name + ':' + item.data + sy[i] + '<br/>')
        // for (let i = 0; i < sy.length; i++) {
        //   str +=
        //     sy[i].replace("{name}", e[i].name).replace("{value}", e[i].value) +
        //     "<br/>";
        // }
        // 2020-07-06修改
        return str;
      },
      //extraCssText:'width:130px; white-space:pre-wrap',
      axisPointer: {
        type: "shadow",
        shadowStyle: {
          shadowColor: color.k34
        },
        label: {
          show: true
        }
      }
    },

    xAxis: xAxis,
    yAxis: [
      {
        type: "value",
        show: showY,
        nameTextStyle: {
          color: color.k35
        },

        splitLine: {
          show: false
        },
        axisTick: {
          show: true
        },
        axisLine: {
          lineStyle: {
            color: color.k29
          }
        },
        axisLabel: {
          show: true,
          formatter: "{value} ", //右侧Y轴文字显示
          textStyle: {
            color: color.k9
          }
        }
      },
      {
        type: "value",
        gridIndex: 0,
        // min: 50,
        // max: 100,
        splitNumber: 8,
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        }
      }
    ],
    series: series
  };
}
