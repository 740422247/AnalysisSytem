<!--
 * @Descripttion:
 * @version:
 * @Author: joykit
 * @Date: 2020-02-11 14:46:59
 * @LastEditors: joykit
 * @LastEditTime: 2020-06-04 15:38:39
 -->
<template>
  <div class="home">
    <div v-for="i in [1,3,45,566,6]" :key="i">首页</div>
    <Button type="success">
      <router-link to="/jurisdiction/user">管理界面</router-link>
    </Button>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { Button } from "element-ui";


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
    ...mapGetters({})
  },
  methods: {

  },
  watch: {},
  components: {
    Button
  }
};
</script>

<style lang="scss" scoped>
.home {
  margin-top: 20px;
  overflow: hidden;
}
</style>
