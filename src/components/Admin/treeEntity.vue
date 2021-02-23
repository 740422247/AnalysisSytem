<!--  -->
<template>
  <div class="tree-entity">
    <div class="fa">
      <div class="search" v-if="filterEntity">
        <el-input
          v-model.trim="filterModel[filterEntity.key]"
          :placeholder="
            filterEntity.placeholder
              ? filterEntity.placeholder
              : '请输入过滤条件'
          "
        ></el-input>
      </div>
      <div
        class="opertions"
        v-if="defaultProps.showCheckbox === false ? false : true"
      >
        <Button
          type="primary"
          :disabled="UpdataTree.disabled"
          icon="el-icon-check"
          circle
          @click="submitChoice()"
        ></Button>
        <Button
          type="primary"
          :disabled="UpdataTree.disabled"
          icon="el-icon-close"
          circle
          @click="clearChoice()"
        ></Button>
      </div>
    </div>

    <div class="tree-title">
      <span>{{ title }}</span>
      <span v-if="defaultProps.showCheckbox === false ? false : true"
        >授权</span
      >
    </div>
    <Ohyeah
      :height="defaultProps.height ? defaultProps.height : '650px'"
      class="xzys"
      thumbColor="#018AE1"
      :autoHide="true"
      trackColor="#fff"
    >
      <Tree
        :data="tree"
        :expand-on-click-node="false"
        :show-checkbox="defaultProps.showCheckbox === false ? false : true"
        :props="defaultProps"
        :node-key="defaultProps.nodeKey"
        highlight-current
        accordion
        ref="tree"
        :filter-node-method="filterNode"
        @check="check"
        @node-click="getNodeClick"
        @check-change="getCheckedNodes()"
        class="chang-style right-padding"
      >
      </Tree>
    </Ohyeah>
  </div>
</template>

<script>
import { Tree, Button } from "element-ui";
import { Ohyeah } from "vue-ohyeah-scroll";
import "element-ui/lib/theme-chalk/index.css";
import cqMapVue from "../customization/maps/cqMap/cqMap.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Tree,
    Button,
    Ohyeah
  },
  props: {
    title: String,
    tree: Array,
    UpdataTree: Object,
    defaultProps: Object,
    // listData: Object,
    checkedData: Array,
    choiceData: Array, //单选
    filterText: Object,
    filterEntity: Object
  },
  data() {
    //这里存放数据
    return {
      key: null,
      Text: "",
      filterModel: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    filterText: {
      deep: true,
      handler(val) {
        this.key = Object.keys(val)[0];
        console.log(this.key);
        this.$refs.tree.filter(val[this.key]);
      }
    },
    filterModel: {
      deep: true,
      handler(val) {
        this.key = this.filterEntity.key;
        this.$refs.tree.filter(val[this.key]);
      }
    },
    choiceData(d) {
      // this.$refs.tree.setCheckedNodes([]);
      this.$refs.tree.setCheckedNodes(d);
    },
    checkedData() {
      if (this.defaultProps.parentId) {
        const arr = this.checkedData.filter(
          item =>
            !this.checkedData.some(
              d =>
                d[this.defaultProps.parentId] ===
                item[this.defaultProps.nodeKey]
            )
        );
        this.$refs.tree.setCheckedNodes(arr);
      } else {
        this.$refs.tree.setCheckedNodes(this.checkedData);
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.init();
    // this.$nextTick(() => {
    //   console.log(this.tree);
    //   console.log(this.listData);
    //   console.log(this.checkedData);
    // });
  },
  //方法集合
  methods: {
    filterNode(value, data) {
      // console.log(data);
      if (!value) return true;
      return data[this.key].indexOf(value) !== -1;
    },
    insertBefore(dd, resourceParentId) {
      if (resourceParentId === "root") {
        this.tree.unshift(dd);
      } else {
        this.$refs.tree.append(dd, resourceParentId);
      }
    },
    remove(id) {
      this.$refs.tree.remove(id);
    },
    init() {
      this.$refs.tree.setCheckedNodes(this.checkedData ? this.checkedData : []);
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([]);
    },
    getCurrentNode(dd) {
      console.log(dd);
    },
    // 节点选中
    getCheckedNodes() {
      const res = this.$refs.tree.getCheckedNodes(false, true);
      // console.log(res);
      this.$emit("checkedNodes", res);
    },
    // 节点点击
    getNodeClick(data) {
      this.$emit("getNodeClick", data);
    },
    check(i, j) {
      this.$emit("check", i, j);
      console.log(this.defaultProps);
      if (this.defaultProps.forbidden) {
        this.UpdataTree.disabled = true;
      } else {
        console.log('1212');
        this.UpdataTree.disabled = false;
      }
    },
    submitChoice() {
      this.UpdataTree.disabled = true;
      this.$emit("saveResource");
    },
    clearChoice() {
      this.$confirm("是否取消修改, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        offset: "500"
      })
        .then(() => {
          this.init();
        })
        .catch(() => {});
    }
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
<style scope lang="scss">
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
  float: right;
}
.fa {
  overflow: hidden;
}
.search {
  display: inline-block;
  float: left;
  // width: 100%;
  overflow: hidden;
  margin-bottom: 10px;
  > div {
    width: 200px;
    float: left;
    text-align: left;
  }
}
.right-padding {
  margin-right: 10px;
}
// .tree-entity{
//   height: 800px;
// }
// .el-scrollbar{
//   overflow-x: hidden !important;
// }
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  border-color: #2471c9;
}
</style>
