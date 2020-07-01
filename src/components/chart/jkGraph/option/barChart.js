/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-06-03 14:55:03
 * @LastEditors: joykit
 * @LastEditTime: 2020-06-04 10:42:34
 */
import "echarts/lib/chart/bar";
export function op(option, echarts, t) {
  const label = option.label;
  const color = t;
  const c = option.choice.seriesColor;
  const showX = option.choice.showX;
  const showY = option.choice.showY;
  let xAxis = null;
  let series = [];
  if (Array.isArray(option.label)) {
    xAxis = {
      type: "category",
      data: label,
      show: showX,
      axisLine: {
        lineStyle: {
          color: color.k41
        }
      },
      axisLabel: {
        margin: 10,
        color: color.k9,
        textStyle: {
          fontSize: 14
        }
      }
    };
  }

  if (Array.isArray(option.value) && Array.isArray(option.value[0])) {
    for (let i = 0; i < option.value.length; i++) {
      const _c = c && c[i] && c[i].split("-");
      series.push({
        type: "bar",
        data: option.value[i],
        barWidth: "9px",
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: (_c && _c[0]) || color.k42 // 0% 处的颜色
                },
                {
                  offset: 0.8,
                  color: (_c && _c[1]) || color.k43 // 100% 处的颜色
                }
              ],
              false
            ),
            barBorderRadius: [30, 30, 30, 30],
            shadowBlur: 4
          }
        }
      });
    }
  } else {
    series = {
      type: "bar",
      data: option.value,
      barWidth: "9px",
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: color.k42 // 0% 处的颜色
              },
              {
                offset: 0.8,
                color: color.k43 // 100% 处的颜色
              }
            ],
            false
          ),
          barBorderRadius: [30, 30, 30, 30],
          shadowBlur: 4
        }
      }
    };
  }
  return {
    backgroundColor: "",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        shadowStyle: {
          shadowColor: color.k34
        }
      },
      formatter: function(e) {
        const sy = option.symbol;
        let str = "";
        for (let i = 0; i < sy.length; i++) {
          str +=
            sy[i].replace("{name}", e[i].name).replace("{value}", e[i].value) +
            "<br/>";
        }
        return str;
      }
    },
    grid: {
      top: "6%",
      bottom: "6%",
      left: 0,
      right: "0",
      containLabel: true
    },
    xAxis: xAxis,
    yAxis: [
      {
        splitLine: {
          show: false
        },
        show: showY,
        axisLine: {
          lineStyle: {
            color: color.k41
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: color.k9
          }
        }
      }
    ],
    series: series
  };
}
