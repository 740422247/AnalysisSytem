<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-08-07 09:20:12
 * @LastEditors: wss
 * @LastEditTime: 2020-12-31 15:10:09
-->
<!--  -->
<template>
  <div class="">
    <el-alert
      title="你没有该模块的权限"
      type="error"
      :closable="false"
      effect="dark"
    >
    </el-alert>
    <el-button type="success" @click="goBack">
      <!-- <router-link to="/interfaceIndex">返回</router-link> -->
      返回
    </el-button>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goBack() {
      const already = this.$store.state.permission.already;
      // console.log(already);
      // console.log(this.$router);
      // console.log(this.$route);
      if (already.length === 0) {
        // this.$message({
        //   type: "error",
        //   message: "非法跳转,你不含任何管理权限!正在跳转到普通用户"
        // });
        // this.$store.getters['childs/getCurChildId']
        const resourceId = this.$store.getters["user/getResourceTemplate"][0]
          .resourceTemplate;
        // setTimeout(() => {
          this.$router.push({
            name: "pageDetail",
            query: { id: resourceId }
          });
        // }, 1000);
      } else {
        this.$router.push({
          name: already[0]
        });
      }
    }
  },
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
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
