/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-16 16:53:13
 * @LastEditors: wss
 *
 * 5931.8442 1,200.6288
 * @LastEditTime: 2020-11-25 10:46:39
 */
export const ApiAdmin = {
  data() {},
  created() {},
  mounted() {
    this.$nextTick(() => {});
  },
  //方法集合
  methods: {
    setRefreshApiEntity(option) {
      return [
        {
          label: "系统名字",
          key: "businessId",
          type: "select",
          className: "is-2",
          options: option,
          rules: [{ required: true, message: "系统不能为空", trigger: "blur" }],
          expression: (model, val, controlForms, opt) => {
            controlForms(["userName", "passWord"], model, opt);
          }
        },

        {
          label: "",
          buttonName: "更新API",
          key: "button",
          type: "button",
          className: "is-2",
          placeholder: "保存"
        }
      ];
    },
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
        },
        {
          label: "是否启用",
          key: "query2",
          type: "select",
          placeholder: "编码或名称",
          options: [
            { label: "全部", value: 0 },
            { label: "已启用", value: 1 },
            { label: "未启用", value: 2 }
          ]
        }
      ];
    },
    setViewActions() {
      return [
        {
          name: "updateApi",
          label: "更新API",
          type: "primary",
          icon: "el-icon-edit",
          disabled: false,
          hidden: false
        },
        {
          name: "setApiType",
          label: "设置API类型",
          type: "primary",
          icon: "el-icon-setting",
          disabled: true,
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
    setDialogDataUpdateApi(title) {
      return {
        title: `${title}`,
        width: "600px",
        labelWidth: "150px",
        entity: [
          {
            label: "系统名称",
            key: "businessId",
            type: "select",
            multiple: false,
            className: "os-12",
            options: this.apiList,
            rules: [
              { required: true, message: "系统名称不能为空", trigger: "blur" }
            ]
            // expression: (model, val, controlForms, opt) => {
            //   controlForms(["userName", "passWord"], model, opt);
            // }
          }
        ]
      };
    },
    //API设置类型
    setDialogDataApi(title) {
      return {
        title: `${title}`,
        width: "600px",
        labelWidth: "150px",
        entity: [
          {
            label: "API类型",
            key: "lsApiType",
            type: "select",
            multiple: true,
            className: "os-12",
            options: [
              { label: "通用", value: "universal" },
              { label: "定制", value: "made" },
              { label: "条件", value: "condition" },
              { label: "卡片", value: "cardList" }
            ],
            rules: [
              { required: true, message: "类型不能为空", trigger: "blur" }
            ]
            // expression: (model, val, controlForms, opt) => {
            //   controlForms(["userName", "passWord"], model, opt);
            // }
          }
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
        hideRightBtn: true, //隐藏表格右侧按钮,兼容=true表示隐藏
        // selected: true,
        rowKey: "id",
        selection: "selection", //显示勾选
        border: false,
        fixed: true,
        showSummary: false,
        headerAlign: "center",
        operations: {
          label: "操作",
          width: "100",
          actions: [
            // {
            //   label: "编辑",
            //   name: "edit",
            //   type: "primary",
            //   size: "small",
            //   icon: "el-icon-edit"
            // },
            {
              label: "删除",
              name: "delete",
              type: "danger",
              size: "small",
              icon: "el-icon-delete"
            }
          ]
        },
        hasSwitchs: [
          {
            label: "启用状态",
            key: "isEnable",
            activeColor: "#13ce66",
            inactiveColor: "#ff4949"
          }
        ],
        heards: [
          { label: "系统名称", key: "name", width: 120, type: "string" },
          { label: "标签", key: "label", width: 120, type: "string" },
          // {
          //   label: "是否需要登录",
          //   key: "isLogin",
          //   type: "string",
          //   expression: model => {
          //     if (model.isLogin) {
          //       return model.isLogin ? "是" : "否";
          //     }
          //   }
          // },
          { label: "接口名称", key: "value", type: "string" },
          { label: "url地址", key: "url", type: "string" },
          {
            label: "API类型",
            key: "apiType",
            type: "string",
            expression: model => {
              if (model.apiType) {
                const www = model.apiType.replace(/universal/g, "通用").replace(/made/g, "定制").replace(/condition/g, "条件").replace(/cardlist/g, "卡片");
                return www;
              }
            }
          },
          { label: "数据源", key: "dataSource", type: "string" }

          // {
          //   label: "是否固定",
          //   key: "isFixed",
          //   type: "string",
          //   expression: model => {
          //     if (model.isLogin) {
          //       return model.isLogin ? "是" : "否";
          //     }
          //   }
          // }
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
