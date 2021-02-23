<!--
 * @Descripttion: 贫困乡镇
 * @version:
 * @Author: joykit
 * @Date: 2019-10-30 17:34:51
 * @LastEditors: joykit
 * @LastEditTime: 2020-02-19 10:46:45
 -->
<template>
  <div class="content-body poor-country">
    <article v-if="pData" class="one-wrapper-1">
      <!-- 乡镇概况 -->
      <section class="country-description">
        <ScrollBox>
          <div class="content">
            <h4
              class="animated fadeInLeft"
              :style="{ 'animation-delay': delay + 200 * 1 + 'ms' }"
            >
              乡镇概况
            </h4>
            <h5
              class="animated fadeInLeft"
              :style="{ 'animation-delay': delay + 200 * 2 + 'ms' }"
            >
              {{ pData.des["title"] }}
            </h5>
            <p
              class="animated fadeInLeft"
              :style="{ 'animation-delay': delay + 200 * 3 + 'ms' }"
            >
              {{ pData.des["content"] }}
            </p>
          </div>
        </ScrollBox>
      </section>
      <!-- 乡镇概况 -->
      <!-- 地球 -->
      <section
        class="earth-wrapper animated fadeInRight"
        :style="{ 'animation-delay': delay + 1000 + 'ms' }"
      >
        <Earth
          @mouseFallback="mouseFallback"
          @EarthDone1="EarthDone1"
          :pageForms="config.pageForms"
          ref="earth1"
        />
      </section>
      <!-- 地球 -->
    </article>
    <article class="two-wrapper-2">
      <!-- 错误数据 -->
      <section class="error-data-wrapper">
        <ScrollBox :isScroll="false">
          <div class="content">
            <h4
              class="animated fadeInDown"
              :style="{ 'animation-delay': delay + 200 * 1 + 'ms' }"
            >
              错误数据({{ pData.des["title"] }})
            </h4>
            <div class="circle">
              <span
                class="ci circle-1"
                :style="{ backgroundImage: 'url(' + circle.c1 + ')' }"
              ></span>
              <span
                class="ci circle-2"
                :style="{ backgroundImage: 'url(' + circle.c2 + ')' }"
              ></span>

              <i
                class="erro-line"
                v-for="n in 6"
                :key="'erro-line-' + n"
                :style="{ 'animation-delay': 750 + 200 * n + 'ms' }"
              ></i>

              <img
                v-for="(s, i) in error"
                :src="s"
                alt
                :key="'erro-img-' + (i + 1)"
                :class="'erro-img erro-img-' + (i + 1)"
                :style="{ 'animation-delay': 750 + 200 + 200 * i + 'ms' }"
              />
              <div
                v-for="(t, i) in pData['error']"
                :class="'erro-text erro-text' + i"
                :key="'erro-text' + i"
              >
                <p
                  class="erro-title animated"
                  :style="{
                    'animation-delay': 750 + 200 + 200 + 200 * i + 'ms',
                  }"
                  :class="{
                    fadeInRight: i % 2 === 0,
                    fadeInLeft: i % 2 !== 0,
                  }"
                >
                  {{ t["title"] }}
                </p>

                <NumberInfinite
                  class="erro-amount"
                  :delay="750 + 200 + 200 + 200 + 200 * i"
                  :number="t['amount']"
                />
              </div>
            </div>
          </div>
        </ScrollBox>
      </section>
      <!-- 错误数据 -->
      <!-- 乡镇项目概况 -->
      <section class="country-project-decription">
        <ScrollBox :isScroll="false">
          <div class="content">
            <h4
              class="animated fadeInDown"
              :style="{ 'animation-delay': delay + 200 * 1 + 'ms' }"
            >
              乡镇项目概况
            </h4>
            <!-- <table>
              <thead>
                <th v-for="(t,i) in thead" :key="'ListTable'+i">{{t}}</th>
              </thead>
            </table>-->
            <div
              class="table-wrap animated fadeInDown"
              :style="{ 'animation-delay': delay + 200 + 'ms' }"
            >
              <AutoScroll
                @sideDone="sideDone"
                ref="AutoScroll_1"
                :max="tbody.length"
              >
                <ListTable :tbody="tbody" :thead="thead" />
              </AutoScroll>
            </div>
          </div>
        </ScrollBox>
      </section>
      <!-- 乡镇项目概况 -->
    </article>
  </div>
</template>
<script>
import Vue from "vue";
const ScrollBox = () => import("@components/base/ScrollBox/ScrollBox.vue");
const AutoScroll = () => import("@components/base/AutoScroll/AutoScroll.vue");
const ListTable = () => import("@components/base/ListTable/ListTable.vue");

const NumberInfinite = () =>
  import("@components/base/NumberInfinite/NumberInfinite.vue");
