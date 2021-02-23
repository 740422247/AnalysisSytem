/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-16 16:53:13
 * @LastEditors: wss
 * @LastEditTime: 2020-11-05 17:17:11
 */
export const role = {
  data() {},
  created() {},
  mounted() {
    this.$nextTick(() => {});
  },
  //方法集合
  methods: {
    setFilterEntityRight() {
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
          placeholder: "编码或名称"
        }
      ];
    },
    setViewActions() {
      return [
        // {
        //   name: "addResource",
        //   label: "添加顶级资源",
        //   icon: "el-icon-circle-plus-outline",
        //   type: "primary",
        //   disabled: false,
        //   hidden: false
        // },

        // {
        //   name: "addSubsetResource",
        //   label: "添加子资源",
        //   type: "primary",
        //   plain: true,
        //   icon: "el-icon-circle-plus",
        //   disabled: true
        // },
        // {
        //   name: "deleteResource",
        //   label: "删除资源",
        //   icon: "el-icon-delete",
        //   type: "danger",
        //   disabled: true,
        //   hidden: false
        // },
        // {
        //   name: "Update",
        //   label: "修改资源",
        //   icon: "el-icon-edit",
        //   type: "warning",
        //   plain: true,
        //   disabled: true,
        //   hidden: false
        // },
        {
          name: "addRole",
          label: "添加角色",
          type: "primary",
          icon: "el-icon-circle-plus-outline",
          disabled: false,
          hidden: false
        },
        {
          name: "refresh",
          label: "刷新",
          icon: "el-icon-refresh",
          type: "primary",
          plain: true,
          disabled: false
        }
        // {
        //   name: "setIndex",
        //   label: "设置首页",
        //   icon: "el-icon-refresh",
        //   disabled: true
        // }
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
        title: `${title}角色`,
        width: "600px",
        entity: [
          {
            label: "角色编码",
            key: "roleCode",
            className: "is-full",
            rules: [
              { required: true, message: "资源编码不能为空", trigger: "blur" }
            ]
          },
          {
            label: "角色名字",
            key: "roleName",
            className: "is-full",
            readonly: true,
            rules: [
              { required: true, message: "角色名字不能为空", trigger: "blur" }
            ]
          }
        ]
      };
    },
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
            type: "select",
            defaultValue: "",
            options: option
          }
        ]
      };
    },
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
          }
        ]
      };
    },
    setDialogIndex(option) {
      return {
        title: `设置首页`,
        width: "600px",
        entity: [
          {
            label: "首页地址",
            key: "resourceTemplate",
            type: "select",
            defaultValue: "",
            options: option
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
          width: "350",
          label: "操作",
          actions: [
            {
              label: "关联业务系统",
              name: "relevance",
              type: "primary",
              size: "small",
              icon: "el-icon-document-copy"
            },
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
          { label: "角色编码", key: "roleCode", width: 120, type: "string" },
          { label: "角色名称", key: "roleName", type: "string" },
          { label: "创建时间", key: "createDateTime", type: "string" }
        ]
      };
    },
    setTabHeardsRight() {
      return {
        index: true,
        height: "620px",
        // selected: true,
        border: false,
        fixed: true,
        showSummary: false,
        headerAlign: "center",
        // selection: "selection", //显示勾选
        rowKey: "userId",
        heards: [
          { label: "用户编码", key: "userCode", type: "string" },
          { label: "用户昵称", key: "userName", width: 120, type: "string" }
          // { label: "创建时间", key: "createDateTime", type: "string" }
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
