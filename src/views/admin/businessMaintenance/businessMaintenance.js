/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-16 16:53:13
 * @LastEditors: wss
 *
 * 5931.8442 1,200.6288
 * @LastEditTime: 2020-12-31 10:38:08
 */
export const businessMaintenance = {
  data() {},
  created() {},
  mounted() {
    this.$nextTick(() => {});
  },
  //方法集合
  methods: {
    //top button
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
        {
          name: "addBusiness",
          label: "新增",
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
    //新增业务系统
    setDialogData(title) {
      return {
        title: `${title}业务系统`,
        width: "600px",
        labelWidth: "150px",
        entity: [
          {
            label: "名称",
            key: "name",
            clasName: "is-full",
            rules: [
              { required: true, message: "名称不能为空", trigger: "blur" }
            ]
          },
          {
            label: "服务地址",
            key: "serviceAddress",
            clasName: "is-full"
            // rules: [
            //   { required: true, message: "服务地址不能为空", trigger: "blur" }
            // ]
          },
          {
            label: "swagger地址",
            key: "swaggerAddress",
            clasName: "is-full"
            // rules: [
            //   {
            //     required: true,
            //     message: "swagger地址不能为空",
            //     trigger: "blur"
            //   }
            // ]
          },
          {
            label: "是否需要登录",
            key: "isLogin",
            clasName: "is-5",
            type: "switch",
            // options: [{ label: "否", value: "1" }],
            expression: (model, val, controlForms) => {
              // console.log("判断的值:", val);
              if (val === "false") {
                controlForms(
                  [
                    "appKey",
                    // "serviceAddress",
                    // "swaggerAddress",
                    "tokenApi",
                    "refreshToken",
                    "isFixed",
                    "userName",
                    "passWord",
                    "appId",
                    "appKey"
                  ],
                  true
                );
              } else {
                controlForms(
                  [
                    "appKey",
                    // "serviceAddress",
                    // "swaggerAddress",
                    "refreshToken",
                    "tokenApi",
                    "isFixed",
                    "userName",
                    "passWord",
                    "appId",
                    "appKey"
                  ],
                  false
                );
              }
            }
          },
          {
            label: "获取token地址",
            labelWidth: "120px",
            key: "tokenApi",
            clasName: "is-full"
            // rules: [
            //   {
            //     required: true,
            //     message: "刷新token地址不能为空",
            //     trigger: "blur"
            //   }
            // ]
          },
          {
            label: "刷新token地址",
            labelWidth: "120px",
            key: "refreshToken",
            clasName: "is-full"
            // rules: [
            //   {
            //     required: true,
            //     message: "刷新token地址不能为空",
            //     trigger: "blur"
            //   }
            // ]
          },
          {
            label: "是否固定",
            width: "120px",
            key: "isFixed",
            clasName: "is-5",
            type: "switch",
            // options: [{ label: "否", value: "1" }],
            expression: (model, val, controlForms) => {
              if (val === "false") {
                controlForms(["userName", "passWord"], true);
              } else {
                console.log("9999");
                controlForms(["userName", "passWord"], false);
              }
            }
          },
          {
            label: "用户名",
            width: "120px",
            key: "userName"
            // rules: [
            //   { required: true, message: "用户名不能为空", trigger: "blur" }
            // ]
          },
          {
            label: "密码",
            width: "120px",
            key: "passWord"
            // rules: [
            //   { required: true, message: "用户名不能为空", trigger: "blur" }
            // ]
          },
          {
            label: "appId",
            width: "120px",
            key: "appId"
            // rules: [
            //   { required: true, message: "appId名不能为空", trigger: "blur" }
            // ]
          },
          {
            label: "appKey",
            width: "120px",
            key: "appKey"
            // rules: [
            //   { required: true, message: "appKey不能为空", trigger: "blur" }
            // ]
          }
          // {
          //   label: "服务地址",
          //   key: "serviceAddress",
          //   rules: [
          //     {
          //       validator: (rule, value, callback) => {
          //         console.log("userName", value);
          //         return new Promise((resolve, reject) => {
          //           if (value && value.length > 0) {
          //             resolve();
          //           } else {
          //             reject(new Error());
          //           }
          //         });
          //       },
          //       message: "name is not undefinde",
          //       trigger: "blur"
          //     }
          //   ]
          // },
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
          { label: "名称", key: "name", width: 120, type: "string" },
          {
            label: "是否需要登录",
            key: "isLogin",
            type: "string",
            expression: model => {
              if (model.isLogin) {
                return model.isLogin ? "是" : "否";
              }
            }
          },
          { label: "服务地址", key: "serviceAddress", type: "string" },
          { label: "swagger地址", key: "swaggerAddress", type: "string" },
          {
            label: "是否固定",
            key: "isFixed",
            type: "string",
            expression: model => {
              if (model.isLogin) {
                return model.isLogin ? "是" : "否";
              }
            }
          }
          // {
          //   label: "用户类型",
          //   key: "userType",
          //   type: "string",
          //   expression: model => {
          //     // console.log('22222');
          //     if (model.userType) {
          //       return model.userType === "Normal" ? "普通用户" : "管理员";
          //     }
          //   }
          // }
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
