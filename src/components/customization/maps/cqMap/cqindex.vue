<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-06 16:26:30
 * @LastEditors: wss
 * @LastEditTime: 2021-01-07 16:39:00
-->
<template>
  <div class="content">
    <!-- <div>1256126565</div> -->
    <div
      class="ditu"
      :class="[mapData.className, ...{ wangge: mapData.grid }]"
      @mousemove="updateXY"
      :style="mapData.style"
    >
      <!-- <div>最里面</div> -->
      <cqMap
        class="mapIndex"
        @svgClick="svgClick"
        @codeNmae="codeNmae"
        @ycdt="ycdt"
        @sumShuju="sumShuju"
        :county="maps.county"
        :shiGeoCoordMap="maps.shiGeoCoordMap"
      ></cqMap>
    </div>
    <div class="map-window" :style="dw" v-show="mapShow">
      <div class="lis">
        <div class="imga">
          <img src="~assets/one/sjrc.png" />
        </div>
        <div class="content2">
          <div>{{ mpwindow[2] }}{{ year }}发放人次</div>
          <div>
            <b class="tdz">{{ mpwindow && mpwindow[0] | NumFormat }}</b
            >人次
          </div>
        </div>
      </div>
      <div class="lis">
        <div class="imga">
          <img src="~assets/one/xmzje.png" />
        </div>
        <div class="content2">
          <div>{{ mpwindow[2] }}{{ year }}年发放金额</div>
          <div>
            <b class="tdz">{{ mpwindow && mpwindow[1] | NumFormat }}</b
            >万元
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapData } from "@jsonJs/cqMap.js";
import { mapMutations, mapGetters, mapActions } from "vuex";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
// import { maps, coll, sumData } from "@jsonJs/cqMap.js";
import cqMap from "@components/customization/maps/cqMap/cqMap.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "cqindex",
  components: {
    cqMap
  },
  props: {
    mapData: {
      type: Object
    }
  },
  filters: {
    toFixed: function(value) {
      const aa = parseInt(value.toFixed(2));
      return aa;
    },
    NumFormat: function(data) {
      if (typeof data !== "number") return data;
      if (data === 0 || data === "0") return 0;
      var a = parseFloat(data);
      const value = parseFloat(data);
      if (isNaN(a) || a < 1000 || a === 0 || a === "0") {
        return value;
      } else {
        if (a === value) {
          if (!value) return " ";
          var intPart = Number(value).toFixed(); // 获取整数部分
          let intPartFormat;
          if (Math.floor(value) === value) {
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
  data() {
    //这里存放数据
    return {
      lastCodeNmae: "", //暂存上次地址,减少循环
      isXh: false, //防止鼠标在同区县一直循环查找
      mpwindow: [],
      maps: {
        name: "chongqingshi",
        shiGeoCoordMap: [
          //标记点数据
        ],
        county: [
          //区县数据
        ]
      },
      year: 2019,
      mapShow: false,
      dw: { left: "50px", top: "20px" },
      coll: {}
    };
  },
  provide: {
    // foo: this.foo
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  // 2020/07/23 修改
  watch: {
    mapData: {
      deep: true,
      immediate: true,
      handler(res) {
        this.mapData = res;
        this.initData();
        // !this.mapData.data && (this.mapData.data = mapData.data);
        // this.maps = this.mapData.data;
        // this.sumData = this.mapData.data.sumData; //汇总数据
        // this.setSumData(this.sumData);
        // this.$store.commit("previewList/setDefaultJkCardData", null);
        // this.$store.commit("previewList/setPageForm", this.mapData.pageForm);
        // this.$store.commit("previewList/setConfigUrl", this.mapData.configUrl);
        // this.config && (this.mapData = this.config);
      }
    }
  },
  // 2020/07/23 修改
  //方法集合
  methods: {
    initData() {
      // console.log(this.mapData);
      if (this.mapData.data && JSON.stringify(this.mapData.data) !== "{}") {
        // console.log("传值了");
        const qxList = this.mapData.data;
        this.maps = qxList; //所有数据
        this.sumData = qxList.county[0]; //汇总数据
        // const aa = qxList.slice(1);
        // !this.mapData && (this.mapData = mapData);
        // !this.mapData.data && (this.mapData.data = mapData.data);
        // this.mapData = mapData;
      } else {
        this.maps = mapData.data; //所有数据
        this.sumData = mapData.data.sumData; //汇总数据
      }
      this.$store.commit("previewList/setRouterId", this.mapData.pageForms);
      this.init();
    },
    init() {
      this.setSumData(this.sumData);

      this.$store.commit(
        //设置地图跳转ID
        "previewList/setDefaultJkCardDataPath",
        this.mapData.pageForms
      );
      this.$store.commit("previewList/setDefaultJkCardData", null);
      this.$store.commit("previewList/setPageForm", this.mapData.pageForm);
      this.$store.commit("previewList/setConfigUrl", this.mapData.configUrl);
    },
    ...mapMutations({
      setJkCardData: "previewList/setJkCardData",
      setSumData: "previewList/setSumData"
    }),
    svgClick(txt) {
      // console.log(txt);
    },
    foo() {
      return this.codeNmae();
    },
    updateXY: function(event) {
      const left = event.clientX + 10 + "px";
      const top = event.clientY + 10 + "px";
      this.dw = { left, top };
      // console.log(left,top)
    },
    codeNmae(codeNmae, type) {
      if (this.lastCodeNmae === codeNmae) {
        if (this.isXh) {
          this.mapShow = true;
        } else {
          this.mapShow = false;
        }
      } else {
        this.lastCodeNmae = codeNmae;
      }
      if (type === 0) {
        let a = true;
        this.isXh = true;
        this.maps.county.map(item => {
          if (item.title === codeNmae) {
            this.mapShow = true;
            a = false;
            this.$store.commit("previewList/setDefaultJkCardData", [
              item.PROJECTS,
              parseInt(item.money.toFixed(2)),
              item.PERSONTIME,
              item.prople
            ]);
            this.mpwindow[0] = item.PERSONTIME;
            this.mpwindow[1] = parseInt(item.money.toFixed(2));
            this.mpwindow[2] = "";
          }
        });
        if (a) {
          this.isXh = false;
          this.mapShow = false;
          this.$store.commit("previewList/setDefaultJkCardData", [0, 0, 0, 0]);
          this.mpwindow[0] = 0;
          this.mpwindow[1] = 0;
          this.mpwindow[2] = "";
        }
      } else {
        this.isXh = true;
        this.mapShow = true;
        this.maps.shiGeoCoordMap &&
          this.maps.shiGeoCoordMap.map(item => {
            // console.log(item)
            if (item.SHORTNAME === codeNmae) {
              this.mpwindow[0] = item.RC;
              this.mpwindow[1] = item.JE.toFixed(2);
              this.mpwindow[2] = codeNmae;
              return false;
            }
            // this.mapShow=false;
          });
      }
    },
    ycdt(t) {
      //t表示是否在点上
      // if()
      this.mapShow = t;
    },
    sumShuju() {
      this.collect[0].amount = this.sumData.PROJECTS;
      this.collect[1].amount = this.sumData.MONEY;
      this.coll.je = this.sumData.MONEY;
      this.coll.rc = this.sumData.PERSON;
      this.collect[2].amount = this.sumData.PERSONTIME;
      this.collect[3].amount = this.sumData.PERSON;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.initData();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(this.mapData);
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
<style lang="scss" scoped>
.content {
  height: 100%;
}
//@import url(); 引入公共css类
.mapIndex,
.mapDelay {
  width: 100%;
  position: relative;
  height: 100%;
  @for $i from 1 to 11 {
    .guanghuan:nth-of-type(#{$i}) {
      position: absolute;
      left: 50%;
      transform: translateX(-50%) translateY(0) scale(0);
      z-index: -1;
      animation: ani2 10s ($i * 1) * 1s ease-in-out infinite;
    }
  }
}

.wangge {
  background: url(~assets/bgwangge.png);
}
.ditu {
  background-color: #11114f;
  background-size: 130%;
  margin: auto;
  // width: 1000px;
  height: 100%;
}
.map-window {
  position: fixed;
  right: 10px;
  top: 20px;
  z-index: 999;
  //地图弹窗
  // background-color: #0c63d7;
  border: 1px solid #224588;
  background-color: rgba(27, 38, 98, 0.9);
  padding: 10px 15px;
  color: #fff;
  width: 300px;
  text-align: left;
  img {
    width: 100%;
    height: 100%;
  }
  .lis {
    overflow: hidden;
    margin-bottom: 15px;
    display: inline-flex;
    // background:url("/static/index/img/sjrc666.png") no-repeat 35px
  }
  .lis > div {
    display: inline-block;
    /* float: left; */
    // height: 100%;
    vertical-align: middle;
  }
  .imga {
    width: 40px;
    height: 40px;
    // background:url("/static/index/img/sjrc666.png") no-repeat
  }
  .content2 {
    width: calc(100% - 40px);
    margin-left: 10px;
    div {
      margin-bottom: 10px;
    }
    div:last-child {
      margin-bottom: 0px;
    }
  }
  .tdz {
    font-size: 22px;
  }
}
</style>
