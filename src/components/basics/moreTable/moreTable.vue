<!--  -->
<template>
  <div>
    <jkCard
      :border="config && config.border"
      :grid="config && config.grid"
      :text="config && config.text"
      :path="config && config.path"
      :selectData="config && config.selectData"
      class="up-Height"
    >
      <section class="table-list dasdsd">
        <ScrollBox :isScroll="false" :config="configScrollBox">
          <Ohyeah
            width="100%"
            class="xzys"
            thumbColor="#018AE1"
            :autoHide="true"
            trackColor="#fff"
            height="100%"
            :resizeObject="true"
          >
            <article class="scroll-table-list">
              <table class="table">
                <thead>
                  <tr
                    v-for="(item, key) in Headers"
                    :key="'tr' + key"
                    class="animated fadeInDown"
                    :style="{
                      'animation-delay': 200 + 200 * key + 'ms'
                    }"
                  >
                    <th
                      :class="isBorder()"
                      v-if="
                        (globals.isSerialNumBer ? true : false) && key === 0
                      "
                      class="animated fadeInDown"
                      :rowspan="Headers.length"
                    >
                      序号
                    </th>
                    <th
                      :class="isBorder()"
                      class="animated fadeInDown"
                      :style="{
                        position: 'sticky',
                        height: '51px',
                        top: key * 51 + 'px',
                        'z-index': 9 - key,
                        cursor: item1.isSort ? 'pointer' : 'initial',
                        ...item1.headerStyle
                      }"
                      v-for="(item1, key1) in item"
                      :key="'th' + key1"
                      :rowspan="item1.rowSpan"
                      :colspan="item1.colSpan"
                      @mouseover="hoveIndex = item1.bodyCode"
                      @mouseout="hoveIndex = null"
                      @click="sort(item1, key1)"
                    >
                      <p class="arrFa">
                        <i class="jtArr" :class="showArrow(item1, key1)"></i>
                        {{ item1.headerName }}
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody class="table-list-body" v-if="isRf">
                  <tr v-for="(item, i) in body && body" :key="i">
                    <td
                      v-if="globals.isSerialNumBer ? true : false"
                      :class="isBorder()"
                    >
                      {{ i + 1 }}
                    </td>
                    <!-- 'sticky-td': false && body.length === i + 1, -->
                    <td
                      :class="[isBorder()]"
                      :style="k.bodyStyle"
                      v-for="(k, key1) in item"
                      :key="key1"
                    >
                      <div :class="isUrl(k)" @click="tdClick(k, i, item)">
                        {{ k && k.data }}
                      </div>
                    </td>
                  </tr>
                  <!-- //汇总 -->
                  <template v-if="totalBody">
                    <tr
                      v-for="(item, i) in totalBody && totalBody"
                      :key="'totalBody' + i"
                    >
                      <td
                        v-if="globals.isSerialNumBer ? true : false"
                        :class="isBorder()"
                      >
                        {{ i + 1 }}
                      </td>
                      <td
                        class="sticky-td"
                        :style="k.bodyStyle"
                        v-for="(k, key1) in item"
                        :key="key1"
                      >
                        <!-- <p>{{ k && k.data }}</p> -->
                        <div :class="isUrl(k)" @click="tdClick(k, i, item)">
                          {{ k && k.data }}
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </article>
          </Ohyeah>
        </ScrollBox>
      </section>
      <zpagenav
        class="dwys"
        v-bind:page="PageInfo.page"
        v-bind:page-size="PageInfo.pageSize"
        v-bind:total="PageInfo.total"
        v-bind:max-page="PageInfo.maxPage"
        v-on:pagehandler="pageHandler"
      ></zpagenav>
      <Loading :show="Loading"></Loading>
    </jkCard>
  </div>
</template>

