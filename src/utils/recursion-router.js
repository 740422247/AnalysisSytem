/**
 *
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */

export function recursionRouter(userRouter = [], allRouter = []) {
  var realRoutes = []

  allRouter && allRouter.forEach((v, i) => {
    userRouter && userRouter.forEach((item, index) => {
      // if (item.name === (v.permissions && v.permissions[0])) {
      if (v.permissions && v.permissions.some(itt => itt === item.name)) {
        if (item.children && item.children.length > 0) {
          v.children = recursionRouter(item.children, v.children)
        }
        realRoutes.push(v)
      }
    })
  })
  return realRoutes
}

/**
*
* @param {Array} routes 用户过滤后的路由
*
* 递归为所有有子路由的路由设置第一个children.path为默认路由
*/
export function setDefaultRoute(routes) {
  routes.forEach((v, i) => {
    if (v.children && v.children.length > 0) {
      v.redirect = { name: v.children[0].name }
      setDefaultRoute(v.children)
    }
  })
}

export function Authentication(router, store) {
  router.beforeEach((to, from, next) => {
    let matName;
    if (to.matched.length > 0) {
      matName = to.matched[0].name
      if (matName === "admin") {
        store.commit('permission/SET_Management', true)
      } else {
        store.commit('permission/SET_Management', false)
      }
    } else {
      store.commit('permission/SET_Management', false)
    }
    const tokenString = window.localStorage.getItem("token")
    // if (!store.state.UserToken) {//验证本地token
    if (!tokenString) {
      // if (to.path === '/login') { //如果是登录页面路径，就直接next()
      if (
        to.matched.length > 0 &&
        !to.matched.some(record => record.meta.requiresAuth)
      ) {
        next()
      } else {
        next({ path: '/login' })
      }
      //   next();
      // } else { //不然就跳转到登录；
      //   next('/login');
      // }
    } else {
      if (store.state.permission && !store.state.permission.permissionList) {
        store.dispatch('permission/FETCH_PERMISSION').then(() => {
          next({ path: to.path })
        })
      } else {
        if (to.path !== '/login') {
          next()
        } else {
          next(from.fullPath)
        }
      }
    }
  })
  router.afterEach((to, from, next) => {

    // var routerList = to.matched
    // store.commit('setCrumbList', routerList)
    store.commit('permission/SET_CURRENT_MENU', to.name)
  })
}
