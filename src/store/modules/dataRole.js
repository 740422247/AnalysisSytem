import * as types from "../mutation-types";
import { ads } from "@api/api";

const state = {
  menu: null
};

const getters = {
  getRole: state => state.menu
};

const actions = {
  setDataRole: function({ commit, dispatch, state }, params) {
    commit(types.menu, params);
  }
};

const mutations = {
  [types.menu](state, params) {
    state.menu = params;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
