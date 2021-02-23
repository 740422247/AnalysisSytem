<template>
  <!-- <div class="table-format-contianer"> -->
  <!-- :visible="sysFormsDialog.visible ? sysFormsDialog.visible : false" -->

  <Dialog
    :visible="cardListDialog.visible ? cardListDialog.visible : false"
    top="15vh"
    title="卡片组设置"
    @close="close"
    custom-class="card-list-dialog"
  >
    <div class="dialog-body">
      <div class="body-left">
        <div class="left-header bar" @click.stop="selectRow">
          <card-list-item
            :entity="cardsEntity"
            @delItem="delItem"
            @selectItem="selectItem"
          ></card-list-item>
        </div>
        <div class="left-footer">{{ errMsg ? "消息提示：" + errMsg : "" }}</div>
      </div>
      <div class="body-right bar">
        <div class="body-right-top">
          <span>卡片属性设置</span>
          <i class="el-icon-check" @click.stop="saveModel"></i>
        </div>
        <edit-form
          class="body-right-content"
          :entity="entity"
          :model="model"
          :formDialog="hasSrc"
        ></edit-form>
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <Button type="danger" @click="close">关闭</Button>
      <Button type="success" @click="saveCards">确定</Button>
    </span>
  </Dialog>
  <!-- </div> -->
</template>
<script>
// import api from "@api/api";
// import * as types from "@store/mutation-types";
import { Button, Dialog } from "element-ui";
import EditForm from "@components/Admin/groupForms";
import CardListItem from "./SysFormsItem";
import cardEntity from "./../entity";

export default {
  name: "CardList",
  components: { Dialog, Button, CardListItem, EditForm },
  props: {
    cardListDialog: Object,
    el: Object,
    state: Object,
    cards: Array,
  },
  data: () => ({
    cardsEntity: [],
    entity: [],
    model: {},
    errMsg: "",
    hasSrc: false,
    itemIndex: 0,
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.initModel();
      this.initEntity();
      this.initCards();
    },
    initCards() {
      this.cardsEntity = JSON.parse(JSON.stringify(this.cards));
    },
    initEntity() {
      this.entity = cardEntity.getCardListEntity(this.state);
    },
    initModel() {
      this.model = { cardWidth: 8, border: false, grid: false };
    },
    // change(model) {
    //   console.log("changeForms:", model);
    // },
    // change(model) {
    //   this.model = model;
    //   this.cardsEntity[this.itemIndex] = model;
    // },
    saveModel() {
      if (!this.model.label) {
        this.errMsg = "请填写显示名字";
        return;
      }
      if (!this.model.value) {
        this.errMsg = "请填写显示字段";
        return;
      }
      if (!this.model.src) {
        this.errMsg = "请上传图标";
        return;
      }
      this.errMsg = undefined;
      this.cardsEntity.push(this.model);
      this.initModel();
    },
    delItem(index) {
      this.cardsEntity.splice(index, 1);
    },
    selectItem(model, index) {
      this.model = model;
      this.itemIndex = index;
    },
    selectRow() {
      // console.log('init model select row')
      this.initModel();
    },
    close() {
      this.$emit("close");
    },
    saveCards() {
      this.$emit("save", this.cardsEntity);
    },
  },
  watch: {
    cards() {
      this.init();
    },
  },
};
</script>
<style lang="scss">
// .table-format-container {
//   overflow: visible;
.card-list-dialog {
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
