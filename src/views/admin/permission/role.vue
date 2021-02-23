<!--
 *                                                     __----~~~~~~~~~~~------___
 *                                    .  .   ~~//====......          __--~ ~~
 *                    -.            \_|//     |||\\  ~~~~~~::::... /~
 *                 ___-==_       _-~o~  \/    |||  \\            _/~~-
 *         __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
 *     _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
 *   .~       .~       |   \\ -_    /  /-   /   ||      \   /
 *  /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 *  |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
 *           '         ~-|      /|    |-~\~~       __--~~
 *                       |-~~-_/ |    |   ~\_   _-~            /\
 *                            /  \     \__   \/~                \__
 *                        _--~ _/ | .-~~____--~-/                  ~~==.
 *                       ((->/~   '.|||' -_|    ~~-/ ,              . _||
 *                                  -_     ~\      ~~---l__i__i__i--~~_/
 *                                  _-~-__   ~)  \--______________--~~
 *                                //.-~~~-~_--~- |-------~~~~~~~~
 *                                       //.-~~~--\
 *                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *                               神兽保佑            永无BUG
 -->

<!--  -->
<template>
  <div class="user-center">
    <!-- <Card class="operations-card">
      <Actions :action="buttonList" @actions="actionMethods"></Actions>
      <Filters
        :filter-entity="filterEntity"
        @searchFilter="searchFilter"
        border
        showSearch
        :filterModel="filterModel"
      ></Filters>
    </Card> -->
    <div class="user-main">
      <Card class="user-list">
        <Actions :action="buttonList" @actions="actionMethods"></Actions>
        <Filters
          :filter-entity="filterEntity"
          @change="searchFilter"
          border
          :filterModel="filterModel"
        ></Filters>
        <TableView
          :tableHeader="tabHeards"
          :listTableData="tabListData"
          :loading="loadingLeft"
          :pageInfo="pageInfo"
          @flipOver="flipOver"
          @rowClick="rowClick"
          @listActions="listActions"
          title="功能角色列表"
        ></TableView>
      </Card>
      <Card class="user-permissions">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="菜单列表" name="menus">
            <TreeView
              :filterEntity="filterEntityRight[0]"
              ref="TreeView"
              :tree="treeEntity"
              :defaultProps="defaultProps"
              :listData.sync="rowData"
              title="资源权限设置"
              @saveResource="saveResource"
              @checkedNodes="checkedNodes"
              @getNodeClick="getNodeClick"
              :checkedData="setCheckedData"
              :UpdataTree="UpdataTree"
            ></TreeView
          ></el-tab-pane>
          <el-tab-pane label="用户列表" name="users">
            <!-- <TableView
              ref="TreeViewUsers"
              :tableHeader="tabHeardsRight"
              :listTableData="tabListDataRight"
              :loading="loadingUsers"
              :pageInfo="pageInfoUsers"
              :UpdataTable="UpdataTable"
              :isSetUsers.sync="isSetUsers"
              @flipOver="flipOverUsers"
              @chenckArr="chenckArr"
              @clearChoice="clearChoice"
              title="用户列表"
            ></TableView> -->
            <TableView
              ref="TreeViewUsers"
              :tableHeader="tabHeardsRight"
              :listTableData="tabListDataRight"
              :loading="loadingUsers"
              :pageInfo="pageInfoUsers"
              :UpdataTable="UpdataTable"
              :isSetUsers.sync="isSetUsers"
              @flipOver="flipOverUsers"
              @chenckArr="chenckArr"
              @clearChoice="clearChoice"
              title="用户列表"
            ></TableView>
          </el-tab-pane>
        </el-tabs>
      </Card>
    </div>
    <FormDialog
      ref="showDialog"
      @ok="dialogOk"
      :dialogData="dialogData"
      :model="rowData"
    ></FormDialog>
    <Dialog
      :title="roleMessage.roleName"
      ref="customizationDialog"
      width="80%"
      top="10vh"
      :visible.sync="sysShwo"
      modal-append-to-body
      append-to-body
      lock-scroll
    >
      <relatedBusiness
        :roleMessage="roleMessage"
        class="maxHight"
      ></relatedBusiness>
      <!-- <div slot="footer" class="dialog-footer">
        <Button @click="close">关闭</Button>
      </div> -->
    </Dialog>
  </div>
</template>

<script>
import { role } from "./role.js";
import { roleFilter } from "./roleFilter.js";
import { getFilterByQueryStringFn, pageData } from "@/until/filter";
import api from "@api/api.js";
import "element-ui/lib/theme-chalk/index.css";
import { Card, Dialog } from "element-ui";
import { listToTree } from "../../../until/listToTree.js";
const TreeView = () => import("@components/Admin/treeEntity.vue");
const TableView = () => import("@components/Admin/tableListEntity.vue");
const Actions = () => import("@components/Admin/actions.vue");
const Filters = () => import("@components/Admin/filterEntity.vue");
const FormDialog = () => import("@components/Admin/form-dialog.vue");
const relatedBusiness = () =>
  import("@components/customMade/relatedBusiness.vue");
export default {
  name: "role",
  //import引入的组件需要注入到对象中才能使用
  components: {
    TreeView,
    TableView,
    Card,
    Filters,
    FormDialog,
    Actions,
    relatedBusiness,
    Dialog
  },

  data() {
    //这里存放数据
    return {
      sysShwo: false,
      roleMessage: [],
      activeName: "menus", //标签页初始位置
      dialogType: null, //弹窗类型
      treeClickData: null,
      treeCheckedData: null, //选中对象
      option: [], //菜单集合
      roleData: null, //角色对象
      loadingLeft: true,
      loadingUsers: false,
      UpdataTree: {
        disabled: true
      },
      UpdataTable: {
        disabled: true
      },
      resourceParent: {
        pid: "root",
        pname: "Root"
      }, //选中列id
      pageInfoUsers: {
        pageIndex: 1,
        pageSize: 10
      },
      pageInfo: {
        pageIndex: 1,
        pageSize: 10
        // totalCount: 7,
        // totalPage: 1setCheckedData
      },
      buttonList: [],
      filterEntity: [],
      filterModel: {},
      treeEntity: [],
      tabHeards: {},
      tabHeardsRight: {},
      tabListData: [],
      tabListDataRight: [],
      isSetUsers: true, //翻页判断数据发生更改是否提交
      dialogData: {},
      setCheckedData: [],
      defaultProps: {
        label: "resourceName",
        children: "children",
        nodeKey: "resourceId",
        parentId: "resourceParentId",
        forbidden: true //默认禁用顶部按钮
      },
      rowData: {},
      rowDataRight: {} //暂存修改对象,防止新增清空
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // listTableData(a) {
    //   console.log(a);
    // }
  },
  mixins: [role, roleFilter],
  //方法集合
  methods: {
    clearChoice() {
      this.tabListDataRight = [...this.tabListDataRight];
    },
    formatting(val) {
      this.tabListDataRight.map(item => {
        item.checked = val.some(itt => itt.userId === item.userId);
      });
      const params = {
        role: this.roleData,
        users: this.tabListDataRight
      };
      api.User("SetUsers", params).then(dd => {
        this.$message({
          type: "success",
          message: dd.msg
        });
      });
      this.isSetUsers = true;
    },
    //角色获取用户
    GetUsers(row) {
      this.loadingUsers = true;
      api.User("GetUsers", { id: row.roleId }).then(dd => {
        // const arr = [];
        // this.UserList.map(item => {
        //   arr.push({
        //     ...item,
        //     checked: dd.data.some(itt => itt.userId === item.userId)
        //   });
        // });
        // this.UserList = arr;
        this.UserList = dd.data;
        this.getFilterByQueryStringFnUsers(null);
        this.loadingUsers = false;
      });
    },
    chenckArr(val) {
      this.formatting(val);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    rowClick(row) {
      this.defaultProps.forbidden = false;
      this.UpdataTable.disabled = false;
      this.roleData = row;
      this.isSetUsers = true;
      this.GetResourcesRole(row);
      this.GetUsers(row);
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
      this.rowData = { ...dd };
      this.rowDataRight = { ...dd }; //暂存修改对象
      this.treeClickData = { ...dd };
      // this.buttonList[1].disabled = false;
      // this.buttonList[2].disabled = false;
      // this.buttonList[3].disabled = false;
    },
    checkedNodes(dd) {
      this.treeCheckedData = dd;
    },
    //获取用户列表,分页
    async GetPageUsers() {
      const aw = await api.User("GetPage", this.pageInfoUsers);
      // this.GetRel(aw.data.items[0].userId);
      this.pageInfoUsers = aw.data.pageInfo;
      //11/5取消勾选,初始不获取列表,点击角色获取,
      // this.tabListDataRight = aw.data.items;
      this.loadingUsers = false;
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
        case "addRole":
          this.dialogType = "addRole";
          this.addRole();
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
          // this.GetPage();//后端筛选
          this.GetList(); //左侧前端过滤
          this.pageInfo.pageIndex = 1;
          this.GetResources();
          this.$message({
            type: "success",
            message: "刷新成功"
          });
          setTimeout(() => {
            this.buttonList[1].disabled = false;
          }, 1500);
          break;
        case "setIndex":
          this.dialogType = "setIndex";
          this.setIndex();
          break;
      }
    },

    listActions(rowData, name) {
      switch (name) {
        case "delete":
          this.delete(rowData);
          break;
        case "edit":
          this.edit(rowData);
          break;
        case "relevance":
          this.relevance(rowData);
          break;
      }
    },

    addResource() {
      this.rowData = { resourceParentId: "root", resourceParentName: "ROOT" };
      this.dialogData = this.setDialogResource("addResource", this.option); //顶级资源
      this.$refs.showDialog.showDialog("addResource");
    },
    addSubsetResource() {
      this.rowData = {
        resourceParentId: this.treeClickData.resourceId,
        resourceParentName: this.treeClickData.resourceName
      };
      this.dialogData = this.setDialogResource(
        "addSubsetResource",
        this.option
      ); //顶级资源
      this.$refs.showDialog.showDialog("addSubsetResource");
    },
    saveResource() {
      const parameter = {
        role: this.roleData,
        resources: this.treeCheckedData
      };
      api.Role("SetResources", parameter).then(dd => {
        this.$message({
          type: "success",
          message: dd.msg ? dd.msg : dd.errMsg
        });
      });
    },
    //翻页事件
    flipOver(pageInfo) {
      this.UpdataTable.disabled = true; //翻页禁用右侧
      this.$refs.TreeView.setCheckedNodes();
      this.loadingLeft = true;
      setTimeout(() => {
        this.tabListData = pageData(this.RoleListFilter, pageInfo);
        this.loadingLeft = false;
      }, 200);
      // this.pageInfo = pageInfo;
      // this.GetPage();
    },
    //翻页事件
    flipOverUsers(pageInfo) {
      const _this = this;
      if (!this.isSetUsers && this.roleData != null) {
        this.$confirm("监测到数据发生更改未保存, 是否自动保存?", "提示", {
          confirmButtonText: "保存",
          cancelButtonText: "取消",
          type: "warning",
          offset: "500"
        })
          .then(() => {
            _this.$refs.TreeViewUsers.submitChoice();
            _this.loadingUsers = true;
            setTimeout(() => {
              this.tabListDataRight = pageData(this.UserListFilter, pageInfo);
              this.loadingUsers = false;
            }, 200);
          })
          .catch(() => {
            _this.loadingUsers = true;
            setTimeout(() => {
              this.tabListDataRight = pageData(this.UserListFilter, pageInfo);
              this.loadingUsers = false;
            }, 200);
          });

        _this.isSetUsers = !_this.isSetUsers;
      } else {
        this.loadingUsers = true;
        setTimeout(() => {
          this.tabListDataRight = pageData(this.UserListFilter, pageInfo);
          this.loadingUsers = false;
        }, 200);
      }
      _this.$refs.TreeViewUsers.isCheck = false;
    },
    async delete(data) {
      // this.$message({
      //   type: "success",
      //   message: 123,
      //   duration: 0
      // });
      // return;
      const _this = this;
      const parameter = { id: data.roleId };
      this.$confirm("确认删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        offset: "500"
      }).then(() => {
        api.Role("Delete", parameter).then(dd => {
          this.$message({
            type: "success",
            message: dd.msg ? dd.msg : dd.errMsg
          });
          _this.GetPage();
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
    edit(data) {
      this.dialogData = this.setDialogData("编辑");
      this.rowData = data;
      this.$refs.showDialog.showDialog("UpdateUser");
    },
    close() {
      this.sysShwo = false;
    },
    //关联业务系统
    relevance(data) {
      console.log(data);
      this.sysShwo = true;
      this.roleMessage = data;
      // this.$refs.customizationDialog.showDialog("addResource");
    },
    handleClose() {},
    addRole(data) {
      this.dialogData = this.setDialogData("新增");
      this.rowData = {};
      this.$refs.showDialog.showDialog("addRole");
    },
    //删除角色权限
    deleteResource() {
      const parameter = { id: this.treeClickData.resourceId };
      this.$confirm(
        `确认删除 "${this.treeClickData.resourceName}" , 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          offset: "500"
        }
      ).then(() => {
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
      console.log("修改资源");
      this.rowData = this.rowDataRight;
      this.dialogData = this.UpdateDialogResource("Update", this.option); //顶级资源
      this.$refs.showDialog.showDialog("Update");
    },
    //设置首页
    setIndex() {
      api.ChartModule("GetPage", null).then(dd => {
        const option = (this.option = dd.data.items.map(item => ({
          label: item.moduleName,
          value: item.moduleId
        })));
      });
    },
    async addRolePut(model) {
      api.Role("Add", model).then(dd => {
        this.$message({
          type: "success",
          message: dd.msg
        });
        this.RoleList.unshift(dd.data);
        this.pageInfo.totalCount++;
        this.getFilterByQueryStringFn(null);

        // this.GetPage();
      });
    },
    //获取资源
    async GetPage() {
      const aw = await api.Role("GetPage", this.pageInfo);
      // this.GetRel(aw.data.items[0].userId);
      this.pageInfo = aw.data.pageInfo;
      this.tabListData = aw.data.items;
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
    dialogOk(dd) {
      console.log(dd);
      if (dd.typeName === "addRole") {
        this.addRolePut(dd.model);
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
        api.Role("Update", dd.model).then(dd => {
          this.$message({
            type: "success",
            message: dd.msg ? dd.msg : dd.errMsg
          });
        });
      } else if (dd.typeName === "setIndex") {
        console.log(dd);
        // this.setIndex()
        api.Resource("Update", dd.model).then(dd => {
          this.$message({
            type: "success",
            message: dd.msg ? dd.msg : dd.errMsg
          });
        });
      }
    },
    //获取所有权限列表
    GetResources() {
      api.Resource("GetList", {}).then(dd => {
        // this.treeEntity = dd.data;
        this.treeEntity = listToTree("resourceId", "resourceParentId", dd.data);
      });
    },
    //获取单角色权限列表
    GetResourcesRole(row) {
      api.Role("GetResources", { id: row.roleId }).then(dd => {
        this.setCheckedData = dd.data;
      });
    },
    searchFilter(filterModel) {
      this.loadingLeft = true;
      setTimeout(() => {
        this.getFilterByQueryStringFn(filterModel.query);
        this.loadingLeft = false;
      }, 200);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.buttonList = this.setViewActions();
    this.filterEntity = this.setFilterEntity();
    this.tabHeards = this.setTabHeards();
    this.tabHeardsRight = this.setTabHeardsRight();
    // this.tabListData = this.setTabListData();
    this.dialogData = this.setDialogData();
    this.filterEntityRight = this.setFilterEntityRight();
    // this.treeEntity = listToTree("id", "parentId", this.setTreeEntity());
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.GetPage();
    // this.GetPageUsers();
    //一对多,初始不获取右侧用户列表
    // this.GetListUser();
    this.GetList();
    this.setIndex(); //绑定菜单选项

    this.GetResources();
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
.maxHight {
  max-height: 70vh;
  overflow: auto;
}
</style>
