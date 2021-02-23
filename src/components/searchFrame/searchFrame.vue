<!--
 * @Descripttion: 搜索弹窗
 * @version:
 * @Author: joykit
 * @Date: 2019-10-30 17:34:51
 * @LastEditors: wss
 * @LastEditTime: 2021-01-11 10:57:28
 -->
<template>
  <div class="content-body search_1">
    <!-- <input type="text" class="button button-hover" placeholder="请输入" />
    <input type="text" class="button button-hover" placeholder="请输入" />-->
    <!-- <button
      class="more"
      :class="{
        active: isShow
      }"
      @click="(isShow = !isShow) && (isInit = true)"
      type="button"
    >
      <span>查询</span>
      <img :src="ico" alt />
    </button>-->
    <!-- <div>
      {{selectItems}}
      <ul >
        <li v-for="(item,index) in selectItems && selectItems.split(' | ')" :key="index">{{item}}</li>
      </ul>
    </div>-->
    <section class="search-1-1">
      <div
        class="items"
        :style="comWidth(item)"
        v-for="(item, key) in filter"
        :key="'filter' + key"
      >
        <div>
          <template v-if="item['type'] === 'input'">
            <Input class="input-wrap" :item="item" />
          </template>
          <template v-else-if="item['type'] === 'select'">
            <Select class="input-wrap" :item="item" />
          </template>
          <template v-else-if="item['type'] === 'datetime'">
            <div class="date">
              <span>时间</span>
              <vue-datepicker-local
                v-model="item['putModel']"
                :format="item.formatting ? item.formatting : 'YYYY-MM-DD'"
                show-buttons
                @confirm="selectedDate"
              />
            </div>
          </template>
        </div>
      </div>
      <div v-if="filter" class="syx_1">
        <button type="button" class="syx" @click="submit">
          <img :src="ss" alt />
          搜一下
        </button>
      </div>
    </section>

    <!-- <section
      class="search-frame"
      :class="{
        animated2: isInit,
        fadeInDown3: isShow,
        fadeInDown3_1: !isShow
      }"
    >
      <button type="button" class="close" @click="isShow = !isShow">
        <img :src="close" alt />
      </button>
      <article class="frame ">

      </article>

    </section>-->
  </div>
</template>
<script>
import { json } from "./js/json.js";
const Input = () => import("@/components/base/Input/Input.vue");
const Select = () => import("@/components/base/Select/Select.vue");
const VueDatepickerLocal = () =>
  import("@/components/base/VueDatepickerLocal/VueDatepickerLocal.vue");
export default {
  name: "searchFrame",
  props: {
    // filter: {
    //   type: Array,
    //   default: () => []
    // }
    config: {
      type: Object,
      default: () => null
    },
    isRefresh: Boolean
  },
  data() {
    const min = new Date(2017, 5, 1, 0, 0, 0);
    return {
      filter: [],
      time: min,
      ico: require("@static/image/xiala.png"),
      ss: require("@static/image/ss.png"),
      close: require("@static/image/close.png"),
      isShow: false,
      isInit: false,
      data: [],
      selectItems: ""
    };
  },
  mounted() {
    // console.log(this.config);
    this.init();
    // console.log(this.filter);
  },
  computed: {},
  methods: {
    comWidth(item) {
      const a = { width: item.formWidth };
      // console.log(a);
      return a;
    },
    init() {
      if (this.config && !this.isRefresh) {
        this.filter = this.config.data.value;
      } else {
        this.filter = json;
      }
    },
    dateFormat(fmt, date) {
      if (typeof date === "string") return date;
      let ret;
      let opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
    selectedDate(date) {
      // console.log("You have been selected:");
      // console.log(date);
    },
    submit() {
      const _this = this;
      const filter = {};
      this.isShow = false;
      this.selectItems = "";
      this.filter &&
        this.filter.map(f => {
          if (f.type == "datetime") {
            let d = f["putModel"];
            if (d == null || d == "null") {
              filter[f.id] = "";
            } else {
              filter[f.id] = _this.dateFormat("YYYY-mm-dd HH:MM:SS", d);
              f["showModel"] = _this.dateFormat("YYYY-mm-dd", d);
            }
          } else {
            filter[f.id] = f["putModel"];
          }

          // 以下乱七八糟处理
          f["showModel"] = f["putModel"] ? f["showModel"] : "";
          const str = !f["showModel"]
            ? ""
            : f["label"] + ": " + f["showModel"] + " | ";
          this.selectItems += str;
        });
      // 乱七八糟处理 续集
      this.selectItems = this.selectItems
        .trim()
        .substr(0, this.selectItems.length - 2);
      // 乱七八糟处理 end
      // console.log(this.filter);
      // console.log(filter);
      // this.$emit("searchFrame", JSON.stringify(filter));
      this.$emit("searchFrame", this.filter, this.config);
    }
  },
  watch: {
    filter(res) {
      this.data = res;
    },
    config: {
      deep: true,
      handler() {
        this.init();
      }
    }
  },
  components: {
    Input,
    Select,
    VueDatepickerLocal
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./searchFrame";
@import "./ani";
.date {
  height: 60px;
  align-items: center;
  display: table;
  span {
    color: #9dbae3;
  }
  > * {
    vertical-align: middle;
    align-items: center;
    display: table-cell;
  }
}
// @import "../../assets/css/animated";
</style>
