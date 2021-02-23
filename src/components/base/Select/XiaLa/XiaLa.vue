<!--
 * @Descripttion: 
 * @version: 
 * @Author: joykit
 * @Date: 2019-12-09 10:06:52
 * @LastEditors: joykit
 * @LastEditTime: 2019-12-09 10:18:59
 -->
<template>
  <ul>
    <li
      v-for="(i, k) in item"
      :key="'Select' + k"
      :class="{
        active: i['active']
      }"
      @click="itemClick(i, k)"
    >
      {{ i["label"] }}
      <XiaLa :item="i['children']" />
    </li>
  </ul>
</template>
<script>
const XiaLa = () => import("./XiaLa/XiaLa.vue");
export default {
  name: "XiaLa",
  props: {
    item: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      lastItem: 0,
      xiala: false
    };
  },
  mounted() {},
  computed: {},
  methods: {
    itemClick(item, key) {
      this.xiala = !this.xiala;
      this.item["data"][this.lastItem]["active"] = false;
      item["active"] = true;
      this.item["showModel"] = item["label"];
      this.item["putModel"] = item["key"];
      this.lastItem = key;
    }
  },
  watch: {},
  components: { XiaLa }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./XiaLa";
// @import "../../assets/css/animated";
</style>
