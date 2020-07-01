<template>
  <div class="con" :class="{bgl:!rv}">
    <div class="fk-wrap">
      <span class="fangkuai" v-for="i in 100" :key="i"></span>
    </div>
    <div :class="{navCollapsed:isSidebarNavCollapse}">
      <el-menu
        :collapse="isSidebarNavCollapse"
        background-color="#304156"
        text-color="#eee"
        active-text-color="#4dbcff"
        :default-active="currentMenu"
        class="el-ul sidebar"
      >
        <DynamicMenu :menuList="sidebarMenu"></DynamicMenu>
      </el-menu>

      <el-container class="main-container">
        <el-header class="app-header">
          <div style="width: 60px; cursor: pointer;" @click="toggleNavCollapse">
            <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
            <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
          </div>
          <!-- 我是样例菜单 -->
          <el-menu
            default-active="1"
            class="el-menu-demo tab-page"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="#409EFF"
          >
            <el-menu-item index="1">用户管理</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
          </el-menu>

          <div class="app-header-userinfo">
            <el-dropdown trigger="hover" :hide-on-click="false">
              <span class="el-dropdown-link">
                {{ username }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <!-- /class="app-body" -->
        <el-main>
          <Ohyeah
            width="100%"
            class="xzys"
            thumbColor="#018AE1"
            :autoHide="true"
            trackColor="#fff"

          >
            <slot></slot>
          </Ohyeah>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Ohyeah } from "vue-ohyeah-scroll";
import DynamicMenu from "@components/Admin/dynamic-menu";
import { mapState } from "vuex";
import ElementUI from "element-ui";
// import tablewss from "@components/tablewss/tablewss";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
export default {
  name: "Admin",
  components: { Ohyeah, DynamicMenu },
  beforeCreate() {},
  provide() {
    return {
      theme: this.theme // 依赖于 data
    };
  },
  data() {
    return {
      rv: true,
      username: "",
      isCollapse: true,
      routes: null,
      theme: {
        name: "theme1",
        code: 1
      }
    };
  },
  computed: {
    ...mapState(["isSidebarNavCollapse"]),
    ...mapState("permission", ["sidebarMenu", "currentMenu"])
  },
  watch: {
    // $route(to, from) {
    //   if (to.path === "/home" || to.path === "/login") {
    //     this.rv = false;
    //   } else {
    //     this.rv = true;
    //   }
    // }
  },
  created() {},
  mounted() {
    const qx = [
      //   {
      //     isEnabled: true,
      //     resourceCode: "界面编辑"
      //   },
      //   {
      //     isEnabled: true,
      //     resourceCode: "界面编辑-界面编辑1"
      //   }
      {
        isEnabled: true,
        resourceCode: "权限管理"
      },
      {
        isEnabled: true,
        resourceCode: "权限管理-菜单管理"
      }
    ];
    // this.$store.commit("menuAuth", qx);
  },
  methods: {
    toggleNavCollapse() {
      this.$store.commit("toggleNavCollapse");
    },
    toString(index) {
      return index.toString();
    },
    newindex(index, idx) {
      return index + "-" + idx;
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
          window.localStorage.clear();
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss">
.bgl {
  background-color: #110e4f;
}
.app-body {
  overflow: hidden;
}
.con {
  width: 100vw;
  height: 100vh;
  position: fixed;
}
.el-main {
  padding: 0;
  overflow: hidden;
}
.main {
  position: relative;
  z-index: 1;
  $solidBorder: 1px solid #eee;
  $sideCollapsedWidth: 66px;
  $sideExpandedWidth: 230px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 1em;
  width: 100%;
  height: 100vh;
  min-width: 900px;
  border: $solidBorder;
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
  &-container {
    height: 100vh;
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
.fk-wrap {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
@for $i from 1 to 20 {
  $w: random(
    $limit: 20
  );
  .fangkuai:nth-of-type(#{$i}) {
    width: $w * 1px;
    height: random($limit: 20) * 1px;
    background-color: rgba(37, 113, 201, 0.15);
    display: block;
    position: absolute;
    z-index: 99999;
    left: random($limit: 100) * 1%;
    transform: translateY(100vh);
    animation: ani (3 + random($limit: 10)) * 1s ease-in-out infinite;
  }
}

@keyframes ani {
  0% {
    transform: translateY(100vh) rotate(0);
  }
  100% {
    transform: translateY(0) rotate(360deg);
  }
}
.el-menu {
  text-align: left;
}
.el-ul {
  height: 100%;
}
</style>
