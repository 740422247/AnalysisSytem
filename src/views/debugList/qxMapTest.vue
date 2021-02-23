<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-12-03 11:42:25
 * @LastEditors: wss
 * @LastEditTime: 2020-12-17 09:31:10
-->
<template>
  <div>
    <div class="21">
      <ratioChartList2 :config="ration2"></ratioChartList2>
      <!-- <ratioChartList></ratioChartList> -->
    </div>
    <div class="gyTest">
      <div class="list">
        <countys class="asdasds"></countys>
      </div>
    </div>
  </div>
</template>

<script>
import countys from "@components/customization/maps/cqMap/countys/";
import ratioChartList from "@components/customization/ratioChartList/ratioChartList.vue";
import ratioChartList2 from "@components/customization/ratioChartList/ratioChartList2.vue";
export default {
  name: "qxMapTest",
  components: { countys, ratioChartList, ratioChartList2 },
  data() {
    //这里存放数据
    return {
      cqCountyData: [],
      ration2: {
        border: true,
        grid: true,
        text: "男女比例图",
        path: null,
        data: [
          {
            name: "男女年龄段分析2",
            value: {
              percent: 24.19,
              sex: 0,
              txt: "男：8513/人次"
            },
            path: []
          },
          {
            name: "男女年龄段分析2",
            value: {
              percent: 74.19,
              sex: 1,
              txt: "女：1365393/人次"
            },
            path: []
          }
        ]
      }
    };
  },
  computed: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  mounted() {},
  methods: {},
  //监控data中的数据变化
  watch: {},
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
.gyTest {
  // height: 100vh;
  min-height: 500px;
  width: 95%;
  background-color: rgb(17, 14, 79);
  border: 10px solid;
  border-color: red;
}
.list {
  width: 100%;
  height: auto;
}

//@import url(); 引入公共css类
</style>
