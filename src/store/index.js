/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-11 16:02:32
 * @LastEditors: wss
 * @LastEditTime: 2020-12-08 10:26:29
 */
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

// import previewList from "./previewList";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

import * as modules from "./modules";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // ...permissions,
    /* 导航菜单是否折叠 */
    isSidebarNavCollapse: false,
    /* 面包屑导航列表 */
    crumbList: [],
    pageName: "首页", //页面名字
    compartment: { code: null, name: "" } //区县信息
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
  // strict: process.env.NODE_ENV !== "production",
  plugins: [
    createPersistedState({
      key: "vuexSessionStorage",
      storage: window.sessionStorage,
      reducer(val) {
        return {
          compartment: val.compartment
        };
      }
    }),
    createPersistedState({
      key: "vuexLocalStorage",
      storage: window.localStorage,
      reducer(val) {
        return {
          user: val.user,
          permission: val.permission
        };
      }
      // }),
      // createPersistedState({
      //   key: "vuexPermission",
      //   storage: window.localStorage,
      //   reducer(val) {
      //     return {
      //       permission: val.permission
      //     };
      //   }
    })
  ]
});
