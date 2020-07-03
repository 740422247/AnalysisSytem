<!--
 * @Descripttion: 登录
 * @version:
 * @Author: joykit
 * @Date: 2019-11-27 14:19:53
 * @LastEditors: joykit
 * @LastEditTime: 2020-03-13 14:31:02
 -->
<template>
  <div class="content-body Login">
    <section class="sec">
      <div class="title">
        <ScrollBox :isScroll="false">{{_config.system_Name}}</ScrollBox>
        <img class="guang1" :src="guang11" alt />
      </div>
      <div class="body">
        <ScrollBox :isScroll="false">
          <article class="arc">
            <ScrollBox :isScroll="false" class="hover">
              <div class="input">
                <img :src="yh" alt />
                <input type="text" v-model="user.LoginName" placeholder="请输入用户编号" autofocus />
              </div>
            </ScrollBox>
            <ScrollBox :isScroll="false" class="hover">
              <div class="input">
                <img :src="mm" alt />
                <input type="password" v-model="user.LoginPwd" placeholder="请输入用户密码" />
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
            <button @click="putLogin" type="button" class="button login">{{ lt }}</button>
          </article>
        </ScrollBox>
      </div>

      <p class="cp">
        Copyright© {{ new Date().getFullYear() }}重庆易联. All Rights Reserved.
        Chongqing Elane
      </p>
    </section>
    <div class="Login-bk" :style="{
        'background-image': 'url(' + loginBk + ')'
      }"></div>
  </div>
</template>
<script>
import api from "@api/api.js";
const ScrollBox = () => import("../../components/ScrollBox/ScrollBox.vue");
// import storage from "best-storage";
export default {
  name: "Login",
  data() {
    return {
      lt: "登 录",
      user: {
        LoginName: "admin",
        LoginPwd: "admin"
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
    this.keydown();
  },
  methods: {
    async putLogin() {
      console.log(api);
      this.lt = "正在登录...";
      //不需要token
      const aw = await api.Login(this.user, "noToken");
      console.log(aw);
      if (aw.code && aw.code.toString().length > 0) {
        this.lt = aw.text;
        setTimeout(() => {
          this.lt = "登 录";
        }, 3000);
        return;
      }
      const token = JSON.stringify(aw.Data);
      window.localStorage.setItem("token", token);
      const ays = await api.GetYear({});
      console.log(ays);
      !window.localStorage.getItem("PARAM") &&
        window.localStorage.setItem(
          "PARAM",
          JSON.stringify({
            PARAM_YEAR: ays.Data[ays.Data.length - 1].ID,
            PARAM_YEAR_Name: ays.Data[ays.Data.length - 1].NAME
          })
        );
      this.$router.replace({
        path: "/"
      });
      setTimeout(() => {
        this.lt = "登 录";
      }, 500);
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
  computed: {},
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
