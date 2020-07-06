import * as types from "../mutation-types";
import api from "@api/api";
import { apiOptions } from "../../views/dragable/apiOptions";

const state = {
  previewData: null,
  apiArgument: [],
  modules: [],
  pageDetail: [],

  districtByYear: [],
  [types.GetMapAreaByYear]: [],
  [types.GetProjectListByYear]: [],
  [types.GetCountryByYear]: [],
  [types.GetPoorCountryByYear]: [],

};

const getters = {
  previewData: state => state.previewData,
  apiArgument: state => state.apiArgument,
  modules: state => state.modules,
  pageDetail: state => state.pageDetail,

  [types.GetDistrictByYear]: state => state.districtByYear,
  [types.GetMapAreaByYear]: state => state[types.GetMapAreaByYear],
  [types.GetProjectListByYear]: state => state[types.GetProjectListByYear],
  [types.GetCountryByYear]: state => state[types.GetCountryByYear],
  [types.GetPoorCountryByYear]: state => state[types.GetPoorCountryByYear]
};

const actions = {
  savePreview: function ({ commit }, params) {
    commit(types.previewData, params);
  },

  //  地区数据
  [types.GetDistrictByYear]: async function ({ commit }, params) {
    params = getParams(types.GetDistrictByYear, params);
    const result = await api.publicApi(params.url, params.params);
    commit(types.GetDistrictByYear, result.Data);
    return result;
  },
  // 地图
  [types.GetMapAreaByYear]: async function ({ commit }, params) {
    params = getParams(types.GetMapAreaByYear, params);
    const result = await api.publicApi(params.url, params.params);
    commit(types.GetMapAreaByYear, result.Data);
    return result;
  },
  // 项目列表
  [types.GetProjectListByYear]: async function ({ commit }, params) {
    params = getParams(types.GetProjectListByYear, params);
    const result = await api.publicApi(params.url, params.params);
    commit(types.GetProjectListByYear, result.Data);
    return result;
  },
  // 区县列表
  [types.GetCountryByYear]: async function ({ commit }, params) {
    params = getParams(types.GetCountryByYear, params);
    const result = await api.publicApi(params.url, params.params);
    commit(types.GetCountryByYear, result.Data);
    return result;
  },
  // 乡镇列表
  [types.GetPoorCountryByYear]: async function ({ commit }, params) {
    params = getParams(types.GetPoorCountryByYear, params);
    const result = await api.publicApi(params.url, params.params);
    commit(types.GetPoorCountryByYear, result.Data);
    return result;
  },

  // GetDistrictByYear1: function ({ commit }, params) {
  //   console.log("GetDistrictByYear1");
  // },
  // GetDistrictByYear2: function ({ commit }, params) {
  //   console.log("GetDistrictByYear2");
  // },
  [types.getModules]: function ({ commit }, params) {
    const result = [
      {"type":"jkGraph:barChart","isRadio":false,"choice":[{"id":"lineChart","name":"折线图"},{"id":"twoBarChart","name":"双向柱状图"},{"id":"barChart","name":"柱状图"}],"className":["jk-col-24","handle"],"style":{"height":"300px"},"isHandle":false,"path":"","border":true,"grid":true,"service":{"api":"","params":{},"data":{}},"option":{},"data":{"symbol":["2020年{name}:{value}人"],"value":[[1.39603,1.94,1.92,9.54925,6.605,4.66,1.881084,1,1,8,6,5.44]],"label":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"choice":{"showX":true,"showY":true},"path":[]},"argument":{"arguments":["PERSON","PROJECTS","MONEY","NAME"],"path":"GetDistrictByYear","apiArgument":[{"value":"NAME","label":"区县名称"},{"value":"MONEY","label":"金额#万元"},{"value":"PROJECTS","label":"项目数#个"},{"value":"PERSON","label":"人数#人"}]}},
      { "type": "jkGraph:lineChart", "choice": [{ "id": "lineChart", "name": "折线图" }, { "id": "twoBarChart", "name": "双向柱状图" }, { "id": "barChart", "name": "柱状图" }], "className": ["jk-col-24", "handle"], "style": { "height": "300px" }, "isHandle": false, "path": "", "border": true, "grid": true, "service": { "api": "", "params": {}, "data": {} }, "option": {}, "data": { "symbol": ["2020年{name}:{value}万元", "2020年{name}:{value}万次"], "all": [], "value": [[3864.39603, 1508.94], [11125, 1108.94]], "choice": { "showX": true, "showY": true }, "label": ["1月", "2月"], "path": [] }, "argument": { "arguments": ["MONTH", "NOWMONEY", "LASTMONEY"], "path": "GetMapAreaByYear", "apiArgument": [{ "value": "MONTH", "label": "月份" }, { "value": "NOWMONEY", "label": "现在金额#万元" }, { "value": "LASTMONEY", "label": "王琪金额#万元" }] } },
      {
        type: "jkGraph:lineChart",
        choice: [
          { id: "lineChart", name: "折线图" },
          { id: "twoBarChart", name: "双向柱状图" },
          { id: "barChart", name: "柱状图" }
        ],
        className: ["jk-col-24", "handle"],
        style: { height: "300px" },
        isHandle: false,
        text: "模块2",
        path: "",
        border: true,
        grid: true,
        service: { api: "", params: {}, data: {} },
        option: {},
        data: {
          symbol: ["2020年{name}:{value}万元", "2020年{name}:{value}万次"],
          all: [],
          value: [
            [3864.39603, 1508.94],
            [11125, 1108.94]
          ],
          choice: { showX: true, showY: true },
          label: ["1月", "2月"],
          path: []
        },
        argument: {
          arguments: ["CODE", "NAME", "PERSON", "PROJECTS", "MONEY"],
          path: "GetDistrictByYear",
          moduleName: "模块2",
          apiArgument: [
            { value: "CODE", label: "编码" },
            { value: "NAME", label: "区县名称" },
            { value: "PERSON", label: "人数#人" },
            { value: "PROJECTS", label: "项目数#个" },
            { value: "MONEY", label: "金额#万元" }
          ]
        }
      },
      {
        type: "jkRank:singleRank",
        isRadio: true,
        choice: [
          { id: "jkRank:singleRank", name: "单行排行榜" },
          { id: "jkRank:multipleRank", name: "多行排行榜" },
          { id: "jkRank:batteryRank", name: "电池排行榜" }
        ],
        isHandle: false,
        className: ["jk-col-24", "handle"],
        style: { height: "300px" },
        path: "",
        border: true,
        grid: true,
        service: { api: "", params: {}, data: {} },
        data: {
          symbol: [""],
          all: [666],
          value: [10, 20, 5555, 200],
          label: [],
          path: []
        },
        argument: {
          arguments: ["MONEY", "PERSON", "PROJECTS", "NAME", "CODE"],
          path: "GetDistrictByYear",
          apiArgument: [
            { value: "NAME", label: "区县名称" },
            { value: "CODE", label: "编码" },
            { value: "MONEY", label: "金额#万元" },
            { value: "PERSON", label: "人数#人" },
            { value: "PROJECTS", label: "项目数#个" }
          ]
        }
      },
      {
        type: "jkRank:multipleRank",
        choice: [
          { id: "jkRank:singleRank", name: "单行排行榜" },
          { id: "jkRank:multipleRank", name: "多行排行榜" },
          { id: "jkRank:batteryRank", name: "电池排行榜" }
        ],
        isHandle: false,
        className: ["jk-col-24", "handle"],
        style: { height: "300px" },
        text: "区县数据2",
        path: "",
        border: true,
        grid: true,
        service: { api: "", params: {}, data: {} },
        data: {
          symbol: ["万元", "万次"],
          all: [666666, 6666],
          value: [
            [1111, 222, 333],
            [111, 333, 444]
          ],
          label: ["盐湖区", "永济市", "垣曲县"],
          path: ["#", "#", "#"]
        },
        argument: {
          arguments: ["NAME", "CODE", "PERSON", "PROJECTS", "MONEY"],
          moduleName: "区县数据2",
          path: "GetDistrictByYear",
          apiArgument: [
            { value: "NAME", label: "区县名称" },
            { value: "CODE", label: "区县编码" },
            { value: "PERSON", label: "人数#人" },
            { value: "PROJECTS", label: "项目数#个" },
            { value: "MONEY", label: "金额#万元" }
          ]
        }
      },
      {
        type: "jkGraph:twoBarChart",
        choice: [
          { id: "lineChart", name: "折线图" },
          { id: "twoBarChart", name: "双向柱状图" },
          { id: "barChart", name: "柱状图" }
        ],
        className: ["jk-col-24", "handle"],
        style: { height: "300px" },
        isHandle: false,
        text: "对比柱",
        path: "",
        border: true,
        grid: true,
        service: { api: "", params: {}, data: {} },
        option: {},
        data: {
          symbol: ["男:{value}人", "女:{value}人"],
          all: [],
          value: [
            [4968, 5623, 14231, 30323, 41854, 41855, 27263, 8488, 605],
            [-4388, -3351, -6729, -12813, -14396, -21332, -23705, -12856, -1995]
          ],
          label: [
            "0-19岁",
            "20-29岁",
            "30-39岁",
            "40-49岁",
            "50-59岁",
            "60-69岁",
            "70-79岁",
            "80-89岁",
            "90岁以上"
          ],
          choice: { showX: true, showY: true },
          path: []
        },
        argument: {
          arguments: ["NAME", "CODE", "PERSON", "PROJECTS", "MONEY"],
          path: "GetDistrictByYear",
          moduleName: "对比柱",
          apiArgument: [
            { value: "NAME", label: "区县名称" },
            { value: "CODE", label: "区县编码" },
            { value: "PERSON", label: "人数#人" },
            { value: "PROJECTS", label: "项目数#个" },
            { value: "MONEY", label: "金额#万元" }
          ]
        }
      }
    ];
    commit(types.getModules, result);
  },
  [types.getPageDetail]: function ({ commit }, params) {
    const result = { "pageData": [{ "name": "容器组件", "type": "container", "id": 10, "els": [{ "type": "jkGraph:lineChart", "choice": [{ "id": "lineChart", "name": "折线图" }, { "id": "twoBarChart", "name": "双向柱状图" }, { "id": "barChart", "name": "柱状图" }], "className": ["handle", "jk-col-24"], "style": { "height": "300px", "padding": "undefinedpx" }, "isHandle": false, "text": "模块2", "path": "", "border": true, "grid": true, "service": { "api": "", "params": {}, "data": {} }, "option": {}, "data": { "symbol": ["人", "个", "万元"], "all": [140361, 137, 21660.619639000004], "value": [[69909, 14077, 8376, 14588, 6010, 7062, 4898, 10556, 3198, 1003, 334, 350, 0], [21, 18, 19, 19, 19, 9, 3, 13, 4, 2, 3, 7, 0], [5767.18799, 3870.373258, 2931.98497, 2732.3133, 2721.859491, 1545.3274, 670.651, 653.348193, 596.008435, 96.239531, 44.061, 31.265071, 0]], "choice": { "showX": true, "showY": true }, "label": ["盐湖区", "垣曲县", "新绛县", "临猗县", "永济市", "闻喜县", "夏县", "平陆县", "绛县", "河津市", "稷山县", "万荣县", "芮城县"], "path": [] }, "argument": { "arguments": ["CODE", "NAME", "PERSON", "PROJECTS", "MONEY"], "path": "GetDistrictByYear", "moduleName": "模块2", "apiArgument": [{ "value": "CODE", "label": "编码" }, { "value": "NAME", "label": "区县名称" }, { "value": "PERSON", "label": "人数#人" }, { "value": "PROJECTS", "label": "项目数#个" }, { "value": "MONEY", "label": "金额#万元" }] }, "pageForms": { "cWidth": "jk-col-24", "showData": ["PERSON", "PROJECTS", "MONEY"], "title": "2", "showTitle": "NAME", "value": ["PERSON", "PROJECTS", "MONEY"], "label": "NAME" } }], "className": ["jk-col-12"], "style": { "padding": "undefinedpx" } }, { "name": "容器组件1", "type": "container", "id": 11, "els": [{ "type": "jkRank:singleRank", "choice": [{ "id": "jkRank:singleRank", "name": "单行排行榜" }, { "id": "jkRank:multipleRank", "name": "多行排行榜" }, { "id": "jkRank:batteryRank", "name": "电池排行榜" }], "isHandle": false, "className": ["handle", "active", "jk-col-24"], "style": { "height": "300px", "padding": "undefinedpx" }, "path": "", "border": true, "grid": true, "service": { "api": "", "params": {}, "data": {} }, "data": { "symbol": ["个"], "all": [137, 21660.619639000004], "value": [21, 18, 19, 19, 19, 9, 3, 13, 4, 2, 3, 7, 0], "label": ["盐湖区", "垣曲县", "新绛县", "临猗县", "永济市", "闻喜县", "夏县", "平陆县", "绛县", "河津市", "稷山县", "万荣县", "芮城县"], "path": [] }, "argument": { "arguments": ["MONEY", "PERSON", "PROJECTS", "NAME", "CODE"], "path": "GetDistrictByYear", "apiArgument": [{ "value": "NAME", "label": "区县名称" }, { "value": "CODE", "label": "编码" }, { "value": "MONEY", "label": "金额#万元" }, { "value": "PERSON", "label": "人数#人" }, { "value": "PROJECTS", "label": "项目数#个" }] }, "pageForms": { "cWidth": "jk-col-24", "showData": ["PROJECTS"], "title": "22", "showTitle": "NAME", "value": ["PROJECTS"], "label": "NAME" } }], "isActive": false, "className": ["jk-col-12"], "style": { "padding": "undefinedpx" } }] }
    commit(types.getPageDetail, result.pageData);
    return true;
  }
};

