<!--
 * @Descripttion: 预览
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-07-01 09:43:05
 * @LastEditors: wss
 * @LastEditTime: 2020-12-29 16:34:11
-->
<template>
  <div class="preview-page">
    <page-header
      :data="menu"
      :headModel="headModel"
      :years="years"
      @actionMethods="actionMethods"
      @choice="choiceYear"
    ></page-header>
    <search-all v-if="isSearchAll"></search-all>
    <div v-if="!isSearchAll" class="preview-content-container bar">
      <ChildHeader
        v-if="showPageHeader"
        :entity="pageHeader"
        @clickBtn="clickTopBtn"
        @onHeaderFilterChange="onHeaderFilterChange"
      ></ChildHeader>
      <div class="preview-container preview-content">
        <page-content
          v-if="newData"
          :els="newData"
          @onSearch="onSearch"
          @clickItem="clickCard"
          @onTable="onTable"
          @onSelectChage="onSelectChage"
        ></page-content>
      </div>
      <FormDialog
        ref="showDialog"
        @ok="saveNewPwd"
        :dialogData="dialogEntity"
        :model="dialogModel"
      ></FormDialog>
      <!-- <edit-pwd></edit-pwd> -->
      <input type="file" id="uploadPhoto" style="display: none" />
      <Loading
        :show="Loading"
        :config="{ txt: '正在加载...', time: 0 }"
      ></Loading>
    </div>
  </div>
</template>
<script>
import Action from "./../../components/Admin/actions";
import PageContent from "./PageContent";
import SearchAll from "@components/customization/searchAll/searchAll";
import ChildHeader from "./../../components/draggable/ChildHeader";
// import EditPwd from "./../../components/draggable/base/EditPwd";
import PageHeader from "./../../components/draggable/PageHeader";
import { mapGetters } from "vuex";
import { mixin } from "./min/min";
import { componentMethods } from "./min/componentMethods";
import { headerMethods } from "./min/headerMethods";
import * as types from "@store/mutation-types";
import { MessageBox, Message } from "element-ui";
import api from "@api/api";
const FormDialog = () => import("@components/Admin/form-dialog.vue");

