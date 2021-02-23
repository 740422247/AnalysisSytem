<!--
 * @Descripttion: 登录
 * @version:
 * @Author: joykit
 * @Date: 2019-11-27 14:19:53
 * @LastEditors: wss
 * @LastEditTime: 2021-01-21 16:34:22
 -->
<template>
  <div class="content-body Login" ref="logDiv">
    <div class="floating-window" ref="floating" v-if="isLayout">
      <div class="drag" @mousedown.prevent="move">
        <i class="el-icon-rank"></i>
      </div>
      <div class="titleFilters">页面配置</div>
      <Filters
        @change="blurPage"
        ref="blurPage"
        :filter-entity="filterEntityPage"
        :filterModel="filterModelPage"
      ></Filters>
      <div class="titleFilters">标题设置</div>
      <Filters
        @change="blurTitle"
        ref="blurTitle1"
        :filter-entity="filterEntityTitle"
        :filterModel="filterModelTitle"
      ></Filters>
      <div class="titleFilters">登录表单设置</div>
      <Filters
        ref="blurTitle2"
        @change="blurOther"
        :filter-entity="filterEntityOther"
        :filterModel="filterModelOther"
      ></Filters>
      <!-- <el-button @click="defaultLay">默认布局</el-button> -->
      <div class="filterBtn">
        <el-button @click="resetForm">重置布局</el-button>
        <el-button @click="save" type="primary">保存布局</el-button>
      </div>
    </div>
    <section
      class="sec dw1"
      v-show="display"
      :style="updateStyle('secOther', 1)"
    >
      <div class="title" :style="updateStyle('otherBody', 1)">
        <ScrollBox
          :style="{
            width: layoutTitle.width,
            borderColor: layoutTitle.border === '0' ? 'transparent' : 'inherit',
            color: layoutTitle.color ? layoutTitle.color : null,
            fontSize: layoutTitle.fontSize
              ? layoutTitle.fontSize + 'px'
              : '20px'
          }"
          :config="layoutTitle"
          :isScroll="false"
          >{{ _config.system_Name }}</ScrollBox
        >
        <img v-if="layoutTitle.bgImg == 1" class="guang1" :src="guang11" alt />
      </div>
    </section>
    <!-- left: layoutOther.left ? layoutOther.left + '%' : '60%',
        top: layoutOther.top ? layoutOther.top + '%' : '25%' -->
    <section
      class="sec dw2"
      v-show="display"
      :style="updateStyle('secOther', 2)"
    >
      <div class="body" :style="updateStyle('otherBody', 2)">
        <ScrollBox :config="layoutOther" :isScroll="false">
          <article class="arc">
            <ScrollBox :config="layoutOther" :isScroll="false" class="hover">
              <div class="input">
                <img :src="yh" alt />
                <input
                  :style="{
                    color: layoutOther.color ? layoutOther.color : null
                  }"
                  type="text"
                  v-model="user.LoginName"
                  placeholder="请输入用户编号"
                  autofocus
                />
              </div>
            </ScrollBox>
            <ScrollBox :config="layoutOther" :isScroll="false" class="hover">
              <div class="input">
                <img :src="mm" alt />
                <input
                  type="password"
                  :style="{
                    color: layoutOther.color ? layoutOther.color : null
                  }"
                  v-model="user.LoginPwd"
                  placeholder="请输入用户密码"
                />
              </div>
            </ScrollBox>
            <ScrollBox :config="layoutOther" :isScroll="false" class="hover">
              <div class="input">
                <!-- <img :src="mm" alt /> -->
                <input
                  type="text"
                  v-model="user.verifyCode"
                  placeholder="请输入验证码"
                  :style="{
                    color: layoutOther.color ? layoutOther.color : null
                  }"
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
              :style="{
                color: layoutOther.colorBtn ? layoutOther.colorBtn : null,
                background: layoutOther.bgcolorBtn
                  ? layoutOther.bgcolorBtn
                  : null
              }"
              type="button"
              class="button login"
            >
              {{ lt }}
            </button>
          </article>
        </ScrollBox>
      </div>

      <p class="cp">
        Copyright© {{ new Date().getFullYear() }}重庆易联. All Rights Reserved.
        Chongqing Elane
      </p>
    </section>
    <div
      v-if="loginJson.background"
      :class="{
        transformFZ:
          layoutPage.transform == 0 || !layoutPage.transform ? false : true
      }"
      class="Login-bk"
      :style="{
        'background-image':
          layoutPage.backgroundImg == 1 || !layoutPage.backgroundImg
            ? 'url(/img/loginBk.jpg)'
            : null
      }"
    ></div>
  </div>
