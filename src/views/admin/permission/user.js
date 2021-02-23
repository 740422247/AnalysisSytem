/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-16 16:53:13
 * @LastEditors: wss
 *
 * 5931.8442 1,200.6288
 * @LastEditTime: 2020-12-23 15:20:41
 */
export const user = {
  data() {},
  created() {},
  mounted() {
    this.$nextTick(() => {});
  },
  //方法集合
  methods: {
    //top button
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
    setViewActions() {
      return [
        // {
        //   name: "addResource",
        //   label: "添加顶级资源",
        //   icon: "el-icon-circle-plus-outline",
        //   disabled: false,
        //   hidden: false
        // },

        // {
        //   name: "addSubsetResource",
        //   label: "添加子资源",
        //   icon: "el-icon-search",
        //   disabled: true
        // },
        // {
        //   name: "deleteResource",
        //   label: "删除资源",
        //   icon: "el-icon-circle-plus-outline",
        //   disabled: true,
        //   hidden: false
        // },
        // {
        //   name: "Update",
        //   label: "修改资源",
        //   icon: "el-icon-circle-plus-outline",
        //   disabled: true,
        //   hidden: false
        // },
        {
          name: "addUser",
          label: "新增用户",
          icon: "el-icon-circle-plus-outline",
          type: "primary",
          disabled: false,
          hidden: false
        },
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
            clasName: "is-full",
            rules: [
              {
                validator: (rule, value, callback) => {
                  console.log("userName", value);
                  return new Promise((resolve, reject) => {
                    if (value && value.length > 0) {
                      resolve();
                    } else {
                      reject(new Error());
                    }
                  });
                },
                message: "name is not undefinde",
                trigger: "blur"
              }
            ]
          },
          // {
          //   label: "多选测试",
          //   key: "group",
          //   type: "checkbox",
          //   options: [
          //     { label: "全部", value: "2" },
          //     { label: "已启用", value: "1" },
          //     { label: "未启用", value: "0" }
          //   ]
          // },
          {
            label: "用户头像",
            key: "avatar",
            type: "uploader",
            className: "is-full",
            autoUpload: false, //取消选中自动上传,转base64返回
            sum: 1, //能选中的张数
            rules: [
              {
                validator: (rule, value, callback) => {
                  return new Promise((resolve, reject) => {
                    if (value && value.length > 0) {
                      resolve();
                    } else {
                      reject(new Error());
                    }
                  });
                },
                message: "请选择头像",
                required: true,
                trigger: "change",
                type: "array"
              }
            ]
          },
          // {
          //   label: "其他图片",
          //   key: "ABC",
          //   type: "uploader",
          //   autoUpload: false, //取消选中自动上传,转base64返回
          //   sum: 1, //能选中的张数
          //   rules: [
          //     {
          //       validator: (rule, value, callback) => {
          //         return new Promise((resolve, reject) => {
          //           if (value && value.length > 0) {
          //             resolve();
          //           } else {
          //             reject(new Error());
          //           }
          //         });
          //       },
          //       message: "请选择头像",
          //       required: true,
          //       trigger: "change",
          //       type: 'array'
          //     }
          //   ]
          // },
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
    setDialogResource(type, roleId) {
      let titleName;
      if (type === "addResource") {
        titleName = "顶级";
      } else {
        titleName = "子集";
      }
      return {
        title: `新建${titleName}资源`,
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
            rules: [
              { required: true, message: "上级名称不能为空", trigger: "blur" }
            ]
          },
          {
            label: "角色编码",
            key: "resourceCode",
            className: "is-full",
            rules: [
              { required: true, message: "资源编码不能为空", trigger: "blur" }
            ]
          },
          {
            label: "角色名字",
            key: "resourceName",
            className: "is-full",
            readonly: true,
            rules: [
              { required: true, message: "角色名字不能为空", trigger: "blur" }
            ]
          }
        ]
      };
    },
    UpdateDialogResource(dd) {
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
        operations: {
          label: "操作",
          width: "200",
          actions: [
            {
              label: "编辑",
              name: "edit",
              type: "primary",
              size: "small",
              icon: "el-icon-edit"
            },
            {
              label: "删除",
              name: "delete",
              type: "danger",
              size: "small",
              icon: "el-icon-delete"
            }
          ]
        },
        // hasSwitchs: [
        //   {
        //     label: "启用状态",
        //     key: "startState",
        //     activeColor: "#13ce66",
        //     inactiveColor: "#ff4949"
        //   }
        // ],
        heards: [
          { label: "用户昵称", key: "userName", width: 120, type: "string" },
          { label: "用户编码", key: "userCode", type: "string" },
          { label: "登录名", key: "loginName", type: "string" },
          {
            label: "用户类型",
            key: "userType",
            type: "string",
            expression: model => {
              // console.log('22222');
              if (model.userType) {
                return model.userType === "Normal" ? "普通用户" : "管理员";
              }
            }
          }
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
