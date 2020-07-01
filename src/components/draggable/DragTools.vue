<template>
  <div class="drag-tools">
    <edit-form @change="change" :filter-entity="entity" :filterModel="model"></edit-form>
  </div>
</template>

<script>
// import { Icon, Button, Select, Option } from "element-ui";
import FilterEntity from "./../Admin/filterEntity";
export default {
  name: "DragTools",
  components: {
    EditForm: FilterEntity
  },
  props: {
    entity: { type: Array },
    model: { type: Object }
  },
  watch: {
    model() {
      this.init();
    }
  },
  data: () => ({}),
  mounted() {
    this.init();
  },
  methods: {
    init() {

      // this.entity.length && (this.data = [...this.entity]);
    },
    change(model) {
      this.$emit("change", model);
    }
  }
};
</script>

<style lang="scss">
.drag-tools {
  flex: 0 0 300px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #dedede;
}
</style>
