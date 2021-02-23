<!--
 * @Descripttion:
 * @version:
 * @Author: joykit
 * @Date: 2019-10-30 17:34:51
 * @LastEditors  : joykit
 * @LastEditTime : 2019-12-26 10:41:57
 -->
<template>
  <jkCard
    class='earth-card'
    :border="config.border"
    :grid="config.grid"
    :text="config.text"
  >
    <div class="content-body Earth2">
      <div
        class="s-w animated zoomInUp"
        :style="{ 'animation-delay': 400 + 'ms' }"
      >
        <div id="Sun2" class="sun"></div>
        <div class="country">
          <!-- @click="goRoute('ProjectDetailSmallMiXi2')" -->
          数据分析
        </div>
        <div class="pan" :style="{ backgroundImage: 'url(' + pan + ')' }"></div>
      </div>
    </div>
  </jkCard>
</template>
<script>
import jkCard from "@components/base/jkCard/jkCard";
import { Sun2 } from "./sun2.js";
export default {
  name: "Earth2",
  props: {
    isRefresh: Boolean,
    config: {
      type: Object,
      default: () => ({
        border: false,
        grid: false,
        text: "",
        path: null,
        choice: null,
        data: null,
      }),
    },
  },
  data() {
    return {
      pan: require("./image/pan.png"),
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    getEarth2Result(el, arr) {
      const { pageForms } = el;
      if (pageForms) {
        return arr.map((item, index) => {
          if (index === 3) {
            return {
              ...item,
              url: {
                name: "pageDetail",
                query: {
                  id: pageForms[el.configUrl[index].value],
                  param: JSON.stringify({ isClass: true }),
                },
              },
            };
          } else {
            return {
              ...item,
              url: {
                name: "pageDetail",
                query: { id: pageForms[el.configUrl[index].value] },
              },
            };
          }
        });
      } else {
        return arr;
      }

      // return el.configUrl.map((item) => ({
      //   name: "pageDetail",
      //   query: { id: pageForms[item.value] },
      // }));
    },
    init() {
      // document.getElementById("Sun2").removeChild();
      const district = this.getDestrict();

      const vm = this;
      const sun = new Sun2("#Sun2", {
        district,
        done() {
          vm.$emit("EarthDone2", sun);
        },
        fallback(o) {
          vm.$router.push(o.url);
        },
        sunFallback() {
          vm.$router.push({ path: "/ProjectDetailSmallMiXi2" });
        },
      });
    },
    getDestrict() {
      const district = [
        [
          {
            name: "",
            url: "",
          },
          {
            name: "",
            url: "",
          },
          {
            name: "",
            url: "",
          },
          {
            name: "",
            url: "",
          },
          {
            name: "",
            url: "",
          },
          {
            name: "",
            url: "",
          },
        ],
        [
          {
            name: require("./image/gn/1.png"),
            url: "/YearAnalysis",
          },
          {
            name: require("./image/gn/2.png"),
            url: "/AgeAnalysis",
          },
          {
            name: require("./image/gn/3.png"),
            url: "/mistakeList",
          },
          {
            name: require("./image/gn/4.png"),
            url: "/ProjectDetail?IsClass=true",
          },
          // {
          //   name: require(".//image/gn/5.png"),
          //   url: ""
          // },
          {
            name: require("./image/gn/6.png"),
            url: "/ProjectDetailSmallMiXi2",
          },
        ],
        [
          {
            name: "",
            url: "",
          },
        ],
      ];
      district[1] = this.getEarth2Result(this.config, district[1]);
      console.log("earth2 result:", district[1]);
      return district;
    },
    goRoute(url) {
      this.$router.push({ name: url });
    },
  },
  computed: {},
  // watch: {
  //   config() {
  //     this.init();
  //   },
  // },
  components: { jkCard },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "./Earth2";
</style>
