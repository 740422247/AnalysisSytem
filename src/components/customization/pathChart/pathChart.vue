<!--
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-06-08 10:13:34
 * @LastEditors: wss
 * @LastEditTime: 2020-12-01 09:22:16
-->
<template>
    <div class="content-body">
        <div
            id="echarts"
            ref="pathChart"
            class="chart"
            :style="{ width: '100%', height: '100%' }"
        ></div>
    </div>
</template>

<script>
import echarts from "echarts";
import { mapState } from "vuex";
import { op } from "./pathChart.js";
// import { opSxyc } from "./pathChartSxyc.js";
export default {
    name: "pathChart",
    components: {},
    props: ["comparison"],
    data() {
        return {
            ssgdata: "本年",
            myChart: null
        };
    },
    computed: {
        ...mapState("pathChart", ["body", "isChange"])
    },
    mounted() {
        this.init();
        window.onresize = () => {
            return (() => {
                this.myChart.resize();
                //   this.screenWidth = document.body.clientWidth;
                //   this.screenHeight = document.body.clientHeight;
            })();
        };
    },
    created() {},
    methods: {
        init() {
            //   const res = null;
            var dom = this.$refs.pathChart;
            this.myChart = echarts.init(dom);
            if (this._config.city === "重庆") {
                this.myChart.setOption(op(this.body), true);
            } else if (this._config.city === "山西") {
                // this.myChart.setOption(opSxyc(this.body), true);
            }
        }
    },
    watch: {
        isChange(a, b) {
            if (this._config.city === "重庆") {
                this.myChart.setOption(op(this.body), true);
            } else if (this._config.city === "山西") {
                // this.myChart.setOption(opSxyc(this.body), true);
            }
        },
        body(a, b) {
            if (this._config.city === "重庆") {
                this.myChart.setOption(op(this.body), true);
            } else if (this._config.city === "山西") {
                // this.myChart.setOption(opSxyc(this.body), true);
            }
        }
    }
};
</script>
<style scoped></style>
