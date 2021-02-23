<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-12-16 09:29:27
 * @LastEditors: wss
 * @LastEditTime: 2020-12-17 09:26:30
-->
<!--  -->
<template>
  <div
    class="ratioChartList"
    :style="config.style ? config.style : ' height: 300px;'"
  >
    <!-- v-if="oConfig" -->
    <jkCard
      v-if="config.data"
      class="jkCard"
      :border="config.border"
      :grid="config.grid"
      :text="config.text"
      :path="config.path"
      :selectData="config && config.selectData"
      style="padding:0"
    >
      <jkChart
        class="jkEchart"
        :config="oConfig1"
        :type="'ratioChart'"
        :isRefresh="isRefresh"
      ></jkChart>
      <jkChart
        class="jkEchart"
        :config="oConfig2"
        :type="'ratioChart'"
        :isRefresh="isRefresh"
      ></jkChart>
    </jkCard>
  </div>
</template>

<script>
import jkCard from "@components/base/jkCard/jkCard";
import jkChart from "@components/chart/jkGraph/jkChart.vue";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";
export default {
  name: "ratioChartList2",
  inject: ["echarts", "theme"],
  components: { jkChart, jkCard },
  props: {
    // 2020/07/21修改
    // isRefresh: {
    //   type: Boolean,
    //   default: false
    // },
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
      isRefresh: true,
      oConfig1: {
        border: false,
        grid: false,
        text: null,
        path: null,
        data: null
      },
      oConfig2: {
        border: false,
        grid: false,
        text: null,
        path: null,
        data: null
      },
      options: {}
    };
  },
  computed: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  mounted() {
    // const _this = this;
    // window.addEventListener("resize", function() {
    //   if (_this.resizeTimer) clearTimeout(_this.resizeTimer);
    //   _this.resizeTimer = setTimeout(function() {
    //     //  _this.ec.resize();
    //     _this.getData();
    //   }, 100);
    // });
  },
  methods: {
    initData() {
      // console.log(this.config.data.value);
      if (this.config.data) {
        this.oConfig1.data = this.config.data.value[0];
        this.oConfig2.data = this.config.data.value[1];
        this.isRefresh = false;
        // console.log(this.oConfig1);
        // console.log(this.oConfig2);
      }
    }
  },
  //监控data中的数据变化
  watch: {
    config: {
      deep: true,
      immediate: true,
      handler(res) {
        // console.log("res:", res);
        // this.oConfig = res;
        this.initData();
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
  min-height: 300px;
  height: 100%;
  .jkEchart {
    height: 100%;
    display: inline-block;
    width: 50%;
  }
}
//@import url(); 引入公共css类
</style>
