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
  </div>
</template>
<script>
import echarts from "echarts/lib/echarts";

import Admin from "@components/Admin/Admin";
import { mapState } from "vuex";
import theme from "@assets/theme/index.scss";
export default {
  name: "App",
  components: { Admin },
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
      }
    };
  },
  computed: {
    ...mapState("permission", ["isManagement"]),
    _theme() {
      return theme;
    }
  },
  created() {},
  mounted() {
    console.log(this.permissionList);
    console.log(this.isManagement);
  },
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
html {
  height: 100%;
}

body {
  position: relative;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: row;
  .ShowTheme {
    position: absolute;
    z-index: 10;
  }
}
</style>
