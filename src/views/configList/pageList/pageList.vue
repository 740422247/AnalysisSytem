<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-06-23 16:04:02
 * @LastEditors: wss
 * @LastEditTime: 2020-09-17 16:28:13
-->
<template>
  <div class="moduleList">
    <Card class="operations-card">
      <Actions
        :action="buttonList"
        @actions="actionMethods"
        align="right"
      ></Actions>
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
      <!-- <div class="title">页面列表</div> -->
      <TableView
        :tableHeader="tabHeards"
        :listTableData="tabListData"
        @listActions="listActions"
        title="页面列表"
      ></TableView>
      <!-- @rowClick="rowClick"
      @listActions="listActions"-->
    </card>
    <FormDialog
      ref="showDialog"
      @ok="saveTitle"
      :dialogData="dialogData"
      :model="rowData"
    ></FormDialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Button, Card, MessageBox, Message } from "element-ui";
import * as types from "@store/mutation-types";
import pageEntity from "./entity";
import api from "@api/api";
const Actions = () => import("@components/Admin/actions.vue");
const TableView = () => import("@components/Admin/tableListEntity.vue");
const FormDialog = () => import("@components/Admin/form-dialog.vue");

export default {
  name: "pageList",
  components: {
    TableView,
    Actions,
    Card,
    FormDialog,
  },
  data() {
    return {
      tabHeards: {},
      tabListData: [],
      buttonList: [
        {
          name: "addModules",
          label: "新增页面",
          type: "primary",
          icon: "el-icon-circle-plus-outline",
        },
      ],
      tableData: [],
      dialogData: {
        entity: [],
      },
      rowData: {},
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
      this.setListEntity();
      this.setListData();
    },
    async setListData() {
      const result = await this.$store.dispatch(types.getPageList);
      this.tabListData = result.data.items;
    },

    setListEntity() {
      this.tabHeards = pageEntity.setTabHeards();
    },
    handleClick(row) {
      console.log(row);
    },
    indexMethod(index) {
      return index + 1;
    },
    listActions(rowData, name) {
      switch (name) {
        case "detail":
          this.detail(rowData);
          break;
        case "edit":
          this.edit(rowData);
          break;
        case "delete":
          this.deleteRow(rowData);
          break;
        default:
          this.editTitle(rowData);
          break;
      }
    },
    actionMethods(name) {
      if (name === "addModules") {
        this.addPage();
      }
    },

    // 新增页面
    addPage() {
      MessageBox.prompt("请输入页面标题", undefined, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(async ({ value }) => {
        // this.savePageDetail(modulesInfo, types.addPage);
        const result = await api.publicApi(types.checkPageRepeat, {
          Name: value,
        });
        if (!result.data) {
          this.$router.push({ name: "dragHome2", query: { pageName: value } });
        } else {
          Message.error({ message: `【${value}】页面名称已存在，请重新输入` });
          this.addPage();
        }
      });
    },

    // 修改标题
    editTitle(model) {
      this.dialogData = this.setDialogData();
      this.rowData = { ...model };
      this.$refs.showDialog.showDialog();
    },
    saveTitle({ model }) {
      const { moduleId, moduleName, content } = model;
      const moduleDto = {
        moduleId,
        moduleName,
        content,
      };
      let moduleDetail = [];
      JSON.parse(model.content).els.forEach((item) => {
        item.els.forEach((el) => {
          moduleDetail.push({
            modelId: el.modelId,
            modelType: el.modelType,
            modelName: el.modelName,
          });
        });
      });
      api
        .publicApi(types.updatePage, { moduleDto, moduleDetail }, "post")
        .then((res) => {
          if (res.code === 1) {
            // MessageBox.alert("页面标题保存成功");
            this.setListData();
          } else {
            MessageBox.alert(res.errMsg);
          }
        });
    },
    setDialogData() {
      return {
        title: "修改页面标题",
        width: "500px",
        entity: [
          {
            label: "页面标题",
            key: "moduleName",
            rules: [
              { required: true, message: "页面标题不能为空", trigger: "blur" },
            ],
          },
        ],
      };
    },

    // 查看详情
    detail(model) {
      this.$router.push({ name: "pageDetail", query: { id: model.moduleId } });
      // this.$store.dispatch("savePreview", { id: model.moduleId });
      // const routeData = this.$router.resolve({
      //   name: "pageDetail"
      // });
      // window.pageId = model.moduleId;
      // window.open(routeData.href, "_blank");
    },
    // 编辑
    edit(model) {
      this.$router.push({ name: "dragHome2", query: { id: model.moduleId } });
    },
    // 删除行
    deleteRow(model) {
      MessageBox.confirm("点击“删除”将彻底删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const result = await this.$store.dispatch(types.deletePage, {
          id: model.moduleId,
        });
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
}
.listCard {
  margin-top: 20px;
}
.moduleList {
  box-sizing: border-box;
  padding: 16px;
}
</style>
