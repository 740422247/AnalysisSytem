/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-16 16:53:13
 * @LastEditors: wss
 *
 * 5931.8442 1,200.6288
 * @LastEditTime: 2020-11-04 11:07:40
 */
import api from "@api/api.js";
import { getFilterByQueryStringFn, pageData } from "@/until/filter";
export const relatedBusinessFilter = {
  data() {
    return {
      SysBusiness: [],
      SysBusinessListFilter: [],
      fields: ["userName", "name"]
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {});
  },
  //方法集合
  methods: {
    //获取业务系统列表
    GetBusinessUserByRole(par) {
      api.SysUserManagement("GetBusinessUserByRole", par).then(dd => {
        this.SysBusiness = dd.data;
        this.pageInfoSys.totalCount = dd.data.length;
        this.getFilterByQueryStringFn(null);
      });
    },
    //   this.tabListData = dd.data;
    //   setTimeout(() => {
    //     this.loadingLeft = false;
    //   });
    // }, 500);

    getFilterByQueryStringFn(query) {
      this.pageInfoSys.pageIndex = 1;
      const items = (this.SysBusinessListFilter = getFilterByQueryStringFn(
        this.fields,
        this.SysBusiness,
        query
      ));
      this.pageInfoSys.totalCount = items.length;
      this.tabListData = pageData(items, this.pageInfo);
      this.loadingSys = false;
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
