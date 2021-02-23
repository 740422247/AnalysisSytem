<template>
  <div class="component-container">
    <div
      class="container-item"
      v-for="(el, index) in els"
      :key="el + index"
      :class="el.className"
      :style="el.style"
    >
      <!-- :style="{
        ...el.style,
        height: el.style.ratio
          ? (el.className
              .find(item => item.indexOf('jk-col-') >= 0)
              .replace('jk-col-', '') /
              24) *
              el.style.ratio *
              parentWidth +
            'px'
          : ''
      }"-->
      <!-- :class="el.className" -- 2020-09-10 card组件渲染失败，删除component属性class -->
      <template v-if="el.type !== 'container'">
        <component
          :is="el.type.split(':')[0]"
          :style="{ ...el.style }"
          :type="el.type.split(':')[1]"
          :config="el"
          @searchFrame="searchFrame"
          @clickItem="clickItem"
          @onTable="onTable"
          @onSelectChage="onSelectChage"
        ></component>
      </template>

      <jk-box
        class="jkBoxFlex"
        v-if="el.type === 'container'"
        :border="el.border"
        :grid="el.grid"
      >
        <page-content
          :els="el.els"
          :pid="index"
          class="component-item"
          @searchFrame="onSearch"
          @onTable="onTable"
          @clickItem="clickItem"
          @onSelectChage="onSelectChage"
        ></page-content>
      </jk-box>
    </div>
  </div>
</template>
<script>
import jkBox from "../../components/base/jkBox/jkBox.vue";
import { components } from "@config/config.js";

export default {
  name: "PageContent",
  components: {
    jkBox,
    ...components,
  },
  props: {
    els: { type: [Array, Object] },
  },
  mounted() {
    // console.log("mounted:", typeof this.els, this.els);
  },
  methods: {
    searchFrame(data, el) {
      this.$emit("searchFrame", data, el);
    },
    onSearch(data, el) {
      this.$emit("onSearch", data, el);
    },
    onTable(PageInfo, el) {
      this.$emit("onTable", PageInfo, el);
    },
    clickItem(model) {
      // console.log("click item:", model);
      this.$emit("clickItem", model);
    },
    onSelectChage(model, el) {
      this.$emit("onSelectChage", model, el);
    },
  },
  watch: {
    els(res) {
      // console.log("page content watch:", this.els);
    },
  },
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
  justify-content: space-between;
  // margin: 10px 10px 0 0;
  // overflow: hidden;

  .container-item {
    // width: calc(25% - 2px);
    position: relative;
    // overflow: visible;
    display: flex;
    flex-direction: column;

    .jkBoxFlex {
      padding: 0;
    }

    .drag-header {
      flex: 0 0 30px;
      text-align: right;

      i {
        padding: 5px;
      }
    }
    .component-item {
      flex: 1;
      border-radius: 3px;
      margin: 0;
      height: 100%;
    }
  }
}
// }
</style>
