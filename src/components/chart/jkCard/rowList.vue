<!--
 * @Descripttion: 卡片
 * @version: 1.0.0
 * @Author: joykit
 * @Date: 2020-06-04 10:52:43
 * @LastEditors: wss
 * @LastEditTime: 2021-01-04 10:03:40
-->
<!-- jkCard -->
<template>
  <jkCard
    class="jkCard cardRow"
    :border="config.border"
    :grid="config.grid"
    :text="config.text"
    :path="config.path"
    :selectData="config && config.selectData"
    @onSelectChage="onSelectChage"
  >
    <!-- <jkBox class="card" :border="config.border" :grid="config.grid"> -->
    <!-- v-for="(dd, key) in listTemp" :key="key" -->
    <div class="rowList">
      <Row>
        <Col
          :span="item.cardWidth ? item.cardWidth * 1 : 8"
          v-for="(item, key1) in columListData"
          :key="key1"
          :style="{ padding: item.cMargin }"
        >
          <jkCard
            class="jkCard"
            :border="item.border"
            :grid="item.grid"
            :style="{
              padding: item.cPadding,
              height: item.cHeight ? `${item.cHeight}px` : '120px',
            }"
          >
            <!-- :style="{ height: item.cHeight + 'px' }" -->
            <div class="cent">
              <div
                :class="ifClass(item.path)"
                class="card-wrap asd"
                :style="dataList.containerStyle ? dataList.containerStyle : ''"
                @click="clickPiece(item, key1)"
                tag="div"
              >
                <template v-if="item.label">
                  <div class="img">
                    <img
                      :src="item.src"
                      :style="dataList.imgStyle ? dataList.imgStyle : ''"
                      alt
                    />
                  </div>
                  <div class="right">
                    <h4 :style="dataList.labelStyle ? dataList.labelStyle : ''">
                      {{ item.label }}
                    </h4>
                    <h3 :style="dataList.valStyle ? dataList.valStyle : ''">
                      {{ item.value }}
                      <i
                        class="Unit"
                        v-if="item.unit"
                        :style="dataList.unitStyle ? dataList.unitStyle : ''"
                        >{{ item.unit }}</i
                      >
                    </h3>
                  </div>
                </template>
              </div>
            </div>
          </jkCard>
        </Col>
      </Row>
    </div>
    <!-- </jkBox> -->
  </jkCard>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { format } from "@/until/format/format.js";
import { Col, Row } from "element-ui";
import jkCard from "@components/base/jkCard/jkCard";
import "element-ui/lib/theme-chalk/index.css";
import jkBox from "@components/base/jkBox/jkBox.vue";
import { _dataList } from "@entity/card.js";
export default {
  name: "rowList",
  props: {
    isRefresh: Boolean,
    config: {
      type: Object,
      default: () => ({
        border: true,
        grid: true,
        path: "",
        data: null,
      }),
    },
  },
  data() {
    //这里存放数据
    return {
      columListData: [],
      dd: {},
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.init();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {});
    // console.log(this.config);
    // console.log(this.config.data.value[0].path);
    // console.log("this.listTemp:", this.listTemp);
  },
  //方法集合
  methods: {
    ifClass(it) {
      if (it && it.length > 0 && it[0]) return "showPointer";
    },
    init() {
      // console.log(this.config);
      if (!this.config.data || this.config.data.length || this.isRefresh) {
        this.columListData = _dataList.value;
        this.dataList = _dataList;
      } else {
        this.columListData = this.config.data.value;
        this.dataList = this.config.data;
      }
      this.columListData.map((item) => {
        item.value = format(item, item.value);
      });
    },
    clickPiece(item, key) {
      this.$emit("clickItem", this.config.data.cardList[key], key);
    },
    onSelectChage(model) {
      this.$emit("onSelectChage", model);
    },
  },
  //监听属性 类似于data概念
  computed: {
    isFlex() {
      if (this.dataList.layout === "row") {
        return { display: "flex" };
      }
      return "";
    },
    // listTemp() {
    //   let index = 0;
    //   const count = _dataList.lineNumber;
    //   const arrTemp = [];
    //   const experts = this.columListData;
    //   for (let i = 0; i < experts.length; i++) {
    //     index = parseInt(i / count);
    //     if (arrTemp.length <= index) {
    //       arrTemp.push([]);
    //     }
    //     arrTemp[index].push(experts[i]);
    //   }
    //   if (arrTemp[index].length < count) {
    //     for (let i = 0; i <script count - arrTemp[index].length; i++) {
    //       arrTemp[index].push({});
    //     }
    //   }
    //   return arrTemp;
    // }
  },
  //监控data中的数据变化
  watch: {
    config: {
      deep: true,
      handler() {
        this.init();
        this.$forceUpdate();
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
  components: { Col, Row, jkCard },
};
</script>
<style lang="scss">
//@import 'jkCard.scss'; //引入公共css类
.cardRow {
  .content {
    height: 100%;
    padding: 0;
  }
}
.rowList {
  // display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
  // margin-bottom: 18px;

  .jkCard {
    min-width: 0;
    min-height: 0;
    .content {
      // 2020-12-21 添加
      padding: 0;
      .card-wrap {
        padding: 0;
        &.asd {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-direction: row;
        }
        h4 {
          font-size: 16px;
          @include t(color, k9);
          // padding-top: 6px;
          text-align: left;
          padding: 6px 0 10px 10px;
        }
        h3 {
          font-size: 18px;
          @include t(color, k1);
          padding-top: 6px;
          text-align: left;
          padding: 0 10px;
        }
      }
      // 2020-12-21 添加
    }
  }
}
.cent {
  height: 100%;
  display: flex;
  vertical-align: middle;
}
.showPointer {
  cursor: pointer;
}
.card-wrap {
  // padding: 0px 15px;
  text-align: left;
  vertical-align: middle;
  align-self: center;
  // flex: 1;
  // display: flex;
  // height: 100px;
  // width: 100px;
  > div {
    display: inline-block;
    vertical-align: middle;
  }
  text-align: center;
  // cursor: pointer;
  h4 {
    font-size: 16px;
    @include t(color, k9);
    // padding-top: 6px;
    padding: 6px 0 10px 8px;
  }
  h3 {
    font-size: 18px;
    @include t(color, k1);
    padding-top: 6px;
    padding: 0 10px;
  }
  .right {
    margin-left: 6px;
    // float: right;
    // display: flex;
    flex-direction: column;
  }
}
.card {
  transition: box-shadow 0.32s ease-in-out;
}
.card:hover {
  @include t(box-shadow, k44);
}
.img {
  &:before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
  img {
    display: inline-block;
    width: 35px;
    max-height: 100%;
    vertical-align: middle;
  }
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  overflow: hidden;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
