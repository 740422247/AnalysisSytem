/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-06-02 16:00:34
 * @LastEditors: joykit
 * @LastEditTime: 2020-07-01 15:46:14
 */
import "echarts/lib/chart/bar";
export function op(option, echarts, t) {
  const color = t;
  const label = JSON.parse(JSON.stringify(option.label));
  // 2020-07-06修改
  // const value = option.value;
  const value = option.value.map((v, i) => !i ? v : v.map(item => -1 * item));
  // 2020-07-06修改
  const flat = option.value.flat();
  const sort = flat.sort((a, b) => a - b);
  const showX = option.choice.showX;
  const showY = option.choice.showY;
  const max =
    Math.abs(sort[0]) > Math.abs(sort[sort.length - 1])
      ? Math.abs(sort[0])
      : Math.abs(sort[sort.length - 1]);

  return {
    tooltip: {
      trigger: "axis",
      formatter: e => {
        const sy = option.symbol;
        let str = "";

        // 2020-07-06修改
        e.forEach((item, i) => str += i ? item.name + ':' + item.data * (-1) + sy[i] + '<br/>' : item.name + ':' + item.data + sy[i] + '<br/>')
        // for (let i = 0; i < sy.length; i++) {
        //   str += sy[i].replace("{value}", Math.abs(e[i].value)) + "<br/>";
        // }
        // 2020-07-06修改
        return str;
      },
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      top: "2%",
      bottom: "2%",
      left: "0",
      right: "0", ///   调整大小
      containLabel: true
    },
    xAxis: [
      {
        type: "value",
        show: showX,
        axisTick: { show: false },
        max: max,
        min: -max,
        interval: max, //固定10根线
        splitLine: {
          lineStyle: {
            color: color.k36
          }
        },
        axisLine: {
          lineStyle: {
            color: color.k36
          }
        },
        axisLabel: {
          interval: 0, //横轴信息全部显示
          rotate: 1,
          textStyle: {
            color: color.k9
          }
        }
      }
    ],
    yAxis: [
      {
        type: "category",
        show: showY,
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: color.k36
          }
        },
        axisLabel: {
          textStyle: {
            color: color.k9
          }
        },
        data: label
      }
    ],
    series: [
      {
        type: "bar",
        barWidth: "12",
        xAxisIndex: 0,
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              {
                offset: 0,
                color: color.k37
              },
              {
                offset: 1,
                color: color.k38
              }
            ]),
            barBorderRadius: [0, 6, 6, 0],
            borderWidth: 0
          }
        },
        data: value[0]
      },
      {
        type: "bar",
        barWidth: "12",
        xAxisIndex: 0,
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              {
                offset: 0,
                color: color.k39
              },
              {
                offset: 1,
                color: color.k40
              }
            ]),
            barBorderRadius: [6, 0, 0, 6],
            borderWidth: 0
          }
        },
        data: value[1],
        label: {
          normal: {
            show: false
          }
        }
      }
    ]
  };
}
