/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-11 16:26:44
 * @LastEditors: wss
 * @LastEditTime: 2020-12-23 15:34:23
 */
import http from "./http";
class API {
  User = (type, params) => {
    switch (type) {
      case "Add":
        return http.put("/Da/User/Add", params);
      case "GetList":
        return http.get("/Da/User/GetList", params);
      case "GetPage":
        return http.get("/Da/User/GetPage", params);
      case "Delete":
        return http.delete("/Da/User/Delete", params);
      case "GetRel":
        return http.get("/Da/User/GetRel", params);
      case "Update":
        return http.post("/Da/User/Update", params);
      case "GetRoles":
        return http.get("/Da/User/GetRoles", params);
      case "SetRoles":
        return http.post("/Da/User/SetRoles", params);
      case "GetProfile": //获取用户详细信息
        return http.get("/Da/User/GetProfile", params);
      case "GetResources": //获取用户详细信息
        return http.get("/Da/User/GetResources", params);
      case "SetUsers": //角色挂用户
        return http.post("/Da/Role/SetUsers", params);
      case "GetUsers": //角色获取用户
        return http.get("/Da/Role/GetUsers", params);
    }
  };

  SysBusiness = (type, params) => {
    switch (type) {
      case "Add":
        return http.post("/Da/SysBusiness/Add", params);
      case "Update":
        return http.post("/Da/SysBusiness/Update", params);
      case "Get":
        return http.get("/Da/SysBusiness/Get", params);
      case "GetPage":
        return http.get("/Da/SysBusiness/GetPage", params);
      case "Delete":
        return http.delete("/Da/SysBusiness/Delete", params);
    }
  };

  SysUserManagement = (type, params) => {
    switch (type) {
      case "Add":
        return http.post("/Da/SysUserManagement/Add", params);
      case "Update":
        return http.post("/Da/SysUserManagement/Update", params);
      case "Get":
        return http.get("/Da/SysUserManagement/Get", params);
      case "GetPage":
        return http.get("/Da/SysUserManagement/GetPage", params);
      case "GetBusinessUserByRole":
        return http.get("/Da/SysUserManagement/GetBusinessUserByRole", params);
      case "Delete":
        return http.delete("/Da/SysUserManagement/Delete", params);
    }
  };

  ChartApiOption = (type, params) => {
    switch (type) {
      case "Add":
        return http.post("/Da/ChartApiOption/Add", params);
      case "Update":
        return http.post("/Da/ChartApiOption/Update", params);
      case "UpdateList":
        return http.post("/Da/ChartApiOption/UpdateList", params);
      case "Get":
        return http.get("/Da/ChartApiOption/Get", params);
      case "GetPage":
        return http.get("/Da/ChartApiOption/GetPage", params);
      case "Delete":
        return http.delete("/Da/ChartApiOption/Delete", params);
      case "RefreshApi":
        return http.post("/Da/ChartApiOption/RefreshApi", params);
      case "IsEnable":
        return http.post("/Da/ChartApiOption/IsEnable", params);
    }
  };

  Role = (type, params) => {
    switch (type) {
      case "Add":
        return http.put("/Da/Role/Add", params);
      case "GetList":
        return http.get("/Da/Role/GetList", params);
      case "GetPage":
        return http.get("/Da/Role/GetPage", params);
      case "Delete":
        return http.delete("/Da/Role/Delete", params);
      case "SetResources":
        return http.post("/Da/Role/SetResources", params);
      case "GetResources":
        return http.get("/Da/Role/GetResources", params);
      case "Update":
        return http.post("/Da/Role/Update", params);
    }
  };

  Resource = (type, params) => {
    switch (type) {
      case "Add":
        return http.put("/Da/Resource/Add", params);
      case "GetList":
        return http.get("/Da/Resource/GetList", params);
      case "GetPage":
        return http.get("/Da/Resource/GetPage", params);
      case "Delete":
        return http.delete("/Da/Resource/Delete", params);
      case "Get":
        return http.get("/Da/Resource/Get", params);
      case "Update":
        return http.post("/Da/Resource/Update", params);
      case "SetRoles":
        return http.post("/Da/Resource/SetRoles", params);
      case "GetRoles":
        return http.get("/Da/Resource/GetRoles", params);
    }
  };

  ChartModule = (type, params) => {
    switch (type) {
      case "GetPage":
        return http.get("/Da/ChartModule/GetPage", params);
      case "getPageList":
        return http.get("/Da/ChartModule/getPageList", params);
    }
  };

  ChartConfig = (type, params) => {
    switch (type) {
      case "GetPage":
        return http.get("/Da/ChartConfig/GetPage", params);
    }
  };

  Setting = (type, params) => {
    switch (type) {
      case "Get":
        return http.get("/Da/Setting/Get", params);
      case "Set":
        return http.post("/Da/Setting/Set", params);
    }
  };

  ApiProxy = (type, params, overtime$) => {
    switch (type) {
      case "GetData":
        return http.post("/Da/ApiProxy/GetData", params, null, overtime$);
    }
  };

  Login = (type, params, noToken) => {
    switch (type) {
      case "Login":
        return http.post("/Da/Login/Login", params, noToken);
      case "Refresh":
        return http.post("/Da/Login/Refresh", params, "RefreshToken");
      case "GetVerifyCode":
        return http.get("/Da/Login/GetVerifyCode", params, noToken);
    }
  };

  // Login = (params, noToken) => http.post("/Api/Login/Login", params, noToken);
  GetYear = params => http.get("/Api/Dim/GetYear", params);
  UserAdd = params => http.put("/Da/User/Add", params);
  publicApi = (url, paramsAll, type = "get") => {
    // console.log(paramsAll);
    let overtime$;
    if (paramsAll && paramsAll.overtime$) {
      overtime$ = paramsAll.overtime$;
      delete paramsAll.overtime$;
    }
    const params = paramsAll;
    if (type === "get") {
      return http.get(url, params, undefined, overtime$);
    } else if (type === "post") {
      return http.post(url, params, undefined, overtime$);
    } else if (type === "delete") {
      return http.delete(url, params, undefined, overtime$);
    } else if (type === "form") {
      return http.form(url, params, undefined, overtime$);
    } else if (type === "download") {
      return http.download(url, params, undefined, overtime$);
    }
  };
}
export default new API(); // eslint-disable-line
// export const Login = params => http.get("/Api/Login/Login", params);
// export const ads = params => http.get("/passport", params);
// export const sendSms = params => http.post("/ads/otherads", params);
// export const phoneCode = params => http.post("/ads/otherads", params);
