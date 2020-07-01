
const tablewss = () => import(/* webpackChunkName: "Home" */ "../components/tablewss/tablewss.vue")
const helper = () => import(/* webpackChunkName: "Home" */ "../components/tablewss/table.vue")
// const Container = () => import(/* webpackChunkName: "Home" */ "../views/admin/Container.vue")
// const Login = () => import(/* webpackChunkName: "Home" */ "../views/Login/Login.vue")
// const Login = () => import('../views/Login/Login.vue')
export const wssRoute = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ "../views/Login/Login.vue"),
    // components: { default: Login },
    meta: {
      keepAlive: true,
      title: "登录"
    }
  },
  {
    path: "/index",
    name: "index",
    meta: {
      keepAlive: true,
      title: "首页2",
      name: '首页2'
    },
    component: () => import(/* webpackChunkName: "index" */ "../views/index/")
  }
  // {
  //   path: "/tablewss",
  //   name: "tablewss",
  //   meta: {
  //     keepAlive: true,
  //     title: "管理界面"
  //   },
  //   components: {
  //     default: tablewss
  //   }
  // },
  // {
  //   path: "/helper",
  //   name: "helper",
  //   meta: {
  //     keepAlive: true,
  //     title: "管理界面"
  //   },
  //   components: {
  //     default: helper
  //   }
  // },

  // {
  //   path: "/role",
  //   name: "role",
  //   meta: {
  //     keepAlive: true,
  //     title: "菜单管理"
  //   },
  //   component: () => import(/* webpackChunkName: "Home" */ "../views/admin/permission/role.vue")
  // },
  // {
  //   path: "/Container",
  //   name: "Container",
  //   meta: {
  //     keepAlive: true,
  //     title: "管理界面"
  //   },
  //   components: {
  //     default: Container
  //   }
  // }
];
