<!--
 * @Descripttion: 布局方式
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-25 11:12:37
 * @LastEditors: joykit
 * @LastEditTime: 2020-05-25 14:53:23
-->
<!-- index -->
<template>
  <div
    class="flex"
    :class="{
      row: flex === 'row',
      column: flex === 'column',
      'space-between': flex.includes('space-between'),
      'space-around': flex.includes('space-around'),
      'flex-end': flex.includes('flex-end'),
      'flex-start': flex.includes('flex-start')
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "flex",
  props: {
    flex: {
      type: String,
      default: "row"
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
  components: {}
};
</script>
<style lang="scss" scoped>
.flex {
  &.row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &.column {
    display: flex;
    flex-direction: column;
  }
  &.space-between {
    @extend .row;
    justify-content: space-between;
  }
  &.space-around {
    @extend .row;
    justify-content: space-around;
  }
  &.flex-end {
    @extend .row;
    justify-content: flex-end;
  }
  &.flex-start {
    @extend .row;
    justify-content: flex-start;
  }
}
</style>
