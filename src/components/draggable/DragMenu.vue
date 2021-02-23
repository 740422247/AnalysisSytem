<template>
  <div class="drag-menu bar">
    <div class="drag-menu-item">
      <Button @click="addContainer" size="mini">添加容器</Button>
      <Button size="mini" @click="showTop">显示头部</Button>
    </div>
    <draggable
      class="dragArea list-group"
      :list="menu"
      :group="{ name: 'people', pull: 'clone', put: false }"
      @start="startClone"
    >
      <!-- <div class="drag-menu-item" v-for="element in menu" :key="element.id">{{ element.name }}</div> -->
        <!-- :style="item.style" -->

      <div
        v-for="(item, key) in menu"
        :key="key"
        style="overflow: hidden;padding:10px;"
      >
        <h4>{{ item.text }}</h4>
        <!-- <img
          :src="item.componentImg"
          v-if="item.componentImg"
          class="component-img"
          alt
        />
        <component
          v-if="!item.componentImg"
          isRefresh
          :is="item.type.split(':')[0]"
          :type="item.type.split(':')[1]"
          :config="{ text: item.text }"
        ></component> -->
      </div>
    </draggable>
  </div>
</template>
<script>
import { components } from "@config/config.js";
import { Icon, Button } from "element-ui";

import Draggable from "vuedraggable";
export default {
  name: "DragMenu",
  components: {
    Draggable,
    Icon,
    Button,
    ...components,
  },
  props: {
    menu: { type: Array },
  },
  // computed:{
  //   _config(){
  //     return config
  //   }
  // },
  methods: {
    addContainer() {
      this.$emit("onAdd");
    },
    startClone(evt) {
      this.$emit("startClone", evt.oldIndex);
    },
    showTop() {
      this.$emit("showHeader");
    },
  },
};
</script>
<style lang="scss">
.drag-menu {
  flex: 0 0 300px;
  border: 1px solid #dedede;
  padding-top: 60px;

  .component-img {
    max-width: 300px;
  }
  .drag-menu-item {
    height: 56px;
    line-height: 56px;
    width: 298px;
    border-bottom: 1px solid #dedede;
    position: absolute;
    top: 1px;
    left: 1px;
    @include t(background, "k0");
    z-index: 18;
    &:last-child {
      border: none;
    }
  }
}
</style>
