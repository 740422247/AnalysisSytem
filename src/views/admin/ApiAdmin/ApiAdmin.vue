ApiAdmin<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-10-29 11:12:13
 * @LastEditors: wss
 * @LastEditTime: 2020-11-04 11:27:14
-->
<!--  -->
<template>
  <div class="user-center">
    <!-- <Card class="operations-card">
      <Actions :action="buttonList" @actions="actionMethods"></Actions>
      <Filters
        :filter-entity="filterEntity"
        @searchFilter="searchFilter"
        :border="true"
        :showSearch="true"
        :filterModel="filterModel"
      ></Filters>
    </Card> -->
    <div class="user-main">
      <Card class="user-list">
        <Actions :action="buttonList" @actions="actionMethods"></Actions>
        <!-- <Filters
          :filter-entity="RefreshApiEntity"
          :border="true"
          @btnClick="btnRefreshApi"
          :formConfig="{ inline: true }"
          :filterModel="RefreshApiModel"
        ></Filters> -->
        <!-- <Actions :action="buttonList" @actions="actionMethods"></Actions> -->
        <Filters
          :filter-entity="filterEntity"
          @change="searchFilter"
          :border="true"
          :filterModel="filterModel"
        ></Filters>
        <TableView
          ref="table"
          :tableHeader="tabHeards"
          :listTableData="tabListData"
          :loading="loadingLeft"
          :pageInfo="pageInfo"
          @selectionList="selectionList"
          @flipOver="flipOver"
          @rowClick="rowClick"
          @listActions="listActions"
          @changeSwitch="changeSwitch"
          title="用户列表"
        ></TableView>
      </Card>
      <!-- <Card class="user-permissions">
        <TreeView
          ref="TreeView"
          :filterEntity="filterEntityRight[0]"
          :tree="treeEntity"
          :defaultProps="defaultProps"
          :listData.sync="rowData"
          title="角色设置"
          @saveResource="saveResource"
          @checkedNodes="checkedNodes"
          @getNodeClick="getNodeClick"
          :checkedData="setCheckedData"
          :UpdataTree="UpdataTree"
        ></TreeView>
      </Card> -->
    </div>
    <!-- :mode="rowData" -->
    <FormDialog
      ref="showDialog"
      @ok="dialogOk"
      :dialogData="dialogData"
      :model="rowData"
    ></FormDialog>
  </div>
</template>

