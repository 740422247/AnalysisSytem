/*
 * @Descripttion: 散点图配置项
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-09 16:44:11
 * @LastEditors: wss
 * @LastEditTime: 2020-09-27 09:41:39
 */
import "echarts/lib/chart/radar";
import "echarts/lib/component/legend";
import { getColors } from "./colors";
// import { dealZero } from './dataDeal'

export function op(option, echarts, t) {
  // if (option.pageForms && !option.pageForms.showZero) {
  // const { value, label } = dealZero(option.value, option.label);
  // option.value = value;
  // option.label = label;
  // }
  const colors = getColors();
  const theme = t;

  if (!option.value[0] || option.value[0].length === 0) return;
  const v = option.value;
  // let res = [];
  // for (let i = 0; i < option.value[0].length; i++) {
  //   const result = Math.max(...v.map(item => item[i]));
  //   res.push(result);
  // }
  // const res1 = v.map((opt, i) => Math.max(...v.map(item => item[i])));

  // const re = res1.map(item => {
  //   return item * 1.2;
  // });
  // eslint-disable-next-line prefer-const
  let seriesData = [];
  let indicator = [];
  if (Array.isArray(option.value) && Array.isArray(option.value[0])) {
    for (let i = 0; i < option.value.length; i++) {
      seriesData.push({
        value: option.value[i],
        name: option.symbol[i]
      });
    }
    indicator = option.label.map((item, index) => ({ name: item, max: Math.max(...option.value.map(v => v[index])) }))
  } else {
    seriesData.push({ value: option.value, name: option.label[0] });
    indicator = option.label.map((item, index) => ({ name: item, max: option.value[index] }))
  }
  return {
    color: colors,
    tooltip: {
    },
    legend: {
      // type: 'scroll',
      right: 20,
      textStyle: {
        color: "#fff",
        backgroundColor: theme.k1,
        borderRadius: 3,
        padding: [3, 5]
      },
      data: option.label
    },
    textStyle: {
      color: "#fff",
      backgroundColor: theme.k1,
      borderRadius: 3,
      padding: [3, 5]
    },
    radar: {
      // shape: 'circle',//雷达类型.圆形
      name: {
        textStyle: {
          color: "#fff",
          borderRadius: 3,
          padding: [3, 5]
        }
      },

      center: ["50%", "55%"],
      textStyle: {
        color: "#fff",
        backgroundColor: theme.k1,
        borderRadius: 3,
        padding: [3, 5]
      },
      splitNumber: 4, //指示器轴的分割段数。
      indicator: indicator,
      //坐标轴线线
      axisLine: {
        lineStyle: {
          color: theme.w18
          // shadowBlur: "red",
          // shadowColor: "red"
        }
      },
      axisTick: { show: false },
      //蜘蛛网颜色
      splitLine: {
        lineStyle: {
          color: theme.w18
          // shadowBlur: "red",
          // shadowColor: "red"
        }
      },
      splitArea: {
        areaStyle: {
          color: 'transparent'
        }
      }
    },
    series: [
      {
        name: "预算 vs 开销（Budget vs spending）",
        type: "radar",
        // areaStyle: {normal: {}},
        data: seriesData
      }
    ]
  };
}
