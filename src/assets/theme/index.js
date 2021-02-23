/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-06-01 10:23:27
 * @LastEditors: wss
 * @LastEditTime: 2020-09-21 16:06:43
 */

export function theme(theme = "theme1") {
  const aa = import(`./variable/${theme}.scss`);
  return aa;
}
