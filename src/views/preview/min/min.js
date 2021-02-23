/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-07-02 15:16:23
 * @LastEditors: joykit
 * @LastEditTime: 2020-07-03 15:40:09
 */
import * as types from "@store/mutation-types";
import Loading from "com/basics/Loading";
import drag from "./../../dragable/entity";
import { getOptions, getCardListResult, ratioChartList2, isPieDouble, isSysForms, isCardList, isChart, isPoorCountry, isFiche, isTimeLine, isTable } from './../../dragable/echartOption'
import { _data } from "@entity/card.js";
export const mixin = {
  data: function () {
    return {
      // 自定义搜索条件
      filterData: [],
      // 页面参数
      pageParam: null,
      refreshData: null,
      // 界面顶部搜索条件
      headerFilter: null,
      Loading: true
    };
  },
  components: {
    Loading
  },
  mounted() { },
  methods: {
    async initHeaderFilter() {
      const { id, headerApi, headerTitle, headerTitleAsync } = this.pageHeader;
      // 如果该头部有标题或者副标题，则不再处理头部过滤
      if (headerTitle || headerTitleAsync) return null;
      if (id && headerApi) {
        const api = await this.$store.dispatch(types.getDataByApi, {
          apiId: headerApi,
          param: { apiType: 'condition' }
        })

        const result = api[0].CondData.map(item => ({ id: item.Value.Id, label: item.Value.Name }))
        // console.log('header filter data:', result)
        this.headerFilter = { [id]: result[0].id }
        return {
          model: result[0].label,
          children: result,
        }
      } else {
        return null
      }
    },
    setParams() {
      const params = this.$route.query.param
      this.pageParam = params ? JSON.parse(params) : null;
    },
    getApiType(el) {
      if (isCardList(el)) return "cardList";
      else if (el.custom) return "made";
      else return "universal";
    },

    async render(data) {
      this.Loading = true;
      this.setParams();
      this.setHeaderTitle();
      this.pageHeader = { ...this.pageHeader, selectData: await this.initHeaderFilter() }
      if (!this.maxYear) {
        await this.$store.dispatch(types.getYears);
      }
      if (data && data.length > 0) {
        this.newData = [...data]
        // console.log('this.newdata header:', this.pageHeader)
        await this.setNewData(data);
        // this.recursive(data, data); 2020/07/22 暂时停用
      }
    },

    async setNewData(data) {
      // let result = [];
      // 设置头部标题
      await data.forEach((item, i) => {
        if (item.type === 'container') {
          item.els.forEach(async (component, n) => {
            if (isSysForms(component)) {
              this.filterData.push({ id: component.identity, contactIds: component.pageForms.contactIds })
            } else if (component.isNoPath || isPoorCountry(component)) {
              // this.newData[i].els[n].data = this.getCustomData(component);
            } else {
              const path = component.argument.path;
              const apiType = this.getApiType(component);
              const api = await this.$store.dispatch(types.getDataByApi, {
                apiId: path,
                // param: { ...this.pageParam, apiType }
                param: { ...this.pageParam, ...this.getTablePageInfo(component), ...this.headerFilter, year: this.selectedYear ? this.selectedYear : this.maxYear, apiType }
              });
              // isCardList(component) && console.log('api result:', api)
              this.newData[i].els[n].data = this.getResultData(api, component, component.custom, component.type);
              component.custom && console.log('custom:', this.newData[i].els[n], this.getResultData(api, component, component.custom, component.type))
              this.newData[i].els[n].selectData = this.componentSelect(api, component);
              isChart(component) && !component.custom && (this.newData[i].els[n].data.options = getOptions(component));

              // 设置页面下标题
              if (component.identity === this.pageHeader.headerSubTitle) {
                const { Remark } = this.newData[i].els[n].data.value
                this.pageHeader = { ...this.pageHeader, subTitle: Remark }
              }
            }
          })
        }
      })
      this.Loading = false;
      // this.newData = [...this.newData]
      // console.log('set new data:', this.newData)
    },

    // 组件自带过滤条件设置
    componentSelect(data, el) {
      const { selectLabel, selectValue } = el.pageForms;
      const { Items } = data
      if (selectLabel && selectValue) {
        this.onSelectChage({ ...Items[0], id: Items[0][selectValue] }, el)
        // console.log('component select:', Items[0][selectLabel])
        return {
          model: Items[0][selectLabel],
          options: Items.map((item) => ({
            ...item,
            id: item[selectValue],
            label: item[selectLabel],
          })),
        }
      }
    },

    getTablePageInfo(el) {
      if (isTable(el)) {
        const { isPaging, tablePageSize } = el.pageForms;
        if (!isPaging) {
          return { PageSize: tablePageSize || 10 }
        } else {
          return { PageSize: 100000 }
        }
      } else {
        return null
      }
    },
    setHeaderTitle() {
      const { headerTitleAsync, headerTitle } = this.pageHeader
      let str = ''

      if (headerTitleAsync) {
        const arr = headerTitleAsync.split('&');
        arr.forEach(item => {
          if (item === 'year') {
            str += this.selectedYear ? this.selectedYear : this.maxYear
            str += '年'
          } else {
            str += this.pageParam[item] || ''
          }
        })
        str += headerTitle
        this.pageHeader = { ...this.pageHeader, headerTitleResult: str }
      }
    },

    getResultData(api, component, custom, type) {
      console.log('getResultData:', type, custom)
      if (type === 'wssMaps:cq') {
        return {
          year: this.selectedYear
        }
        // console.log('aaaaaa:', api)
        // return {
        //   // ...api[0],
        //   shiGeoCoordMap: api.shiGeoCoordMap.map(
        //     item => ({
        //       ...item,
        //       name: item.SHORTNAME,
        //       value: [item.CITYX, item.CITYY, 100],
        //       person: item.RC,
        //       money: item.JE,
        //     })
        //   ),
        //   sumData: api[0].county[0], //.splice(0, 1)[0],
        //   county: api[0].county.splice(1, api[0].county.length - 1)
        // };
      } else if (ratioChartList2(component)) {
        return this.getRatioChartList2Data(component, api)
      } else if (type.indexOf('jkTable') >= 0) {
        return this.getTableData(api, component)
      } else if (type.includes('twoBarChart')) {
        const { MANS, NND, WOMANS } = api.Items[0]
        return {
          ...component.data,
          value: [MANS.split(','), WOMANS.split(',')],
          label: NND.split(',')
        }
      } else if (custom) {
        return {
          year: this.selectedYear
        }
      } else if (isCardList(component)) {
        return this.getCardData(api, component);
      } else if (isFiche(component)) {
        return this.getFicheData(api, component)
      } else if (isTimeLine(component)) {
        return this.getTimeLineData(api, component)
      } else {
        return this.getPublicData(api.Items, component)
      }
      // else if (isPieDouble(component)) {
      //   const { segmentation, lessThan } = component.pageForms
      //   return { ...this.getPublicData(api, component), config: { type: segmentation, value: lessThan } }
      // }
    },

    // getRatioChartList2Data
    getRatioChartList2Data(component, api) {
      return {
        value: [
          {
            name: "男女年龄段分析2",
            value: {
              percent: parseFloat(api.Items[0].RCBFB),
              sex: +api.Items[0].SEX,
              txt: api.Items[0].TXT
            },
            path: []
          },
          {
            name: "男女年龄段分析2",
            value: {
              percent: parseFloat(api.Items[1].RCBFB),
              sex: +api.Items[1].SEX,
              txt: api.Items[1].TXT
            },
            path: []
          }
        ]
      }
    },
    // timeLine数据处理
    getTimeLineData(api, component) {
      const { je, ym, rc } = component.pageForms;
      const data = api.Items//.slice(0, 20)
      return {
        value: data.map((item) => ({
          ...item,
          JE: item[je],
          RC: item[rc],
          YM: item[ym],
        })),
      }
    },
    // Fiche数据处理结果
    getFicheData(data, component) {
      const { titleName, amount, unit } = component.pageForms;
      return {
        titleName: data.Items[0][titleName] || "",
        amount: data.Items[0][amount] || "",
        unit: unit || "",
      };
    },
    // 卡片数据处理结果
    getCardData(data, component) {
      // console.log('card data:', component, data)
      // return component.data.cardList
      return { ...component.data, cardList: this.getCardListParam(component.data.cardList, data.Items[0]), value: getCardListResult(component.data.cardList, data.Items[0]) }
    },

    getCardListParam(cardList, data) {
      return cardList.map(item => {
        if (item.param && item.param.length) {
          const paramData = {};
          item.param.forEach(value => { paramData[value] = data[value] })
          return { ...item, paramData }
        } else {
          return item
        }
      })
    },

    // 表格数据处理结果
    getTableData(data, component) {
      // const Bodys = data;
      const { Items, PageInfo, Remark } = data
      // console.log('get table data:', Items, PageInfo)
      return { value: { ...component.data.value, Bodys: Items, PageInfo, Remark } }
    },
    // 普通接口处理结果
    getPublicData(data, component) {
      // console.log('get public data:', data)
      // 显示数据showData类型判断并转换
      const model = component.pageForms;
      const arr =
        typeof model.showData === "string" ? [model.showData] : model.showData;
      // // value设置
      const v = arr.length === 1 ? arr.map(item => [...data.map(d => d[item])])[0] : arr.map(item => [...data.map(d => d[item])]);
      // // label设置
      const l = arr.map(item => [
        ...data.map(d => d[model.showTitle])
      ])[0];

      // 模拟path设置
      const path = arr.map(() => '#');
      // // symbol 设置
      // this.els[pid - 1].els[cid - 1].data.symbol = arr
      const symbol = arr
        .map(item => component.argument.apiArgument.find(d => d.value === item))
        .map(item => item.label.split("#")[1]);

      let all = []
      if (arr.length === 1) {
        // this.els[pid - 1].els[cid - 1].data.value = v[0];
        all[0] = v.reduce(
          (prev, cur) => prev + cur,
          0
        );
      } else {
        all = v.map(item =>
          item.reduce((prev, cur) => prev + cur, 0)
        );
      }

      let config = {};
      if (component.type.includes("pieChart")) {
        const {
          radiusInterval,
          zoom,
          radiusWidth,
          segmentation,
          lessThan
        } = component.pageForms;
        const opt = {
          type: segmentation || "value",
          value: lessThan || 0,
          radiusWidth: radiusWidth || 25,
          radiusInterval: radiusInterval || 10,
        };
        config = !isPieDouble(component)
          ? opt
          : { ...opt, zoom: zoom || 80 };
      }

      // data中path 带加入
      const result = { symbol, all, value: v, label: l, path, config };
      if (component.type.indexOf("jkGraph") >= 0) {
        const choice = {
          showX: false,
          showY: false
        };
        return { ...result, choice }
      }
      return result
    },

    //递归
    recursive(data, source) {
      if (!data) return;
      data.map(async (item, index) => {
        if (!item.argument) return this.recursive(item.els, source); // 没有 item.argument 继续递归
        const path = item.argument.path; // api 路径
        // const api = await this.$store.dispatch(path); // 请求api
        const api = await this.$store.dispatch(types.getDataByApi, {
          apiId: path,
          param: { year: this.maxYear }
        });
        if (!api.Data) return; // api返回是否有数据

        // const result = this.$store.getters[path]; // 获取state数据
        // this.filter(result, item, source);
      });
    },
    // 过滤数据
    // filter(res, item, source) {
    //   this.$store.commit("SET_UI_DATA", {
    //     res,
    //     item,
    //     type: item.type
    //   });
    // }
  },
  watch: {}
};
