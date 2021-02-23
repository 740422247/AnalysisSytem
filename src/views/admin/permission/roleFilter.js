/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-16 16:53:13
 * @LastEditors: wss
 * @LastEditTime: 2020-09-02 17:36:53
 */
import api from "@api/api.js";
import { getFilterByQueryStringFn, pageData } from "@/until/filter";
export const roleFilter = {
  data() {
    return {
      fields: ["roleName", "roleCode"],
      RoleList: null, //接口返回数据
      UserList: null, //接口返回数据
      RoleListFilter: null, //过滤后的数据
      UserListFilter: null //过滤后的数据
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {});
  },
  //方法集合
  methods: {
    //获取资源
    async GetList() {
      const aw = await api.Role("GetList", null);
      this.RoleList = aw.data;
      this.pageInfo.totalCount = aw.data.length;
      this.getFilterByQueryStringFn(null);
      // this.pageInfo = aw.data.pageInfo;
      // this.tabListData = aw.data.items;
    },
    getFilterByQueryStringFn(query) {
      this.pageInfo.pageIndex = 1;
      const items = (this.RoleListFilter = getFilterByQueryStringFn(
        this.fields,
        this.RoleList,
        query
      ));
      this.pageInfo.totalCount = items.length;
      this.tabListData = pageData(items, this.pageInfo);
      this.loadingLeft = false;
    },
    //获取右侧用户列表
    async GetListUser() {
      const aw = await api.User("GetList", null);
      this.UserList = aw.data;
      this.pageInfo.totalCount = aw.data.length;
      this.getFilterByQueryStringFnUsers(null);
      // this.pageInfo = aw.data.pageInfo;
      // this.tabListData = aw.data.items;
    },
    getFilterByQueryStringFnUsers(query) {
      this.pageInfoUsers.pageIndex = 1;
      const items = (this.UserListFilter = getFilterByQueryStringFn(
        [],
        this.UserList,
        query
      ));
      this.pageInfoUsers.totalCount = items.length;
      this.tabListDataRight = pageData(items, this.pageInfoUsers);
      this.loadingUsers = false;
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
