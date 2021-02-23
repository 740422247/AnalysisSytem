/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-11 16:02:32
 * @LastEditors: wss
 * @LastEditTime: 2020-08-21 17:06:36
 */
/* eslint-disable*/
import * as types from "./mutation-types";
// import getMenuData from "@/components/Admin/js/jurisdiction.js";
import { getMenuData } from "../components/Admin/js/jurisdiction.js";
import { stat } from "fs";
// import { prototype } from "vue/types/umd";

function getTime() {
  const now = new Date();
  return now.getTime();
}

export default {
  Log_out(state, dd) {
    // console.log(222)
    // console.log(state)
    state.user.cacheRouter = null;
    state.user.token = {};
    state.user.userInfo = {};
    state.permission.sidebarMenu = [];
    state.permission.permissionList = null;
    state.permission.currentMenu = "";
    // location.reload()
    // console.log(8888)
  },
  deleteVuex(state, dd) {
    for (var key in state) {
      state[key] = {};
    }
  },
  toggleNavCollapse(state) {
    state.isSidebarNavCollapse = !state.isSidebarNavCollapse;
  },
  SET_pageName(state, name) {
    state.pageName = name;
  },
  SET_Compartment(state, dd) {
    state.compartment = dd;
  }
};
