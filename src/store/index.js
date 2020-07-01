/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-11 16:02:32
 * @LastEditors: joykit
 * @LastEditTime: 2020-05-11 16:23:56
 */
import Vue from "vue";
import Vuex from "vuex";

import permissions from "./permissions";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

import * as modules from "./modules";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...permissions,
    /* 导航菜单是否折叠 */
    isSidebarNavCollapse: false,
    /* 面包屑导航列表 */
    crumbList: []
  },
  //  mutations 函数
  mutations,
  // 触发事件函数
  actions,
  // 取值函数
  getters,
  modules: {
    ...modules.default
  },
  // 开发使用严格模式
  strict: process.env.NODE_ENV !== "production"
});
