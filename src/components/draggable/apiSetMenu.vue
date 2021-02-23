<template>
  <div class="api-set-menu">
    <div class="api-set-title">基础组件：</div>
    <div
      class="menu-item"
      v-for="(item,index) in menu"
      :key="item.type + index"
      @click="choice(item)"
      style="max-height:300px;overflow:hidden;"
    >
      <!-- <img :src="item.componentImg" v-if="item.componentImg" class="component-img" alt />
      <component
        v-if="!item.componentImg"
        :is="item.type.split(':')[0]"
        :type="item.type.split(':')[1]"
        :config="{text:item.text}"
      ></component>-->
      <div>{{item.text}}</div>
      <div class="menu-title">{{item.text}}</div>
    </div>
  </div>
</template>
<script>
// import { components } from "@config/config.js";

export default {
  name: "ApiSetMenu",
  components: {
    // ...components,
  },
  props: {
    menu: { type: Array },
  },
  // mounted() {
  //   this.init();
  // },
  methods: {
    choice(model) {
      this.$emit("choice", model);
    },
  },
};
</script>
<style lang="scss" scoped>
.api-set-menu {
  // @include t(background, "k0");
  .api-set-title {
    text-align: left;
    padding-left: 15px;
  }
  .menu-item {
    position: relative;
    padding: 15px;
    cursor: pointer;
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
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      opacity: 0;
      border: 1px dashed #dedede;
    }
    &:hover .menu-title {
      opacity: 1;
    }
  }
}
</style>
