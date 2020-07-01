<!--
 * @Descripttion: 卡片
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-06-04 10:52:43
 * @LastEditors: joykit
 * @LastEditTime: 2020-06-04 15:09:40
-->
<!-- jkCard -->
<template>
  <jkBox class="card" :border="config.border" :grid="config.grid">
    <router-link
      class="card-wrap"
      :to="{ path: config.data.path[0] }"
      tag="div"
    >
      <div class="img">
        <img :src="config.data.src[0]" alt="" />
      </div>
      <h4>{{ config.data.label[0] }}</h4>
      <h3>{{ config.data.value[0] }}</h3>
    </router-link>
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
    config: {
      type: Object,
      default: () => ({
        border: true,
        grid: true,
        path: "",
        data: null
      })
    }
  },
  data() {
    //这里存放数据
    return {};
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    !this.config.data && (this.config.data = _data);
  },
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
  components: { jkBox }
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
    font-size: 30px;
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
