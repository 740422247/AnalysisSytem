/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-11-25 17:12:06
 * @LastEditors: wss
 * @LastEditTime: 2020-11-25 17:34:38
 */
export default {
  state: {
    count: 1, //暂没使用
    message: {
      hint: -1, //底部提示
      hintText: ""
    }
  },
  mutations: {
    hide(state) {
      state.message.hint = -1;
    },
    update(state, payload) {
      if (!payload.hint) {
        state.message.hint = 1;
      }
      for (const key in payload) {
        if (payload[key]) {
          state.message[key] = payload[key];
        }
      }
      if (payload.time) {
        setTimeout(() => {
          state.message.hint = -1;
          state.message.hintText = "";
        }, payload.time);
      } else {
        setTimeout(() => {
          state.message.hint = -1;
          state.message.hintText = "";
        }, 5000);
      }
    }
  },
  actions: {
    // updateAsync({ commit }) {
    //     console.log("执行定2121时器过后")
    //     setTimeout(() => {
    //         commit('hide')
    //     }, 3000)
    // }
  }
};
