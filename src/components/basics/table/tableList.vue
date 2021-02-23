<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-04-30 17:00:08
 * @LastEditors: wss
 * @LastEditTime: 2020-12-04 10:40:33
-->

<template>
  <div class="content-body TableList" :data-theme="'red'">
    <!-- <div>222</div> -->
    <section class="tl">
      <section class="table-list">
        <IScroll :isScroll="false">
          <article class="scroll-table-list bar">
            <table class="table" :style="tableStyle.table">
              <thead :style="tableStyle.thead">
                <tr>
                  <th class="animated fadeInDown" :style="[tableStyle.th]">
                    序号
                  </th>
                  <th
                   :colspan="t.col"
                   :rowspan="t.row"
                    class="animated fadeInDown"
                    :style="[t.style, tableStyle.th, { cursor: 'pointer' }]"
                    v-for="(t, i) in thead2"
                    @mouseover="hoveIndex = i"
                    @mouseout="hoveIndex = undefined"
                    @click="sort(t, i, tableStyle.thead)"
                    :key="'TableList-th' + i"
                  >
                    <!-- <tr
                    :colspan="t.col > 0 ? t.col : 1"
                    :rowspan="t.row > 0 ? t.row : 1"
                  > -->
                    {{ t.name }}
                    <!-- </tr> -->
                    <!-- <span>
                    <i
                      v-show="sortIndex === i || hoveIndex === i"
                      :class="
                        arrSort[i]
                          ? 'el-icon-caret-top'
                          : 'el-icon-caret-bottom'
                      "
                    ></i>
                    {{ t.name }}
                  </span> -->
                  </th>
                </tr>
              </thead>
              <tbody :style="tableStyle.tbody">
                <!-- backgroundColor: active === i ? tableStyle.active : tableStyle.striated -->
                <tr
                  class="change"
                  :style="changeStyle(i)"
                  v-for="(t, i) in tbody2"
                  :key="'TableList-tr' + i"
                  @mouseenter="trIndex = i"
                  @mouseleave="trIndex = -1"
                >
                  <td>{{ i + 1 }}</td>
                  <template v-for="(_t, j) in t">
                    <td
                      :key="'TableList-tb' + j"
                      :style="[_t.style, tableStyle.td]"
                    >
                      <!-- {{t['_noshow_style']}} -->

                      <!-- <tableProp v-if="_t.isUrl"></tableProp> -->
                      <router-link v-if="_t.isUrl">_t.name</router-link>

                      <p v-else>{{ qfw(_t.name) }}</p>
                      <!-- <p>{{ qfw(_t.name) }}</p> -->
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </article>
        </IScroll>
      </section>
    </section>
  </div>
</template>
<script>
// import tableProp from "com/tableProp/tableProp";
import { sortsTable, sortsTbody } from "./js/sort.js";
import { tablesJson } from "./js/tables.js";
const IScroll = () => import("../IScroll/IScroll.vue");
export default {
  name: "TableG",
  props: {
    // 2020/07/21修改
    isRefresh: {
      type: Boolean
    },
    // 2020/07/21修改
    config: {
      type: Object
      // default: () => {},
    }
    // tbody2: {
    //   type: Array,
    //   default: () => []
    // }
  },
  data() {
    return {
      sortIndex: undefined, //当前点击头部节点
      hoveIndex: undefined, //鼠标移入显示箭头
      thead2: null,
      theadJson: {}, //后端返回结构暂
      tbody2: null,
      tableStyle: null,
      striated: "red",
      trIndex: -1,
      active: false,
      a: 0,
      arrSort: [] //存入列当前升降
    };
  },
  mounted() {
    // this.$emit("tableList");
    // !this.tables && (this.tables = tablesJson);
    this.init();
    this.body = tablesJson.Bodys;
    this.Headers = tablesJson.Headers;
    // console.log(this.tbody);
  },
  methods: {
    sort(item, index, x) {
      // console.log(item);
      this.sortIndex = index;
      this.arrSort[index] = this.arrSort[index] ? 0 : 1;
      const keys = item.col;
      //方式一
      // this.tbody = sortsTable(keys, tablesJson.Data.Bodys, null);
      // this.init();
      //方式二
      const w = sortsTbody(keys, this.tbody2, this.arrSort[index]);
      this.tbody2 = w;
    },
    init() {
      this.theadJson =
        // !this.config.data ||
        this.isRefresh ? tablesJson.Data.Headers : this.config.data.Headers;
      this.tbody =
        // !this.config.data ||
        this.isRefresh ? tablesJson.Data.Bodys : this.config.data.Bodys;
      this.tableStyle = tablesJson.Style;
      this.theadJson.length && this.getThead(this.theadJson[0]);
      this.tbody.length && this.getTBody(this.tbody);
      this.tableStyle = tablesJson.Style;
    },
    // striatedColor(index) {
    //   if (index % 2 === 0) {
    //     return `backgroundColor:${this.tableStyle.striated}`;
    //   }
    // },
    getThead(list) {
      let index = 0;
      const arr = [];
      for (const key in list) {
        // console.log(key);
        arr[index] = {
          key: key,
          name: list[key].showName,
          style: list[key].style,
          col: list[key].col,
          row: list[key].row
        };
        index++;
      }
      this.thead2 = arr;
    },
    getTBody(list) {
      const arr = list.map((item, key) => {
        const cacle = {};
        this.thead2.map(k => {
          // k["style"] = this.theadJson[k["col"]] && this._thead[k["col"]].style;
          cacle[k.col] = {
            name: item[k.col],
            isUrl: this.theadJson[k.col] && this.theadJson[k.col].isUrl,
            style: this.theadJson[k.col] && this.theadJson[k.col].style
          };
        });
        return cacle;
      });
      // console.log(arr);
      this.tbody2 = arr;
    },
    qfw(num) {
      if (typeof num !== "number") return num;
      if (num.toString().length <= 3) return num;
      return num
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
        .split(".")[0];
    },
    striatedColor(index, d) {
      // console.log(d);
      let cc = "initial";
      if (d === 0) {
        cc = this.tableStyle.active;
      } else {
        if (index % 2 !== 0) {
          cc = this.tableStyle.striated;
        } else {
          cc = "initial";
        }
      }
      // this.active = `backgroundColor:${cc}`;
      return `backgroundColor:${cc}`;
    },
    changeStyle(i) {
      if (this.trIndex === i) {
        return {
          backgroundColor: this.tableStyle.active
        };
      } else {
        return {
          backgroundColor: i % 2 ? this.tableStyle.striated : "initial"
        };
      }
    }
  },
  computed: {
    // hoverColor(index) {
    //   return function(index) {
    //     console.log(212);
    //     return "backgroundColor:red";
    //     // if (index === this.trIndex) {
    //     //   return `backgroundColor:${this.tableStyle.striated}`;
    //     // } else {
    //     //   return "backgroundColor:green";
    //     // }
    //   };
    // }
  },
  watch: {
    config: {
      deep: true,
      immediate: true,
      handler(res) {
        this.init();
      }
    }
    // trIndex(i) {
    //   console.log(i);
    // }
  },
  components: {
    IScroll
    // tableProp
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import "com/variable.scss";
@import "./TableG";
@import "./ani";
// @import "../../assets/css/animated";

.TableList {
  color: #fff;
}
// tr:nth-of-type(even) {
//   background: striated;
// }
</style>
