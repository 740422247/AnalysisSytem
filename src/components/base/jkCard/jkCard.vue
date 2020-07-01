<!--
 * @Descripttion: 卡片
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-21 15:41:46
 * @LastEditors: joykit
 * @LastEditTime: 2020-05-25 16:17:24
-->
<!-- jkBox2 -->
<template>
  <jkBox class="jkCard" :border="border" :grid="grid">
    <jkFlex class="title" :flex="text ? 'row-space-between' : 'row-flex-end'">
      <jkTitle type="large" :text="text" />
      <jkRouteBtn :path="path" />
    </jkFlex>
    <jkContent class="content">
      <slot></slot>
    </jkContent>
  </jkBox>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import jkBox from "../jkBox/jkBox.vue";
import jkContent from "../jkContent";
import jkFlex from "../jkFlex";
import jkTitle from "../jkTitle/jkTitle.vue";
import jkRouteBtn from "../jkRouteBtn/jkRouteBtn.vue";
export default {
  name: "jkCard",
  props: {
    border: {
      type: Boolean,
      default: true
    },
    grid: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: ""
    },
    path: {
      type: String,
      default: ""
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
  methods: {},
  //监听属性 类似于data概念
  computed: {},
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
  components: { jkBox, jkFlex, jkTitle, jkRouteBtn, jkContent }
};
</script>
<style lang="scss" scoped>
@import "jkCard.scss"; //引入公共css类
.title {
  margin-bottom: 10px;
}
.content {
  height: calc(100% - 24px);
  overflow: hidden;
}
</style>
