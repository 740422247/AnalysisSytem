/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-29 10:54:10
 * @LastEditors: wss
 * @LastEditTime: 2021-01-21 16:39:28
 */
import api from "@api/api.js";
export default {
  namespaced: true,
  state: {
    token: {},
    userInfo: {},
    TemplateArr: [], //用户页面id集合
    cacheRouter: null
  },
  getters: {
    getIsAdmin: state => {
      return state.userInfo.isAdmin;
    },
    // getResourceId: state => {
    //   return state.userInfo.resources[0].resourceId;
    // },
    getResourceTemplate: state => {
      if (state.userInfo.resources) {
        return state.TemplateArr;
        // return state.userInfo.resources.filter(list => list.resourceTemplate);
      } else {
        return "";
      }
      // return state.userInfo.resources[0].ResourceTemplate
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      const date = new Date().getTime() / 1000;
      state.token = {
        ...token,
        creationTime: date,
        expirationTime: date + token.expiresIn
      };
    },
    SET_userInfo(state, user) {
      state.userInfo = user;
    },
    SET_TemplateArr(state, TemplateArr) {
      const a = TemplateArr.filter(item => {
        return item.resourceLev === "Front_End";
      });
      state.TemplateArr = a;
      // state.userInfo = user;
    },
    SET_cacheRouter(state, dd) {
      state.cacheRouter = dd;
    },
    SET_avatar(state, avatar) {
      state.userInfo.avatar = avatar;
    },
    Log_out(state, dd) {
      for (var key in state) {
        state[key] = {};
      }
    }
  },
  actions: {
    Refresh_TOKEN({ commit, state }, http) {
      return new Promise(function(resolve) {
        api.Login("Refresh", null, "RefreshToken").then(dd => {
          commit("SET_TOKEN", dd.data);
          resolve();
        });
      });
    }
  }
};
