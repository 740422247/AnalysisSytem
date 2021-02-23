<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-11-16 09:35:57
 * @LastEditors: wss
 * @LastEditTime: 2020-11-18 16:05:17
-->
<!--  -->
<template>
  <div class="gyTest">
    <div style="width:400px;height:150px">
      <wssFiche></wssFiche>
    </div>
    <div style="width:100vw;height:800px">
      <!-- <searchAll></searchAll> -->
      <timeLine></timeLine>
    </div>
  </div>
</template>

<script>
import searchAll from "@components/customization/searchAll/searchAll.vue";
import timeLine from "@components/base/timeLine/timeLine.vue";
import wssFiche from "@components/chart/wssFiche/wssFiche.vue";
export default {
  name: "gyTest",
  components: { searchAll, timeLine, wssFiche },
  data() {
    //这里存放数据
    return {};
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
  height: 100vh;
  width: 100vw;
  background-color: rgb(17, 14, 79);
}
//@import url(); 引入公共css类
</style>
