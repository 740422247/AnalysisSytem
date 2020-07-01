/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-11 16:02:32
 * @LastEditors: joykit
 * @LastEditTime: 2020-05-12 09:28:45
 */

import * as types from "../mutation-types";
import { ads } from "@api/api";

const state = {
  menu: null
};

const getters = {
  getMenu: state => state.menu
};

const actions = {
  actTag: function({ commit, dispatch, state }, params) {
    ads({}).then(({ data }) => {
      commit(types.menu, data);
    });
  }
};

const mutations = {
  [types.menu](state, data) {
    state.menu = data;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
