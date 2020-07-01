<!--
 * @Descripttion: 进度条
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-14 16:15:20
 * @LastEditors: joykit
 * @LastEditTime: 2020-06-02 15:12:41
 -->
<!-- Progress -->
<template>
  <div
    class="jkProgress round-rect-progress-bg"
    :class="{
      'progeress-battery': type === 'battery'
    }"
  >
    <template v-for="(item, key) in typeProgress">
      <div
        :key="key"
        v-if="type === item.id"
        :style="{
          width
        }"
        class="progress progress1"
        :class="item.id"
      ></div>
    </template>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { typeProgress } from "@config/_type.js";
export default {
  name: "jkProgress",
  props: {
    type: {
      type: [String, Number],
      // huang | lan | battery
      default: typeProgress[0].id
    },
    width: {
      type: [String, Number],
      default: "100%"
    }
  },
  data() {
    //这里存放数据
    return {
      typeProgress: typeProgress
    };
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
    _background() {
      return this.background;
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
//@import 'Progress.scss'; //引入公共css类
.jkProgress {
  height: 12px;
  border-radius: 6px;
  overflow: hidden;
  width: 100%;

  .progress1 {
    height: 12px;
    border-radius: 5px;
  }
  .huang {
    @include t(background, k13);
  }
  .lan {
    @include t(background, k14);
  }
  .battery {
    @include t(background-image, battery);
    border-radius: 0;
    background-size: cover;
  }
}
.jkProgress.progeress-battery {
  border-radius: 0;
}
</style>
