<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-06-23 16:04:02
 * @LastEditors: wss
 * @LastEditTime: 2020-06-28 15:07:40
-->
<template>
  <div class="moduleList">
    <Card class="operations-card">
      <Actions :action="buttonList" @actions="actionMethods" align="right"></Actions>
      <!-- <Filters
        :filter-entity="filterEntity"
        @searchFilter="searchFilter"
        :border="true"
        :showSearch="true"
        :filterModel="filterModel"
        @change="change"
      ></Filters>-->
    </Card>
    <card class="listCard">
      <TableView
        :tableHeader="tabHeards"
        :listTableData="tabListData"
        @listActions="listActions"
        title="模块列表"
      ></TableView>
    </card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "@store/mutation-types";
import { Button, Card } from "element-ui";
import module from "./entity";
import { MessageBox } from "element-ui";
const Actions = () => import("@components/Admin/actions.vue");
const TableView = () => import("@components/Admin/tableListEntity.vue");

export default {
  name: "moduleList",
  components: { Actions, Card, TableView, MessageBox },
  data() {
    return {
      tabHeards: {},
      tabListData: [],
      buttonList: [
        {
          name: "addModules",
          label: "新增模块",
          type: "primary",
          icon: "el-icon-circle-plus-outline",
        },
      ],
    };
  },
  created() {
    // this.$store.dispatch("actTag");
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    init() {
      this.setListData();
      this.setListEntity();
    },
    async setListData() {
      const result = await this.$store.dispatch(types.getModules);
      this.tabListData = result.data;
    },
    setListEntity() {
      this.tabHeards = module.setTabHeards();
    },
    handleClick(row) {
      console.log(row);
    },
    indexMethod(index) {
      return index + 1;
    },
    actionMethods(name) {
      if (name === "addModules") {
        this.$router.push({ name: "ApiSet" });
      }
    },
    listActions(rowData, name) {
      switch (name) {
        case "detail":
          this.detail(rowData);
          break;
        case "edit":
          this.edit(rowData);
          break;
        default:
          this.deleteRow(rowData);
      }
    },
    // 编辑模块
    edit(rowData) {
      this.$router.push({ name: "ApiSet", query: { id: rowData.modelId } });
    },

    // 删除行
    deleteRow(model) {
      MessageBox.confirm("点击“删除”将彻底删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const result = await this.$store.dispatch(types.deleteModules, {
          id: model.modelId,
        });
        console.log("delete:", result);
        if (result.code === "500") {
          MessageBox.alert(result.data.errMsg);
        }
        this.setListData();
      });
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  text-align: left;
  margin-bottom: 30px;
  margin-top: 16px;
}
.listCard {
  margin-top: 20px;
}
.moduleList {
  box-sizing: border-box;
  padding: 16px;
}
</style>
