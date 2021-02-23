<!--
 * @Descripttion:
 * @version:
 * @Author: joykit
 * @Date: 2019-10-30 17:34:51
 * @LastEditors: wss
 * @LastEditTime: 2020-11-18 16:32:30
 -->
<template>
  <div class="content-body jkBox " :class="{ 'linear-gradient': line }">
    <template v-if="border">
      <span
        v-for="j in 4"
        :key="'border' + j"
        :class="'border border-' + j"
      ></span>
    </template>
    <template v-if="border">
      <span v-for="i in 4" :key="'line' + i" :class="'line line-' + i"></span>
    </template>
    <span v-if="grid" class="bak"></span>
    <section class="scroll-box" ref="scrollBox">
      <div class="scroll-box-content2">
        <slot> </slot>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "jkBox",
  props: {
    line: {
      type: Boolean,
      default: false
    },
    turning: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    grid: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./jkBox";
</style>
