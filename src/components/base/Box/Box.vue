<!--
 * @Descripttion:
 * @version:
 * @Author: joykit
 * @Date: 2019-10-30 17:34:51
 * @LastEditors: joykit
 * @LastEditTime: 2020-05-14 17:16:58
 -->
<template>
  <div class="content-body Box">
    <span
      v-for="j in 4"
      :key="'border' + j"
      :class="'border border-' + j"
    ></span>
    <span v-for="i in 4" :key="'line' + i" :class="'line line-' + i"></span>
    <span class="bak"></span>
    <section class="scroll-box bar" ref="scrollBox">
      <div class="scroll-box-content2">
        <slot> </slot>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "Box",
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
@import "./Box";
</style>
