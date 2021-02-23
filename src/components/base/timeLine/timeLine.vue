<!--  -->
<template>
  <Ohyeah
    width="100%"
    class="xzys"
    thumbColor="#018AE1"
    :autoHide="true"
    trackColor="#fff"
    height="100%"
  >
    <div>
      <!-- <ListHead class="backTop" :title="'时间线'"></ListHead> -->
      <div class="timeLineFQ">
        <div class="timeLine">
          <div class="title_btn">
            {{ (this.config && this.config.text) || "未定义" }}
          </div>
          <div class="timeLine_box block">
            <!-- <div class="about-history"> -->
            <!-- <div class="about-history-list"> -->
            <div class="flex-viewport">
              <Ohyeah
                width="100%"
                class="xzys"
                thumbColor="#018AE1"
                :autoHide="true"
                trackColor="#fff"
                height="60vh"
              >
                <ul class="slides clearfix" v-if="domeData.length > 0">
                  <li class="hengxian"></li>
                  <li v-for="items in domeData" :key="items.id">
                    <span class="jt"></span>
                    <div class="itme" @click="goProjectDetailSmallMiXi(items)">
                      <span
                        v-for="i in 4"
                        :key="'line' + i"
                        :class="'line line-' + i"
                      ></span>
                      <span class="yuanquan"></span>

                      <div class="item_title">
                        <span class="sjxbk"></span>
                        <span class="fl">
                          <img :src="items.icon" />
                        </span>
                        <!-- {{items.name}} -->
                        <span class="projectName fl lable"></span>
                        <span class="time fr lable">{{ items.time }}</span>
                      </div>
                      <div class="desc block">
                        <div class="desc_box">
                          <div class="for_box">
                            <div class="for_itme">
                              <span class="lable">人次：</span>
                              <span class="lable-nama">{{ items.RC }}人</span>
                            </div>
                            <div class="for_itme">
                              <span class="lable">金额：</span>
                              <span
                                class="lable-nama"
                                :class="{ lableMoney: true }"
                                >{{ items.JE }}元</span
                              >
                            </div>
                            <!-- 			<div v-else-if="items.name === '合同'">
																<span>查看详情</span>
																<span class="btnStyle"><button class="btn">查看详情</button></span>
															</div>

															<div v-else-if="items.name === '直接支付'">
																<span>查看相关项目：</span>
																<span class="btnStyle"><button class="btn">该收款单位相关项目</button></span>
															</div>

															<div v-else-if="items.name === '授权支付'">
																<span>查看相关项目：</span>
																<span class="btnStyle"><button class="btn">该收款单位相关项目</button></span>
                          </div>-->
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </Ohyeah>
            </div>
            <!-- </div> -->
            <!-- </div> -->
          </div>
        </div>
        <!-- </TitleBack> -->
        <Loading :show="Loading"></Loading>
      </div>
    </div>
  </Ohyeah>
</template>

<script>
import { timeLineJson } from "./json.js";
import Loading from "com/basics/Loading";

