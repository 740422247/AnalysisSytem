<!--
 * @Descripttion: 折线图
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-29 10:24:32
 * @LastEditors: joykit
 * @LastEditTime: 2020-07-01 15:10:25
-->
<!-- jkLineChart -->
<template>
  <jkCard
    :border="oConfig.border"
    :grid="oConfig.grid"
    :text="oConfig.text"
    :path="oConfig.path"
  >
    <div id="lb" class="l-b animated fadeInLeft" ref="lb"></div>
  </jkCard>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import jkCard from "@components/base/jkCard/jkCard";
import "echarts/lib/component/tooltip";
import { theme } from "@assets/theme";
export default {
  name: "jkLineChart",
  inject: ["echarts", "pTheme"],
  props: {
    type: {
      type: String,
      default: "lineChart"
    },
    config: {
      type: Object,
      default: () => ({
        border: true,
        grid: true,
        text: "",
        path: "",
        choice: null,
        data: null
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
  async created() {
    this.getData();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    async getData() {
      // 组件默认数据
      // echart全部配置
      // if (this.oConfig.option) {
      //   this.init(this.oConfig.choice);
      //   return;
      // }
      if (!this.oConfig.data) {
        const data = await import(`@entity/jkGraph/${this.type}.js`);
        this.oConfig.data = data.qxList;
      }
      const option = await import(`./option/${this.type}.js`);
      this.getOption(option.op);
    },
    async getOption(op) {
      this.ec && this.ec.clear();
      const res = await theme(this.pTheme.name);
      const _op = (this._op = op(this.oConfig.data, this.echarts, res));
      this.init(_op);
    },
    init(_op) {
      this.$nextTick(() => {
        const lb = this.$refs.lb;
        this.ec = this.echarts.init(lb);
        this.ec.setOption(_op);
        this.ec.resize();
      });
    },
    refresh() {
      if (!this.ec) return;
      this.ec.clear();
      this.ec.setOption(this._op, true);
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    pTheme: {
      deep: true,
      handler(v) {
        this.getOption();
      }
    },
    config: {
      deep: true,
      immediate: true,
      handler(res) {
        this.oConfig = res;
        this.getData();
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
  components: { jkCard }
};
</script>
<style lang="scss" scoped>
//@import 'jkLineChart.scss'; //引入公共css类
.l-b {
  width: 100%;
  height: 100%;
}
</style>
