<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-31 16:06:53
 * @LastEditors: wss
 * @LastEditTime: 2020-10-13 11:22:08
-->
<!--  -->
<template>
  <div class="">
    <div>js代码测试页面</div>
    <div>
      <div>当前count值为:{{ count }}</div>
      <Button @click="bt1(1)">创建定时器</Button>
      <Button @click="bt1(2)">删除定时器</Button>
      <Button @click="bt1(3)">间隔一秒点击</Button>
      <Button @click="bt1(4)">间隔一秒点击</Button>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import { Button } from "element-ui";
// import ElementUI from "element-ui";
// Vue.use(ElementUI);
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { Button },
  data() {
    //这里存放数据
    return {
      count: 0,
      rate: 1000,
      timeOver: null,
      isClick: true
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    bt1(i) {
      switch (i) {
        case 1: {
          this.timeOver = setTimeout(() => {
            this.count++;
          }, 3000);
          break;
        }
        case 2: {
          clearInterval(this.timeOver);
          break;
        }
        case 4: {
          var button = document.querySelector("button");
          Rx.Observable.fromEvent(button, "click")
            .throttleTime(1000)
            .map(event => event.clientX)
            .scan((count, clientX) => count + clientX, 0)
            .subscribe(count => console.log(count));
          break;
        }
        case 3: {
          if (this.isClick) {
            this.count++;
            this.isClick = false;
            this.timeOver = setTimeout(() => {
              this.isClick = true;
            }, 0);
          }
          break;
        }
      }
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
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
