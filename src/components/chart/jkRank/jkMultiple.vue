<!--
 * @Descripttion: 双行排行榜
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-25 10:18:41
 * @LastEditors: joykit
 * @LastEditTime: 2020-06-02 15:13:11
-->
<!-- jkMultiple -->
<template>
  <jkCard
    :border="config.border"
    :grid="config.grid"
    :text="config.text"
    :path="config.path"
  >
    <vue-seamless-scroll :data="_adapter('label')">
      <router-link
        :to="{
          path: _adapter('path', key) ? _adapter('path', key) : '#'
        }"
        class="item"
        v-for="(item, key) in _adapter('label')"
        :key="key"
        tag="div"
      >
        <jkTitle class="label" :text="item" />
        <jkContent
          v-for="(v, k) in config.data.value"
          :key="k"
          class="content flex align"
        >
          <jkProgress
            :type="typeProgress[k].id"
            :style="_cStyle(k)"
            :width="(v[key] / _limit('all', k)) * 100 + '%'"
          />
          <jkContent
            class="flex-shrink flex align content-right"
            :style="_rStyle(k)"
          >
            <jkNumber class="num" :number="_formatNumber(v[key])" />
            <jkContent> {{ _limit("symbol", k) }} </jkContent>
          </jkContent>
        </jkContent>
      </router-link>
    </vue-seamless-scroll>
  </jkCard>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import jkCard from "@components/base/jkCard/jkCard";
import jkTitle from "@components/base/jkTitle/jkTitle";
import jkContent from "@components/base/jkContent";
import jkProgress from "@components/base/jkProgress/jkProgress";
import jkNumber from "@components/base/jkNumber/jkNumber";
import vueSeamless from "vue-seamless-scroll";

// 组件类型
import { typeProgress } from "@config/_type.js";
// 格式化
import { formatNumber } from "@utils/formatNumber.js";
// 数据
import { qxList } from "@entity/jkRank/multipleRank.js";

export default {
  name: "jkMultiple",
  props: {
    config: {
      type: Object,
      default: () => ({
        border: true,
        grid: true,
        text: "",
        path: "",
        data: null
      })
    }
  },
  data() {
    //这里存放数据
    return {
      fontSize: 12,
      typeProgress: typeProgress
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 组件默认数据
    !this.config.data && (this.config.data = qxList);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {});
  },
  //方法集合
  methods: {
    _adapter(colum, key) {
      if (key === undefined) {
        return this.config.data[colum];
      }
      return this.config.data[colum][key];
    },
    _limit(colum, key) {
      const len = this.config.data[colum].length - 1;
      if (key >= len) {
        return this.config.data[colum][len];
      }
      return this.config.data[colum][key];
    },
    _formatNumber(number, thousandsSep, decimals, decPoint, roundtag) {
      return formatNumber(number, thousandsSep, decimals, decPoint, roundtag);
    },
    _getNumSize(v) {
      const _w =
        (this._formatNumber(this._max(v)).length * this.fontSize) / 2 +
        (this.config.data.symbol[v].length + 1) * this.fontSize;
      return _w;
    },
    _max(v) {
      return this.config.data.value[v][0];
    },
    _rStyle(v) {
      return {
        fontSize: this.fontSize + "px",
        width: this._getNumSize(v) + "px"
      };
    },
    _cStyle(v) {
      return {
        width: `calc(100% - ${this._rStyle(v).width})`
      };
    }
  },
  //监听属性 类似于data概念
  computed: {},
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
    jkCard,
    "vue-seamless-scroll": vueSeamless,
    jkTitle,
    jkContent,
    jkProgress,
    jkNumber
  }
};
</script>
<style lang="scss" scoped>
//@import 'jkSingle.scss'; //引入公共css类
.item {
  padding: 12px 0;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  border-radius: 50%;
  .num {
    text-align: right;
  }
  &:hover {
    border-radius: 10px;
    @include t(background-color, treeSelectInputBk);
  }
}
.text-right {
  text-align: right;
}
.label {
  padding: 12px 0;
}
.content:nth-of-type(1) {
  padding-bottom: 12px;
}
.jk-progress {
  margin-right: 8px;
}
</style>
