<template>
  <div class="page-header-container">
    <div class="fk-wrap">
      <span class="fangkuai" v-for="i in 100" :key="i"></span>
    </div>
    <div v-if="$route.name !== 'Login'" class="dingji-wrap">
      <div class="content-top">
        <router-link
          :to="{ name: 'pageDetail', query: { id: data[0].resourceTemplate } }"
          class="title white"
        >
          {{ _config.system_Name }}
        </router-link>
        <div class="root">
          <template v-for="(item, key) in data">
            <router-link
              :to="{ name: 'pageDetail', query: { id: item.resourceTemplate } }"
              :key="item.resourceId"
              v-if="key < 7"
            >
              <label>{{ item.resourceName }}</label>
              <img class="img-bk" :src="img" alt="img" />
            </router-link>
          </template>
          <year-select
            :data="years"
            v-if="years.length"
            @choice="choice"
          ></year-select>
          <!-- <router-link to="/pCountry">
            <label>{{_config['isPkText']?"贫困":""}}乡镇</label>
            <img class="img-bk" :src="img" alt="img" />
          </router-link>
          <router-link to="/Analysis">
            <label>数据分析</label>
            <img class="img-bk" :src="img" alt="img" />
          </router-link>
          <router-link to="/ProjectOnline">
            <label>区县项目汇总表</label>
            <img class="img-bk" :src="img" alt="img" />
          </router-link>
          <router-link to="/SystemMonitoring">
            <label>系统监控</label>
            <img class="img-bk" :src="img" alt="img" />
          </router-link>-->

          <!-- <YearSeach /> -->
        </div>
      </div>
      <div class="searchWC" :class="{ unfold: isClick }">
        <img
          @click="seach()"
          class="img"
          src="@assets/image/searchTop.png"
          alt
        />
        <div class="textDiv">
          <input type="text" v-model.trim="seName" placeholder="请输入..." />
        </div>
      </div>
      <Logout :model="headModel" @actionMethods="actionMethods"></Logout>
    </div>
  </div>
</template>

<script>
// import Head from "com/top/head";
import Logout from "./base/Logout";
import YearSelect from "./base/YearSelect";

export default {
  name: "index",
  props: {
    data: { type: Array },
    headModel: Object,
    years: Array
  },
  components: {
    Logout,
    YearSelect
  },

  data() {
    return {
      isClick: false, //放大镜点开，默认未点击
      seName: "",
      seName2: "",
      isHover: 0,
      isActive: 1,
      transitionName: "slide-left",
      img: require("../../static/image/gggd.png"),
      route: 0 //默认未跳转
    };
  },
  computed: {},
  mounted() {
    // this.mouseWheel();
  },
  methods: {
    // mouseWheel() {
    //   // document.querySelector("#app").onmouseup = function() {
    //   //   console.log("----");
    //   // };
    // },
    clkTag(i) {
      const path = this.$route.path;
      this.isActive = i;
      // this.getPath(path)
    },
    seach() {
      // console.log("page search:", this.seName);
      if (this.seName) {
        if (this.seName !== this.seName2) {
          this.$router.push({
            name: "pageDetail",
            query: {
              id: "SearchAll",
              content: this.seName
            }
          });
        }

        this.seName2 = this.seName;
      } else {
        // console.log("非空点击", this.isClick);
        this.isClick = !this.isClick;
      }
    },
    actionMethods(action) {
      this.$emit("actionMethods", action);
    },
    choice(year) {
      this.$emit("choice", year);
    },
    hqjd() {}
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  }
};
</script>

