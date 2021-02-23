<!--  -->
<template>
  <div class="">
    <div>tablelist</div>
    <ScrollBox :isScroll="false">
      <Ohyeah
        width="100%"
        class="xzys"
        thumbColor="#018AE1"
        :autoHide="true"
        trackColor="#fff"
        height="31.9vh"
      >
        <article class="scroll-table-list">
          <table class="table">
            <thead>
              <!--  class="animated fadeInDown"
                    :style="{
                  'animation-delay': 200 + 200 * key + 'ms'
                  }"-->
              <tr v-for="(item, key) in Headers" :key="'tr' + key">
                <th
                  class="aa animated fadeInDown"
                  :style="{
                    position: 'sticky',

                    top: key * 36 + 'px',
                    'z-index': 888
                  }"
                  :columnName="item1.ColumnName"
                  :childrenCount="item1.LeafCount - 1"
                  v-for="(item1, key1) in item"
                  :key="'th' + key1"
                  :rowspan="
                    item1.LeafCount - 1 > 0 ? 1 : Maxlevel - item1.Level
                  "
                  :colspan="item1.LeafCount > 0 ? item1.LeafCount : 1"
                >
                  <p>{{ item1.HeaderName }}</p>
                </th>
              </tr>
            </thead>
            <tbody class="table-list-body">
              <tr
                v-for="(item, i) in body && body"
                :key="i"
                class="animated fadeInDown"
              >
                <template v-for="(k, key1) in item">
                  <td
                    v-if="key1 != 8"
                    class="aa listAni animated fadeInDown"
                    :key="k.id"
                  >
                    {{ k && k.data }}
                  </td>
                  <td
                    v-if="key1 == 8"
                    :title="k.data"
                    class="aa listAni"
                    :key="k.id"
                  >
                    {{ k && k.data }}
                  </td>
                </template>

                <td>
                  <span
                    v-if="item[0].idd != '汇总'"
                    class="btn"
                    @click="ManuallyRefresh(item, i, item[0].idd)"
                  >
                    <b v-show="!isDisable[i]">手动同步</b>
                    <b v-show="isDisable[i]">同步中...</b>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </Ohyeah>
    </ScrollBox>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Ohyeah } from "vue-ohyeah-scroll";
import { thead } from "./headJson/Tablehead";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "tableList",
  components: {},
  data() {
    //这里存放数据
    return {
      isDisable: [], //防止多次提交
      Loading: false, //加载中子组件状态
        Headers: null,
        body: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    async getHead() {
      //   const resss = await api.GetAnalysisMain(this.setParam());
      const res = thead;
      this._getHead(res.Data);
    },
    async getBody() {
      const res = await api.GetXXXMainResult(this.setParam());
      this.body = this._getBody(res.Data[0].Bodys.Items);
      //   this._getMark(res.Data[0].Remark);
      this.getInfo(res.Data[0].Bodys.PageInfo);
    },
    getInfo(list) {
      this.total = list["TotalCount"];
      //   this.exportParam.fileName = `${this.Title}-${this.Remark}.xlsx`;
    },
    setParam() {
      const param = (this.exportParam = {
        year: this.query.year || this.query.Year || "all",
        paramInfo: this.search,
        PageSize: this.size,
        PageIndex: this.page,
        ApiName: "GetAnalysisBodys",
        fileName: ""
      });
      return param;
    },
    _condition(con) {
      //this.searchData
      const arr = [];
      con.map((c, index) => {
        const aa = {
          id: c["Id"],
          label: c["Name"],
          placeholder: c["Placeholder"],
          putModel: c["PutModel"],
          showModel: c["ShowModel"],
          type: c["Type"],
          _data: c["CondData"],
          children: []
        };
        arr.push(aa);
        this._condition2(c["CondData"], aa["children"]);
      });
      this.searchData = arr;
    },
    _condition2(_data, item) {
      _data &&
        _data.map(cc => {
          const v = cc.Value;
          const p =
            cc["Children"].length > 0
              ? {
                  id: v["Id"],
                  label: v["Name"],
                  _data: cc["Children"],
                  children: []
                }
              : {
                  id: v["Id"],
                  label: v["Name"],
                  _data: cc["Children"]
                };
          item.push(p);
          if (p._data.length > 0) {
            this._condition2(p._data, p["children"]);
          }
        });
    },
    _getHead(head) {
      this.Headers = head.Headers;
      //   this.Maxlevel = head.Maxlevel + 1;
      //   this.Title = head.Title;
    },
    _getMark(Remark) {
      //顶部统计数据
      this.Remark = Remark;
    },
    _getBody(body) {
      const _body = [];
      //   const flat = this.Headers.flat().filter(v => {
      //     if (v.LeafCount === 1) {
      //       return v.ColumnName;
      //     }
      //   });
      const flat = [
        "DISTRICTNAME",
        "FIRSTDT",
        "CT",
        "SUC",
        "FAIL",
        "LASTDT",
        "STATUS",
        "ROWCOUNT",
        "REMARK"
      ];
      // 列表数据处理
      body.map((b, n) => {
        let arr = [];
        flat.map((f, index) => {
          arr[index] = {
            idd: b.DISTRICTID,
            data: b[f]
          };
        });
        _body.push(arr);
      });
      return _body;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
