<!--
 * @Descripttion: 卡片
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-06-04 10:52:43
 * @LastEditors: wss
 * @LastEditTime: 2020-12-03 11:02:51
-->
<!-- jkCard -->
<template>
  <div class="jk-graph">
    <component
      :isRefresh="isRefresh"
      :is="type"
      :config="config"
      @clickItem="clickItem"
      @onSelectChage="onSelectChage"
    ></component>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import colum from "@components/chart/jkCard/colum.vue";
import row from "@components/chart/jkCard/row.vue";
import columList from "@components/chart/jkCard/columList.vue";
import rowList from "@components/chart/jkCard/rowList.vue";
export default {
  name: "jkCard",
  props: {
    type: {
      type: String,
      default: "jkCard:columList", // colum row
    },
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
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {});
  },
  //方法集合
  methods: {
    clickItem(model, index) {
      console.log("index", model);
      this.$emit("clickItem", model, index);
    },
    onSelectChage(model) {
      this.$emit("onSelectChage", model, this.config);
    },
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    config: {
      deep: true,
      immediate: true,
      handler(res) {
        // console.log('res:watch:', res)
      },
    },
  },
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
  components: { colum, row, columList, rowList },
};
</script>
