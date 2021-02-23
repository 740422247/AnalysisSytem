<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-09 15:56:15
 * @LastEditors: wss
 * @LastEditTime: 2020-12-17 09:30:30
-->
<!--  -->
<template>
  <div class>
    <qxMapTest></qxMapTest>
    <moreTable style="height:600px;"></moreTable>
    <!-- :mapData="mapData"  -->
    <!-- <cqindex
      :mapData="{
        name: 'wssMap:cq',
        isHandle: false,
        className: ['jk-col-24', 'handle'], // 类名
        style: {
          width: '1000px'
        }, // 样式

        pageForm: {
          map: 'fdsafdasfda',
          bottom: 'fdsafdas'
        },
        configUrl: [
          {
            name: '地图部分',
            value: 'map'
          },
          {
            name: '底部统计',
            value: 'bottom'
          }
        ], // 顶部跳转按钮
        border: true, // 显示组件边框
        grid: true, // 显示背景网格
        data: null
      }"
      style="margin-bottom:100px"
    ></cqindex> -->
    <!-- <Filters
      v-if="false"
      :filter-entity="filterEntity"
      @change="searchFilter"
      :border="true"
      :filterModel="filterModel"
    ></Filters>
    <h1>组件sdsadasdd览</h1> -->
    <!-- <div class="qxph">
      <jkGraph
        :type="'radarChart'"
        :config="{
          text: '雷达图',
          grid: false,
          path: '/ProjectOnline1?type=GetQxList&enters=xm',
        }"
      />
    </div> -->
    <!-- <div class="qxph" v-if="true">
      <jkGraph
        :type="'dashBoard'"
        :config="{
          text: '补贴人数',
          grid: false
        }"
      />
    </div>
    <div class="qxph" v-if="true">
      <jkGraph
        :type="'ratioChart'"
        :config="{
          text: '比例图',
          grid: false
        }"
      />
    </div>
    <div class="qxph" v-if="true">
      <jkGraph
        :type="'lineChartAndbarChart'"
        :config="{
          argument: {
            isRadio: false,
            path: 'Getskfx',
            arguments: ['NAME', 'RC', 'RS', 'JE'],
            moduleName: '按月统计&barChart',
            apiArgument: [
              { value: 'NAME', label: '月份' },
              { value: 'RC', label: '人次#人次' },
              { value: 'RS', label: '人数#人' },
              { value: 'JE', label: '金额#万元' }
            ]
          },
          pageForms: {
            height: '300px',
            cWidth: 'jk-col-24',
            showType: 'pileBar',
            title: '按月统计&barChart',
            showTitle: 'NAME',
            showData: ['JE', 'RS', 'RC'],
            value: ['JE', 'RS', 'RC'],
            label: 'NAME',
            cHeight: '500'
          }
        }"
      />
    </div>
    <div class="qxph" v-if="true">
      <jkGraph
        :type="'pieChart'"
        :style="'width:500px'"
        :config="{
          text: '补贴人数',
          grid: false,
          data: {
            value: [[83470, 13100, 49241, 28351, 26265]],
            label: ['赵大', '孙二', '张三', '李四', '王五']
          },
          path: '/ProjectOnline1?type=GetQxList&enters=xm'
        }"
      />
      <jkGraph
        :type="'pieChart'"
        :style="'width:400px'"
        :config="{
          text: '补贴人数',
          grid: false,
          path: '/ProjectOnline1?type=GetQxList&enters=xm',
          data: {
            symbol: [],
            value: [
              // [83470, 13100, 49241, 28351, 26265],
              // [13256, 9888, 234456, 68351, 26265],
              [13256, 9888, 234456, 68351, 26265],
              [13256, 9888, 234456, 68351, 26265],
              [13256, 9888, 234456, 68351, 26265]
            ],
            label: ['赵大', '孙二', '张三', '李四', '王五'],
            config: {
              //ratio: 90, //圆占短边百分比,防止放大超出,默认80,可选项
              radiusWidth: 20, //单个圆环占比,
              radiusInterval: 10 //占比算在圆环以内
            }
          },
          options: {
            series: []
          }
        }"
      />
    </div> -->
    <div class="qxph" v-if="true">
      <!-- 类型实例
        type: 'value',
        value: 15
        type: 'percentage',
        value: 5 //百分比
               -->
      <!-- <jkGraph
        :type="'pieChartDouble'"
        :config="{
          text: '复合饼图',
          grid: false,
          data: {
            value: [[1000, 180, 910, 610, 118, 113, 911]],
            label: ['赵大', '孙二', '张三', '李四', '王五', '况六', '胡七'],
            config: {
              radiusWidth: 100, //单个圆环占比,
              radiusInterval: 10, //占比算在圆环以内
              type: 'percentage',
              value: 20, //百分比,
              zoom: 80 //小圆占大圆百分比
            }
          },
          path: '/ProjectOnline1?type=GetQxList&enters=xm'
        }"
      /> -->
    </div>
    <!-- 散点图 -->
    <!-- <div class="qxph">
      <jkGraph
        :type="'scatterChart'"
        :style="'width:400px'"
        :config="{
          text: '补贴人数111',
          grid: false,
          path: '/ProjectOnline1?type=GetQxList&enters=xm'
        }"
      />
    </div> -->
    <!-- <div class="qxph" v-if="true">
      <jkGraph
        :type="'barChart'"
        :style="'width:400px'"
        :config="{
          argument: {
            isRadio: false,
            path: 'Getskfx',
            arguments: ['NAME', 'RC', 'RS', 'JE'],
            moduleName: '按月统计&barChart',
            apiArgument: [
              { value: 'NAME', label: '月份' },
              { value: 'RC', label: '人次#人次' },
              { value: 'RS', label: '人数#人' },
              { value: 'JE', label: '金额#万元' }
            ]
          },
          pageForms: {
            height: '300px',
            cWidth: 'jk-col-24',
            showType: 'pileBar',
            title: '按月统计&barChart',
            showTitle: 'NAME',
            showData: ['JE', 'RS', 'RC'],
            value: ['JE', 'RS', 'RC'],
            label: 'NAME',
            cHeight: '500'
          }
        }"
      />
    </div>

    <div class="qxph" v-if="true">
      <jkGraph
        :type="'lineChart'"
        :style="'width:400px'"
        :config="{
          text: '折线图',
          argument: {
            isRadio: false,
            path: 'Getskfx',
            arguments: ['NAME', 'RC', 'RS', 'JE'],
            moduleName: '按月统计&barChart',
            apiArgument: [
              { value: 'NAME', label: '月份' },
              { value: 'RC', label: '人次#人次' },
              { value: 'RS', label: '人数#人' },
              { value: 'JE', label: '金额#万元' }
            ]
          },
          pageForms: {
            height: '300px',
            cWidth: 'jk-col-24',
            showType: 'pileBar',
            title: '按月统计&barChart',
            showTitle: 'NAME',
            showData: ['JE', 'RS', 'RC'],
            value: ['JE', 'RS', 'RC'],
            label: 'NAME',
            cHeight: '500'
          }
        }"
      />
    </div>
    <searchAll></searchAll>
    <div class="btn">
      <Button type="primary" icon="el-icon-check" @click="refresh()"
        >更新配置项</Button
      >
    </div>
    <test></test>
    <tableTest></tableTest>
    <login :loginJson="loginJson"></login>
    <tableList isRefresh :tables.sync="tables"></tableList>
    <searchFrame @searchFrame="searchFrame" :filter="searchData" /> -->
  </div>
