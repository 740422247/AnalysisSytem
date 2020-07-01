// var percent = 45; //百分数
// var txt = "男：91215/人次";
// var colorTXT = "rgba(6, 162, 233, 1)";//rgba(224, 154, 31, 1)
// var giftImageUrl ="img/one/zje.png"

// var giftImageUrl ="~assets/xmgs.png"
// import giftImageUrl from "assets/xmje.png";
// import male from "assets/image/AgeAnalysis/male.png";
// import woman from "assets/image/AgeAnalysis/woman.png";
import "echarts/lib/chart/pie";
export function op(option) {
  console.log(option);
  const all = option.all[0];
  const value = option.value[0];
  const percent = (value / all).toFixed(2);
  const symbol = option.symbol[0];
  const text = symbol.replace("{value}", value);
  let imgSRC;
  let colorTXT;
  let jb1;
  let jb2;
  if (option.sex == 1) {
    imgSRC = "";
    colorTXT = "rgba(6, 162, 233, 1)";
    jb1 = "rgba(1, 94, 217, 1)";
    jb2 = "rgba(6, 168, 235, 1)";
  } else {
    imgSRC = "";
    colorTXT = "rgba(224, 154, 31, 1)";
    jb1 = "rgba(233, 148, 118, 1)";
    jb2 = "rgba(223, 155, 23, 1)";
  }

  return {
    xAxis: {
      show: false //是否展示x轴
    },
    yAxis: {
      show: false
    },
    graphic: {
      elements: [
        {
          type: "image",
          style: {
            image: imgSRC,
            width: "100"
            // height: "90%"
          },
          left: "39%",
          cursor: "inherit",
          bottom: "42%"
        },
        {
          type: "text",
          info: "21212",
          left: "center",
          bottom: "10%",
          cursor: "inherit",
          zlevel: 10,
          style: {
            text: text,
            font: '16px "STHeiti", sans-serif',
            stroke: "#fff",
            textAlign: "center",
            lineWidth: 20,
            fill: "rgba(129, 167, 220, 1)"
          }
        }
      ]
    },
    series: [
      {
        //外圈。边框
        name: "",
        type: "pie",
        radius: ["50%", "60%"],
        avoidLabelOverlap: false,
        startAngle: 225,
        color: [
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: jb1 // 0% 处的颜色
              },
              {
                offset: 1,
                color: jb2 // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          },
          "none"
        ],
        hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果。
        legendHoverLink: false, //是否启用图例 hover 时的联动高亮。
        label: {
          normal: {
            show: false,
            position: "center"
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "30",
              fontWeight: "bold"
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: 75,
            name: "1"
          },
          {
            value: 25,
            name: "2"
          }
        ]
      },
      {
        name: " ",
        type: "pie",
        radius: ["47%", "46.5%"],
        avoidLabelOverlap: false, //是否启用防止标签重叠策略
        startAngle: 225,

        hoverAnimation: false,
        legendHoverLink: false,
        label: {
          normal: {
            show: false,
            position: "center"
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "30",
              fontWeight: "bold"
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: 75,
            name: "1"
          },
          {
            value: 25,
            name: "2"
          }
        ]
      },
      {
        name: " ",
        type: "pie",
        radius: ["64.5%", "65%"],
        avoidLabelOverlap: false, //是否启用防止标签重叠策略
        startAngle: 225,

        hoverAnimation: false,
        legendHoverLink: false,
        label: {
          normal: {
            show: false,
            position: "center"
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "30",
              fontWeight: "bold"
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: 75,
            name: "1"
          },
          {
            value: 25,
            name: "2"
          }
        ]
      },
      {
        //黑圈
        name: "",
        type: "pie",
        radius: ["50%", "60%"],
        avoidLabelOverlap: false,
        startAngle: 315,
        color: ["rgba(27,47,133,1)", "#ff7a00", "transparent"],
        hoverAnimation: false,
        legendHoverLink: false,
        clockwise: false, //饼图的扇区是否是顺时针排布。
        // itemStyle: {
        //   normal: {
        //     borderColor: "transparent",
        //     borderWidth: "20"
        //   },
        //   emphasis: {
        //     borderColor: "transparent",
        //     borderWidth: "20"
        //   }
        // },
        z: 10,
        label: {
          //文本标签
          normal: {
            show: false,
            position: "center"
          }
        },
        labelLine: {
          //标签的视觉引导线样式
          normal: {
            show: false
          }
        },
        data: [
          {
            value: ((100 - percent * 100) * 270) / 360,
            label: {
              normal: {
                formatter: percent * 100 + "%",
                position: "center",
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "normal",
                  color: colorTXT
                }
              }
            },
            name: ""
          },
          {
            value: 0,
            name: ""
          },
          {
            value: 100 - ((100 - percent * 100) * 270) / 360,
            name: ""
          }
        ]
      }
    ]
  };
}
