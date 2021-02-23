<!--
 * @Descripttion: 折线图
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-29 10:24:32
 * @LastEditors: wss
 * @LastEditTime: 2020-12-17 09:36:20
-->
<!-- jkLineChart -->
<template>
  <!-- <div :slot="oConfig"> -->
  <jkCard
    class="jkCard"
    :border="oConfig.border"
    :grid="oConfig.grid"
    :text="oConfig.text"
    :path="oConfig.path"
    :selectData="oConfig && oConfig.selectData"
  >
    <div class="l-b animated fadeInLeft" ref="lb"></div>
  </jkCard>
  <!-- <div class="btn">
      <Button type="primary" icon="el-icon-check" @click="refresh()"
        >更新配置项</Button
      >
    </div>
  </div>-->
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import jkCard from "@components/base/jkCard/jkCard";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";
// import "echarts/lib/component/scroll";
import { theme } from "@assets/theme";
export default {
  name: "jkChart",
  inject: ["echarts", "pTheme"],
  props: {
    // 2020/07/21修改
    isRefresh: {
      type: Boolean,
    },
    // 2020/07/21修改
    type: {
      type: String,
      default: "lineChart",
    },
    config: {
      type: Object,
      default: () => ({
        border: true,
        grid: true,
        text: "",
        path: null,
        choice: null,
        data: null,
      }),
    },
  },
  data() {
    //这里存放数据
    return {
      oConfig: null,
      options: {},
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    // console.log(this.echarts);
    // this.getData();
    // this.$nextTick(() => {
    //   const lb = this.$refs.lb;
    //   this.ec = this.echarts.init(lb);
    // });
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // const lb = this.$refs.lb;
    // this.ec = this.echarts.init(lb);
    let _this = this;
    window.addEventListener("resize", function () {
      if (_this.resizeTimer) clearTimeout(_this.resizeTimer);
      _this.resizeTimer = setTimeout(function () {
        //  _this.ec.resize();
        _this.getData();
      }, 100);
    });
  },
  //方法集合
  methods: {
    async getData() {
      // 组件默认数据
      // echart全部配置
      // if (this.oConfig.option) {
      //   this.init(this.oConfig.choice);
      //   return;
      // }

      if (!this.oConfig.data || this.isRefresh) {
        // if (!this.oConfig.data) {// 2020/07/21修改
        const data = await import(`@entity/jkGraph/${this.type}.js`);
        this.oConfig.data = data.qxList;
      }

      const option = await import(`./option/${this.type}.js`);
      this.getOption(option.op);
    },
    async getOption(op) {
      // console.log(this.oConfig);
      const lb = this.$refs.lb;
      const wh = [lb.offsetWidth, lb.offsetHeight];
      // console.log(wh);
      const l = (wh[0] > wh[1] ? wh[1] : wh[0]) * 0.5; //短边宽度
      this.ec && this.ec.clear();
      const res = await theme(this.pTheme.name);
      const _op = (this._op = op(
        {
          ...this.oConfig.data,
          argument: this.oConfig.argument,
          pageForms: this.oConfig.pageForms,
        },
        this.echarts,
        res,
        l,
        wh
      ));
      this.init(_op);

      if (this.oConfig.options) {
        this.options = this.oConfig.options;
      } else {
        this.options = this.oConfig.data.options;
      }

      // console.log("_op:", _op);
      // if (JSON.stringify(options) !== "{}") {
      //   console.log("options:", this.options);
      //   // console.log({ ..._op, ...this.options });
      // }
    },
    init(_op) {
      const _this = this;
      this.$nextTick(() => {
        const lb = this.$refs.lb;
        this.ec = this.echarts.init(lb);
        // console.log(this.ec);
        // console.log(_op);
        this.ec.setOption(_op);
        if (JSON.stringify(this.options) !== "{}" && this.options) {
          this.ec.setOption(this.options);
        }
        this.ec.resize();
        this.ec.on("legendselectchanged", function (params) {
          // 控制台打印数据的名称
          console.log(params);
          // _this.getData();
        });
      });
    },
    refresh() {
      if (!this.ec) return;
      this.ec.clear();
      this.ec.setOption(this._op, true);
    },
    refreshOption(opt) {
      this.ec.clear();
      this.ec.setOption(this.opt, true);
    },
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    pTheme: {
      deep: true,
      handler(v) {
        // this.getOption();
      },
    },
    config: {
      deep: true,
      immediate: true,
      handler(res) {
        this.oConfig = res;
        // console.log('res:',this.oConfig.data);
        // console.log('!!!!!!res:',!this.oConfig.data);
        this.getData();
      },
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  beforeRouteEnter(to, from, next) {
    next((vm) => {});
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  //import引入的组件需要注入到对象中才能使用
  components: { jkCard },
};
</script>
<style lang="scss" scoped>
//@import 'jkLineChart.scss'; //引入公共css类
.jkCard {
  // width: 400px;
  // height: 300px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.l-b {
  width: 100%;
  height: 100%;
}
</style>
