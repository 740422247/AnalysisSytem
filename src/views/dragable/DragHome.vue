<template>
  <div class="drag-page" :class="{ preview: isPreview }">
    <div class="drag-page-header">
      <Button @click="clearClass">取消选中</Button>
      <Button @click="preview">预览</Button>
      <Button @click="save">提交</Button>
    </div>
    <div class="drag-container">
      <drag-menu
        :menu="menu"
        @onAdd="addContainer"
        @startClone="startClone"
      ></drag-menu>
      <div class="drag-content bar">
        <drag-content
          :parentWidth="parentWidth"
          :els="els"
          @containerSet="containerSet"
          @componentSet="componentSet"
          @startMove="startMove"
          @containerDelete="containerDelete"
          @componentDelete="componentDelete"
        ></drag-content>
      </div>

      <drag-tools
        class="bar"
        @change="changeForm"
        :entity="toolEntity"
        :model="toolModel"
      ></drag-tools>
    </div>
  </div>
</template>
<script>
import { config } from "@config/config.js";
import { mapGetters } from "vuex";
import drag from "./entity.js";
import DragMenu from "./../../components/draggable/DragMenu";
import DragContent from "./../../components/draggable/DragContent";
import DragTools from "./../../components/draggable/DragTools";
import { Icon, Button } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
export default {
  name: "DragHome",
  components: {
    DragMenu,
    DragContent,
    DragTools,
    Button
  },
  computed: {
    ...mapGetters({
      menu: "modules",
      districtByYear: "GetDistrictByYear"
    })
  },
  data: () => ({
    parentWidth: 0,
    isPreview: false,
    selectEl: {},
    // menu: [...config],
    els: [],
    toolEntity: [],
    toolModel: {},
    state: {
      oldArgument: [],
      apiArgument: [],
      subTitle: []
    }
  }),
  watch: {
    els() {}
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.initMenu();
      this.initEls();
    },

    initMenu() {
      this.$store.dispatch("getModules");
    },
    initEls() {
      this.parentWidth = document.querySelector(".drag-content").clientWidth;
      this.els = this.els.length
        ? this.els
        : [
            {
              name: "容器组件",
              type: "container",
              id: 10,
              els: [],
              className: ["jk-col-8"],
              style: {}
            }
          ];
    },

    // 添加容器
    addContainer() {
      this.els.push({
        name: "容器组件" + this.els.length,
        type: "container",
        id: 10 + this.els.length,
        els: [],
        isActive: false,
        className: ["jk-col-8"],
        style: {}
      });
    },
    // 保存
    save() {
      console.log("result:", JSON.stringify(this.els));
    },
    // 预览
    preview() {
      // console.log("preview:", JSON.stringify({ pageData: this.els }));
      this.$store.dispatch("savePreview", { pageData: this.els });
      // window.open ('http://localhost:9006/preview')
      this.$router.push({ name: "Preview" });
      // this.clearClass();
      // this.isPreview = !this.isPreview;
    },

    // 获取toolModel
    setToolModel() {
      this.toolEntity = [...drag.getToolEntity(this.selectEl.type)];
      this.toolModel = {
        ...this.selectEl.style,
        cWidth: this.selectEl.className.find(
          item => item.indexOf("jk-col-") >= 0
        )
      };
    },
    startClone(index) {
      const data = drag.clone(this.menu[index]);
      this.clearClass();
      this.menu[index] = { ...data };
    },
    ////////////////////////////////////////////////////////中间容器///////////////////////////
    // 清除原有class
    clearClass() {
      if (!this.selectEl.parentId) return;
      const pid = this.selectEl.parentId;
      const cid = this.selectEl.childId;
      if (cid) {
        this.els[pid - 1].els[cid - 1].className = this.els[pid - 1].els[
          cid - 1
        ].className.filter(item => item !== "active");
      } else {
        this.els[pid - 1].className = this.els[pid - 1].className = this.els[
          pid - 1
        ].className = this.els[pid - 1].className.filter(
          item => item !== "active"
        );
      }
    },

    // 拖动
    startMove() {
      this.clearClass();
      this.selectEl = {};
    },

    // 设置
    containerSet(model, index) {
      this.clearClass();
      this.els[index].className.push("active");
      this.selectEl = { ...model, parentId: index + 1, childId: 0 };
      this.setToolModel();
      this.els = [...this.els];
    },

    // 获取接口
    getDataByApi(model) {
      this.$store.dispatch(model.path);
    },
    // 修改toolEntity
    editToolEntity(model) {
      let setData = [];
      let setSubTitle = [];
      model.apiArgument.forEach(item => {
        if (item.label.indexOf("#") >= 0) {
          setData.push({ ...item, label: item.label.split("#")[0] });
          this.state.oldArgument.push(item);
        } else {
          setSubTitle.push(item);
        }
      });
      console.log("editTool:", setData, setSubTitle);
      this.state.apiArgument = setData;
      this.state.subTitle = setSubTitle;
      this.toolEntity = drag.getToolEntity("ddd", this.state, "selectMultiple");
    },

    componentSet(model, index, parentIndex) {
      this.clearClass();
      // 数据调用
      if (this.els[parentIndex].els[index].argument) {
        const model = this.els[parentIndex].els[index].argument;
        this.getDataByApi(model);
        this.editToolEntity(model);
      }
      // 数据调用
      this.els[parentIndex].els[index].className.push("active");
      this.selectEl = {
        ...model,
        parentId: parentIndex + 1,
        childId: index + 1
      };
      console.log("setToolModel:", this.selectEl);
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
    changeForm(model) {
      const pid = this.selectEl.parentId;
      const cid = this.selectEl.childId;
      model.cWidth && this.changeWidth(model.cWidth, pid, cid);
      this.changeHeight(model, pid, cid);
      this.changeMargin(model, pid, cid);
      if (model.showTitle && model.showData && model.title) {
        this.EditShowData(model, pid, cid);
        this.editPageForm(model, pid, cid);
      }
    },

    // 存储form表单信息
    editPageForm(model, pid, cid) {
      this.els[0].els[0].pageForms = {
        ...model,
        value: model.showData,
        label: model.showTitle
      };
    },

    // 修改显示数据
    EditShowData(model, pid, cid) {
      // 显示数据showData类型判断并转换
      const arr =
        typeof model.showData === "string"
          ? [...model.showData]
          : model.showData;
      // value设置
      const v = arr.map(item => [...this.districtByYear.map(d => d[item])]);
      // label设置
      const l = arr.map(item => [
        ...this.districtByYear.map(d => d[model.showTitle])
      ])[0];
      // symbol 设置
      this.els[pid - 1].els[cid - 1].data.symbol = arr
        .map(item => this.state.oldArgument.find(d => d.value === item))
        .map(item => item.label.split("#")[1]);
      this.els[pid - 1].els[cid - 1].data.label = l;

      if (arr.length === 1) {
        this.els[pid - 1].els[cid - 1].data.value = v[0];

        // all 设置
        this.els[pid - 1].els[cid - 1].data.all[0] = v[0].reduce(
          (prev, cur) => prev + cur,
          0
        );
      } else {
        this.els[pid - 1].els[cid - 1].data.value = v;
        this.els[pid - 1].els[cid - 1].data.all = v.map(item =>
          item.reduce((prev, cur) => prev + cur, 0)
        );
      }

      if (this.els[pid - 1].els[cid - 1].type.indexOf("jkGraph") >= 0) {
        this.els[pid - 1].els[cid - 1].data.choice = {
          showX: true,
          showY: true
        };
      }

      this.els = [...this.els];
    },
    // 修改宽度
    changeWidth(w, pid, cid) {
      if (cid) {
        const data = this.els[pid - 1].els[cid - 1].className.filter(
          item => item.indexOf("jk-col") < 0
        );
        data.push(w);
        this.els[pid - 1].els[cid - 1].className = [...data];
      } else {
        const data = this.els[pid - 1].className.filter(
          item => item.indexOf("jk-col") < 0
        );
        data.push(w);
        this.els[pid - 1].className = [...data];
      }
    },
    // 修改高度
    changeHeight(model, pid, cid) {
      const ratio = model.cHeight; //* w;
      if (cid) {
        this.els[pid - 1].els[cid - 1].style.ratio = ratio;
      } else {
        this.els[pid - 1].style.ratio = ratio;
      }
    },
    // 修改边距
    changeMargin(model, pid, cid) {
      if (cid) {
        this.els[pid - 1].els[cid - 1].style.padding = model.boxPadding + "px";
      } else {
        this.els[pid - 1].style.padding = model.boxPadding + "px";
      }
    }
  }
};
</script>
<style lang="scss">
.drag-page {
  .bar {
    overflow-x: hidden;
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
  }
}
</style>
