<template>
  <!-- <div class="table-format-contianer"> -->
  <Dialog
    :visible="tableDialog.visible ? tableDialog.visible : false"
    @close="close"
    :modal="false"
    top="15vh"
    title="表头设置"
    custom-class="table-dialog"
  >
    <div class="dialog-body">
      <div class="body-left">
        <div class="left-header bar">
          <div
            class="row-item"
            v-for="(item, index) in headers"
            :key="'第' + index + '行'"
            @click="choiceRow(index)"
          >
            <h3>第{{ index + 1 }}行</h3>
            <i
              class="el-icon-close"
              :title="`删除${index + 1}行`"
              @click.stop="delRow(index)"
            ></i>
            <table-row
              :flag="index"
              :row="item"
              @end="end"
              @clickCol="clickCol"
              @delCell="delCell"
            ></table-row>
          </div>
        </div>
        <div class="left-botton">
          <Button @click="prevRow" icon="el-icon-sort-up" plain type="primary"
            >上移一行</Button
          >
          <Button @click="nextRow" plain type="primary" icon="el-icon-sort-down"
            >下移一行</Button
          >
          <Button @click="addRow" plain type="primary" icon="el-icon-plus"
            >新增行</Button
          >
          <Button @click="ok" plain type="primary" icon="el-icon-check"
            >保存列</Button
          >
        </div>
      </div>
      <div class="body-right bar">
        <h3>
          当前选中：
          {{ toolTitle ? `第${toolTitle}行` : "无"
          }}{{ colIndex ? `的第${colIndex}列` : "" }}
        </h3>
        <EditForm :entity="entity" :model="model" ref="tableForm"></EditForm>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <Button @click="close" type="danger">关闭</Button>
      <Button @click="saveHeader" type="success">确定</Button>
    </span>
  </Dialog>
  <!-- </div> -->
</template>
<script>
import api from "@api/api";
import * as types from "@store/mutation-types";
import { Button, Dialog, Message } from "element-ui";
import EditForm from "@components/Admin/groupForms";
import TableRow from "./TableHeaderRow";
import tableEntity from "./../entity";
export default {
  components: { Dialog, Button, EditForm, TableRow },

  props: {
    tableDialog: Object,
    el: Object,
    state: Object,
  },
  data: () => ({
    entity: [],
    model: {},
    headers: [[]],
    toolTitle: undefined,
    colIndex: undefined,
  }),
  created() {
    this.init();
    this.initEntity();
  },
  mounted() {},
  methods: {
    initEntity() {
      this.entity = tableEntity.getTableFormEntity(this.state);
    },
    init() {
      this.headers =
        this.el &&
        this.el.data &&
        this.el.data.value &&
        this.el.data.value.Headers;
    },
    close() {
      this.$emit("close");
    },
    choiceRow(index) {
      this.toolTitle = index + 1;
      this.colIndex = 0;
      this.initModel();
    },
    clickCol(index, model) {
      this.model = model;
      this.colIndex = index + 1;
    },
    delCell(parentIndex, index) {
      this.headers[parentIndex].splice(index, 1);
      this.colIndex = 0;
    },
    ok() {
      if (!this.model.headerName) return;
      this.$refs.tableForm.doRules();

      if (this.colIndex) {
        this.headers[this.toolTitle - 1][this.colIndex - 1] = this.model;
      } else {
        this.headers[this.toolTitle - 1].push(this.model);
        this.initModel();
      }
    },
    addRow() {
      this.headers.push([]);
      this.toolTitle = this.headers.length;
    },
    prevRow() {
      if (this.toolTitle <= 1) return;
      const a = this.headers.splice(this.toolTitle - 1, 1)[0];
      this.headers.splice(this.toolTitle - 2, 0, a);
      this.toolTitle--;
    },
    nextRow() {
      if (this.toolTitle >= this.headers.length) return;
      const a = this.headers.splice(this.toolTitle - 1, 1)[0];
      this.headers.splice(this.toolTitle, 0, a);
      this.toolTitle++;
    },
    delRow(index) {
      this.headers.splice(index, 1);
      this.toolTitle = 0;
    },
    end() {
      this.colIndex = 0;
      this.toolTitle = 0;
    },
    async saveHeader() {
      // console.log("save header:", JSON.stringify(this.getHeaderResult()));
      const result = await api
        .publicApi(
          types.tableHeaders,
          {
            headerNodeDtos: this.headers,
          },
          "post"
        )
        .then((res) => {
          if (res.code === 1) {
            const headerIdentity = res.data[0].sort(
              (prev, next) => prev.index2 - next.index2
            );
            this.$emit("save", this.getHeaderResult(), headerIdentity);
          } else if (res.code === 0) {
            Message({ message: res.errMsg, type: "error" });
          }
        });
      // this.$emit("save", this.getHeaderResult());
    },
    getHeaderResult() {
      return this.headers.map((row) =>
        row.map((col) => ({
          ...col,
          headerStyle: this.getHeaderStyle(col),
          bodyStyle: this.getBodyStyle(col),
          location: this.getchildPageParam(col),
        }))
      );
    },
    getchildPageParam(col) {
      const { path, param } = col;
      if (!path) return;
      return {
        path,
        param,
      };
    },
    getHeaderStyle(col) {
      const { headerAlign, minWidth } = col;
      return {
        textAlign: headerAlign,
        minWidth: minWidth + "px",
      };
    },
    getBodyStyle(col) {
      const { bodyAlign } = col;
      return {
        textAlign: bodyAlign,
      };
    },
    initModel() {
      this.model = {
        rowSpan: 1,
        colSpan: 1,
        headerAlign: "center",
        isFixed: false,
        isSort: false,
        bodyAlign: "center",
        formatting: "String",
      };
    },
  },
  watch: {
    state: {
      deep: true,
      handler(old, val) {
        this.initEntity();
      },
    },
    el: {
      deep: true,
      handler() {
        if (this.el.type.includes("Table")) {
          const code = this.el.argument.apiArgument.map((item) => ({
            ...item,
            label: item.label.split("#")[0],
          }));
          this.entity = tableEntity.getTableFormEntity(this.state, code);
          this.init();
        }
      },
    },
  },
};
</script>
<style lang="scss">
// .table-format-container {
//   overflow: visible;
.table-dialog {
  .el-dialog__header {
    text-align: left;
  }

  .dialog-body {
    display: flex;
    height: 50vh;
    .body-left {
      flex: 2;
      border-right: 1px dashed #ccc;
      display: flex;
      flex-direction: column;
      .left-header {
        flex: 1;
        overflow: auto;
        .row-item {
          border-bottom: 1px dashed #ccc;
          padding: 12px;
          position: relative;
          h3 {
            padding: 3px;
            text-align: left;
          }
          .el-icon-close {
            position: absolute;
            top: 15px;
            right: 10px;
          }
        }
      }
      .left-botton {
        flex: 0 0 38px;
        display: flex;
        justify-content: space-around;
      }
    }
    .body-right {
      flex: 1;
      h3 {
        text-align: left;
        padding-left: 12px;
      }
      .el-form-item__label {
        color: #333;
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
  }
}

// }
.v-modal {
  display: none;
}
</style>
