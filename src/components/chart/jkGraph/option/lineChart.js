//发放人次
import "echarts/lib/chart/line";
import "echarts/lib/component/title";
import { getLegendData } from "./commonMethods";
import { dealZero } from './dataDeal'

import { getColors } from "./colors";
export function op(option, echarts, t) {
  if (option.pageForms && !option.pageForms.showZero) {
    const { value, label } = dealZero(option.value, option.label);
    option.value = value;
    option.label = label;
  }
  const colors = getColors();
  const color = t;
  // const showX = option.choice.showX;
  // const showY = option.choice.showY;
  let xAxis = null;
  let series = null;
  if (Array.isArray(option.label)) {
    xAxis = {
      data: option.label,
      // show: showX,
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

  series = [];
  const legendData =
    option.argument && option.argument.apiArgument.length
      ? getLegendData(option.argument.apiArgument, option.pageForms.showData)
      : [];
  if (option.value[0].constructor !== Array) {
    option.value = [option.value];
  }
  // console.log(option.value);
  for (let i = 0; i < option.value.length; i++) {
    series.push({
      //name: "发放人次",
      type: "line",
      name: legendData.length ? legendData[i] : "",
      barWidth: 0,
      smooth: true, //平滑曲线显示
      showAllSymbol: true, //显示所有图形。
      symbol: "circle", //标记的图形为实心圆
      symbolSize: 6, //标记的大小
      // step: "middle",
      itemStyle: {
        //折线拐点标志的样式
        color: "#ccc"
      },
      lineStyle: {
        //为保证和图例颜色一致,线条不能设置颜色
        // color: colors[i % colors.length]
        color: colors[i % colors.length]
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

  // console.log(series);
  return {
    // color: ['red','blue', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
    backgroundColor: "transparent",
    legend: {
      show: false,
      right: 15,
      textStyle: {
        color: color.k9
      }
    },
    textStyle: {
      color: "red"
    },
    grid: {
      top: "30px",
      bottom: "4%",
      left: 0,
      right: "0",
      containLabel: true
    },
    tooltip: {
      trigger: "item",
      formatter: function (e) {
        const sy = option.symbol;
        let str = "";
        e.forEach(
          (item, i) =>
            (str +=
              '<span style="background-color: ' +
              item.color +
              ';display:inline-block;border-radius:12px;width:12px;height:12px;margin-right:8px"></span>' +
              item.name +
              ":" +
              (item.data ? item.data : 0) +
              sy[i] +
              "<br/>")
        );
        // 2020-07-23修改
        // if (option.pageForms) {
        //   const tipLabel = option.pageForms.showData.map(
        //     item =>
        //       option.argument.apiArgument
        //         .find(arg => arg.value === item)
        //         .label.split("#")[0]
        //   );
        //   e.forEach(
        //     (item, i) =>
        //       (str +=
        //         '<span style="background-color: ' +
        //         colors[i % colors.length] +
        //         ';display:inline-block;border-radius:12px;width:12px;height:12px;margin-right:8px"></span>' +
        //         tipLabel[i] +
        //         item.name +
        //         ":" +
        //         (item.data ? item.data : 0) +
        //         sy[i] +
        //         "<br/>")
        //   );
        // } else {
        //   for (let i = 0; i < sy.length; i++) {
        //     str +=
        //       sy[i]
        //         .replace("{name}", e[i].name)
        //         .replace("{value}", e[i].value) + "<br/>";
        //   }
        // }
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
        // show: showY,
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
