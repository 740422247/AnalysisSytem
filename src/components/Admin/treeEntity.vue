<!--  -->
<template>
  <div class="tree-entity">
    <div class="opertions">
      <Button type="primary" icon="el-icon-check" circle @click="submitChoice()"></Button>
      <Button type="primary" icon="el-icon-close" circle @click="clearChoice()"></Button>
    </div>
    <div class="tree-title">
      <span>{{title}}</span>
      <span>授权</span>
    </div>
    <Tree
      :data="tree"
      show-checkbox
      :props="defaultProps"
      node-key="id"
      ref="tree"
      @node-click="getNodeClick"
      @check-change="getCheckedNodes()"
      class="chang-style"
    ></Tree>
  </div>
</template>

<script>
import { Tree, Button } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Tree,
    Button
  },
  props: {
    title: String,
    tree: Array,
    defaultProps: Object,
    listData: Object,
    checkedData: Array
  },
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    checkedData() {
      this.init();
    }
  },
  //方法集合
  methods: {
    init() {
      this.$refs.tree.setCheckedNodes(this.checkedData ? this.checkedData : []);
    },
    // 节点选中
    getCheckedNodes() {
      const res = this.$refs.tree.getCheckedNodes(true, false);
      console.log(res);
      this.$emit("checkedNodes", res);
    },
    // 节点点击
    getNodeClick(data) {
      // console.log(data);
    },

    submitChoice() {
      alert(123);
    },
    clearChoice() {
      alert(456);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.init();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss'>
//@import url(); 引入公共css类
.chang-style .el-tree-node__content > label.el-checkbox {
  order: 2;
}
.chang-style .el-tree-node__content {
  height: 48px;
}
.chang-style .el-tree-node__label {
  flex: 2 0 auto;
  text-align: left;
  font-size: 16px;
}
.chang-style .el-checkbox__inner {
  width: 16px;
  height: 16px;
}
.tree-title {
  display: flex;
  justify-content: space-between;
  height: 57px;
  background-color: #f7f7f7;
  margin-bottom: 10px;
  padding: 0 7px;
  span {
    padding: 20px 0;
  }
}

.opertions {
  text-align: right;
  margin-bottom: 10px;
}
</style>
