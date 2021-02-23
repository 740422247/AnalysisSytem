<template>
  <div class="drag-page" :class="{ preview: isPreview }">
    <table-form
      :tableDialog="tableDialog"
      @close="closeTableForm"
      @save="saveHeader"
      :state="state"
      :el="selectEl"
    ></table-form>

    <set-sys-forms
      :sysFormsDialog="sysFormsDialog"
      @close="closeSysForms"
      @save="saveForms"
      :el="selectEl"
    ></set-sys-forms>

    <card-list
      :cardListDialog="cardListDialog"
      :state="cardState"
      :cards="cards"
      @close="closeCardList"
      @save="saveCardList"
    ></card-list>

    <div class="drag-page-header">
      <!-- <Button @click="preview" icon="el-icon-search">预览</Button> -->
      <Button @click="save" icon="el-icon-check">保存</Button>
      <Button @click="goBack" icon="el-icon-back">返回</Button>
    </div>
    <div class="drag-container">
      <drag-menu
        :menu="menu"
        @onAdd="addContainer"
        @startClone="startClone"
        @showHeader="showPageHeader = true"
      ></drag-menu>
      <div class="drag-content bar">
        <child-header
          @deleteHeader="showPageHeader = false"
          @setHeader="setHeader"
          v-if="showPageHeader"
          :entity="pageHeader"
          isShowTool
        ></child-header>
        <drag-content
          :parentWidth="parentWidth"
          :els="els"
          @containerSet="containerSet"
          @componentSet="componentSet"
          @startMove="startMove"
          @onChange="componentChange"
          @containerDelete="containerDelete"
          @componentDelete="componentDelete"
        ></drag-content>
      </div>

      <div class="tools-container" :class="toolClass">
        <div class="tools-header">
          <span class="drag-tool-title">{{ toolModel.title }}</span>
          <span class="close" @click="toolClass = []">收起</span>
        </div>
        <div class="tools-body">
          <drag-tools
            class="bar"
            @change="changeForm"
            @btnClick="btnClick"
            :entity="toolEntity"
            :model="toolModel"
            ref="result"
          ></drag-tools>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { headerActions } from "./headerActions";
