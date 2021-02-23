<template>
  <div id="app" class="theme1" :data-theme="theme['name']">
    <!-- <div class="ShowTheme">
      <button
        type="button"
        v-for="(item, key) in _theme"
        :key="key"
        @click="chioce(key)"
      >
        {{ item }}
      </button>
    </div>-->
    <template v-if="!isManagement">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </template>
    <Admin v-if="isManagement">
      <template>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </template>
    </Admin>
    <message></message>
  </div>
</template>
<script>
import echarts from "echarts/lib/echarts";
import message from "com/basics/message";
import Admin from "@components/Admin/Admin";
import { mapState } from "vuex";
import theme from "@assets/theme/index.scss";
export default {
  name: "App",
  components: { Admin, message },
  beforeCreate() {},
  provide() {
    return {
      echarts: echarts,
      pTheme: this.theme // 依赖于 data
    };
  },
  data() {
    return {
      isManagement2: true,
      theme: {
        name: "theme1",
        code: 1
      },
      cc: "red"
    };
  },
  computed: {
    ...mapState("permission", ["isManagement"]),
    _theme() {
      return theme;
    }
  },
  created() {
    const pendName = this.$router.history.pending.name;
    if (pendName !== "login") {
      this.$store.dispatch("user/Refresh_TOKEN", null);
    }
  },
  mounted() {},
  methods: {
    chioce(key) {
      this.theme.name = key;
    },
    goRouter(url, query) {
      this.$router.push(url);
    },
    toggleSideBar() {
      this.isCollapse = !this.isCollapse;
    },
    logout: function() {
      this.$confirm("确认退出?", "提示", {})
        .then(() => {
          sessionStorage.removeItem("user");
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    handleSelect(key, keyPath) {}
  }
};
</script>
<style lang="scss">
[v-cloak] {
  display: none !important;
}
html {
  height: 100%;
}

body {
  position: relative;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  color: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #110e4f;
}
.button {
  appearance: none;
  border: none;
  background: transparent;
  outline: none;
  transition: all 0.45s ease-in-out;
  justify-content: center;
}
.button-hover:hover {
  box-shadow: 0 0 38px rgba(31, 122, 243, 0.29) inset,
    0 0 38px rgba(31, 122, 243, 0.29);
}
.app {
  $solidBorder: 1px solid #eee;
  $sideCollapsedWidth: 66px;
  $sideExpandedWidth: 230px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 1em;
  width: 100%;
  height: 100vh;
  min-width: 900px;
  // border: $solidBorder;
  display: flex;
  display: -webkit-flex;
  flex-flow: row nowrap;
  &-side {
    width: 230px;
    height: 100vh;
    font-weight: 700;
    border-right: $solidBorder;
    &-left {
      background-color: rgb(238, 241, 246);
    }
    &-logo {
      height: 60px;
      text-align: center;
    }
    &-collapsed {
      width: 66px !important;
    }
    &-expanded {
      width: 230px !important;
    }
  }
  &-header {
    width: 100%;
    height: 60px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    border-bottom: $solidBorder;
    &-userinfo {
      position: absolute;
      right: 0;
      margin-right: 25px;
      display: flex;
      flex-flow: row nowrap;
      height: 60px;
      justify-content: flex-start;
      align-items: center;
    }
  }
  &-body {
    font-size: 1em;
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow-y: scroll;
  }
  &-footer {
    width: 100%;
    height: 60px;
  }
}

.inline-block {
  display: inline-block;
}

#app {
  -webkit-font-smoothing: antialiased;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
  .ShowTheme {
    position: absolute;
    z-index: 10;
  }
}
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.animated2 {
  -webkit-animation-duration: 0.351s;
  animation-duration: 0.351s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
}

@-webkit-keyframes fadeInDown3 {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-50%, -100%, 0);
    transform: translate3d(-50%, -100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
  }
}

@keyframes fadeInDown3 {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-50%, -100%, 0);
    transform: translate3d(-50%, -100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
  }
}

@-webkit-keyframes fadeInDown3_1 {
  from {
    opacity: 1;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(-50%, -200%, 0);
    transform: translate3d(-50%, -200%, 0);
  }
}

@keyframes fadeInDown3_1 {
  from {
    opacity: 1;
    -webkit-transform: translate3d(-50%, 0, 0);
    transform: translate3d(-50%, 0, 0);
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(-50%, -200%, 0);
    transform: translate3d(-50%, -200%, 0);
  }
}

.fadeInDown3 {
  -webkit-animation-name: fadeInDown3;
  animation-name: fadeInDown3;
}
.fadeInDown3_1 {
  -webkit-animation-name: fadeInDown3_1;
  animation-name: fadeInDown3_1;
}

@-webkit-keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInLeft {
  -webkit-animation-name: fadeInLeft;
  animation-name: fadeInLeft;
}

@-webkit-keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInRight {
  -webkit-animation-name: fadeInRight;
  animation-name: fadeInRight;
}

@-webkit-keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInLeft {
  -webkit-animation-name: fadeInLeft;
  animation-name: fadeInLeft;
}

@-webkit-keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
</style>
