<template>
  <!-- <div class="drag-content"> -->
  <draggable
    class="component-container"
    :list="els"
    :group="{ name: 'people' }"
    handle=".handle"
    @start="start"
    @change="change"
  >
    <div
      class="container-item"
      v-for="(el, index) in els"
      :key="el + index"
      :class="el.className"
      :style='el.style'
    >
      <div class="drag-header">
        <i
          class="el-icon-rank handle"
          style="font-size: 25px"
          title="移动容器组件"
          v-if="el.type === 'container'"
        ></i>
        <i
          class="el-icon-delete"
          title="删除"
          style="font-size: 25px"
          @click="del(el, index)"
        ></i>
        <i
          class="el-icon-setting"
          title="设置"
          style="font-size: 25px"
          @click.stop="setting(el, index)"
        ></i>
      </div>

      <template v-if="el.type !== 'container'">
        <component
          :style="el.style"
          :is="el.type.split(':')[0]"
          :type="el.type.split(':')[1]"
          :config="{ ...el }"
          @searchFrame="searchFrame"
        ></component>
      </template>

      <jk-box
        class="jkBoxFlex"
        v-if="el.type === 'container'"
        :border="el.border"
        :grid="el.grid"
      >
        <drag-content
          @containerSet="setted"
          @startMove="start"
          @onChange="change"
          @containerDelete="componentDelete"
          :els="el.els"
          :pid="index"
          class="component-item"
        ></drag-content>
      </jk-box>
    </div>
  </draggable>
  <!-- </div> -->
</template>
<script>
import jkBox from "../../components/base/jkBox/jkBox.vue";

import { components } from "@config/config.js";

import Draggable from "vuedraggable";
import { Icon } from "element-ui";
import "./../../assets/css/jk.css";
// import ComponentBase from "./ComponentBase"
export default {
  name: "DragContent",
  components: {
    Draggable,
    Icon,
    jkBox,
    ...components,
    // ComponentBase
  },
  computed: {
    // getStyle: function(el) {
    //   return {
    //     ...el.style,
    //     paddingRight:el.style.marginRight ? el.style.marginRight + 'px' : '',
    //     paddingBottom:el.style.marginBottom + 'px',
    //     height: el.style.ratio
    //       ? (el.className
    //           .find(item => item.indexOf('jk-col-') >= 0)
    //           .replace('jk-col-', '') /
    //           24) *
    //           el.style.ratio *
    //           parentWidth +
    //         'px'
    //       : ''
    //   };
    // }
  },
  props: {
    parentWidth: { type: Number },
    els: {
      type: Array,
    },
    pid: { type: Number, default: 0 },
  },
  data: () => ({}),
  mounted() {
    this.initContainer();
  },
  methods: {
    initContainer() {
      const trueWidth = window.innerWidth - 530;
      const trueScale = Math.floor((trueWidth / window.innerWidth) * 100) / 100;
      const dom = document.querySelector(".drag-content");
      dom.style.height = window.innerHeight + "px";
      dom.style.flexBasis = window.innerWidth + "px";
      dom.style.transform = `scale(${trueScale}) translate(-${
        (window.innerWidth * (1 - trueScale)) / 2 + 90
      }px, -${(window.innerHeight * (1 - trueScale)) / 2}px)`;
    },
    setting(model, index) {
      this.$emit("containerSet", model, index, this.pid);
    },
    setted(model, index, parentIndex) {
      this.$emit("componentSet", model, index, parentIndex);
    },
    del(model, index) {
      this.$emit("containerDelete", model, index, this.pid);
    },
    componentDelete(model, index, parentIndex) {
      this.$emit("componentDelete", model, index, parentIndex);
    },
    start() {
      this.$emit("startMove");
    },
    change(evt) {
      this.$emit("onChange");
    },
    // 自定义搜索条件输出
    searchFrame(data) {
      const result = {};
      data.forEach((item) => {
        result[item.id] = item.putModel;
      });
      this.$emit("searchFram", result);
    },
    // componentEnd(evt) {
    //   console.log("component end:", evt);
    // },
    // end(evt) {
    //   this.$emit("onEnd", evt);
    // },
  },
};
</script>
<style lang="scss">
.drag-content {
  flex: 0 0 1390px;
  // overflow: visible !important;
  // transform: scale(.8) translate(-200px,-200px);

  // flex-basis: 1390px;
  // flex:1;
  // margin: 0 15px;
  .component-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 10px 10px 0 0;
    // overflow: hidden;
    .jkBoxFlex {
      display: flex;
      padding: 0;
      overflow: visible;
      .scroll-box {
        overflow: visible;
      }
    }
    .container-item {
      // width: calc(25% - 2px);
      position: relative;
      // border: 1px dashed #dedede;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      &.active {
        background-color: #272e76;
      }
      .drag-header {
        flex: 0 0 30px;
        text-align: right;

        // .el-icon-delete,
        // .el-icon-setting,
        // .el-icon-rank {
        //   display: none;
        // }
        // &:hover {
        //   .el-icon-delete,
        //   .el-icon-setting,
        //   .el-icon-rank {
        //     display: inline-block;
        //   }
        // }
        i {
          padding: 5px;
        }
      }
      .component-item {
        flex: 1;
        border-radius: 3px;
        border: 1px dashed #dedede;
        margin: 0;
        height: 100%;
      }
    }
  }
}
</style>
