<template>
  <!-- <div class="table-format-contianer"> -->
  <Dialog
    :visible="sysFormsDialog.visible ? sysFormsDialog.visible : false"
    :modal="false"
    @close="close"
    top="15vh"
    title="过滤条件设置"
    custom-class="sys-forms-dialog"
  >
    <div class="dialog-body">
      <div class="body-left">
        <div class="left-header bar" @click.stop="selectRow">
          <sys-forms-item
            :entity="formsEntity"
            @delItem="delForm"
            @selectItem="selectForm"
          ></sys-forms-item>
        </div>
        <div class="left-footer">
          {{ errMsg ? "消息提示：" + errMsg : "" }}
        </div>
      </div>
      <div class="body-right bar">
        <div class="body-right-top">
          <span>字段属性设置</span>
          <i class="el-icon-check" @click.stop="saveModel"></i>
        </div>
        <edit-form
          class="body-right-content"
          :entity="entity"
          :model="model"
          @change="change"
        ></edit-form>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <Button type="danger" @click="close">关闭</Button>
      <Button type="success" @click="saveForms">确定</Button>
    </span>
  </Dialog>
  <!-- </div> -->
</template>
<script>
import api from "@api/api";
import * as types from "@store/mutation-types";
import { Button, Dialog } from "element-ui";
import EditForm from "@components/Admin/groupForms";
import SysFormsItem from "./SysFormsItem";
import sysFormsEntity from "./../entity";
export default {
  name: "SysForms",
  components: { Dialog, Button, SysFormsItem, EditForm },
  props: {
    sysFormsDialog: Object,
    el: Object,
  },
  data: () => ({
    model: {},
    entity: [],
    formsEntity: [],
    errMsg: "",
    state: {},
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.initModel();
      this.system();
      this.initFormsEntity();
    },
    initFormsEntity() {
      // this.formsEntity = this.data || [];
      if (
        this.el &&
        this.el.type &&
        this.el.type.includes("wssForms") &&
        this.el.data &&
        Array.isArray(this.el.data.value)
      ) {
        this.formsEntity = this.el.data.value;
      }
    },
    initEntity() {
      this.entity = sysFormsEntity.getSysFormsEntity(this.state, this.model);
    },
    selectRow() {
      this.initModel();
    },
    initModel() {
      this.model = { type: "input", formWidth: "33%" };
    },
    change() {
      this.initDictionaries(this.model.formSystem);
    },
    async system() {
      const sys = await api.SysBusiness("GetPage", {});
      this.state.sys = sys.data.map((item) => ({
        value: item.businessId,
        label: item.name,
      }));
      this.initEntity();
    },
    async initDictionaries(systemId) {
      const apis = await this.$store.dispatch(types.getAllApi, {
        ApiType: "condition",
        IsEnable: "是",
      });
      this.state.dictionaries = apis.data
        .filter((item) => item.businessId === systemId)
        .map((item) => ({
          label: `${item.label || ""}(${item.url})`,
          value: item.id,
        }));
      this.initEntity();
    },
    close() {
      this.$emit("close");
    },
    saveModel() {
      if (!this.model.id) {
        this.errMsg = "请填写字段名";
        return;
      }
      if (!this.model.label) {
        this.errMsg = "请填写显示名";
        return;
      }
      if (this.model.type === "select" && !this.model.formSystem) {
        this.errMsg = "请选择相关系统";
        return;
      }
      if (this.model.type === "select" && !this.model.api) {
        this.errMsg = "请选择相关接口";
        return;
      }
      this.errMsg = undefined;
      this.formsEntity.push(this.model);
      this.initModel();
    },
    delForm(index) {
      this.formsEntity.splice(index, 1);
    },
    selectForm(model) {
      this.model = model;
    },
    async saveForms() {
      // return;
      const result = await api.publicApi(
        types.sysForms,
        { conditionDtos: this.formsEntity },
        "post"
      );
      result.data.conditionDtos.length &&
        this.$emit("save", result.data.conditionDtos, this.formsEntity);
    },
  },
  watch: {
    el() {
      this.init();
    },
  },
};
</script>
<style lang="scss">
// .table-format-container {
//   overflow: visible;
.sys-forms-dialog {
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
      .left-footer {
        flex: 0 0 58px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ded;
        color: red;
      }
    }
    .body-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      .body-right-top {
        flex: 0 0 60px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: #ded;
        position: relative;
        span {
          flex: 1;
        }
        span {
          padding-left: 15px;
          text-align: left;
          font-size: 16px;
        }
        i {
          position: absolute;
          top: auto;
          right: 15px;
          font-size: 22px;
          font-weight: 600;
          color: green;
          padding: 3px;
          // border:1px solid green;
          border-radius: 50%;
        }
      }
      .body-right-content {
        flex: 1;
        padding-left: 15px;
      }
      // h3 {
      //   text-align: left;
      //   padding-left: 12px;
      // }
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
