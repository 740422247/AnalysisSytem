<template>
  <div class="component-container">
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

      <page-content
        v-if="el.type === 'container'"
        :els="el.els"
        :pid="index"
        class="component-item"
      ></page-content>
    </div>
  </div>
</template>
<script>
import { components } from "@config/config.js";

export default {
  name: "PageContent",
  components: {
    ...components
  },
  props: {
    els: { type: Array }
  }
};
</script>


<style lang="scss">
// .drag-content {
//   flex: 1;
// margin: 0 15px;
.component-container {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  margin: 10px 10px 0 0;
  overflow: hidden;

  .container-item {
    // width: calc(25% - 2px);
    position: relative;
    // border: 1px dashed #dedede;
    min-height: 200px;
    display: flex;
    flex-direction: column;

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
      margin: 0;
    }
  }
}
// }
</style>