<script>
import { NumFormatGather } from "@/until/format/format.js";
import { Ohyeah } from "vue-ohyeah-scroll";
import { sortsTable, sortsTbody } from "./js/sort.js";
import { tablesJson, moreTablesJson } from "./js/moreTable.js";
import jkCard from "@components/base/jkCard/jkCard";
import Loading from "com/basics/Loading";
import zpagenav from "com/basics/zpagenav";
const ScrollBox = () => import("@components/ScrollBox/ScrollBox.vue");
export default {
  name: "moreTable",
  components: {
    ScrollBox,
    Ohyeah,
    jkCard,
    zpagenav,
    Loading
  },
  props: {
    // filter: {
    //   type: Array,
    //   default: () => []
    // }
    config: {
      type: Object,
      default: () => ({ border: true })
    },
    isRefresh: Boolean
  },
  data() {
    //这里存放数据
    return {
      Loading: false, //加载中子组件状态
      PageInfo: {
        page: 1, //当前页    PageIndex
        pageSize: 12, //每一页显示的数据条数  PageSize
        total: 120, //总数据条数  TotalCount
        maxPage: 7 //显示页码个数(可固定)  TotalPage
      },
      configScrollBox: {
        border: true,
        grid: false,
        inflexion: true
      },
      bodyKeys: [],
      rIndex: 0,
      rArr: [],
      isRf: true,
      Maxlevel: 2,
      globals: false,
      headersIdentity: [],
      totalBody: null,
      originalBody: [], //原始表格数据,用来查找隐藏字段
      hoveIndex: undefined, //鼠标移入显示箭头
      sortIndex: undefined, //当前点击头部节点
      arrSort: {} //存入列当前升降
    };
  },
  computed: {
    // showArrow() {
    //   return (item1, key1) => {
    //     let p;
    //     if (this.arrSort[item1.bodyCode] === 0) {
    //       p = p + "el-icon-caret-top";
    //     } else {
    //       p = p + "el-icon-caret-bottom";
    //     }
    //     if (
    //       item1.isSort &&
    //       (this.sortIndex === key1 || this.hoveIndex === key1)
    //     ) {
    //       p = p + "www";
    //     }
    //     console.log(p);
    //     return "a";
    //   };
    // }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    pageHandler: function(page) {
      this.PageInfo.page = page;
      this.$emit("onTable", this.PageInfo, this.config);
    },
    showArrow(item1, key1) {
      let p = "";
      if (this.arrSort[item1.bodyCode] === 1) {
        p = p + "el-icon-caret-top";
      } else {
        p = p + "el-icon-caret-bottom";
      }
      if (
        item1.isSort &&
        (this.sortIndex === item1.bodyCode || this.hoveIndex === item1.bodyCode)
      ) {
        p = p + " show-arrow";
      } else {
        p = p + " hidden-arrow";
      }
      return p;
    },
    initPageInfo(flat) {
      // console.log("init page info:", this.pageInfo);
      if (flat) {
        const {
          PageIndex,
          PageSize,
          TotalCount,
          TotalPage
        } = this.config.data.value.PageInfo;
        this.PageInfo = {
          page: PageIndex, //当前页    PageIndex
          pageSize: PageSize, //每一页显示的数据条数  PageSize
          total: TotalCount, //总数据条数  TotalCount
          maxPage: 5 //显示页码个数(可固定)  TotalPage
        };
      } else {
        this.PageInfo = {
          page: 0, //当前页    PageIndex
          pageSize: 0, //每一页显示的数据条数  PageSize
          total: 0, //总数据条数  TotalCount
          maxPage: 0 //显示页码个数(可固定)  TotalPage
        };
      }

      // console.log("init page info:", this.pageInfo);
    },
    isBorder() {
      if (this.isRefresh) return;
      if (this.config.pageForms.hideBorder) {
        return "noBorder";
      } else {
        return "";
      }
    },
    init() {
      // console.log(this.config.data);
      if (this.config.data && !this.isRefresh) {
        // console.log("12");
        this.config.data.value.PageInfo
          ? this.initPageInfo(true)
          : this.initPageInfo();
        // this.filter = this.config.data.value;
        this.Headers = this.config.data.value.Headers;
        this.globals = this.config.data.value.globals;
        this.headersIdentity = this.config.data.value.headersIdentity;
        this.body = this._getBody(this.config.data.value.Bodys);
        this.originalBody = this.config.data.value.Bodys;
        // this.totalBody = this._getBody(
        //   this.config.data.value.Bodys.slice(0, 1)
        // );
        if (this.config.data.value.total) {
          this.totalBody = this._getBody(this.config.data.value.total);
        }
        if (this.config.pageForms.hideBorder) {
          this.configScrollBox.border = false;
          this.configScrollBox.inflexion = false;
        }
      } else {
        // this.config = {};
        this.Headers = tablesJson.Headers;
        this.globals = tablesJson.globals;
        this.headersIdentity = tablesJson.headersIdentity;
        this.body = this._getBody(tablesJson.Bodys);
        this.originalBody = tablesJson.Bodys;
        // console.log(this.body);
      }
    },

    sort(item1, key1) {
      if (item1.isSort) {
        this.sortIndex = item1.bodyCode;
        const u = this.arrSort[item1.bodyCode] === 1 ? 0 : 1;
        this.$set(this.arrSort, item1.bodyCode, u);
        // this.arrSort[item1.bodyCode] = this.arrSort[item1.bodyCode] ? 0 : 1;
        // this.$forceUpdate();
        if (item1.sortord && item1.sortord === "front") {
          // this.isRf = false;
          const keys = item1.bodyCode;

          this.body = sortsTbody(keys, this.body, this.arrSort[keys]);
          // this.body = this.body.splice(0, 1);//测试
          // this.isRf = true;
          this.$forceUpdate();
        } else {
          this.$emit("abc", key1);
          // const ww = tablesJson.Bodys.reverse();
          // this.body = this._getBody(tablesJson.Bodys);
          // this.$forceUpdate()
          //0降序,1升序
          const sortArr = [{ sortName: key1, sortOrder: u }];
          this.$emit("sortFun", sortArr);
          // console.log("后端排序", item1.bodyCode);
        }
      }
    },
    getPathParamResult(str) {
      if (!str.includes("=")) return;
      const result = {};
      str.split("&").forEach(item => {
        result[item.split("=")[0]] = item.split("=")[1];
      });
      return result;
    },
    //表格点击
    tdClick(k, index, item) {
      // console.log(this.$route.query.param);
      if (!k.location) return;
      // console.log(index, this.originalBody);
      const keys = k.location.param;
      const p = {};
      keys.forEach(itt => {
        p[itt] = this.originalBody[index][itt];
        // const dd = item.find(o => itt === o.bodyCode);
        // if (dd) {
        //   p[itt] = dd.data;
        // }
      });
      let op;
      if (this.$route.query.param) {
        op = Object.assign(p, JSON.parse(this.$route.query.param));
      } else {
        op = p;
      }
      // console.log("op:", op);
      // return;
      this.$router.push({
        name: "pageDetail",
        query: {
          id: k.location.path,
          param: JSON.stringify({
            ...op,
            ...(k.pathParam && this.getPathParamResult(k.pathParam))
          })
        }
      });
    },
    isUrl(k) {
      if (!k.location) return "";
      return "AddUnderline";
    },
    format(f, item) {
      switch (f.formatting) {
        case "String": {
          //文本
          return item;
        }
        case "N2S": {
          //千分位分隔符,2小数
          return NumFormatGather(item, 2);
        }
        case "N0S": {
          //千分位分隔符,整数.
          return NumFormatGather(item, 0);
        }
        case "n2": {
          //2位小数
          return parseFloat(item).toFixed(2);
        }
        case "n0": {
          return parseFloat(item).toFixed(0);
          //整数
        }
        default: {
          return item;
        }
      }
    },
    www(arr, l) {
      // console.log(arr, l);
      arr.map((itt, index) => {
        if (!Array.isArray(itt)) {
          if (itt.colSpan === 1) {
            if (itt.rowSpan === 1) {
              this.bodyKeys.push(itt);
            } else {
              this.rArr.push({
                line: itt.rowSpan,
                idx: itt.colSpan
              });
            }
          } else {
            this.rArr.push({
              idx: itt.colSpan + index + 1,
              dd: itt
            });
          }
        } else {
          this.www(itt, arr.length);
        }
      });
    },
    w2(arr) {
      let j = 0;
      arr.map((itt, index) => {
        if (itt.colSpan === 1) {
          if (itt.rowSpan === 1) {
            this.bodyKeys.push(itt);
          } else {
            this.rIndex = itt.rowSpan + index;
            this.rArr = itt;
          }
        } else {
          j = itt.colSpan;
          // this.rArr = itt;
        }
        // console.log(index, this.rIndex, j, this.rArr);
        // console.log(index === this.rIndex);
        // console.log("---------");
        if (index === this.rIndex) {
          this.bodyKeys.push(this.rArr);
        }
        // if (index === j && index !== this.rIndex) {
        //   this.bodyKeys.push(this.rArr);
        // }
      });
    },
    _getBody(body) {
      if (!body) return [];
      const _body = [];
      // this.w2(this.Headers.flat());
      // this.www(this.Headers, -1);
      // const flat = this.bodyKeys;
      const headerIdentity = JSON.parse(
        JSON.stringify(this.headersIdentity)
      ).sort((prev, next) => prev.index2 - next.index2);
      const Headers = this.Headers;
      const flat = headerIdentity
        ? headerIdentity.map((item, i) => {
            return {
              ...Headers.flat().find(
                field => field.bodyCode && field.bodyCode === item.fieldName
              ),
              index: i
            };
          })
        : [];
      // // return;
      // const flat = this.Headers.filter(v => {
      //   console.log(v);
      //   if (v.colSpan === 1 || v.rowSpan > 1) {
      //     return v.bodyCode;
      //   }
      // });
      // 列表数据处理
      // console.log("flat:", flat);
      body.map((b, n) => {
        let arr = [];
        flat.map((f, index) => {
          arr.push({
            bodyCode: f.bodyCode,
            data: this.format(f, b[f.bodyCode]),
            intrinsic: b[f.bodyCode],
            location: f.location,
            bodyStyle: f.bodyStyle,
            sortord: f.sortord,
            pathParam: f.pathParam
          });
        });
        _body.push(arr);
      });
      return _body;
    }
  },
  //监控data中的数据变化
  watch: {
    config: {
      deep: true,
      handler() {
        this.init();
        this.$forceUpdate();
      }
    }
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped lang="scss">
@import "./MultiThead.scss";
.MultiThead {
  position: relative;
}
/deep/ .ohyeah-scroll-box .ohyeah-scroll-vertical-track-h {
  z-index: 999;
}
/deep/ .up-Height {
  // height: 100%;
  .content {
    height: 100%;
    padding: 0;
    position: relative;
    display: flex;
    flex-flow: column;
    // border: 1px solid;
  }
}
</style>
