<!--  -->
<template>
  <div class="filter-entity" v-bind:class="{hasborder: border}">
    <Form :ref="filterModel" :model="filterModel" class="demo-form-inline demo-ruleForm">
      <div v-for="item in filterEntity" :key="item.key" style="display:contents">
        <FormItem
          v-if="!item.invisible"
          :label="item.label"
          :prop="item.key"
          :class="item.className ? item.className : 'is-3'"
          :label-width="item.labelWidth ? item.labelWidth + 'px' : '120px'"
        >
          <Select
            v-if="item.type === 'select'"
            v-model="filterModel[item.key]"
            :placeholder="item.placeholder ? item.placeholder : item.label"
            :filterable="item.filterable"
            :disabled="item.disabled"
            @change="change(item)"
          >
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
            collapse-tags
            placeholder="请选择"
            @change="change(item)"
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
          >
            <Option :value="mineStatusValue" style="height: auto; padding:0">
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

          <DatePicker
            v-else-if="item.type === 'datetime' || item.type === 'date'"
            v-model="filterModel[item.key]"
            :disabled="item.disabled"
            :type="item.type"
            :placeholder="item.type === 'date' ? '选择日期' : '选择时间'"
            @change="change(item)"
          ></DatePicker>

          <RadioGroup
            v-else-if="item.type === 'radio'"
            v-model="filterModel[item.key]"
            @change="change(item)"
          >
            <Radio
              v-for="opt in item.options"
              :key="opt.value"
              :disabled="item.disabled"
              :label="opt.value"
            >{{ opt.label }}</Radio>
          </RadioGroup>

          <Input
            v-else
            v-model="filterModel[item.key]"
            :placeholder="item.placeholder ? item.placeholder : item.label"
            auto-complete="off"
            clearable
            :disabled="item.disabled"
            :maxlength="item.maxLength"
            :min="item.min"
            show-word-limit
            :type="item.type ? item.type : 'text'"
            rows="3"
            @input="change(item)"
          ></Input>
        </FormItem>
      </div>
    </Form>
    <button class="search-btn" @click="searchInfo" v-if="showSearch ? showSearch : false">
      <i class="el-icon-search"></i>
      查询
    </button>
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
import "element-ui/lib/theme-chalk/index.css";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Form,
    FormItem,
    Select,
    Option,
    Input,
    DatePicker,
    Tree
  },
  props: {
    filterEntity: Array,
    border: Boolean,
    showSearch: Boolean,
    filterModel: Object
  },
  data() {
    //这里存放数据
    return {
      mineStatus: "",
      mineStatusValue: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {},
  //方法集合
  methods: {
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

    searchInfo() {
      this.$emit("searchFilter", this.filterModel);
    },

    change(item) {
      if (item.expression) {
        item.expression(
          this.filterModel,
          this.filterModel[item.key],
          this.filterEntity
        );
      }
      this.$emit("change", this.filterModel);
    }
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss">
//@import url(); 引入公共css类
@import "@assets/scss/form-scss.scss";
.filter-entity {
  margin-top: 20px;
  text-align: right;
}

.demo-form-inline {
  margin: 20px 10px;
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
