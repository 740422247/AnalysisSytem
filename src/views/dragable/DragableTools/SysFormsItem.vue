<template>
  <div class="forms-header-row" @click.stop="selectRow">
    <Draggable :list="entity" group="col">
      <span
        class="forms-header-col"
        v-for="(item, index) in entity"
        :key="item.id"
        @click.stop="selectForm(item, index)"
      >
        {{ item.label }}
        <i class="el-icon-close" id="cell-del" @click.stop="delForm(index)"></i>
      </span>
    </Draggable>
  </div>
</template>
<script>
import Draggable from "vuedraggable";
export default {
  name: "SysFormsItem",
  components: { Draggable },
  props: {
    entity: Array,
  },
  data: () => ({}),
  methods: {
    delForm(index) {
      this.$emit("delItem", index);
    },
    selectForm(model, index) {
      this.$emit("selectItem", model, index);
    },
    selectRow() {
      this.$emit("selectRow");
    },
  },
};
</script>
<style lang="scss">
.forms-header-row {
  text-align: left;
  .forms-header-col {
    display: inline-block;
    padding: 5px 8px;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin: 8px;
    margin-bottom: 0;
    cursor: pointer;
    position: relative;
    #cell-del {
      position: absolute;
      top: -10px;
      right: -10px;
      padding: 1px;
      color: red;
      font-size: 10px;
      border-radius: 50%;
      border: 1px solid red;
      background-color: #fff;
      opacity: 0;
      transform: rotate(0);
      transition: all 0.3s ease-in-out;
    }
    &:hover #cell-del {
      transform: rotate(180deg);
      opacity: 1;
    }
  }
}
</style>
