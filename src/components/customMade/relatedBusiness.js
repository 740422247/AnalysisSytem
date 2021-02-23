/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-16 16:53:13
 * @LastEditors: wss
 *
 * 5931.8442 1,200.6288
 * @LastEditTime: 2021-01-11 16:16:47
 */
export const relatedBusiness = {
  data() {},
  created() {},
  mounted() {
    this.$nextTick(() => {});
  },
  //方法集合
  methods: {
    setTabHeards() {
      return {
        index: true,
        // selected: true,
        border: false,
        fixed: true,
        height: "350px",
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
          { label: "系统名字", key: "name", type: "string" },
          { label: "账号", key: "userName", width: 120, type: "string" },

          { label: "刷新Token", key: "refreshToken", type: "string" }
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
