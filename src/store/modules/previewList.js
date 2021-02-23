/*
 * @Descripttion: d地图使用
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-08 17:37:45
 * @LastEditors: wss
 * @LastEditTime: 2020-12-21 14:27:18
 */
import { formatNumber } from "@utils/formatNumber.js";
import { NumFormat } from "@until/format/format.js";
export default {
  namespaced: true,
  state: {
    routerId: {}, //跳转链接
    // topUrl: "",
    // btnUrl: "",
    jkCardData: [
      {
        border: true,
        grid: true,
        path: "",
        data: {
          symbol: [],
          all: [],
          src: [require("@assets/one/zxm.png")],
          value: [],
          label: ["项目数/个"],
          path: ["#"]
        }
      },
      {
        border: true,
        grid: true,
        path: "",
        data: {
          symbol: [],
          all: [],
          src: [require("@assets/one/zje.png")],
          value: [],
          label: ["项目总金额/万元"],
          path: ["#"]
        }
      },
      {
        border: true,
        grid: true,
        path: "",
        data: {
          symbol: [],
          all: [],
          src: [require("assets/one/zrc.png")],
          value: [],
          label: ["涉及人次/人次"],
          path: ["#"]
        }
      },
      {
        border: true,
        grid: true,
        path: "",
        data: {
          symbol: [],
          all: [],
          src: [require("assets/one/zrs.png")],
          value: [],
          label: ["涉及人数/人数"],
          path: ["#"]
        }
      }
    ],
    sumData: {},
    pageForm: {}
  },
  getters: {
    listCount: (state, getters) => {
      return state.jkCardData;
    }
  },
  mutations: {
    // setTopUrl(state, dd) {
    //   state.topUrl = dd;
    // },
    // setBtnUrl(state, dd) {
    //   state.btnUrl = dd;
    // },
    setJkCardData(state, dd) {
      state.jkCardData = dd;
    },
    setRouterId(state, dd) {
      state.routerId = dd;
    },
    setSumData(state, dd) {
      state.sumData = dd;
    },
    setDefaultJkCardDataPath(state, dd) {
      state.jkCardData.map((item, index) => {
        item.path = dd;
      });
    },
    setDefaultJkCardData(state, dd) {
      if (dd) {
        // state.jkCardData.data.value[0] = [...dd];
        // state.jkCardData = { ...state.jkCardData };
        state.jkCardData.map((item, index) => {
          item.data.value.splice(0, 1, NumFormat(dd[index]));
        });
        state.jkCardData = [...state.jkCardData];
      } else {
        state.jkCardData.map((item, index) => {
          switch (index) {
            case 0:
              item.data.value.splice(
                0,
                1,
                NumFormat(state.sumData.PROJECTS)
              );
              break;
            case 1:
              item.data.value.splice(0, 1, NumFormat(state.sumData.MONEY));
              break;
            case 2:
              item.data.value.splice(
                0,
                1,
                NumFormat(state.sumData.PERSONTIME)
              );
              break;
            case 3:
              item.data.value.splice(0, 1, NumFormat(state.sumData.PERSON));
              break;
          }
        });
      }
    },
    setPageForm(state, dd) {
      state.pageForm = dd;
    },
    setConfigUrl(state, dd) {
      state.configUrl = dd;
    }
  },
  actions: {}
};