export default {
  name: "pageDetail",
  mixins: [mixin, componentMethods, headerMethods],
  components: {
    PageContent,
    Action,
    ChildHeader,
    PageHeader,
    FormDialog,
    SearchAll,
    // EditPwd,
  },

  data: () => ({
    isSearchAll: false,
    dialogModel: {},
    dialogEntity: {},
    menu: [
      // {
      //   resourceId: "572d6564686f420b8d8102b1a4181a13",
      //   resourceName: "首页",
      //   resourceCode: "首页",
      //   resourceApi: null,
      //   resourceTemplate: "c360c8b0ecab4379b8c27998f4ad08bc",
      //   resourceParentId: "root",
      //   createDateTime: "2020-07-28 17:10:19",
      //   createUserId: null,
      //   createUserName: null,
      //   updateDateTime: null,
      //   updateUserId: null,
      //   updateUserName: null
      // },
      // {
      //   resourceId: "fe5fb6b40c6946b69305f148eec0d4dd",
      //   resourceName: "乡镇",
      //   resourceCode: "poorCounty",
      //   resourceApi: null,
      //   resourceTemplate: "bc144031e6714dd0bdf5b233ce3c23d1",
      //   resourceParentId: "root",
      //   createDateTime: "2020-08-03 14:01:06",
      //   createUserId: "46fb7079f8c04da1b3a8fda327b5aa1e",
      //   createUserName: "Admin",
      //   updateDateTime: null,
      //   updateUserId: null,
      //   updateUserName: null
      // }
    ],
    headModel: {},
    selectedYear: "",
    // 页面header
    pageHeader: {
      headerTitle: undefined,
      headerSubTitle: undefined,
      headerActions: [],
    },
    showPageHeader: false,
    // 页面header
    parentWidth: 0,
    newData: [],
    pageId: undefined,
    actions: [
      {
        name: "goBack",
        label: "返回",
      },
    ],
  }),

  created() {
    const _this = this;
    window.readFile = function () {
      var file = this.files[0];

      //判断是否是图片类型
      if (!/image\/\w+/.test(file.type)) {
        Message("只能选择图片");
        return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      var img = new Image();
      reader.onload = function (e) {
        _this.saveHeadPhoto(this.result);
      };
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.setUserMenu();
      this.initUserInfo();
      this.setYears();
      this.getDetail();
      this.parentWidth = this.getParentWidth();

      document
        .getElementById("uploadPhoto")
        // eslint-disable-next-line no-undef
        .addEventListener("change", readFile, false);
    },
    checkIsSearchAll() {
      // console.log("is search all:", this.$route.query.id);
      this.isSearchAll = this.$route.query.id === "SearchAll";
    },
    change() {},

    saveNewPwd({ model }) {
      if (model.newPassword !== model.confirmPassword) {
        MessageBox.confirm("两次输入密码不一致，请重新确认密码?", "提示", {
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {
            this.editTitle({ oldPassword: model.oldPassword });
          })
          .catch(() => {
            this.editTitle({ oldPassword: model.oldPassword });
          });
      } else {
        api
          .publicApi(
            types.editPwd,
            {
              oldLoginPwd: model.oldPassword,
              newLoginPwd: model.newPassword,
            },
            "post"
          )
          .then((res) => {
            if (res.code === 1) {
              Message({ message: "保存成功", type: "success" });
              this.$router.go(-1);
            } else {
              Message({ message: res.errMsg, type: "error" });
            }
          });
      }
    },
    setDialogData() {
      return {
        title: "修改密码",
        width: "450px",
        labelWidth: "0px",
        top: "30vh",
        entity: [
          {
            label: "",
            placeholder: "原始密码",
            key: "oldPassword",
            rules: [
              { required: true, message: "原始密码不能为空", trigger: "blur" },
            ],
          },
          {
            label: "",
            placeholder: "新密码",
            key: "newPassword",
            rules: [
              { required: true, message: "新密码不能为空", trigger: "blur" },
            ],
          },
          {
            label: "",
            placeholder: "确认密码",
            key: "confirmPassword",
            rules: [
              { required: true, message: "确认密码不能为空", trigger: "blur" },
            ],
          },
        ],
      };
    },

    initUserInfo() {
      const user = JSON.parse(localStorage.getItem("vuexLocalStorage"));
      const { userName, avatar } = user.user.userInfo;
      this.headModel = {
        userName,
        avatar,
      };
    },
    setUserMenu() {
      const user = JSON.parse(localStorage.getItem("vuexLocalStorage"));
      this.menu = user.user.userInfo.resources.filter(
        (item) => item.resourceTemplate
      );
    },
    setYears() {
      this.$store.dispatch(types.getYears);
    },
    async getDetail() {
      this.checkIsSearchAll();
      // console.log("get detail:", this.isSearchAll, this.$route);
      if (this.isSearchAll) return;
      this.pageId = this.$route.query.id;

      const result = await this.$store.dispatch(types.getPage, {
        id: this.pageId,
      });
      const { showPageHeader, pageHeader, els } = JSON.parse(
        result.data.content
      );
      // console.log('page detail:', els)
      this.showPageHeader = showPageHeader;
      this.pageHeader = pageHeader;

      // console.log("result:", els);
      //this.pageData.length && this.pageData;
      // this.newData = JSON.parse(result.data.content);
      this.render(els);
      // console.log('pageDetail content:', JSON.parse(result.data.content))
    },

    // preview() {
    //   this.newData = window.opener.pageDetail.pageData;
    // },
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
    // 头部按钮处理
    clickTopBtn(model) {
      switch (model.value) {
        case "goBack":
          this.goBack();
          break;
        case "exportData":
          this.exportData();
          break;
        default:
          break;
      }
    },

    choiceYear(year) {
      this.selectedYear = year;
      this.$store.dispatch("setSelectedYear", { selectedYear: year });
      this.setNewData(this.newData);
    },
  },
  computed: {
    ...mapGetters({
      pageData: "pageDetail",
      maxYear: "getMaxYear",
      years: "getYears",
      userInfo: "userInfo",
    }),
  },
  watch: {
    pageData: {
      deep: true,
      immediate: true,
      handler(res) {},
    },
    $route: {
      handler(res) {
        this.getDetail();
        //深度监听，同时也可监听到param参数变化
      },
      deep: true,
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
  min-height: calc(100vh);
  display: flex;
  flex-wrap: wrap;
  // margin: 10px 10px 0 0;
  overflow: hidden;
  padding: 0;
  // padding-top: 70px;
  flex-direction: column;
  .preview-content-container {
    flex: 1;
    flex-basis: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
  }
  .preview-container {
    &.preview-content {
      padding: 20px;
      flex: 1;
    }
    display: flex;
    flex-wrap: wrap;
    .component-container {
      // min-height: 200px;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