const mutations = {
  [types.previewData](state, params) {
    state.pageDetail = params.pageData;
  },

  [types.getModules](state, data) {
    state.modules = data;
  },
  [types.getPageDetail](state, data) {
    state.pageDetail = data;
  },

  // 地区数据
  [types.GetDistrictByYear](state, data) {
    state.apiArgument = getArgument(data[0]);
    state.districtByYear = data.splice(1, data.length - 1);
  },
  // 地图
  [types.GetMapAreaByYear](state, data) {
    state.apiArgument = getArgument(data[0]);
    state[types.GetMapAreaByYear] = data.splice(1, data.length - 1);
  },
  // 项目列表
  [types.GetProjectListByYear](state, data) {
    state.apiArgument = getArgument(data[0]);
    state[types.GetProjectListByYear] = data.splice(1, data.length - 1);
  },
  // 区县列表
  [types.GetCountryByYear](state, data) {
    state.apiArgument = getArgument(data[0]);
    state[types.GetCountryByYear] = data.splice(1, data.length - 1);
  },
  // 乡镇列表
  [types.GetPoorCountryByYear](state, data) {
    state.apiArgument = getArgument(data[0]);
    state[types.GetPoorCountryByYear] = data.splice(1, data.length - 1);
  },
  [types.SET_UI_DATA](state, data) {
    if (!data.item.pageForms) return;
    const val = data.item.pageForms.value;
    const lbl = [data.item.pageForms.label];
    const value = fData(data.res, val);
    const label = fData(data.res, lbl);
    data.item.text = "joykit";
    data.item.data.label = label[0];
    if (data.type === "jkRank:singleRank") {
      data.item.data.value = value[0];
      return;
    }
    data.item.data.value = value;
  }
};

// 过滤数据2
function fData(res, item) {
  const arr = [];
  item.map((v, i) => {
    // 新建value数组
    if (!arr[i]) arr[i] = [];
    // 存入相关数据
    res.map((itm, inx) => {
      arr[i].push(itm[v]);
    });
  });
  return arr;
}

function getArgument(data) {
  var keys = [];
  for (var key in data) {
    keys.push(key);
  }
  return keys;
}

function getParams(api, params) {
  const { argument, ...item } = apiOptions.find(item => item.value === api);

  return { ...item, params: { ...argument, ...params } }
}

export default {
  state,
  getters,
  mutations,
  actions
};
