/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-26 10:57:22
 * @LastEditors: joykit
 * @LastEditTime: 2020-05-26 11:16:52
 */
export const formatNumber = function(
  number,
  thousandsSep = ",",
  decimals = 2,
  decPoint = ".",
  roundtag
) {
  /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * dec_point：小数点符号
   * thousands_sep：千分位符号
   * roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
   * */
  number = (number + "").replace(/[^0-9+-Ee.]/g, "");
  roundtag = roundtag || "ceil"; //"ceil","floor","round"
  const n = !isFinite(+number) ? 0 : +number;
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  const sep = typeof thousandsSep === "undefined" ? "," : thousandsSep;
  const dec = typeof decPoint === "undefined" ? "." : decPoint;
  let s = "";
  const toFixedFix = function(n, prec) {
    var k = Math.pow(10, prec);

    return (
      "" +
      parseFloat(
        Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)
      ) /
        k
    );
  };
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
};
