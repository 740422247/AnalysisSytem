/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-07-02 15:16:23
 * @LastEditors: joykit
 * @LastEditTime: 2020-07-03 09:45:35
 */
export const mixin = {
  data: function() {
    return {};
  },
  mounted() {},
  methods: {
    render(data) {
      if (data && data.length > 0) {
        //console.log(this.$store);
        this.recursive(data);
      }
    },
    //递归
    recursive(data) {
      if (!data) return;
      data.map(async (item, index) => {
        if (!item.argument) return this.recursive(item.els); // 没有 item.argument 继续递归
        const path = item.argument.path; // api 路径
        const api = await this.$store.dispatch(path); // 请求api
        if (!api.Data) return; // api返回是否有数据
        const result = this.$store.getters[path]; // 获取state数据
        this.filter(result, item);
      });
    },
    // 过滤数据
    filter(res, item) {
      console.log(item);
      if (!item.pageForms) return;
      const val = item.pageForms.value;
      const lbl = [item.pageForms.label];
      const value = this.filter2(res, val);
      const label = this.filter2(res, lbl);
      // console.log(value);
      // console.log(label);
    },
    // 过滤数据2
    filter2(res, item) {
      const arr = [];
      item.map((v, i) => {
        // 新建value数组
        if (!arr[i]) arr[i] = [];
        // 存入相关数据
        res.map((itm, inx) => {
          arr[i].push(itm[v]);
        });
      });
      return arr;
    }
  },
  watch: {}
};
