<!--
 * @Descripttion: 卡片
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-06-04 10:52:43
 * @LastEditors: wss
 * @LastEditTime: 2020-12-21 14:21:30
-->
<!-- jkCard -->
<template>
  <jkBox class="card" :border="config.border" :grid="config.grid">
    <div class="card-wrap" @click="goRouter" tag="div">
      <div class="img">
        <img :src="config.data.src[0]" alt :style="config.imgStyle" />
      </div>
      <h4>{{ config.data.label[0] }}</h4>
      <!-- <h3>{{ Math.round(config.data.value[0], 0) }}</h3> -->
      <h3>{{ config.data.value[0] }}</h3>
    </div>
  </jkBox>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import jkBox from "@components/base/jkBox/jkBox.vue";
import { _data } from "@entity/card.js";
export default {
  name: "colum",
  props: {
    isRefresh: Boolean,
    config: {
      type: Object,
      default: () => ({
        border: true,
        grid: true,
        path: "",
        data: null,
      }),
    },
  },
  data() {
    //这里存放数据
    return {};
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log(this.config);
    (!this.config.data || this.isRefresh) && (this.config.data = _data);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {});
  },
  //方法集合
  methods: {
    goRouter() {
      // console.log(this.config);
      let enters = { enters: "rs" };
      switch (this.config.index) {
        case 0:
          enters.enters = "xm";
          break;
        case 1:
          enters.enters = "je";
          break;
        case 2:
          enters.enters = "rs";
          break;
        case 3:
          enters.enters = "rc";
          break;
      }
      const pars = {
        ...enters,
        IsClass: false,
        isSpecial: true,
      };
      // console.log(pars);
      // IsClass=false&isSpecial=true&enters=rc
      this.$router.push({
        name: "pageDetail",
        query: {
          id: this.$store.state.previewList.routerId.bottom,
          param: JSON.stringify(pars),
        },
      });
    },
  },
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
    next((vm) => {});
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  //import引入的组件需要注入到对象中才能使用
  components: { jkBox },
};
</script>
<style lang="scss" scoped>
//@import 'jkCard.scss'; //引入公共css类
.card-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  cursor: pointer;
  h4 {
    font-size: 16px;
    @include t(color, k9);
    padding-top: 6px;
  }
  h3 {
    font-size: 24px;
    @include t(color, k1);
    padding-top: 6px;
  }
}
.card {
  transition: box-shadow 0.32s ease-in-out;
}
.card:hover {
  @include t(box-shadow, k44);
}
</style>
