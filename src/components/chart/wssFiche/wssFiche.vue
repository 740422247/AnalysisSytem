<!--
 * @Descripttion: 卡片
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-06-04 10:52:43
 * @LastEditors: wss
 * @LastEditTime: 2020-11-24 17:21:29
-->
<!-- jkCard -->
<template>
  <jkBox
    class="card"
    :line="config.line"
    :border="config.border"
    :grid="config.grid"
    @click="goRouter()"
  >
    <div class="ficheContent">
      <div class="fiche">
        <div class="title fl">
          <p class="name">{{ data.titleName }}</p>
          <!-- <p class="name">({{items}})</p> -->
        </div>
        <div class="money fr">
          <p class="M_val numerical">{{ data.amount }}</p>
          <p class="M_unit numerical">{{ data.unit }}</p>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </jkBox>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { NumFormatGather } from "@/until/format/format.js";
import jkBox from "@components/base/jkBox/jkBox.vue";
export default {
  name: "wssFiche",
  props: {
    isRefresh: Boolean,
    numberCount: Number,
    config: {
      type: Object,
      default: () => ({
        border: false,
        line: true,
        grid: false,
        turning: false,
        data: null,
      }),
    },
  },
  data() {
    //这里存放数据
    return {
      json: {
        titleName: "香港特别1行政区",
        amount: "8654",
        unit: "元",
      },
      data: {},
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.init();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {});
  },
  //方法集合
  methods: {
    init() {
      if (this.config.data && !this.isRefresh) {
        this.data = this.config.data;
      } else {
        this.data = this.json;
      }
    },
    goRouter() {
      this.$router.push({
        name: "pageDetail",
        query: {
          id: this.config.configUrl[0].value,
          param: JSON.stringify(this.config.configUrl[0].param),
        },
      });
    },
    formatNumber(value) {
      return Math.round(value, 2);
    },
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    config: {
      deep: true,
      handler() {
        console.log('fiche :watch:', this.config)
        this.init();
      },
    },
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
  components: { jkBox },
};
</script>
<style lang="scss" scoped>
//@import 'jkCard.scss'; //引入公共css类
.card-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  .right {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
  }
  h4 {
    font-size: 16px;
    @include t(color, k9);
    padding-top: 6px;
  }
  h3 {
    font-size: 30px;
    @include t(color, k1);
    padding-top: 6px;
  }
}
.card {
  transition: box-shadow 0.32s ease-in-out;
}
.card:hover {
  @include t(box-shadow, k44);
}

.ficheContent {
  height: 100%;
  display: flex;
  //  background-image: linear-gradient(transparent, rgba(20, 41, 111, 1));
}
.fiche {
  color: #81a7dc;
  width: 100%;
  vertical-align: middle;
  align-self: center;
  overflow: hidden;
  .numerical {
    color: #fff;
  }
  .title {
    // width: 66%;
    // height: 66px;
    font-size: 22px;
    line-height: 34px;
    // color: #fff;
    // overflow: hidden;
    p.name {
      margin: 0;
      height: 100%;
      white-space: pre-wrap;
    }
  }
  .money {
    // font-weight: bold;
    // width: 34%;
    color: #fff;
    text-align: right;
    box-sizing: border-box;
    font-size: 32px;
    font-family: "DigifaceWide";
    line-height: 34px;
    .M_unit {
      font-size: 16px;
    }
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
}
</style>
