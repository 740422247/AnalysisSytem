<template>
  <nav class="zpagenav" v-if="zym > 1">
    <div class="ewtz">
      <span class="total fr">共 {{ total }} 条</span>
      <span class="jumppoint">跳转到：</span>
      <span class="jumpinp">
        <input type="text" v-model.number="changePage" />
      </span>
      <span class="jump gobtn" @click="jumpPage(changePage)">GO</span>
    </div>

    <ul class="page-ul">
      <li
        v-bind:key="index"
        v-for="(item, index) in pageList"
        v-bind:class="item.class"
        @click.stop="setPage(item)"
        v-html="item.html"
      ></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "zpagenav",
  data() {
    return {
      changePage: ""
    };
  },
  props: {
    prevHtml: String,
    nextHtml: String,
    page: Number,
    total: Number,
    pageSize: Number,
    maxPage: Number
  },
  computed: {
    zym() {
      return this.total / this.pageSize;
    },
    pageList: function() {
      const _this = this;
      const pageList = [];
      let pageCount = Math.ceil(_this.total / _this.pageSize);
      let page = _this.page;
      let prevHtml = _this.prevHtml ? _this.prevHtml : "上一页";
      let nextHtml = _this.nextHtml ? _this.nextHtml : "下一页";
      let maxPage = _this.maxPage ? _this.maxPage : 9;

      let hasPrev = page > 1;
      let hasNext = page < pageCount;

      //上一页
      pageList.push({
        class: hasPrev ? "" : "disabled",
        page: hasPrev ? page - 1 : page,
        html: prevHtml
      });

      //首页
      pageList.push({
        class: page == 1 ? "active" : "",
        page: 1,
        html: 1
      });

      var p0 = Math.floor(maxPage / 2);
      var p1 = 1 + 2 + p0; //首页+省略至少2个页码+中间页面数的一半

      var start, end;
      if (page >= p1) {
        start = page - p0;
        //前置省略号
        pageList.push({
          class: "dot",
          page: page,
          html: "..."
        });
      } else {
        start = 2;
      }

      var p2 = page + p0;
      if (p2 < pageCount) {
        end = p2;
      } else {
        end = pageCount - 1;
      }

      //页码列表
      for (let i = start; i <= end; i++) {
        pageList.push({
          class: page == i ? "active" : "",
          page: i,
          html: i
        });
      }

      if (end < pageCount - 1) {
        //后置省略号
        pageList.push({
          class: "dot",
          page: page,
          html: "..."
        });
      }

      //尾页
      if (pageCount > 1) {
        pageList.push({
          class: page == pageCount ? "active" : "",
          page: pageCount,
          html: pageCount
        });
      }

      //下一页
      pageList.push({
        class: hasNext ? "" : "disabled",
        page: hasNext ? page + 1 : page,
        html: nextHtml
      });

      return pageList;
    }
  },
  methods: {
    jumpPage(va) {
      // console.log(Math.ceil(this.total / this.pageSize));
      let maxpage = Math.ceil(this.total / this.pageSize);
      // if(va<=)
      if (va <= maxpage) {
        this.$emit("pagehandler", va);
      } else {
        this.changePage = maxpage;
        this.$emit("pagehandler", maxpage);
      }
    },
    setPage: function(item) {
      if (item.class == "") {
        this.$emit("pagehandler", item.page);
      }
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @import "com/variable.scss";
.ewtz {
  display: inline-block;
  float: right;
  color: #fff;
  margin: 20px 20px 20px 0;
  input {
    width: 55px;
    height: 26px;
    font-size: 13px;
    border: 1px solid #0149a9;
    border-radius: 4px;
    text-align: center;
  }
  .gobtn {
    border: 1px solid #0149a9;
    padding: 5px 8px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 5px;
    font-size: 12px;
  }
}
.total {
  // float: right;
  color: #fff;
  margin: 20px;
  height: 28px;
  line-height: 28px;
}
.zpagenav {
  flex: 0 0 68px;;
  // position: absolute;
  // right: 20px;
  // bottom: 0;
  text-align: center;
  -webkit-user-select: none;
}

.zpagenav {
  font-family: arial;
  // color: #48576a;
  overflow: hidden;
  > * {
    vertical-align: middle;
  }
}

.zpagenav ul {
  display: inline-block;
  margin: 20px 0px 20px 20px;
  padding: 0;
  float: right;
}

.zpagenav ul li {
  color: #fff;
  display: inline-block;
  margin: 0;
  padding: 0 4px;
  margin: 0 3px;
  border: 1px solid #0149a9;
  border-radius: 2px;
  //   border-right: 0;
  //   background: #fff;
  font-size: 13px;
  min-width: 28px;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
}

// .zpagenav ul li:last-child {
//   border-right: 1px solid #d1dbe5;
// }

.zpagenav ul li:hover {
  color: #20a0ff;
}

.zpagenav ul li.active {
  background: #337ab7;
  border-color: #337ab7;
  color: #fff;
  cursor: default;
}

.zpagenav ul li.active:hover {
  color: #fff;
}

.zpagenav ul li.disabled {
  cursor: not-allowed;
  background: #ddd;
  color: #fff;
  display: none;
}

.zpagenav ul li.dot {
  cursor: default;
}
</style>
