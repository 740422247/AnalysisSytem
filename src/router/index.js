/*
 * @Descripttion:
 * @version:
 * @Author: joykit
 * @Date: 2020-02-11 14:46:59
 * @LastEditors: joykit
 * @LastEditTime: 2020-03-30 16:07:15
 */
import Vue from "vue";
import VueRouter from "vue-router";
import { jkRoute } from "./jkRoute.js";
import { wssRoute } from "./wssRoute.js";
const Admin = () => import('../views/admin/')

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: {
      name: "index"
    }
  },

  ...jkRoute,
  ...wssRoute
];
export const DynamicRoutes = [//动态路由,菜单,无权限控制
  {
    path: '', //admin
    component: Admin,
    name: 'admin',
    // redirect: 'home',
    meta: {
      name: '菜单',
      icon: 'el-icon-menu'
    },
    children: [//此处index控制菜单
      {
        path: 'index',
      // component: () => import(/* webpackChunkName: "index" */ "../views/index/")
        name: 'index',
        meta: {
          name: '首页1',
          icon: 'icon-home'
        }
      }
    ]
  },
  {
    path: '/403',
    redirect: 'home'
    // component: Forbidden
  },
  {
    path: '*',
    redirect: 'index'
    // component: Forbidden
  }
]
export default new VueRouter({
  mode: "history", //'history',
  base: __dirname,
  linkActiveClass: "active",
  routes: routes
});
