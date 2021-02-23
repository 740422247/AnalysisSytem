/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-05-27 14:37:05
 * @LastEditors: wss
 * @LastEditTime: 2020-12-31 15:09:37
 */
/**
 *
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */
// import store from "@/store/index.js";
export function recursionRouter(userRouter = [], allRouter = []) {
  var realRoutes = [];
  allRouter &&
    allRouter.forEach((v, i) => {
      userRouter &&
        userRouter.forEach((item, index) => {
          // if (item.name === (v.permissions && v.permissions[0])) {
          if (v.permissions && v.permissions.some(itt => itt === item.name)) {
            if (item.children && item.children.length > 0) {
              v.children = recursionRouter(item.children, v.children);
            }
            realRoutes.push(v);
          }
        });
    });
  return realRoutes;
}

export function PermissionToFilter(userRouter = [], allRouter = []) {
  const realRoutes = [];
  const realRoutePaths = [];
  // aaa(userRouter, allRouter);
  const arr = aaa(userRouter, allRouter);
  function aaa(userRouter = [], allRouter = []) {
    const menus = []; //路由菜单
    allRouter &&
      allRouter.forEach((v, i) => {
        if (
          v.permissions === undefined ||
          v.permissions === "" ||
          v.permissions.length === 0
        ) {
          //新增permissions不存在,添加权限
          menus.push(v);
          realRoutes.push(v.name);
          realRoutePaths.push(v.path);
        } else {
          userRouter &&
            userRouter.forEach((item, index) => {
              // if (item.name === (v.permissions && v.permissions[0])) {
              if (
                v.permissions &&
                v.permissions.some(itt => itt === item.resourceName)
              ) {
                if (item.children && item.children.length > 0) {
                  v.children = aaa(item.children, v.children);
                }
                menus.push(v);
                realRoutes.push(v.name);
                realRoutePaths.push(v.path);
              }
            });
        }
      });
    return menus;
  }
  console.log(realRoutes);
  return [arr, realRoutes, realRoutePaths];
}

/**
 *
 * @param {Array} routes 用户过滤后的路由
 *
 * 递归为所有有子路由的路由设置第一个children.path为默认路由
 */
export function setDefaultRoute(routes) {
  console.log(
    "----------------------setDefaultRoute---------------------------"
  );
  console.log(routes);
  routes.forEach((v, i) => {
    if (v.children && v.children.length > 0) {
      v.redirect = { name: v.children[0].name };
      setDefaultRoute(v.children);
    }
  });
}
export function recursionRouter2(userRouter = [], allRouter = []) {
  var realRoutes2 = [];
  allRouter &&
    allRouter.forEach((v, i) => {
      userRouter &&
        userRouter.forEach((item, index) => {
          // if (item.name === (v.permissions && v.permissions[0])) {
          if (
            v.permissions &&
            v.permissions.some(itt => itt === item.resourceName)
          ) {
            if (item.children && item.children.length > 0) {
              v.children = recursionRouter2(item.children, v.children);
            }
            realRoutes2.push(v);
          }
        });
    });
  // console.log(realRoutes2);
  return realRoutes2;
}

/**
 *
 * @param {Array} routes 用户过滤后的路由
 *
 * 递归为所有有子路由的路由设置第一个children.path为默认路由
 */
export function setDefaultRoute2(routes) {
  routes.forEach((v, i) => {
    if (v.children && v.children.length > 0) {
      v.redirect = { name: v.children[0].name };
      setDefaultRoute(v.children);
    }
  });
}
export function Authentication(router, store) {
  router.beforeEach((to, from, next) => {
    let matName;
    if (to.matched.length > 0) {
      matName = to.matched[0].name;
      if (matName === "admin") {
        store.commit("permission/SET_Management", true);
      } else {
        store.commit("permission/SET_Management", false);
      }
    } else {
      store.commit("permission/SET_Management", false);
    }
    // const tokenString = window.localStorage.getItem("token");
    const tokenObj = store.state.user.token;
    // const tokenString = 2222;
    // if (!store.state.UserToken) {//验证本地token
    const tokenLength = Object.keys(tokenObj).length;
    // debugger
    if (tokenLength === 0) {
      // console.log("无TOKEN");
      if (to.path === "/login") {
        //   //如果是登录页面路径，就直接next()
        next();
      }
      if (
        to.matched.length > 0 &&
        !to.matched.some(record => record.meta.requiresAuth)
      ) {
        next();
      } else {
        // next({ path: "/login" });
        next({ path: "/login" });
      }
    } else {
      // console.log("有TOKEN");
      const already = store.state.permission.already;
      const isNext = already.some(itt => itt === to.name);
      const isAdmin = to.matched[0].name === "admin";
      const userType = store.state.user.userInfo.userType;
      // console.log("是否有继续访问的权限:", isNext);
      // console.log("是否管理界面:", isAdmin);
      if (isAdmin) {
        // if (store.state.permission && !store.state.permission.permissionList) {
        //  next();//无需登录,
        if (isNext) {
          next();
        } else {
          const dd = to.matched[2] && to.matched[2].name;
          //如果没在权限集合里面,判断父级是否在
          if (already.some(itt => itt === dd)) {
            next();
          } else {
            next({ name: "401" });
            // if (userType === "Admin") {
            // } else {
            //   const resourceId =
            //     store.getters["user/getResourceTemplate"][0].resourceTemplate;
            //   console.log(resourceId);
            //   next({ path: "/pageDetail", query: { id: resourceId } });
            // }
          }
        }
      } else {
        console.log("有菜单权限");
        next();
        // if (to.path !== "/login") {
        //   next();
        // } else if (to.path === "/login") {
        //   next();
        // } else {
        //   next(from.fullPath);
        // }
      }
    }
  });
  router.afterEach((to, from, next) => {
    store.commit("SET_pageName", to.meta.name);
    // if (to.name !== "login") {
    //   store.dispatch("user/Refresh_TOKEN", null);
    // }
    if (to.matched.length >= 2) {
      const nn = to.matched[to.matched.length - 2];
      if (nn.meta.isSubstratum && nn.meta.isSubstratum === true) {
        store.commit("permission/SET_CURRENT_MENU", nn.name);
      } else {
        store.commit("permission/SET_CURRENT_MENU", to.name);
      }
    }
    // var routerList = to.matched //面包屑号航,未使用
    // store.commit('setCrumbList', routerList)
  });
}
