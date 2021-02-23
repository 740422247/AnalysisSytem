<template>
  <!-- 商品详情界面 -->
  <div>
    <!-- 面包屑导航区域 -->

    <!-- 卡片视图区域 -->
    <div>2112122121</div>
    <el-card>
      <div slot="header">
        <span>基本信息</span>
      </div>
      <el-form
        label-width="120px"
        :model="kfForm"
        ref="kfFormRef"
        :rules="kfFormRules"
      >
        <!-- <el-form-item label-width="0px" prop="name">
          <el-input placeholder="客服名称" v-model="kfForm.name">
            <template slot="prepend">客服名称</template>
          </el-input>
        </el-form-item>
        <el-form-item label-width="0px" prop="wx_number">
          <el-input placeholder="微信号" v-model="kfForm.wx_number">
            <template slot="prepend">微信号码</template>
          </el-input>
        </el-form-item> -->
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="kfForm.type">
            <el-checkbox label="美食厅线上活动"></el-checkbox>
            <el-checkbox label="地推活动"></el-checkbox>
            <el-checkbox label="线下主题活动"></el-checkbox>
            <el-checkbox label="单纯品牌曝光"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="客服头像上传：" prop="headImg">
          <el-upload
            :action="uploadURL"
            list-type="picture-card"
            :class="{ hide: hideUpload }"
            name="files"
            :on-preview="handlePreview"
            :on-remove="remove"
            :on-change="uploadChange"
            :http-request="headUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="previewVisible">
            <img width="100%" :src="previewPath" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="微信二维码上传：" prop="codeImg">
          <el-upload
            :action="uploadURL"
            list-type="picture-card"
            :class="{ hide: hideCode }"
            name="files"
            :on-preview="codePreview"
            :on-remove="codeRemove"
            :on-change="codeChange"
            :http-request="codeUpload"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="codeVisible">
            <img width="100%" :src="codePath" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="certain">确 定</el-button>
          <el-button type="primary" @click="clearAll">重 置</el-button>
        </el-form-item>
      </el-form>
      <div class="father">
        <p>DAD:{{ sendData }}</p>
        <son v-model="sendData"></son>
      </div>
    </el-card>
  </div>
</template>

<script>
import son from "./son";
export default {
  name: "test",
  components: { son },
  data() {
    return {
      sendData: "龟儿子快回家吃饭",
      // 上传图片的URL地址
      uploadURL: "",
      previewPath: "",
      previewVisible: false,
      codePath: "",
      codeVisible: false,
      hideUpload: false,
      hideCode: false,
      limitCount: 1,
      limitCode: 1,
      headImg: [], //头像
      wxImg: [], //微信二维码
      kfForm: {
        name: "",
        wx_number: "",
        type: []
      }, //分佣弹框的表单对象
      // 表单校验规则
      kfFormRules: {
        name: [
          { required: true, message: "请输入客户专员名称", trigger: "blur" }
        ],
        wx_number: [
          { required: true, message: "请输入客服专员微信号", trigger: "blur" }
        ],
        type: [{ required: true, message: "xxxxx", trigger: "blur" }],
        headImg: [
          { required: true, message: "请上传客服头像", trigger: "change" }
        ],
        codeImg: [
          { required: true, message: "请上传微信二维码", trigger: "change" }
        ]
      },
      headFile: "",
      headFileList: "",
      codeFile: "",
      codeFileList: ""
    };
  },
  methods: {
    headUpload(params) {
      let param = new FormData();
      param.append("files", params.file);
    },
    codeUpload(params) {
      let param = new FormData();
      param.append("files", params.file);
    },
    // 处理图片预览效果
    handlePreview(file) {
      this.previewPath = file.url;
      this.previewVisible = true;
    },
    remove(file, fileList) {
      if (fileList.length == 0) {
        this.kfFormRules.headImg = [
          { required: true, message: "请上传微信头像", trigger: "change" }
        ];
      }
      this.hideUpload = fileList.length >= this.limitCount;
    },
    uploadChange(file, fileList) {
      this.headFile = file;
      this.headFileList = fileList;
      if (fileList.length == 1) {
        let { headImg, ...data } = this.kfFormRules;
        this.kfFormRules = data;
      }
      this.$refs.kfFormRef.clearValidate("headImg");
      this.hideUpload = fileList.length >= this.limitCount;
    },
    // 处理图片预览效果
    codePreview(file) {
      this.codePath = file.url;
      this.codeVisible = true;
    },
    codeRemove(file, fileList) {
      if (fileList.length == 0) {
        this.kfFormRules.codeImg = [
          { required: true, message: "请上传微信二维码", trigger: "change" }
        ];
      }
      this.hideCode = fileList.length >= this.limitCode;
    },
    codeChange(file, fileList) {
      this.codeFile = file;
      this.codeFileList = fileList;
      console.log(this.kfFormRules);
      if (fileList.length == 1) {
        let { codeImg, ...data } = this.kfFormRules;
        this.kfFormRules = data;
        console.log(codeImg, data);
        console.log(this.kfFormRules);
      }
      // this.$refs.kfFormRef.clearValidate("codeImg");
      this.hideCode = fileList.length >= this.limitCode;
    },
    certain() {
      console.log("dd", this.kfForm);
      this.$refs.kfFormRef.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    clearAll() {
      this.$refs.kfFormRef.resetFields();
      if (this.headFileList.length > 0) {
        this.headFileList.splice(0, 1);
        this.remove(this.headFile, this.headFileList);
      }
      if (this.codeFileList.length > 0) {
        this.codeFileList.splice(0, 1);
        this.codeRemove(this.codeFile, this.codeFileList);
      }
    }
  },
  mounted() {},
  watch: {
    sendData(a) {
      console.log("a:", a);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form-item {
  display: block;
  width: 100%;
  text-align: left;
}
.writeBox {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 20px;
}
.el-row {
  width: 30%;
  margin-right: 10px;
  margin-bottom: 8px;
}
.el-col {
  white-space: nowrap;
}
.el-form-item {
  .el-input {
    width: 400px;
    margin-right: 10px;
  }
}
.el-checkbox {
  width: 160px;
  float: left;
}
</style>
