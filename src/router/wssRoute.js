/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-05-26 15:27:10
 * @LastEditors: wss
 * @LastEditTime: 2020-12-01 15:00:12
 */

// const tablewss = () => import(/* webpackChunkName: "Home" */ "../components/tablewss/tablewss.vue")
export const wssRoute = [
  {
    path: "/login",
    name: "login",
    // component: () => import("../views/Login/Login.vue"),
    component: () => import("@components/Login/Login"),
    meta: {
      keepAlive: true,
      title: "登录"
    }
  },
  {
    path: "/SearchAll",
    component: () =>
      import("@components/customization/searchAll/searchAll.vue"
      ),
    name: "SearchAll",
    meta: {
      name: "全局搜索",
      icon: "el-icon-setting"
    }
  },
  {
    path: "/TextWss",
    name: "TextWss",
    // component: () => import("../views/Login/Login.vue"),
    component: () => import("@views/TextWss"),
    meta: {
      keepAlive: true,
      title: "测试js"
    }
  },
  {
    path: "/index",
    name: "index",
    meta: {
      keepAlive: true,
      title: "首页2",
      name: "首页2"
    },
    component: () => import(/* webpackChunkName: "index" */ "../views/index/")
  },
  {
    path: "/gyTest",
    component: () =>
      import("../views/debugList/gyTest.vue"
      ),
    name: "gyTest",
    meta: {
      name: "组件预览",
      icon: "el-icon-setting"
    }
  },
  {
    path: "/SystemMonitoring",
    component: () =>
      import("@views/customization/SystemMonitoring/SystemMonitoring.vue"
      ),
    name: "SystemMonitoring",
    meta: {
      name: "系统监控配置",
      icon: "el-icon-setting"
    }
  },
  // {
  //   path: "/PoorCountry",
  //   component: () =>
  //     import("@components/custom/PoorCountry/PoorCountry"),
  //   name: "PoorCountry",
  //   meta: {
  //     name: "乡镇",
  //     icon: "el-icon-setting"
  //   }
  // }
  // {
  //   path: "/401",
  //   name: "401",
  //   meta: {
  //     keepAlive: true,
  //     title: "无权限",
  //     name: '无权限'
  //   },
  //   component: () => import(/* webpackChunkName: "401" */ "../views/error/401")
  // }
];
