<!--
 * @Descripttion: 图表
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-29 10:14:21
 * @LastEditors: joykit
 * @LastEditTime: 2020-07-01 15:12:53
-->
<!-- index -->
<template>
  <div class="jk-graph">
    <jkChart :type="type" :config="oConfig" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import jkChart from "./jkChart";
import { typeGraph } from "@config/_type.js";
export default {
  name: "jkGraph",
  props: {
    type: {
      type: String,
      default: typeGraph[0].id
    },
    config: {
      type: Object,
      default: () => ({
        border: true,
        grid: true,
        text: "",
        path: "",
        data: null,
        max: 0
      })
    }
  },
  data() {
    //这里存放数据
    return {
      oConfig: null
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {});
  },
  //方法集合
  methods: {},
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    config: {
      deep: true,
      immediate: true,
      handler(res) {
        this.oConfig = res;
      }
    }
  },
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
  components: {
    jkChart
  }
};
</script>
<style lang="scss" scoped>
//@import 'index.scss'; //引入公共css类
.jk-graph {
  width: 100%;
  height: 100%;
}
</style>
