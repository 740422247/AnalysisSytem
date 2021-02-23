<!--
 * @Descripttion: cqMap
 * @version: 1.0.0
 * @Author: wss
 * @Date: 2020-07-06 10:24:32
 * @LastEditors: wss
 * @LastEditTime: 2020-12-30 09:46:19
-->
<template>
  <div class="mapSvg fix">
    <div class="map-top">
      <img
        class="guanghuan"
        v-for="i in 10"
        :key="i"
        src="~assets/gqqqq.png"
        alt
      />
      <div class="fcxx">
        <div class="list">
          <div class="img">
            <img src="~assets/mapRen.png" alt />
          </div>
          <div class="tit">
            <div class="title">{{ year }}发放人次</div>
            <div>
              <span class="amount">{{ sumData.PERSON | NumFormat }}</span
              >人
            </div>
          </div>
        </div>
        <div class="list">
          <div class="img">
            <img src="~assets/mapJine.png" alt />
          </div>
          <div class="tit">
            <div class="title">{{ year }}发放金额</div>
            <div>
              <span class="amount">{{ sumData.MONEY | NumFormat }}</span
              >万元
            </div>
          </div>
        </div>
      </div>

      <cqMapSvg
        class="svvg"
        :isMap.sync="isMap"
        :showZC.sync="showZC"
        :county="county"
        :shiGeoCoordMap="shiGeoCoordMap"
      ></cqMapSvg>
    </div>
    <div class="showDataContent">
      <jkCard
        type="colum"
        v-for="(item, index) in listCount"
        :key="item.id"
        :config="{ ...item, index: index, imgStyle: { width: '70px' } }"
        class="jkCard"
      />
    </div>
  </div>
</template>
<script>
import cqMapSvg from "./svg/svg.vue";
import CqZc from "./svg/CqZc.vue";
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";

