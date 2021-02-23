<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-06 15:24:27
 * @LastEditors: wss
 * @LastEditTime: 2021-01-07 16:39:50
-->
<template>
  <div class="rank-view">
    <!-- <div>进入</div> -->
    <component v-if="isApply" :is="comName" :mapData="configData"></component>
    <!-- <cqindex v-if="type == 'cq'" :mapData="configData" /> -->
  </div>
</template>

<script>
import api from "@api/api.js";
import { mapData } from "@jsonJs/cqMap.js";
import cqindex from "./cqMap/cqindex.vue";
import countys from "./cqMap/countys/";
export default {
  name: "index",
  data() {
    return {
      isApply: false,
      // comName: "", //加载组件名
      configData: null
    };
  },
  components: {
    cqindex,
    countys
  },
  props: {
    type: {
      type: String,
      default: "singleRank"
    },
    config: {
      type: Object,
      default: () => ({
        border: true,
        grid: true,
        text: "",
        path: "",
        data: null,
        max: 0
      })
    }
  },
  async created() {
    // this.$store.commit("previewList/setTopUrl", 21);
    // this.configData && (this.configData = this.config);
    // console.log(this.config);
    let op;
    if (this.$route.query.param) {
      op = JSON.parse(this.$route.query.param);
    } else {
      op = { districtid: 500229 };
    }
    // console.log(this.config);
    if (this.config.argument.path) {
      // console.log("执行接口请求");
      //小模块单独处理
      // const districtid = 500229; //模拟ID.带删除
      const ddr = this.config.type.split(":")[1];
      if (ddr === "cqCounty") {
        // console.log("区县");
        const dd = await this.getData(this.config.argument.path, op);
        this.configData = this.config;
        this.configData.data = dd.data;
        this.configData.districtid = op.districtid;
      } else {
        const dd = await this.getData(this.config.argument.path, null);
        this.configData = this.config;
        this.configData.data = {
          county: dd.data[0].county.Items.map(item => ({
            ...item,
            title: item.NAME,
            prople: item.PERSON,
            money: item.MONEY,
            PROJECTS: item.PROJECTS,
            CODE: item.CODE,
            PERSONTIME: item.PERSONTIME,
            ISENABLE: item.ISENABLE
          })),
          shiGeoCoordMap: dd.data[0].shiGeoCoordMap.Items
        };
      }

      this.isApply = true;
      // .map(item => ({
      //   title: item.NAME,
      //   prople: item.PERSON,
      //   money: item.MONEY,
      //   PROJECTS: item.PROJECTS,
      //   CODE: item.CODE,
      //   PERSONTIME: item.PERSONTIME,
      //   ISENABLE: item.ISENABLE
      // }));
    } else {
      this.configData = mapData;
      this.isApply = true;
      // console.log(this.configData, "不执行接口采用静态数据");
    }
  },
  methods: {
    async getData(apiId, param) {
      if (param) {
        param.year = this.$store.getters.getMaxYear;
      } else {
        param = { year: this.$store.getters.getMaxYear };
      }
      const dd = await api.ApiProxy("GetData", {
        apiId: apiId,
        param: param
      });
      if (dd.data === null || dd.data === undefined) {
        this.$store.commit("update", {
          hint: 1,
          hintText: "接口配置错误或者返回值为空",
          time: 6000
        });
      }
      // console.log("dd:", dd);
      return dd;
    }
  },
  computed: {
    comName() {
      switch (this.type) {
        case "cq": //重庆
          return "cqindex";
        case "cqCounty": //重庆区县
          return "countys";
        default:
          return "cqindex";
      }
    }
  },
  //监控data中的数据变化
  // 2020/07/23 修改
  watch: {
    config: {
      deep: true,
      immediate: true,
      handler(res) {
        this.configData = res;
        // this.configData.data.shiGeoCoordMap = this.configData.data.shiGeoCoordMap.map(
        //   item => ({
        //     name: item.SHORTNAME,
        //     value: [item.CITYX, item.CITYY, 100],
        //     person: item.RC,
        //     money: item.JE,
        //     ...item
        //   })
        // );
        // this.configData.data.county = this.configData.data.county.map(item => ({
        //   title: item.NAME,
        //   prople: item.PERSON,
        //   money: item.MONEY,
        //   PROJECTS: item.PROJECTS,
        //   CODE: item.CODE,
        //   PERSONTIME: item.PERSONTIME,
        //   ISENABLE: item.ISENABLE
        // }));
      }
    }
  }
  // 2020/07/23 修改
};
</script>
<style lang="scss" scoped>
.rank-view {
  width: 100%;
  height: 100%;
}
</style>
