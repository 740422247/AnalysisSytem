/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-08-04 09:51:40
 * @LastEditors: wss
 * @LastEditTime: 2020-11-02 17:10:49
 */
export const tablesJson = {
  Data: {
    Title: "数据时间分析",
    Headers: [
      {
        RN: {
          showName: "ID",
          isUrl: false,
          col: 2, //列
          row: 3, //行
          style: {
            "text-align": "center",
            "max-width": "360px",
            color: "red"
          }
        },
        YEAR: {
          showName: "年度",
          col: 2, //列
          row: 1, //行
          isUrl: false,
          style: {
            "text-align": "center",
            "max-width": "360px"
          }
        },
        XMS: {
          col: 5, //列
          row: 4, //行
          showName: "项目名字",
          isUrl: false,
          style: {
            "text-align": "right",
            "max-width": "360px"
          }
        },
        JE: {
          col: 1, //列
          row: 0, //行
          showName: "项目金额(万元)",
          isUrl: false,
          style: {
            "text-align": "right",
            "max-width": "360px"
          }
        },
        PCS: {
          col: 1, //列
          row: 0, //行
          showName: "总批次",
          isUrl: false,
          style: {
            "text-align": "right",
            "max-width": "360px"
          }
        },
        RC: {
          col: 1, //列
          row: 0, //行
          showName: "总人次",
          isUrl: false,
          style: {
            "text-align": "right",
            "max-width": "360px"
          }
        },
        RS: {
          col: 1, //列
          row: 0, //行
          showName: "涉及人数",
          isUrl: false,
          style: {
            "text-align": "right",
            "max-width": "360px"
          }
        },
        RJJE: {
          col: 1, //列
          row: 0, //行
          showName: "字母排序测试",
          isUrl: false,
          style: {
            "text-align": "right",
            "max-width": "360px"
          }
        }
      }
    ],
    Bodys: [
      {
        RN: 5,
        YEAR: "Good",
        XMS: "路由器改造项目",
        JE: "15",
        PCS: 1340.0,
        RC: 8.0,
        RS: 86.0,
        RJJE: "g"
      },
      {
        RN: 8.0,
        YEAR: "2017",
        XMS: "火星迁移一期计划",
        JE: "960.50",
        PCS: 52.0,
        RC: 12427.0,
        RS: 5478.0,
        RJJE: "h"
      },
      {
        RN: 2.0,
        YEAR: "2016",
        XMS: "珠穆朗玛峰电梯工程",
        JE: "68.60",
        PCS: 18,
        RC: 16.0,
        RS: 16.0,
        RJJE: "L"
      },
      {
        RN: 9,
        YEAR: "Hello",
        XMS: "人造月亮",
        JE: "33.60",
        PCS: 23,
        RC: 85.0,
        RS: 36.0,
        RJJE: "WT"
      },
      {
        RN: 2,
        YEAR: "文本测试",
        XMS: 3,
        JE: "33.60",
        PCS: 5,
        RC: 68.0,
        RS: 19.0,
        RJJE: "ASDAKL"
      }
    ]
  },
  Style: {
    //直接赋值到表格样式
    table: {
      // backgroundColor: "#fff",
      color: "#9dbae3"
    },
    //直接赋值到thead样式
    // thead: {
    //   color: "#fff",
    //   backgroundColor: "#192166",
    //   border: "1px solid #07328f"
    // },
    //直接赋值到tbody样式
    tbody: {
      // border: "1px solid 07328f"
      // backgroundColor: "#F65618"
    },
    th: {
      color: "#fff",
      // borderRight: "1px solid red",
      // borderBottom: "1px solid red",
      // borderColor: "red",
      backgroundColor: "#192166"
    },
    td: {
      border: "1px solid #07328f"
    },
    border: "1px solid #07328f",
    active: "#192166", //hover色
    striated: "transparent" //条纹色
  }
};
