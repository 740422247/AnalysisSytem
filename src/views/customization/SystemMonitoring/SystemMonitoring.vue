<!--  -->
<template>
  <div class="fix" ref="logDiv">
    <div v-if="isLayout" class="headerConfig">
      <i
        class="el-icon-setting"
        :class="settingColor('all')"
        @click="settingMk({ GP: 'all' })"
        title="设置该模块"
      ></i>

      <!-- <router-link to="/searchAll">
        <Button type="primary">预览</Button></router-link
      > -->
    </div>
    <div class="floating-window" ref="floating" v-if="showLayout">
      <div class="drag" @mousedown.prevent="move">
        <i class="el-icon-rank"></i>
      </div>
      <div class="titleFilters">标题</div>
      <!-- @change="blurTitle" -->
      <Filters
        ref="blurTitle1"
        :filter-entity="filterEntityTitle"
        :filterModel="filterModelTitle"
      ></Filters>
      <!-- <el-button @click="defaultLay">默认布局</el-button> -->
      <div class="btnSave">
        <el-button @click="resetForm">重置操作</el-button>
        <el-button @click="save" type="primary">保存</el-button>
        <el-button @click="showLayout = false">关闭</el-button>
      </div>
    </div>
    <div class="fix-left">
      <header class="hed">
        <img
          class="guanghuan"
          v-for="i in 10"
          :key="i"
          src="~@static/image/gqqqq.png"
          alt
        />
        <mapSvg
          v-if="_config['city'].includes('重庆')"
          class="mapIndex"
          :topStatisticsl="topStatisticsl"
        ></mapSvg>
        <mapSvgShanxi
          v-if="_config['city'].includes('山西')"
          class="mapIndex"
          :topStatisticsl="topStatisticsl"
        ></mapSvgShanxi>
      </header>
      <footer class="table-list">
        <ScrollBox :isScroll="false">
          <Ohyeah
            width="100%"
            class="xzys"
            thumbColor="#018AE1"
            :autoHide="true"
            trackColor="#fff"
            height="31.9vh"
          >
            <article class="scroll-table-list">
              <table class="table">
                <thead>
                  <!--  class="animated fadeInDown"
                    :style="{
                  'animation-delay': 200 + 200 * key + 'ms'
                  }"-->
                  <tr v-for="(item, key) in Headers" :key="'tr' + key">
                    <th
                      class="aa animated fadeInDown"
                      :style="{
                        position: 'sticky',
                        top: key * 36 + 'px',
                        'z-index': 888,
                      }"
                      :columnName="item1.ColumnName"
                      :childrenCount="item1.LeafCount - 1"
                      v-for="(item1, key1) in item"
                      :key="'th' + key1"
                      :rowspan="
                        item1.LeafCount - 1 > 0 ? 1 : Maxlevel - item1.Level
                      "
                      :colspan="item1.LeafCount > 0 ? item1.LeafCount : 1"
                    >
                      <p>
                        {{ item1.HeaderName }}
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody class="table-list-body">
                  <tr
                    v-for="(item, i) in body && body"
                    :key="i"
                    class="animated fadeInDown"
                  >
                    <template v-for="(k, key1) in item">
                      <td
                        v-if="key1 != 8"
                        class="aa listAni animated fadeInDown"
                        :key="k.id"
                      >
                        {{ k && k.data }}
                      </td>
                      <td
                        v-if="key1 == 8"
                        :title="k.data"
                        class="aa listAni"
                        :key="k.id"
                      >
                        {{ k && k.data }}
                      </td>
                    </template>

                    <td>
                      <span
                        v-if="item[0].idd != '汇总'"
                        class="btn"
                        @click="ManuallyRefresh(item, i, item[0].idd)"
                      >
                        <b v-show="!isDisable[i]">手动同步</b>
                        <b v-show="isDisable[i]">同步中...</b>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </article>
          </Ohyeah>
        </ScrollBox>
      </footer>
    </div>
    <div class="fix-right">
      <ScrollBox :isScroll="false">
        <div class="titleHead">
          <div class="tit-name">服务器运行状态</div>
          <div class="fk">
            <span>&nbsp;</span>
            <label>正常</label>
          </div>
          <div class="fk">
            <span>&nbsp;</span>
            <label>警告</label>
          </div>
          <div class="fk">
            <span>&nbsp;</span>
            <label>异常</label>
          </div>
        </div>
        <main class="lex-flow">
          <LoadingSlot class="load" :show="dashBoardVal.one">
            <!-- <ECG></ECG> -->
            <jkGraph
              :type="'dashBoard'"
              v-if="this.dashBoardVal.one.length > 0"
              :config="{
                grid: false,
                border: false,
                data: this.dashBoardVal.one[0],
              }"
            />
          </LoadingSlot>
          <LoadingSlot class="load" :show="dashBoardVal.two">
            <jkGraph
              :type="'dashBoard'"
              v-if="this.dashBoardVal.two.length > 0"
              :config="{
                grid: false,
                border: false,
                data: this.dashBoardVal.two[0],
              }"
            />
          </LoadingSlot>
          <LoadingSlot class="load" :show="dashBoardVal.three">
            <jkGraph
              :type="'dashBoard'"
              v-if="this.dashBoardVal.three.length > 0"
              :config="{
                grid: false,
                border: false,
                data: this.dashBoardVal.three[0],
              }"
            />
          </LoadingSlot>
        </main>
      </ScrollBox>
    </div>
    <Loading :show="Loading"></Loading>
  </div>
