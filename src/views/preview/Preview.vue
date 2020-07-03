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
    <div class="right-align">
      <action :action="actions" @actions="actionMethod"></action>
    </div>
    <div class="preview-container">
      <page-content v-if="newData" :els="newData"></page-content>
    </div>
  </div>
</template>
<script>
import Action from "./../../components/Admin/actions";
import PageContent from "./PageContent";
import { mapGetters } from "vuex";
import { mixin } from "./min/min";
export default {
  name: "Preview",
  mixins: [mixin],
  data: () => ({
    parentWidth: 0,
    newData: null,
    actions: [
      {
        name: "goBack",
        label: "返回"
      }
    ]
  }),
  mounted() {
    this.init();
  },
  methods: {
    change() {},
    init() {
      this.$store.dispatch("getPageDetail");
      this.render(this.pageData);
      this.parentWidth = this.getParentWidth();
    },
    getParentWidth() {
      return window.innerWidth;
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
    }
  },
  computed: {
    ...mapGetters({
      pageData: "pageDetail"
    })
  },
  watch: {
    pageData: {
      deep: true,
      immediate: true,
      handler(res) {
        this.newData = res;
      }
    }
  },
  components: {
    PageContent,
    Action
  }
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
  min-height: calc(100vh - 70px);
  display: flex;
  flex-wrap: wrap;
  margin: 10px 10px 0 0;
  overflow: hidden;
  padding: 10px;
  flex-direction: column;
  .preview-container {
    display: flex;
    flex-wrap: wrap;
    .component-container {
      min-height: 200px;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