import jkCard from "@components/chart/jkCard";
export default {
  name: "cqMap",
  // inject: ["echarts", "pTheme"],
  props: {
    // ["shiGeoCoordMap", "county", "coll"],
    shiGeoCoordMap: {
      type: Array,
      default: () => null
    },
    county: {
      type: Array,
      default: () => null
    }
  },
  data() {
    return {
      timName: null,
      showZC: false, //主城区大图显示
      isMap: false, //默认鼠标未在地图上
      year: "",
      isBankuai: false, //是否在板块上
      zcqx: ""
    };
  },
  filters: {
    toFixed: function(value) {
      let aa = parseInt(value.toFixed(2));
      return aa;
    },
    NumFormat: function(data) {
      if (typeof data !== "number") return data;
      if (data == 0 || data == "0") return 0;
      var a = parseFloat(data);
      let value = parseFloat(data);
      if (isNaN(a) || a < 1000 || a == 0 || a == "0") {
        return value;
      } else {
        if (a == value) {
          if (!value) return " ";
          var intPart = Number(value).toFixed(); // 获取整数部分
          let intPartFormat;
          if (Math.floor(value) == value) {
            intPartFormat = intPart
              .toString()
              .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 将整数部分逢三一断
          } else {
            intPartFormat = value
              .toFixed(2)
              .replace(/(\d)(?=(\d{3})+\.)/g, "$1,"); //使用正则替换，每隔三个数加一个','
          }

          return intPartFormat;
        }
        return value;
      }
    },
    tenThousand: function(value) {
      if (value === "0" || value === 0) {
        return 0;
      }
      if (!value) return "";
      const vv = parseInt(value);
      const cc = (vv / 10000).toFixed(2);
      return cc;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.pushZc();
    // console.log(this.county);
    this.year = "2019年";
    // this.county = this.county.map(item => ({
    //     title: item.NAME,
    //     prople: item.PERSON,
    //     money: item.MONEY,
    //     PROJECTS: item.PROJECTS,
    //     CODE: item.CODE,
    //     PERSONTIME: item.PERSONTIME,
    //     ISENABLE: item.ISENABLE
    //   }));
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    const _this = this;
    this.$nextTick(function() {
      const imgs = Array.from(document.querySelectorAll("image"));
      imgs.map(d => {
        d.addEventListener("mousemove", e => {
          const tkdName = e.currentTarget.getAttribute("itt");
          _this.$emit("ycdt", true);
          _this.$emit("codeNmae", tkdName, 1);
        });
        d.addEventListener("mouseout", () => {
          _this.$emit("ycdt", false);
        });
      });
      const g = Array.from(document.querySelectorAll("#map g.city"));
      g.map(d => {
        d.addEventListener("mousemove", e => {
          this.isMap = true;
          const codeNmae = Array.from(
            e.currentTarget.querySelectorAll("text tspan")
          );
          const str = codeNmae.map(t => t.innerHTML);
          const a = str.join("");
          _this.$emit("codeNmae", a, 0);
        });
        d.addEventListener("mouseout", () => {
          this.isMap = false;
          _this.$emit("ycdt", false);
        });
        d.addEventListener("click", e => {
          const codeNmae = Array.from(
            e.currentTarget.querySelectorAll("text tspan")
          );
          const str = codeNmae.map(t => t.innerHTML);
          const a = str.join("");
          if (a === "主城区") {
            this.showZC = true;
          } else {
            this.county.map(item => {
              //   test.map((item) => {
              if (item.title === a) {
                this.$store.commit("SET_Compartment", {
                  code: item.CODE,
                  name: item.title
                });
                this.$router.push({
                  name: "pageDetail",
                  query: {
                    id: this.$store.state.previewList.routerId.map,
                    param: JSON.stringify({ districtid: item.CODE })
                  }
                });
              }
            });
          }
          // _this.$emit("svgClick", a);

          // _this.$emit("codeNmae", a, 0);
        });
      });
    });
  },
  //方法集合
  methods: {
    // ...mapMutations({
    //   setJkCardData: "previewList/setJkCardData" // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    // }),
    pushZc() {
      const zcJson = {
        title: "主城区",
        prople: 0,
        money: 0,
        PROJECTS: 0,
        CODE: "88888888",
        PERSONTIME: 0,
        ISENABLE: "1"
      };
      this.county.map(item => {
        let isZC = false;
        switch (item.CODE) {
          case "500103":
            isZC = true;
            break;
          case "500104":
            isZC = true;
            break;
          case "500105":
            isZC = true;
            break;
          case "500106":
            isZC = true;
            break;
          case "500107":
            isZC = true;
            break;
          case "500108":
            isZC = true;
            break;
          case "500109":
            isZC = true;
            break;
          case "500112":
            isZC = true;
            break;
          case "500113":
            isZC = true;
            break;
        }
        if (isZC) {
          zcJson.prople += item.prople;
          zcJson.money += item.money;
          zcJson.PROJECTS += item.PROJECTS;
          zcJson.PERSONTIME += item.PERSONTIME;
        }
      });
      this.county.push(zcJson);
    },
    GoProjectDetailSmall(item) {
    },
    isScale(itt) {
      let a = parseInt(itt).toString();
      // var num = 1.2345;
      var x = String(itt).indexOf(".") + 1; //判断小数点,设置字体大小
      if (x == 0) {
        if (a.length >= 8) {
          return true;
        }
      } else {
        if (a.length >= 6) {
          return true;
        }
      }

      return false;
    },
    isGray(code) {
      let re = true;
      this.county.forEach(item => {
        // eslint-disable-next-line eqeqeq
        if (item.CODE == code) {
          re = false;
        }
      });
      return !re;
    }
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState({
      jkCardData: state => state.previewList.jkCardData,
      sumData: state => state.previewList.sumData
    }),
    ...mapGetters({
      listCount: "previewList/listCount"
      // ..."anotherGetter"
      // ...
    }),
    tkd() {
      let a = this.shiGeoCoordMap;
      a = a.map(item => ({
        dw: { left: "20vw", top: "10vh" },
        ...item
      }));
      // console.log(a);
      return a;
    }
  },
  //监控data中的数据变化
  watch: {
    county: {
      deep: true,
      immediate: true,
      handler(res) {
        this.county = res;
        // this.config && (this.mapData = this.config);
      }
    },
    shiGeoCoordMap: {
      deep: true,
      immediate: true,
      handler(res) {
        this.shiGeoCoordMap = res;
        // this.config && (this.mapData = this.config);
      }
    },
    isMap(a, b) {
      if (this.timName) {
        window.clearInterval(this.timName);
      }
      this.timName = setTimeout(() => {
        if (!a) {
          this.$store.commit("previewList/setDefaultJkCardData", null);
        }
      }, 100);
    }
  },
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
  components: { cqMapSvg, jkCard, CqZc }
};
</script>
<style lang="scss" scoped>
@import "@components/customization/variable.scss";
.svvg {
  position: relative;
  z-index: 20;
  height: 100%;
  display: flex;
}

//@import url(); 引入公共css类
.mapSvg {
  position: relative;
}
.fcxx {
  position: absolute;
  left: 30px;
  top: 30px;
  .list {
    overflow: hidden;
    > div {
      display: inline-block;
      float: left;
      height: 66px;
      margin-bottom: 15px;
    }
    .img {
      width: 55px;
      height: 55px;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .tit {
      font-size: 15px;
      color: #81a7dc;
      text-align: left;
    }
    .amount {
      font-size: 30px;
      color: #ffffff;
    }
  }
}

@for $i from 1 to 11 {
  .guanghuan:nth-of-type(#{$i}) {
    z-index: 2;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(0) scale(0);
    // z-index: -1;
    animation: ani2 10s ($i * 1) * 1s ease-in-out infinite;
  }
}
@keyframes ani2 {
  0% {
    transform: translateX(-50%) translateY(0) scale(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(0) scale(0.85);
    opacity: 0;
  }
}
//底部中间
.collect {
  // display: flex;
  position: relative;
  z-index: 20;
  // bottom: 0;
  // left: 0;
  // right: 0;
  text-align: center;
  // position: absolute;
  // bottom: 0;
  margin-top: vh(25);
  height: vh(220);
  .colle2 {
    position: relative;
    // flex: 1;
    display: inline-block;
    width: vw(200);
    height: 100%;
    border: 1px solid #102175;
    padding: 15px 18px;
    margin-right: vw(35);
    transition: all 0.35s ease-in-out;
    background: -webkit-linear-gradient(
        top,
        transparent 10px,
        rgba(19, 37, 116, 0.4) 11px
      ),
      -webkit-linear-gradient(left, transparent 10px, rgba(19, 37, 116, 0.4)
            11px);
    cursor: pointer;
    background-size: 11px 11px;
    &:after {
      background: -webkit-linear-gradient(
        top,
        transparent 0px,
        rgba(15, 15, 103, 0.85) 100%
      );
      content: "";
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      line-height: 0;
      z-index: -1;
      clear: both;
    }
    &:hover {
      box-shadow: rgba(31, 119, 239, 0.7) 0px 0px 12px inset;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  .hg {
    margin: 5px 0;
  }
  .img {
    height: vh(90);
    img {
      height: 100%;
    }
  }
  .title {
    font-size: 16px;
    color: #81a7dc;
    margin: 6px 0;
  }
  .amount {
    text-align: center;
    font-size: 30px;
    color: #fff;
    line-height: 45px;
  }
}
.fix {
  display: flex;
  flex-flow: column;
}
.map-top{
  flex: 1;
}
.showDataContent {
  width: 100%;
  // position: absolute;
  // bottom: 0;
  // left: 0;
  // right: 0;

  flex: 0 0 160px;
  display: flex;
  .jkCard {
    flex: 1;
    margin: 0 26px;
  }
}
</style>
