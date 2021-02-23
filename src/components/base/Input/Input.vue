<!--
 * @Descripttion: 搜索弹窗
 * @version:
 * @Author: joykit
 * @Date: 2019-10-30 17:34:51
 * @LastEditors: wss
 * @LastEditTime: 2020-11-06 11:09:24
 -->
<template>
  <div class="content-body Input input-wrap">
    <span v-if="!isXl" class="label">{{ item["label"] }}</span>
    <div class="input">
      <input
        v-if="!isXl"
        type="text"
        class="button"
        autocomplete="off"
        :readonly="readonly"
        :disabled="disabled"
        :placeholder="item['placeholder']"
        v-model="item['putModel']"
        @change="change(item,item['putModel'])"
      />
      <input
        v-if="isXl"
        type="text"
        class="button"
        autocomplete="off"
        :readonly="readonly"
        :disabled="disabled"
        :placeholder="item['placeholder']"
        v-model="item['showModel']"
      />
      <span></span>
      <!-- <div v-if="isXl" class="ico-xiala">
        <img :src="xiala" alt />
      </div>-->
      <transition name="close">
        <div
          v-if="!isXl && item['putModel'] && item['putModel'].length > 0"
          @click="clear(item)"
          class="ico-xiala"
          :class="{
            scale2: (item['putModel'] && item['putModel'].length) > 0
          }"
        >
          <img :src="close" alt />
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: "Input",
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    isXl: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      close: require("@static/image/close.png"),
      xiala: require("@static/image/xiala.png")
    };
  },
  mounted() {},
  computed: {},
  methods: {
    clear(item) {
      item["putModel"] = "";
      item["showModel"] = "";
    },
    change(item, current) {
      item["showModel"] = current;
    }
  },
  watch: {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./Input";
// @import "../../assets/css/animated";
</style>
