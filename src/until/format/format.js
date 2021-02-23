/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-04-30 17:00:05
 * @LastEditors: wss
 * @LastEditTime: 2020-12-22 10:42:50
 */
const NumFormat = data => {
  //定制过滤器，只过滤纯数字..
  if (typeof data !== "number") return data;
  if (data === 0 || data === "0") return 0;
  var a = parseFloat(data);
  const value = parseFloat(data);
  if (isNaN(a) || a < 1000 || a === 0 || a === "0") {
    return value;
  } else {
    if (a === value) {
      if (!value) return " ";
      var intPart = Number(value).toFixed(); // 获取整数部分
      let intPartFormat;
      if (Math.floor(value) === value) {
        intPartFormat = intPart
          .toString()
          .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 将整数部分逢三一断
      } else {
        intPartFormat = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); //使用正则替换，每隔三个数加一个','
      }

      return intPartFormat;
    }
    return value;
  }
};
// 10/23新增//定制过滤器，只过滤纯数字..d,小数位数
const NumFormatGather = (data, d = 0) => {
  // if (data === 84) {
  //     console.log('--------------');
  //     data = 8545.5454
  // }
  if (typeof data !== "number") return data;
  if (data === 0 || data === "0") return 0;
  var a = parseFloat(data);
  const value = parseFloat(data);
  if (isNaN(a) || a < 1000 || a === 0 || a === "0") {
    if (d !== 0) {
      return value.toFixed(d);
    } else {
      return value;
    }
  } else {
    if (a === value) {
      if (!value) return " ";
      value.toFixed(2);
      var intPart = Number(value).toFixed(); // 获取整数部分
      let intPartFormat;
      if (Math.floor(value) === value) {
        intPartFormat = intPart
          .toString()
          .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 将整数部分逢三一断
      } else {
        intPartFormat = value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); //使用正则替换，每隔三个数加一个','
      }

      return intPartFormat;
    }
    return value;
  }
};
const format = (f, item) => {
  switch (f.formatting) {
    case "String": {
      //文本
      return item;
    }
    case "N2S": {
      //千分位分隔符,2小数
      return NumFormatGather(item, 2);
    }
    case "N0S": {
      //千分位分隔符,整数.
      return NumFormatGather(item, 0);
    }
    case "n2": {
      //2位小数
      return parseFloat(item).toFixed(2);
    }
    case "n0": {
      return parseFloat(item).toFixed(0);
      //整数
    }
    default: {
      return item;
    }
  }
};
export { NumFormat, NumFormatGather, format };
