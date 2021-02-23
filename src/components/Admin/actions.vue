<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-05-26 15:27:10
 * @LastEditors: wss
 * @LastEditTime: 2020-08-10 17:07:54
-->
<!--  -->
<template>
  <div class="operation">
    <div class="button-list" :class="align">
      <template v-for="items in action">
        <Button
          v-if="!items.hidden"
          :key="items.name"
          :type="items.type"
          :icon="items.icon"
          :disabled="items.disabled"
          :plain="items.plain"
          @click="Actions(items.name, items)"
        >{{ items.label }}</Button>
      </template>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Button } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Button
  },
  props: {
    action: Array,
    align: String
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {},
  //方法集合
  methods: {
    Actions(name, action) {
      this.$emit("actions", name, action);
    }
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.el-button {
  font-size: 14px;
  width: 138px;
  margin: 10px;
}

.button-list {
  text-align: left;
}
.left {
  text-align: left;
}
.right {
  text-align: right;
}
.center {
  text-align: center;
}
</style>
