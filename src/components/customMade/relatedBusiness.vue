<!--  -->
<template>
  <div class="child-dialog">
    <div>
      <Filters
        :filter-entity="filterEntity"
        @change="searchFilter"
        @btnClick="btnClick"
        @linkage="linkage"
        border
        :formConfig="{ inline: true }"
        :filterModel="filterModel"
      ></Filters>
      <!-- :ref="model"
        :label-position="dialogData.labelPosition"
        :model="model"
        :rules="rules" -->
      <!-- <Form
        class="demo-form-inline"
        :model="form"
        :inline="true"
        label-width="180px"
      >
        <FormItem :label="'业务系统'">
          <el-select v-model="form.busniessUserId" placeholder="请选择系统">
            <template v-for="ittm in SysBusiness">
              <el-option
                :label="ittm.name"
                :key="ittm.id"
                :value="ittm.id"
              ></el-option>
            </template>
          </el-select>
        </FormItem>
        <FormItem :label="'业务系统用户名'">
          <el-input v-model="form.name"></el-input>
        </FormItem>
        <FormItem :label="'业务系统密码'">
          <el-input show-password v-model="form.passWord"></el-input>
        </FormItem>
        <FormItem :label="' '">
          <el-button type="primary" @click="btn()">保存</el-button>
        </FormItem>
      </Form> -->
    </div>
    <TableView
      :tableHeader="tabHeards"
      :listTableData="tabListData"
      :loading="loadingSys"
      :pageInfo="pageInfoSys"
      @flipOver="flipOver"
      @rowClick="rowClick"
      @listActions="listActions"
      title="功能角色列表"
    ></TableView>
    <!-- <div slot="footer" class="dialog-footer">
      <Button @click="close">关闭</Button>
      <Button type="primary" @click="ok">确定</Button>
    </div> -->
  </div>
</template>

