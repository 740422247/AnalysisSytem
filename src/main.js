/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-11 15:33:03
 * @LastEditors: joykit
 * @LastEditTime: 2020-05-15 16:02:14
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import axios from "axios";
import "@assets/css/jk.css";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
import { Authentication } from './utils/recursion-router'
Vue.use(ElementUI);
Vue.config.productionTip = false;
Authentication(router, store);//动态菜单生成

axios
  .get("/config.json")
  .then(result => {
    Vue.prototype._config = result.data;
    new Vue({
      render: h => h(App),
      router,
      store
    }).$mount("#app");
  })
