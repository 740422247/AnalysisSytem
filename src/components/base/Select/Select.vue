<!--
 * @Descripttion: 搜索弹窗
 * @version:
 * @Author: joykit
 * @Date: 2019-10-30 17:34:51
 * @LastEditors: wss
 * @LastEditTime: 2020-11-11 16:42:12
 -->
<template>
  <div class="content-body Select" ref="Select">
    <span class="label">{{ item["label"] }}</span>
    <treeselect
      :searchable="false"
      :multiple="false"
      :show-count="true"
      :options="result.children"
      :placeholder="item['placeholder']"
      v-model="item['putModel']"
      @select="select"
    />
    <!-- <span class="label">{{ item["label"] }}</span>
    <Input
      :item="item"
      :isXl="true"
      :readonly="true"
      @click.native="xiala = !xiala"
    />
    <div class="xiala" v-show="xiala">
      <XiaLa :item="item['data']" />
      <img class="sanjiao" :src="ico2" alt />
    </div>-->
  </div>
</template>
<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
const Input = () => import("@components/base/Input/Input.vue");
export default {
  name: "Select",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      result: [],
      lastItem: 0,
      xiala: false,
      ico: require("@/static/image/xiala.png"),
      ico2: require("@/static/image/sanjiao.png"),
    };
  },
  mounted() {
    this.init();
    document.addEventListener("click", (e) => {
      if (!(this.$refs.Select && this.$refs.Select.contains(e.target))) {
        this.xiala = false;
      }
    });
  },
  computed: {},
  methods: {
    init() {
      const { children, ...rest } = this.item;
      this.result = {
        ...rest,
        ...this.getChildren(this.formatChildren(this.item.children)),
      };
    },
    getChildren(result) {
      return result ? { children: result } : {};
    },
    formatChildren(arr) {
      if (arr) {
        return arr.map((item) => {
          const { children, ...rest } = item;
          return {
            ...rest,
            ...this.getChildren(this.formatChildren(item.children)),
          };
        });
      } else {
        return null;
      }
    },
    select(node, index) {
      this.item["showModel"] = node.label;
    },
  },
  watch: {},
  components: { Input, Treeselect },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./Select";
// @import "../../assets/css/animated";
</style>
