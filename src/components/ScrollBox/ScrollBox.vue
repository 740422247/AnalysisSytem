<!--
 * @Descripttion:
 * @version:
 * @Author: joykit
 * @Date: 2019-10-30 17:34:51
 * @LastEditors: wss
 * @LastEditTime: 2021-01-13 11:29:42
 -->
<template>
  <div class="content-body scrollBox">
    <template v-if="config.border && config.border != 0">
      <span
        v-for="j in 4"
        :key="'border' + j"
        :class="'border border-' + j"
      ></span>
    </template>
    <template v-if="config.inflexion == 0 ? false : true">
      <span v-for="i in 4" :key="'line' + i" :class="'line line-' + i"></span>
    </template>
    <span class="bak" v-if="config.grid == 0 ? false : true"></span>
    <section class="scroll-box" ref="scrollBox">
      <div
        v-if="isScroll"
        :style="{ color: config.color }"
        class="scroll-box-content"
      >
        <slot></slot>
      </div>
      <div v-else class="scroll-box-content2">
        <slot></slot>
      </div>
    </section>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "ScrollBox",
  components: {},
  props: {
    isScroll: {
      type: Boolean,
      default: true
    },
    config: {
      type: Object,
      default: () => {
        return {
          border: true, // 显示组件边框
          grid: true, // 显示背景网格
          inflexion: true // 4方拐点
        };
      }
    }
  },
  data() {
    return {};
  },
  mounted() {
    if (!this.isScroll) return;
    this.scrollDom = this.$refs["scrollBox"];
    this.scroll = new BScroll(this.scrollDom, {
      scrollY: true,
      bindToWrapper: true,
      mouseWheel: {
        speed: 2,
        invert: false,
        easeTime: 300
      },
      scrollbar: {
        fade: true,
        interactive: false // 1.8.0 新增
      },
      click: true
    });
  },
  methods: {},
  computed: {},
  watch: {
    // config: {
    //   deep: false,
    //   // immediate: true,
    //   handler(val) {
    //     console.log("a", val);
    //   }
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./ScrollBox";
</style>
