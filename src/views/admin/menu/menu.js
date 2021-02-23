/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-16 16:53:13
 * @LastEditors: wss
 * @LastEditTime: 2020-12-31 10:59:45
 */
export const menu = {
  data() {},
  created() {},
  mounted() {
    this.$nextTick(() => {});
  },
  //方法集合
  methods: {
    //top button
    setViewActions() {
      return [
        {
          name: "addResource",
          label: "添加顶级资源",
          icon: "el-icon-circle-plus-outline",
          type: "primary",
          disabled: false,
          hidden: false
        },

        {
          name: "addSubsetResource",
          label: "添加子资源",
          type: "primary",
          plain: true,
          icon: "el-icon-circle-plus",
          disabled: true
        },
        {
          name: "deleteResource",
          label: "删除资源",
          icon: "el-icon-delete",
          type: "danger",
          disabled: true,
          hidden: false
        },
        {
          name: "Update",
          label: "修改资源",
          icon: "el-icon-edit",
          type: "warning",
          plain: true,
          disabled: true,
          hidden: false
        },
        // {
        //   name: "addMenu",
        //   label: "新增菜单",
        //   icon: "el-icon-circle-plus-outline",
        //   type: "primary",
        //   disabled: false,
        //   hidden: false
        // },
        {
          name: "refresh",
          label: "刷新",
          type: "primary",
          plain: true,
          icon: "el-icon-refresh",
          disabled: false
        }
      ];
    },
    setDialogData(title) {
      return {
        title: `${title}用户`,
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
    },
    updateMenuChild(treeEntityLeft, data) {
      treeEntityLeft.forEach((item, idx) => {
        if (item.resourceId === data.data.resourceId) {
          this.$set(treeEntityLeft, idx, data.data);
          return false;
        } else {
          if (item.children) {
            this.updateMenuChild(item.children, data);
          }
          // this.$set(this.rowData, item.key, "");
        }
      });
    },
    // 新增左侧菜单
    setDialogResource(type, option) {
      let titleName;
      if (type === "addResource") {
        titleName = "顶级";
      } else {
        titleName = "子集";
      }
      return {
        title: `添加${titleName}资源`,
        width: "600px",
        entity: [
          {
            label: "上级ID",
            key: "resourceParentId",
            hidden: "true",
            className: "is-full",
            rules: [
              { required: true, message: "上级ID不能为空", trigger: "blur" }
            ]
          },
          {
            label: "上级名称",
            key: "resourceParentName", //本地新增
            className: "is-full",
            disabled: true,
            rules: [
              { required: true, message: "上级名称不能为空", trigger: "blur" }
            ]
          },
          {
            label: "资源编码",
            key: "resourceCode",
            className: "is-full",
            rules: [
              { required: true, message: "资源编码不能为空", trigger: "blur" }
            ]
          },
          {
            label: "资源名字",
            key: "resourceName",
            className: "is-full",
            readonly: true,
            rules: [
              { required: true, message: "角色名字不能为空", trigger: "blur" }
            ]
          },
          {
            label: "绑定菜单",
            key: "resourceTemplate",
            className: "is-full",
            type: "select",
            defaultValue: "",
            options: option
          },
          {
            label: "菜单排序",
            key: "resourceSortId",
            className: "is-full"
          }
        ]
      };
    },
    //修改左侧菜单
    UpdateDialogResource(type, option) {
      return {
        title: `修改资源`,
        width: "600px",
        entity: [
          {
            label: "资源编码",
            key: "resourceCode",
            className: "is-full",
            rules: [
              { required: true, message: "资源编码不能为空", trigger: "blur" }
            ]
          },
          {
            label: "资源名字",
            key: "resourceName",
            className: "is-full",
            readonly: true,
            rules: [
              { required: true, message: "资源名字不能为空", trigger: "blur" }
            ]
          },
          {
            label: "绑定菜单",
            key: "resourceTemplate",
            type: "select",
            defaultValue: "",
            options: option
          },
          {
            label: "菜单排序",
            key: "resourceSortId",
            className: "is-full"
          }
        ]
      };
    },
    setTabHeards() {
      return {
        index: true,
        // selected: true,
        border: false,
        fixed: true,
        showSummary: false,
        headerAlign: "center",
        heards: [
          {
            label: "菜单编码",
            key: "resourceCode",
            width: 120,
            type: "string"
          },
          { label: "菜单名字", key: "resourceName", type: "string" },
          { label: "创建时间", key: "createDateTime", type: "string" }
        ]
      };
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  beforeRouteEnter(to, from, next) {
    next(vm => {});
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  //import引入的组件需要注入到对象中才能使用
  components: {}
};
