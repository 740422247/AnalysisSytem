<template>
  <div class="preview-page">
    <div class="right-align">
      <action :action="actions" @actions="actionMethod"></action>
    </div>
    <div class="preview-container">
      <page-content :els="pageData"></page-content>
    </div>
  </div>
</template>
<script>
import Action from "./../../components/Admin/actions";
import PageContent from "./PageContent";
import { mapGetters } from "vuex";
export default {
  name: "Preview",
  components: {
    PageContent,
    Action
  },
  computed: {
    ...mapGetters({
      pageData: "pageDetail"
    })
  },
  data: () => ({
    parentWidth: 0,
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
    init() {
      this.$store.dispatch("getPage");
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
