/* 需要权限判断的路由 */
export const dynamicRoutes = [
  {
    path: '/order',
    // component: Order,
    name: 'order-manage',
    meta: {
      name: '界面编辑',
      icon: 'icon-email'
    },
    children: [
      {
        path: 'list',
        name: 'order-list',
        // component: OrderList,
        meta: {
          name: '界面1',
          icon: 'icon-quit'
        }
      },
      {
        path: 'product',
        name: 'product-manage',
        // component: ProductManage,
        meta: {
          name: '界面2'
        },
        children: [
          {
            path: 'list',
            name: 'product-list',
            // component: ProductionList,
            meta: {
              name: '界面2-1'
            }
          },
          {
            path: 'review',
            name: 'review-manage',
            // component: ReviewManage,
            meta: {
              name: '界面2-2'
            }
          }
        ]
      },
      {
        path: 'returnGoods',
        name: 'return-goods',
        // component: ReturnGoods,
        meta: {
          name: '界面3',
          icon: 'icon-product-manage'
        }
      }
    ]
  },
  {
    path: '/qxgl',
    // component: () => import(/* webpackChunkName: "Home" */ "../views/admin/permission"),
    name: 'qxgl',
    permissions: ['权限管理'],
    meta: {
      name: '权限管理',
      icon: 'icon-order-manage'
    },
    children: [
      {
        path: '/user',
        name: 'user',
        permissions: ['权限管理-用户管理'],
        // component: () => import(/* webpackChunkName: "Home" */ "../views/admin/permission/role.vue"),
        meta: {
          name: '用户管理',
          icon: 'icon-home'
        }
      },
      {
        path: '/role',
        name: '/role',
        permissions: ['权限管理-菜单管理'],
        // component: () => import(/* webpackChunkName: "Home" */ "../views/admin/permission/role.vue"),
        meta: {
          name: '菜单管理',
          icon: 'icon-product-manage'
        }
      }
    ]
  }
]
