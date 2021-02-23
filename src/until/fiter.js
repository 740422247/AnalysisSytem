/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-08-10 17:37:31
 * @LastEditors: wss
 * @LastEditTime: 2020-08-10 17:37:41
 */

//本地过滤
function getFilterByQueryStringFn<T>(fields: string[]) {
  return (items: T[], query: string) => {
    query = typeof query === 'string' ? query.trim().toLowerCase() : '';

    return query
      ? items.filter(data => {
          const keys =
            fields.length > 0
              ? Object.keys(data).filter(key => fields.includes(key))
              : Object.keys(data);

          return (
            keys
              .reduce((result, key) => `${result},${data[key as keyof T]}`, '')
              .toLowerCase()
              .indexOf(query) >= 0
          );
        })
      : items;
  };
}
