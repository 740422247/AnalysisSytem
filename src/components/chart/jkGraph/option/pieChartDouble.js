/*
 * @Descripttion: 散点图配置项
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-09 16:44:11
 * @LastEditors: wss
 * @LastEditTime: 2020-10-22 17:33:20
 */
import "echarts/lib/chart/pie";
import "echarts/lib/chart/line";
import { getColors } from "./colors";
import "echarts/lib/component/legend";
import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/markArea";
import img from "@assets/image/towards-the-right.png";
// import echarts from "echarts";
function sum(arr) {
  let s = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    s += arr[i];
  }
  return s;
}
export function op(option, echarts, t, l = undefined, wh = []) {
  // console.log("option:", option.value);
  // console.log("t:", t);
  option.value =
    Array.isArray(option.value) && Array.isArray(option.value[0])
      ? [option.value[0]]
      : (option.value = [option.value]);
  const colors = getColors();
  const ra = [];
  const ra2 = [];
  const u = (wh[0] > wh[1] ? wh[0] : wh[1]) * 0.4; //长边
  // if (u < l) {
  //   console.error("长边不足短边2倍,请检查");
  // }
  let revise;
  const con = option.config;
  //饼默认占比
  const ratio = con ? (con.ratio ? con.ratio : 80) / 100 : 0.8;
  function radius(v) {
    const len = v.length;
    const w = (l / len) * ratio;
    revise = parseInt(w / 2);
    for (let i = 1; i <= len; i++) {
      if (!option.config) {
        ra.push({
          radius: [w * (i - 1) + revise, w * i]
        });
      } else {
        const n = 100 - con.radiusWidth * i + con.radiusInterval;
        const w = 100 - con.radiusWidth * (i - 1);
        const zoom = con.zoom / 100;
        // console.log(zoom);
        ra.push({
          radius: [n * ratio + "%", w * ratio + "%"]
        });
        //复合饼特殊处理
        ra2.push({
          radius: [n * ratio * zoom + "%", w * ratio * zoom + "%"]
        });
      }
    }
    // return v;
  }
  radius(option.value);
  const config = option.config; //分割值
  const sumNumber = sum(option.value[0]); //数组总和,求占比使用

  const { d1, d2, sumData, percentageRight } = getPieDoubleData(
    config,
    option,
    sumNumber
  );
  // const d1 = []; //饼1对象
  // const d2 = [];
  // const percentage = []; //每块百分比
  // const percentageRight = []; //右侧每块百分比
  // let sumData = 0;

  const startAngle = Math.abs(0 - (180 * (sumData / sumNumber)).toFixed(2)); //起始度数
  d1.unshift({
    name: "其他",
    value: sumData,
    selected: true
  });
  const dd = [d1, d2];
  const series = [];
  if (Array.isArray(option.value) && Array.isArray(option.value[0])) {
    let cen;
    const k = 25; //距离左侧距离
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        cen = [k + "%", "50%"];
      } else {
        cen = [100 / 2 + k + "%", "50%"];
      }
      if (i === 0) {
        ra[ra.length - 1].radius = [0, ra[ra.length - 1].radius[1]];
        ra2[ra2.length - 1].radius = [0, ra2[ra2.length - 1].radius[1]];
      }
      // console.log(ra);
      // console.log(i);
      series.push({
        name: "姓名",
        tooltip: {
          // trigger: "item",
          formatter: item => {
            let str = "";
            // item.forEach(
            //   (item, i) =>
            const b =
              (i > 0 ? percentageRight[item.dataIndex] : item.percent) + "%";
            str +=
              '<span style="background-color: ' +
              item.color +
              ';display:inline-block;border-radius:12px;width:12px;height:12px;margin-right:8px"></span>' +
              item.name +
              ":" +
              (item.data.value ? item.data.value : 0) +
              "(" +
              b +
              ")<br/>";
            // );
            return str;
          }
          // formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        type: "pie",
        zlevel: 100,
        radius: i === 0 ? ra[0].radius : ra2[0].radius,
        center: cen,
        data: dd[i],
        startAngle: i === 0 ? startAngle : 90,
        // startAngle: 180,
        z: i,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        label: { show: true, color: t.k9 },
        labelLine: {
          show: true
        },

        // markLine: {
        //   symbol: "none",
        //   itemStyle: {
        //     normal: {
        //       borderWidth: 1,
        //       lineStyle: {
        //         type: "solid",
        //         width: 2
        //       },
        //       label: {
        //         formatter: "",
        //         textStyle: {
        //           fontSize: 16,
        //           fontWeight: "bolder"
        //         }
        //       }
        //     }
        //   },
        //   data: [
        //     //配置线端起始点
        //     [
        //       {
        //         x: "47%",
        //         y: "50%",
        //         symbol: "none"
        //       },
        //       {
        //         x: "58%",
        //         y: "50%",
        //         symbol: "arrow"
        //       }
        //     ]
        //   ]
        // },
        markPoint: {
          symbol: "image://" + img,
          show: true,
          label: {
            show: false,
            color: "red",
            backgroundColor: "red",
            position: "top"
          },
          tooltip: {
            show: false
          },
          data: [
            // {
            //   name: "某个屏幕坐标",
            //   symbol: "arrow",
            //   x: "50%",
            //   y: "15%"
            // },
            {
              x: "50%",
              y: "50%"
            }
          ]
        }
        // markArea: {
        //   data: [
        //     [
        //       {
        //         yAxis: "50",
        //         itemStyle: {
        //           color: "#c60c30"
        //         }
        //       },
        //       {
        //         yAxis: "60"
        //       }
        //     ],
        //     [
        //       {
        //         yAxis: "60",
        //         itemStyle: {
        //           color: "#25C50E"
        //         }
        //       },
        //       {
        //         yAxis: "180"
        //       }
        //     ]
        //   ]
        // }
      });
    }
  }
  // series.push({
  //   data: [820, 1320],
  //   type: "line"
  // });
  return {
    color: colors,
    tooltip: {
      trigger: "item"
      // formatter: "{a} <br/>{b} : {c} ({d}%)"
      // formatter: item => {
      //   console.log(item);
      //   let str = "";
      //   str +=
      //     '<span style="background-color: ' +
      //     item.color +
      //     ';display:inline-block;border-radius:12px;width:12px;height:12px;margin-right:8px"></span>' +
      //     item.name +
      //     ":" +
      //     (item.data.value ? item.data.value : 0) +
      //     "(" +
      //     item.percent +
      //     "%)<br/>";
      //   return str;
      // }
    },
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },

    grid: {
      bottom: 100
    },
    legend: {
      type: "plain",
      orient: "vertical",
      show: true,
      right: 10,
      top: 20,
      bottom: 20,
      textStyle: { color: "red" },
      icon: "circle",
      selectedMode: false,
      data: option.label
    },
    series: series
  };
}

