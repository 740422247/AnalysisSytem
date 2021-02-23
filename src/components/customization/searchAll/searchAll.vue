<!--  -->
<template>
  <div class="appSearch">
    <!-- <page-header
      :data="menu"
      :headModel="headModel"
      :years="years"
      @actionMethods="actionMethods"
      @choice="choiceYear"
    ></page-header> -->
    <div class="SearchAllPage" ref="logDiv">
      <div class="floating-window" ref="floating" v-if="showLayout">
        <div class="topTitle">
          <div class="drag" @mousedown.prevent="move">
            <i class="el-icon-rank"></i>
          </div>
          <div class="titleFilters">标题</div>
        </div>
        <!-- @change="blurTitle" -->
        <Filters
          ref="blurTitle1"
          :filter-entity="filterEntityTitle"
          :filterModel="filterModelTitle"
        ></Filters>
        <Filters
          style="margin-top:-63px"
          :filter-entity="dynamicEntity"
          :filterModel="dynamicModel"
        ></Filters>
        <!-- <el-button @click="defaultLay">默认布局</el-button> -->
        <div class="btnSave">
          <!-- <el-button @click="resetForm">重置布局</el-button> -->
          <el-button @click="save" type="primary">保存</el-button>
        </div>
      </div>
      <div class="searButton">
        <div v-if="isLayout" class="headerConfig">
          <i
            class="secAll el-icon-setting"
            :class="settingColor('all')"
            @click="settingMk({ GP: 'all' })"
            title="设置该模块"
          ></i>

          <!-- <router-link to="/searchAll">
          <Button type="primary">预览</Button></router-link
        > -->
        </div>
        <div class="Sear">
          <input
            type="text"
            v-focus="true"
            class="test"
            v-model="text"
            placeholder="请输入..."
          />
          <span>
            <input
              type="button"
              class="button"
              @click="GetProcSearchAll('click')"
            />
          </span>
        </div>

        <div class="searchResult" v-if="newList != ''">
          <div>
            相关结果:&nbsp;共
            <span @click="setSearchType({ GP: '' })">{{ PageInfo.total }}</span
            >条
          </div>
          <ul>
            <li>其中:</li>
            <li
              v-for="(item, i) in searchSum"
              :key="item.id"
              :class="{ pitchOnLi: pitchOnLiIndex === i }"
              @click="setSearchType(item, i)"
            >
              <span>{{ item.TITLE }}</span>
              <span class="cursor">{{ item.LINES }}</span
              >条
              <i
                v-show="pitchOnLiIndex === i"
                class="close"
                @click.stop="closeLi(i)"
                >x</i
              >
            </li>
            <!-- <li>
            主管部门
            <span>{{ searchSum.zgbm }}</span>条
          </li>
          <li>
            资金来源
            <span>{{ searchSum.zjly }}</span>条
          </li>
          <li>
            享受人
            <span>{{ searchSum.xsr }}</span>条
          </li>
          <li>
            单位
            <span>{{ searchSum.dw }}</span>条
          </li>-->
          </ul>
        </div>
        <Ohyeah
          class="xzys"
          thumbColor="#018AE1"
          height="80vh"
          :autoHide="true"
          :noHor="true"
        >
          <div class="xmList">
            <div v-for="item in newList" :key="item.id">
              <div class="bgys">
                <i
                  v-if="isLayout"
                  class="sec el-icon-setting"
                  :class="settingColor(item.GP)"
                  @click="settingMk(item)"
                  title="设置该模块"
                ></i>
                <span
                  v-for="i in 4"
                  :key="'line' + i"
                  :class="'line line-' + i"
                ></span>
                <div
                  class="padd"
                  @click="routerUrl(item)"
                  :class="{ pitchOn: item.GP === pitchOn }"
                >
                  <div class="titleA">
                    <img :src="configListObj[item.GP].icon[0]" alt />
                    <!-- <img
                    v-else-if="item.GP == 'XZ'"
                    src="~assets/image/searchAll/dw.png"
                    alt
                  />
                  <img
                    v-else-if="item.GP == 'GR'"
                    src="~assets/image/searchAll/xsr.png"
                    alt
                  />
                  <img
                    v-else-if="item.GP == 'QX'"
                    src="~assets/image/searchAll/zjly.png"
                    alt
                  />
                  <img
                    v-else-if="item.GP == 'DL'"
                    src="~assets/image/searchAll/zgbm.png"
                    alt
                  /> -->
                    <!-- <img v-else src="~assets/image/searchAll/xm.png" alt /> -->
                    <div class="vName fr">
                      <span class="fl">{{ item.VA1 }}</span>
                      <span v-if="item.GP == 'GR'" class="fr sfz">{{
                        item.VA2
                      }}</span>
                    </div>
                  </div>
                  <div class="titleB">
                    <span>{{ item.VA4 || "" }}</span>
                    <span class="marginleft">{{ item.VA3 || "" }}</span>
                    <span class="fr">{{ item.VA5 || "" }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div @click="deleteTest()">清除测试</div> -->
          </div>
        </Ohyeah>
      </div>
      <zpagenav
        class="dwys"
        v-bind:page="PageInfo.page"
        v-bind:page-size="PageInfo.pageSize"
        v-bind:total="PageInfo.total"
        v-bind:max-page="PageInfo.maxPage"
        v-on:pagehandler="pageHandler"
      ></zpagenav>
      <Loading :show="Loading"></Loading>
    </div>
  </div>
</template>

<script>
import api from "@api/api";
import PageHeader from "@components/draggable/PageHeader";
import { searchAll } from "./js/config.js";
import Loading from "com/basics/Loading";
import zpagenav from "com/basics/zpagenav";
import { Ohyeah } from "vue-ohyeah-scroll";
import * as types from "@store/mutation-types";
// import { Button } from "element-ui";
export default {
  name: "searchAll",

  components: {
    PageHeader,
    // Button,
    zpagenav,
    Loading,
    Ohyeah
  },
  mixins: [searchAll],
  data() {
    //这里存放数据
    return {
      pitchOnLiIndex: -1, //默认选择序号,类型
      SearchType: "", //搜索类型
      Loading: false, //加载中子组件状态
      text: "",
      PageInfo: {
        page: 1, //当前页
        pageSize: 12, //每一页显示的数据条数
        total: 0, //总数据条数
        maxPage: 7 //显示页码个数(可固定)
      },
      searchSum: [], //分类
      newList: []
    };
  },
  props: ["AgeAnalysis"],
  //监听属性 类似于data概念
  computed: {},
  directives: {
    focus: {
      inserted: function(el, { value }) {
        if (value) {
          el.focus();
        }
      }
    }
  },

  //方法集合
  methods: {
    test() {
      // conds=&key=2&PageSize=12&PageIndex=1&year=2020
      this.$store.dispatch(types.getDataByApi, {
        apiId: "3lOjwVqm2UiFMgvZym8d6g_Api/Dim/GetProcSearchAll",
        param: {
          conds: undefined,
          key: "2",
          PageSize: 12,
          PageIndex: 1,
          year: 2020
        },
        overtime$: 500000
      });
    },
    keydown() {
      let lett = this;
      document.onkeydown = e => {
        var key = window.event.keyCode;
        if (key === 13) {
          this.GetProcSearchAll();
        }
      };
    },
    // directives(){
    //   focus: {
    //     // 指令的定义
    //     inserted: function(el) {
    //       el.focus();
    //     }
    //   }
    // },
    setSearchType(item, index) {
      this.pitchOnLiIndex = index;
      this.SearchType = item.GP;
      // console.log("搜索类型", this.SearchType);
    },
    closeLi(index) {
      //分类关闭按钮
      this.pitchOnLiIndex = -1;
    },
    async GetProcSearchAll(t) {
      if (this.isLayout && t === "click") {
        this.$message({
          type: "error",
          message: "配置页无法搜索"
        });
        return false;
      }
      if (!this.text) {
        this.$store.commit("update", {
          hintText: "搜索条件不能为空，请输入", //提示文本
          time: 1000 //超时关闭时间,不传默认5秒
        });
        return;
      }
      this.Loading = true;
      console.log("22222");
      const param = {
        conds: this.SearchType,
        key: this.text,
        PageSize: this.PageInfo.pageSize,
        PageIndex: this.PageInfo.page
      };
      const a = await this.GetList(param);
      console.log(a);
      this.newList = a.Items;
      if (!this.newList || this.newList.length < 1) {
        this.$store.commit("update", {
          hint: 1,
          hintText: "该关键字无数据，请重新搜索"
        });
        this.Loading = false;
        return;
      }
      this.PageInfo.total = a.PageInfo.TotalCount;
      this.PageInfo.PageIndex = a.PageInfo.PageIndex;
      this.searchSum = a.Group;
      this.Loading = false;
    },
    async GetList(query) {
      // console.log(query);
      // const o = await api.GetYearContrast(query);
      const apiId = this.configListObj.all && this.configListObj.all.interface;
      // console.log(apiId);
      if (!apiId) {
        this.$message({
          type: "error",
          message: "未配置搜索接口",
          duration: 0,
          showClose: true
        });
        this.Loading = false;
        return;
      }
      const dds = await api.ApiProxy(
        "GetData",
        {
          apiId: apiId,
          param: query
        },
        50000
      );
      return dds.data;
    },
    pageHandler: function(page) {
      this.PageInfo.page = page;
      this.GetProcSearchAll();
    },
    PageIndex(data) {
      this.Loading = true;
      //  this.
      this.request.PageIndex = data;
      //  this.getData();
    },
    routerUrl(itt) {
      // if (this.isLayout === true) return;
      let pp = {};
      const lx = itt.GP; //类型
      this.configListObj[lx].arguments.map(dd => {
        pp[this.configListObj[lx][dd]] = itt[dd];
      });
      if (this.configListObj[lx].specialKey) {
        // console.log(this.getPathParamResult(this.configListObj[lx].specialKey));
        pp = Object.assign(
          pp,
          this.getPathParamResult(this.configListObj[lx].specialKey)
        );
      }

      console.log(pp);
      this.$router.push({
        name: "pageDetail",
        query: {
          id: this.configListObj[lx].moduleId,
          param: JSON.stringify(pp)
        }
      });
    },
    goProjectDetailSmallMiXi(item) {
      // return;
      this.$router.push({
        path: "/ProjectDetailSmallMiXi",
        query: {
          projectid: item.PROJECTID,
          year: item.YEAR,
          month: item.MONTH
        }
      });
    }
  },

  created() {
    // this.pageHandler(1);
  },

  async mounted() {
    // if (this.isLayout) {
    //   const p = await require("./js/searchAll.js");
    //   this.newList = p.a.Data[0].BODYS.Items;
    //   this.searchSum = p.a.Data[0].GROUP;
    //   this.PageInfo.total = p.a.Data[0].BODYS.PageInfo.TotalCount;
    //   this.PageInfo.PageIndex = p.a.Data[0].BODYS.PageInfo.PageIndex;
    // }
  },
  watch: {
    query(a, b) {},
    $route() {
      console.log(this.query);
      this.query = this.$route.query;
      this.text = this.query.content;
      // this.GetProcSearchAll(this.text);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "com/variable.scss";
@import "./searchAll.scss";
</style>
