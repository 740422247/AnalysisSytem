<!--
 * @Descripttion:
 * @version:
 * @Author: joykit
 * @Date: 2019-10-30 17:34:51
 * @LastEditors: wss
 * @LastEditTime: 2020-07-27 16:42:45
 -->
<template>
  <div class="content-body Earth">
    <div class="s-w">
      <div id="sun" class="sun"></div>
      <div class="country">重点乡镇</div>
    </div>
  </div>
</template>
<script>
import { Sun } from "./sun1.js";
export default {
  name: "Earth",
  props: {
    pageForms: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  mounted() {
    const vm = this;
    const district = [
      [
        {
          name: require("./image/city/500101151.png"),
          url: "/CountryProjectList?DistrictId=&countryId=500101151",
          id: "500101151",
          label: "龙驹镇",
        },
        {
          name: require("./image/city/500114110.png"),
          url: "/CountryProjectList?DistrictId=&countryId=500114110",
          id: "500114110",
          label: "金溪镇",
        },
        {
          name: require("./image/city/500154109.png"),
          url: "/CountryProjectList?DistrictId=&countryId=500154109",
          id: "500154109",
          label: "大进镇",
        },
        {
          name: require("./image/city/500156208.png"),
          url: "/CountryProjectList?DistrictId=&countryId=500156208",
          id: "500156208",
          label: "后坪苗族土家族乡",
        },
        {
          name: require("./image/city/500229208.png"),
          url: "/CountryProjectList?DistrictId=&countryId=500229208",
          id: "500229208",
          label: "沿河乡",
        },
        {
          name: require("./image/city/500229212.png"),
          url: "/CountryProjectList?DistrictId=&countryId=500229212",
          id: "500229212",
          label: "鸡鸣乡",
        },
      ],
      [
        {
          name: require("./image/city/500230210.png"),
          url: "/CountryProjectList?DistrictId=&countryId=500230210",
          id: "500230210",
          label: "三建乡",
        },
        {
          name: require("./image/city/500235139.png"),
          url: "/CountryProjectList?DistrictId=&countryId=500235139",
          id: "500235139",
          label: "泥溪镇",
        },
        {
          name: require("./image/city/500236266.png"),
          url: "/CountryProjectList?DistrictId=&countryId=500236266",
          id: "500236266",
          label: "平安乡",
        },
        {
          name: require("./image/city/500237105.png"),
          url: "/CountryProjectList?DistrictId=&countryId=500237105",
          id: "500237105",
          label: "双龙镇",
        },
        {
          name: require("./image/city/500238243.png"),
          url: "/CountryProjectList?DistrictId=&countryId=500238243",
          id: "500238243",
          label: "天元乡",
        },
        {
          name: require("./image/city/500238400.png"),
          url: "/CountryProjectList?DistrictId=&countryId=500238400",
          id: "500238400",
          label: "红池坝经济开发区",
        },
      ],
      [
        {
          name: require("./image/city/500242218.png"),
          url: "/CountryProjectList?DistrictId=&countryId=500242218",
          id: "500242218",
          label: "车田乡",
        },
        {
          name: require("./image/city/500242222.png"),
          url: "/CountryProjectList?DistrictId=&countryId=500242222",
          id: "500242222",
          label: "浪坪乡",
        },
        {
          name: require("./image/city/500243206.png"),
          url: "/CountryProjectList?DistrictId=&countryId=500243206",
          id: "500243206",
          label: "三义乡",
        },
        {
          name: require("./image/city/500243225.png"),
          url: "/CountryProjectList?DistrictId=&countryId=500243225",
          id: "500243225",
          label: "大垭乡",
        },
        {
          name: require("./image/city/500240213.png"),
          url: "/CountryProjectList?DistrictId=&countryId=500243225",
          id: "500240213",
          label: "中益乡",
        },
      ],
    ];

    const sun = new Sun("#sun", {
      district,
      done() {
        vm.$emit("EarthDone1", sun);
      },
      fallback(model) {
        // this.pageForms &&
        //   this.pageForms.path &&
        // console.log('fall back model:', model, vm)
        // return;
        vm.$router.push({
          name: "pageDetail",
          query: {
            id: vm.pageForms.path,
            param: JSON.stringify({
              countryId: model.id,
              countryName: model.label,
            }),
          },
        });
      },
      mouseFallback(o) {
        vm.$emit("mouseFallback", o);
      },
    });
  },
  methods: {},
  computed: {},
  watch: {},
  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./Earth";
</style>
