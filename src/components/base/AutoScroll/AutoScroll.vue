<!--
 * @Descripttion: 
 * @version: 
 * @Author: joykit
 * @Date: 2019-10-30 17:34:51
 * @LastEditors  : joykit
 * @LastEditTime : 2019-12-30 15:21:57
 -->
<template>
  <section ref="scroll-box-scroll">
    <div class="dot">
      <a @click="slide(b)" v-for="b in max2" :key="b" ref="dot"></a>
    </div>
    <div class="content-body AutoScroll" ref="AutoScroll">
      <div class="AutoScrollContent">
        <slot></slot>
      </div>
    </div>
  </section>
</template>
<script>
import BScroll from "better-scroll";
import { setInterval } from "timers";
export default {
  name: "AutoScroll",
  components: {},
  props: {
    max: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      page: 0,
      max2: 0
    };
  },

  destroyed() {
    // clearTimeout(this.timer);
  },
  mounted() {
    this.$emit("sideDone");
  },
  methods: {
    _initSlider() {
      if (!this.scroll) {
        this.scrollDom = this.$refs["AutoScroll"];
        this.scrollDomBox = this.$refs["scroll-box-scroll"];
        this.dot = this.$refs["dot"];
        this.lastDot = 0;
        this.scroll = new BScroll(this.scrollDom, {
          scrollY: true,
          bindToWrapper: true,
          momentum: false, //关闭动量动画，能提升效能
          snap: {
            loop: true, //循环
            threshold: 0.3,
            speed: 400 //轮播间隔,
          },
          click: true
        });
        this.dot[0].classList.add("active");
        this.scroll.on("scrollEnd", () => {
          let pageIndex = this.scroll.getCurrentPage().pageY; //轮播到下一张，获取当前的index

          this.currentIndex = pageIndex;
          clearTimeout(this.timer); //如果设置额自动轮播就清除轮播再重新启动
          this._play();
        });

        this.scrollDomBox.addEventListener("mouseenter", () => {
          clearTimeout(this.timer); //如果设置额自动轮播就清除轮播再重新启动
        });

        this.scrollDomBox.addEventListener("mouseleave", () => {
          this._play();
        });
      }
    },
    _play() {
      this.timer = setTimeout(() => {
        this.lastDot = this.scroll.getCurrentPage().pageY;
        if (this.scroll.getCurrentPage().pageY >= this.max2) {
          this.scroll.goToPage(0, 0, 0);
        }
        if (this.scroll.getCurrentPage().pageY + 1 >= this.max2) {
          this.dot && this.dot[this.max2 - 1].classList.remove("active");
          this.dot && this.dot[0].classList.add("active");
        } else {
          if (this.lastDot >= this.max2) {
            this.dot && this.dot[0].classList.remove("active");
          } else {
            this.dot && this.dot[this.lastDot].classList.remove("active");
          }
          this.dot &&
            this.dot[this.scroll.getCurrentPage().pageY + 1].classList.add(
              "active"
            );
        }
        this.scroll.next();
      }, 2000);
    },
    slide(page) {
      this.scroll.goToPage(0, page - 1, 500);
      this.dot.map(item => {
        item.classList.remove("active");
      });
      this.dot[page - 1].classList.add("active");
    }
  },
  computed: {},
  watch: {
    max(res) {
      this.max2 = res;
      this.$nextTick(() => {
        this._initSlider();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./AutoScroll";
</style>
