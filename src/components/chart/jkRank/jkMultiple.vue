<!--
 * @Descripttion: 双行排行榜
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-25 10:18:41
 * @LastEditors: wss
 * @LastEditTime: 2021-01-04 10:21:17
-->
<!-- jkMultiple -->
<template>
  <jkCard
    :border="config.border"
    :grid="config.grid"
    :text="config.text"
    :path="config.path"
    :selectData="config && config.selectData"
  >
    <vue-seamless-scroll :data="_adapter('label')">
      <!-- <router-link
        :to="{
          path: _adapter('path', key) ? _adapter('path', key) : '#'
        }"
        class="item"
        v-for="(item, key) in _adapter('label')"
        :key="key"
        tag="div"
      > -->
      <div
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
            :style="_cStyle2(k)"
            :width="(v[key] / maxImum(k)) * 100 + '%'"
          />
          <jkContent
            class="flex-shrink flex align content-right"
            :style="_rStyle2(k)"
          >
            <jkNumber class="num" :number="_formatNumber(v[key], k)" />
            <jkContent>{{ _limit("symbol", k) }}</jkContent>
          </jkContent>
        </jkContent>
      </div>
      <!-- </router-link> -->
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
import { format } from "@/until/format/format.js";
// 数据
import { qxList } from "@entity/jkRank/multipleRank.js";

export default {
  name: "jkMultiple",
  props: {
    // 2020/07/21修改
    isRefresh: {
      type: Boolean,
    },
    // 2020/07/21修改
    config: {
      type: Object,
      default: () => ({
        border: true,
        grid: true,
        text: "",
        path: "",
        data: null,
      }),
    },
  },
  data() {
    //这里存放数据
    return {
      fontSize: 12,
      widthRq: 60,
      typeProgress: typeProgress,
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 组件默认数据
    // console.log("ddddd", this.config.data);
    // this._rStyle2();
    // var sum = 0;
    // for (var i = 0; i < this.config.data.value[0].length; i++) {
    //   sum = sum + this.config.data.value[0][i];
    // }
    // console.log(sum);
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
    maxImum(key) {
      return Math.max.apply(null, this.config.data.value[key]);
    },
    _limit(colum, key) {
      const len = this.config.data[colum].length - 1;
      if (key >= len) {
        return this.config.data[colum][len];
      }
      return this.config.data[colum][key];
    },
    _formatNumber(number, k, thousandsSep, decimals, decPoint, roundtag) {
      // 处理设置好的数字格式化位数，此处不可能存在文本类型
      const num = (this.config.pageForms && this.config.pageForms.value && this.config.pageForms[this.config.pageForms.value[k]] === 'N0S') ? 0 : 2;
      return formatNumber(number, thousandsSep, num, decPoint, roundtag);
    },
    _getNumSize(v) {
      const _w =
        (this._formatNumber(this._max(v)).length * this.fontSize) / 2 +
        (this.config.data.symbol[v].length + 1) * this.fontSize;
      return _w;
    },
    _max(v) {
      return this.config.data.value[v][0] / 2;
    },
    _rStyle2() {
      const maxSu = this._formatNumber(
        Math.max.apply(
          null,
          this.config.data.value.map((item) => {
            return Math.max.apply(null, item);
          })
        )
      );
      const dwMax = Math.max(
        ...this.config.data.symbol.map((itt) => itt.length)
      );
      const _width =
        (maxSu.length / 2) * this.fontSize + dwMax * this.fontSize + 5; //-5修正长度
      this.widthRq = _width;
      return {
        fontSize: this.fontSize + "px",
        width: _width + "px",
      };
    },
    _rStyle(v) {
      return {
        fontSize: this.fontSize + "px",
        width: this._getNumSize(v) + "px",
      };
    },
    _cStyle(v) {
      return {
        width: `calc(100% - ${this._rStyle(v).width})`,
      };
    },
    _cStyle2(v) {
      return {
        width: `calc(100% - ${this.widthRq}px)`,
      };
    },
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // 2020/07/21 修改
    config: {
      deep: true,
      immediate: true,
      handler(res) {
        this.isRefresh && (this.config.data = qxList);
      },
    },
    // 2020/07/21 修改
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  beforeRouteEnter(to, from, next) {
    next((vm) => {});
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
    jkNumber,
  },
};
</script>
<style lang="scss" scoped>
//@import 'jkSingle.scss'; //引入公共css类
.item {
  padding: 0 0 12px 0;
  // cursor: pointer;
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
