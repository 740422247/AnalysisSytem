<!--  -->
<template>
  <div class="child-dialog">
    <Dialog
      :title="dialogData.title"
      :visible.sync="formDialog"
      :modal="false"
      :fullscreen="dialogData.fullscreen ? dialogData.fullscreen : false"
      :close-on-click-modal="false"
      :width="dialogData.width ? dialogData.width : '500px'"
    >
      <Form
        :ref="model"
        :label-position="dialogData.labelPosition"
        :model="model"
        :rules="rules"
        class="demo-form-inline demo-ruleForm"
      >
        <FormItem
          v-for="item in dialogData.entity"
          :key="item.key"
          :label="item.label"
          :prop="item.key"
          :class="item.className"
          :required="item.required"
          :readonly="item.readonly"
          :label-width="dialogData.labelWidth ? dialogData.labelWidth : '80px'"
        >
          <Select v-if="item.type === 'select'" v-model="model[item.key]">
            <Option
              v-for="opt in item.options"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            ></Option>
          </Select>

          <DatePicker
            v-else-if="item.type === 'datetime' || item.type === 'date'"
            v-model="model[item.key]"
            :type="item.type"
            :placeholder="item.type === 'date' ? '选择日期' : '选择时间'"
          ></DatePicker>

          <RadioGroup v-else-if="item.type === 'radio'" v-model="model[item.key]">
            <Radio v-for="opt in item.options" :key="opt.value" :label="opt.value">{{ opt.label }}</Radio>
          </RadioGroup>

          <Input
            v-else
            v-model="model[item.key]"
            auto-complete="off"
            :type="item.type ? item.type : 'text'"
            rows="3"
          ></Input>
        </FormItem>
      </Form>

      <div slot="footer" class="dialog-footer">
        <Button @click="resetForm()">取消</Button>
        <Button type="primary" @click="ok">确定</Button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import {
  Dialog,
  Form,
  FormItem,
  Select,
  Option,
  Input,
  DatePicker,
  Radio,
  Button,
  RadioGroup
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Dialog,
    Form,
    FormItem,
    Select,
    Option,
    Input,
    Button,
    DatePicker,
    Radio,
    RadioGroup
  },
  props: {
    dialogData: Object,
    model: Object
  },
  data() {
    //这里存放数据
    return {
      formDialog: false,
      rules: {}
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.initRules();
  },
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
    showDialog() {
      this.formDialog = true;
    },
    resetForm(formName) {
      this.formDialog = false;
      this.$refs[this.model].resetFields();
    },

    // 处理验证规则
    initRules() {
      this.dialogData.entity.forEach(item => {
        if (item.rules) {
          this.rules[item.key] = item.rules;
        }
      });
    },
    ok() {
      this.$refs[this.model].validate(valid => {
        if (valid) {
          this.$emit("ok", this.model);
          this.formDialog = false;
        } else {
          return false;
        }
      });
    }
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss">
//@import url(); 引入公共css类
@import "@assets/scss/form-scss.scss";
.child-dialog .el-dialog__header {
  text-align: left;
}
</style>
