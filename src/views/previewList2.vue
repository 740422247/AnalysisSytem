<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-06 16:26:30
 * @LastEditors: wss
 * @LastEditTime: 2020-12-08 15:37:05
-->
<template>
  <div class="mapIndex">
    <div class="ditu" @mousemove="updateXY">
      <cqMap
        class="mapIndex"
        @svgClick="svgClick"
        @codeNmae="codeNmae"
        @ycdt="ycdt"
        @sumShuju="sumShuju"
        :county="maps.county"
        :coll="coll"
        :shiGeoCoordMap="maps.shiGeoCoordMap"
      ></cqMap>
    </div>
    <div class="map-window" :style="dw" v-show="mapShow">
      <div class="lis">
        <div class="imga">
          <img src="~assets/one/sjrc.png" />
        </div>
        <div class="content2">
          <div>{{mpwindow[2]}}{{year}}发放人次</div>
          <div>
            <b class="tdz">{{mpwindow&&mpwindow[0]|NumFormat}}</b>人次
          </div>
        </div>
      </div>
      <div class="lis">
        <div class="imga">
          <img src="~assets/one/xmzje.png" />
        </div>
        <div class="content2">
          <div>{{mpwindow[2]}}{{year}}年发放金额</div>
          <div>
            <b class="tdz">{{mpwindow&&mpwindow[1]|NumFormat}}</b>万元
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { maps, coll, sumData } from "@jsonJs/cqMap.js";
import cqMap from "@components/customization/maps/cqMap/cqMap.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "previewList2",
  components: {
    cqMap
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
      mpwindow: [],
      //地图
      collect: [
        {
          url: "img/one/zxm.png",
          title: "项目数/个",
          amount: 0
        },
        {
          url: "img/one/zje.png",
          title: "项目总金额/万元",
          amount: 0
        },
        {
          url: "img/one/zrc.png",
          title: "涉及人次/人次",
          amount: 0
        },
        {
          url: "img/one/zrs.png",
          title: "涉及人数/人数",
          amount: 0
        }
      ],
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
      coll: {},
      sumData: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    ...mapMutations({
      setJkCardData: "previewList/setJkCardData",
      setSumData: "previewList/setSumData"
    }),
    svgClick(txt) {
      console.log(txt);
    },
    updateXY: function(event) {
      // console.log(event.currentTarget.getAttribute("itt"))
      // let left = event.offsetX + 10 + "px";
      // let top = event.offsetY + 10 + "px";
      const left = event.clientX + 10 + "px";
      const top = event.clientY + 10 + "px";
      this.dw = { left, top };
      // console.log(left,top)
    },
    // codeNmae(codeNmae, type) {
    //   if (this.lastCodeNmae === codeNmae) {
    //     this.mapShow = true;
    //     return false;
    //   } else {
    //     this.lastCodeNmae = codeNmae;
    //   }
    //   if (type === 0) {
    //     let a = true;
    //     this.maps.county.map(item => {
    //       if (item.title === codeNmae) {
    //         a = false;
    //         this.mapShow = true;
    //         // this.jkCardData.map(item => {
    //         //   console.log(item);
    //         // });
    //         // this.collect[0].amount = item.PROJECTS;
    //         // this.collect[1].amount = parseInt(item.money.toFixed(2));
    //         // this.collect[2].amount = item.PERSONTIME;
    //         // this.collect[3].amount = item.prople;
    //         this.$store.commit("previewList/setDefaultJkCardData", [
    //           item.PROJECTS,
    //           parseInt(item.money.toFixed(2)),
    //           item.PERSONTIME,
    //           item.prople
    //         ]);
    //         this.mpwindow[0] = item.PERSONTIME;
    //         this.mpwindow[1] = parseInt(item.money.toFixed(2));
    //         this.mpwindow[2] = "";
    //         return false;
    //       }
    //       // this.mapShow = false;
    //     });
    //     if (a) {
    //       // console.log(464645644)
    //       this.mapShow = false;
    //       // this.collect[0].amount = 0;
    //       // this.collect[1].amount = 0;
    //       // this.collect[2].amount = 0;
    //       // this.collect[3].amount = 0;
    //       this.$store.commit("previewList/setDefaultJkCardData", [0, 0, 0, 0]);
    //       this.mpwindow[0] = 0;
    //       this.mpwindow[1] = 0;
    //       this.mpwindow[2] = "";
    //     }
    //   } else {
    //     console.log("特困点",this.maps.shiGeoCoordMap);
    //     // this.mapShow = true;
    //     this.maps.shiGeoCoordMap.map(item => {
    //       // console.log(item)
    //       if (item.name === codeNmae) {
    //         this.mpwindow[0] = item.person;
    //         this.mpwindow[1] = item.money.toFixed(2);
    //         this.mpwindow[2] = codeNmae;
    //         return false;
    //       }
    //       // this.mapShow=false;
    //     });
    //   }
    // },
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
    this.setSumData(sumData);
    this.$store.commit("previewList/setDefaultJkCardData", null);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.coll = coll; //所有区县列表
    this.maps = maps; //特困点
    this.sumData = sumData; //汇总数据
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
<style lang='scss' scoped>
//@import url(); 引入公共css类
.mapIndex,
.mapDelay {
  width: 100%;
  position: relative;
  height: vh(700);
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
.mapIndex {
  background: url(~assets/bgwangge.png);
  background-color: #11114f;
  background-size: 130%;
  // background-position: 13px 201px;
}
.ditu {
  width: 1000px;
  height: auto;
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
    // width: 200px;
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
