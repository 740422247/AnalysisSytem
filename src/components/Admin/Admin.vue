<template>
  <div class="con" :class="{ bgl: !rv }">
    <!-- <div class="fk-wrap">
      <span class="fangkuai" v-for="i in 100" :key="i"></span>
    </div> -->
    <div :class="{ navCollapsed: isSidebarNavCollapse }">
      <el-menu
        :collapse="isSidebarNavCollapse"
        background-color="#304156"
        text-color="#eee"
        active-text-color="#4dbcff"
        :default-active="currentMenu"
        class="el-ul sidebar"
        unique-opened
      >
        <div class="shrink" @click="toggleNavCollapse2">
          <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
          <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
        </div>
        <DynamicMenu
          :menuList="sidebarMenu"
          v-loading="loadingMenu"
        ></DynamicMenu>
      </el-menu>

      <el-container class="main-container">
        <el-header class="app-header">
          <!-- <div style="width: 60px; cursor: pointer;" @click="toggleNavCollapse">
            <i v-show="isCollapse" class="el-icon-d-arrow-left"></i>
            <i v-show="!isCollapse" class="el-icon-d-arrow-right"></i>
          </div> -->
          <!-- 我是样例菜单 -->
          <el-menu
            default-active="1"
            class="el-menu-demo tab-page"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="#409EFF"
          >
            <el-menu-item index="1">{{ pageName }}</el-menu-item>
            <!--   <el-submenu index="2">
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
            </el-submenu> -->
            <!-- <el-menu-item index="3" disabled>消息中心</el-menu-item> -->
          </el-menu>
          <div class="app-header-userinfo">
            <div @click="abc">
              <span class="radius">
                <img
                  class="user-avatar"
                  :src="userInfo.avatar ? userInfo.avatar : avatar"
                  alt=""
                />
              </span>

              <input
                type="file"
                ref="uploadPhoto"
                id="uploadPhoto"
                style="display: none;"
              />
            </div>

            <el-dropdown
              class="user-info"
              trigger="hover"
              :hide-on-click="false"
            >
              <span class="el-dropdown-link">
                {{ userInfo.userName }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="actionMethods('switchover')"
                  >切换到普通用户</el-dropdown-item
                >
                <el-dropdown-item @click.native="actionMethods('editPwd')"
                  >修改密码</el-dropdown-item
                >
                <el-dropdown-item divided @click.native="logout"
                  >退出登录</el-dropdown-item
                >
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
    <FormDialog
      ref="showDialog"
      @ok="saveNewPwd"
      :dialogData="dialogEntity"
      :model="dialogModel"
    ></FormDialog>
  </div>
</template>
<script>
import api from "@api/api";
import Vue from "vue";
import { Ohyeah } from "vue-ohyeah-scroll";
import DynamicMenu from "@components/Admin/dynamic-menu";
import { mapState, mapGetters } from "vuex";
import ElementUI, { MessageBox, Message } from "element-ui";
// import tablewss from "@components/tablewss/tablewss";
import "element-ui/lib/theme-chalk/index.css";
const FormDialog = () => import("@components/Admin/form-dialog.vue");
Vue.use(ElementUI);
export default {
  name: "Admin",
  components: { Ohyeah, DynamicMenu, FormDialog },
  beforeCreate() {},
  provide() {
    return {
      theme: this.theme // 依赖于 data
    };
  },
  data() {
    return {
      loadingMenu: true,
      avatar: require("@assets/image/headPhoto.png"),
      dialogModel: {},
      dialogEntity: {},
      rv: true,
      username: "",
      routes: null,
      theme: {
        name: "theme1",
        code: 1
      }
    };
  },
  computed: {
    isCollapse: function() {
      return this.$store.state.isSidebarNavCollapse;
    },
    ...mapGetters("user", ["getIsAdmin", "getResourceTemplate"]),
    ...mapState(["isSidebarNavCollapse", "pageName"]),
    // ...mapState(["user/userInfo"]),
    ...mapState("permission", ["sidebarMenu", "currentMenu"]),
    ...mapState("user", ["userInfo"])
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
  updated() {},
  created() {
    const _this = this;
    window.readFile = function() {
      console.log("获取到文件对象");
      var file = this.files[0];
      //判断是否是图片类型
      if (!/image\/\w+/.test(file.type)) {
        Message("只能选择图片");
        return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        _this.saveHeadPhoto(this.result);
      };
    };
  },
  mounted() {
    this.init();
    setTimeout(() => {
      this.loadingMenu = false;
    }, 500);
  },
  methods: {
    init() {
      this.$refs.uploadPhoto.addEventListener("change", window.readFile, false);
    },
    toggleNavCollapse2() {
      this.$store.commit("toggleNavCollapse");
    },
    test() {
      console.log("test");
    },
    abc() {
      this.$refs.uploadPhoto.click();
    },
    saveHeadPhoto(image) {
      // this.$refs.uploadPhoto.click();
      // const file = this.$refs.uploadPhoto.files;
      api
        .publicApi("/Da/User/EditAvatar", { avatar: image }, "post")
        .then(res => {
          if (res.code === 1) {
            this.headModel = { ...this.headModel, avatar: image };
            Message({ message: "头像设置成功", type: "success" });
            this.$store.commit("user/SET_avatar", image);
          } else {
            Message({ message: res.errMsg, type: "error" });
          }
        });
    },
    actionMethods(action) {
      switch (action) {
        case "logout":
          this.logout();
          break;
        case "editPwd":
          this.editTitle();
          break;
        case "switchover":
          this.switchover();
          break;
        default:
          break;
      }
    },
    editTitle(model) {
      this.dialogEntity = this.setDialogData();
      this.dialogModel = model || {};
      this.$refs.showDialog.showDialog();
    },
    switchover() {
      const resourceId = this.getResourceTemplate[0].resourceTemplate;
      this.$router.push({
        name: "pageDetail",
        query: { id: resourceId }
      });
    },
    setDialogData() {
      return {
        title: "修改密码",
        width: "450px",
        labelWidth: "0px",
        top: "30vh",
        entity: [
          {
            label: "",
            placeholder: "原始密码",
            key: "oldPassword",
            rules: [
              { required: true, message: "原始密码不能为空", trigger: "blur" }
            ]
          },
          {
            label: "",
            placeholder: "新密码",
            key: "newPassword",
            rules: [
              { required: true, message: "新密码不能为空", trigger: "blur" }
            ]
          },
          {
            label: "",
            placeholder: "确认密码",
            key: "confirmPassword",
            rules: [
              { required: true, message: "确认密码不能为空", trigger: "blur" }
            ]
          }
        ]
      };
    },

    saveNewPwd({ model }) {
      if (model.newPassword !== model.confirmPassword) {
        MessageBox.confirm("两次输入密码不一致，请重新确认密码?", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        })
          .then(() => {
            this.editTitle({ oldPassword: model.oldPassword });
          })
          .catch(() => {
            this.editTitle({ oldPassword: model.oldPassword });
          });
      } else {
        api
          .publicApi(
            "/Da/User/EditLoginPwd",
            {
              oldLoginPwd: model.oldPassword,
              newLoginPwd: model.newPassword
            },
            "post"
          )
          .then(res => {
            if (res.code === 1) {
              Message({ message: "保存成功", type: "success" });
            } else {
              Message({ message: res.errMsg, type: "error" });
            }
          });
      }
    },
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
    logout: function() {
      this.$confirm("确认退出?", "提示", {})
        .then(() => {
          this.$store.commit("Log_out", {});
          this.$router.replace({
            path: "/login"
          });
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
.shrink {
  position: absolute;
  right: 5px;
  top: 50%;
  cursor: pointer;
  padding: 10px;
  z-index: 100;
  color: #fff;
}
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
  // height: calc(100% - 60px);
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
.user-info {
  vertical-align: middle;
}
.radius {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  max-width: 120px;
  overflow: hidden;
  margin: auto 5px;
  cursor: pointer;
  display: inline-block;
}
.user-avatar {
  display: inline-block;
  height: 100%;
  max-width: 80px;
}
</style>
