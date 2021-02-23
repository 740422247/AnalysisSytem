<template>
  <div class="drag-tools" :class="className">
    <!-- <edit-form
      @change="change"
      :filter-entity="entity"
      ref="result"
      :filterModel="model"
    ></edit-form> -->
    <group-forms
      :entity="entity"
      :model="model"
      @change="change"
      @btnClick="btnClick"
      ref="result"
    ></group-forms>
  </div>
</template>

<script>
// import { Icon, Button, Select, Option } from "element-ui";
// import FilterEntity from "./../Admin/filterEntity";
import GroupForms from "./../Admin/groupForms";
export default {
  name: "DragTools",
  components: {
    // EditForm: FilterEntity,
    GroupForms,
  },
  props: {
    entity: { type: Array },
    model: { type: Object },
    className: { type: Array },
  },
  watch: {
    model() {
      this.init();
    },
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
    },
    doRules() {
      const timer = window.setTimeout(() => {
        window.clearTimeout(timer);
        return this.$refs.result.doRules();
      }, 50);
    },
    btnClick(model) {
      this.$emit("btnClick", model);
    },
    // close() {
    //   this.$emit("close");
    // },
  },
};
</script>

<style lang="scss">
.drag-tools {
  // flex: 0 0 300px;
  padding: 10px;
  width: 300px;
  height: 100%;
  // background-color: #fff;

  &.active {
    right: 0;
    transition: all 0.5s ease-in-out;
  }

  .el-input__inner {
    height: 28px;
  }
  .el-form-item {
    margin-bottom: 12px;
  }
  .el-form-item__error {
    top: 83%;
  }
}
</style>
