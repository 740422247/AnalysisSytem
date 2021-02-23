// const availableApi = [
//   "GetDistrictMonitorList",
//   "Getskfx",
//   "GetAgeGroupAnalysis",
//   "GetAgeSex",
//   "GetPoorCountryAnalysis",
//   "GetMapAreaByYear",
//   "GetProjectListByYear",
//   "GetDistrictByYear",
//   "GetCountryByYear",
//   "GetPoorCountryByYear",
//   "GetMapCollectionByYear",
//   "Getsxrpm"
// ];
// const availableTableApi = ["GetQxList", "GetZdxzList"];
// const pendingApi = [
//   "GetPerson",
//   "Getsxqkb",
//   "GetProjectDetailSearch",
//   "GetPoorCountryAnalysisLsit",
//   "TestOne"
// ];
import * as types from "@store/mutation-types";
import api from "@api/api";
// import { apiOptions } from "../../views/dragable/apiOptions";
// import dataShift from "./dataShift";
const state = {
  previewData: null,
  apiArgument: [],
  modules: [],
  pageDetail: [],
  maxYear: 2020,
  years: [],
  selectedYear: 2020,

  [types.getDataByApi]: [],
  [types.getPageList]: [],

  districtByYear: [],
  [types.GetMapAreaByYear]: [],
  [types.GetProjectListByYear]: [],
  [types.GetCountryByYear]: []
};

const getters = {
  previewData: state => state.previewData,
  apiArgument: state => state.apiArgument,
  modules: state => state.modules,
  pageDetail: state => state.pageDetail,
  getMaxYear: state => state.maxYear,
  getYears: state => state.years,
  getSelectedYear: state => state.selectedYear,

  [types.getDataByApi]: state => state[types.getDataByApi],
  [types.getPageList]: state => state[types.getPageList],

  [types.GetDistrictByYear]: state => state.districtByYear,
  [types.GetMapAreaByYear]: state => state[types.GetMapAreaByYear],
  [types.GetProjectListByYear]: state => state[types.GetProjectListByYear],
  [types.GetCountryByYear]: state => state[types.GetCountryByYear]
};
let num = 0;
const actions = {
  savePreview: function ({ commit }, params) {
    commit(types.previewData, params);
  },

  [types.getAllApi]: async function ({ commit }, params) {
    const apis = await api.publicApi(types.getAllApi, params);
    // 可用接口（暂时）   ///2020-11-10 弃用
    // console.log("all apis:", apis);
    // const available = availableTableApi.concat(pendingApi);
    // const result = apis.data.filter(api =>
    //   availableApi.concat(available).some(item => item === api.id)
    // );
    // const result = apis.data.filter(api => available.some(item => item === api.id))
    ///2020-11-10 弃用
    return apis;
  },

  [types.getModules]: async function ({ commit }) {
    const result = await api.publicApi(types.getModules);
    return result;
  },

  // 删除模块
  [types.deleteModules]: async function ({ commit }, params) {
    const result = await api.publicApi(types.deleteModules, params, "delete");
    return result;
  },
  // 获取模块详情
  [types.getModule]: async function ({ commit }, params) {
    const result = await api.publicApi(types.getModule, params);
    return result;
  },

  // 删除页面
  [types.deletePage]: async function ({ commit }, params) {
    const result = await api.publicApi(types.deletePage, params, "delete");
    return result;
  },
  // 获取页面详情
  [types.getPage]: async function ({ commit }, params) {
    const result = await api.publicApi(types.getPage, params);
    return result;
  },
  // 获取页面列表
  [types.getPageList]: async function ({ commit }, params) {
    const result = await api.publicApi(types.getPageList, params);
    commit(types.getPageList, result.data.items);
    return result;
  },
  [types.checkPageRepeat]: async function ({ commit }, params) {
    const result = await api.publicApi(types.checkPageRepeat, params);
    return result
  },
  // 获取原系统api数据
  [types.getDataByApi]: async function ({ commit }, params) {
    // num++;
    // console.warn(`第${num}个模块调用转发接口`)
    // console.log(params);
    const result = await api.publicApi(types.getDataByApi, params, 'post');
    // const data = dataShift(params.apiId, result, "table");
    const data = result.data;
    commit(types.getDataByApi, { data, params });
    return { ...data };
    // return { ...data, ReMark: '模拟后端remark，测试remark，记得删除' };
  },
  // 获取所有年份
  [types.getYears]: async function ({ commit }) {
    const result = await api.publicApi(types.getDataByApi, {
      apiId: "3lOjwVqm2UiFMgvZym8d6g_Api/Dim/GetYear",
      param: { year: 2020 }
    }, 'post');
    const data = result.data.Items;
    commit(types.getYears, data);
  },
  setSelectedYear: function ({ commit }, params) {
    commit('setSelectedYear', params)
  }
};

const mutations = {
  setSelectedYear: function (state, params) {
    state.selectedYear = params.selectedYear
  },
  [types.previewData](state, params) {
    state.pageDetail = params.pageData;
  },

  [types.getModules](state, data) {
    state.modules = data;
  },
  [types.getPageDetail](state, data) {
    state.pageDetail = data;
  },
  [types.getPageList](state, data) {
    state[types.getPageList] = data;
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
  [types.getDataByApi](state, { data, params }) {
    state.apiArgument = getArgument(data, params.param);
    // state[types.getDataByApi] = data.splice(1, data.length - 1);
  },
  [types.getYears](state, data) {
    if (!data) return;
    state.maxYear = data[data.length - 1].ID;
    state.years = data.map(item => item.ID);
  },
  [types.SET_UI_DATA](state, data) {
    if (!data.item.pageForms) return;
    const val = data.item.pageForms.value;
    const lbl = [data.item.pageForms.label];
    const value = fData(data.res, val);
    const label = fData(data.res, lbl);
    // data.item.text = "joykit";
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
      // arr[i].push(itm[v]);
      arr[i].push(0);
    });
  });
  return arr;
}

const getArgument = (data, { apiType }) => {
  if (apiType === 'cardList') {
    return getArgumentResult(data.Items[0])
  } else if (apiType === 'made') {
    return data;
  } else if (apiType === 'condition') {
    return data
  } else {
    return getArgumentResult(data.Items[0]);
  }
}

const getArgumentResult = data => {
  var keys = [];
  for (var key in data) {
    keys.push(key);
  }
  return keys;
}

// function getParams(api, params) {
//   // const { argument, ...item } = apiOptions.find(item => item.value === api);
//   return null;
//   // return { ...item, params: { ...argument, ...params } }
// }

export default {
  state,
  getters,
  mutations,
  actions
};
