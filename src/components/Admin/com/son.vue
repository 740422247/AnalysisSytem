<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-08-28 10:27:03
 * @LastEditors: wss
 * @LastEditTime: 2020-12-04 10:41:22
-->
<template>
  <div class="son">
    <!-- <p>SON:我father对我说“{{ data22 }}”</p> -->
    <div>
      <button @click="_revert">回复</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "son",
  // props: {
  //   data22: {
  //     type: String
  //   }
  // },
  model: {
    prop: "data22",
    event: "revert"
  },
  mounted() {
  },
  methods: {
    _revert() {
      this.$emit("revert", [12121, 34444, 21121]);
    }
  }
};
</script>
<style lang="scss" scoped>
button {
  color: lightcoral;
}
</style>
