/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-11 15:33:03
 * @LastEditors: wss
 * @LastEditTime: 2020-12-24 17:16:27
 */
import 'babel-polyfill'
import Vue from "vue";
import App from "./App.vue";
/**
 * 阻止事件的默认行为:文档如下
 * https://blog.csdn.net/
 * weixin_40716786/article/details/90045802
 */
import "default-passive-events";
import router from "./router/index";
import store from "./store";
import axios from "axios";
import "@assets/css/jk.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/index.scss";
import { Authentication } from "./utils/recursion-router";
import * as filters from "@/until/format/format.js";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Authentication(router, store); //动态菜单生成

// axios.get("/config.json").then(result => {
  // Vue.prototype._config = result.data;
  new Vue({
    render: h => h(App),
    router,
    store
  }).$mount("#app");
// });
