/*
 * @Descripttion:
 * @version:
 * @Author: joykit
 * @Date: 2020-02-11 14:46:59
 * @LastEditors: wss
 * @LastEditTime: 2021-01-05 16:41:20
 */
import Vue from "vue";
import VueRouter from "vue-router";
import { jkRoute } from "./jkRoute.js";
import { wssRoute } from "./wssRoute.js";
import dynamicRouter from "@/router/dynamic-router";

const Admin = () => import("../views/admin/");

// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject)
//     return originalPush.call(this, location, onResolve, onReject);
//   return originalPush.call(this, location).catch(err => err);
// };
// console.log($store);
// const resourceTemplate = $store.getters['user/getResourceTemplate'][0].resourceTemplate;
// console.log(resourceTemplate);
Vue.use(VueRouter);
export const DynamicRoutes = [
  // const DynamicRoutes = [
  //动态路由,菜单,无权限控制
  {
    path: "", //admin
    component: Admin,
    name: "admin",
    // redirect: 'home',
    meta: {
      name: "菜单",
      icon: "el-icon-menu"
    },
    children: dynamicRouter
  },
  {
    path: "/403",
    redirect: "home"
    // component: Forbidden
  },
  {
    path: "/401",
    name: "401",
    meta: {
      keepAlive: true,
      title: "无权限",
      name: "无权限"
    },
    component: () => import(/* webpackChunkName: "401" */ "../views/error/401")
  },
  {
    path: "/404",
    redirect: { name: "/" }
    // component: () => import("../views/interfaceIndex/")
  },
  {
    path: "*",
    redirect: { name: "moduleListIndex" }
    // component: () => import("../views/interfaceIndex/")
  }
];
export const routes = [
  {
    path: "/",
    name: "/",
    redirect: {
      // path: `/pageDetail?id=${resourceTemplate}`
      // path: "/pageDetail"
      name: "moduleListIndex"
    }
  },

  ...jkRoute,
  ...wssRoute,
  ...DynamicRoutes
];

export default new VueRouter({
  mode: "history", //'history',hash,
  base: __dirname,
  linkActiveClass: "active",
  routes: routes
});
