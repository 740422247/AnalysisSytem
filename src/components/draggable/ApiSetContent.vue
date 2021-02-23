<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-09 16:44:11
 * @LastEditors: wss
 * @LastEditTime: 2020-07-14 15:11:00
-->
<template>
  <div class="api-set-content" v-if="model.type">
    <!-- {{model.text}} -->
    <img
      :src="model.componentImg"
      v-if="model.componentImg"
      class="component-img"
      alt
    />

    <component
      v-if="!model.componentImg"
      :style="model.style"
      :class="model.className"
      :is="model.type.split(':')[0]"
      :type="model.type.split(':')[1]"
      isRefresh
      :config="model"
    ></component>
    <!-- :config="data.qxList" -->
  </div>
</template>
<script>
import { components } from "@config/config.js";

export default {
  name: "ApiSetContent",
  components: {
    ...components,
  },
  props: {
    model: { type: Object },
    // data1: { type: Object }
  },
  data: () => ({
    type: "",
    data: {},
  }),
  watch: {
    // model(a,v) {
    // console.log(a);
    // this.editType();
    // this.editData();
    // }
  },
  mounted() {
    this.$nextTick(() => {});
    // this.editType();
  },
  methods: {
    async editType() {
      // this.type = this.model.type;
      // this.data = await import(
      //   `@entity/${this.type.split(":")[0]}/${this.type.split(":")[1]}.js`
      // );
    },
    // editData(){
    //   this.data = this.model.data;
    // }
  },
};
</script>
<style lang="scss" scoped>
.api-set-content {
  @include t(background, "k0");
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin: 0 50px;
}
</style>
