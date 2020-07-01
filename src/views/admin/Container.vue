<template>
  <div class="app">
    <el-container class="eheight">
      <el-aside
        class="app-side app-side-left"
        :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'"
      >
        <img src="@assets/a1.png" alt="" />
        <div>
          <!-- 我是样例菜单 -->
          <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            :collapse="isCollapse"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">界面编辑</span>
              </template>
              <el-menu-item-group>
                <!-- <span slot="title">权限管理</span> -->
                <el-menu-item index="1-1">界面1</el-menu-item>
                <el-menu-item index="1-2">界面2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">权限管理</span>
              </template>
              <el-menu-item-group>
                <!-- <span slot="title">权限管理</span> -->
                <el-menu-item index="1-1">用户管理</el-menu-item>
                <el-menu-item index="1-2">
                  <router-link to="helper">菜单管理</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">菜单三</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>

      <el-container>
        <el-header class="app-header">
          <div
            style="width: 60px; cursor: pointer;"
            @click.prevent="toggleSideBar"
          >
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
                <el-dropdown-item divided @click.native="logout"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="app-body">
          <template>
            <router-view name="helper" />
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";
import ElementUI from "element-ui";
import tablewss from "@components/tablewss/tablewss";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
export default {
  name: "Container",
  data() {
    return {
      username: "",
      isCollapse: false
    };
  },
  components: {
    tablewss
  },
  methods: {
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted: function() {
    // let user = sessionStorage.getItem('user');
    // if (user) {
    //   this.username = user;
    // }
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
  overflow: hidden;
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
  border: $solidBorder;
  display: flex;
  display: -webkit-flex;
  flex-flow: row nowrap;
  &-side {
    width: 230px;
    height: 100%;
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
.eheight {
  height: 100vh;
}
</style>
