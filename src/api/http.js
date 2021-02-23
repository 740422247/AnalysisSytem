/* eslint-disable*/
import { Message } from "element-ui";
import axios from "axios";
import store from "@/store/index.js";
import $router from "@/router/index.js";
import Vue from "vue";

// axios 配置
// console.log('config:', _GLOBCONFIG)

const { BASE_URL, TEST_URL } = _GLOBCONFIG;
Vue.prototype._config = _GLOBCONFIG
// const BASE_URL = _GLOBCONFIG ? _GLOBCONFIG.BASE_URL : "http://192.168.4.211:21001/";
// const BASE_URL = "http://192.168.4.211:21001/";
// const TEST_URL = _GLOBCONFIG ? _GLOBCONFIG.TEST_URL :"http://192.168.4.211:21001/";
// const TEST_URL = "http://192.168.4.211:21001/";
// console.log(process.env.NODE_ENV)
const URL = process.env.NODE_ENV === "development" ? TEST_URL : BASE_URL;

const http = axios.create({
  timeout: 60000,
  baseURL: URL,
  validateStatus: function (status) {
    //服务器返回状态码
    // const text = status == 500 ? '错误' : ''
    return status >= 200 && status < 300; // default
  },
  withCredentials: true,
  header: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});
const formConfig = {
  timeout: 60000,
  baseURL: URL,
  headers: {
    "Content-Type": "multipart/form-data"
  }
};
// 发送一般请求
http.interceptors.request.use(
  function (config) {
    // console.log(config);
    if (config.overtime$) {
      config.timeout = config.overtime$;
    }
    const time = new Date().getTime() / 1000;
    const tokenObj = store.state.user.token;
    if (config.token === "noToken") {
      return config;
    } else if (config.token === "RefreshToken") {
      config.headers.Authorization = `${tokenObj.tokenType} ${tokenObj.accessToken}`;
      return config;
    } else {
      //expirationTime过期时间---当前时间time
      if (tokenObj) {
        if (tokenObj.expirationTime - time < 600) {
          return config;
          // Message.error({
          //   message: "token即将过期,正在刷新token"
          // });
          // return new Promise(function(resolve) {
          //   store.dispatch("user/Refresh_TOKEN", config).then(() => {
          //     const tokenObj = store.state.user.token;
          //     config.headers.Authorization = `${tokenObj.tokenType} ${tokenObj.accessToken}`;
          //     resolve(config);
          //   });
          // });
        } else {
          config.headers.Authorization = `${tokenObj.tokenType} ${tokenObj.accessToken}`;
          return config;
        }
      } else {
        $router.push({
          path: "/login",
          replace: true
        });
      }
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  function (response) {
    return response.data;
    // return Promise.resolve(response.data);
  },
  function (error) {
    if (
      error.code === "ECONNABORTED" &&
      error.message.indexOf("timeout") !== -1
    ) {
      Message.error({
        message: "请求超时.."
      });
      return Promise.reject("请求超时..");
      // console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，
      // 你可以在这里加入超时的处理方案')
      // `这里我 的方案是，超时后再次请求，所以新建了一个promise`
      // var newHttp= new Promise(function (resolve){
      // 	resolve()
      // })
      // `newHttp实例执行完成后会再次执行`
      // // 返回一个promise实例，同时重新发起请求，config请求配置，包扩请求头和请求参数
      // return newHttp.then(function (){
      // 	return axios(config)
      // })
    }
    if (error.response && error.response.status !== 200) {
      let msg =
        error.response.data.errMsg ||
        `请求错误,错误码为:${error.response.status}`;
      if (error.response.status === 401) {
        msg = "token过期,重新登录";
        // console.log($router);
        // $router.push({
        //   path: "/login",
        //   replace:true
        // });
        // store.dispatch("user/Log_out");
        $router.replace({
          path: "/login"
        });
        // break;
      }
      Message.error({
        message: msg
      });
    } else {
      Message.success({
        message: error.response ? error.response.data.errMsg : ""
      });
    }
    return Promise.reject(error.response);
  }
);
export default {
  host() {
    return URL;
  },
  put(url, params = {}) {
    return new Promise(async (resolve, reject) => {
      // eslint-disable-line
      try {
        const data = await http.put(url, params);
        resolve(data); // eslint-disable-line
      } catch (err) {
        // console.log(err.response);
        reject(err.response);
        //notice("请求超时", 1.5, "bottom");
      }
    });
  },
  get(url, params = {}, token = null, overtime$) {
    // console.log(params, token, overtime$);
    return new Promise(async (resolve, reject) => {
      try {
        http
          .get(url, { params, token, overtime$ })
          .then(data => {
            resolve(data);
          })
          .catch(function (error) {
            reject(error);
          });
      } catch (err) {
        //notice("请求超时", 1.5, "bottom");
      }
    });
  },
  delete(url, params = {}, token = null, overtime$) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await http.delete(url, { params, token, overtime$ });
        resolve(data); // eslint-disable-line
      } catch (err) {
        //notice("请求超时", 1.5, "bottom");
      }
    });
  },
  post(url, params = {}, token = null, overtime$) {
    // console.log(params, token, overtime$);
    return new Promise(async (resolve, reject) => {
      try {
        http
          .post(url, params, { token, overtime$ })
          .then(data => {
            resolve(data);
          })
          .catch(function (error) {
            reject(error);
          });
      } catch (err) {
        reject(err);
      }
    });
  },
  download(url, params = {}, token = null, overtime$ = 60000) {
    // console.log(params, token, overtime$);
    return new Promise(async (resolve, reject) => {
      try {
        http
          .post(url, params, { token, overtime$, responseType: 'blob' })
          .then(data => {
            resolve(data);
          })
          .catch(function (error) {
            reject(error);
          });
      } catch (err) {
        reject(err);
      }
    });
  },
  form(url, params = {}) {
    return new Promise(async (reslove, reject) => {
      try {
        const data = http.post(url, params, formConfig);
        reslove(data); // eslint-disable-line
      } catch (err) { }
    });
  }
};
