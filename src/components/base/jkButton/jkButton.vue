<!--
 * @Descripttion: 按钮
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-05-19 14:41:37
 * @LastEditors: joykit
 * @LastEditTime: 2020-05-20 10:14:45
-->
<!-- jkButton -->
<template>
  <div class="jkButton">
    <button
      v-if="type === 'seek'"
      type="button"
      class="seek"
      @click="jkClick(type)"
    >
      <span class="ico"></span>
      搜一下
    </button>

    <button
      v-if="type === 'back'"
      type="button"
      class="back"
      @click="jkClick(type)"
    >
      <span class="ico"></span>
      <span>
        返回
      </span>
    </button>

    <button
      v-if="type === 'export'"
      type="button"
      class="back export"
      @click="jkClick(type)"
    >
      <span class="ico"></span>
      <span>
        导出
      </span>
    </button>

    <button
      v-if="type === 'globalSeek'"
      type="button"
      class="global-seek"
      @click="jkClick(type)"
    >
      <span class="ico"></span>
    </button>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: "jkButton",
  props: {
    type: {
      type: String,
      default: "back"
    }
  },
  data() {
    //这里存放数据
    return {};
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {});
  },
  //方法集合
  methods: {
    jkClick(type) {
      if (type === "back") {
        this.$router.go(-1); //返回上一层
        return;
      }
      this.$emit("happening", type);
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
  components: {}
};
</script>
<style lang="scss" scoped>
//@import 'jkButton.scss'; //引入公共css类
.jkButton {
  display: inline-block;
  button.seek {
    width: 92px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    @include t(background, seekBackground);
    @include t(color, seekColor);
    border-radius: 3px;
    transition: all 0.35s ease-in-out;
    &:hover {
      @include t(box-shadow, seekHover);
    }
    .ico {
      width: 22px;
      height: 22px;
      margin-right: 5px;
      @include t(background-image, seekIco);
      @extend .bk;
      transform: translateY(1px) scale(0.8);
    }
  }

  button.back {
    width: 92px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    @include t(background, backBackground);
    @include t(border, backBorder);
    @include t(color, white);
    transition: all 0.35s ease-in-out;
    &:hover {
      @include t(box-shadow, seekHover);
    }
    .ico {
      width: 22px;
      height: 18px;
      margin-right: 5px;
      @include t(background-image, backIco);
      @extend .bk;
      transform: translateY(1px) scale(0.8);
    }
  }
  button.back.export {
    .ico {
      @include t(background-image, exportIco);
    }
  }
  button.global-seek {
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    @include t(background, k4);
    @include t(color, white);
    transition: all 0.35s ease-in-out;
    &:hover {
      @include t(box-shadow, seekHover);
    }
    .ico {
      width: 30px;
      height: 30px;
      @include t(background-image, globalSeekIco);
      @extend .bk;
    }
  }
}
</style>
