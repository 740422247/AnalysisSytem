<!--
 * @Descripttion: 下拉框
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-20 09:31:32
 * @LastEditors: joykit
 * @LastEditTime: 2020-05-26 16:28:58
-->
<!-- jkSelect -->
<template>
  <div class="jkSelect">
    <div v-if="type === 'treeSelect'" class="treeSelect">
      <span class="label">{{ label }}</span>
      <treeselect
        :clearValueText="'清空'"
        :searchable="false"
        :multiple="false"
        :show-count="true"
        :options="options"
        :placeholder="placeholder"
        v-model="vModel1"
        @select="select"
      />
    </div>
    <div v-else-if="type === 'yearSelect'" class="yearSelect" ref="Select">
      <button type="button" :class="{ active: xiala }" @click="xiala = !xiala">
        <span>{{ vModel1 }}</span>
        <img :src="ico" alt />
      </button>
      <transition name="fade">
        <div class="xiala" v-show="xiala">
          <img class="sanjiao" :src="ico2" alt />
          <ul>
            <li v-for="(i, k) in _list" :key="'year' + k" @click="select(i)">
              {{ i["label"] }}
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <div
      v-else-if="type === 'simpleSelect'"
      class="simpleSelect"
      ref="simpleSelect"
    >
      <div class="ss">
        <div
          class="input button button-hover"
          :class="{ sploosh: !isShow, active: isShow }"
          @click="isShow = !isShow"
        >
          <input
            type="text"
            readonly
            ref="Getsxqkb"
            class="button"
            v-model="vModel1"
          />
          <img :src="ico" alt />
        </div>
        <ul v-if="isShow">
          <li
            @click="select(t)"
            v-for="(t, i) in _list"
            :key="'search' + i"
            :oid="t.id"
          >
            {{ t.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { list, year, simple } from "@entity/selectList.js";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "jkSelect",
  props: {
    type: {
      type: String,
      default: "treeSelect"
    },
    options: {
      type: [Array, Object],
      default: () => null
    },
    placeholder: {
      type: String,
      default: "请选择..."
    },
    label: {
      type: String,
      default: ""
    },
    model: {
      type: [String, Object, Array],
      default: null
    }
  },
  data() {
    //这里存放数据
    return {
      isShow: false,
      vModel1: this.model, // 控制输入框变化
      xiala: false,
      ico: require("@static/image/xiala.png"),
      ico2: require("@static/image/sanjiao.png")
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    document.addEventListener("click", e => {
      if (!(this.$refs.Select && this.$refs.Select.contains(e.target))) {
        this.xiala = false;
      }
      if (
        !(this.$refs.simpleSelect && this.$refs.simpleSelect.contains(e.target))
      ) {
        this.isShow = false;
      }
    });
  },
  //方法集合
  methods: {
    select(node, instanceId) {
      switch (this.type) {
        case "treeSelect":
          break;
        case "yearSelect":
          this.vModel1 = node.label;
          this.xiala = false;
          break;
        case "simpleSelect":
          this.vModel1 = node.label;
          this.isShow = false;
          break;
        default:
          break;
      }
      this.$emit("happening", this.type, node);
    }
  },
  //监听属性 类似于data概念
  computed: {
    _list() {
      let res = null;
      if (this.data) {
        res = this.data;
      } else {
        switch (this.type) {
          case "treeSelect":
            res = list;
            break;
          case "yearSelect":
            res = year;
            break;
          case "simpleSelect":
            res = simple;
            break;
          default:
            break;
        }
      }
      return res;
    }
  },
  //监控data中的数据变化
  watch: {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  beforeRouteEnter(to, from, next) {
    next(vm => {});
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  //import引入的组件需要注入到对象中才能使用
  components: {
    Treeselect
  }
};
</script>
<style lang="scss" scoped>
@import "jkSelect.scss"; //引入公共css类
</style>
