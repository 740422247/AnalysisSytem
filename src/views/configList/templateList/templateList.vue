<!--
 * @Descripttion:
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-06-23 16:04:02
 * @LastEditors: wss
 * @LastEditTime: 2020-06-28 15:09:18
-->
<template>
  <div class="moduleList">
    <div class="title">模板列表</div>
    <el-table :data="tableData" border >
      <el-table-column fixed type="index" label="序号" :index="indexMethod" width="50"></el-table-column>
      <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
      <el-table-column prop="name" label="组件名字" width="120"></el-table-column>
      <!-- <el-table-column prop="province" label="省份" width="120"></el-table-column> -->
      <!-- <el-table-column prop="city" label="市区" width="120"></el-table-column> -->
      <el-table-column prop="address" label="备注"></el-table-column>
      <!-- <el-table-column prop="zip" label="邮编" width="120"></el-table-column> -->
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { Button } from "element-ui";
export default {
  name: "templateList",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "组件1",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "组件2",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "组件3",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "组件4",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ]
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
    handleClick(row) {
      console.log(row);
    },
    indexMethod(index) {
      return index + 1;
    }
  },
  watch: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.title{
  font-size: 20px;
  text-align: left;
  margin-bottom: 30px;
}
.moduleList{
  box-sizing: border-box;
  padding: 50px;
}

</style>
