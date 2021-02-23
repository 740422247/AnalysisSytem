<template>
  <div class="api-set-page">
    <div class="api-set-header">
      <!-- <el-button @click="showFilter" v-if="isTable">设置过滤条件</el-button> -->
      <el-button icon="el-icon-back" @click="goBack">返回</el-button>
      <el-button icon="el-icon-check" @click="save">保存</el-button>
    </div>
    <div class="api-set-body">
      <div class="api-set-menu">
        <api-set-menu :menu="menu" @choice="choice"></api-set-menu>
      </div>
      <div class="api-set-component">
        <div class="api-body-title">已选组件：</div>
        <api-set-content :model="componentModel"></api-set-content>
      </div>
      <div class="api-set-tools">
        <h3 class="tool-title">基础参数：</h3>
        <edit-form
          @change="changeApi"
          :filter-entity="entity"
          :filterModel="model"
          ref="result"
        ></edit-form>
        <h3 class="tool-title">参数配置：</h3>
        <edit-form
          :filter-entity="apiEntity"
          :filterModel="apiModel"
          ref="apiResult"
        ></edit-form>
      </div>
    </div>

    <!-- <FormDialog ref="showDialog" @ok="saveNewPwd" :dialogData="dialogEntity" :model="dialogModel"></FormDialog> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ApiSetMenu from "@draggable/apiSetMenu.vue";
import ApiSetContent from "@draggable/ApiSetContent.vue";
import FilterEntity from "@components/Admin/filterEntity";
import FormDialog from "@components/Admin/form-dialog.vue";
import { isCardList, isFiche } from "./echartOption";

import { config } from "@config/config.js";
import apiEntity from "./entity.js";
// import { apiOptions } from "./apiOptions.js";
import { MessageBox } from "element-ui";
import api from "@api/api";
import * as types from "@store/mutation-types";

