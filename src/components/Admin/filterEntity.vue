<!--  -->
<template>
  <div class="filter-entity" v-bind:class="{ hasborder: border }">
    <!-- demo-ruleForm filter-entity-group
    :class="{ 'demo-form-inline': formConfig.className }"
     -->
    <Form
      ref="filterModel"
      :model="filterModel"
      class="demo-form-inline demo-ruleForm filter-entity-group"
      :rules="rules"
    >
      <template v-for="item in filterEntity">
        <FormItem
          :key="item.key"
          v-if="!item.invisible"
          v-show="!item.hidden"
          :label="item.label"
          :prop="item.key"
          :required="item.required"
          :readonly="item.readonly"
          :class="item.className ? item.className : 'is-3'"
          :label-width="item.labelWidth ? item.labelWidth + 'px' : '120px'"
        >
          <div class="searchBtn" v-if="item.type === 'search'">
            <template v-if="true">
              <el-button
                type="text"
                icon="el-icon-arrow-down"
                @click="flod"
                v-if="!item.showFold"
                >更多搜索条件</el-button
              >
            </template>
            <el-button v-if="isChang" type="primary" plain @click="searchInfo"
              >查询</el-button
            >
          </div>
          <div v-else-if="item.type === 'button'">
            <el-button v-if="isChang" type="primary" plain @click="btnSave">{{
              item.buttonName
            }}</el-button>
          </div>
          <el-button
            v-else-if="item.type === 'action'"
            type="primary"
            :style="item.style"
            :icon="item.icon"
            @click="btnClick(item)"
            >{{ item.name }}</el-button
          >
          <my-upload
            v-else-if="item.type === 'uploader'"
            :keyName="item.key"
            :item="item"
            :title="item.title || ''"
            ref="uploadxls"
            formDialog
            v-model="filterModel[item.key]"
            @change="change(item)"
          ></my-upload>
          <Select
            v-else-if="item.type === 'select'"
            v-model="filterModel[item.key]"
            :placeholder="item.placeholder ? item.placeholder : item.label"
            :disabled="item.disabled"
            @change="change(item)"
            @blur="blur(item)"
            filterable
            :title="item.title || ''"
          >
            <!-- :filterable="item.filterable" -->

            <Option
              v-for="opt in item.options"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            ></Option>
          </Select>

          <el-select
            v-else-if="item.type === 'selectMultiple'"
            v-model="filterModel[item.key]"
            multiple
            filterable
            collapse-tags
            placeholder="请选择"
            @change="change(item)"
            @blur="blur(item)"
            :title="item.title || ''"
          >
            <el-option
              v-for="item in item.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <Select
            v-else-if="item.type === 'selectTree'"
            v-model="mineStatus"
            :placeholder="item.placeholder ? item.placeholder : item.label"
            multiple
            collapse-tags
            @change="selectChange"
            :title="item.title || ''"
          >
            <Option :value="mineStatusValue" style="height: auto; padding: 0">
              <Tree
                ref="tree"
                :data="item.options"
                show-checkbox
                node-key="id"
                highlight-current
                :props="defaultProps"
                @check-change="handleCheckChange(item.key)"
              ></Tree>
            </Option>
          </Select>
          <el-switch
            v-else-if="item.type === 'switch'"
            v-model="filterModel[item.key]"
            @change="change(item)"
            active-value="true"
            inactive-value="false"
          >
          </el-switch>
          <DatePicker
            v-else-if="item.type === 'datetime' || item.type === 'date'"
            v-model="filterModel[item.key]"
            :disabled="item.disabled"
            :type="item.type"
            :placeholder="item.type === 'date' ? '选择日期' : '选择时间'"
            @change="change(item)"
            @blur="blur(item)"
            :title="item.title || ''"
          ></DatePicker>

          <RadioGroup
            v-else-if="item.type === 'radio'"
            v-model="filterModel[item.key]"
            @change="change(item)"
            @blur="blur(item)"
            :title="item.title || ''"
          >
            <Radio
              v-for="opt in item.options"
              :key="opt.value"
              :disabled="item.disabled"
              :label="opt.value"
              >{{ opt.label }}</Radio
            >
          </RadioGroup>

          <el-input
            v-else
            v-model="filterModel[item.key]"
            :placeholder="item.placeholder ? item.placeholder : item.label"
            auto-complete="off"
            clearable
            :disabled="item.disabled"
            :maxlength="item.maxLength"
            :min="item.min"
            show-word-limit
            :show-password="item.password ? item.password : false"
            :type="item.type ? item.type : 'text'"
            rows="3"
            @input="change(item)"
            @blur="blur(item)"
            :title="item.title || ''"
          ></el-input>
        </FormItem>
      </template>
    </Form>
    <!-- <button class="search-btn" @click="searchInfo" v-if="showSearch ? showSearch : false">
      <i class="el-icon-search"></i>
      查询
    </button>-->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
  Form,
  FormItem,
  Select,
  Option,
  Input,
  DatePicker,
  Tree
} from "element-ui";
import MyUpload from "./MyUpload";
import "element-ui/lib/theme-chalk/index.css";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Form,
    FormItem,
    Select,
    Option,
    ElInput: Input,
    DatePicker,
    Tree,
    MyUpload
  },
  props: {
    filterEntity: Array,
    border: Boolean,
    showSearch: Boolean,
    filterModel: Object,
    formConfig: {
      type: Object,
      default: () => {
        return { inline: false };
      }
    },
    isChang: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    //这里存放数据
    return {
      h: 0,
      mineStatus: "",
      mineStatusValue: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      rules: {},
      // isChang: true, //是否立即查询
      // 展开查询按钮
      showMore: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化

  watch: {
    filterEntity(res) {
      this.initRules();
      this.setHeight(62);
      // this.refresh();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // console.log(this.formConfig);
    this.initRules();
    this.expression();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //监听器vue
    // if (this.$listeners.change) {
    //   this.isChang = false;
    // }
    // console.log(this.filterModel);
    this.refresh();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
    //  console.log(this.filterModel);
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {},
  //方法集合
  methods: {
    //按钮事件
    btnSave() {
      this.$refs.filterModel.validate(valid => {
        if (valid) {
          const { button, ...rest } = this.getModelData();
          console.log(rest);
          this.$emit("btnClick", rest);
        } else {
          return false;
        }
      });
    },
    // 更新界面
    refresh() {
      // console.log("init:", this.filterModel);
      if (!this.filterEntity.length) return;
      // 过滤查询按钮
      if (!this.showSearch) {
        this.setHeight();
        return;
      }

      const btn = {
        type: "search",
        className: "is-" + this.getCols(this.filterEntity)
      };
      if (this.filterEntity.length <= this.getCols(this.filterEntity) - 1) {
        this.filterEntity.push({ ...btn, showFold: true });
      } else {
        this.filterEntity.splice(this.getCols(this.filterEntity) - 1, 0, btn);
      }
      this.h = this.setHeightAuto();
    },

    // 获取最大高度
    getMaxHeight() {
      const showEntity = this.filterEntity.filter(item => !item.invisible);
      const cols = this.getCols(showEntity);
      return !(showEntity.length % cols)
        ? parseInt(showEntity.length / cols) * 70
        : (parseInt(showEntity.length / cols) + 1) * 70;
    },
    //自由高度
    setHeightAuto() {
      // const flag = this.filterEntity.some((item,index) => index <= 1 && item.className.indexOf(''))
      const result =
        document.querySelector(".demo-form-inline").getBoundingClientRect()
          .height + 62;
      return result;
    },
    // 获取栅格数
    getCols(arr) {
      if (!arr[0].className) {
        return 3;
      } else {
        const className = arr[0].className;
        const cols = className
          .split(" ")
          .find(item => item.indexOf("is-") >= 0)
          .split("is-")[1];
        return cols === "full" ? 1 : cols;
      }
    },
    // 设置搜索高度
    setHeight(num) {
      if (this.showSearch) {
        document
          .querySelector(".demo-form-inline")
          .setAttribute("style", `height:${num}px`);
      } else {
        document
          .querySelector(".demo-form-inline")
          .setAttribute("style", `height:auto`);
      }
    },
    // 展开效果
    flod() {
      if (!this.showMore) {
        this.setHeight(62);
      } else {
        this.setHeight(this.h);
      }
      this.showMore = !this.showMore;
    },
    expression() {
      const keys = [];
      this.filterEntity &&
        this.filterEntity.forEach(item => {
          if (item.expression && item.autoEx) {
            if (!keys.includes(item.key)) {
              const a = {};
              a[item.key] = this.filterModel[item.key];
              item.expression(a);
              keys.push(item.key);
            }
          }
        });
    },
    // 处理验证规则
    initRules() {
      const keys = [];
      this.filterEntity &&
        this.filterEntity.forEach(item => {
          if (item.rules) {
            this.rules[item.key] = item.rules;
          }
          if (item.expression2) {
            if (!keys.includes(item.key)) {
              item.expression2(
                this.filterModel,
                this.filterModel[item.key],
                this.controlForms2
              );
              keys.push(item.key);
            }
          }
        });
    },
    // 获取表单结果
    getResult() {
      if (!this.rules) {
        return this.getModelData();
      }
      this.$refs["filterModel"].validate(valid => {
        if (valid) {
          this.isValid = true;
        } else {
          console.warn("error submit!!");
          this.isValid = false;
          return false;
        }
      });

      if (this.isValid) {
        return this.getModelData();
      } else {
        console.warn("数据验证失败，数据无法返回，请检查");
        return false;
        // return "数据验证失败，如果想取消验证，无需传入rules属性";
      }
    },
    // 获取可视数据
    getModelData() {
      let data = {};
      this.filterEntity &&
        this.filterEntity.forEach(item => {
          if (!item.invisible) {
            data[item.key] = this.filterModel[item.key];
          }
        });
      return data;
    },
    // 控制表单
    controlForms(keys, flat) {
      console.log(keys, flat);
      // keys.forEach(key => {
      //   this.filterEntity[
      //     this.filterEntity.findIndex(item => item.key === key)
      //   ].hidden = flat;
      // });
    },
    selectChange(e) {
      var arrNew = [];
      var dataLength = this.mineStatusValue.length;
      var eleng = e.length;
      for (let i = 0; i < dataLength; i++) {
        for (let j = 0; j < eleng; j++) {
          if (e[j] === this.mineStatusValue[i].label) {
            arrNew.push(this.mineStatusValue[i]);
          }
        }
      }
      this.$refs.tree[0].setCheckedNodes(arrNew); //设置勾选的值
    },

    handleCheckChange(key) {
      const res = this.$refs.tree[0].getCheckedNodes(true, true); //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
      const arrLabel = [];
      const arr = [];
      res.forEach(item => {
        arrLabel.push(item.label);
        arr.push(item);
      });
      this.mineStatusValue = arr;
      this.mineStatus = arrLabel;
      // console.log("arr:" + JSON.stringify(arr));
      // console.log("arrLabel:" + arrLabel);
      this.filterModel[key] = arr;
      this.filterModel = { ...this.filterModel };
    },

    // searchInfo() {
    //   this.$emit("searchFilter", this.getModelData());
    // },
    searchInfo() {
      const { undefined, ...rest } = this.getModelData();
      this.$emit("searchFilter", rest);
    },
    btnClick(model) {
      this.$emit("btnClick", model);
    },
    change(item) {
      if (item.expression) {
        item.expression(
          this.filterModel,
          this.filterModel[item.key],
          this.linkage,
          item.options
        );
        // this.setHeight(this.getMaxHeight());
      }
      //控制显示隐藏,兼容老代码,21/1/13
      if (item.expression2) {
        item.expression2(
          this.filterModel,
          this.filterModel[item.key],
          this.controlForms2
        );
        // this.setHeight(this.getMaxHeight());
      }
      this.$emit("change", this.filterModel);
    },
    // 控制表单
    controlForms2(keys, flat) {
      keys.forEach(key => {
        this.filterEntity[
          this.filterEntity.findIndex(item => item.key === key)
        ].hidden = flat;
      });
    },
    //此处修改值
    linkage(keys, model, opt) {
      const www = opt.filter(item => {
        if (item.businessId === model.businessId) {
          return item;
        }
      });
      // this.$emit("linkage", JSON.parse(JSON.stringify(www)));
      this.$emit("linkage", www);
      // keys.forEach(key => {
      //   this.dialogData.entity[
      //     this.dialogData.entity.findIndex(item => item.key === key)
      //   ].hidden = flat;
      // });
    },
    blur(item) {
      this.$emit("blur", this.filterModel);
    }
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scope>
//@import url(); 引入公共css类
@import "@assets/scss/form-scss.scss";
.filter-entity {
  margin-top: 20px;
  .searchBtn {
    display: flex;
    justify-content: space-between;
  }
  .demo-form-inline {
    height: auto;
    transition: all 0.3s ease-in-out;
  }
  .filter-entity-group {
    overflow: hidden;
  }
}

.demo-form-inline {
  margin: 20px 10px 10px;
}

.hasborder {
  border-top: 1px solid #ccc;
}

.search-btn {
  width: 100px;
  height: 32px;
  background: linear-gradient(
    360deg,
    rgba(27, 203, 141, 1) 0%,
    rgba(45, 224, 161, 1) 100%
  );
  opacity: 1;
  border-radius: 4px;
  border: none;
  outline: none;
  color: #fff;
  cursor: pointer;
}
</style>
