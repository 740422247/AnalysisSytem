<!--
 * @Descripttion:
 * @version:
 * @Author: joykit
 * @Date: 2019-10-30 17:34:51
 * @LastEditors  : joykit
 * @LastEditTime : 2019-12-30 15:48:09
 -->
<template>
  <div class="content-body animated fadeInLeft">{{ num === 0 ? "" : num }}</div>
</template>
<script>
// import { qfw } from "../../common/qfw.js";
export default {
  name: "NumberInfinite",
  components: {},
  props: {
    number: {
      type: String,
      default: "",
    },
    delay: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      num: 0,
      isMouted: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.count();
      this.isMouted = true;
    }, this.delay);
  },
  methods: {
    qfw(num) {
      const _num = num;
      if (typeof num !== "number") return num;
      if (num.toString() === "0") return "0";
      if (!num.toString().includes(".")) return num;
      if (
        num.toString().split(".")[1] &&
        num.toString().split(".")[1].length < 3
      )
        return num;

      return num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    },
    count() {
      const self = this;
      const len = this.number.split(".")[0].length;
      if (this.num >= parseFloat(this.number)) {
        window.cancelAnimationFrame(this.req);
        this.req = null;

        this.num = this.qfw(Number(this.number));
        return;
      }
      len <= 3 && (this.num += 1);
      len === 4 && (this.num += 10);
      len === 5 && (this.num += 100);
      len === 6 && (this.num += 1000);
      this.req = window.requestAnimationFrame(self.count.bind(self));
    },
  },
  computed: {},
  watch: {
    number(res) {
      this.isMouted && (this.num = this.qfw(Number(res)));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./NumberInfinite";
.NumberInfinite {
  opacity: 0;
  animation: opacity 0.2s 0.1s forwards;
}

@keyframes opacity {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
