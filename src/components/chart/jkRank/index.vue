<!--
 * @Descripttion: 排行榜
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-25 10:50:04
 * @LastEditors: joykit
 * @LastEditTime: 2020-07-01 15:14:33
-->
<!-- index -->
<template>
  <div class="rank-view">
    <jkSingle v-if="type === 'singleRank'" :config="config" />
    <jkMultiple v-if="type === 'multipleRank'" :config="config" />
    <jkBattery v-if="type === 'batteryRank'" :config="config" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import jkSingle from "./jkSingle";
import jkMultiple from "./jkMultiple";
import jkBattery from "./jkBattery";

export default {
  name: "index",
  props: {
    type: {
      type: String,
      default: "singleRank"
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
    return {};
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {
      //  console.log("---mounted--");
    });
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
      handler(res) {}
    }
    // type(){
    //   console.log('---type---')
    // }
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
    jkSingle,
    jkMultiple,
    jkBattery
  }
};
</script>
<style lang="scss" scoped>
.rank-view {
  width: 100%;
  height: 100%;
}
</style>
