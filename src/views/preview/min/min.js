/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-07-02 15:16:23
 * @LastEditors: joykit
 * @LastEditTime: 2020-07-03 15:40:09
 */
export const mixin = {
  data: function() {
    return {};
  },
  mounted() {},
  methods: {
    render(data) {
      if (data && data.length > 0) {
        this.recursive(data, data);
      }
    },
    //递归
    recursive(data, source) {
      if (!data) return;
      data.map(async (item, index) => {
        if (!item.argument) return this.recursive(item.els, source); // 没有 item.argument 继续递归
        const path = item.argument.path; // api 路径
        const api = await this.$store.dispatch(path); // 请求api
        if (!api.Data) return; // api返回是否有数据
        const result = this.$store.getters[path]; // 获取state数据
        this.filter(result, item, source);
      });
    },
    // 过滤数据
    filter(res, item, source) {
      this.$store.commit("SET_UI_DATA", {
        res,
        item,
        type: item.type
      });
    }
  },
  watch: {}
};
