/*
 * @Descripttion: 散点图
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-09 16:44:11
 * @LastEditors: wss
 * @LastEditTime: 2020-09-22 16:58:21
 */
import echarts from "echarts";
import { getColors } from "./colors";
// import "echarts/lib/chart/pie";
export function op(option, echarts, t) {
  const bg = new echarts.graphic.RadialGradient(0.1, 0.3, 0.8, [
    {
      offset: 0,
      color: "#f7f8fa"
    },
    {
      offset: 1,
      color: "#cdd0d5"
    }
  ]);
  const colors = getColors();
  const color = t;
  const seriesNames = option.symbol
  const series = [{
    type: 'scatter',
    symbolSize: 20,
    name: seriesNames[0],
    data: option.value,
    emphasis: {
      show: true
    }
  }]
  // let series = []
  // if (Array.isArray(option.value) && Array.isArray(option.value[0])) {
  //   const x = data.map((opt, i) => Math.max(...data.map(item => item[i])));
  //   series = data.map((item, index) => ({ ...seriesOptions, name: seriesNames[index], data: item.map((value, i) => ([x[i], value, seriesNames[index]])) }))
  // } else {
  //   series = [{ ...seriesOptions, name: seriesNames[0], data: data.map(item => ([item, item, seriesNames[0]])) }]
  // }
  return {
    color: colors,
    backgroundColor: 'transparent',
    // legend: {
    // },
    grid: {
      top: "6%",
      bottom: "6%",
      left: '6%',
      right: "6%",
      containLabel: true
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: color.k41
        }
      },
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
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: color.k41
        }
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
      },
      scale: true
    },
    series: series
  };
}
