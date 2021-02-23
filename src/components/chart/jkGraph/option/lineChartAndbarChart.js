/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-09-27 09:48:29
 * @LastEditors: wss
 * @LastEditTime: 2020-09-28 09:46:29
 */
//发放人次
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import { getLegendData } from "./commonMethods";

import { getColors, getLinearColors } from "./colors";
export function op(option, echarts, t) {
  const colors = getLinearColors();
  const color = t;
  const c = option.choice.seriesColor;
  let xAxis = null;
  let series = [];
  const legendData =
    option.argument && option.argument.apiArgument.length
      ? getLegendData(option.argument.apiArgument, option.pageForms.showData)
      : [];
  if (Array.isArray(option.value) && !Array.isArray(option.value[0])) {
    option.value = [option.value];
  }
  for (let i = 0; i < option.value.length; i++) {
    const _c = c && c[i] && c[i].split("-");
    series.push({
      type: "bar",
      name: legendData.length ? legendData[i] : "",
      data: option.value[i],
      // ...(option =>
      // option.pageForms &&
      // option.pageForms.showType &&
      // option.pageForms.showType.includes("pile")
      //   ? { stack: "合并" }
      //   : {})(option),
      // stack: true,
      barWidth: "9px",
      itemStyle: {
        normal: {
          color: colors[i % colors.length],
          ...(option =>
            option.pageForms &&
            option.pageForms.showType &&
            !option.pageForms.showType.includes("pile")
              ? { barBorderRadius: [30, 30, 30, 30] }
              : {})(option),
          shadowBlur: 4
        }
      }
    });
  }
  for (let i = 0; i < option.value.length; i++) {
    series.push({
      //name: "发放人次",
      type: "line",
      name: legendData.length ? legendData[i] : "",
      barWidth: 15,
      smooth: true, //平滑曲线显示
      showAllSymbol: true, //显示所有图形。
      symbol: "circle", //标记的图形为实心圆
      symbolSize: 6, //标记的大小
      // step: "middle",
      itemStyle: {
        //折线拐点标志的样式
        color: colors[i % colors.length]
      },
      lineStyle: {
        //为保证和图例颜色一致,线条不能设置颜色
        // color: colors[i % colors.length]
      },
      areaStyle: option.areaStyle
        ? {
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
          }
        : null,
      data: option.value[i]
    });
  }
  return {
    backgroundColor: "transparent",

    legend: {
      textStyle: { color: "#fff" },
      icon: "circle"
    },

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
        // 2020-07-29修改 加入span元素
        e.forEach((item, i) => {
          if (i > e.length / 2 - 1) return;
          str +=
            '<span style="background-color: ' +
            item.color.colorStops[0].color +
            ';display:inline-block;border-radius:12px;width:12px;height:12px;margin-right:8px"></span>' +
            item.name +
            ":" +
            (item.data ? item.data : 0) +
            sy[i] +
            "<br/>";
        });
        // for (let i = 0; i < sy.length; i++) {
        //   str +=
        //     sy[i].replace("{name}", e[i].name).replace("{value}", e[i].value) +
        //     "<br/>";
        // }
        // 2020-07-06修改
        return str;
      }
    },
    grid: {
      // top: "26%",
      // bottom: "6%",
      // left: 0,
      // right: "0",
      containLabel: true
    },
    ...getAxis(option, color),
    series: series
  };
}

function getAxis(option, color) {
  const label = {
    type: "category",
    data: option.label,
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

  const value = [
    {
      type: "value",
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: color.k41
        }
      },
      axisTick: {
        show: true
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: color.k9
        }
      }
    }
  ];

  if (
    option.pageForms &&
    option.pageForms.showType &&
    option.pageForms.showType.includes("Strip")
  ) {
    return { yAxis: label, xAxis: value };
  } else {
    return { xAxis: label, yAxis: value };
  }
}