</template>
<script>
import api from "@api/api.js";
import { config } from "./config.js";
// import { filterTitle, filterOther, filterPage } from "./loginJs.js";
// import loginJson from "../../jsonJs/loginJson.js";
import { loginJson } from "@jsonJs/loginJson.js";
import { mapState, mapGetters, mapMutations } from "vuex";
import { nextTick } from "vuedraggable";
const Filters = () => import("@components/Admin/filterEntity.vue");
const ScrollBox = () => import("../../components/ScrollBox/ScrollBox.vue");
// import storage from "best-storage";
export default {
  name: "Login",
  props: {
    loginJson: {
      type: Object,
      default: () => {
        return loginJson;
      }
    }
  },
  mixins: [config],
  data() {
    return {
      display: false, //页面布局未加载隐页面
      layoutTitle: {
        backgroundImg: 1
        // color: "red"
      },
      layoutOther: {
        backgroundImg: 1
        // color: "red"
      },
      layoutPage: {
        backgroundImg: 1
      }, //页面配置
      isLayout: false, //是否配置页
      moveFlag: false,
      positionX: 0,
      positionY: 0,
      domEles: {},
      lt: "登 录",
      dragRef: {},
      isHttp: true,
      verifyCode: "",
      filterEntityTitle: [],
      filterEntityOther: [],
      filterEntityPage: [],
      filterModelTitle: {},
      filterModelOther: {},
      filterModelPage: {}, //页面数据
      //此处定义的对象自动验证非空
      user: {
        LoginName: "",
        LoginPwd: "",
        verifyCode: ""
      },
      isChecked: true,
      // loginBk: require("@static/image/loginBk.jpg"),
      guang11: require("@static/image/guang11.png"),
      yh: require("@static/image/yh.png"),
      mm: require("@static/image/mm.png"),
      jz: require("@static/image/jz.png"),
      jz2: require("@static/image/jz2.png")
    };
  },
  beforeCreate() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {});
  },
  created() {
    if (this.$route.name === "loginLayout") {
      this.isLayout = true;
    } else {
      this.isLayout = false;
    }
    this.getLayout();
    // this.configData && (this.configData = this.config);
    // !this.loginJson && (this.loginJson = loginJson);
  },

  mounted() {
    this.filterEntityOther = this.setFilterEntityOther();
    this.filterEntityTitle = this.setFilterEntityTitle();
    this.filterEntityPage = this.setFilterEntityPage();
    this.$nextTick(() => {});
    this.GetVerifyCode();
    // this.GetProfile();
    this.keydown();
  },
  methods: {
    ...mapMutations({
      SET_TOKEN: "user/SET_TOKEN"
    }),
    mouseup(e) {
      e.onmouseup = e => {
        document.mousedown = null;
      };
    },
    test() {
    },
    move(e) {
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
      this.moveState = true;
      const floating = this.$refs.floating;
      const d = this.$refs.logDiv;
      const dWidth = parseFloat(getComputedStyle(d).width);
      const dHeight = parseFloat(getComputedStyle(d).height);
      // const odiv = e.target; //获取目标元素
      const floatingWidth = parseFloat(getComputedStyle(floating).width);
      const floatingHeidth = parseFloat(getComputedStyle(floating).height);
      //算出鼠标相对元素的位置
      const disX = e.clientX - floating.offsetLeft;
      const disY = e.clientY - floating.offsetTop;
      document.onmousemove = e => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        const left = e.clientX - disX;
        const top = e.clientY - disY;
        let left1, top1;
        if (left < 0) {
          left1 = 0;
        } else if (dWidth - floatingWidth < left) {
          left1 = dWidth - floatingWidth;
        } else {
          left1 = left;
        }
        if (top < 0) {
          top1 = 0;
        } else if (dHeight - floatingHeidth < top) {
          top1 = dHeight - floatingHeidth;
        } else {
          top1 = top;
        }
        floating.style.left = left1 + "px";
        floating.style.top = top1 + "px";
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    regist(flag) {
      return el => {
        this.domEles[flag] = el;
      };
    },
    searchFilter(filterModel) {
    },

    GetVerifyCode() {
      api.Login("GetVerifyCode", null, "noToken").then(dd => {
        this.user.verifyKey = dd.data.verifyKey;
        this.verifyCode = dd.data.verifyCode;
      });
    },
    updateStyle(key, tid) {
      const arr = [];
      let obj = {};
      let a = "";
      //未一键垂直居中
      const t1 = () => {
        if (tid === 1) {
          arr.push({
            top: this.layoutTitle.top + "%"
          });
        } else if (tid === 2) {
          arr.push({
            top: this.layoutOther.top + "%"
          });
        }
      };
      //未左右居中
      const t2 = () => {
        if (tid === 1) {
          arr.push({
            left: this.layoutTitle.left + "%"
          });
        } else if (tid === 2) {
          arr.push({
            left: this.layoutOther.left + "%"
          });
        }
      };
      switch (key) {
        case "secOther": //表示样式.本页面
          for (const key in this.layoutPage) {
            if (key === "autoTop") {
              if (this.layoutPage[key] === "1") {
                // arr.push({
                //   top: "50%"
                //   // transform: "translateY(-50%)"
                // });
              } else {
                t1();
              }
            }
            if (key === "autoLeft") {
              if (this.layoutPage[key] === "leftCenter") {
                arr.push({
                  left: "25%"
                  // transform: "translateX(-50%)"
                });
              } else if (this.layoutPage[key] === "center") {
                arr.push({
                  left: "50%"
                  // transform: "translateX(-50%)"
                });
              } else if (this.layoutPage[key] === "rightCenter") {
                arr.push({
                  left: "75%"
                  // transform: "translateX(-50%)"
                });
              } else {
                t2();
              }
            }
          }
          arr.map(item => {
            obj = Object.assign(obj, item);
          });
          return obj;
        case "otherBody": //表示样式.居中
          if (this.layoutPage.autoLeft && this.layoutPage.autoLeft !== "-1") {
            a += "-50%";
          } else {
            a += "0";
          }
          if (this.layoutPage.autoTop === "1") {
            // a += ",-50%";
          } else {
            a += ",0";
          }
          return { transform: `translate(${a})` };
      }
    },
    save() {
      const arr = [];
      for (const key in this.layoutTitle) {
        //只遍历对象自身的属性，而不包含继承于原型链上的属性。
        if (
          Object.prototype.hasOwnProperty.call(this.layoutTitle, key) === true
        ) {
          arr.push({
            settingValue: this.layoutTitle[key],
            settingId: `layoutTitle${key}`,
            settingType: "Login",
            settingName: key
          });
        }
      }
      for (const key2 in this.layoutOther) {
        //只遍历对象自身的属性，而不包含继承于原型链上的属性。
        if (
          Object.prototype.hasOwnProperty.call(this.layoutOther, key2) === true
        ) {
          arr.push({
            settingValue: this.layoutOther[key2],
            settingId: `layoutOther${key2}`,
            settingType: "Login",
            settingName: key2
          });
        }
      }
      for (const key2 in this.layoutPage) {
        //只遍历对象自身的属性，而不包含继承于原型链上的属性。
        if (
          Object.prototype.hasOwnProperty.call(this.layoutPage, key2) === true
        ) {
          arr.push({
            settingValue: this.layoutPage[key2],
            settingId: `layoutPage${key2}`,
            settingType: "Login",
            settingName: key2
          });
        }
      }
      // 系统配置修改
      // arr.push({
      //   settingId: "EnabledVerifyCode",
      //   settingName: "EnabledVerifyCode",
      //   settingValue: "true"
      // });
      api.Setting("Set", arr).then(dd => {
        this.$message({
          type: "success",
          message: dd.msg ? dd.msg : dd.errMsg
        });
      });
      this.isHttp = true;
    },
    getLayout() {
      api.Setting("Get", { settingType: "Login" }).then(
        dd => {
          this.display = true;
          const layoutTitle = {};
          const layoutOther = {};
          const layoutPage = {};
          dd.data.map(item => {
            // if (item.settingId.indexOf("layoutTitle") !== -1) {
            //   layoutTitle[item.settingName] = item.settingValue;
            // }
            // if (item.settingId.indexOf("layoutOther") !== -1) {
            //   layoutOther[item.settingName] = item.settingValue;
            // }
            if (item.settingType === "Login") {
              if (item.settingId.indexOf("layoutTitle") !== -1) {
                layoutTitle[item.settingName] = item.settingValue;
              }
              if (item.settingId.indexOf("layoutOther") !== -1) {
                layoutOther[item.settingName] = item.settingValue;
              }
              if (item.settingId.indexOf("layoutPage") !== -1) {
                layoutPage[item.settingName] = item.settingValue;
              }
            }
          });
          this.layoutTitle = layoutTitle;
          this.filterModelTitle = layoutTitle;
          this.layoutOther = layoutOther;
          this.filterModelOther = layoutOther;
          this.layoutPage = layoutPage;
          this.filterModelPage = layoutPage;
          this.filterEntityOther = this.setFilterEntityOther();
          this.filterEntityTitle = this.setFilterEntityTitle();
        },
        () => {
          //布局接口失败显示登录框
          this.display = true;
        }
      );
    },
    blurTitle(dd) {
      this.layoutTitle = dd;
    },
    blurOther(dd) {
      this.layoutOther = dd;
    },
    blurPage(dd) {
      this.layoutPage = dd;
    },
    GetProfile() {
      api.User("GetProfile", null).then(dd => {
        this.isHttp = true;
        this.$store.commit("user/SET_userInfo", dd.data);
         this.$store.commit("user/SET_TemplateArr", dd.data.resources);
        // this.$router.replace({
        //       name: "index"
        //     });
        this.$store.dispatch("permission/GetResources").then(
          pp => {
            if (dd.data.isAdmin) {
              //   console.log("管理员")
              //   // this.$store.commit("user/SET_cacheRouter", "moduleListIndex");
              const already = (this.already = this.$store.state.permission.already);
              this.$router.push({
                name: already[0]
              });
            } else {
              // console.log("普通用户");/
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
    rules(obj) {
      let msg = "你有必填项未输入";
      let index = 0;
      for (const key in obj) {
        if (!obj[key]) {
          if (index === 0) msg = "账号为空";
          if (index === 1) msg = "密码为空";
          if (index === 2) msg = "验证码为空";
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
    async putLogin() {
      if (this.isLayout) {
        return false;
      }
      const _this = this;
      if (!this.rules(this.user)) return;
      this.lt = "正在登录...";
      this.isHttp = false;
      api.Login("Login", this.user, "noToken").then(
        dd => {
          this.SET_TOKEN(dd.data);
          this.$message({
            type: "success",
            message: dd.msg ? dd.msg : dd.errMsg
          });
          this.GetProfile();
          setTimeout(() => {
            this.isHttp = true;
            this.lt = "登 录";
          }, 0);
        },
        () => {
          setTimeout(() => {
            this.isHttp = true;
            this.lt = "登 录";
          }, 500);
          _this.GetVerifyCode();
        }
      );
      // this.lt = "登 录";
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
    },
    defaultLay() {
      this.layoutTitle = {};
      this.layoutOther = {};
      this.filterModelTitle = {};
      // this.filterModelOther = {};
    },
    resetForm() {
      this.$refs.blurTitle1.$refs.filterModel.resetFields();
      this.$refs.blurTitle2.$refs.filterModel.resetFields();
    }
  },
  beforeDestroy() {
    document.onkeydown = "";
  },
  computed: {
    // ...mapGetters(["user/getIsAdmin"]),
    ...mapGetters("user", ["getIsAdmin", "getResourceTemplate"])
  },
  watch: {
    loginJson: {
      deep: true,
      immediate: true,
      handler(res) {
        this.mapData = res;
      }
    }
  },

  components: {
    ScrollBox,
    Filters
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./Login";
@import "./ani";
// @import "../../assets/css/animated";
</style>
