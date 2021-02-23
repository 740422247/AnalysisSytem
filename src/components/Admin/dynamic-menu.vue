<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-06-01 10:08:10
 * @LastEditors: wss
 * @LastEditTime: 2020-12-31 09:40:05
-->
<template>
  <div class="menu-container asaas">
    <!-- // <div class="shrink" @click="toggleNavCollapse2">
    //   <i v-show="!isCollapse" class="el-icon-d-arrow-left"></i>
    //   <i v-show="isCollapse" class="el-icon-d-arrow-right"></i>
    // </div> -->
    <template v-for="v in menuList">
      <el-submenu
        :index="v.name"
        @click="gotoRoute2(v.name)"
        v-if="v.children && v.children.length > 0 && v.isSubstratum != true"
        :key="v.name"
      >
        <template slot="title">
          <i class="iconfont" :class="v.meta.icon"></i>
          <span>{{ v.meta.name }}</span>
        </template>
        <el-menu-item-group>
          <my-nav :menuList="v.children"></my-nav>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item
        :key="v.name"
        :index="v.name"
        @click="gotoRoute(v.name, v.isSubstratum)"
        v-else
      >
        <i class="iconfont" :class="v.meta.icon"></i>
        <span slot="title">{{ v.meta.name }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "my-nav",
  props: {
    menuList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      loadingMenu: true
    };
  },
  computed: {
    isCollapse: function() {
      return this.$store.state.isSidebarNavCollapse;
    }
  },
  methods: {
    toggleNavCollapse2() {
      this.$store.commit("toggleNavCollapse");
    },
    gotoRoute(name, isSubstratum) {
      const dqroutrt = this.$router.history.current.name;
      // console.log(1, name, this.$router.history);
      // const dqroutrt2 = this.$router.history.current.matched[2].name;
      // console.log(dqroutrt2);
      if (isSubstratum == false) {
        // if (true) {
        // this.$router.push({ name: dqroutrt2 });
      } else {
        if (name !== dqroutrt) {
          this.$router.push({ name: name });
        }
      }
    },
    gotoRoute2(name) {
      const dqroutrt = this.$router.history.current.name;
      if (name !== dqroutrt) {
        this.$router.push({ name: name });
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.menu-container {
  height: 100%;
  position: relative;
}

</style>
