<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-18 16:52:31
 * @LastEditors: joykit
 * @LastEditTime: 2020-05-26 14:14:32
-->
<!-- jkNumber -->
<template>
  <span v-if="number" class="jkNumber">
    {{ _str }}
  </span>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "jkNumber",
  props: {
    // 数字
    number: {
      type: [Number, String],
      default: 0
    },
    // 千分位符号
    thousands: {
      type: String,
      default: ","
    },
    // 小数点位数
    decimals: {
      type: Number,
      default: 2
    },
    // 小数点符号
    decPoint: {
      type: String,
      default: "."
    }
  },
  data() {
    //这里存放数据
    return {};
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {});
  },
  //方法集合
  methods: {
    _format(number, thousandsSep, decimals, decPoint, roundtag) {
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
            Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(
              prec * 2
            )
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
    }
  },
  //监听属性 类似于data概念
  computed: {
    _str() {
      if (typeof this.number === "string") {
        return this.number;
      }
      return this._format(
        this.number,
        this.thousands,
        this.decimals,
        this.decPoint
      );
    },
    _len() {
      return this._str.length;
    }
  },
  //监控data中的数据变化
  watch: {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  beforeRouteEnter(to, from, next) {
    next(vm => {});
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  //import引入的组件需要注入到对象中才能使用
  components: {}
};
</script>
<style lang="scss" scoped>
//@import 'jkNumber.scss'; //引入公共css类
</style>
