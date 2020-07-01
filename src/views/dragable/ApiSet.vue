<template>
  <div class="api-set-page">
    <div class="api-set-header">
      <el-button type="success" icon="el-icon-check" @click="save">保存</el-button>
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
        <edit-form @change="changeApi" :filter-entity="entity" :filterModel="model"></edit-form>
        <edit-form :filter-entity="apiEntity" :filterModel="apiModel"></edit-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ApiSetMenu from "@draggable/apiSetMenu.vue";
import ApiSetContent from "@draggable/ApiSetContent.vue";
import FilterEntity from "@components/Admin/filterEntity";
import { config } from "@config/config.js";
import apiEntity from "./entity.js";
import { apiOptions } from "./apiOptions.js";
export default {
  name: "ApiSet",
  components: {
    ApiSetMenu,
    ApiSetContent,
    EditForm: FilterEntity
  },
  computed: {
    ...mapGetters({
      apiArgument: "apiArgument"
    })
  },
  watch: {
    apiArgument() {
      //  待删除
      this.state.apiArgument = this.apiArgument.map(item => ({
        label: item,
        value: item
      }));

      this.entity = apiEntity.getSetApiEntity(this.state);
    }
  },
  data: () => ({
    menu: config,
    val: "",
    componentModel: {},
    // oldComponentModel: {},
    componentData: {},
    entity: [],
    model: {},
    state: {},
    apiEntity: [],
    apiModel: {}
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.componentModel = { ...this.menu[0] };
      // this.oldComponentModel = { ...this.componentModel, type: "" };
      this.state.apiOpt = apiOptions;
      this.entity = apiEntity.getSetApiEntity(this.state);
    },
    changeVal() {
      // console.log("changeVal:", JSON.parse(this.val));
    },
    choice(model) {
      this.componentModel = { ...this.componentModel,type: this.componentModel.type.indexOf("jkRank")>=0  ? 'jkGraph:barChart' : "jkRank:singleRank" };
      const timer = window.setTimeout(() => {
        this.componentModel = { ...model };
        window.clearTimeout(timer)
      },20)
      // this.componentData = model.data;
    },
    changeApi(model) {
      this.componentModel = {
        ...this.componentModel,
        text: model.moduleName
      };

      model.path && model.path.length && this.$store.dispatch(model.path);
      model.arguments &&
        model.arguments.length &&
        (this.apiEntity = model.arguments.map(item => ({
          label: item,
          key: item,
          type: "text",
          className: "is-full",
          labelWidth: "80"
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
    // 保存
    save() {
      const argumentsEdit = {
        ...this.model,
        apiArgument: this.getApiArgument()
      };
      console.log(
        "componentModel:",
        JSON.stringify({ ...this.componentModel, argument: argumentsEdit })
      );
    },
    getApiArgument() {
      var result = [];
      for (var key in this.apiModel) {
        result.push({ value: key, label: this.apiModel[key] });
      }
      return result;
    }
  }
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
      .api-body-title {
        padding-bottom: 15px;
        padding-left: 50px;
        text-align: left;
      }
    }
    .api-set-tools {
      flex: 0 0 300px;
      // api-tool-title:{}
    }
  }
}
</style>