import { mapGetters } from "vuex";
import drag from "./entity.js";
import DragMenu from "./../../components/draggable/DragMenu";
import TableForm from "./DragableTools/TableForm";
import CardList from "./DragableTools/CardList";
import SetSysForms from "./DragableTools/SysForms";
import ChildHeader from "./../../components/draggable/ChildHeader";
import DragContent from "./../../components/draggable/DragContent";
import DragTools from "./../../components/draggable/DragTools";
import { Icon, Button, MessageBox, Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import api from "@api/api";
import * as types from "@store/mutation-types";
import { _data } from "@entity/card.js";
import { tableHeaderFormat } from "./DragableTools/tableHeaderFormat";
import { sysFormsFormat } from "./DragableTools/sysFormsFormat";
import { cardListFormat } from "./DragableTools/cardListFormat";
import { setPageHeader } from "./DragableTools/setPageHeader";
import {
  getOptions,
  isScatter,
  isPieDouble,
  isPie,
  isSysForms,
  isTable,
  isCardList,
  isChart,
  isTimeLine,
  isFiche,
} from "./echartOption";
import sysForms from "./DragableTools/formsConfig";

export default {
  name: "DragHome",
  mixins: [tableHeaderFormat, sysFormsFormat, cardListFormat, setPageHeader],
  components: {
    DragMenu,
    DragContent,
    DragTools,
    Button,
    ChildHeader,
    TableForm,
    SetSysForms,
    CardList,
  },
  computed: {
    ...mapGetters({
      pageData: "pageDetail",
      pageList: [types.getPageList],
      maxYear: "getMaxYear",
    }),
  },
  data: () => ({
    identity: 1,
    tableHeader: null,
    pageId: undefined,
    pageName: undefined,
    parentWidth: 0,
    isPreview: false,
    selectEl: {},
    currData: [],
    menu: [],
    els: [],
    toolEntity: [],
    toolModel: { avatar: [] },
    toolClass: [],
    // 页面header设置
    pageHeader: {
      headerTitle: undefined,
      headerActive: false,
      headerSubTitle: undefined,
      headerActions: [],
    },
    showPageHeader: false,
    // 页面header设置
    state: {
      headerTotal: [],
      oldArgument: [],
      apiArgument: [],
      subTitle: [],
      routers: [
        { label: "页面1", value: "jurisdiction/user" },
        { label: "页面2", value: "jurisdiction/role" },
      ],
    },
  }),
  // watch: {
  //   els() {}
  // },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.pageId = this.getRouteId();
      this.initMenu();
      this.initPageList();
      // this.initPageDetail();
      this.setPageInfo();
    },

    async initPageList() {
      this.pageList = this.pageList.length
        ? this.pageList
        : await this.$store.dispatch(types.getPageList);
      this.state.routers = this.pageList.map((item) => ({
        label: item.moduleName,
        value: item.moduleId,
      }));
    },

    getRouteId() {
      return this.$route.query.id;
    },

    setPageInfo() {
      // 2020-12-24 删除
      // this.initPageDetail();
      this.pageId ? this.initPageDetail() : this.initEls();
    },

    async initPageDetail() {
      const result = await this.$store.dispatch(types.getPage, {
        id: this.pageId,
      });
      this.pageName = result.data.moduleName;
      const { els, showPageHeader, pageHeader, identity } = JSON.parse(
        result.data.content
      );
      // 2020-12-24 删除
      // const { els, showPageHeader, pageHeader, identity } = JSON.parse(
      //   localStorage.getItem("test")
      // );

      els.forEach((item, i) => {
        item.els.forEach((el, n) => {
          el.type.includes("jkGraph") &&
            !el.custom &&
            (els[i].els[n].data.options = getOptions(el));
        });
      });

      this.els = els;

      this.identity = identity;
      this.showPageHeader = showPageHeader;
      this.pageHeader = {
        ...pageHeader,
        // headerActions: pageHeader.headerActions.map(item => item.value),
      };
    },

    async initMenu() {
      const result = await this.$store.dispatch(types.getModules);
      this.menu = result.data.map((item) => ({
        ...JSON.parse(item.content),
        selectData: null,
        border: false,
        grid: false,
        modelId: item.modelId,
        modelType: item.modelType,
        modelName: item.modelName,
      }));
      // .filter((item) => !item.type.includes("Table"));
      this.menu.unshift(sysForms);
      // console.log("menu:", this.menu);
    },
    initEls() {
      this.pageName = this.$route.query.pageName;
      this.parentWidth = document.querySelector(".drag-content").clientWidth;
      const clientWidth = window.innerWidth;
      this.els = this.els.length
        ? this.els
        : [
            {
              name: "容器组件",
              type: "container",
              grid: false,
              border: false,
              id: 10,
              els: [],
              className: ["jk-col-8"],
              style: {},
            },
          ];
    },

    // 添加容器
    addContainer() {
      this.els.push({
        name: "容器组件" + this.els.length,
        type: "container",
        grid: false,
        border: false,
        id: 10 + this.els.length,
        els: [],
        isActive: false,
        className: ["jk-col-8"],
        style: {},
      });
    },

    // 设置页面头部
    setHeader() {
      this.clearClass();
      this.initSys();
      this.pageHeader = { ...this.pageHeader, headerActive: true }; // 页面头部活动状态取消
      this.setPageComponents();
      this.setHeaderModel();
      this.selectEl = null;
      this.pullTool();
    },
    setPageComponents() {
      const result = [];
      this.els.forEach((item) =>
        item.els.forEach((el) =>
          result.push({ label: el.modelName, value: el.identity })
        )
      );
      this.state.headerTotal = result;
      this.toolEntity = drag.getHeaderToolEntity(this.state);
      return true;
    },
    // 设置页面头部entity
    ///////////////////////////////// 2020-11-19  弃用
    setHeaderEntity() {
      const result = [];
      this.els.forEach((item) =>
        item.els.forEach((el) =>
          result.push({ label: el.modelName, value: el.modelId })
        )
      );
      this.state.headerTotal = result;
      this.toolEntity = drag.getHeaderToolEntity(this.state);
      return true;
    },
    ///////////////////////////////// 2020-11-19  弃用
    // 设置页面头部model
    setHeaderModel() {
      this.toolModel = { ...this.pageHeader, title: "头部设置" };
    },

    // 返回
    goBack() {
      MessageBox.confirm("您的修改尚未保存, 是否继续返回?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$router.go(-1);
      });
    },
    // 保存
    save() {
      this.clearClass();

      let flag = true;
      let modulesInfo = [];

      if (this.showPageHeader) {
        // 标题设置验证
        // if (!this.pageHeader.headerTitle) {
        //   this.setHeader(true);
        //   this.$refs.result.doRules();
        //   flag = false;
        //   return;
        // }
        if (!this.pageHeader.headerActions.length) {
          this.setHeader(true);
          this.$refs.result.doRules();
          flag = false;
          return;
        }
      }
      this.els.some((item, pi) => {
        const res = item.els.find((component, ci) => {
          if (component.custom) {
            console.warn("定制组件无需设置");
            return component;
          } else if (isSysForms(component)) {
            console.warn("自定义表单，无需验证");
            return component;
          } else {
            if (
              component.type.includes("jkTable") &&
              !component.data &&
              !component.data.value.Headers
            ) {
              this.componentSet(component, ci, pi);
              this.$refs.result.doRules();
              flag = false;
              return component;
            } else if (
              !component.pageForms &&
              !(component.type.includes("jkTable") || isCardList(component))
            ) {
              this.componentSet(component, ci, pi);
              this.$refs.result.doRules();
              flag = false;
              return component;
            }

            const showTitle =
              component.pageForms && component.pageForms.showTitle
                ? component.pageForms.showTitle
                : "";
            const showData =
              component.pageForms && component.pageForms.showData
                ? component.pageForms.showData
                : [];
            if (
              !showTitle &&
              !(
                isCardList(component) ||
                isFiche(component) ||
                isScatter(component) ||
                component.type.includes("jkTable") ||
                isTimeLine(component)
              )
            ) {
              this.componentSet(component, ci, pi);
              this.$refs.result.doRules();
              flag = false;
              return component;
            }

            if (
              !showData.length &&
              !(
                component.type.includes("jkTable") ||
                isFiche(component) ||
                component.type.includes("jkCard") ||
                isTimeLine(component)
              )
            ) {
              this.componentSet(component, ci, pi);
              this.$refs.result.doRules();
              flag = false;
              return component;
            }

            if (isScatter(component)) {
              const x = component.pageForms.XData;
              const y = component.pageForms.YData;
              if (!(x && y)) {
                this.componentSet(component, ci, pi);
                this.$refs.result.doRules();
                flag = false;
                return component;
              }
            }
          }
        });

        if (res) {
          return true;
        }
      });
      this.els.forEach((item) => {
        item.els.forEach((component) => {
          modulesInfo.push({
            modelId: component.modelId,
            modelType: component.modelType,
            modelName: component.modelName,
          });
        });
      });
      // console.log('save:', this.els)
      // return;
      if (!modulesInfo.length) {
        Message({
          message: "还没有添加相应模块，无法保存页面",
          type: "warning",
        });
        flag = false;
        return;
      }
      if (!flag) return;
      !this.pageId
        ? this.setPageTitle(modulesInfo)
        : this.savePageDetail(modulesInfo, types.updatePage);
    },

    setPageTitle(modulesInfo) {
      // MessageBox.prompt("请输入页面标题", undefined, {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      // }).then(({ value }) => {
      //   this.pageName = value;
      this.savePageDetail(modulesInfo, types.addPage);
      // });
    },

    savePageDetail(modulesInfo, url) {
      const { headerActive, ...rest } = this.pageHeader;
      // this.els[1].els[0].pageForms = 'cOXFY8lWlUCE2hCMdDu5NA'
      // cOXFY8lWlUCE2hCMdDu5NA
      const moduleDto = {
        moduleId: this.pageId,
        moduleName: this.pageName,
        content: JSON.stringify({
          els: this.els,
          pageHeader: rest,
          showPageHeader: this.showPageHeader,
          identity: this.identity,
        }),
      };
      const moduleDetail = modulesInfo;
      api.publicApi(url, { moduleDto, moduleDetail }, "post").then((res) => {
        if (res.code === 1) {
          Message({ message: "保存成功", type: "success" });
          this.$router.go(-1);
        } else {
          Message({ message: res.errMsg, type: "error" });
        }
      });
    },
    // 预览
    preview() {
      const { headerActive, ...rest } = this.pageHeader;

      this.$store.dispatch("savePreview", {
        pageData: this.els,
      });
      const routeData = this.$router.resolve({
        name: "Preview",
      });
      window.pageDetail = {
        pageData: this.els,
        pageHeader: rest,
        showPageHeader: this.showPageHeader,
      };
      window.open(routeData.href, "_blank");
    },

    // 获取toolModel
    setToolModel() {
      // 初始化编辑表单
      const isPie = this.selectEl.type.includes("pieChart"); // 可引入echartOption.js isPie 进行判断
      // if (isSysForms(this.selectEl)) {
      //   this.toolModel.title = "过滤条件";
      //   this.toolModel = this.selectEl.pageForms;
      //   return;
      // }
      this.toolModel = {
        ...this.selectEl.style,
        cWidth: this.selectEl.className.find(
          (item) => item.indexOf("jk-col-") >= 0
        ),
        showType: "commonBar",
        showX: isPie ? false : true,
        showY: isPie ? false : true,

        ...this.getToolModel(),
        // cHeight: parseInt(this.selectEl.style.height),
        title: this.selectEl.text,
      };
      if (this.selectEl.type === "container") {
        this.toolModel.title = "容器";
      } else if (isTable(this.selectEl)) {
        this.setTableHeader();
      } else if (isSysForms(this.selectEl)) {
        this.toolModel = { ...this.selectEl.pageForms };
      }
      // else if (this.selectEl.type.includes("jkCard")) {
      //   this.toolModel.cType = this.selectEl.type;
      // }
    },
    // 获取动态表单
    getToolModel() {
      // if (this.selectEl.type === "container") {
      //   return [];
      // } else {
      return this.selectEl.pageForms;
      // }
    },

    startClone(index) {
      const data = drag.clone(this.menu[index]);
      this.clearClass();
      this.menu[index] = { ...data };
    },
    ////////////////////////////////////////////////////////中间容器///////////////////////////
    // 清除原有class
    clearClass() {
      if (!this.selectEl || !this.selectEl.parentId) {
        this.pageHeader = { ...this.pageHeader, headerActive: false }; // 页面头部活动状态取消
      } else {
        const pid = this.selectEl.parentId;
        const cid = this.selectEl.childId;
        if (cid) {
          this.els[pid - 1].els[cid - 1].className = this.els[pid - 1].els[
            cid - 1
          ].className.filter((item) => item !== "active");
        } else {
          this.els[pid - 1].className = this.els[pid - 1].className = this.els[
            pid - 1
          ].className = this.els[pid - 1].className.filter(
            (item) => item !== "active"
          );
        }
      }
    },

    // 拖动
    startMove() {
      this.clearClass();
      this.selectEl = {};
    },
    // 组件变化
    componentChange() {
      let flag = false;
      this.els = this.els.map((item) => ({
        ...item,
        els: item.els.map((el) => {
          if (!el.identity) {
            flag = true;
            return { ...el, identity: this.identity };
          } else {
            return el;
          }
        }),
      }));
      flag && this.identity++;
    },

    // 拉取工具
    pullTool() {
      this.toolClass.push("active");
    },

    getApiType(el) {
      if (isCardList(el)) return "cardList";
      else if (el.custom) return "made";
      else return "universal";
    },
    // 获取接口
    async getDataByApi(model) {
      // 定制组件无需处理任何请求
      // if (this.selectEl.custom || isSysForms(this.selectEl)) return;
      if (this.selectEl.custom) return;

      // 获取最大年份
      if (!this.maxYear) {
        await this.$store.dispatch(types.getYears);
      }

      const apiType = this.getApiType(this.selectEl);
      // 获取正式数据
      const api = await this.$store.dispatch(types.getDataByApi, {
        apiId: model.path,
        param: {
          year: this.maxYear,
          apiType,
        },
      });
      const flat = this.selectEl.custom;
      const moduleType = this.selectEl.type;
      if (flat) {
        this.currData = this.getCustomData(api[0], moduleType);
      } else if (apiType === "cardList") {
        this.currData = api.Items;
      } else if (isTable(this.selectEl)) {
        this.currData = api;
      } else {
        this.currData = api.Items;
      }
      // 2020-12-18  弃用
      // this.currData = flat
      //   ? this.getCustomData(api[0], moduleType)
      //   : apiType === "cardList"
      //   ? api.Items
      //   : api.Items;
      // 2020-12-18  弃用
    },
    // 获取定制组件数据  (数据交互暂不做处理)
    getCustomData(api, moduleType) {
      if (moduleType === "wssMaps:cq") {
        return {
          ...api,
          sumData: api.county[0],
          county: api.county.splice(1, api.county.length - 1),
        };
      } else {
        return api;
      }
    },
    // 修改toolEntity
    editToolEntity(model) {
      let setData = [];
      let setSubTitle = [];
      model.apiArgument.forEach((item) => {
        if (item.label.indexOf("#") >= 0) {
          setData.push({ ...item, label: item.label.split("#")[0] });
          this.state.oldArgument.push(item);
        } else {
          setSubTitle.push(item);
        }
      });

      // this.state.routers = this.pageList.map((item) => ({
      //   label: item.moduleName,
      //   value: item.moduleId,
      // }));
      this.state.apiArgument = setData;
      this.state.subTitle = setSubTitle;

      this.toolEntity = drag.getToolEntity(
        "ddd",
        this.state,
        model.isRadio,
        model.configUrl,
        this.selectEl
      );
    },

    // 设置
    containerSet(model, index) {
      this.clearClass();
      this.pullTool();
      this.els[index].className.push("active");
      this.selectEl = { ...model, parentId: index + 1, childId: 0 };
      // console.log("container set:", this.selectEl);
      this.toolEntity = [...drag.getToolEntity(this.selectEl.type)];
      this.setToolModel();
      this.els = [...this.els];
    },
    componentSet(model, index, parentIndex) {
      this.clearClass();
      this.pullTool();
      // 数据设置
      this.els[parentIndex].els[index].className.push("active");
      this.selectEl = {
        ...model,
        parentId: parentIndex + 1,
        childId: index + 1,
      };
      // 数据设置
      this.setPageComponents();

      if (this.els[parentIndex].els[index].argument) {
        const d = this.els[parentIndex].els[index];
        const modelData = { ...d.argument, configUrl: d.configUrl };
        this.getDataByApi(modelData);
        this.editToolEntity(modelData);
      }

      if (isSysForms(this.selectEl)) {
        this.toolEntity = drag.getToolEntity(
          "ddd",
          this.state,
          model.isRadio,
          model.configUrl,
          this.selectEl
        );
      }

      this.setToolModel();
      this.els = [...this.els];
    },
    // 删除
    containerDelete(model, index) {
      this.clearClass();
      this.els.splice(index, 1);
      this.els = [...this.els];
    },
    componentDelete(model, index, parentIndex) {
      this.clearClass();
      this.els[parentIndex].els.splice(index, 1);
      this.els = [...this.els];
    },
    ////////////////////////////////////////////////////////右侧tools/////////////////////////////////
    setHeaderForms(model) {
      this.pageHeader = { ...model };
      if (model.headerFormSys) {
        this.initDictionaries(model.headerFormSys);
      }
    },
    changeForm(model) {
      if (!this.selectEl) {
        this.setHeaderForms(model);
      } else {
        const pid = this.selectEl.parentId;
        const cid = this.selectEl.childId;
        this.editUi(model, pid, cid);
        this.editPageForm(model, pid, cid);
        if (model.selectValue && model.selectLabel) {
          this.editComponentSelect(model, pid, cid);
        }
        if (model.showTitle && model.showData) {
          this.EditShowData(model, pid, cid);
        } else if (model.showData && model.XData && model.YData) {
          this.editScatterData(model, pid, cid);
        } else if (
          // model.showTitle &&
          this.selectEl.type.indexOf("jkTable") >= 0
        ) {
          this.editTableData(model, pid, cid);
        } else if (isCardList(this.selectEl)) {
          this.editCardData(model, pid, cid);
        } else if (isTimeLine(this.selectEl)) {
          this.editTimeLine(model, pid, cid);
        } else if (isFiche(this.selectEl)) {
          this.editFiche(model, pid, cid);
        }
        isChart(this.selectEl) && cid && this.setOptions(model, pid, cid);
      }
    },

    // 修改组件过滤条件
    editComponentSelect(model, pid, cid) {
      if (!cid) return;
      this.els[pid - 1].els[cid - 1].selectData = {
        model: this.currData[0][model.selectLabel],
        options: this.currData.map((item) => ({
          id: item[model.selectValue],
          label: item[model.selectLabel],
        })),
      };
    },
    // 存储form表单信息
    editPageForm(model, pid, cid) {
      if (isCardList(this.selectEl)) {
        this.setCardListUi(model, pid, cid);
      }
      if (cid) {
        this.els[pid - 1].els[cid - 1].text = model.title;
        this.els[pid - 1].els[cid - 1].pageForms = {
          ...model,
          value: model.showData,
          label: model.showTitle,
        };
      } else {
        this.els[pid - 1].pageForms = {
          ...model,
        };
      }
      // console.log("edit page forms:", this.els[pid - 1]);
    },

    setOptions(model, pid, cid) {
      if (
        this.selectEl.type.includes("pieChart") &&
        model.showData.length > 1
      ) {
        this.els[pid - 1].els[cid - 1].pageForms.showType = "cakePie";
        this.toolModel.showType = "cakePie";
      } else if (isScatter(this.selectEl)) {
        model.showData &&
          model.XData &&
          model.YData &&
          (this.els[pid - 1].els[cid - 1].data.options = getOptions(
            this.els[pid - 1].els[cid - 1]
          ));
      }

      model.showData &&
        model.showTitle &&
        (this.els[pid - 1].els[cid - 1].data.options = getOptions(
          this.els[pid - 1].els[cid - 1]
        ));
      // console.log("f========:", this.els[pid - 1].els[cid - 1].data.options);
    },

    // 修改界面样式
    editUi(model, pid, cid) {
      model.cWidth && this.changeWidth(model.cWidth, pid, cid);

      if (cid) {
        this.changeHeight(model, pid, cid);
        this.changeMargin(model, pid, cid);
        this.els[pid - 1].els[cid - 1].border = model.border
          ? model.border
          : false;
        this.els[pid - 1].els[cid - 1].grid = model.grid ? model.grid : false;
      } else {
        this.els[pid - 1].border = model.border ? model.border : false;
        this.els[pid - 1].grid = model.grid ? model.grid : false;
        this.els[pid - 1].style = {
          padding: model.RPadding || 0,
          margin: model.RMargin || 0,
        };
      }
    },

    // 处理表格数据
    editTableData(model, pid, cid) {
      //////////////////////////////////////2020-11-04 停用/////////////////////////////////////////////
      // this.tableHeader = drag.getTableHeader(this.tableHeader, model.showTitle);
      // this.els[pid - 1].els[cid - 1].data.Headers = drag.getTableHeaderCols(
      //   model,
      //   this.selectEl,
      //   this.tableHeader
      // );
      //////////////////////////////////////2020-11-04 停用/////////////////////////////////////////////
      // console.log("edit table data:", model);

      this.setElPath(model, pid, cid);
      this.els[pid - 1].els[cid - 1].data.value.Headers = this.tableHeader;
      this.els[pid - 1].els[
        cid - 1
      ].data.value.headersIdentity = this.headersIdentity;
      // console.log("edit table data:", this.els[pid - 1].els[cid - 1].data);
      // console.log("edit table data:", this.currData);
      this.els[pid - 1].els[cid - 1].data.value.Bodys = this.currData.Items;
      this.els[pid - 1].els[
        cid - 1
      ].data.value.PageInfo = this.currData.PageInfo;
      this.els[pid - 1].els[cid - 1].data.value.globals = {
        ...this.els[pid - 1].els[cid - 1].data.globals,
        isSerialNumber: false,
      };
      // this.els = [...this.els];
    },

    // 处理散点图数据
    editScatterData(model, pid, cid) {
      this.els[pid - 1].els[cid - 1].data.value = this.currData.map((item) => [
        item[model.XData],
        item[model.YData],
        item[model.showData],
      ]);
      this.els[pid - 1].els[cid - 1].data.symbol = [
        this.selectEl.argument.apiArgument.find(
          (item) => item.value === model.showData
        ).label,
      ];
      // console.log("===========:", this.els[pid - 1].els[cid - 1].data);
    },
    // 处理卡片信息
    editCardData(model, pid, cid) {
      this.setElPath(model, pid, cid);
    },
    editFiche(model, pid, cid) {
      const { titleName, amount, unit } = model;
      if (titleName || amount || unit) {
        this.els[pid - 1].els[cid - 1].data = {
          titleName: this.currData[0][titleName] || "",
          amount: this.currData[0][amount] || "",
          unit: unit || "",
        };
      }
    },
    editTimeLine(model, pid, cid) {
      const { je, ym, rc } = model;
      if (je && ym && rc) {
        this.els[pid - 1].els[cid - 1].data = {
          value: this.currData.map((item) => ({
            ...item,
            JE: item[je],
            RC: item[rc],
            YM: item[ym],
          })),
        };
      }
    },
    getPathParamResult(str) {
      if (!str.includes("=")) return;
      const result = {};
      str.split("&").forEach((item) => {
        result[item.split("=")[0]] = item.split("=")[1];
      });
      return result;
    },
    setElPath(model, pid, cid) {
      if (!model || !cid) return;
      if (model.path && model.pathParam) {
        this.els[pid - 1].els[cid - 1].path = model.path && {
          name: "pageDetail",
          query: {
            id: model.path,
            // param: { aaa: "bbb" },
            param: JSON.stringify(this.getPathParamResult(model.pathParam)),
          },
        };
      } else {
        this.els[pid - 1].els[cid - 1].path = model.path && {
          name: "pageDetail",
          query: { id: model.path },
        };
      }
    },
    // 修改显示数据
    EditShowData(model, pid, cid) {
      if (this.selectEl.custom || !model.showData.length) return;
      this.setElPath(model, pid, cid);

      // 显示数据showData类型判断并转换
      const arr =
        typeof model.showData === "string" ? [model.showData] : model.showData;
      // value设置
      const v = arr.map((item) => [...this.currData.map((d) => d[item])]);
      // label设置
      const l = arr.map((item) => [
        ...this.currData.map((d) => d[model.showTitle]),
      ])[0];
      // symbol 设置
      this.els[pid - 1].els[cid - 1].data.symbol = arr
        .map((item) => this.state.oldArgument.find((d) => d.value === item))
        .map((item) => item.label.split("#")[1]);
      this.els[pid - 1].els[cid - 1].data.label = l;

      if (arr.length === 1) {
        this.els[pid - 1].els[cid - 1].data.value = v[0];

        // all 设置
        !(
          isPieDouble(this.els[pid - 1].els[cid - 1]) ||
          isPie(this.els[pid - 1].els[cid - 1])
        ) &&
          (this.els[pid - 1].els[cid - 1].data.all[0] = v[0].reduce(
            (prev, cur) => prev + cur,
            0
          ));
      } else {
        this.els[pid - 1].els[cid - 1].data.value = v;
        this.els[pid - 1].els[cid - 1].data.all = v.map((item) =>
          item.reduce((prev, cur) => prev + cur, 0)
        );
      }

      if (this.selectEl.type.includes("pieChart")) {
        const {
          radiusInterval,
          zoom,
          radiusWidth,
          segmentation,
          lessThan,
        } = model;
        const result = {
          type: segmentation || "value",
          value: lessThan || 0,
          radiusWidth: radiusWidth || 25,
          radiusInterval: radiusInterval || 10,
        };
        this.els[pid - 1].els[cid - 1].data.config = !isPieDouble(this.selectEl)
          ? result
          : { ...result, zoom: zoom || 80 };
      }
      this.els = [...this.els];
    },
    // 修改宽度
    changeWidth(w, pid, cid) {
      if (cid) {
        const data = this.els[pid - 1].els[cid - 1].className.filter(
          (item) => item.indexOf("jk-col") < 0
        );
        data.push(w);
        this.els[pid - 1].els[cid - 1].className = [...data];
      } else {
        const data = this.els[pid - 1].className.filter(
          (item) => item.indexOf("jk-col") < 0
        );
        data.push(w);
        this.els[pid - 1].className = [...data];
      }
    },
    // 修改高度
    changeHeight(model, pid, cid) {
      // const ratio = model.cHeight; //* w;
      // if (cid) {
      // if (model.cPadding) return;
      let result = 0;
      const cPadding = model.cPadding
        ? model.cPadding.split(" ").map((item) => parseInt(item))
        : [0];
      if (cPadding.length === 1 || cPadding.length === 2) {
        result = cPadding[0] * 2;
      } else if (cPadding.length === 3 || cPadding.length === 4) {
        result = cPadding[0] + cPadding[2];
      }
      console.log("change height:", model);
      this.els[pid - 1].els[cid - 1].style.height = model.cHeight;
      // parseInt(model.cHeight) + parseInt(result) + "px";
      // } else {
      //   this.els[pid - 1].style.ratio = ratio;
      // }
    },
    // 修改边距
    changeMargin(model, pid, cid) {
      if (cid) {
        model.cPadding &&
          (this.els[pid - 1].els[cid - 1].style.padding = model.cPadding);
        // model.marginRight &&
        //   (this.els[pid - 1].els[cid - 1].style.paddingRight =
        //     model.marginRight + "px");
      } else {
        this.els[pid - 1].style.padding = model.boxPadding + "px";
      }
    },
    btnClick(model) {
      if (model.key === "formatTableHeader") {
        this.showTableHeaderForm();
      } else if (model.key === "setForms") {
        this.showSysForms();
      } else if (model.key === "cardListSet") {
        this.showCardList();
      }
    },
  },
};
</script>
<style lang="scss">
.drag-page {
  .el-form-item__label {
    color: #fff;
  }
  .bar {
    overflow-x: hidden;
  }
  .drag-content {
    display: flex;
    flex-direction: column;
    .component-container {
      flex: 1;
    }
  }
  .tools-container {
    height: 100%;
    position: absolute;
    top: 0;
    right: -318px;
    border: 1px solid #dedede;
    transition: all 0.5s ease-in-out;
    z-index: 100;
    border-radius: 5px;
    padding: 15px 0;
    @include t(background, "k0");
    // background: #fff;
    @include t(color, "k1");
    &.active {
      right: 0;
    }
    .tools-body {
      height: calc(100% - 40px);
    }
    .tools-header {
      position: relative;
      padding-bottom: 10px;
      .drag-tool-title {
        position: absolute;
        left: 10px;
        max-width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .close {
        position: absolute;
        right: 10px;
        cursor: pointer;
      }
    }
  }
  width: 100%;
  height: calc(100vh - 60px);
  overflow: hidden;
  padding: 0 15px;
  @include t(background, "k0");
  @include t(color, "k1");
  &.preview {
    .el-icon-delete,
    .el-icon-setting,
    .el-icon-rank,
    .drag-header {
      display: none !important;
    }
  }
  .drag-page-header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: right;
  }
  .drag-container {
    display: flex;
    width: 100%;
    height: calc(100% - 60px);
    position: relative;
  }
}
</style>
