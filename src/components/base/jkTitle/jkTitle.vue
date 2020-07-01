<!--
 * @Descripttion: title
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-15 14:42:49
 * @LastEditors: joykit
 * @LastEditTime: 2020-05-18 15:25:54
-->
<!-- Title -->
<template>
  <component :is="_type" :text="_text" :subText="subText"></component>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import normal from "./jkNormal.vue";
import large from "./jkLarge.vue";

export default {
  name: "jkTitle",
  props: {
    type: {
      type: String,
      default: "normal"
    },
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
    _type() {
      return this.type;
    },
    _text() {
      return this.text;
    },
    _color() {
      return this.color;
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
  components: {
    large,
    normal
  }
};
</script>
<style lang="scss" scoped>
//@import 'Title.scss'; //引入公共css类
</style>
