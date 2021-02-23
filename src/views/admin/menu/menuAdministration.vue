<!--  -->
<template>
  <div class="user-center">
    <!-- <Card class="operations-card">
      <Actions :action="buttonList" @actions="actionMethods"></Actions>
      <Filters
        :filter-entity="filterEntity"
        @searchFilter="searchFilter"
        @change="change"
        :border="false"
        :filterModel="filterModel"
      ></Filters>
    </Card> -->
    <div class="user-main">
      <Card class="user-list">
        <Actions :action="buttonList" @actions="actionMethods"></Actions>
        <TreeView
          :filterEntity="filterEntity[0]"
          ref="TreeViewLeft"
          :tree="treeEntityLeft"
          :defaultProps="defaultPropsLeft"
          :filterText.sync="filterText"
          title="菜单列表"
          @saveResource="saveResource"
          @checkedNodes="checkedNodes"
          @getNodeClick="getNodeClickLeft"
          :checkedData="setCheckedDataLeft"
          :UpdataTree="UpdataTreeLeft"
        ></TreeView>
      </Card>
      <Card class="user-permissions">
        <!-- listData暂没使用 -->
        <TreeView
          :filterEntity="filterEntityRight[0]"
          ref="TreeView"
          :tree="treeEntity"
          :defaultProps="defaultProps"
          title="角色设置"
          @saveResource="saveResource"
          @checkedNodes="checkedNodes"
          @getNodeClick="getNodeClick"
          @check="check"
          :checkedData="setCheckedData"
          :UpdataTree="UpdataTree"
        ></TreeView>
      </Card>
    </div>
    <FormDialog
      ref="showDialog"
      @ok="dialogOk"
      :dialogData="dialogData"
      :model="rowData"
    ></FormDialog>
  </div>
</template>

