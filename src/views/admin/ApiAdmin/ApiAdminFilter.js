/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-16 16:53:13
 * @LastEditors: wss
 *
 * 5931.8442 1,200.6288
 * @LastEditTime: 2020-11-25 10:58:52
 */
import api from "@api/api.js";
import {
  getFilterByQueryStringFn,
  getFilterByEqualFn,
  pageData
} from "@/until/filter";
export const ApiAdminFilter = {
  data() {
    return {
      SysBusiness: [],
      SysBusinessListFilter: [],
      fields: ["label", "value", "dataSource"]
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {});
  },
  //方法集合
  methods: {
    //获取业务系统列表
    GetPage() {
      api.ChartApiOption("GetPage", {}).then(dd => {
        const apiList = dd.data.map(item => ({
          ...item,
          // eslint-disable-next-line no-unneeded-ternary
          isEnable: item.isEnable === "是" ? true : false
        }));
        this.SysBusiness = apiList;
        this.pageInfo.totalCount = apiList.length;
        this.getFilterByQueryStringFn(
          this.filterModel.query,
          this.filterModel.query2
        );
      });
    },
    //   this.tabListData = dd.data;
    //   setTimeout(() => {
    //     this.loadingLeft = false;
    //   });
    // }, 500);

    getFilterByQueryStringFn(query, query2 = "") {
      this.pageInfo.pageIndex = 1;
      const items1 = getFilterByQueryStringFn(
        this.fields,
        this.SysBusiness,
        query
      );
      const items2 = (this.SysBusinessListFilter = getFilterByEqualFn(
        ["isEnable"],
        items1,
        query2
      ));
      this.pageInfo.totalCount = items2.length;
      this.tabListData = pageData(items2, this.pageInfo);
      this.loadingLeft = false;
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
