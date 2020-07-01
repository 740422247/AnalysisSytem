

<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
// 页面弃用,待删除
// 页面弃用,待删除
// 页面弃用,待删除
// 页面弃用,待删除
// 页面弃用,待删除
import Vue from "vue";
import { mapMutations, mapGetters, mapActions } from "vuex";
// import { Button } from "element-ui";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

export default {
  name: "home",
  data() {
    return {};
  },
  created() {
    // this.$store.dispatch("actTag");
  },
  mounted() {},
  computed: {
    ...mapGetters({
      pos: "getNewsPos",
      menu: "getMenu"
    })
  },
  methods: {},
  watch: {},
  components: {
    // Button
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 200vh;
}
</style>
