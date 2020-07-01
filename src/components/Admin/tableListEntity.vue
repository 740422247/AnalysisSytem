<!--  -->
<template>
  <div class="table-list">
    <h3 class="list-title">{{title}}</h3>
    <Table
      :data="listTableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      stripe
      default-expand-all
      highlight-current-row
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      row-key="id"
      :border="tableHeader.border ? tableHeader.border : false"
      :show-summary="
          tableHeader.showSummary ? tableHeader.showSummary : false
        "
      @select="selection($event)"
      @row-click="rowClick"
      @sort-change="sortChange"
    >
      <TableColumn v-if="tableHeader.index" type="index" width="50" label="序号"></TableColumn>

      <TableColumn
        v-for="(tables, index) in tableHeader.heards"
        :key="index"
        :prop="tables.key"
        :label="tables.label"
        :width="tables.width"
        :sortable="tables.sortable"
        :align="tables.align ? tables.align : 'center'"
        :flxed="tableHeader.flxed"
        :header-align="
            tableHeader.headerAlign ? tableHeader.headerAlign : 'center'
          "
        :formatter="tables.formatter"
      ></TableColumn>

      <template v-if="tableHeader.hasSwitchs">
        <TableColumn
          v-for="action in tableHeader.hasSwitchs"
          :key="action.key"
          :label="action.label"
          :prop="action.key"
        >
          <template slot-scope="scope">
            <Switchs
              v-model="scope.row[action.key]"
              :active-color="action.activeColor ? action.activeColor : '#13ce66'"
              :inactive-color="action.inactiveColor ? action.inactiveColor : '#ff4949'"
              @change="changeSwitch(scope.row)"
            >></Switchs>
          </template>
        </TableColumn>
      </template>

      <template v-if="tableHeader.operations">
        <TableColumn fixed="right" :label="tableHeader.operations.label" width="100">
          <template slot-scope="scope">
            <Button
              v-for="actions in tableHeader.operations.actions"
              :key="actions.name"
              :type="actions.type"
              :size="actions.size"
              :icon="actions.icon"
              @click="handleClick(scope.row, actions.name)"
            >{{actions.label}}</Button>
          </template>
        </TableColumn>
      </template>
    </Table>

    <Pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="5"
      layout="total, sizes, prev, pager, next"
      :total="total"
    ></Pagination>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Table, TableColumn, Switch, Pagination, Button } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Table,
    TableColumn,
    Switchs: Switch,
    Pagination,
    Button
  },
  props: {
    title: String,
    tableHeader: Object,
    listTableData: Array
  },
  data() {
    //这里存放数据
    return {
      pagesize: 5,
      total: 1,
      currentPage: 1
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    rowClick(row) {
      this.$emit("rowClick", row);
    },
    sortChange({ column, prop, order }) {
      console.log(column, prop, order);
    },
    changeSwitch(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleClick(row, name) {
      this.$emit("listActions", row, name);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.total = this.listTableData.length;
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss'>
//@import url(); 引入公共css类
.table-list .el-pagination {
  text-align: right;
  margin-top: 20px;
}
.list-title {
  text-align: left;
  margin: 15px 0;
}
</style>
