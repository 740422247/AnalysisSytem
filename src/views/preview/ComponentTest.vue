<template>
  <!-- <div class="drag-content"> -->
  <draggable
    class="component-container"
    :list="els"
    :group="{ name: 'people' }"
    handle=".handle"
    @start="start"
  >
    <div
      class="container-item"
      v-for="(el,index) in els"
      :key="el + index"
      :class="el.className"
      :style="{...el.style,height:el.style.ratio ? ( (el.className.find(item => item.indexOf('jk-col-') >=0).replace('jk-col-','')/24)*el.style.ratio * parentWidth + 'px') : ''}"
    >
      <template v-if="el.type !== 'container'">
        <component
          :style="el.style"
          :is="el.type.split(':')[0]"
          :type="el.type.split(':')[1]"
          :class="el.className"
          :config="{
            text:'人数'
          }"
        ></component>
      </template>

      <drag-content
        @containerSet="setted"
        @startMove="start"
        @containerDelete="componentDelete"
        v-if="el.type === 'container'"
        :els="el.els"
        :pid="index"
        class="component-item"
      ></drag-content>
    </div>
  </draggable>
  <!-- </div> -->
</template>
<script>
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
    ...components
    // ComponentBase
  },
  props: {
    parentWidth: { type: Number },
    els: {
      type: Array
    },
    pid: { type: Number, default: 0 }
  },
  // watch:{
  //   els
  // },
  methods: {
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
    }
  }
};
</script>
<style lang="scss">
.drag-content {
  flex: 1;
  // margin: 0 15px;
  .component-container {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 10px 0 0;
    overflow: hidden;
    padding: 10px;

    .container-item {
      // width: calc(25% - 2px);
      position: relative;
      // border: 1px dashed #dedede;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      &.active {
        box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.5);
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
      }
    }
  }
}
</style>
