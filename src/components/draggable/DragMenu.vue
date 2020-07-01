<template>
  <div class="drag-menu">
    <div class="drag-menu-item" @click="addContainer">添加容器组件</div>
    <draggable
      class="dragArea list-group"
      :list="menu"
      :group="{ name: 'people', pull: 'clone', put: false }"
      @start="startClone"
    >
      <!-- <div class="drag-menu-item" v-for="element in menu" :key="element.id">{{ element.name }}</div> -->
      <div :style="item.style" v-for="(item, key) in menu" :key="key">
        <component
          :is="item.type.split(':')[0]"
          :type="item.type.split(':')[1]"
          :config="{
            text: '人数'
          }"
        ></component>
      </div>
    </draggable>
  </div>
</template>
<script>
import { components } from "@config/config.js";

import Draggable from "vuedraggable";
export default {
  name: "DragMenu",
  components: {
    Draggable,
    ...components
  },
  props: {
    menu: { type: Array }
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
    }
  }
};
</script>
<style lang="scss">
.drag-menu {
  flex: 0 0 200px;
  border: 1px solid #dedede;
  border-radius: 5px;

  .drag-menu-item {
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #dedede;
    &:last-child {
      border: none;
    }
  }
}
</style>
