<template>
  <div class="table-header-row">
    <Draggable :list="row" group="col">
      <span
        class="table-header-col"
        v-for="(col, index) in row"
        :key="`R${flag}-${index}`"
        @click.stop="clickCol(index, col)"
      >
        {{ col.headerName }}【{{ col.rowSpan }}，{{ col.colSpan }}】
        <i
          class="el-icon-close"
          id="cell-del"
          @click.stop="delCell(index, col)"
        ></i>
      </span>
    </Draggable>
  </div>
</template>
<script>
import Draggable from "vuedraggable";
export default {
  name: "TableHeaderRow",
  components: { Draggable },
  props: {
    row: Array,
    flag: Number,
  },
  data: () => ({}),
  methods: {
    // end() {
    //   this.$emit("end", this.row);
    // },
    clickCol(index, col) {
      this.$emit("clickCol", index, col);
    },
    delCell(index, cell) {
      this.$emit("delCell", this.flag, index, cell);
    },
  },
};
</script>
<style lang="scss">
.table-header-row {
  text-align: left;
  .table-header-col {
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
