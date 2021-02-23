<!--
 * @Descripttion: 登录/弃用,使用配置模块
 * @version:
 * @Author: joykit
 * @Date: 2019-11-27 14:19:53
 * @LastEditors: wss
 * @LastEditTime: 2021-01-11 15:22:09
 -->
<template>
  <div class="content-body Login">
    <section class="sec">
      <div class="title">
        <ScrollBox :isScroll="false">{{ _config.system_Name }}</ScrollBox>
        <img class="guang1" :src="guang11" alt />
      </div>
      <div class="body">
        <ScrollBox :isScroll="false">
          <article class="arc">
            <ScrollBox :isScroll="false" class="hover">
              <div class="input">
                <img :src="yh" alt />
                <input
                  type="text"
                  v-model="user.LoginName"
                  placeholder="请输入用户编号"
                  autofocus
                />
              </div>
            </ScrollBox>
            <ScrollBox :isScroll="false" class="hover">
              <div class="input">
                <img :src="mm" alt />
                <input
                  type="password"
                  v-model="user.LoginPwd"
                  placeholder="请输入用户密码"
                />
              </div>
            </ScrollBox>
            <ScrollBox :isScroll="false" class="hover">
              <div class="input">
                <!-- <img :src="mm" alt /> -->
                <input
                  type="text"
                  v-model="user.verifyCode"
                  placeholder="请输入验证码"
                />
                <img
                  class="yzm"
                  @click="GetVerifyCode()"
                  :src="verifyCode"
                  alt="刷新验证码"
                />
              </div>
            </ScrollBox>
            <!-- <div class="input">
              <input
                :style="{
                  'background-image': 'url('+jz2+')'
              }"
                id="jzmm"
                type="checkbox"
                :checked="!isChecked"
              />
              <label for="jzmm">记住密码</label>
            </div>-->
            <button
              @click="putLogin"
              :disabled="!isHttp"
              type="button"
              class="button login"
            >
              {{ lt }}
            </button>
          </article>
          <!-- <button @click="GetProfile()" type="button" class="button login">
            获取用户信息
          </button> -->
          <button @click="logout()" type="button" class="button login">
            清空用户信息
          </button>
        </ScrollBox>
      </div>

      <p class="cp">
        Copyright© {{ new Date().getFullYear() }}重庆易联. All Rights Reserved.
        Chongqing Elane
      </p>
    </section>
    <div
      class="Login-bk"
      :style="{
        'background-image': 'url(' + loginBk + ')'
      }"
    ></div>
  </div>
</template>
<script>
import api from "@api/api.js";
import { mapState, mapGetters, mapMutations } from "vuex";
const ScrollBox = () => import("../../components/ScrollBox/ScrollBox.vue");
// import storage from "best-storage";
export default {
  name: "Login",
  data() {
    return {
      lt: "登 录",
      isHttp: true,
      verifyCode: "",
      user: {
        LoginName: "",
        LoginPwd: "",
        verifyCode: ""
      },
      isChecked: true,
      loginBk: require("@static/image/loginBk.jpg"),
      guang11: require("@static/image/guang11.png"),
      yh: require("@static/image/yh.png"),
      mm: require("@static/image/mm.png"),
      jz: require("@static/image/jz.png"),
      jz2: require("@static/image/jz2.png")
    };
  },
  mounted() {
    console.log(this.getIsAdmin);
    this.GetVerifyCode();
    // this.GetProfile();
    this.keydown();
  },
  methods: {
    ...mapMutations({
      SET_TOKEN: "user/SET_TOKEN"
    }),
    rules(obj) {
      let msg = "你有必填项未输入";
      let index = 0;
      for (const key in obj) {
        console.log(key);
        if (!obj[key]) {
          if (index === 0) msg = "账号为空";
          if (index === 1) msg = "密码为空";
          if (index === 2) msg = "验证码为空";
          console.log(msg);
          this.$message({
            type: "warning",
            message: msg
          });
          return false;
        }
        index++;
      }
      return true;
    },
    logout() {
      // console.log("login页退出");
      this.$store.commit("Log_out", {});
    },
    GetVerifyCode() {
      api.Login("GetVerifyCode", null, "noToken").then(dd => {
        this.user.verifyKey = dd.data.verifyKey;
        this.verifyCode = dd.data.verifyCode;
      });
    },
    GetProfile() {
      api.User("GetProfile", null).then(dd => {
        this.isHttp = true;
        this.$store.commit("user/SET_userInfo", dd.data);
        // this.$router.replace({
        //       name: "index"
        //     });
        this.$store.dispatch("permission/GetResources").then(
          pp => {
            if (dd.data.isAdmin) {
              //   console.log("管理员")
              //   // this.$store.commit("user/SET_cacheRouter", "moduleListIndex");
              this.$router.push({
                name: "moduleListIndex"
              });
            } else {
              // console.log("普通用户");
              // this.$store.commit("user/SET_cacheRouter", null);
              const resourceId = this.getResourceTemplate[0].resourceTemplate;
              this.$router.push({
                name: "pageDetail",
                query: { id: resourceId }
              });
            }
          },
          () => {}
        );
      });
    },
    async putLogin() {
      this.lt = "正在登录...";
      const _this = this;
      if (!this.rules(this.user)) return;
      this.isHttp = false;
      api.Login("Login", this.user, "noToken").then(
        dd => {
          this.SET_TOKEN(dd.data);
          this.$message({
            type: "success",
            message: dd.msg ? dd.msg : dd.errMsg
          });
          this.GetProfile();
        },
        () => {
          setTimeout(() => {
            this.isHttp = true;
            this.lt = "登 录";
          }, 500);
          _this.GetVerifyCode();
        }
      );
      // const ays = await api.GetYear({});
      // !window.localStorage.getItem("PARAM") &&
      //   window.localStorage.setItem(
      //     "PARAM",
      //     JSON.stringify({
      //       PARAM_YEAR: ays.Data[ays.Data.length - 1].ID,
      //       PARAM_YEAR_Name: ays.Data[ays.Data.length - 1].NAME
      //     })
      //   );
    },
    keydown() {
      var lett = this;
      document.onkeydown = e => {
        var key = window.event.keyCode;
        if (key == 13) {
          this.putLogin();
        }
      };
    }
  },
  computed: {
    // ...mapGetters(["user/getIsAdmin"]),
    ...mapGetters("user", ["getIsAdmin", "getResourceTemplate"])
  },
  watch: {},

  components: {
    ScrollBox
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./Login";
@import "./ani";
// @import "../../assets/css/animated";
</style>
