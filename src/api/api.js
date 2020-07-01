/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-11 16:26:44
 * @LastEditors: joykit
 * @LastEditTime: 2020-05-11 16:45:23
 */
import http from "./http";
class API {
  // eslint-disable-next-line no-undef
  Login = (params, noToken) => http.post("/Api/Login/Login", params, noToken);
  GetYear = (params) => http.get("/Api/Dim/GetYear", params);
  publicApi = (url, params, type = 'get') => {
    if(type === 'get'){
      return http.get(url,params);
    }
  }
}
export default new API() // eslint-disable-line
// export const Login = params => http.get("/Api/Login/Login", params);
// export const ads = params => http.get("/passport", params);
// export const sendSms = params => http.post("/ads/otherads", params);
// export const phoneCode = params => http.post("/ads/otherads", params);