export default {
  name: "ApiSet",
  components: {
    ApiSetMenu,
    ApiSetContent,
    EditForm: FilterEntity,
  },
  computed: {
    ...mapGetters({
      apiArgument: "apiArgument",
      maxYear: "getMaxYear",
    }),
    isTable() {
      if (!this.componentModel.type) return false;
      return this.componentModel.type.indexOf("jkTable") >= 0;
    },
  },
  watch: {
    apiArgument() {
      //  待删除
      this.state = {
        ...this.state,
        apiArgument: this.apiArgument.map((item) => ({
          label: item,
          value: item,
        })),
      };
      // 2021-01-07 已弃用
      this.entity = apiEntity.getSetApiEntity(this.state, this.componentModel, this.model);
    },
  },
  data: () => ({
    dialogEntity: {},
    dialogModel: {},
    oldSystemId: undefined,
    menu: config,
    val: "",
    moduleId: undefined,
    oldPath: undefined,
    componentModel: {},
    // oldComponentModel: {},
    componentData: {},
    entity: [],
    model: { isRadio: false },
    state: {},
    apiEntity: [],
    apiModel: {},
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.componentModel = { ...this.menu[0] };
      this.moduleId = this.getRouteId();
      this.maxYear ? this.moduleId && this.getModule() : this.setMaxYear();
      // this.oldComponentModel = { ...this.componentModel, type: "" };
      this.initState();
      this.initSys();
      this.model = { isRadio: false };
    },

    async initSys() {
      const sys = await api.SysBusiness("GetPage", {});
      this.state.sys = sys.data.map((item) => ({
        value: item.businessId,
        label: item.name,
      }));
      this.setEntity();
    },

    async setMaxYear() {
      await this.$store.dispatch(types.getYears);
      this.moduleId && this.getModule();
    },

    showFilter() {
      console.log("api  set watch:", this.componentModel);
    },
    addFilterItem() {},
    // 获取模块信息
    async getModule() {
      const moduleModel = await this.$store.dispatch(types.getModule, {
        id: this.moduleId,
      });
      this.componentModel = JSON.parse(moduleModel.data.content);
      this.changeApi(this.componentModel.argument);
      this.initModel(this.componentModel.argument);
    },

    // 初始化model
    initModel(model) {
      const { apiArgument, ...rest } = model;
      this.apiModel = this.getApiArgumentModel(apiArgument);
      this.model = {
        ...rest,
        arguments: apiArgument.map((item) => item.value),
      };
    },
    getApiArgumentModel(arr) {
      let result = {};
      arr.forEach((item) => (result[item.value] = item.label));
      return result;
    },

    getRouteId() {
      return this.$route.query.id;
    },
    getApiType(el) {
      if (isCardList(el) || isFiche(el)) return "cardList";
      else if (el.custom) return "made";
      else return "universal";
    },
    async initState() {
      const allApi = await this.$store.dispatch(types.getAllApi, {
        // ...this.componentModel,
        BusinessId: this.model.systemId,
        ApiType: this.getApiType(this.componentModel),
        IsEnable: "是",
      });
      // console.log(
      //   allApi.data.filter((item) => item.businessId === this.model.systemId)
      // );
      // console.log("result:", allApi);
      this.state.apiOpt = allApi.data
        // .filter((item) => item.businessId === this.model.systemId)
        .map((item) => ({
          label: `${item.label || ""}(${item.url})`,
          value: item.id,
        }));
      this.setEntity();
    },
    setEntity() {
      // console.log('set entity')
      this.entity = apiEntity.getSetApiEntity(
        this.state,
        this.componentModel,
        this.model
      );
    },
    changeVal() {
      // console.log("changeVal:", JSON.parse(this.val));
    },
    choice(model) {
      this.model = { isRadio: model.type.includes("jkCard") ? true : false };
      this.apiEntity = [];
      this.entity = apiEntity.getSetApiEntity(this.state, model);
      // this.componentModel = {
      //   ...this.componentModel,
      //   // type:
      //   //   this.componentModel.type.indexOf("jkRank") >= 0
      //   //     ? "jkGraph:barChart"
      //   //     : "jkRank:singleRank"
      // };

      this.componentModel = model;
      // this.componentData = model.data;
    },
    isChange(model) {
      if (model.systemId !== this.oldSystemId) {
        this.initState();
        this.oldSystemId = model.systemId;
        model.path = undefined;
        model.arguments = [];
        return false;
      } else if (model.path !== this.oldPath) {
        this.oldPath = model.path;
        model.arguments = [];
        this.setEntity();
        return true;
      } else {
        return true;
      }
    },
    changeApi(model) {
      this.componentModel = {
        ...this.componentModel,
        text: model.moduleName,
      };
      // if (this.componentModel.custom) return;
      // if (this.componentModel.custom || !this.isChange(model)) return;
      // debugger
      // console.log('======:', this.componentModel)
      this.initState();
      model.path &&
        model.path.length &&
        this.$store.dispatch(types.getDataByApi, {
          apiId: model.path,
          param: {
            year: 2020,
            apiType: this.getApiType(this.componentModel),
            // projectid: "500242bb2599b5-045c-4aef-8bbf-76ba65cbbeff",
          },
        });

      model.arguments &&
        model.arguments.length &&
        (this.apiEntity = model.arguments.map((item) => ({
          label: item,
          key: item,
          type: "text",
          className: "is-full",
          labelWidth: "80",
          rules: [
            {
              required: true,
              message: "请输入：“名称#单位” 或 “名称”",
              trigger: "change",
            },
          ],
        })));
    },
    getResult(model) {
      const result = [];
      model = JSON.parse(model);
      for (let key in model) {
        result.push(key);
      }
      return result;
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
      if (!this.$refs.result.getResult()) return;
      if (!this.$refs.apiResult.getResult()) return;

      if (this.getApiArgument().length < 2 && !this.componentModel.custom) {
        MessageBox.alert("请选择可用参数,且可用参数大于2");
        return;
      }

      const argumentsEdit = {
        ...this.model,
        apiArgument: this.getApiArgument(),
      };

      const content = JSON.stringify({
        ...this.componentModel,
        style: { height: "300px" },
        argument: argumentsEdit,
      });
      const modelName = this.componentModel.text;
      const modelType = this.componentModel.type;

      // 新增or刷新
      const url = this.moduleId ? types.updateModules : types.addModules;

      api
        .publicApi(
          url,
          { content, modelName, modelType, modelId: this.moduleId },
          "post"
        )
        .then((res) => {
          if (res.code === 1) {
            MessageBox.alert("保存成功");
            this.$router.go(-1);
          } else {
            MessageBox.alert(res.errMsg);
          }
        });
    },
    getApiArgument() {
      var result = [];
      for (var key in this.apiModel) {
        result.push({ value: key, label: this.apiModel[key] });
      }
      return result;
    },

    // 2020-09-07 待加入
    setDialogData() {
      return {
        title: "过滤字段设置",
        width: "450px",
        labelWidth: "0px",
        top: "30vh",
        entity: [
          {
            label: "",
            placeholder: "字段",
            key: "field",
            rules: [
              {
                required: true,
                message: "原始密码不能为空",
                trigger: "change",
              },
            ],
          },
          {
            label: "",
            placeholder: "显示名称",
            key: "showName",
            rules: [
              { required: true, message: "新密码不能为空", trigger: "blur" },
            ],
          },
          {
            label: "",
            placeholder: "使用类型",
            key: "type",
            rules: [
              { required: true, message: "确认密码不能为空", trigger: "blur" },
            ],
          },
          {
            label: "",
            placeholder: "字典项",
            key: "dictionary",
            rules: [
              { required: true, message: "确认密码不能为空", trigger: "blur" },
            ],
          },
        ],
      };
    },
    // 2020-09-07 待加入
  },
};
</script>
<style lang="scss" scoped>
.api-set-page {
  display: flex;
  height: 100%;
  flex-direction: column;
  .api-set-header {
    flex: 0 0 60px;
    align-items: center;
    justify-content: flex-end;
    display: flex;
    padding: 0 50px;
  }
  .api-set-body {
    flex: 1;
    display: flex;
    .api-set-menu {
      flex: 0 0 300px;
    }
    .api-set-component {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;

      .api-body-title {
        padding-bottom: 15px;
        padding-left: 50px;
        text-align: left;
      }
    }
    .api-set-tools {
      flex: 0 0 300px;
      // api-tool-title:{}
      .tool-title {
        color: #666;
        font-size: 16px;
        text-align: left;
      }
      .table-filter {
        width: 100%;
        padding: 10px 0;
        text-align: left;
        .filter-item {
          width: 45%;
          margin: 5px;
        }
      }
    }
  }
}
</style>
