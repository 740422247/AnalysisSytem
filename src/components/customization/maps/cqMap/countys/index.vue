<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-12-03 15:11:07
 * @LastEditors: wss
 * @LastEditTime: 2021-01-07 15:01:15
-->
<template>
  <div>
    <div class="mapDelay" @mousemove="updateXY">
      <img
        class="guanghuan svgClass"
        v-for="i in 10"
        :key="i"
        src="~assets/gqqqq.png"
        alt
      />
      <div class="mapSvg">
        <template v-if="shiGeoCoordMap && shiGeoCoordMap.length > 0">
          <img
            v-for="(item, index) in shiGeoCoordMap"
            @mousemove="sbydjr(item)"
            @mouseout="lkyd"
            :key="item.id"
            :itt="item.name"
            :style="{ left: item.DLOCATIONX, top: item.DLOCATIONY }"
            src="~assets/image/tkd.png"
            class="tkd"
          />
        </template>
        <div class="map-window" :style="dw" v-show="mapShow">
          <div class="lis">
            <div class="imga">
              <img src="~@assets/maps/sjrc.png" />
            </div>
            <div class="content2">
              <div>{{ mpwindow[2] }}{{ year }}年发放人次</div>
              <div>
                <b class="tdz">{{ mpwindow && mpwindow[0] | NumFormat }}</b
                >人次
              </div>
            </div>
          </div>
          <div class="lis">
            <div class="imga">
              <img src="~@assets/maps/xmzje.png" />
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
        <img :src="address" alt="1322" class="svgClass" />
      </div>
    </div>
  </div>
</template>

