/*
 * @Descripttion: 此文件处理系统监控地图
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-06-11 17:28:14
 * @LastEditors: wss
 * @LastEditTime: 2020-12-01 09:23:49
 */

export default {
  namespaced: true,
  state: {
    body: [],
    isChange: false //数据是否变化
  },
  mutations: {
    setBody(state, body) {
      state.body = body;
    },
    updatedBody(state, data) {
      state.isChange = !state.isChange;
      state.body[data.index] = data.data;
    }
  },
  actions: {}
};
