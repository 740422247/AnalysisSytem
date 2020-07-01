/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-11 16:02:32
 * @LastEditors: joykit
 * @LastEditTime: 2020-05-11 16:08:36
 */
/* eslint-disable*/
import * as types from "./mutation-types";
// import getMenuData from "@/components/Admin/js/jurisdiction.js";
import { getMenuData } from "../components/Admin/js/jurisdiction.js";
// import { prototype } from "vue/types/umd";

function getTime() {
  const now = new Date();
  return now.getTime();
}

export default {
  menuAuth(state, payload) {
    console.log(getMenuData());
    let per = getMenuData(); //所有菜单权限
    // let getPermissions = per.map(item => item.permissions);
    let payloadArr = payload.map(item => item.resourceCode);

    // console.log("mue:", per);
    const start = getTime();

    let newPermission = per
      .filter(item =>
        item.permissions.some(ele => payloadArr.some(items => ele === items))
      )
      .map(item => ({
        ...item,
        children: item.children && item.children.filter(
          child =>
            child.permissions &&
            child.permissions.some(childPer =>
              payloadArr.some(payItem => payItem === childPer)
            )
        )
      }
      ));

    const end = getTime();

    // payloadArr.map(item => {
    //   per.map(itt => {
    //     console.log(itt.permissions)
    //     console.log(item)
    //     let aa = itt.permissions.filter(orr=>orr==item)
    //     console.log(aa)
    //   })
    // })
    // per.map(item => {
    //   console.log(item)
    //   if (payloadArr.find(item.permissions[0])) {

    //   }
    // })
    // state.rtmpUrl=payload
  },
  toggleNavCollapse(state) {
    state.isSidebarNavCollapse = !state.isSidebarNavCollapse
  }
};
