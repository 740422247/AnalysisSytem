<!--  -->
<template>
  <div class="user-center">
    <Card class="operations-card">
      <Actions :action="buttonList" @actions="actionMethods" align="left"></Actions>
      <Filters
        :filter-entity="filterEntity"
        @searchFilter="searchFilter"
        :border="true"
        :showSearch="true"
        :filterModel="filterModel"
        @change="change"
      ></Filters>
    </Card>
    <div class="user-main">
      <Card class="user-list">
        <TableView
          :tableHeader="tabHeards"
          :listTableData="tabListData"
          :pageInfo="pageInfo"
          @rowClick="rowClick"
          @listActions="listActions"
          title="用户列表"
        ></TableView>
      </Card>
      <Card class="user-permissions">
        <TreeView
          :tree="treeEntity"
          :defaultProps="defaultProps"
          :listData.sync="rowData"
          title="功能角色"
          @checkedNodes="getCheckedNodes"
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
import api from "@api/api.js";
import "element-ui/lib/theme-chalk/index.css";
import { Card } from "element-ui";
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
      pageInfo: {
        pageIndex: 1,
        pageSize: 5
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
      setCheckedData: [
        {
          id: 1,
          parentId: 0,
          name: "业务处室长"
        },
        {
          id: "1_1",
          parentId: 0,
          name: "业务处室"
        }
      ], // 获取勾后端返回的值
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
    // 行点击
    rowClick(row) {
      console.log(row);
      this.rowData = row;
      this.setCheckedData = [
        {
          id: "2_2",
          parentId: 0,
          name: "评审中心监管科"
        },
        {
          id: 3,
          parentId: 0,
          name: "评审中心项目联系人"
        }
      ];
    },
    // 树勾选
    getCheckedNodes(treeData) {
      // console.log(treeData);
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
        case "delete":
          this.delete(rowData);
          break;
        case "edit":
          this.edit(rowData);
          break;
      }
    },

    change(model) {
      console.log(model);
    },

    addUser() {
      this.rowData = {};
      this.dialogData = this.setDialogData();
      console.log(this.dialogData);
      this.$refs.showDialog.showDialog();
    },
    async addUserPut(model) {
      const aw = await api.User("Add", model);
      this.GetPage();
      this.$message({
        type: "success",
        message: aw.msg ? aw.msg : aw.errMsg
      });
    },
    GetRel(userId) {
      api.User("GetRel", { id: userId }).then(dd => {
        console.log(dd);
      });
    },
    async GetPage() {
      const aw = await api.User("GetPage", this.pageInfo);
      this.GetRel(aw.data.items[0].userId);
      this.pageInfo = aw.data.pageInfo;
      this.tabListData = aw.data.items;
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

    edit(data) {
      this.dialogData = this.setDialogData();
      this.rowData = data;
      this.$refs.showDialog.showDialog();
    },

    addRole(data) {
      this.rowData = {};
      this.$refs.showDialog.showDialog();
      this.dialogData = {
        ...this.dialogData,
        title: "新建角色",
        entity: [
          {
            label: "编码",
            key: "code",
            clasName: "is-full",
            rules: [
              { required: true, message: "编码不能为空", trigger: "blur" }
            ]
          },
          {
            label: "角色名称",
            key: "userName",
            rules: [{ required: true, message: "角色名称不能为空" }]
          }
        ]
      };
    },
    dialogOk(model) {
      console.log(model);
      this.addUserPut(model);
    },
    searchFilter(filterModel) {
      console.log(filterModel);
    },
    setViewActions() {
      return [
        {
          name: "addUser",
          label: "新建用户",
          type: "primary",
          icon: "el-icon-circle-plus-outline",
          disabled: false,
          hidden: false
        },
        {
          name: "refresh",
          label: "刷新",
          icon: "el-icon-refresh",
          disabled: false
        },
        {
          name: "userList",
          label: "用户列表",
          icon: "el-icon-search",
          disabled: false
        },
        {
          name: "clearLocking",
          label: "解除锁定",
          icon: "el-icon-turn-off",
          disabled: true,
          hidden: false
        },
        {
          name: "addRole",
          label: "添加角色",
          icon: "el-icon-circle-plus-outline",
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
          labelWidth: "120",
          options: [
            { label: "全部", value: "" },
            { label: "已启用", value: "1" },
            { label: "未启用", value: "0" }
          ]
        },
        {
          label: "用户类型",
          key: "userType",
          type: "select",
          className: "is-3",
          options: [
            { label: "全部", value: "" },
            { label: "管理员", value: "admin" },
            { label: "普通用户", value: "user" }
          ]
        },
        {
          label: "按输入字符查询",
          key: "query",
          type: "string",
          className: "is-3",
          placeholder: "用户名或者电话号码"
        }
      ];
    },
    setTreeEntity() {
      return [
        {
          id: 1,
          parentId: 0,
          name: "业务处室长"
        },
        {
          id: "1_1",
          parentId: 0,
          name: "业务处室"
        },
        {
          id: 2,
          parentId: 0,
          name: "评审中心监管科科长"
        },
        {
          id: "2_2",
          parentId: 0,
          name: "评审中心监管科"
        },
        {
          id: 3,
          parentId: 0,
          name: "评审中心项目联系人"
        },
        {
          id: "3_3",
          parentId: 0,
          name: "评审中心项目"
        },
        {
          id: 4,
          parentId: 0,
          name: "专家"
        }
      ];
    },
    setTabHeards() {
      //列表表头
      return {
        index: true,
        // selected: true,
        border: false,
        fixed: true,
        showSummary: false, //是否在表尾显示合计行
        headerAlign: "center", //表头对齐方式，若不设置该项，则使用表格的对齐方式
        operations: {
          label: "操作",
          actions: [
            { label: "删除", name: "delete", type: "text", size: "small" },
            { label: "编辑", name: "edit", type: "text", size: "small" }
          ]
        },
        // hasSwitchs: [
        //   {
        //     label: "启用状态",
        //     key: "startState",
        //     activeColor: "#13ce66",
        //     inactiveColor: "#ff4949"
        //   },
        //   {
        //     label: "锁定状态",
        //     key: "stopState"
        //   }
        // ],
        heards: [
          { label: "用户昵称", key: "userName", width: 120, type: "string" },
          { label: "登录名", key: "loginName", type: "string" },
          { label: "用户类型", key: "userType", type: "string" }
        ]
      };
    },
    setTabListData() {
      //列表left数据
      return [
        {
          id: 1,
          name: "王小虎",
          address: "13382517003",
          order: "管理员",
          startState: true,
          stopState: false
        },
        {
          id: 2,
          name: "且阿三",
          address: "13382517003",
          order: "用户",
          startState: true,
          stopState: false
        },
        {
          id: 3,
          name: "😀🥚🐓",
          address: "13382517003",
          order: "管理员",
          startState: true,
          stopState: false
        },
        {
          id: 4,
          name: "😊女孩",
          address: "13382517003",
          order: "管理员",
          startState: true,
          stopState: false
        },
        {
          id: 5,
          name: "🐀",
          address: "13382517003",
          order: "老鼠",
          startState: false,
          stopState: false
        },
        {
          id: 6,
          name: "😭伤心",
          address: "13382517003",
          order: "管理员",
          startState: false,
          stopState: true
        },
        {
          id: 7,
          name: "🐆",
          address: "13382517003",
          order: "豹子",
          startState: false,
          stopState: false
        },
        {
          id: 8,
          name: "🐍👩",
          address: "13382517003",
          order: "蛇女",
          startState: true,
          stopState: false
        }
      ];
    },
    setDialogData() {
      return {
        title: "新建用户",
        width: "600px",
        entity: [
          {
            label: "编码",
            key: "userCode",
            clasName: "is-full",
            rules: [
              { required: true, message: "编码不能为空", trigger: "blur" }
            ]
          },
          {
            label: "用户昵称",
            key: "userName",
            rules: [
              { required: true, message: "用户昵称不能为空", trigger: "blur" }
            ]
          },
          {
            label: "用户类型",
            key: "userType",
            type: "select",
            defaultValue: "Normal",
            options: [
              { label: "管理员", value: "Admin" },
              { label: "普通用户", value: "Normal" }
            ]
          },
          {
            label: "登录名",
            key: "loginName",
            rules: [
              { required: true, message: "显示名不能为空", trigger: "blur" }
            ]
          },
          {
            label: "登录密码",
            key: "loginPwd"
          }
          // {
          //   label: "联系方式",
          //   key: "address",
          //   required: true,
          //   type: "number",
          //   rules: [
          //     {
          //       required: true,
          //       message: "联系方式不能为空",
          //       trigger: "change"
          //     },
          //     {
          //       validator: (rule, value, callback) => {
          //         if (!value) {
          //           return callback(new Error("联系方式不能为空"));
          //         } else if (!/^1[345789]\d{9}$/.test(value)) {
          //           return callback(
          //             new Error("电话号码不合法，请核实后重新输入")
          //           );
          //         } else {
          //           callback();
          //         }
          //       },
          //       trigger: "blur"
          //     }
          //   ]
          // },
          // {
          //   label: "电话",
          //   key: "value"
          // },
          // {
          //   label: "邮箱",
          //   key: "email"
          // }
        ]
      };
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.buttonList = this.setViewActions();
    this.filterEntity = this.setFilterEntity();
    this.treeEntity = this.setTreeEntity();
    this.tabHeards = this.setTabHeards();
    // this.tabListData = this.setTabListData();
    this.dialogData = this.setDialogData();
    // this.treeEntity = listToTree("id", "parentId",  this.setTreeEntity());
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  async mounted() {
    this.GetPage();
    // const aw = await api.User("GetPage", {});
    // this.tabListData = aw.data.items;
    // console.log(aw);
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
