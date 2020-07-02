import * as types from "../mutation-types";
import api from "@api/api";

const state = {
  previewData: null,
  apiArgument: [],
  modules: [],
  pageDetail: [],
  districtByYear: []
};

const getters = {
  previewData: state => state.previewData,
  apiArgument: state => state.apiArgument,
  districtByYear: state => state.districtByYear,
  modules: state => state.modules,
  pageDetail: state => state.pageDetail
};

const actions = {
  savePreview: function({ commit }, params) {
    commit(types.previewData, params);
  },
  [types.GetDistrictByYear]: function({ commit }, params) {
    // 待修改
    params = params
      ? params
      : {
          url: "/Api/MainPage/GetDistrictByYear",
          params: { Year: "2020" }
        };
    api
      .publicApi(params.url, params.params)
      .then(res => commit(types.GetDistrictByYear, res.Data));
  },
  GetDistrictByYear1: function({ commit }, params) {
    console.log("GetDistrictByYear1");
  },
  GetDistrictByYear2: function({ commit }, params) {
    console.log("GetDistrictByYear2");
  },
  [types.getModules]: function({ commit }, params) {
    const result = [
      {
        type: "jkRank:singleRank",
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
      }
    ];
    commit(types.getModules, result);
  },
  [types.getPage]: function({ commit }, params) {
    // const result = [{"name":"容器组件","type":"container","id":10,"els":[{"type":"jkRank:singleRank","choice":[{"id":"jkRank:singleRank","name":"单行排行榜"},{"id":"jkRank:multipleRank","name":"多行排行榜"},{"id":"jkRank:batteryRank","name":"电池排行榜"}],"isHandle":false,"className":["jk-col-24","handle"],"style":{"height":"300px"},"text":"","path":"","border":true,"grid":true,"service":{"api":"","params":{},"data":{}},"data":{"symbol":[""],"all":[666],"value":[10,20,5555,200],"label":[],"path":[]}}],"className":["jk-col-8"],"style":{"padding":"10px"}},{"name":"容器组件1","type":"container","id":11,"els":[{"type":"jkGraph:lineChart","choice":[{"id":"lineChart","name":"折线图"},{"id":"twoBarChart","name":"双向柱状图"},{"id":"barChart","name":"柱状图"}],"className":["jk-col-24","handle"],"style":{"height":"300px"},"isHandle":false,"text":"","path":"","border":true,"grid":true,"service":{"api":"","params":{},"data":{}},"option":{},"data":{"symbol":["2020年{name}:{value}万元","2020年{name}:{value}万次"],"all":[],"value":[[3864.39603,1508.94],[11125,1108.94]],"choice":{"showX":true,"showY":true},"label":["1月","2月"],"path":[]}}],"isActive":false,"className":["jk-col-8"],"style":{"padding":"10px"}},{"name":"容器组件2","type":"container","id":12,"els":[{"type":"jkRank:multipleRank","choice":[{"id":"jkRank:singleRank","name":"单行排行榜"},{"id":"jkRank:multipleRank","name":"多行排行榜"},{"id":"jkRank:batteryRank","name":"电池排行榜"}],"isHandle":false,"className":["jk-col-24","handle"],"style":{"height":"300px"},"text":"","path":"","border":true,"grid":true,"service":{"api":"","params":{},"data":{}},"data":{"symbol":["万元","万次"],"all":[666666,6666],"value":[[1111,222,333],[111,333,444]],"label":["盐湖区","永济市","垣曲县"],"path":["#","#","#"]}}],"isActive":false,"className":["jk-col-8"],"style":{"padding":"10px"}},{"name":"容器组件3","type":"container","id":13,"els":[{"type":"jkGraph:lineChart","choice":[{"id":"lineChart","name":"折线图"},{"id":"twoBarChart","name":"双向柱状图"},{"id":"barChart","name":"柱状图"}],"className":["jk-col-24","handle"],"style":{"height":"300px"},"isHandle":false,"text":"","path":"","border":true,"grid":true,"service":{"api":"","params":{},"data":{}},"option":{},"data":{"symbol":["2020年{name}:{value}万元","2020年{name}:{value}万次"],"all":[],"value":[[3864.39603,1508.94],[11125,1108.94]],"choice":{"showX":true,"showY":true},"label":["1月","2月"],"path":[]}}],"isActive":false,"className":["active","jk-col-24"],"style":{"padding":"10px"}}]
    // commit(types.getPage, result);
  }
};

const mutations = {
  [types.previewData](state, params) {
    state.pageDetail = params.pageData;
  },
  [types.GetDistrictByYear](state, data) {
    state.apiArgument = getArgument(data[0]);
    state.districtByYear = data.splice(1, data.length - 1);
  },
  [types.getModules](state, data) {
    state.modules = data;
  },
  [types.getPage](state, data) {
    console.log(data);
    state.pageDetail = data;
  }
};

function getArgument(data) {
  var keys = [];
  for (var key in data) {
    keys.push(key);
  }
  return keys;
}

export default {
  state,
  getters,
  mutations,
  actions
};
