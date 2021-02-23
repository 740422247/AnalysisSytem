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
          @flipOver="flipOver"
          @rowClick="rowClick"
          @listActions="listActions"
          title="用户列表"
        ></TableView>
      </Card>
      <Card class="user-permissions">
        <!-- listData暂没使用 -->
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
          @check="check"
          :checkedData="setCheckedData"
          :choiceData="setChoiceData"
          :UpdataTree="UpdataTree"
        ></TreeView>
      </Card>
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
import { user } from "./user.js";
import { userFilter } from "./userFilter.js";
import { getFilterByQueryStringFn, pageData } from "@/until/filter";
import api from "@api/api.js";
import "element-ui/lib/theme-chalk/index.css";
import { Card } from "element-ui";
import { listToTree } from "../../../until/listToTree.js";
const TreeView = () => import("@components/Admin/treeEntity.vue");
const TableView = () => import("@components/Admin/tableListEntity.vue");
const Actions = () => import("@components/Admin/actions.vue");
const Filters = () => import("@components/Admin/filterEntity.vue");
const FormDialog = () => import("@components/Admin/form-dialog.vue");
export default {
  name: "user",
  //import引入的组件需要注入到对象中才能使用
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
      setChoiceData: [],
      dialogType: null, //弹窗类型
      treeClickData: null,
      treeCheckedData: null, //选中对象
      roleData: null, //角色对象
      loadingLeft: true,
      UpdataTree: {
        disabled: true
      },
      resourceParent: {
        pid: "root",
        pname: "Root"
      }, //选中列id
      pageInfo: {
        pageIndex: 1,
        pageSize: 10
        // totalCount: 7,
        // totalPage: 1
      },
      buttonList: [],
      filterEntity: [],
      filterModel: {},
      treeEntity: [],
      tabHeards: {},
      tabListData: [],
      dialogData: {},
      setCheckedData: [],
      editTableIndex: 0, //暂存点击编辑按钮的index
      defaultProps: {
        label: "roleName",
        children: "children",
        nodeKey: "roleId",
        // showCheckbox: false,
        height: "650px",
        forbidden: true //默认禁用顶部按钮
      },
      test: {}, //测试,待删除
      rowData: { group: [] },
      rowDataRight: {} //暂存修改对象,防止新增清空
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  mixins: [user, userFilter],
  //方法集合
  methods: {
    rowClick(row) {
      this.defaultProps.forbidden = false;
      this.roleData = row;
      this.GetRoles(row);
      // this.GetRel(row.roleId);
      // this.rowData = row;
      // this.setCheckedData = [
      //   {
      //     id: "1_1",
      //     parentId: 1,
      //     name: "界面编辑1"
      //   },
      //   {
      //     id: "3_1",
      //     parentId: 3,
      //     name: "接口信息"
      //   }
      // ];
    },
    getNodeClick(dd) {
      // this.rowData = { ...dd };
      // this.rowDataRight = { ...dd }; //暂存修改对象
      this.treeClickData = { ...dd };
      // this.buttonList[1].disabled = false;
      // this.buttonList[2].disabled = false;
      // this.buttonList[3].disabled = false;
    },
    checkedNodes(dd) {
      // this.setChoiceData = [];
      this.setCheckedData = dd;
    },
    check(i, j) {
      this.treeClickData = [i];
      this.setCheckedData = [i];
    },
    actionMethods(name, action) {
      switch (name) {
        case "addResource":
          this.dialogType = "addResource";
          this.addResource();
          break;
        case "addSubsetResource": //子集资源
          this.dialogType = "addSubsetResource";
          this.addSubsetResource();
          break;
        case "addUser":
          this.dialogType = "addUser";
          this.addUser();
          break;
        case "deleteResource":
          this.deleteResource();
          break;
        case "Update":
          this.dialogType = "Update";
          this.Update();
          break;
        case "UpdateUser":
          this.dialogType = "UpdateUser";
          this.UpdateUser();
          break;
        case "refresh":
          this.buttonList[1].disabled = true;
          this.dialogType = "refresh";
          // this.GetPage();
          this.GetList();
          this.GetRolePage();
          this.$message({
            type: "success",
            message: "刷新成功"
          });
          setTimeout(() => {
            this.buttonList[1].disabled = false;
          }, 1500);
          break;
      }
    },

    listActions(rowData, name, index) {
      switch (name) {
        case "delete":
          this.delete(rowData);
          break;
        case "edit":
          this.edit(rowData, index);
          break;
      }
    },

    addResource() {
      this.rowData = { resourceParentId: "root", resourceParentName: "ROOT" };
      this.dialogData = this.setDialogResource("addResource", null); //顶级资源
      this.$refs.showDialog.showDialog("addResource");
    },
    addSubsetResource() {
      this.rowData = {
        resourceParentId: this.treeClickData.resourceId,
        resourceParentName: this.treeClickData.resourceName
      };
      this.dialogData = this.setDialogResource(
        "addSubsetResource",
        this.rowData
      ); //顶级资源
      this.$refs.showDialog.showDialog("addSubsetResource");
    },
    saveResource() {
      const parameter = {
        user: this.roleData,
        roles: this.treeClickData
      };
      api.User("SetRoles", parameter).then(dd => {
        this.$message({
          type: "success",
          message: dd.msg ? dd.msg : dd.errMsg
        });
      });
    },
    //翻页事件
    flipOver(pageInfo) {
      this.defaultProps.forbidden = true;
      this.$refs.TreeView.setCheckedNodes();
      this.loadingLeft = true;
      setTimeout(() => {
        this.tabListData = pageData(this.UserListFilter, pageInfo);
        this.loadingLeft = false;
      }, 200);
      // this.pageInfo = pageInfo;
      // this.GetPage();
    },
    async delete(data) {
      // this.$message({
      //   type: "success",
      //   message: 123,
      //   duration: 0
      // });
      // return;
      const _this = this;
      const parameter = { id: data.userId };
      this.$confirm(`确认删除 "${data.userName}" , 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        offset: "500"
      }).then(() => {
        api.User("Delete", parameter).then(dd => {
          this.$message({
            type: "success",
            message: dd.msg ? dd.msg : dd.errMsg
          });
          // _this.GetPage();
          _this.GetList();
          // this.tabListData = pageData(items, this.pageInfo);
        });
      });
      // .catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "已取消删除"
      //   });
      // });
    },
    //编辑角色
    edit(data, index) {
      data.avatar = Array.isArray(data.avatar) ? data.avatar : [data.avatar];
      this.dialogData = this.setDialogData("编辑");
      this.editTableIndex = index;
      this.test = data;
      this.rowData = JSON.parse(JSON.stringify(data));
      console.log(index);
      // this.rowData = data;
      this.$refs.showDialog.showDialog("UpdateUser");
    },

    addUser(data) {
      this.dialogData = this.setDialogData("新增");
      this.rowData = {};
      this.$refs.showDialog.showDialog("addUser");
    },
    //删除角色权限
    deleteResource() {
      const parameter = { id: this.treeClickData.resourceId };
      this.$confirm("确认删除该资源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        offset: "500"
      }).then(() => {
        api.Resource("Delete", parameter).then(dd => {
          this.$message({
            type: "success",
            message: dd.msg ? dd.msg : dd.errMsg
          });
          this.buttonList[1].disabled = true;
          this.buttonList[2].disabled = true;
          this.buttonList[3].disabled = true;
          this.$refs.TreeView.remove(this.treeClickData.resourceId);
        });
      });
    },
    //根据角色获取权限
    Get(dp) {
      api.Resource("Get", { id: dp.roleId }).then(dd => {
        // this.treeEntity = listToTree("resourceId", "resourceParentId", dd.data);
      });
    },
    //修改资源
    Update() {
      // this.rowData = {
      //   resourceParentId: this.treeClickData.resourceId,
      //   resourceParentName: this.treeClickData.resourceName
      // };
      console.log(this.rowData);
      this.dialogData = this.UpdateDialogResource("Update", this.treeClickData); //顶级资源
      this.$refs.showDialog.showDialog("Update");
    },
    async addUserPut(model) {
      api.User("Add", model).then(dd => {
        this.$message({
          type: "success",
          message: dd.msg
        });
        this.UserList.unshift(dd.data);
        this.pageInfo.totalCount++;
        this.getFilterByQueryStringFn(null);

        // this.GetPage();
      });
    },
    //获取资源
    async GetPage() {
      const aw = await api.User("GetPage", this.pageInfo);
      console.log(aw.data.items);
      // this.GetRel(aw.data.items[0].userId);
      this.pageInfo = aw.data.pageInfo;
      this.tabListData = aw.data.items;
      // this.loadingLeft = false;
    },
    //添加资源
    ResourcesAdd(parameter) {
      api.Resource("Add", parameter).then(dd => {
        let msg, msgType;
        if (dd.text) {
          msg = dd.text.response.data.errMsg;
          msgType = "error";
        } else {
          this.$refs.TreeView.insertBefore(dd.data, parameter.resourceParentId);
          msg = dd.msg;
          msgType = "success";
        }
        this.$message({
          type: msgType,
          message: msg
        });
      });
    },
    dialogOk(data) {
      // console.log("dataL:", data);
      const dd = JSON.parse(JSON.stringify(data));
      // const dd = data;

      const avatar = data.model.avatar[0];
      dd.model.avatar = avatar;
      if (dd.typeName === "addUser") {
        this.addUserPut(dd.model);
      } else if (
        dd.typeName === "addResource" ||
        dd.typeName === "addSubsetResource"
      ) {
        const parameter = {
          role: {
            roleId: this.resourceParent.pid,
            roleName: this.resourceParent.pname
          },
          resources: [dd.model]
        };
        this.ResourcesAdd(dd.model);
      } else if (dd.typeName === "Update") {
        api.Resource("Update", dd.model).then(dd => {
          this.$message({
            type: "success",
            message: dd.msg ? dd.msg : dd.errMsg
          });
        });
      } else if (dd.typeName === "UpdateUser") {
        console.log(4);
        api.User("Update", dd.model).then(dd => {
          this.$message({
            type: "success",
            message: dd.msg ? dd.msg : dd.errMsg
          });
          // for (var key in this.test) {
          //   this.$set(this.test, key, dd.data[key]);
          // }
          // this.test = Object.assign(this.test, dd.data)
          dd.avatar = [dd.avatar];
          const obj = dd.data;
          this.$set(this.tabListData, this.editTableIndex, obj);
        });
      }
    },
    //获取角色列表
    GetRolePage() {
      api.Role("GetList", {}).then(dd => {
        // this.treeEntity = listToTree("roleId", "resourceParentId", dd.data);
        this.treeEntity = dd.data;
        // 角色设置禁止勾选;
        // this.treeEntity = dd.data.map(item => ({
        //   ...item,
        //   disabled: true
        // }));
      });
    },
    //获取单用户角色列表
    GetRoles(row) {
      api.User("GetRoles", { id: row.userId }).then(dd => {
        this.setCheckedData = dd.data;
      });
    },
    searchFilter(filterModel) {
      this.loadingLeft = true;
      setTimeout(() => {
        this.getFilterByQueryStringFn(filterModel.query);
        this.loadingLeft = false;
      }, 200);
    },
    setFilterEntity() {
      return [
        // {
        //   label: "状态",
        //   key: "state",
        //   type: "select",
        //   options: [
        //     { label: "全部", value: "" },
        //     { label: "已启用", value: "1" },
        //     { label: "未启用", value: "0" }
        //   ]
        // },
        {
          label: "按输入字符查询",
          key: "query",
          type: "string",
          className: "is-2",
          placeholder: "登录名/昵称/编码"
        }
      ];
    },
    setTreeEntity() {
      return [
        {
          id: 1,
          parentId: 0,
          name: "界面编辑"
        },
        {
          id: "1_1",
          parentId: 1,
          name: "界面编辑1"
        },
        {
          id: "1_2",
          parentId: 1,
          name: "界面编辑2"
        },
        {
          id: 2,
          parentId: 0,
          name: "权限管理"
        },
        {
          id: "2_1",
          parentId: 2,
          name: "用户管理"
        },
        {
          id: "2_2",
          parentId: 2,
          name: "菜单管理"
        },
        {
          id: 3,
          parentId: 0,
          name: "接口信息管理"
        },
        {
          id: "3_1",
          parentId: 3,
          name: "接口信息"
        },
        {
          id: "3_2",
          parentId: 3,
          name: "接口信息配置"
        },
        {
          id: "3_3",
          parentId: 3,
          name: "接口信息配置111"
        }
      ];
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.buttonList = this.setViewActions();
    this.filterEntity = this.setFilterEntity();
    this.tabHeards = this.setTabHeards();
    // this.tabListData = this.setTabListData();
    this.dialogData = this.setDialogData();
    this.dialogData.entity &&
      this.dialogData.entity.forEach(item => {
        if (item.type === "checkbox" || item.type === "uploader") {
          this.$set(this.rowData, item.key, []);
        } else this.$set(this.rowData, item.key, "");
      });
    this.filterEntityRight = this.setFilterEntityRight();
    // this.treeEntity = listToTree("id", "parentId", this.setTreeEntity());
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.GetPage();
    this.GetList();
    // this.GetResources();
    this.GetRolePage();
  },
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
//@import url(); 引入公共css类
.user-main {
  display: flex;
}

.operations-card {
  margin: 16px;
}

.user-list {
  flex: 80 1 600px;
  margin: 16px;
}

.user-permissions {
  flex: 20 0 400px;
  margin: 16px;
}
</style>
