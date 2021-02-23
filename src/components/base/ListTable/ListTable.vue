<!--
 * @Descripttion: 
 * @version: 
 * @Author: joykit
 * @Date: 2019-10-30 17:34:51
 * @LastEditors: joykit
 * @LastEditTime: 2019-12-13 13:59:22
 -->
<template>
  <div class="content-body ListTable">
    <template v-if="tbody2 && thead2">
      <ul class="cotent">
        <li v-for="(item, i) in tbody2" :key="'AutoScroll' + i" :style="{ height: '29.9vh' }">
          <table>
            <thead>
              <th v-for="(t, i) in thead2" :key="'ListTable' + i">{{ t.showName }}</th>
            </thead>
            <tbody>
              <tr v-for="(l, i) in item" :key="'ListTable-listi' + i">
                <template v-for="(value, key, index) in l">
                  <td
                    :title="value.showName"
                    :key="'ListTable-listj' + index"
                  >{{ qfw(value.showName) }}</td>
                </template>
              </tr>
            </tbody>
          </table>
        </li>
        <li :style="{ height: '29.9vh' }">
          <table>
            <thead>
              <th v-for="(t, i) in thead2" :key="'ListTable' + i">{{ t.showName }}</th>
            </thead>
            <tbody>
              <tr v-for="(l, i) in tbody2[0]" :key="'ListTable-listi' + i">
                <template v-for="(value, key, index) in l">
                  <td
                    :title="value.showName"
                    :key="'ListTable-listj' + index"
                  >{{ qfw(value.showName) }}</td>
                </template>
              </tr>
            </tbody>
          </table>
        </li>
      </ul>
    </template>
  </div>
</template>
<script>
export default {
  name: "ListTable",
  components: {},
  props: {
    tbody: {
      type: Array,
      default: () => []
    },
    thead: {
      type: Object,
      default: () => {}
    },
    isHead: {
      type: String,
      default: "true"
    }
  },
  data() {
    return {
      thead2: null,
      tbody2: null
    };
  },
  mounted() {
    this.$emit("listTableDone");
  },
  methods: {
    qfw(num) {
      if (typeof num !== "number") return num;
      if (num.toString().length <= 3) return num;
      return num
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
        .split(".")[0];
    }
  },
  computed: {},
  watch: {
    thead(res) {
      this.thead2 = res;
    },
    tbody(res) {
      this.tbody2 = res;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./ListTable";
</style>
