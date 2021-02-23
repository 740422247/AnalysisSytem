<!--
 * @Descripttion: 预览
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-07-01 09:43:05
 * @LastEditors: joykit
 * @LastEditTime: 2020-07-03 15:38:09
-->
<template>
  <div class="preview-page">
    <page-header :data="menu"></page-header>
    <ChildHeader v-if="showPageHeader" :entity="pageHeader" @clickBtn="clickTopBtn"></ChildHeader>

    <div class="preview-container">
      <page-content v-if="newData" :els="newData"></page-content>
    </div>
  </div>
</template>
<script>
import * as types from "@store/mutation-types";
import PageHeader from "./../../components/draggable/PageHeader";
import { MessageBox } from "element-ui";
// import { headerActions } from "./headerActions";
import ChildHeader from "./../../components/draggable/ChildHeader";
import Action from "./../../components/Admin/actions";
import PageContent from "./PageContent";
import { mapGetters } from "vuex";
import { mixin } from "./min/min";
export default {
  name: "Preview",
  mixins: [mixin],
  components: {
    ChildHeader,
    PageContent,
    Action,
    PageHeader,
  },
  data: () => ({
    menu: [
      {
        resourceId: "572d6564686f420b8d8102b1a4181a13",
        resourceName: "首页",
        resourceCode: "首页",
        resourceApi: null,
        resourceTemplate: "c360c8b0ecab4379b8c27998f4ad08bc",
        resourceParentId: "root",
        createDateTime: "2020-07-28 17:10:19",
        createUserId: null,
        createUserName: null,
        updateDateTime: null,
        updateUserId: null,
        updateUserName: null,
      },
      {
        resourceId: "fe5fb6b40c6946b69305f148eec0d4dd",
        resourceName: "乡镇",
        resourceCode: "poorCounty",
        resourceApi: null,
        resourceTemplate: "bc144031e6714dd0bdf5b233ce3c23d1",
        resourceParentId: "root",
        createDateTime: "2020-08-03 14:01:06",
        createUserId: "46fb7079f8c04da1b3a8fda327b5aa1e",
        createUserName: "Admin",
        updateDateTime: null,
        updateUserId: null,
        updateUserName: null,
      },
    ],
    // 页面header
    pageHeader: {
      headerTitle: undefined,
      headerSubTitle: undefined,
      headerActions: [],
    },
    showPageHeader: false,
    // 页面header
    parentWidth: 0,
    newData: null,
    pageId: undefined,
    actions: [
      {
        name: "goBack",
        label: "返回",
      },
    ],
  }),
  mounted() {
    this.init();
  },
  methods: {
    change() {},
    init() {
      window.opener && this.preview();
      // this.render(this.newData);
      this.parentWidth = this.getParentWidth();
    },

    preview() {
      const { showPageHeader, pageHeader } = window.opener.pageDetail;
      this.newData = window.opener.pageDetail.pageData;
      this.showPageHeader = showPageHeader;
      this.pageHeader = pageHeader;
      // console.log('preview:', this.newData)
    },
    getParentWidth() {
      return window.innerWidth;
    },
    clickTopBtn(model) {
      MessageBox.alert(
        `此处为预览页面，暂不支持使用 “ ${model.label} ” 按钮，请去正式页面使用。`
      );
    },
    // 按钮处理方法
    actionMethod(actionName) {
      switch (actionName) {
        case "goBack":
          this.goBack();
          break;
        default:
          break;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    ...mapGetters({
      pageData: "pageDetail",
    }),
  },
  watch: {
    pageData: {
      deep: true,
      immediate: true,
      handler(res) {
        this.newData = res;
      },
    },
  },
};
</script>
<style lang="scss">
// .app-side {
//   display: none !important;
// }
.preview-page {
  @include t(background, "k0");
  @include t(color, "k1");
  width: 100%;
  min-height: calc(100vh - 0px);
  display: flex;
  flex-wrap: wrap;
  // margin: 10px 10px 0 0;
  overflow: hidden;
  // padding: 10px;
  flex-direction: column;
  .preview-container {
    display: flex;
    flex-wrap: wrap;
    .component-container {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