</template>

<script>
import Vue from "vue";
import api from "@api/api.js";
import { sysConfig } from "./js/config.js";
import Loading from "com/basics/Loading";
import LoadingSlot from "com/basics/LoadingSlot";
import { Ohyeah } from "vue-ohyeah-scroll";
import { Button } from "element-ui";
// import dashBoard from "com/chart/dashBoard/dashBoard";
import jkGraph from "@components/chart/jkGraph";
// import ECG from "com/chart/ECG/ECG";
import { thead } from "./headJson/Tablehead";
const ScrollBox = () => import("@components/ScrollBox/ScrollBox.vue");
export default {
  name: "SystemMonitoring",
  mixins: [sysConfig],
  components: {
    Button,
    Ohyeah,
    ScrollBox,
    Loading,
    LoadingSlot,
    jkGraph,
    // ECG,
    mapSvg: Vue.component("mapSvg", (resolve, reject) => {
      setTimeout(() => {
        require(["@components/customization/systemMonitoring/mapSvg"], resolve);
      }, 500);
    }),
    mapSvgShanxi: Vue.component("mapSvgShanxi", (resolve, reject) => {
      setTimeout(() => {
        require([
          "@components/customization/systemMonitoring/mapSvgShanxi",
        ], resolve);
      }, 1000);
    }),
  },
  data() {
    return {
      // 地图
      isDisable: [], //防止多次提交
      dashBoardVal: {
        one: [],
        two: [],
        three: [],
      }, //仪表盘
      topStatisticsl: {},
      Loading: false, //加载中子组件状态
      page: 1,
      size: 11,
      total: 0,
      query: {},
      search: "",
      classId: "",
      Headers: null,
      projectName: "",
      body: null,
      Maxlevel: null,
      Remark: null, //顶部统计数据
      Title: null,
      searchData: null,
      exportParam: null, //导出名字
    };
  },
  props: {
    config: Object,
  }, //["AgeAnalysis"],
  //监听属性 类似于data概念
  computed: {},
  //方法集合
  methods: {
    async GetList(query) {
      const dds = await this.getData(this.filterModelTitle.QxInflexion, null);
      return dds.data;
    },
    async getHead() {
      //   const resss = await api.GetAnalysisMain(this.setParam());
      const res = thead;
      this._getHead(res.Data);
    },
    async getBody() {
      const res = await api.GetXXXMainResult(this.setParam());
      this.body = this._getBody(res.Data[0].Bodys.Items);
      //   this._getMark(res.Data[0].Remark);
      this.getInfo(res.Data[0].Bodys.PageInfo);
    },
    getInfo(list) {
      this.total = list["TotalCount"];
      //   this.exportParam.fileName = `${this.Title}-${this.Remark}.xlsx`;
    },
    setParam() {
      const param = (this.exportParam = {
        year: this.query.year || this.query.Year || "all",
        paramInfo: this.search,
        PageSize: this.size,
        PageIndex: this.page,
        ApiName: "GetAnalysisBodys",
        fileName: "",
      });
      return param;
    },
    _condition(con) {
      //this.searchData
      const arr = [];
      con.map((c, index) => {
        const aa = {
          id: c["Id"],
          label: c["Name"],
          placeholder: c["Placeholder"],
          putModel: c["PutModel"],
          showModel: c["ShowModel"],
          type: c["Type"],
          _data: c["CondData"],
          children: [],
        };
        arr.push(aa);
        this._condition2(c["CondData"], aa["children"]);
      });
      this.searchData = arr;
    },
    _condition2(_data, item) {
      _data &&
        _data.map((cc) => {
          const v = cc.Value;
          const p =
            cc["Children"].length > 0
              ? {
                  id: v["Id"],
                  label: v["Name"],
                  _data: cc["Children"],
                  children: [],
                }
              : {
                  id: v["Id"],
                  label: v["Name"],
                  _data: cc["Children"],
                };
          item.push(p);
          if (p._data.length > 0) {
            this._condition2(p._data, p["children"]);
          }
        });
    },
    _getHead(head) {
      this.Headers = head.Headers;
      //   this.Maxlevel = head.Maxlevel + 1;
      //   this.Title = head.Title;
    },
    _getMark(Remark) {
      //顶部统计数据
      this.Remark = Remark;
    },
    _getBody(body) {
      const _body = [];
      //   const flat = this.Headers.flat().filter(v => {
      //     if (v.LeafCount === 1) {
      //       return v.ColumnName;
      //     }
      //   });
      const flat = [
        "DISTRICTNAME",
        "FIRSTDT",
        "CT",
        "SUC",
        "FAIL",
        "LASTDT",
        "STATUS",
        "ROWCOUNT",
        "REMARK",
      ];
      // 列表数据处理
      body.map((b, n) => {
        let arr = [];
        flat.map((f, index) => {
          arr[index] = {
            idd: b.DISTRICTID,
            data: b[f],
          };
        });
        _body.push(arr);
      });
      return _body;
    },
    async getData(apiId, param) {
      const dd = await api.ApiProxy("GetData", {
        apiId: apiId,
        param: param,
      });
      if (dd.data === null || dd.data === undefined) {
        this.$store.commit("update", {
          hint: 1,
          hintText: "接口配置错误或者返回值为空",
          time: 6000,
        });
      }
      return dd;
    },
    async refreshPanel() {
      const cpu = await this.getData(this.filterModelTitle.CpuInflexion, null);
      const nc = await this.getData(this.filterModelTitle.NcInflexion, null);
      const yp = await this.getData(this.filterModelTitle.YpInflexion, null);
      this.dashBoardVal.one =
        cpu.data &&
        cpu.data.map((item) => ({
          label: item.ProcessorCount,
          value: parseFloat(item.CpuLoad).toFixed(2),
          name: "Cpu使用率",
        }));
      this.dashBoardVal.two =
        nc.data &&
        nc.data.map((item) => ({
          label: item.PhysicalMemory,
          value: parseFloat(item.MemoryUsedRate).toFixed(2),
          name: "内存使用率",
        }));
      this.dashBoardVal.three =
        yp.data &&
        yp.data.map((item) => ({
          label: item.TotalSize,
          value: parseFloat(item.DiskPercent).toFixed(2),
          name: "硬盘使用率",
        }));
    },
    async initData() {
      const data = await this.GetList({ year: 2020 });
      if (!data) return;
      this.topStatisticsl = data && data[0];
      this.body = this._getBody(data[0].List);
      this.$store.commit("pathChart/setBody", data[0].List);

      await this.getHead();
      this.refreshPanel();
      setInterval(() => {
        this.refreshPanel();
      }, 30000);
      this.Loading = false;
    },
    async ManuallyRefresh(item, i, idd) {
      //手动同步
      //   console.log(item);
      //   console.log(i);
      //   console.log(idd);
      //   this.isDisable[i]=true
      if (this.isDisable[i] === true) {
        return false;
      } else {
        this.$set(this.isDisable, i, true);
        const data = await this.getData(
          this.filterModelTitle.ManualQxInflexion,
          {
            DistrictId: idd,
          }
        );
        this.$set(this.isDisable, i, false);
        const dd = data.data[0].Bodys;
        const aa = this._getBody(dd)[0];
        this.body[i] = aa;
        this.$set(this.body, i, aa);
        const newData = data.data[0].Bodys[0];
        // newData.REMARK = "测试错误测试错误测试错误测试错误";
        // newData.STATUS = "正常";
        this.$store.commit("pathChart/updatedBody", {
          data: newData,
          index: i,
        });
        const err = data.data[0].Err;
        let ww;
        // const reg = /\((.+?)\)/g;
        if (err) {
          ww = "同步失败";
        } else {
          ww = "同步成功";
        }
        this.$store.commit("update", {
          hint: 1,
          hintText: ww,
          time: 1500,
        });
      }

      // api
      //   .ApiProxy(
      //     "GetData",
      //     {
      //       apiId: this.filterModelTitle.ManualQxInflexion,
      //       param: { DistrictId: idd }
      //     }
      //   )
      //   .then(data => {

      //   });
    },
  },

  async created() {
    if (this.config && this.config.argument) {
      this.filterModelTitle = this.config.argument;
      this.initData();
    } else {
      if (this.$route.meta.isConfig) {
        this.isLayout = true;
      } else {
        this.isLayout = false;
      }
      await this.getSetting();
      if (this.isLayout) {
        this.filterEntityTitle = this.setFilterEntityAll();
        this.settingMk();
        // console.log(this.filterModelTitle);
      }
    }
  },

  async mounted() {
    if (this.$route.query) {
      this.query = this.$route.query;
    }
    // api.GetDistrictMonitorList().then(data => {
    //   //区县
    //   this.topStatisticsl = data.Data[0];
    //   this.body = this._getBody(data.Data[0].List);
    // });
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
@import "com/variable.scss";
@import "sys.scss";
@import "./MultiThead.scss";
.mapIndex {
  background: url(~assets/bgwangge.png);
  background-size: 90%;
  // background-position: 13px 201px;
}
.table-list {
  position: relative;
  z-index: 999;
}

// table.table {
//   table-layout: initial;
// }
</style>
