/* eslint-disable*/
import axios from "axios";
// axios 配置
const BASE_URL = "http://news.baidu.com";
const TEST_URL = "http://192.168.4.211:20801";
// console.log(process.env.NODE_ENV)
const URL = process.env.NODE_ENV === "development" ? TEST_URL : BASE_URL;

const http = axios.create({
  timeout: 5000,
  baseURL: URL,
  validateStatus: function(status) {
    //服务器返回状态码
    // const text = status == 500 ? '错误' : ''
    return status >= 200 && status < 300; // default
  },
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
  function(config) {
    if (config.token === "noToken") {
      //不需要请求头
      return config;
    } else {
      /**
       * 此处应判断本地token是否过期,是否使用刷新TOKen重新获取请求TOKEN
       */
      const tokenString = window.localStorage.getItem("token");
      const token = JSON.parse(tokenString);
      if (tokenString) {
        let tokenB = token.token_type + " " + token.access_token;
        //将token放到请求头发送给服务器,将tokenken放在请求头中
        config.headers.Authorization = tokenB;
        // config.headers['accessToken'] = Token;
        return config;
      } else {
        this.$router.replace({
          path: "/Login"
        });
      }
    }
  },
  function(error) {
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  function(response) {
    return Promise.resolve(response.data);
  },
  function(error) {
    const numArr = error.toString().match(/\d+/g)[0];
    const text = numArr == 500 ? "登录名或登录密码错误" : "";
    return Promise.resolve({
      code: numArr,
      text: text
    });
    // return Promise.reject(error);
  }
);
export default {
  host() {
    return URL;
  },
  get(url, params = {}, token = null) {
    return new Promise(async (resolve, reject) => {
      // eslint-disable-line
      try {
        const data = await http.get(url, { params, token });
        resolve(data); // eslint-disable-line
      } catch (err) {
        //notice("请求超时", 1.5, "bottom");
      }
    });
  },
  post(url, params = {}, token = null) {
    return new Promise(async (resolve, reject) => {
      try {
        http.post(url, params, { token }).then(data => {
          resolve(data);
        });
      } catch (err) {
        // console.log(err)
      }
    });
  },
  form(url, params = {}) {
    return new Promise(async (reslove, reject) => {
      try {
        const data = http.post(url, params, formConfig);
        reslove(data); // eslint-disable-line
      } catch (err) {}
    });
  }
};