<script>
import * as jsonData from "@jsonJs/cqMap.js";
export default {
  name: "name",
  // props: ["cqCountyData"],
  props: {
    // filter: {
    //   type: Array,
    //   default: () => []
    // }
    config: {
      type: Object,
      default: () => null
    },
    mapData: {
      type: Object,
      default: () => null
    },
    isRefresh: Boolean
  },
  components: {},
  data() {
    //这里存放数据
    return {
      cqCountyData: null,
      // year: "",
      mpwindow: [],
      shiGeoCoordMap: [],
      address: null,
      mapShow: false,
      dw: { left: "50px", top: "20px" }
    };
  },
  computed: {
    year() {
      return this.$store.getters.getMaxYear;
    },
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
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    if (this.mapData && !this.isRefresh) {
      console.log(this.config);
      console.log(this.mapData);
      this.cqCountyData = this.mapData;
      this.shiGeoCoordMap = this.mapData.data.Items;
      this.address = await this.toFile();
      console.log(1,this.address);
    } else {
      console.log('22221e1');
      this.cqCountyData = jsonData.cqCountyData;
      this.shiGeoCoordMap = jsonData.cqCountyData.data.shiGeoCoordMap.filter(
        item => {
          return (
            parseInt(item.DISTRICTID) === parseInt(this.cqCountyData.countyId)
          );
        }
      );
      this.address = await this.toFile();
    }
  },
  mounted() {},
  methods: {
    async toFile() {
      const code = parseInt(this.cqCountyData.districtid);
      switch (code) {
        case 500101: //万州区
          return await require("./svgList/wanzhou.svg");
        case 500229: //城口县
          return await require("./svgList/chengkou.svg");
        case 500118: //永川区
          return await require("./svgList/yongchuan.svg");
        case 500119: //南川区
          return await require("./svgList/nanchuanqu.svg");
        case 500120: //璧山区
          return await require("./svgList/bishan.svg");
        case 500151: //铜梁区
          return await require("./svgList/tongliang.svg");
        case 500102: //涪陵区
          return await require("./svgList/fulingqu.svg");
        case 500103: //渝中区
          return await require("./svgList/yuzhong.svg");
        case 500104: //大渡口区
          return await require("./svgList/dadukou.svg");
        case 500105: //江北区
          return await require("./svgList/jiagnbei.svg");
        case 500106: //沙坪坝区
          return await require("./svgList/shapingba.svg");
        case 500107: //九龙坡区
          return await require("./svgList/jiulongpo.svg");
        case 500108: //南岸区
          return await require("./svgList/nanan.svg");
        case 500109: //北碚区
          return await require("./svgList/beibei.svg");
        case 500110: //万盛经开区
          return await require("./svgList/wansheng.svg");
        case 500111: //大足区
          return await require("./svgList/dazu.svg");
        case 500112: //渝北区
          return await require("./svgList/yubei.svg");
        case 500113: //巴南区
          return await require("./svgList/banan.svg");
        case 500114: //黔江区
          return await require("./svgList/qianjiang.svg");
        case 500115: //长寿区
          return await require("./svgList/changshouqu.svg");
        case 500116: //江津区
          return await require("./svgList/jiangjin.svg");
        case 500117: //合川区
          return await require("./svgList/hechuan.svg");
        case 500152: //潼南区
          return await require("./svgList/tongnan.svg");
        case 500153: //荣昌区
          return await require("./svgList/rongchang.svg");
        case 500154: //开州区
          return await require("./svgList/kaizhou.svg");
        case 500155: //梁平区
          return await require("./svgList/liangpingqu.svg");
        case 500156: //武隆区
          return await require("./svgList/wulong.svg");
        case 500230: //丰都县
          return await require("./svgList/fengdu.svg");
        case 500231: //垫江县
          return await require("./svgList/dianjiangxian.svg");
        case 500233: //忠县
          return await require("./svgList/zhongxian.svg");
        case 500235: //云阳县
          return await require("./svgList/yunyang.svg");
        case 500236: //奉节县
          return await require("./svgList/fengjie.svg");
        case 500237: //巫山县
          return await require("./svgList/wushan.svg");
        case 500238: //巫溪县
          return await require("./svgList/wuxi.svg");
        case 500240: //石柱土家族自治县
          return await require("./svgList/shizhu.svg");
        case 500241: //秀山土家族苗族自治县
          return await require("./svgList/xiushantujiazu.svg");
        case 500242: //酉阳土家族苗族自治县
          return await require("./svgList/youyang.svg");
        case 500243: //彭水苗族土家族自治县
          return await require("./svgList/pengshui.svg");
        case 500222: //綦江区
          return await require("./svgList/qijiang.svg");
        case 500140: //两江新区
          console.error("无文件");
          break;
        default:
          console.error("无文件");
          return await require("./svgList/chengkou.svg");
      }
    },
    lkyd() {
      this.mapShow = false;
      // this.$emit("ycdt", false);
    },
    sbydjr(item) {
      // this.$emit("ycdt", true);
      // this.$emit("codeNmae", item.SHORTNAME, 1);
      this.codeNmae(item.SHORTNAME, 1);
    },
    codeNmae(codeNmae, type) {
      // this.touchstart();
      // return;
      if (type === 0) {
        // console.log("区县");
        // this.maps.county.map(item => {
        //   if (item.title === codeNmae) {
        //     this.mapShow = true;
        //     this.collect[0].amount = item.PROJECTS;
        //     this.collect[1].amount = parseInt(item.money.toFixed(2));
        //     this.collect[2].amount = item.PERSONTIME;
        //     this.collect[3].amount = item.prople;
        //     this.mpwindow[0] = this.collect[2].amount;
        //     this.mpwindow[1] = this.collect[1].amount;
        //     this.mpwindow[2] = "";
        //   }
        // this.mapShow=false;
        // });
      } else {
        // console.log(this.shiGeoCoordMap);
        // console.log("特困点", codeNmae, type);
        this.shiGeoCoordMap.map(item => {
          // if (item.name === codeNmae) {
          this.mpwindow[0] = item.RC;
          this.mpwindow[1] = item.JE;
          this.mpwindow[2] = item.SHORTNAME;
          this.mapShow = true;
          // this.collect[0].amount = item.PROJECTS;
          // this.collect[1].amount = item.money.toFixed(2);
          // this.collect[2].amount = item.PERSONTIME;
          // this.collect[3].amount = item.prople;
          // }
        });
      }
    },
    updateXY: function(event) {
      // console.log(event.currentTarget.getAttribute("itt"))
      // let left = event.offsetX + 10 + "px";
      // let top = event.offsetY + 10 + "px";
      let left = event.clientX + 10 + "px";
      let top = event.clientY + 10 + "px";
      this.dw = { left, top };
      // console.log(left,top)
    }
  },
  //监控data中的数据变化
  watch: {
    shiGeoCoordMap() {
      const _this = this;
      this.$nextTick(() => {
        if (!this.imgs) {
          this.imgs = Array.from(document.querySelectorAll("image"));
          this.imgs.map(d => {
            d.addEventListener("mousemove", e => {
              const tkdName = e.currentTarget.getAttribute("itt");
              _this.$emit("ycdt", true);
              // _this.$emit("codeNmae", tkdName, 1);
              this.codeNmae(tkdName, 1);
            });
            d.addEventListener("mouseout", () => {
              _this.$emit("ycdt", false);
            });
          });
        }
      });
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
<style lang="scss" scoped>
@import "com/variable.scss";
.svgSrc {
  width: 60%;
  height: 60%;
}
svg {
  user-select: none;
  // margin-top: vh(30);
  width: 100%;
  height: 100%;
}
.city {
  cursor: pointer;
}
.city:hover > path {
  fill: #68ccf6;
  opacity: 1;
  transition: all 0.35s ease-in-out;
}
.city:hover > text {
  fill: #333;
  opacity: 1;
  transition: all 0.35s ease-in-out;
}
.city:hover > g > path {
  fill: #2878d2;
  opacity: 1;
  transition: all 0.35s ease-in-out;
}
.svgT {
  .imgs {
    // position: absolute;
    // top:0;
    // right: 0;
    // left: 0;
    // bottom: 0;
    img {
      position: absolute;
      // left: 50%;
      // top: 20%;
      cursor: pointer;
      transition: all 0.35s ease-in-out;
    }
  }
  // img:nth-of-type(1) {
  //   transform: translate(200px);
  // }
  // img:nth-of-type(2) {
  //   transform: translate(-200px, 200px);
  // }
  // img:nth-of-type(3) {
  //   transform: translate(200px, -90px);
  // }
  // img:nth-of-type(4) {
  //   transform: translate(140px, -150px);
  // }
  // img:nth-of-type(5) {
  //   transform: translate(-140px, 150px);
  // }
  // img:nth-of-type(6) {
  //   transform: translate(-90px, 150px);
  // }
  .imgs img:hover {
    filter: brightness(200%);
    // background-color: red;
    color: red;
  }
}

//@import url(); 引入公共css类
.mapSvg {
  position: absolute;
  top: 25%;
  left: 10%;
  right: 10%;
  bottom: 0%;
  z-index: 777;
  // width: 60%;
  // left: 20%;
  .tkd {
    position: absolute;
    z-index: 700;
  }
}
.fcxx {
  position: absolute;
  left: 10px;
  top: 10px;
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
      color: #245a94;
    }
    .amount {
      font-size: 30px;
      color: #ffffff;
    }
  }
}
.ydsl {
  position: absolute;
  right: -19px;
  bottom: 39px;
  z-index: 111;
  .yd {
    background-color: rgba(227, 192, 24, 0.5);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    box-sizing: border-box;
    display: inline-block;
    > span {
      display: inline-block;
      margin-left: 1.5px;
      // margin-top: 5px;
      position: relative;
      top: -5px;
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background-color: rgba(227, 192, 24, 1);
      overflow: hidden;
    }
  }
}
.mapDelay {
  width: 100%;
  height: 0;
  padding-top: 61.7%;
  .svgClass {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 668;
  }
}
.mapDelay {
  // background: url(~assets/guangquan.png) no-repeat;
  // background-size: 108%;
  // background-position: -70px 3px;
  position: relative;
  background: url(~assets/bgwangge.png);
  background-size: 130%;
  background-repeat: no-repeat;
  background-position: -30px 92px;
  @for $i from 1 to 11 {
    .guanghuan:nth-of-type(#{$i}) {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%) translateY(0) scale(0);
      z-index: 666;
      animation: ani2 5s ($i * 0.5) * 1s ease-in-out infinite;
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
