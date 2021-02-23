<template>
  <div>
    <aside class="aside_log" v-show="message.hint!=-1">
      <div class="content_log">{{message.hintText}}</div>
      <div class="roger">
        <div @click="hint()">知道了</div>
      </div>
      <div v-if="fromSister" class="alert" v-html="fromSister"></div>

      <!-- <button @click="messageSister" class="btn">给妹妹发消息</button> -->
    </aside>
  </div>
</template>

<script>
import { eventBus } from "../../main";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "message",
  data() {
    return {
      fromSister: "",
      localCount: 2
    };
  },
  computed: {
    ...mapState({
      message: state => state.message.message
    })
  },
  mounted() {},
  methods: {
    hint() {
      this.$store.commit("update", {
        hint: -1,
        hintText: "修改提示2",
        time:1000
      });
      // this.$store.commit("hint");
    }
  },
  created() {},
  watch: {
    // message: {
    //   handler: function(val, oldVal) {
    //     console.log('是否执行这里测试')
    //     // this.$store.updateAsync("updateAsync", {
    //     //   amount: 10
    //     // });
    //   },
    //   deep: true
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped lang="scss">
// @import "../scss/variable.scss";
[v-cloak] {
  display: none !important;
}
// 提示
.aside_log {
  position: fixed;
  bottom: 15px;
  width: 400px;
  margin-left: -200px;
  background-color: rgba(24, 31, 86, 1);
  color: #fff;
  min-height: 50px;
  vertical-align: middle;
  z-index: 99999999;
  left: 50%;
  padding: 5px 10px;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0px, 0px, 10px, rgba(0, 0, 0, 0.2);
  .content_log {
    padding-right: 50px;
    text-align: justify;
  }
  .roger {
    color: #94cf7a;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: hidden;
    width: 50px;
    > div {
      position: absolute;
      top: 50%;
      margin-top: -10px;
      z-index: 100;
      cursor: pointer;
    }
  }
}
</style>
