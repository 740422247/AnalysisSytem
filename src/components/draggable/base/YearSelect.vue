<template>
  <div class="year-select">
    <div class="year-select-head" @click.stop="setBody">
      <span>{{title === 'all' ? '所有年度' :title}} {{title === 'all' ? '' : '年'}}</span>
      <i class="el-icon-arrow-down" :class="{active: showBody}"></i>
    </div>
    <div class="year-select-body bar" :class="{active: showBody}">
      <div
        class="menu-item"
        @click="choice(item)"
        v-for="item in data"
        :key="item"
      >{{item === 'all' ? '所有年度' :item}} {{item === 'all' ? '' : '年'}}</div>
    </div>
    <!-- <div class="year-select-mask" v-if="showBody" @click="showBody = false"></div> -->
  </div>
</template>

<script>
export default {
  name: "Logoug",
  props: {
    data: Array,
  },
  data: () => ({ showBody: false, title: "all" }),
  mounted() {
    this.init();
  },
  watch: {
    data(res) {
      this.init();
    },
  },
  methods: {
    init() {
      this.title = this.data[this.data.length - 1];
      this.close();
    },
    close() {
      document.querySelector("body").onclick = () => {
        this.showBody = false;
      };
    },
    setBody() {
      this.showBody = !this.showBody;
    },
    choice(year) {
      this.showBody = false;
      this.title = year;
      this.$emit("choice", year);
    },
  },
};
</script>

<style lang="scss" scoped>
.year-select {
  position: relative;
  float: right;
  margin-right: 20px;
  margin-left: 40px;
  height: 70px;
  line-height: 70px;
  .year-select-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  .year-select-head {
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      color: #7a94d1;
      font-size: 16px;
      margin-left: 10px;
      margin-right: 10px;
    }
    i {
      color: #7a94d1;
      transform: rotate(0);
      transition: all 0.3s ease;
      &.active {
        transform: rotate(-180deg);
      }
    }
  }
  .year-select-body {
    position: absolute;
    top: 72px;
    right: 0;
    width: 150px;
    z-index: 2000;
    max-height: 0;
    transition: all 0.3s ease-in-out;
    background-color: #103379;
    &.active {
      max-height: 200px;
    }
    div {
      height: 40px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background-color: #103379;
      font-size: 16px;
      color: #7a94d1;
      padding-left: 20px;
      cursor: pointer;
      &:hover {
        background-color: #1c3d80;
        color: #d2e0ff;
        .year-select-action {
          border-color: #d2e0ff;
        }
      }
    }
  }
}
</style>
