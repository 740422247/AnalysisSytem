<template>
  <draggable class="component-container" :list="els" :group="{ name: 'people' }">
    <div class="container-item" v-for="(el,index) in els" :key="el + index">
      <!-- // 是否使用，待定 -->
      {{el.name}}
      <draggable :list="el.els" class="component-item"></draggable>
    </div>
  </draggable>
</template>
<script>
import Draggable from "vuedraggable";

export default {
  name: "ComponentContainer",
  props: {
    els: {
      type: Array
    }
  }
};
</script>
<style lang="scss">
.component-container {
  display: flex;
  flex-wrap: wrap;
  .container-item {
    flex-basis: 33.33%;
    position: relative;
    min-height: 200px;
    .component-item {
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 3px;
      border: 1px dashed #dedede;
    }
  }
}
</style>