</template>

<script>
import { Button } from "element-ui";
import { mapData } from "@jsonJs/cqMap.js";
import jkGraph from "@components/chart/jkGraph";
import { loginJson } from "@jsonJs/loginJson.js";
import { tablesJson } from "@jsonJs/tables.js";
import { searchFrameJson } from "@jsonJs/searchFrame.js";
import cqindex from "@components/customization/maps/cqMap/cqindex";
import tableList from "@components/basics/table/tableList";
import moreTable from "@components/basics/moreTable/moreTable.vue";
import test from "@components/Admin/com/test.vue";
import tableTest from "@components/Admin/com/tableTest.vue";
import login from "@components/Login/Login";
import searchAll from "@components/customization/searchAll/searchAll.vue";
import qxMapTest from "@views/debugList/qxMapTest.vue";
const Filters = () => import("@components/Admin/filterEntity.vue");
const searchFrame = () => import("@components/searchFrame/searchFrame.vue");

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    qxMapTest,
    cqindex,
    tableList,
    login,
    test,
    Filters,
    tableTest,
    moreTable,
    jkGraph,
    searchAll,
    searchFrame
  },
  data() {
    //这里存放数据
    return {
      searchData: null,
      filterEntity: [],
      filterModel: {},
      tables: tablesJson,
      loginJson: loginJson,
      lineChartJson: {
        text: "补贴人数",
        grid: false,
        path: "/ProjectOnline1?type=GetQxList&enters=xm"
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    searchFrame(filter) {
      console.log(filter);
      this.search = filter;
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
          children: []
        };
        arr.push(aa);
        // console.log(c);
        // console.log(aa);
        this._condition2(c["CondData"], aa["children"]);
      });
      this.searchData = arr;
    },
    _condition2(_data, item) {
      _data &&
        _data.map(cc => {
          const v = cc.Value;
          const p =
            cc["Children"].length > 0
              ? {
                  id: v["Id"],
                  label: v["Name"],
                  _data: cc["Children"],
                  children: []
                }
              : {
                  id: v["Id"],
                  label: v["Name"],
                  _data: cc["Children"]
                };
          item.push(p);
          if (p._data.length > 0) {
            this._condition2(p._data, p["children"]);
          }
        });
    },
    refresh() {
      // this.lineChartJson = 541453;
      this.$set(this.lineChartJson, "options", {
        series: [
          {
            symbolSize: 10, //拐点大小
            symbol: "triangle", //拐点图像
            smooth: false, //平滑区县
            showSymbol: false, //默认显示拐点
            lineStyle: {
              type: "dashed" //'solid','dashed','dotted'
            }
          },
          { symbolSize: 20 }
        ]
      });
      // console.log(this.lineChartJson);
      // this.lineChartJson.data = {
      //   options: { series: [{ symbolSize: 10 }] }
      // };
      // this.config.options = { test: 54 };
    },
    searchFilter(filterModel) {
      // this.loadingLeft = true;
      // setTimeout(() => {
      //   this.getFilterByQueryStringFn(filterModel.query);
      //   this.loadingLeft = false;
      // }, 200);
    },
    setFilterEntity() {
      return [
        {
          label: "用户头像",
          key: "avatar",
          type: "uploader",
          autoUpload: false, //取消选中自动上传,转base64返回
          sum: 3, //能选中的张数
          rules: [
            {
              validator: (rule, value, callback) => {
                return new Promise((resolve, reject) => {
                  if (value && value.length > 0) {
                    resolve();
                  } else {
                    reject(new Error());
                  }
                });
              },
              message: "请选择头像",
              required: true,
              trigger: "change",
              type: "array"
            }
          ]
        },
        {
          label: "按输入字符查询",
          key: "query",
          type: "string",
          className: "is-2",
          placeholder: "登录名/昵称/编码"
        }
      ];
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.mapData = mapData;
    this.filterEntity = this.setFilterEntity();
    // this.loginJson = loginJson;
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(searchFrameJson.Conditions);
    this._condition(searchFrameJson.Conditions);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
.qxph {
  width: 100%;
  height: 400px;
  margin-bottom: 5px;
  background-color: #110e4f;
  > * {
    display: inline-block;
  }
}
.btn {
  margin-top: 10px;
  color: #000;
  button {
    color: #000;
  }
}
//@import url(); 引入公共css类
</style>
