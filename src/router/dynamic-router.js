/* 订单管理 */
const jurisdiction = () => import("../views/admin/permission/index.vue");
const interfaceIndex = () => import("../views/interfaceIndex/");
const moduleList = () => import("../views/moduleList/");
const pageList = () => import("../views/pageList/");

/* 需要权限判断的路由 */
const dynamicRoutes = [
  {
    path: "/interfaceIndex",
    component: interfaceIndex,
    name: "interfaceIndex",
    permissions: ["界面管理"],
    meta: {
      name: "界面管理",
      icon: "el-icon-set-up"
    },
    children: [
      {
        path: "loginLayout",
        name: "loginLayout",
        permissions: ["登录页配置"],
        component: () => import("@components/Login/Login"),
        meta: {
          name: "登录页配置",
          icon: "icon-quit"
        }
      },
      {
        path: "ConfigSearchAll",
        name: "ConfigSearchAll",
        permissions: ["全局搜索配置"],
        component: () =>
          import("@components/customization/searchAll/searchAll"),
        meta: {
          name: "全局搜索配置",
          icon: "icon-quit",
          isConfig: true
        }
      },
      // {
      //   path: "ConfigSystemMonitoring",
      //   name: "ConfigSystemMonitoring",
      //   // permissions: ["全局搜索配置"],
      //   component: () =>
      //     import("@views/customization/SystemMonitoring/SystemMonitoring.vue"),
      //   meta: {
      //     name: "系统监控配置",
      //     icon: "icon-quit",
      //     isConfig: true
      //   }
      // },
      // {
      //   path: "PoorCountry",
      //   name: "PoorCountry",
      //   // permissions: ["乡镇"],
      //   component: () =>
      //     import("@components/custom/PoorCountry/PoorCountry"),
      //   meta: {
      //     name: "乡镇",
      //     icon: "icon-quit",
      //     isConfig: true
      //   }
      // },
      {
        path: "moduleList",
        name: "moduleList",
        isSubstratum: true, //是否底层
        permissions: ["模块管理"],
        component: moduleList,
        // component: () =>
        //   import("../views/configList/moduleList/moduleList.vue"),
        meta: {
          name: "模块管理",
          isSubstratum: true //是否底层
        },
        redirect: { name: "moduleListIndex" },
        children: [
          {
            path: "moduleListIndex",
            name: "moduleListIndex",
            permissions: ["界面管理-模块管理-模块编辑"],
            component: () =>
              import("../views/configList/moduleList/moduleList.vue"),
            meta: {
              name: "模块编辑"
            }
          },
          {
            path: "ApiSet",
            name: "ApiSet",
            permissions: ["界面管理-模块管理-模块编辑"],
            component: () => import("../views/dragable/ApiSet.vue"),
            meta: {
              name: "模块编辑"
            }
          }
        ]
      },
      {
        path: "pageList",
        name: "pageList",
        permissions: ["界面管理-页面管理"],
        isSubstratum: true, //是否底层
        component: pageList,
        meta: {
          name: "页面管理",
          isSubstratum: true //是否底层
        },
        redirect: { name: "pageListIndex" },
        children: [
          {
            path: "pageListIndex",
            name: "pageListIndex",
            permissions: ["界面管理-页面管理-页面编辑"],
            component: () =>
              import("../views/configList/pageList/pageList.vue"),
            // component: () => import("../views/dragable/DragHome.vue"),
            meta: {
              name: "页面编辑"
            }
          },
          {
            path: "dragHome2",
            name: "dragHome2",
            permissions: ["界面管理-页面管理-页面编辑"],
            component: () => import("../views/dragable/DragHome.vue"),
            meta: {
              name: "页面编辑"
            }
          }
        ]
      },
      {
        path: "interface3",
        name: "interface3",
        permissions: ["界面3"],
        // component: ReturnGoods,
        meta: {
          name: "界面3",
          icon: "icon-product-manage"
        }
      }
    ]
  },
  {
    path: "/jurisdiction",
    component: jurisdiction,
    name: "jurisdiction",
    permissions: ["权限管理"],
    meta: {
      name: "权限管理",
      icon: "el-icon-s-tools"
    },
    redirect: { name: "user" },
    children: [
      {
        path: "user",
        name: "user",
        permissions: ["用户管理"],
        component: () =>
          import(
            /* webpackChunkName: "user" */ "../views/admin/permission/user.vue"
          ),
        meta: {
          name: "用户管理",
          icon: "el-icon-user-solid"
        }
      },
      {
        path: "role",
        name: "role",
        permissions: ["角色管理"],
        component: () =>
          import(
            /* webpackChunkName: "role" */ "../views/admin/permission/role.vue"
          ),
        meta: {
          name: "角色管理",
          icon: "el-icon-s-order"
        }
      },
      {
        path: "menu",
        name: "menu",
        permissions: ["菜单管理"],
        component: () =>
          import(
            /* webpackChunkName: "Menu" */ "../views/admin/menu/menuAdministration.vue"
          ),
        meta: {
          name: "菜单管理",
          icon: "el-icon-s-order"
        }
      },
      {
        path: "businessMaintenance",
        name: "businessMaintenance",
        permissions: ["业务系统维护"],
        component: () =>
          import("../views/admin/businessMaintenance/businessMaintenance.vue"),
        meta: {
          name: "业务系统维护",
          icon: "el-icon-s-order"
        }
      },
      {
        path: "ApiAdmin",
        name: "ApiAdmin",
        permissions: ["Api管理"],
        component: () => import("../views/admin/ApiAdmin/ApiAdmin.vue"),
        meta: {
          name: "Api管理",
          icon: "el-icon-s-order"
        }
      }
    ]
  },
  {
    path: "/authority1",
    // component: () => import(/* webpackChunkName: "Home" */ "../views/admin/permission"),
    name: "authority1",
    permissions: ["测试权限控制1"],
    meta: {
      name: "测试权限控制1",
      icon: "el-icon-s-tools"
    }
  },
  {
    path: "/authority2",
    // component: () => import(/* webpackChunkName: "Home" */ "../views/admin/permission"),
    name: "authority2",
    permissions: ["测试权限控制2"],
    meta: {
      name: "测试权限控制2",
      icon: "el-icon-setting"
    }
  },
  {
    path: "/authority3",
    // component: () => import(/* webpackChunkName: "Home" */ "../views/admin/permission"),
    name: "authority3",
    permissions: ["测试权限控制3"],
    meta: {
      name: "测试权限控制3",
      icon: "el-icon-setting"
    }
  },
  {
    path: "/authority4",
    // component: () => import(/* webpackChunkName: "Home" */ "../views/admin/permission"),
    name: "authority4",
    permissions: ["测试权限控制4"],
    meta: {
      name: "测试权限控制4",
      icon: "el-icon-setting"
    }
  // },
  // {
  //   path: "/previewList",
  //   component: () =>
  //     import(/* webpackChunkName: "previewList" */ "../views/previewList.vue"),
  //   name: "previewList",
  //   permissions: ["组件预览"],
  //   meta: {
  //     name: "组件预览",
  //     icon: "el-icon-setting"
  //   }
  }
];
export default dynamicRoutes;
