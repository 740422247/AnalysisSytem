<template>
  <div class="api-set-content" v-if="model.type">
    <!-- {{model.text}} -->
    <component
      :style="model.style"
      :is="model.type.split(':')[0]"
      :type="model.type.split(':')[1]"
      :class="model.className"
      :config="data.qxList"
    ></component>
  </div>
</template>
<script>
import { components } from "@config/config.js";

export default {
  name: "ApiSetContent",
  components: {
    ...components
  },
  props: {
    model: { type: Object }
    // data1: { type: Object }
  },
  data: () => ({
    type: "",
    data: {}
  }),
  watch: {
    model() {
      // this.editType();
      // this.editData();
    }
  },
  mounted() {
    // this.editType();
  },
  methods: {
    async editType() {
      // this.type = this.model.type;
      // this.data = await import(
      //   `@entity/${this.type.split(":")[0]}/${this.type.split(":")[1]}.js`
      // );
    }
    // editData(){
    //   this.data = this.model.data;
    // }
  }
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
