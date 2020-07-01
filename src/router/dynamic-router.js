/* 订单管理 */
const jurisdiction = () => import('../views/admin/permission/index.vue')
const interfaceIndex = () => import('../views/interfaceIndex/')

/* 需要权限判断的路由 */
const dynamicRoutes = [
  {
    path: '/interfaceIndex',
    component: interfaceIndex,
    name: 'interface',
    permissions: ['界面编辑'],
    meta: {
      name: '界面编辑',
      icon: 'el-icon-set-up'
    },
    children: [
      {
        path: 'interface1',
        name: 'interface1',
        permissions: ['界面编辑-界面1'],
        component: () => import("../views/interfaceIndex/jm1/jm1.vue"),
        meta: {
          name: '界面1',
          icon: 'icon-quit'
        }
      },
      {
        path: 'dragHome',
        name: 'dragHome',
        permissions: ['界面编辑-页面编辑'],
        component: () => import("../views/dragable/DragHome"),
        meta: {
          name: '页面编辑'
        }
      },
      {
        path: 'ApiSet',
        name: 'ApiSet',
        permissions: ['界面编辑-接口设置'],
        component: () => import("../views/dragable/ApiSet"),
        meta: {
          name: '接口设置'
        }
      },
      {
        path: 'preview',
        name: 'preview',
        permissions: ['界面编辑-页面预览'],
        // component: () => import("../views/interfaceIndex/jm1/jm1.vue"),
        component: () => import("../views/preview/Preview"),
        meta: {
          name: '页面预览'
        }
      },
      {
        path: 'interface3',
        name: 'interface3',
        // component: ReturnGoods,
        meta: {
          name: '界面3',
          icon: 'icon-product-manage'
        }
      }
    ]
  },
  {
    path: '/jurisdiction',
    component: jurisdiction,
    name: 'jurisdiction',
    permissions: ['权限管理'],
    // redirect: { name: 'role' },
    meta: {
      name: '权限管理',
      icon: 'el-icon-s-tools'
    },
    children: [
      {
        path: 'user',
        name: 'user',
        permissions: ['权限管理-用户管理'],
        component: () => import(/* webpackChunkName: "Home" */ "../views/admin/permission/user.vue"),
        meta: {
          name: '用户管理',
          icon: 'el-icon-user-solid'
        }
      },
      {
        path: 'role',
        name: 'role',
        permissions: ['权限管理-菜单管理'],
        component: () => import(/* webpackChunkName: "Home" */ "../views/admin/permission/role.vue"),
        meta: {
          name: '菜单管理',
          icon: 'el-icon-s-order'
        }
      }
    ]
  },
  {
    path: '/authority1',
    // component: () => import(/* webpackChunkName: "Home" */ "../views/admin/permission"),
    name: 'authority1',
    permissions: ['测试权限控制1'],
    meta: {
      name: '测试权限控制1',
      icon: 'el-icon-s-tools'
    }
  },
  {
    path: '/authority2',
    // component: () => import(/* webpackChunkName: "Home" */ "../views/admin/permission"),
    name: 'authority2',
    permissions: ['测试权限控制2'],
    meta: {
      name: '测试权限控制2',
      icon: 'el-icon-setting'
    }
  },
  {
    path: '/authority3',
    // component: () => import(/* webpackChunkName: "Home" */ "../views/admin/permission"),
    name: 'authority3',
    permissions: ['测试权限控制3'],
    meta: {
      name: '测试权限控制3',
      icon: 'el-icon-setting'
    }
  },
  {
    path: 'authority4',
    // component: () => import(/* webpackChunkName: "Home" */ "../views/admin/permission"),
    name: 'authority4',
    permissions: ['测试权限控制4'],
    meta: {
      name: '测试权限控制4',
      icon: 'el-icon-setting'
    }
  }
]
export default dynamicRoutes
