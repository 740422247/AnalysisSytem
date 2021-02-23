<template>
  <div class="child-header-container">
    <div class="drag-header" v-if="isShowTool">
      <i
        class="el-icon-delete"
        @click="deleteHeader"
        style="margin-right: 8px; font-size: 25px"
        title="删除"
      ></i>
      <i
        class="el-icon-setting"
        @click="setHeader"
        style="font-size: 25px"
        title="设置"
      ></i>
    </div>
    <div
      class="common-header"
      :class="{ active: entity.headerActive }"
      :style="setStyle"
    >
      <!-- headerTitleResult是根据路由参数拼接后的标题结果，不得随意删除 -->
      <div class="common-header-left">
        <span class="common-header-title" v-if="entity.headerTitle">{{
          entity.headerTitleResult || entity.headerTitle
        }}</span>
        <!-- 指定组件的remark属性 -->
        <span class="common-header-remark" v-if="entity.subTitle">
          {{ entity.subTitle || "" }}
        </span>
        <jk-select
          v-if="selectData"
          :model="selectData.model"
          :options="selectData.children"
          @onSelectChage="childHeaderChage"
          type='simpleSelect'
          class="child-select"
        ></jk-select>
          <!-- type="simpleSelect" -->

      </div>
      <div class="common-header-right">
        <!-- <ChildButton></ChildButton> -->
        <child-button :entity="getActions" @clickBtn="clickBtn"></child-button>
      </div>
    </div>
  </div>
</template>
<script>
import ChildButton from "./base/DragButton";
import { headerActions } from "./../../views/dragable/headerActions";
import jkSelect from "./../base/jkSelect/jkSelect";

export default {
  name: "ChildHeader",
  components: { ChildButton, jkSelect },
  props: {
    entity: { type: Object },
    isShowTool: { type: Boolean },
  },
  data: () => ({
    selectData: null,
    // {
    //   model: "两不愁",
    //   id: "capitalInvestment",
    //   label: "资金走向",
    //   placeholder: "请选择资金走向",
    //   putModel: "L11",
    //   showModel: "两不愁",
    //   type: "select",
    //   children: [
    //     { id: "L11", label: "“两不愁”" },
    //     { id: "L12", label: "住房保障" },
    //     { id: "L13", label: "教育保障" },
    //     { id: "L14", label: "医疗保障" },
    //     { id: "L15", label: "其他" },
    //   ],
    // },
  }),
  computed: {
    getActions() {
      return Array.isArray(this.entity.headerActions)
        ? this.entity.headerActions.map((item) =>
            headerActions.find((action) => action.value === item)
          )
        : [];
    },
    setStyle() {
      const { topAndBottom, leftAndRight } = this.entity;
      return {
        paddingTop: `${topAndBottom}px`,
        paddingBottom: `${topAndBottom}px`,
        paddingLeft: `${leftAndRight}px`,
        paddingRight: `${leftAndRight}px`,
      };
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.entity && this.entity.selectData) {
        this.selectData = { ...this.entity.selectData };
      } else {
        this.selectData = null;
      }
    },
    deleteHeader() {
      this.$emit("deleteHeader");
    },
    setHeader() {
      this.$emit("setHeader");
    },
    clickBtn(model) {
      this.$emit("clickBtn", model);
    },
    childHeaderChage(model) {
      this.$emit("onHeaderFilterChange", model);
    },
  },
  watch: {
    entity: {
      deep: true,
      handler(res) {
        this.init();
      },
    },
  },
};
</script>

<style lang="scss" scpoed>
.child-header-container {
  // margin-top:70px;
  flex: 0 0 72px;
  .drag-header {
    text-align: right;
  }
  .common-header {
    display: flex;
    justify-content: space-between;
    height: 72px;
    align-items: center;
    padding-bottom: 15px;
    padding-top: 15px;
    &.active {
      box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.5);
    }
    div {
      flex: 1;
    }
    .common-header-left {
      text-align: left;
      .common-header-title {
        font-size: 20px;
        color: #fff;
        margin-right: 1vw;
      }
      .common-header-remark {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #9dbae3;
      }
      .child-select {
        width: 220px;
        position: relative;
        left: -10px;
        &.jkSelect {
          .treeSelect {
            .vue-treeselect {
              border-radius: 5px;
              border: 1px solid rgb(30, 81, 167);
            }
          }
        }
      }
    }
    .common-header-right {
      text-align: right;
    }
  }
}
</style>
