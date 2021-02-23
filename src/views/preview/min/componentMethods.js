import { isSysForms, getOptions } from './../../dragable/echartOption'
import { saveAs } from 'file-saver';
// import { Message } from "element-ui";
import * as types from "@store/mutation-types";
import apiMethods from "@api/api";
export const componentMethods = {
  data: () => ({
    currTableFilter: {}
  }),
  methods: {
    // 搜索条件取值
    onSearch(data, el) {
      const index = this.filterData.findIndex(item => item.id === el.identity);
      this.filterData[index].data = data;
      this.setFilterData(this.getFilterResult(data), el.pageForms.contactIds);
    },
    onHeaderFilterChange(model) {
      this.headerFilter = { [this.pageHeader.id]: model.id };
      this.setNewData(this.newData);
    },
    // 组件头部过滤，暂只支持cardList
    onSelectChage(model, component) {
      const { identity } = component;
      const { contactIds, selectValue, selectKey } = component.pageForms;
      this.newData.forEach((item, pi) => {
        if (item.type === 'container') {
          item.els.forEach(async (el, cid) => {
            // console.log('=============:', contactIds, el.identity);
            if (identity === el.identity) {
              this.newData[pi].els[cid].data = this.getCardData({ Items: [model] }, el)
            } else if (contactIds.some(id => id === el.identity)) {
              const api = await this.$store.dispatch(types.getDataByApi, {
                apiId: el.argument.path,
                param: { ...this.pageParam, year: this.selectedYear ? this.selectedYear : this.maxYear, [selectKey]: model.id }
              });
              this.newData[pi].els[cid].data = this.getResultData(api, el, el.custom, el.type)
            }
          })
        }
      })
    },
    onTable(PageInfo, el) {
      this.loading = true;
      // 表格的identity
      const { identity } = el
      // 查询过滤条件
      const filter = this.filterData.find(item => item.contactIds.some(id => id === identity))
      const paramInfo = filter ? this.getFilterResult(filter.data, filter.contactIds) : {};
      this.newData.forEach(async (item, pi) => {
        if (item.type === 'container') {
          const index = item.els.findIndex((el) => el.identity === identity);
          const { page, pageSize, total } = PageInfo;
          const pageInfo = { PageIndex: page, PageSize: pageSize, TotalCount: total }
          if (index >= 0) {
            const component = this.newData[pi].els[index];
            const api = await this.$store.dispatch(types.getDataByApi, {
              apiId: component.argument.path,
              param: { ...this.pageParam, year: this.selectedYear ? this.selectedYear : this.maxYear, ...pageInfo, paramInfo }
            });
            this.newData[pi].els[index].data = this.getResultData(api, component, component.custom, component.type)
          }
        }
      })
      this.loading = false;
    },
    getFilterResult(data) {
      if (!data) return;
      const result = {};
      data.forEach(item => {
        result[item.id] = item.putModel
      })
      return result
    },
    // 搜索条件处理
    async setFilterData(filterModel, ids) {
      // console.log('set filter data:', this.filterData)
      this.newData.forEach((item, pi) => {
        if (item.type === 'container') {
          item.els.forEach(async (el, ci) => {
            if (!isSysForms(el) && ids.some(item => item === el.identity)) {
              const path = el.argument.path;
              const api = await this.$store.dispatch(types.getDataByApi, {
                apiId: path,
                param: { ...this.pageParam, year: this.selectedYear ? this.selectedYear : this.maxYear, paramInfo: filterModel }
              });
              this.newData[pi].els[ci].data = this.getResultData(api, el, el.custom, el.type);
              this.newData[pi].els[ci].data.options = el.type.includes('jkGraph') && getOptions(el);
            }
          })
        }
      })
    },
    // 返回按钮处理
    goBack() {
      this.$router.go(-1);
    },

    // 导出按钮处理
    async exportData() {
      const result = []
      this.newData.forEach(item => {
        const data = item.els.find(el => this.pageHeader.exportData.some(id => id === el.identity))
        if (data) {
          result.push(data)
        }
      })
      const res = await apiMethods.publicApi(types.exportData, { reportDto: result.map(item => this.getExportTableData(item)) }, 'download')
      //////////////////////////////////////////////待修改///////////////////////////////////////////////////////
      saveAs(res, `导出文件.xls`)
    },
    // 处理单个表格导出信息
    getExportTableData(model) {
      return {
        method: model.argument.path,
        headers: model.data.value.Headers,
        param: {
          additionalProp1: {},
          additionalProp2: {},
          additionalProp3: {}
        },
        isMultiHeader: true,
        isAddSort: true,
        sheetName: model.modelName + model.identity
      }
    },
    clickCard(model) {
      // console.log('click card:', model)
      if (!model.path[0]) return;
      this.$router.push({
        name: "pageDetail",
        query: { id: model.path, param: JSON.stringify({ ...this.pageParam, ...model.paramData }) },
      });
    },
    /////////////////////////////////////////////// 定制组件 处理 ///////////////////////////////////////////
    // getCustomData(el) {
    //   if (el.type.includes('Earth2')) {
    //     return { value: this.getEarth2Result(el) }
    //   }
    // },
    // getEarth2Result(el) {
    //   const { pageForms } = el
    //   return el.configUrl.map(item => ({
    //     name: "pageDetail",
    //     query: { id: pageForms[item.value] },
    //   }))
    // }

    /////////////////////////////////////////////// 定制组件 处理 ///////////////////////////////////////////
  }
}
