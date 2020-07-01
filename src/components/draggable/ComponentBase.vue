<template>
  <!-- <draggable :list="els"> -->
  <div>
    <div v-for="(el,index) in els" :key="el.name + index">{{el.name}}</div>
  </div>
  <!-- </draggable> -->
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "ComponentBase",
  props: {
    els: { type: Array }
  },
  components: {
    draggable
  }
};
</script>
