<!--
 * @Descripttion:
 * @version:
 * @Author: joykit
 * @Date: 2020-02-11 14:46:59
 * @LastEditors: joykit
 * @LastEditTime: 2020-07-01 15:12:00
 -->
<template>
  <div class="home">
    <div class="wrap">
      <!-- <div class="qxph">
        <jkGraph :type="'pieChart'" :config="{}" />
      </div> -->

      <div class="xx">
        <jkCard type="colum" />
      </div>
      <div class="xx1">
        <jkCard type="row" />
      </div>

      <div class="qxph">
        <jkGraph
          :type="'barChart'"
          :config="{
            text: '补贴人数',
            path: '/ProjectOnline1?type=GetQxList&enters=xm'
          }"
        />
      </div>

      <div class="qxph">
        <jkGraph
          :type="'twoBarChart'"
          :config="{
            text: '男女年龄段分析',
            path: '/ProjectOnline1?type=GetQxList&enters=xm'
          }"
        />
      </div>

      <div class="qxph">
        <jkGraph
          :type="'lineChart'"
          :config="{
            text: '往年数据对比',
            path: '/ProjectOnline1?type=GetQxList&enters=xm'
          }"
        />
      </div>

      <div class="qxph">
        <jkRank
          :config="{
            text: '区县排名',
            path: '/ProjectOnline1?type=GetQxList&enters=xm'
          }"
        />
      </div>

      <div class="qxph">
        <jkRank
          type="multipleRank"
          :config="{
            text: '1个项目类纳入情况',
            path: '/ProjectOnline1?type=GetQxList&enters=xm'
          }"
        />
      </div>

      <div class="qxph">
        <jkRank
          type="batteryRank"
          :config="{
            text: '补贴金额/万',
            path: '/ProjectOnline1?type=GetQxList&enters=xm'
          }"
        />
      </div>

      <jkBox class="qxph"></jkBox>
      <jkSelect
        :options="options"
        :label="label"
        :placeholder="placeholder"
        :model="treeSelect"
        @happening="happening"
      />

      <jkSelect
        type="yearSelect"
        :options="yearOptions"
        :model="yearSelect"
        @happening="happening"
      />

      <jkSelect
        type="simpleSelect"
        :options="simpleOptions"
        :model="simpleSelect"
        @happening="happening"
      />
      <jkButton />
      <jkButton type="export" @happening="happening" />
      <jkButton type="seek" @happening="happening" />
      <jkButton type="globalSeek" @happening="happening" />
      <jkNumber
        :number="10001.222"
        :thousands="','"
        :decimals="2"
        :decPoint="'.'"
      />
      <jkNumber :number="1001201.222" />
      <jkNumber :number="1001201.222" :symbol="'万元'" />

      <jkRouteBtn />
      <jkTitle type="normal" :text="'啊大大'"></jkTitle>
      <jkTitle
        type="large"
        :text="'现在才v存在'"
        :subText="'至少是支持'"
      ></jkTitle>
      <div style="width: 312px">
        <jkProgress></jkProgress>
        <jkProgress type="lan"></jkProgress>
      </div>
      <Button type="success">
        <router-link to="user">管理界面</router-link>
      </Button>
      <Button type="success">成功按钮</Button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { Button } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import jkTitle from "@components/base/jkTitle/jkTitle.vue";
import jkNumber from "@components/base/jkNumber/jkNumber.vue";
import jkProgress from "@components/base/jkProgress/jkProgress.vue";
import jkRouteBtn from "@components/base/jkRouteBtn/jkRouteBtn.vue";
import jkButton from "@components/base/jkButton/jkButton.vue";
import jkSelect from "@components/base/jkSelect/jkSelect.vue";
import jkBox from "@components/base/jkBox/jkBox.vue";
import jkRank from "@components/chart/jkRank";
import jkGraph from "@components/chart/jkGraph";
import jkCard from "@components/chart/jkCard";

export default {
  name: "home",
  data() {
    return {
      value: true,
      // 下拉树测试数据
      simpleSelect: "所有",
      treeSelect: "a",
      yearSelect: "所有年度",
      label: "区划",
      placeholder: "请输入...",
      options: [
        {
          id: "a",
          label: "a",
          children: [
            {
              id: "aa",
              label: "aa"
            },
            {
              id: "ab",
              label: "ab"
            }
          ]
        },
        {
          id: "b",
          label: "b"
        },
        {
          id: "c",
          label: "c"
        }
      ],
      yearOptions: [
        {
          id: "all",
          label: "所有年度"
        },
        {
          id: "2019",
          label: "2019年"
        },
        {
          id: "2018",
          label: "2018年"
        },
        {
          id: "2020",
          label: "2020年"
        }
      ],
      simpleOptions: null
    };
  },
  created() {
    // this.$store.dispatch("actTag");
  },
  mounted() {},
  computed: {
    ...mapGetters({})
  },
  methods: {
    // 按钮事件监听
    happening(type, result = null) {
      console.log(type, result);
      this[type] = result.label;
    }
  },
  watch: {},
  components: {
    jkGraph,
    jkBox,
    jkSelect,
    jkButton,
    jkNumber,
    jkTitle,
    jkRouteBtn,
    jkProgress,
    jkRank,
    Button,
    jkCard
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  margin-top: 20px;
  height: 90vh;
  overflow: hidden;
  .wrap {
    overflow: scroll;
  }
  & > * {
    margin: 4px;
  }
  display: flex;
  flex-direction: column;
  @include t(background-color, "k0");
  @include t(color, "k1");
  .qxph {
    width: 300px;
    height: 300px;
  }
  .xx {
    width: 164px;
    height: 184px;
  }
  .xx1 {
    width: 284px;
    height: 121px;
  }
}
</style>