import { Ohyeah } from "vue-ohyeah-scroll";
import ht from "@assets/tb/xm.png";
// import http from "Api";
export default {
  name: "timeLine",

  components: { Loading, Ohyeah },
  data() {
    //这里存放数据
    return {
      a: true,
      timeLine: [],
      Loading: true, //加载中子组件状态
      // TitleBack: {
      //   titleName: "项目时间线",
      //   searchData: null //弹窗接口对象
      // },

      PROJECTNAME: "(无数据)",
      JE: "0",
      domeData: [],
      zrs: "0",
      zrc: "0",
      qxname: "",
      query: {},
    };
  },
  // props: ["timeLine"],
  props: {
    config: Object,
    isRefresh: Boolean,
  },
  //监听属性 类似于data概念
  computed: {},
  //方法集合
  methods: {
    goProjectDetailSmallMiXi(item) {
      console.log(item);
      console.log(this.config.pageForms.path);
      try {
        if (this.config.pageForms.path) {
          this.$router.push({
            name: "pageDetail",
            query: {
              // id: this.config.argument.systemId,
              id: this.config.pageForms.path,
              param: JSON.stringify({ PROJECTID: item.PROJECTID })
            }
          });
        }
      } catch (error) {
        console.error("跳转错误");
      }
    },
    init(parameter) {
      let dd;
      // console.log("time line init", this.config, !this.config.data, this.isRefresh);

      if (!this.config.data || this.isRefresh) {
        dd = timeLineJson;
        // console.log("1111111");
      } else {
        console.log("2222222");
        dd = this.config.data.value;
        // console.log(dd);
      }

      this.Loading = false;
      // console.log('init time line:', dd)
      this.domeData = dd.map((item) => ({
        name: "批次",
        icon: ht,
        time: item.YM,
        RC: item.RC,
        JE: item.JE,
        PROJECTID: item.PROJECTID,
        YEAR: item.YEAR,
        MONTH: item.MONTH,
      }));
      this.$forceUpdate();
      console.log("demeData:", this.domeData);
    },
  },

  created() {},

  mounted() {
    console.log(this.config);
    this.init();
    // if (this.$route.query) {
    //   this.query = this.$route.query;
    // }
  },
  watch: {
    config: {
      deep: true,
      handler(res) {
        this.init();
      },
    },
  },
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
@import "com/variable.scss";
.timeLineFQ {
  position: relative;
  top: -55px;
  min-height: vh(900);
  padding: 3vh 2.5vh;
  box-sizing: border-box;
}
header {
  img {
    display: inline-block;
    height: 14px;
    width: auto;
    margin-right: 9px;
  }
  span {
    margin: 0 3px;
  }
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.top {
  width: 100%;
  margin-top: vh(30);
  height: vh(130);
  display: flex;
  // >div{
  //   flex: 1
  // }
  color: #81a7dc;
  overflow: hidden;
  box-sizing: border-box;
  .title {
    // width: 66%;
    // height: 66px;
    font-size: 22px;
    line-height: 34px;
    height: 100%;
    // color: #fff;
    // overflow: hidden;
    p.name {
      margin: 0;
      height: 100%;
      white-space: pre-wrap;
    }
  }
}
.qxname {
  max-width: 15vw;
  width: 13vw;
  white-space: nowrap;
  position: relative;
  margin-right: vw(10);
}
.money {
  // font-weight: bold;
  // width: 34%;
  color: #fff;
  text-align: right;
  box-sizing: border-box;
  font-size: 32px;
  font-family: "DigifaceWide";
  line-height: 34px;
  .M_unit {
    font-size: 16px;
  }
}
.left_box {
  width: 40.6%; //临时撑满52.6%

  margin-right: 1.5%;
  // background: url(../image/topleft_bg.png) no-repeat center;
  background-size: 100% 100%;
  box-sizing: border-box;
  position: relative;
  border: 2px solid #152461;
  background: -webkit-linear-gradient(top, transparent 10px, #111f63 11px),
    -webkit-linear-gradient(left, transparent 10px, #111f63 11px);
  background-size: 11px 11px;
  //  box-shadow:rgb(11, 234, 235) 0px 0px 18px inset;
}
.right_box {
  width: 45.9%;
  height: vh(120);
}
.fgjb {
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: vh(24) vw(30);
  // width: 5vw;
  // padding: 26.5px 4.24%;
  box-sizing: border-box;
  background-image: linear-gradient(transparent, rgba(20, 41, 111, 1));
}

.box_one {
  width: 48.5%;
  height: 110%;
  position: relative;
  // background: #fff;
  /* margin-right: 1.5%; */
  box-sizing: border-box;
  border: 2px solid #152461;
  background: -webkit-linear-gradient(top, transparent 10px, #111f63 11px),
    -webkit-linear-gradient(left, transparent 10px, #111f63 11px);
  background-size: 11px 11px;
}
.l_title {
  font-size: 22px;
  line-height: 34px;
  width: 100%;
  > div {
    display: inline-block;
  }
  p {
    text-align: right;
  }
  .qian {
    color: #fff;
    font-size: 32px;
    line-height: 36px;
    // text-align: right
  }
}

.img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  float: right;
  box-shadow: 0px 0px 24px rgba(195, 198, 217, 0.4);
  // -webkit-filter: drop-shadow(0 0 15px #fff);
  // filter: drop-shadow(0px 0px 2px #fff);
  background-color: rgba(20, 22, 81, 1);
}
img {
  width: 100%;
  height: 100%;
}
/* 时间轴样式 */

.timeLine {
  margin-top: vh(50);
  width: 100%;
}

.title_btn {
  font-size: 18px;
  color: #fff;
  margin: 34px 0 0;
}

.title_btn .btn {
  margin-left: 30px;
  padding-top: 3px;
  background: #0063f6;
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
  padding: 4px 12px;
}

.about-history {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.about-history-list {
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  // height: vh(680);
  // margin: 30px 22px;
}

.flex-viewport {
  overflow: auto;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin-top: vh(20);
  .hengxian {
    width: 100%;
    height: 4px;
    background-color: #0063f6;
    position: absolute;
    top: 50%;
    margin-top: -2px;
  }
}

// .flex-viewport:before {
//   position: absolute;
//   top: 50%;
//   margin-top: -2px;
//   right: 0;
//   left: 0;
//   border-top: 4px solid #0063f6;
//   content: "";
// }

.slides {
  overflow: hidden;
  // background-color: #fff;
  transition-duration: 0s;
  transform: translate3d(0px, 0px, 0px);
  padding: 0 32px;
  display: inline-flex;
  min-width: 100%;
  // width: 100%;
  // height: vh(555);

  li {
    position: relative;
    width: 253px;
    height: 555px;
    // margin-right: 31px;
    display: block;
    float: left;
  }
  .yuanquan {
    position: absolute;
    border-radius: 50%;
    top: -55px;
    left: 50%;
    width: 16px;
    margin-left: -8px;
    height: 16px;
    overflow: hidden;

    background-color: #13195d;
    border: 3px solid #06a8e8;
  }
  .jt {
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    z-index: 999;
    border-width: 8px;
    margin-top: -7px;
    border-style: solid;
    border-color: transparent transparent transparent #06a8e8;
    left: 0;
  }
}

.itme {
  position: absolute;
  right: -32px;
  bottom: 29px;
  left: -31px;
  min-height: 202px;
  padding: 44px 0 0 0;
  border: 2px solid #0f2d78;
  cursor: pointer;
  background: -webkit-linear-gradient(top, transparent 10px, #111f63 11px),
    -webkit-linear-gradient(left, transparent 10px, #111f63 11px);
  background-size: 11px 11px;
}

.slides li:nth-child(even) .yuanquan {
  top: auto;
  bottom: -56px;
}
.slides li:nth-child(odd) .sjxbk {
  top: -7px;
  transform: rotate(225deg);
}
.slides li:nth-child(odd) {
  .desc {
    margin-top: 40px;
  }
}
.slides li:hover .itme:after {
  // background: url(../image/noodchocie.png) no-repeat center;
  background-size: 100% 100%;
  transition: background-color 0.1s linear;
}

.slides li:nth-of-type(even) .itme {
  top: 31px;
  bottom: auto;
  padding: 0 0 48px;
}

.slides li:nth-child(even) .itme .item_title {
  top: auto;
  bottom: 0;
}

.item_title {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  margin: 0;
  background-color: rgba(17, 29, 104, 0.7);
  height: 70px;
  color: #fff;
  line-height: 70px;
  z-index: 3;
  .sjxbk {
    position: absolute;
    width: 10px;
    height: 10px;
    margin-left: -5px;
    left: 50%;
    bottom: -5px;
    border: 2px solid #153078;
    transform: rotate(45deg);
    z-index: -1;
    background-color: rgba(17, 29, 104, 0.7);
    border-left-color: transparent;
    border-top-color: transparent;
  }
}

// .slides li:hover .item_title {
//   background-color: #ff9948;
// }

.slides li:hover .item_title:before {
  border-color: transparent transparent #ff9948;
}

.item_title span img {
  width: 32px;
  height: 32px;
  margin-top: 19px;
  margin-left: 14px;
}

.btnStyle .btn {
  padding: 3px 8px;
  font-size: 12px;
  height: 27px;
  background: #0063f6;
  color: #fff;
  border-radius: 5px;
}

.projectName {
  font-size: 16px;
  font-weight: bold;
  margin-left: 9px;
  display: block;
}

.time {
  font-size: 16px;
  font-weight: bold;
  margin-right: 14px;
}

.desc {
  font-size: 14px;
  color: #888888;
  margin-top: 10px;
}

.for_box {
  padding: 20px 12px;
}

.for_itme {
  font-size: 14px;
  height: 28px;
  line-height: 28px;
  overflow: hidden;
  // color: #292929;
}

.lable {
  color: #607caf;
}
.lable-nama {
  color: #fff;
}
.lableMoney {
  color: #ca8e22;
}
// /* 时间轴样式2 */
// /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
// *::-webkit-scrollbar {
//   width: 10px;
//   height: 10px;
//   background-color: #f5f5f5;
// }

// /*定义滚动条轨道 内阴影+圆角*/
// *::-webkit-scrollbar-track {
//   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
//   border-radius: 10px;
//   background-color: #f5f5f5;
// }

// /*定义滑块 内阴影+圆角*/
// *::-webkit-scrollbar-thumb {
//   border-radius: 10px;
//   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
//   background-color: #018ee8;
// }
/deep/ .xzys .ohyeah-scroll-vertical-track-w {
  padding: 0px;
}
.backTop {
  margin-top: 2.5vh;
}
</style>
