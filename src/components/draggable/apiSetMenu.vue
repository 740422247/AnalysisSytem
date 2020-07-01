<template>
  <div class="api-set-menu">
    <div class="api-set-title">基础组件：</div>
    <div
      class="menu-item"
      v-for="(item,index) in menu"
      :key="item.type + index"
      @click="choice(item)"
    >
    <div>
      {{item.type}}
    </div>
      <!-- <img :src="require('@apiPicture/' + item.imgName)" alt /> -->
      <!-- <img src="@apiPicture/scrollBar.jpg" alt /> -->
      <div class="menu-title">{{item.text || item.type}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ApiSetMenu",

  props: {
    menu: { type: Array }
  },
  // mounted() {
  //   this.init();
  // },
  methods: {
    choice(model) {
      this.$emit("choice", model);
    }
  }
};
</script>
<style lang="scss" scoped>
.api-set-menu {
  .api-set-title {
    text-align: left;
    padding-left: 15px;
  }
  .menu-item {
    position: relative;
    padding: 15px;
    img {
      max-width: 100%;
    }
    .menu-title {
      display: flex;
      color: #fff;
      background: rgba(0, 0, 0, 0.3);
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 15px;
      left: 15px;
      right: 15px;
      bottom: 15px;
      opacity: 0;
      border: 1px dashed #dedede;
    }
    &:hover .menu-title {
      opacity: 1;
    }
  }
}
</style>