import { pData, earthData, ListData } from "./js/data.js";
import * as types from "@store/mutation-types";
// import api from "../../api/api.js";
import storage from "best-storage";
export default {
  name: "Three",
  props: {
    config: {
      type: Object,
      default: () => null,
    },
    // isRefresh: {
    //   type: Boolean,
    // },
  },
  data() {
    return {
      delay: 400,
      sonRefresh: true,
      sildeData: null,
      pData: pData,
      pData2: null,
      circle: {
        c1: require("./image/quanquan1.png"),
        c2: require("./image/quanquan2.png"),
      },
      error: [
        require("./image/pk/pk1.png"),
        require("./image/pk/pk2.png"),
        require("./image/pk/pk3.png"),
        require("./image/pk/pk4.png"),
        require("./image/pk/pk5.png"),
        require("./image/pk/pk6.png"),
      ],
      thead: null,
      tbody: [],
    };
  },

  mounted() {},
  computed: {},
  methods: {
    async sideDone() {
      // 地球图使用的假数据
      this.pData2 = earthData;
      //   this.getCountryData();
      //   2020-12-08  停用
      //   this.pData2 =
      // pData && pData.length > 0 ? pData : await this.getCountryApi();
      // 2020-12-08  停用

      const res = await this.getSlideApi();
      this._getSlideData(res); ///处理表格
      this._initSlide();
      this.mouseFallback();
    },
    // 2020-12-08  停用
    // async getCountryApi() {
    //   //   return earthData;
    //   const ayc = await api.GetPoorCountryAnalysis();
    //   storage.session.set("GetPoorCountryAnalysis", ayc.Data);
    //   return ayc.Data;
    // },

    // getCountryData() {
    //   return storage.session.get("GetPoorCountryAnalysis");
    // },
    // 2020-12-08  停用
    async getSlideApi() {
      //   const ayc = await api.GetPoorCountryAnalysisLsit();
      if (this.config) {
        const api = await this.$store.dispatch(types.getDataByApi, {
          apiId: this.config.argument.path,
          param: {
            apiType: "made",
          },
        });
        return Object.values(api);
      } else {
        return ListData;
      }

      // if (this.config && this.config.data) {
      //   return this.config.data.value;
      // } else {
      //   return ListData;
      // }
    },
    _getSlideData(res) {
      this.thead = res[0];
      const tbody = res.slice(1, res.length);
      this.tbody =
        tbody &&
        tbody.map((item, key) => {
          const cacle = {};
          Object.keys(this.thead).map((k) => {
            cacle[k] = {
              ...this.thead[k],
              showName: item[k],
            };
          });
          return cacle;
        });
      this.tbody = Array.apply(null, {
        length: Math.ceil(this.tbody.length / 6),
      }).map((x, i) => {
        return this.tbody.slice(i * 6, (i + 1) * 6);
      });
    },
    _initSlide() {
      !this.AutoScroll_1 && (this.AutoScroll_1 = this.$refs["AutoScroll_1"]);
      this.AutoScroll_1._play();
    },
    mouseFallback(o) {
      let item = null;
      if (!o) {
        item = this.pData2[0];
      } else {
        item =
          this.pData2 &&
          this.pData2.find((item) => {
            return item["AGENCYID"] === o.id;
          });
      }
      // console.log("mouse fallback item:", item);
      this.sonRefresh = false;
      this.$nextTick(() => {
        this.sonRefresh = true;
      });
      this.pData["des"]["title"] = item["DSHORTNAME"] + item["AGENCYNAME"];
      this.pData["des"]["content"] = item["REMARK"];
      this.pData["error"][0]["amount"] = item["JZRC"].toString();
      this.pData["error"][1]["amount"] = item["CWRS"].toString();
      this.pData["error"][2]["amount"] = item["CWRC"].toString();
      this.pData["error"][3]["amount"] = item["ZHPC"].toString();
      this.pData["error"][4]["amount"] = item["CWJE"].toString();
      this.pData["error"][5]["amount"] = item["FFRC"].toString();
      this.delay = 0;
    },
    EarthDone1(sun) {
      if (!this.sunAni) {
        this.sunAni = sun;
      }
      if (this.sunAni) {
        this.sunAni.ani = requestAnimationFrame(
          this.sunAni.circleMove.bind(this.sunAni)
        );
      }
    },
  },

  watch: {
    config: {
      deep: true,
      handler(res) {
        // console.log("watch:", res, res.data);
      },
    },
  },
  // computed: {
  //   max() {
  //     return this.tbody.length;
  //   },
  // },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    //
    next((vm) => {
      //vm.EarthDone1();
      vm.AutoScroll_1 && vm._initSlide();
    });
  },
  beforeRouteLeave(to, from, next) {
    const slideTimer = this.AutoScroll_1.timer;
    clearTimeout(slideTimer);
    //cancelAnimationFrame(this.sunAni.ani);
    next(() => {});
  },
  components: {
    ScrollBox,
    NumberInfinite,
    AutoScroll,
    ListTable,
    Earth: Vue.component("Earth", (resolve, reject) => {
      setTimeout(() => {
        require(["@/components/custom/Earth1/Earth.vue"], resolve);
      }, 500);
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./PoorContry";
@import "./ani";
// @import "../../assets/css/animated";
</style>
