/*
 * @Descripttion: 散点图配置项
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-09 16:44:11
 * @LastEditors: wss
 * @LastEditTime: 2020-12-04 10:38:53
 */
import "echarts/lib/chart/pie";
import { getColors } from "./colors";
import "echarts/lib/component/legend";

export function op(option, echarts, t, l = undefined) {
  const colors = getColors();
  const ra = [];
  let revise;
  const con = option.config;
  // console.log(con);
  //默认缩放比例ratio
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
        const n =
          100 -
          parseFloat(con.radiusWidth) * i +
          parseFloat(con.radiusInterval);
        const w = 100 - con.radiusWidth * (i - 1);
        ra.push({
          radius: [n * ratio + "%", w * ratio + "%"]
        });
      }
    }
    // return v;
  }

  radius(option.value);

  const series = [];
  // console.log("ra:", ra);
  // console.log("revise:", revise);
  if (Array.isArray(option.value) && Array.isArray(option.value[0])) {
    for (let i = 0; i < option.value.length; i++) {
      const data = {
        legendData: option.label,
        // seriesData: aa(v2)
        seriesData: (option => {
          const arr = [];
          option.value[i].map((v, i) => {
            // return { name: v2.label[i]= v }
            arr.push({ name: option.label[i], value: v });
          });
          return arr;
        })(option)
      };
      if (i === 0) {
        ra[ra.length - 1].radius = [0, ra[ra.length - 1].radius[1]];
      }
      series.push({
        name: "姓名",
        type: "pie",
        // radius: option.radiusCyclic ? option.radiusCyclic : "55%",
        radius: ra[i].radius,
        // hoverOffset: ra.length > 1 ? revise * 0.65 : 10,
        // hoverOffset: revise * 0.65,
        center: ["50%", "50%"],
        data: data.seriesData,
        z: i,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        label: { show: false, color: t.k9 }
      });
    }
  } else {
    series.push(getSeries(option, t));
  }
  return {
    color: colors,
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
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
      show: false,
      right: 10,
      top: 20,
      bottom: 20,
      textStyle: { color: "red" },
      icon: "circle"
    },
    series: series
  };
}

function getSeries(option, t) {
  const result = {
    type: "pie",
    // radius: option.radiusCyclic ? option.radiusCyclic : "55%",
    // radius: ra[i].radius,
    center: ["50%", "50%"],
    data: option.value.map((item, index) => ({
      value: item,
      name: option.label[index]
    })),
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: "rgba(0, 0, 0, 0.5)"
      }
    },
    label: {
      show: false,
      color: t.k9
    }
  };

  return result;
}