<script>
import { menu } from "./menu.js";
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
  name: "menuAdministration",
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
      dialogType: null, //弹窗类型
      treeClickData: null,
      treeClickDataLeft: null,
      roleData: null, //角色对象
      rowDataLeft: null,
      filterText: null,
      option: [], //菜单集合
      UpdataTree: {
        disabled: true
      },
      UpdataTreeLeft: {
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
      treeEntityLeft: [],
      tabHeards: {},
      dialogData: {},
      setCheckedData: [],
      setCheckedDataLeft: [],
      defaultProps: {
        label: "roleName",
        children: "children",
        nodeKey: "roleId",
        height: "670px",
        forbidden: true //默认禁用顶部按钮
        // parentId: null //存在父ID及过滤掉父级
      },
      defaultPropsLeft: {
        label: "resourceName",
        children: "children",
        nodeKey: "resourceId",
        showCheckbox: false,
        height: "560px"
      },
      rowData: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  mixins: [menu],
  //方法集合
  methods: {
    rowClick(row) {
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
      this.rowData = dd;
      this.treeClickData = dd;
    },
    getNodeClickLeft(dd) {
      this.rowData = { ...dd };
      this.rowDataLeft = { ...dd }; //暂存修改对象
      this.treeClickDataLeft = dd;
      this.buttonList[1].disabled = false;
      this.buttonList[2].disabled = false;
      this.buttonList[3].disabled = false;
      this.defaultProps.forbidden = false;
      api.Resource("GetRoles", { id: dd.resourceId }).then(dd => {
        this.setCheckedData = dd.data;
      });
    },
    //树形切换未单选
    check(i, j) {
      this.treeClickData = [i];
      this.setCheckedData = [i];
    },
    checkedNodes(dd) {
      this.treeClickData = dd;
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
        case "addMenu":
          this.dialogType = "addMenu";
          this.addMenu();
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
          this.buttonList[4].disabled = true;
          this.dialogType = "refresh";
          this.GetPage();
          this.GetRolePage();
          this.$message({
            type: "success",
            message: "刷新成功"
          });
          setTimeout(() => {
            this.buttonList[4].disabled = false;
          }, 1500);
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
      }
    },

    //顶级
    addResource() {
      this.rowData = { resourceParentId: "root", resourceParentName: "ROOT" };
      console.log(this.dialogData);
      this.dialogData = this.setDialogResource("addResource", this.option); //顶级资源
      this.$refs.showDialog.showDialog("addResource");
    },
    //自己
    addSubsetResource() {
      this.rowData = {
        resourceParentId: this.treeClickDataLeft.resourceId,
        resourceParentName: this.treeClickDataLeft.resourceName
      };
      // console.log(this.rowData);
      this.dialogData = this.setDialogResource(
        "addSubsetResource",
        this.option
      ); //顶级资源
      this.$refs.showDialog.showDialog("addSubsetResource");
    },
    saveResource() {
      const parameter = {
        resource: this.treeClickDataLeft,
        roles: this.treeClickData
      };
      api.Resource("SetRoles", parameter).then(dd => {
        this.$message({
          type: "success",
          message: dd.msg ? dd.msg : dd.errMsg
        });
      });
    },
    //翻页事件
    flipOver(pageInfo) {
      this.$refs.TreeView.setCheckedNodes();
      this.pageInfo = pageInfo;
      this.GetPage();
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
      this.$confirm("确认删除用户, 是否继续?", "提示", {
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
    //新增左侧菜单
    addMenu(data) {
      // this.dialogData = this.setDialogData("新增");
      this.rowData = { resourceParentId: "root", resourceParentName: "ROOT" };
      this.dialogData = this.setDialogResource("addResource", null); //顶级资源
      // console.log(this.dialogData);
      this.$refs.showDialog.showDialog("addMenu");
    },
    //删除角色权限
    deleteResource() {
      const parameter = { id: this.treeClickDataLeft.resourceId };
      this.$confirm(
        `确认删除 "${this.treeClickDataLeft.resourceName}" , 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          offset: "500"
        }
      )
        .then(() => {
          api.Resource("Delete", parameter).then(dd => {
            this.$message({
              type: "success",
              message: dd.msg ? dd.msg : dd.errMsg
            });
            this.buttonList[1].disabled = true;
            this.buttonList[2].disabled = true;
            this.buttonList[3].disabled = true;
            this.$refs.TreeViewLeft.remove(this.treeClickDataLeft.resourceId);
          });
        })
        .catch(() => {});
    },
    //根据角色获取权限
    Get(dp) {
      api.Resource("Get", { id: dp.roleId }).then(dd => {
        // this.treeEntity = listToTree("resourceId", "resourceParentId", dd.data);
      });
    },
    //修改资源
    Update() {
      console.log("修改资源");
      // this.rowData = {
      //   resourceParentId: this.treeClickData.resourceId,
      //   resourceParentName: this.treeClickData.resourceName
      // };
      // this.rowData = this.rowDataLeft;
      this.dialogData = this.UpdateDialogResource("Update", this.option); //顶级资源
      console.log(this.dialogData);
      this.$refs.showDialog.showDialog("Update");
    },
    async addMenuPut(model) {
      debugger;
      api.Resource("Add", model).then(dd => {
        console.log(dd);
        // let msg, msgType;
        // if (dd.text) {
        //   msg = dd.text.response.data.errMsg;
        //   msgType = "error";
        // } else {
        //   this.$refs.TreeView.insertBefore(dd.data, model.resourceParentId);
        //   msg = dd.msg;
        //   msgType = "success";
        // }
        // this.$message({
        //   type: msgType,
        //   message: msg
        // });
      });
    },
    //获取资源//GetList
    async GetPage() {
      // console.log(22);
      const aw = await api.Resource("GetList", null);
      const dd = aw.data.map(item => ({
        ...item,
        customLable: `${item.resourceName}(${item.resourceCode})`
      }));
      // this.GetRel(aw.data.items[0].userId);
      // this.pageInfo = aw.data.pageInfo;
      this.treeEntityLeft = listToTree("resourceId", "resourceParentId", dd);
    },
    //设置首页
    setIndex() {
      api.ChartModule("getPageList", null).then(dd => {
        const option = (this.option = dd.data.items.map(item => ({
          label: item.moduleName,
          value: item.moduleId
        })));
      });
    },
    //添加资源
    ResourcesAdd(parameter) {
      api.Resource("Add", parameter).then(dd => {
        let msg, msgType;
        if (dd.text) {
          msg = dd.text.response.data.errMsg;
          msgType = "error";
        } else {
          this.$refs.TreeViewLeft.insertBefore(
            dd.data,
            parameter.resourceParentId
          );
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
      if (dd.typeName === "addMenu") {
        this.addMenuPut(dd.model);
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
        api.Resource("Update", dd.model).then(data => {
          this.$message({
            type: "success",
            message: data.msg ? data.msg : data.errMsg
          });
          // this.treeEntityLeft.forEach((item, idx) => {
          //   if (item.resourceId === data.data.resourceId) {
          //     console.log("item", item);
          //     // item = data.data;
          //     this.$set(this.treeEntityLeft, idx, data.data);
          //   } else {
          //     // this.$set(this.rowData, item.key, "");
          //   }
          // });
          this.updateMenuChild(this.treeEntityLeft, data);
          // console.log("treeEntityLeft", this.treeEntityLeft);
          // console.log("data", data.data);
          this.treeClickDataLeft = data.data;
          // console.log("dd.resourceId:", dd.model.resourceId);
          // console.log("dd.model:", dd.model);
          // this.$refs.TreeViewLeft.updateKeyChildren(
          //   dd.model.resourceId, [dd.model]);
        });
      } else if (dd.typeName === "UpdateUser") {
        console.log(4);
      }
    },
    //获取角色列表
    GetRolePage() {
      api.Role("GetList", {}).then(dd => {
        // this.treeEntity = listToTree("roleId", "resourceParentId", dd.data);
        this.treeEntity = dd.data;
      });
    },
    //获取单用户角色列表
    GetRoles(row) {
      api.User("GetRoles", { id: row.userId }).then(dd => {
        this.setCheckedData = dd.data;
      });
    },
    searchFilter(filterModel) {
      this.filterText = filterModel;
    },
    change(dd) {
      this.filterText = dd;
    },
    setFilterEntity() {
      return [
        {
          label: "菜单名字",
          key: "resourceName",
          type: "string",
          placeholder: "请输入"
        }
        // {
        //   label: "按输入字符查询",
        //   key: "query2",
        //   type: "string",
        //   placeholder: "编码或名称"
        // },
        // {
        //   label: "按输入字符查询",
        //   key: "query3",
        //   type: "string",
        //   placeholder: "编码或名称"
        // }
      ];
    },
    setFilterEntityRight() {
      return [
        {
          label: "菜单名字",
          key: "roleName",
          type: "string",
          placeholder: "请输入"
        }
        // {
        //   label: "按输入字符查询",
        //   key: "query2",
        //   type: "string",
        //   placeholder: "编码或名称"
        // },
        // {
        //   label: "按输入字符查询",
        //   key: "query3",
        //   type: "string",
        //   placeholder: "编码或名称"
        // }
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
    this.filterEntityRight = this.setFilterEntityRight();
    this.tabHeards = this.setTabHeards();
    this.dialogData = this.setDialogData();
    // this.treeEntity = listToTree("id", "parentId", this.setTreeEntity());
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.GetPage();
    // this.GetResources();
    this.setIndex(); //绑定菜单选项
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