export const getPieDoubleData = (config, option, sumNumber) => {
  const d1 = []; //饼1对象
  const d2 = [];
  const percentage = []; //每块百分比
  const percentageRight = []; //右侧每块百分比
  let sumData = 0;

  switch (config.type) {
    case "value": {
      option.value[0].forEach((item, index) => {
        percentage.push(((item / sumNumber) * 100).toFixed(2));
        // console.log((item / sumNumber).toFixed(2) * 100);
        if (item > config.value) {
          d1.push({
            name: option.label[index],
            value: item > config.value ? item : item
          });
        } else {
          percentageRight.push(((item / sumNumber) * 100).toFixed(2));
          sumData += item;
          d2.push({
            name: option.label[index],
            value: item <= config.value ? item : item
          });
        }
      });
      return { d1, d2, sumData, percentageRight };
    }

    case "percentage": {
      option.value[0].forEach((item, index) => {
        percentage.push(((item / sumNumber) * 100).toFixed(2));
        if (percentage[percentage.length - 1] > parseFloat(config.value)) {
          d1.push({
            name: option.label[index],
            value: item
          });
        } else {
          percentageRight.push(((item / sumNumber) * 100).toFixed(2));
          //图二汇总=>其他
          sumData += item;
          d2.push({
            name: option.label[index],
            value: item
          });
        }
      });
      // console.log(percentage);
      return { d1, d2, sumData, percentageRight };
    }
  }
};
