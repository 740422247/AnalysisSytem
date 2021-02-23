/*
 * @Descripttion:
 * @version:
 * @Author: joykit
 * @Date: 2020-02-19 12:57:33
 * @LastEditors: joykit
 * @LastEditTime: 2020-05-11 15:56:15
 */
export const jkRoute = [
  {
    path: "/home",
    name: "Home",
    meta: {
      keepAlive: true,
      title: "首页"
    },
    component: () => import(/* webpackChunkName: "Home" */ "../views/Home.vue")
  },
  // {
  //   path: "/ApiSet",
  //   name: "ApiSet",
  //   meta: {
  //     keepAlive: false,
  //     title: "接口设置"
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "ApiSet" */ "../views/dragable/ApiSet.vue")
  // },
  // {
  //   path: "/dragHome",
  //   name: "DragHome",
  //   meta: {
  //     keepAlive: false,
  //     title: "页面设置"
  //   },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "DragHome" */ "../views/dragable/DragHome.vue"
  //     )
  // },

  {
    path: "/preview",
    name: "Preview",
    meta: {
      keepAlive: false,
      title: "页面预览"
    },
    component: () =>
      import(/* webpackChunkName: "Preview" */ "../views/preview/Preview")
  },
  {
    path: "/pageDetail",
    name: "pageDetail",
    meta: {
      keepAlive: false,
      title: "页面预览"
    },
    component: () =>
      import(/* webpackChunkName: "Preview" */ "../views/preview/pageDetail")
  }
];
