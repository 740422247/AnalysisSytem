<template>
  <div class="drag-button-container">
    <Button
      class="drag-button"
      :icon="item.icon"
      v-for="item in entity"
      :key="item.value"
      @click="topAction(item)"
      >{{ item.label }}</Button
    >
  </div>
</template>
<script>
import { Button } from "element-ui";

export default {
  name: "DragButton",
  components: { Button },
  props: {
    entity: { type: Array },
  },
  methods: {
    topAction(model) {
      this.$emit("clickBtn", model);
    },
  },
};
</script>
<style lang="scss" scoped>
.drag-button-container {
  text-align: right;
  .drag-button {
    border-radius: 0;
    background: #1e51a7;
    border-color: #1e51a7;
    color: #fff;
    font-size: 16px;
  }
}
</style>