<style scoped lang="scss">
// @import "com/variable.scss";
.page-header-container {
  flex: 0 0 70px;
}
.dingji-wrap {
  // display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #171d57;
  height: 70px;
  position: relative;
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  z-index: 10000;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.child-view {
  transition: all 0.4s;
  overflow: hidden;
  margin: 0 auto;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}

.title {
  filter: drop-shadow(-5px 14px 31px rgba(26, 100, 237, 1));
  font-size: 24px;
  height: 100%;
  display: inline-block;
  float: left;
}
.index-body {
  box-sizing: border-box;
  width: vw(1920);
  min-width: 1300px;
  overflow-x: auto;
  overflow-y: hidden;
  // height: 100vh;
  // width: 900px;
}
a {
  color: rgba(157, 186, 227, 1);
  text-decoration: none;
  line-height: 70px;
  font-size: 16px;
  transition: all 0.45s ease;
  position: relative;
  z-index: 1;
}
.content-top {
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  white-space: pre;
  justify-content: space-between;
  padding: 0 2.5vh;
  float: left;
  // overflow-y: hidden;
  height: 70px;
  // width: 65%;
  background-color: #171d56;
  .white {
    color: #fff;
  }
}
.root {
  // float: left;
  display: inline-block;
  margin-left: 120px;
  // overflow: hidden;
  width: 80%;
  > a {
    // margin: 0 16px;
    height: 70px;
    display: inline-block;
    // padding: 0 10px;
    overflow: hidden;
  }
}
.root a {
  position: relative;
  label {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
    cursor: pointer;
    padding-left: 19px;
    padding-right: 19px;
  }
}
.router-link-exact-active,
.router-link-active {
  color: #fff;
}
.router-link-exact-active .img-bk,
.router-link-active .img-bk {
  // //  background:rgba(26,100,237,1);
  // background: url(../static/image/gggd.png) no-repeat;
  // background-size: contain;
  // background-position-x: center;
  // background-position-y: bottom;
  visibility: visible;
  animation: aniss 0.25s ease-in-out;
  z-index: 3;
}
.root {
  // display: flex;
  align-items: center;
}
.root > a {
  position: relative;
}
.img-bk {
  position: absolute;
  left: 50%;
  bottom: -10px;
  transform: translateX(-50%);
  z-index: -1;
  visibility: hidden;
}
.router-link-exact-active label,
.router-link-active label {
  display: block;
  background-image: linear-gradient(0deg, #19225d 0%, #182972 100%);
  z-index: 2;
}

@keyframes aniss {
  0% {
    transform: translateX(-100%) translateX(-50%);
  }
  100% {
    transform: translateX(0) translateX(-50%);
  }
}

.title {
  user-select: none;
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
.SearchAll {
  // &:hover {
  //   background-color: rgba(19, 51, 120, 1);
  // }
  display: inline-block;
  margin-right: vw(38);
  height: 100%;
  width: 70px;
  text-align: center;
  cursor: pointer;
  p {
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  img {
    margin: 0 auto;
    display: inline-block;
    height: 40%;
    margin-top: 30%;
    vertical-align: middle;
  }
}
@keyframes myfirst {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
@keyframes myWidth {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
.searchWC {
  position: absolute;
  right: 120px;
  z-index: 1000;
  display: inline-block;
  box-sizing: border-box;
  float: right;
  height: 100%;
  margin-right: 20px;
  width: 70px;
  padding: 0 20px;
  // background-color: rgba(19, 51, 120, 1);
  // animation: myfirst 0.8s forwards;
  // transform-origin: right;
  transition: all 0.7s ease-in-out;
  > * {
    vertical-align: middle;
  }
  .img {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    z-index: 800;
  }
  // &.img:hover{
  //     .textDiv{
  //       width: 100%
  //     }
  //   }

  .textDiv {
    height: 100%;
    // width: 100%;
    // transition: width 0.5s;
    width: 100%;
    display: inline-block;
    // min-width: 150px;
    // transform: scaleX(0);
    overflow: hidden;

    input {
      height: 100%;
      width: 100%;
      // margin-top: 5%;
      background-color: transparent;
      color: #fff;
      caret-color: #fff;
      padding-right: 40px;
      text-indent: 5px;
      border: none;
      appearance: none;
      outline: none;
      // border: 1px solid #0149a9;

      // &:focus{
      //   border:none
      // }
    }
    ::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #6688bf;
    }

    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #6688bf;
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #6688bf;
    }
    input:hover {
      border: none;
    }
    input:focus {
      border: none;
    }
  }
}
.unfold {
  width: 19.4%;
  background-color: #133378;
}
@media screen and (max-width: 1700px) {
  .root {
    margin-left: 20px;
    width: 65%;
    overflow: visible;
    .year-select {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
}
// .searchWC .img:hover + .textDiv {
//   animation: myfirst 0.8s forwards;
//   transform-origin: right;
// }
// .searchWC .textDiv:hover {
//   transform: scaleX(1);
// }
</style>
