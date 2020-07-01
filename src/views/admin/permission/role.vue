<!--  -->
<template>
  <div class="user-center">
    <Card class="operations-card">
      <Actions :action="buttonList" @actions="actionMethods"></Actions>
      <Filters
        :filter-entity="filterEntity"
        @searchFilter="searchFilter"
        :border="true"
        :showSearch="true"
        :filterModel="filterModel"
      ></Filters>
    </Card>
    <div class="user-main">
      <Card class="user-list">
        <TableView
          :tableHeader="tabHeards"
          :listTableData="tabListData"
          @rowClick="rowClick"
          @listActions="listActions"
          title="功能角色列表"
        ></TableView>
      </Card>
      <Card class="user-permissions">
        <TreeView
          :tree="treeEntity"
          :defaultProps="defaultProps"
          :listData.sync="rowData"
          title="资源权限设置"
          :checkedData="setCheckedData"
        ></TreeView>
      </Card>
    </div>
    <FormDialog ref="showDialog" @ok="dialogOk" :dialogData="dialogData" :model="rowData"></FormDialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import "element-ui/lib/theme-chalk/index.css";
import { Card } from "element-ui";
import { listToTree } from "../../../until/listToTree.js";
const TreeView = () => import("@components/Admin/treeEntity.vue");
const TableView = () => import("@components/Admin/tableListEntity.vue");
const Actions = () => import("@components/Admin/actions.vue");
const Filters = () => import("@components/Admin/filterEntity.vue");
const FormDialog = () => import("@components/Admin/form-dialog.vue");
export default {
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
      buttonList: [],
      filterEntity: [],
      filterModel: {},
      treeEntity: [],
      tabHeards: {},
      tabListData: [],
      dialogData: {},
      setCheckedData: [],
      defaultProps: {
        label: "name"
      },
      rowData: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    rowClick(row) {
      this.rowData = row;
      this.setCheckedData = [
        {
          id: "1_1",
          parentId: 1,
          name: "界面编辑1"
        },
        {
          id: "3_1",
          parentId: 3,
          name: "接口信息"
        }
      ];
    },
    actionMethods(name, action) {
      switch (name) {
        case "addUser":
          this.addUser();
          break;
        case "userList":
          this.sendPay();
          break;
        case "addRole":
          this.addRole();
          break;
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
      }
    },

    addUser() {
      this.rowData = {};
      this.dialogData = this.setDialogData();
      this.$refs.showDialog.showDialog();
    },

    detail(data) {
      alert(`我点了第${data.id}行的查看`);
    },

    edit(data) {
      this.dialogData = this.setDialogData();
      this.rowData = data;
      this.$refs.showDialog.showDialog();
    },

    addRole(data) {
      this.rowData = {};
      this.$refs.showDialog.showDialog();
    },
    dialogOk(model) {
      console.log(model);
    },
    searchFilter(filterModel) {
      console.log(filterModel);
    },
    setViewActions() {
      return [
        {
          name: "addUser",
          label: "添加顶级资源",
          icon: "el-icon-circle-plus-outline",
          disabled: false,
          hidden: false
        },

        {
          name: "userList",
          label: "添加子资源",
          icon: "el-icon-search",
          disabled: false
        },
        {
          name: "addRole",
          label: "添加角色",
          icon: "el-icon-circle-plus-outline",
          disabled: false,
          hidden: false
        },
        {
          name: "refresh",
          label: "刷新",
          icon: "el-icon-refresh",
          disabled: false
        }
      ];
    },
    setFilterEntity() {
      return [
        {
          label: "状态",
          key: "state",
          type: "select",
          options: [
            { label: "全部", value: "" },
            { label: "已启用", value: "1" },
            { label: "未启用", value: "0" }
          ]
        },
        {
          label: "按输入字符查询",
          key: "query",
          type: "string",
          placeholder: "编码或名称"
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
    },
    setTabHeards() {
      return {
        index: true,
        selected: true,
        border: false,
        fixed: true,
        showSummary: false,
        headerAlign: "center",
        operations: {
          label: "操作",
          actions: [
            {
              label: "编辑",
              name: "edit",
              type: "text",
              size: "small",
              icon: "el-icon-edit"
            }
          ]
        },
        hasSwitchs: [
          {
            label: "启用状态",
            key: "startState",
            activeColor: "#13ce66",
            inactiveColor: "#ff4949"
          }
        ],
        heards: [
          { label: "角色编码", key: "roleCode", width: 120, type: "string" },
          { label: "角色名称", key: "roleName", type: "string" },
          { label: "系统角色", key: "sysRole", type: "string" },
          { label: "创建时间", key: "createTime", type: "string" }
        ]
      };
    },
    setTabListData() {
      return [
        {
          id: 1,
          roleName: "业务处室长",
          roleCode: "13382517003",
          sysRole: "管理员",
          startState: true,
          createTime: "2019-12-17"
        },
        {
          id: 2,
          roleName: "业务处室",
          roleCode: "13382517003",
          sysRole: "管理员",
          startState: false,
          createTime: "2019-12-17"
        },
        {
          id: 3,
          roleName: "评审中心监管科科长",
          roleCode: "13382517003",
          sysRole: "管理员",
          startState: true,
          createTime: "2019-12-17"
        },
        {
          id: 4,
          roleName: "评审中心监管科",
          roleCode: "13382517003",
          sysRole: "管理员",
          startState: false,
          createTime: "2019-12-17"
        },
        {
          id: 5,
          roleName: "评审中心项目联系人",
          roleCode: "13382517003",
          sysRole: "用户",
          startState: false,
          createTime: "2019-12-17"
        },
        {
          id: 6,
          roleName: "评审中心项目",
          roleCode: "13382517003",
          sysRole: "管理员",
          startState: true,
          createTime: "2019-12-17"
        },
        {
          id: 7,
          roleName: "专家",
          roleCode: "13382517003",
          sysRole: "",
          startState: true,
          createTime: "2019-12-17"
        },
        {
          id: 8,
          roleName: "机构管理员",
          roleCode: "13382517003",
          sysRole: "",
          startState: false,
          createTime: "2019-12-17"
        }
      ];
    },
    setDialogData() {
      return {
        title: "新建用户",
        width: "600px",
        entity: [
          {
            label: "上级资源",
            key: "resource",
            clasName: "is-full",
            readonly: true
          },
          {
            label: "资源编码",
            key: "resourcecode",
            clasName: "is-full",
            rules: [
              { required: true, message: "资源编码不能为空", trigger: "blur" }
            ]
          },
          {
            label: "资源名称",
            key: "resourceName",
            rules: [{ required: true, message: "资源名称不能为空" }]
          }
        ]
      };
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.buttonList = this.setViewActions();
    this.filterEntity = this.setFilterEntity();
    this.tabHeards = this.setTabHeards();
    this.tabListData = this.setTabListData();
    this.dialogData = this.setDialogData();
    this.treeEntity = listToTree("id", "parentId", this.setTreeEntity());
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
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