<script>
import api from "@api/api.js";
// import {
//   Dialog,
//   Form,
//   FormItem,
//   Select,
//   Option,
//   Input,
//   DatePicker,
//   Radio,
//   Button,
//   RadioGroup
// } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { getFilterByQueryStringFn, pageData } from "@/until/filter";
import { relatedBusiness } from "./relatedBusiness.js";
import { relatedBusinessFilter } from "./relatedBusinessFilter.js";
const TableView = () => import("@components/Admin/tableListEntity.vue");
const Filters = () => import("@components/Admin/filterEntity.vue");
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    // Dialog,
    // Form,
    // FormItem,
    // Select,
    // Option,
    // Input,
    // Button,
    // DatePicker,
    // Radio,
    // RadioGroup,
    TableView,
    Filters
  },
  props: {
    roleMessage: {
      type: Object,
      default: () => {}
    },
    dialogData: {
      type: Object
    },
    modelDialog: {
      type: Object
    },
    model: {
      type: Object
    }
  },
  name: "relatedBusiness",
  data() {
    //这里存放数据
    return {
      filterEntity: [],
      btnType: "Add", //弹窗按钮默认状态
      filterModel: {},
      tabHeards: {},
      tabListData: [],
      loadingSys: true,
      pageInfoSys: {
        pageIndex: 1,
        pageSize: 10
      },
      SysBusiness2: [], //有冲突,改名
      form: {},
      formDialog: false,
      uploaderText: "",
      fileList: [],
      imgIndex: 0, //替换下标
      imageUrlArr: [],
      rules: {},
      arr: [],
      test: "dklasdakjdkl",
      check: []
    };
  },
  mixins: [relatedBusiness, relatedBusinessFilter],
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // "filterModel.dialogTableVisible": {
    //   handler: function(a, b) {}
    // }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.GetDialogPage();
    this.tabHeards = this.setTabHeards();
    const ubr = { RoleId: this.roleMessage.roleId };
    this.GetBusinessUserByRole(ubr);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log("加载弹窗", this.roleMessage);
  },
  //方法集合
  methods: {
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
    linkage(d) {
      this.filterModel = JSON.parse(JSON.stringify(d[0]));
      //切换下拉框状态变成新增
      this.btnType = "Add";
    },
    searchFilter() {},
    setFilterEntity(option) {
      return [
        {
          label: "系统名字",
          key: "businessId",
          type: "select",
          className: "is-2",
          options: option,
          rules: [{ required: true, message: "系统不能为空", trigger: "blur" }],
          expression: (model, val, controlForms, opt) => {
            option.map(item => {
              if (item.businessId === model.businessId) {
                const fixed = item.isFixed === "true" ? true : false;
                this.filterEntity = this.filterEntity.map(item =>
                  item.key === "businessId"
                    ? {
                        ...item
                      }
                    : { ...item, disabled: fixed }
                );
              }
            });

            // if (model.isFixed === "true") {
            //   this.filterEntity = this.filterEntity.map(item =>
            //     item.key === "businessId"
            //       ? {
            //           ...item
            //         }
            //       : { ...item, disabled: true }
            //   );
            //   console.log("固定");
            // } else {
            //   this.filterEntity = this.filterEntity.map(item =>
            //     item.key === "businessId"
            //       ? {
            //           ...item
            //         }
            //       : { ...item, disabled: false }
            //   );
            // }
            controlForms(["userName", "passWord"], model, opt);
          }
        },
        {
          label: "账号",
          key: "userName",
          type: "string",
          className: "is-2",
          placeholder: "请输入账号",
          rules: [{ required: true, message: "账号不能为空", trigger: "blur" }]
        },
        {
          label: "密码",
          key: "passWord",
          password: true,
          type: "string",
          className: "is-2",
          placeholder: "请输入密码",
          rules: [{ required: true, message: "密码不能为空", trigger: "blur" }]
        },
        {
          label: "",
          buttonName: "保存",
          key: "button",
          type: "button",
          className: "is-2",
          placeholder: "保存"
        }
      ];
    },
    //获取业务系统列表
    btnClick(dd) {
      const it = { ...this.filterModel, ...dd, ...this.roleMessage };
      // if (this.btnType === "Add") {
      api.SysUserManagement(this.btnType, it).then(dd => {
        if (this.btnType === "Add") {
          this.tabListData.unshift(dd.data);
          this.getFilterByQueryStringFn(null);
        } else {
          this.editHold = Object.assign(this.editHold, dd.data);
        }
        this.btnType = "Add";
        this.filterModel = {};
        this.$message({
          type: "success",
          message: dd.msg
        });
      });
      // }
    },
    // GetBusinessUserByRole(par) {
    //   // api.SysUserManagement("GetBusinessUserByRole", par).then(dd => {});
    // },
    GetDialogPage() {
      api.SysBusiness("GetPage", {}).then(dd => {
        this.SysBusiness2 = dd.data.map(item => ({
          label: item.name,
          value: item.businessId,
          ...item
        }));
        this.filterEntity = this.setFilterEntity(this.SysBusiness2);
        // this.pageInfo.totalCount = dd.data.length;
        // this.getFilterByQueryStringFn(null);
      });
    },
    rowClick() {},
    listActions(rowData, name, index) {
      switch (name) {
        case "delete":
          this.delete(rowData);
          break;
        case "edit":
          this.editHold = rowData;
          this.edit(rowData, index);
          break;
      }
    },
    async delete(data) {
      const parameter = { id: data.id };
      this.$confirm(`确认删除 "${data.name}" , 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        offset: "500"
      })
        .then(() => {
          api.SysUserManagement("Delete", parameter).then(dd => {
            const ubr = { RoleId: this.roleMessage.roleId };
            this.GetBusinessUserByRole(ubr);
            // this.getFilterByQueryStringFn(null);
            this.$message({
              type: "success",
              message: dd.msg ? dd.msg : dd.errMsg
            });
            // _this.GetPage();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //弹窗编辑系统
    edit(data, index) {
      // this.dialogData = this.setDialogData("编辑");
      // this.editTableIndex = index;
      this.filterModel = JSON.parse(JSON.stringify(data));
      //此处设置输入框状态,禁用与否
      // this.filterEntity = this.setFilterEntity(this.SysBusiness);
      this.SysBusiness2.map(item => {
        if (item.businessId === data.businessId) {
          const fixed = item.isFixed === "true" ? true : false;
          this.filterEntity = this.filterEntity.map(item =>
            item.key === "businessId"
              ? {
                  ...item
                }
              : { ...item, disabled: fixed }
          );
        }
      });
      this.btnType = "Update";
      // this.rowData = data;
      // this.$refs.showDialog.showDialog("UpdateBusiness");
    },
    chenckArr(val) {
      this.formatting(val);
    },
    clearChoice() {
      this.tabListDataRight = [...this.tabListDataRight];
    },
    btn() {
      // console.log(this.form);
    },
    showDialog(typeName) {
      this.typeName = typeName;
      this.formDialog = true;
    },
    resetForm(formName) {
      this.$refs[this.model].resetFields();
      this.formDialog = false;
    },
    initRules() {
      if (!this.dialogData.entity) return;

      this.dialogData.entity.forEach(item => {
        if (item.rules) {
          this.rules[item.key] = item.rules;
        }
      });
    },
    close() {
      // this.$refs.
    },
    ok() {
      this.$refs[this.model].validate(valid => {
        if (valid) {
          this.$emit("ok", {
            model: this.model,
            typeName: this.typeName
          });
          this.formDialog = false;
        } else {
          return false;
        }
      });
    }
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss">
//@import url(); 引入公共css类
// @import "@assets/scss/form-scss.scss";
.el-select-dropdown__list {
  padding-bottom: 10px;
  max-height: 30vh;
}
.child-dialog .el-dialog__header {
  text-align: left;
}
.avatar-uploader {
  text-align: left;
}
.avatar-uploader .el-upload {
  position: relative;
  // overflow: hidden;
  // border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
}
.addIcon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  display: inline-block;
  float: left;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  width: 50px;
  height: 50px;
  color: #8c939d;
  font-size: 28px;
  line-height: 50px;
  text-align: center;
}
.avatar {
  display: block;
  width: 50px;
  height: 50px;
}
.delete {
  position: absolute;
  top: 0;
  right: -20px;
  color: red;
}
.imgLi {
  display: inline-block;
  position: relative;
  margin-right: 30px;
  float: left;
}
.scrollbar {
  // height:min-content;
  max-height: 500px;
  overflow: auto;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
