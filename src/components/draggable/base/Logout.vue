<template>
  <div class="logout">
    <div class="logout-head" @click.stop="showBody = !showBody">
      <img
        :src="
          model.avatar ? model.avatar : require('@assets/image/headPhoto.png')
        "
        @click.stop="actionMethods('changeHeadPhoto')"
        alt
      />
      <span>{{ model.userName }}</span>
      <i class="el-icon-arrow-down" :class="{ active: showBody }"></i>
    </div>
    <div class="logout-body" :class="{ active: showBody }">
      <div
        class="menu-item"
        v-if="already && already.length > 0"
        @click="switchover()"
      >
        <i class="el-icon-sort"></i>切换到后端
      </div>
      <div class="menu-item" @click="actionMethods('editPwd')">
        <i class="el-icon-lock"></i>修改密码
      </div>
      <div class="menu-item" @click="actionMethods('logout')">
        <i class="el-icon-right logout-action"></i>退出
      </div>
    </div>
    <!-- <div class="logout-mask" v-if="showBody" @click="showBody = false"></div> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "Logout",
  props: {
    model: Object
  },
  data: () => ({
    showBody: false
    // already: null
  }),
  mounted() {
    this.init();
  },
  computed: {
    ...mapState({
      already: state => state.permission.already
    })
  },
  methods: {
    init() {
      this.close();
    },
    actionMethods(action) {
      this.showBody = false;
      this.$emit("actionMethods", action);
    },
    switchover() {
      const already = this.already;
      // console.log(already);
      // console.log(this.$router);
      // console.log(this.$route);
      if (already && already.length > 0) {
        this.$router.push({
          name: already[0]
        });
      }
    },
    close() {
      document.querySelector("html").onclick = () => {
        this.showBody = false;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.logout {
  position: relative;
  float: right;
  margin-right: 20px;
  margin-left: 40px;
  height: 70px;
  line-height: 70px;
  .logout-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  .logout-head {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      display: inline-block;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      overflow: hidden;
    }
    span {
      color: #7a94d1;
      font-size: 14px;
      margin-left: 10px;
      margin-right: 10px;
    }
    i {
      color: #7a94d1;
      transform: rotate(0);
      transition: all 0.3s ease;
      &.active {
        transform: rotate(-180deg);
      }
    }
  }
  .logout-body {
    position: absolute;
    top: 72px;
    right: 0;
    width: 150px;
    border-radius: 4px;
    z-index: 2000;
    overflow: hidden;
    height: 0;
    transition: all 0.3s ease-in-out;
    &.active {
      height: 120px;
    }
    div {
      height: 40px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background-color: #103379;
      font-size: 14px;
      color: #7a94d1;
      padding-left: 20px;
      cursor: pointer;
      &:hover {
        background-color: #1c3d80;
        color: #d2e0ff;
        .logout-action {
          border-color: #d2e0ff;
        }
      }
      i {
        margin-right: 5px;
        &.logout-action {
          border: 1px solid #7a94d1;
          border-right: 0;
          width: 5px;
          height: 15px;
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
