<!--
 * @Descripttion: 
 * @version: 
 * @Author: joykit
 * @Date: 2019-10-30 17:34:51
 * @LastEditors: joykit
 * @LastEditTime: 2019-11-07 11:07:11
 -->
<template>
  <div class="content-body scrollBox">
    <!-- <span v-for="j in 4" :key="'border'+j" :class="'border border-'+j"></span>
    <span v-for="i in 4" :key="'line'+i" :class="'line line-'+i"></span> -->
    <span class="bak"></span>
    <section class="scroll-box" ref="scrollBox">
      <div v-if="isScroll" class="scroll-box-content">
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
  name: "IScroll",
  components: {},
  props: {
    isScroll: {
      type: Boolean,
      default: true
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
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped lang="scss">
@import "./IScroll";
</style>
