<!--
 * @Descripttion: 默认 单行排行榜
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-25 10:18:41
 * @LastEditors: wss
 * @LastEditTime: 2021-01-04 10:21:25
-->
<!-- jkSingle -->
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
        <jkContent class="content flex align">
          <!-- key <= 2 说明: 前3黄色，后面蓝色 -->
          <jkProgress
            class="jk-progress"
            :type="key <= 2 ? 'huang' : 'lan'"
            :style="_cStyle2(key)"
            :width="(_adapter('value', key) / maxImum()) * 100 + '%'"
          />
          <jkContent
            class="flex-shrink flex align content-right"
            :style="_rStyle2(key)"
          >
            <jkNumber
              class="num"
              :number="_formatNumber(_adapter('value', key))"
            />
            <jkContent>{{ _limit("symbol", key) }}</jkContent>
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
// 格式化
import { formatNumber } from "@utils/formatNumber.js";
// 数据
import { qxList } from "@entity/jkRank/singleRank.js";

export default {
  name: "jkSingle",
  props: {
    // 2020/07/21修改
    isRefresh: {
      type: Boolean
    },
    // 2020/07/21修改
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
      widthRq: 60,
      fontSize: 12
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 组件默认数据
    !this.config.data && (this.config.data = qxList);
    console.log(this.config);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {});
  },
  //方法集合
  methods: {
    _max(key) {
      return this.config.data.value[0] / 2;
    },
    _adapter(colum, key) {
      if (key === undefined) {
        return this.config.data[colum];
      }
      return this.config.data[colum][key];
    },
    maxImum() {
      return Math.max.apply(null, this.config.data.value);
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
    _getNumSize(key) {
      const _w =
        (this._formatNumber(this._max(key)).length * this.fontSize) / 2 +
        (this.config.data.symbol[0].length + 1) * this.fontSize;
      return _w;
    },
    _rStyle(key) {
      return {
        fontSize: this.fontSize + "px",
        width: this._getNumSize(key) + "px"
      };
    },
    _rStyle2() {
      const maxSu = this._formatNumber(
        Math.max.apply(null, this.config.data.value)
      );
      // .toString()
      const dwMax = Math.max(...this.config.data.symbol.map(itt => itt.length));
      const _width =
        (maxSu.length / 2) * this.fontSize + dwMax * this.fontSize + 5; //-5修正长度
      this.widthRq = _width;
      return {
        fontSize: this.fontSize + "px",
        width: _width + "px"
      };
    },
    _cStyle(key) {
      return {
        width: `calc(100% - ${this._rStyle(key).width})`
      };
    },
    _cStyle2(v) {
      return {
        width: `calc(100% - ${this.widthRq}px)`
      };
    }
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
      }
    }
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
.content-right {
  @include t(color, "k1");
}
.text-right {
  text-align: right;
}
.label {
  padding: 12px 0;
}
.jk-progress {
  margin-right: 8px;
}
</style>