<script>
import api from "@api/api.js";
import { Card } from "element-ui";
import { getFilterByQueryStringFn, pageData } from "@/until/filter";
import { ApiAdmin } from "./ApiAdmin.js";
import { ApiAdminFilter } from "./ApiAdminFilter.js";
const TreeView = () => import("@components/Admin/treeEntity.vue");
const TableView = () => import("@components/Admin/tableListEntity.vue");
const Actions = () => import("@components/Admin/actions.vue");
const Filters = () => import("@components/Admin/filterEntity.vue");
const FormDialog = () => import("@components/Admin/form-dialog.vue");
export default {
  name: "ApiAdmin",
  components: {
    TreeView,
    TableView,
    Card,
    Filters,
    FormDialog,
    Actions
  },
  data() {
    //这里存放数据
    return {
      editHold: {}, //暂存编辑对象,成功赋值
      rowData: {},
      apiList: [],
      dialogData: {},
      loadingLeft: true,
      pageInfo: {
        pageIndex: 1,
        pageSize: 10
        // totalCount: 7,
        // totalPage: 1
      },
      filterModel: {},
      RefreshApiModel: {},
      buttonList: [],
      filterEntity: [],
      RefreshApiEntity: [],
      tabHeards: {},
      tabListData: [],
      selectionListData: []
    };
  },
  mixins: [ApiAdmin, ApiAdminFilter],
  computed: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.filterEntity = this.setFilterEntity();
    this.tabHeards = this.setTabHeards();
    this.buttonList = this.setViewActions();
    //顶部刷新API
    this.GetDialogPage();
  },
  mounted() {
    this.$nextTick(() => {});
    this.GetPage();
  },
  methods: {
    selectionList(dd) {
      this.buttonList.map(item => {
        const arr = ["setApiType"];
        arr.map(itt => {
          if (itt === item.name) {
            if (dd.length > 0) {
              item.disabled = false;
            } else {
              item.disabled = true;
            }
          } else {
            item.disabled = false;
          }
        });
      });
      this.selectionListData = dd;
    },
    btnRefreshApi(dd) {
      const a = { businessId: dd.businessId };
      api.ChartApiOption("RefreshApi", a).then(dd => {
        this.$message({
          type: "success",
          message: dd.msg ? dd.msg : dd.errMsg
        });
      });
    },
    // linkageRefreshApi(d) {
    //   this.filterModel = JSON.parse(JSON.stringify(d[0]));
    //   console.log(this.filterModel);
    // },
    // 刷新API接口下拉框
    GetDialogPage() {
      api.SysBusiness("GetPage", {}).then(dd => {
        const apiList = (this.apiList = dd.data.map(item => ({
          label: item.name,
          value: item.businessId,
          ...item
        })));
        this.RefreshApiEntity = this.setRefreshApiEntity(this.apiList);
        // this.pageInfo.totalCount = dd.data.length;
        // this.getFilterByQueryStringFn(null);
      });
    },
    //是否启用
    changeSwitch(dd) {
      const p = { id: dd.id, isEnabled: dd.isEnable };
      api.ChartApiOption("IsEnable", p).then(dd => {
        this.$message({
          type: "success",
          message: dd.msg ? dd.msg : dd.errMsg
        });
      });
    },
    dialogOk(data) {
      // const dd = JSON.parse(JSON.stringify(data));
      const dd = data;
      if (dd.typeName === "setApiType") {
        const str = data.model.lsApiType.toString();
        const par = {
          lsChartApiOptionDtos: this.selectionListData,
          lsApiType: str
        };
        api.ChartApiOption("UpdateList", par).then(dd => {
          this.GetPage();
          this.selectionList([]); //用于禁用按钮
          this.$message({
            type: "success",
            message: dd.msg ? dd.msg : dd.errMsg
          });
        });
      } else if (dd.typeName === "updateApi") {
        this.btnRefreshApi(dd.model);
      } else if (dd.typeName === "UpdateBusiness") {
        api.SysBusiness("Update", dd.model).then(dd => {
          this.editHold = Object.assign(this.editHold, dd.data);
          // this.$set(this.editHold, "ttt", 2);
          this.$message({
            type: "success",
            message: dd.msg ? dd.msg : dd.errMsg
          });
        });
      }
    },
    listActions(rowData, name, index) {
      switch (name) {
        case "delete":
          this.delete(rowData);
          break;
        // case "edit":
        //   this.edit(rowData, index);
        //   break;
        // case "setApiType":
        //   this.setApiType(rowData, index);
        //   break;
      }
    },
    //编辑业务系统
    edit(data, index) {
      this.dialogData = this.setDialogData("编辑");
      this.editTableIndex = index;
      this.rowData = JSON.parse(JSON.stringify(data));
      // this.rowData = data;
      this.editHold = data;
      this.$refs.showDialog.showDialog("UpdateBusiness");
    },
    setApiType(data, index) {},
    async delete(data) {
      // this.$message({
      //   type: "success",
      //   message: 123,
      //   duration: 0
      // });
      // return;
      const _this = this;
      const parameter = { id: data.id };
      this.$confirm(`确认删除 "${data.value}" , 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        offset: "500"
      })
        .then(() => {
          api.ChartApiOption("Delete", parameter).then(dd => {
            this.$message({
              type: "success",
              message: dd.msg ? dd.msg : dd.errMsg
            });
            _this.GetPage();
            // this.getFilterByQueryStringFn(null);
          });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    },
    rowClick(row) {
      // this.defaultProps.forbidden = false;
      // this.roleData = row;
      // this.GetRoles(row);
    },
    //翻页事件
    flipOver(pageInfo) {
      // this.defaultProps.forbidden = true;
      // this.$refs.TreeView.setCheckedNodes();
      this.loadingLeft = true;
      setTimeout(() => {
        this.tabListData = pageData(this.SysBusinessListFilter, pageInfo);
        this.loadingLeft = false;
      }, 200);
      // this.pageInfo = pageInfo;
      // this.GetPage();
    },
    searchFilter(filterModel) {
      this.loadingLeft = true;
      this.filterModel = filterModel;
      setTimeout(() => {
        this.getFilterByQueryStringFn(filterModel.query, filterModel.query2);
        this.loadingLeft = false;
      }, 200);
    },
    addBusiness(data) {
      // this.dialogData = this.setDialogData("新增");
      // this.rowData = {
      //   isLogin: "true",
      //   isFixed: "true"
      // };
      // // this.rowData = { isFixed: [], isLogin: [] };
      // this.$refs.showDialog.showDialog("addBusiness");
    },
    actionMethods(name, action) {
      switch (name) {
        case "updateApi":
          this.dialogType = "updateApi";
          // this.dialogData = this.RefreshApiEntity;
          this.dialogData = this.setDialogDataUpdateApi("更新API");
          this.$refs.showDialog.showDialog("updateApi");
          break;
        case "setApiType":
          this.rowData = {};
          this.dialogType = "setApiType";
          this.dialogData = this.setDialogDataApi("选择API类型");
          this.$refs.showDialog.showDialog("setApiType");
          break;
        case "refresh":
          this.buttonList.map(item => {
            const arr = ["refresh"];
            arr.map(itt => {
              if (itt === item.name) {
                item.disabled = true;
              }
            });
          });
          this.dialogType = "refresh";
          this.GetPage();
          this.$message({
            type: "success",
            message: "刷新成功"
          });
          setTimeout(() => {
            this.buttonList.map(item => {
              const arr = ["refresh"];
              arr.map(itt => {
                if (itt === item.name) {
                  item.disabled = false;
                }
              });
            });
          }, 1500);
          break;
      }
    }
  },
  //监控data中的数据变化
  watch: {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
// .el-scrollbar__wrap{
//   margin-bottom: 0;
// }
//@import url(); 引入公共css类
</style>
