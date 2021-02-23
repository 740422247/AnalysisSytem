<!--
 * @Descripttion: 路由跳转按钮
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-12 15:02:12
 * @LastEditors: joykit
 * @LastEditTime: 2020-06-04 10:01:01
 -->
<!-- RouteBtn -->
<template>
  <router-link v-if="_path" :to="_path" class="jkRouteBtn">
    <span v-for="i in 3" :key="i"></span>
  </router-link>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "jkRouteBtn",
  props: {
    path: {
      type: Object || String,
      default: "#",
    },
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
    _path() {
      try {
        var obj = JSON.parse(this.path);
        return obj;
      } catch (e) {
        return this.path;
      }
    },
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
    next((vm) => {});
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
};
</script>
<style lang="scss" scoped>
//@import 'RouteBtn.scss'; //引入公共css类
.jkRouteBtn {
  display: inline-block;
  padding: 4px;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  span {
    @include t(background-color, white);
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    margin-right: 4px;
  }
  span:last-of-type {
    margin-right: 0;
  }
  &:hover {
    span {
      @include t(background-color, k12);
    }
  }
}
</style>
