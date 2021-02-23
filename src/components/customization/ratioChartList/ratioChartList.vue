<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-12-16 09:29:27
 * @LastEditors: wss
 * @LastEditTime: 2020-12-16 15:02:25
-->
<!--  -->
<template>
  <div class="ratioChartList">
    <!-- v-if="oConfig" -->
    <jkCard
      class="jkCard"
      :border="oConfig.border"
      :grid="oConfig.grid"
      :text="oConfig.text"
      :path="oConfig.path"
      :selectData="oConfig && oConfig.selectData"
    >
      <div class="ecr" ref="lb"></div>
      <div class="ecr" ref="nb"></div>
    </jkCard>
  </div>
</template>

<script>
import jkCard from "@components/base/jkCard/jkCard";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";
export default {
  name: "ratioChartList",
  inject: ["echarts", "theme"],
  components: { jkCard },
  props: {
    // 2020/07/21修改
    isRefresh: {
      type: Boolean
    },
    // 2020/07/21修改
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
        path: null,
        choice: null,
        data: null
      })
    }
  },
  data() {
    //这里存放数据
    return {
      oConfig: {
        border: true,
        grid: true,
        text: "",
        path: null
      },
      options: {}
    };
  },
  computed: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.echarts);
  },
  mounted() {
    const _this = this;
    window.addEventListener("resize", function() {
      if (_this.resizeTimer) clearTimeout(_this.resizeTimer);
      _this.resizeTimer = setTimeout(function() {
        //  _this.ec.resize();
        _this.getData();
      }, 100);
    });
  },
  methods: {
    async getData() {
      console.log(this.oConfig);
      if (!this.oConfig.data || this.isRefresh) {
        // if (!this.oConfig.data) {// 2020/07/21修改

        const data = await import(`@entity/jkGraph/ratioChart.js`);
        this.oConfig.data = data.qxListArr;
      }
      console.log(this.oConfig.data)
      const option = await import(
        `@components/chart/jkGraph/option/ratioChart.js`
      );
      this.getOption(option.op);
    },
    async getOption(op) {
      // console.log(this.oConfig);
      const lb = this.$refs.lb;
      const wh = [lb.offsetWidth, lb.offsetHeight];
      // console.log(wh);
      const l = (wh[0] > wh[1] ? wh[1] : wh[0]) * 0.5; //短边宽度
      this.ec && this.ec.clear();
      this.ec2 && this.ec2.clear();
      // const res = await theme(this.pTheme.name);
      const res = null;
      const _op = (this._op = op(
        {
          ...this.oConfig.data[0],
          argument: this.oConfig.argument,
          pageForms: this.oConfig.pageForms
        },
        this.echarts,
        res,
        l,
        wh
      ));
      const _op2 = (this._op2 = op(
        {
          ...this.oConfig.data[1],
          argument: this.oConfig.argument,
          pageForms: this.oConfig.pageForms
        },
        this.echarts,
        res,
        l,
        wh
      ));
      this.init(_op);
      this.init(_op2);

      if (this.oConfig.options) {
        this.options = this.oConfig.options;
      } else {
        this.options = this.oConfig.data.options;
      }
    },
    init(_op) {
      const _this = this;
      this.$nextTick(() => {
        const lb = this.$refs.lb;
        const nb = this.$refs.nb;
        this.ec = this.echarts.init(lb);
        this.ec.setOption(_op);
        this.ec2 = this.echarts.init(nb);
        this.ec2.setOption(_op);
        if (JSON.stringify(this.options) !== "{}" && this.options) {
          this.ec.setOption(this.options);
          this.ec2.setOption(this.options);
        }
        this.ec.resize();
        this.ec2.resize();
      });
    }
  },
  //监控data中的数据变化
  watch: {
    pTheme: {
      deep: true,
      handler(v) {
        // this.getOption();
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
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
.ratioChartList {
  background-color: #110e4f;
  height: 300px;
  .ecr {
    height: 100%;
    display: inline-block;
    width: 50%;
  }
}
//@import url(); 引入公共css类
</style>
