<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-08-25 09:17:23
 * @LastEditors: wss
 * @LastEditTime: 2020-12-28 15:26:01
-->
<template>
  <div v-if="isdd">
    <el-upload
      class="wawaw"
      v-if="formDialog"
      action="#"
      :class="{ 'disabled-my-unload': uploadDisabled }"
      list-type="picture-card"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :on-success="handleUpload"
      :http-request="uploadImg"
      :file-list="filelist"
      :auto-upload="false"
      :limit="item.sum"
      :on-exceed="handleExceed"
    >
      <i slot="default" class="el-icon-plus"></i>
      <!--  <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div> -->
    </el-upload>
    <!-- <el-dialog :visible.sync="dialogVisible" class="asdasdsad">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog> -->
  </div>
</template>

<script>
// import emitter from "element-ui/src/mixins/emitter.js";
export default {
  data() {
    return {
      isdd: false,
      imageList: [], //暂存base图片集合
      // dialogImageUrl: "",
      uploadDisabled: false,
      dialogVisible: false,
      sum: 0,
      filelist: [],
      disabled: false
    };
  },
  model: {
    prop: "dd",
    event: "revert"
  },
  mounted() {
    // console.log("ddd:", this.dd);
    this.reading();
    // this.$refs.wawaw.onSuccess(this.dd)
  },
  props: {
    keyName: {
      type: String
    },
    item: Object,
    dd: Array,
    formDialog: Boolean
  },
  methods: {
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      // console.log(file);
    },
    reading() {
      // this.filelist = this.filelist.slice().splice(0, this.filelist.length);
      this.filelist = [];
      // console.log("this.dd:", this.dd);
      const _this = this;
      if (this.dd && this.dd.length >= this.item.sum) {
        if (this.dd[0] == null) {
          this.uploadDisabled = false;
        } else {
          this.uploadDisabled = true;
        }
        // children[children.length - 1].$el.style.display = "none";
      } else {
        this.uploadDisabled = false;
      }
      if (this.dd && this.dd.length > 0) {
        this.dd.forEach((item, index) => {
          // console.log(12121);
          if (item) {
            if (typeof item === "string") {
              const obj = { name: `a${index}`, url: item };
              // _this.$set(obj, "name", `a${index}`);
              // _this.$set(obj, "url", item); //修改files里面的结构（name,url）
              // console.log("obj:", obj);
              _this.filelist.push(obj);
            } else {
              // console.log("item.url:", item.url);
              _this.filelist.push(item.url);
            }
          }
          // this.$emit("revert", _this.filelist);
          // this.$emit("change", _this.filelist);
          // this.dd = this.filelist;
          // console.log("_this.filelist:", _this.filelist);
        });
      }
      // console.log(56456);
      this.isdd = true;
    },
    uploadImg(f) {
      // console.log("f:", f);
    },
    deleteFilelist() {
      if (this.filelist && this.filelist.length > 0) {
        this.filelist = [];
        // this.filelist.splice(0, this.filelist.length);
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.item.sum} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${fileList.length} 个文件`
      );
    },
    handleChange(file, fileList) {
      this.handleImageList(fileList);
    },
    handleRemove(file, fileList) {
      this.handleImageList(fileList, "delete");
    },
    handleUpload(file, fileList) {
      this.handleImageList(fileList);
    },

    async handleImageList(fileList, type) {
      // console.log(fileList);
      this.sum = fileList.length;
      // const children = this.$refs.wawaw.$children;
      if (this.sum >= this.item.sum) {
        this.uploadDisabled = true;
        // children[children.length - 1].$el.style.display = "none";
      } else {
        this.uploadDisabled = false;
      }

      const _this = this;
      const imageList = [];
      if (type === "delete") {
        // this.$emit("input", null);
        this.$emit("revert", fileList);
        this.$emit("change", fileList);
        this.dispatch("ElFormItem", "el.form.change", fileList);
      } else {
        for (let i = 0; i < fileList.length; i++) {
          if (fileList[i].status === "success") {
            imageList.push(fileList[i].url);
          } else {
            const b64 = await _this.getBase64(fileList[i].raw);
            imageList.push(b64);
          }
        }
        // fileList.length > 0 &&
        //   fileList.forEach(async item => {
        //     if (item.status === "success") {
        //       imageList.push(item.url);
        //     } else {
        //       await _this.getBase64(item.raw).then(res => {
        //         console.log("转base64:", res);
        //         imageList.push(res);
        //       });
        //     }
        //   });
        this.$emit("revert", imageList);
        this.$emit("change", imageList);
        // this.$emit("input", imageList.join("^&^"));
        // this.$emit("opload", imageList, this.keyName);
        this.dispatch("ElFormItem", "el.form.change", imageList);
      }
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
    }
  },
  watch: {
    formDialog(i) {
      if (i) this.reading();
      else this.deleteFilelist();
      // console.log("i:", i);
      // console.log(this.filelist);
    },
    dd(a) {
      console.log(a);
      // this.dialogImageUrl = a;
     this.reading()
      // this.deleteFilelist();
      // this.reading();
    },
    filelist(d) {
      // this.fileList = [];
      // console.log(d);
    }
  }
};
</script>
<style scope>
.wawaw {
  width: 202px;
}
.disabled-my-unload .el-upload--picture-card {
  display: none !important;
}
.el-upload--picture-card {
  margin: 0 8px 8px 0;
}
.el-upload-list__item-thumbnail {
  height: 148px !important;
  width: 148px !important;
}
</style>
