<!--  -->
<template>
  <div class="child-dialog">
    <Dialog
      :title="dialogData.title"
      :visible.sync="formDialog"
      append-to-body
      :modal="true"
      :fullscreen="dialogData.fullscreen ? dialogData.fullscreen : false"
      :close-on-click-modal="false"
      :width="dialogData.width ? dialogData.width : '500px'"
      :top="dialogData.top ? dialogData.top : '15vh'"
    >
      <div ref="aaa" class="scrollbar">
        <!-- //控制显示区域的高度 -->
        <el-scrollbar style="height:100%">
          <Form
            :ref="model"
            :label-position="dialogData.labelPosition"
            :model="model"
            :rules="rules"
            class="demo-ruleForm"
            :class="{'demo-form-inline':dialogData.isInline}"
          >
            <template v-for="item in dialogData.entity">
              <template v-if="!item.delete">
                <FormItem
                  :key="item.key"
                  v-show="!item.hidden"
                  :label="item.label"
                  :prop="item.key"
                  :class="item.className"
                  :required="item.required"
                  :readonly="item.readonly"
                  :label-width="
                    dialogData.labelWidth ? dialogData.labelWidth : '80px'
                  "
                >
                  <Select
                    v-if="item.type === 'select'"
                    v-model="model[item.key]"
                    :multiple="item.multiple"
                  >
                    <Option
                      v-for="opt in item.options"
                      :key="opt.value"
                      active-value="string"
                      :label="opt.label"
                      :value="opt.value"
                    ></Option>
                  </Select>
                  <my-upload
                    v-else-if="item.type === 'uploader'"
                    :keyName="item.key"
                    :item="item"
                    :formDialog.sync="formDialog"
                    ref="uploadxls"
                    v-model="model[item.key]"
                  ></my-upload>
                  <el-switch
                    v-else-if="item.type === 'switch'"
                    v-model="model[item.key]"
                    @change="change(item)"
                    active-value="true"
                    inactive-value="false"
                  >
                  </el-switch>
                  <el-checkbox-group
                    v-else-if="item.type === 'checkbox'"
                    v-model="model[item.key]"
                  >
                    <!-- <template v-if="item.options && item.options.length > 0"> -->
                    <el-checkbox
                      v-for="opt in item.options"
                      @change="change(item)"
                      :key="opt.value"
                      :label="opt.label"
                    ></el-checkbox>
                    <!-- </template> -->
                  </el-checkbox-group>

                  <DatePicker
                    v-else-if="item.type === 'datetime' || item.type === 'date'"
                    v-model="model[item.key]"
                    :type="item.type"
                    :placeholder="
                      item.type === 'date' ? '选择日期' : '选择时间'
                    "
                  ></DatePicker>

                  <!-- 该图片上传仅支持base64和一张图片,其他需自行扩展 -->
                  <el-upload
                    class="avatar-uploader"
                    v-else-if="item.type === 'uploader2'"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-change="handleChange"
                    :show-file-list="false"
                    :auto-upload="item.autoUpload"
                  >
                    <template>
                      <div
                        class="imgLi"
                        v-for="(imgSrc, index) in imageUrlArr"
                        :key="imgSrc.id"
                        @click="abc(index)"
                      >
                        <i
                          class="el-icon-delete delete"
                          @click.stop="deleteIco(imageUrlArr, index)"
                        ></i>
                        <img class="avatar" :src="imgSrc" />
                      </div>
                    </template>
                    <div class="addIcon">
                      <i
                        v-if="item.sum > imageUrlArr.length"
                        class="el-icon-plus avatar-uploader-icon"
                      ></i>
                    </div>
                  </el-upload>
                  <RadioGroup
                    v-else-if="item.type === 'radio'"
                    v-model="model[item.key]"
                  >
                    <Radio
                      v-for="opt in item.options"
                      :key="opt.value"
                      :label="opt.value"
                      >{{ opt.label }}</Radio
                    >
                  </RadioGroup>

                  <Input
                    v-else
                    v-model="model[item.key]"
                    auto-complete="off"
                    :placeholder="
                      item.placeholder ? item.placeholder : item.label
                    "
                    :type="item.type ? item.type : 'text'"
                    :disabled="item.disabled"
                    rows="3"
                  />
                </FormItem>
              </template>
            </template>
          </Form>
        </el-scrollbar>
      </div>
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
import MyUpload from "./MyUpload";
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
    RadioGroup,
    MyUpload
  },
  props: {
    dialogData: {
      type: Object
    },
    modelDialog: {
      type: Object
    },
    model: {
      type: Object
    }
  },
  data() {
    //这里存放数据
    return {
      formDialog: false,
      uploaderText: "",
      fileList: [],
      imgIndex: 0, //替换下标
      imageUrlArr: [],
      rules: {},
      arr: [],
      test: "dklasdakjdkl",
      check: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    dialogData(res) {
      this.initRules();
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.initRules();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.dialogData.entity &&
    //   this.dialogData.entity.forEach((item, index) => {
    //     if (item.type === "uploader") this.arr.push(`${item.key}$`);
    //   });
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {},
  //方法集合
  methods: {
    // 变化触发方法
    change(item) {
      this.initRules();
      // if (item.expression) {
      //   item.expression(this.model, this.model[item.key], this.controlForms);
      // }
      //多级联动显示需要从新遍历
      // const keys = [];
      // this.dialogData.entity.forEach(item => {
      //   if (item.expression) {
      //     if (!keys.includes(item.key)) {
      //       item.expression(
      //         this.model,
      //         this.model[item.key],
      //         this.controlForms
      //       );
      //       keys.push(item.key);
      //     }
      //   }
      // });
      // this.$emit("change", this.getModelData());
    },
    // 控制表单
    controlForms(keys, flat) {
      keys.forEach(key => {
        this.dialogData.entity[
          this.dialogData.entity.findIndex(item => item.key === key)
        ].hidden = flat;
      });
    },
    abc(index) {
      this.imgIndex = index;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // handleChange(file, fileList) {
    //   console.log("file", file);
    //   if (fileList.length > 0) {
    //     this.hasFmt = true;
    //   }
    //   this.getBase64(file.raw).then(res => {
    //     if (this.imageUrlArr.length > this.imgIndex) {
    //       this.imageUrlArr.splice(this.imgIndex, 1, res);
    //     } else {
    //       this.imageUrlArr.push(res);
    //     }
    //     this.model.portrait = this.imageUrlArr;
    //     this.dispatch("ElFormItem", "el.form.change", this.imageUrlArr);
    //     console.log(this.model.portrait[0]);
    //   });
    // },
    // 获取图片转base64
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    deleteIco(data, index) {
      this.imageUrlArr.splice(index, 1);
    },
    showDialog(typeName) {
      this.typeName = typeName;
      this.formDialog = true;
    },
    resetForm(formName) {
      // this.$refs.uploadxls.ABC();
      // this.$refs.uploadxls.forEach(item => {
      //   console.log('111',item);
      //   item.ABC();
      // });
      // console.log(this.$refs.uploadxls[0].filelist);
      // this.$refs.uploadxls[0].filelist = [];
      // console.log(this.$refs.uploadxls[0].filelist);
      this.$refs[this.model].resetFields();
      this.formDialog = false;
    },
    // elementUI mixins - emitter 中拷贝的
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    // 处理验证规则
    initRules() {
      if (!this.dialogData.entity) return;
      const keys = [];
      this.dialogData.entity.forEach(item => {
        if (item.rules) {
          this.rules[item.key] = item.rules;
        }
        if (item.expression) {
          if (!keys.includes(item.key)) {
            item.expression(
              this.model,
              this.model[item.key],
              this.controlForms
            );
            keys.push(item.key);
          }
        }
      });
      // const reArr = this.dialogData.entity;
      // reArr.reverse().forEach(item => {
      //   if (item.expression) {
      //     item.expression(this.model, this.model[item.key], this.controlForms);
      //   }
      // });
    },
    opload(a, keyName) {
      console.log(this.arr);
      console.log(keyName);
      // this.model.uploader = 123;
      // this.model[`${keyName}$`] = a;
      this.model[`${keyName}$`] = a;
    },
    ok() {
      // const imageUrlArr = { imageUrlArr: this.imageUrlArr };
      // let bb = this.model.portrait && this.model.portrait.split(",");
      // this.model.portrait = this.imageUrlArr;
      // this.$refs[this.model].validate(valid => {})
      // debugger
      this.$refs[this.model].validate(valid => {
        if (valid) {
          this.$emit("ok", {
            model: this.model,
            typeName: this.typeName
          });
          // this.$refs.uploadxls.filelist = [];
          this.formDialog = false;
        } else {
          return false;
        }
        // this.$refs.uploadxls.ABC();
        // this.$refs.uploadxls.forEach(item => {
        //   item.ABC();
        // });
      });
    }
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scope>
//@import url(); 引入公共css类
// @import "@assets/scss/form-scss.scss";
.child-dialog .el-dialog__header {
  text-align: left;
}
.avatar-uploader {
  text-align: left;
}
.avatar-uploader .el-upload {
  position: relative;
  // overflow: hidden;
  // border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
}
.addIcon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  display: inline-block;
  float: left;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  width: 50px;
  height: 50px;
  color: #8c939d;
  font-size: 28px;
  line-height: 50px;
  text-align: center;
}
.avatar {
  display: block;
  width: 50px;
  height: 50px;
}
.delete {
  position: absolute;
  top: 0;
  right: -20px;
  color: red;
}
.imgLi {
  display: inline-block;
  position: relative;
  margin-right: 30px;
  float: left;
}
.scrollbar {
  // height:min-content;
  max-height: 500px;
  overflow: auto;
}
// .el-scrollbar__wrap {
//   overflow-x: hidden;
// }
.demo-form-inline {
  margin-bottom: 35px !important;
}
.dialog-footer {
  text-align: center;
}
</style>
