/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-06-15 10:52:50
 * @LastEditors: wss
 * @LastEditTime: 2020-08-12 10:56:33
 */
// import { fetchPermission } from '@/api/permission'

import VueRouter from "vue-router";
import { listToTree } from "@/until/listToTree.js";
import $store from "@/store/index.js";
import router, { DynamicRoutes, routes } from "@/router/index"; //DynamicRoutes
import {
  recursionRouter,
  setDefaultRoute,
  recursionRouter2,
  PermissionToFilter
} from "@/utils/recursion-router";
// import { recursionRouter2, setDefaultRoute2 } from "@/utils/recursion-router";
import dynamicRouter from "@/router/dynamic-router";
import axios from "axios";
import api from "@api/api.js";
export default {
  namespaced: true,
  state: {
    //是否管理界面,
    isManagement: false,
    permissionList: null /** 所有路由 */,
    sidebarMenu: [] /** 导航菜单 */,
    currentMenu: "" /** 当前active导航菜单 */,
    already: [] //已有菜单路由Name
  },
  getters: {},
  mutations: {
    SET_Management(state, man) {
      state.isManagement = man;
    },
    SET_PERMISSION(state, routes) {
      state.permissionList = routes;
    },
    CLEAR_PERMISSION(state) {
      state.permissionList = null;
    },
    SET_MENU(state, menu) {
      state.sidebarMenu = menu;
    },
    CLEAR_MENU(state) {
      state.sidebarMenu = [];
    },
    SET_CURRENT_MENU(state, currentMenu) {
      state.currentMenu = currentMenu;
    },
    SET_ALREADY(state, dd) {
      state.already = dd;
    },
    dd(state, aa) {
      const createRouter = () =>
        new VueRouter({
          mode: "history", //'history',hash,
          base: __dirname,
          linkActiveClass: "active",
          routes: aa.initialRoutes
        });
      // const router = createRouter();
      // 添加其他项目路由前，重置 matcher
      router.matcher = createRouter().matcher;
      router.addRoutes(aa.ddd);
      // router.addRoutes(store.getters.addRouters);
    }
  },
  actions: {
    //获取权限
    GetResources({ commit, state }) {
      return new Promise(function(resolve, reject) {
        const p = { id: $store.state.user.userInfo.userId };
        api.User("GetResources", p).then(
          dd => {
            const permissionList = listToTree(
              "resourceId",
              "resourceParentId",
              dd.data
            );
            const ddd = deepClone(DynamicRoutes);
            const dynamicRouterClone = deepClone(dynamicRouter);
            // const ddd = JSON.parse(JSON.stringify(DynamicRoutes));
            // const routes = recursionRouter2(permissionList, dynamicRouter);
            const pee = PermissionToFilter(permissionList, dynamicRouterClone);
            // const MainContainer = ddd.find(v => v.path === "");
            // const children = MainContainer.children;
            // children.push(...routes);

            commit("SET_MENU", pee[0]); //routes
            commit("SET_ALREADY", pee[1]); //routes
            /*  初始路由 */
            const initialRoutes = router.options.routes;
            /* 完整的路由表 */
            commit("SET_PERMISSION", [...initialRoutes, ...ddd]);
            // console.log("执行完权限控制");
            resolve(dd);
          },
          err => {
            reject(err);
          }
        );
      });
    }
  }
};
function deepClone(obj) {
  const objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        //判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone(obj[key]);
        } else {
          //如果不是，简单复制
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}
