/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-06-03 14:55:03
 * @LastEditors: wss
 * @LastEditTime: 2020-09-27 15:01:44
 */
import "echarts/lib/chart/bar";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import { dealZero } from './dataDeal'
// 2020/07/29修改
import { getLinearColors } from "./colors";
// import { getLegendData } from "./commonMethods"
// 2020/07/29修改
export function op(option, echarts, t) {
  if (option.pageForms && !option.pageForms.showZero) {
    const { value, label } = dealZero(option.value, option.label);
    option.value = value;
    option.label = label;
  }
  // 2020/07/29修改
  const colors = getLinearColors();
  // 2020/07/29修改
  // const label = option.label;
  const color = t;
  const c = option.choice.seriesColor;
  // const showX = option.choice.showX;
  // const showY = option.choice.showY;
  let xAxis = null;
  let series = [];
  // if (Array.isArray(option.label)) {
  //   xAxis = {
  //     type: "category",
  //     data: label,
  //     show: showX,
  //     axisLine: {
  //       lineStyle: {
  //         color: color.k41
  //       }
  //     },
  //     axisLabel: {
  //       margin: 10,
  //       color: color.k9,
  //       textStyle: {
  //         fontSize: 14
  //       }
  //     }
  //   };
  // }
  // const legendData = (option.argument && option.pageForms && option.argument.apiArgument.length) ? getLegendData(option.argument.apiArgument, option.pageForms.showData) : [];

  if (Array.isArray(option.value) && Array.isArray(option.value[0])) {
    for (let i = 0; i < option.value.length; i++) {
      const _c = c && c[i] && c[i].split("-");
      series.push({
        type: "bar",
        // name: legendData.length ? legendData[i] : '',
        data: option.value[i],
        ...(option =>
          option.pageForms &&
            option.pageForms.showType &&
            option.pageForms.showType.includes("pile")
            ? { stack: "合并" }
            : {})(option),
        barWidth: "9px",
        itemStyle: {
          normal: {
            // 2020/07/29修改
            color: colors[i % colors.length],
            // color: new echarts.graphic.LinearGradient(
            //   0,
            //   0,
            //   0,
            //   1,
            //   [
            //     {
            //       offset: 0,
            //       color: (_c && _c[0]) || color.k42 // 0% 处的颜色
            //     },
            //     {
            //       offset: 0.8,
            //       color: (_c && _c[1]) || color.k43 // 100% 处的颜色
            //     }
            //   ],
            //   false
            // ),
            // 2020/07/29修改
            ...(option =>
              option.pageForms &&
                option.pageForms.showType &&
                (!option.pageForms.showType.includes("pile") && option.pageForms.isBorderRadius)
                ? { barBorderRadius: [30, 30, 30, 30] }
                : {})(option),
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
          // 2020/07/29修改
          color: colors[0],
          // color: new echarts.graphic.LinearGradient(
          //   0,
          //   0,
          //   0,
          //   1,
          //   [
          //     {
          //       offset: 0,
          //       color: color.k42 // 0% 处的颜色
          //     },
          //     {
          //       offset: 0.8,
          //       color: color.k43 // 100% 处的颜色
          //     }
          //   ],
          //   false
          // ),
          // 2020/07/29修改
          barBorderRadius: [30, 30, 30, 30],
          shadowBlur: 4
        }
      }
    };
  }
  // const d = option.pageForms.value.map(item => option.argument.apiArgument.find(a => a.value = item))
  return {
    backgroundColor: "transparent",

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        shadowStyle: {
          shadowColor: color.k34
        }
      },
      formatter: function (e) {
        const sy = option.symbol;
        let str = "";
        // 2020-07-29修改 加入span元素
        e.forEach(
          (item, i) =>
            (str +=
              '<span style="background-color: ' +
              item.color.colorStops[0].color +
              ';display:inline-block;border-radius:12px;width:12px;height:12px;margin-right:8px"></span>' +
              item.name +
              ":" +
              (item.data ? item.data : 0) +
              sy[i] +
              "<br/>")
        );
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
      top: "6%",
      bottom: "6%",
      left: '6%',
      right: "6%",
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
