<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-15 14:26:42
 * @LastEditors: joykit
 * @LastEditTime: 2020-05-25 14:20:39
-->
<!-- H1 -->
<template>
  <h2 v-if="_text" class="jkLarge">
    {{ _text }}
    <small v-if="subText">
      {{ subText }}
    </small>
  </h2>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "jkLarge",
  props: {
    text: {
      type: [String, Number],
      default: ""
    },
    subText: {
      type: [String, Number],
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
  computed: {
    _text() {
      return this.text;
    },
    _subText() {
      return this.subText;
    }
  },
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
.jkLarge {
  font-size: 18px;
  font-weight: 400;
  @include t(color, k1);
  small {
    font-size: 14px;
    @include t(color, k7);
  }
}
</style>
