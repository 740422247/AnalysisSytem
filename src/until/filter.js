/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-08-10 17:37:31
 * @LastEditors: wss
 * @LastEditTime: 2020-11-05 14:21:51
 */

//本地过滤
//fields:需要过滤的key
//items:所有数据
//query:关键字
export function getFilterByQueryStringFn(fields, items, query) {
  // debugger
  // return (items, query) => {
  query = typeof query === "string" ? query.trim().toLowerCase() : "";
  return query
    ? items.filter(data => {
        const keys =
          fields.length > 0
            ? Object.keys(data).filter(key => fields.includes(key))
            : Object.keys(data);

        return (
          keys
            .reduce((result, key) => `${result},${data[key]}`, "")
            .toLowerCase()
            .indexOf(query) >= 0
        );
      })
    : items;
  // };
}
//本地过滤
//fields:需要过滤的key
//items:所有数据
//query:关键字
export function getFilterByEqualFn(fields, items, q) {
  let query;
  if (q === 1) {
    query = true;
  } else if (q === 2) {
    query = false;
  } else {
    query = 0;
  }
  // return (items: T[], filter: StringDictionary<any>) => {
  // const keys = Object.keys(filter);
  // if (query === 1) {
  //   return items.filter(item => item.isEnable === true);
  // } else if (query === 2) {
  //   return items.filter(item => item.isEnable === false);
  // } else {
  //   return items;
  // }
  // query = typeof query === "boolean" ? query : true;
  return query !== 0
    ? items.filter(data => {
        const keys =
          fields.length > 0
            ? Object.keys(data).filter(key => fields.includes(key))
            : Object.keys(data);
        let ww = keys.reduce((result, key) => `${result},${data[key]}`, "");
        // console.log(ww);
        // console.log(query);
        return ww.indexOf(query) >= 0;
        // return (
        //   keys.reduce((result, key) => `${result},${data[key]}`, "")
        // );
      })
    : items;
}
//前端分页
export function pageData(items, paginating) {
  if (!paginating || !paginating.pageSize) {
    return items;
  }
  const pageSize = paginating.pageSize;
  const pageIndex = paginating.pageIndex || 0;
  return items.slice().splice((pageIndex - 1) * pageSize, pageSize);
}
