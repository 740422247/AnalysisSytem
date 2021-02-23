<template>
  <div class="group-forms-container">
    <div
      class="group-item"
      :class="{ active: flag.some((f) => f === index) }"
      v-for="(item, index) in entity"
      :key="item.key"
    >
      <h3 @click="flod(index)">{{ item.label }}</h3>
      <edit-forms
        :filterEntity="item.children"
        :filterModel="model"
        :ref="'result' + index"
        @change="change"
        @btnClick="btnClick"
      ></edit-forms>
    </div>
  </div>
</template>
<script>
import EditForms from "./filterEntity";
export default {
  components: { EditForms },
  props: {
    entity: Array,
    model: Object,
  },
  data: () => ({
    flag: [0],
  }),
  methods: {
    init: () => {
      this.entity = this.entity.map((item) => ({ ...item, isFlod: true }));
    },
    change(model) {
      this.$emit("change", model);
    },

    flod(index) {
      const i = this.flag.findIndex((f) => f === index);
      if (i >= 0) {
        this.flag.splice(i, 1);
      } else {
        this.flag.push(index);
      }
    },
    btnClick(model) {
      this.$emit("btnClick", model);
    },
    doRules() {
      const timer = window.setTimeout(() => {
        window.clearTimeout(timer);
        return this.entity.every((item, index) => {
          return this.$refs[`result${index}`][0].getResult();
        });
      }, 500);
    },
  },
};
</script>

<style lang="scss">
.group-item {
  overflow: hidden;
  height: auto;
  max-height: 30px;
  transition: max-height 0.5s ease;
  &.active {
    max-height: 700px;
    transition: max-height 0.5s ease;
    h3 {
      &::after {
        transform: rotate(45deg);
        top: 14px;
      }
    }
  }
  h3 {
    padding: 10px 0;
    cursor: pointer;
    text-align: left;
    position: relative;
    &:after {
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      border-right: 2px solid #ddd;
      border-bottom: 2px solid #ddd;
      transform: rotate(-45deg);
      transition: all 0.3s ease-in-out;
      position: absolute;
      right: 10px;
      top: 12px;
    }
  }
}
</style>
