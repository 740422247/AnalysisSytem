<!--  -->
<template>
  <div class="table-list">
    <div class="opertionsT">
      <div
        class="btns"
        v-if="tableHeader.selection && !tableHeader.hideRightBtn"
      >
        <Button
          type="primary"
          :disabled="(UpdataTable && UpdataTable.disabled) || !isCheck"
          icon="el-icon-check"
          circle
          @click="submitChoice()"
        ></Button>
        <Button
          type="primary"
          :disabled="(UpdataTable && UpdataTable.disabled) || !isCheck"
          icon="el-icon-close"
          circle
          @click="clearChoice()"
        ></Button>
      </div>

      <h3 class="list-title">{{ title }}</h3>
    </div>
    <Ohyeah
      :height="tableHeader.height ? tableHeader.height : '500px'"
      class="xzys"
      thumbColor="#018AE1"
      :autoHide="true"
      trackColor="#fff"
    >
      <Table
        ref="singleTable"
        :data="listTableData"
        stripe
        default-expand-all
        highlight-current-row
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :row-key="tableHeader.rowKey ? tableHeader.rowKey : undefined"
        :border="tableHeader.border ? tableHeader.border : false"
        :show-summary="
          tableHeader.showSummary ? tableHeader.showSummary : false
        "
        @select="selection"
        @select-all="selection"
        @selection-change="handleSelectionChange"
        @row-click="rowClick"
        @sort-change="sortChange"
        v-loading="loading"
      >
        <TableColumn
          v-if="tableHeader.selection"
          :reserve-selection="true"
          type="selection"
          width="55"
        ></TableColumn>
        <TableColumn
          v-if="tableHeader.index"
          type="index"
          width="50"
          label="序号"
        ></TableColumn>

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
          :formatter="tables.expression"
        ></TableColumn>

        <template v-if="tableHeader.hasSwitchs">
          <TableColumn
            v-for="action in tableHeader.hasSwitchs"
            :key="action.key"
            :label="action.label"
            :prop="action.key"
            :width="
              tableHeader.operations.width ? tableHeader.operations.width : 100
            "
          >
            <template slot-scope="scope">
              <Switchs
                v-model="scope.row[action.key]"
                :active-color="
                  action.activeColor ? action.activeColor : '#13ce66'
                "
                :inactive-color="
                  action.inactiveColor ? action.inactiveColor : '#ff4949'
                "
                @change="changeSwitch(scope.row)"
                >></Switchs
              >
            </template>
          </TableColumn>
        </template>

        <template v-if="tableHeader.operations">
          <TableColumn
            fixed="right"
            align="center"
            :label="tableHeader.operations.label"
            :width="
              tableHeader.operations.width ? tableHeader.operations.width : 100
            "
          >
            <template slot-scope="scope">
              <Button
                v-for="actions in tableHeader.operations.actions"
                :key="actions.name"
                :type="actions.type"
                :size="actions.size"
                :icon="actions.icon"
                @click.stop="handleClick(scope.row, actions.name, scope.$index)"
                >{{ actions.label }}</Button
              >
            </template>
          </TableColumn>
        </template>
      </Table>
    </Ohyeah>
    <Pagination
      v-if="pageInfo"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageInfo.pageIndex"
      :page-sizes="[2, 5, 10, 20, 30]"
      :page-size.sync="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next"
      :total.sync="pageInfo.totalCount"
    ></Pagination>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Ohyeah } from "vue-ohyeah-scroll";
import { Table, TableColumn, Switch, Pagination, Button } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Table,
    TableColumn,
    Switchs: Switch,
    Pagination,
    Button,
    Ohyeah
  },
  props: {
    title: String,
    UpdataTable: Object, //表格操作按钮
    tableHeader: Object,
    listTableData: Array,
    pageInfo: Object,
    loading: Boolean,
    isSetUsers: Boolean
  },
  watch: {
    listTableData: {
      deep: true,
      handler(val) {
        this.$nextTick(() => {
          this.$refs.singleTable.clearSelection();
          if (val.length > 0) {
            val.forEach(item => {
              if (item.checked) {
                this.$refs.singleTable.toggleRowSelection(item, true);
              } else {
                this.$refs.singleTable.toggleRowSelection(item, false);
              }
              //toggleRowSelection(row, selected)方法接受两个参数，row传递被勾选行的数据，selected设置是否选中
            });
          }
        });
      }
    }
  },
  data() {
    //这里存放数据
    return {
      pagesize: 5,
      total: 1,
      currentPage: 1,
      isCheck: false, //是否操作过表格
      multipleSelection: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  //方法集合
  methods: {
    clearChoice() {
      const $this = this;
      this.$confirm("正在取消修改, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        offset: "500"
      })
        .then(() => {
          this.$emit("clearChoice", null);
          this.$emit("update:isSetUsers", true);
          this.isCheck = false;
        })
        .catch(() => {
          this.$emit("update:isSetUsers", false);
        });

      // this.$refs.singleTable.clearSelection();
    },
    rowClick(row) {
      this.$emit("rowClick", row);
    },
    selection(selection, row) {
      this.$emit("selectionList", selection);
      this.multipleSelection = selection;
      //必须左侧先点击
      if (this.UpdataTable && !this.UpdataTable.disabled) {
        this.isCheck = true;
      }
    },
    submitChoice() {
      this.$emit("chenckArr", this.multipleSelection);
      this.isCheck = false;
      // this.listTableData = this.listTableData.map(item => ({
      //   checked: this.multipleSelection.some(itt => itt.userId === item.userId),
      //   ...item
      // }));
    },
    handleSelectionChange(val) {
      // console.log(val);
      this.multipleSelection = val;
    },
    selectable(row, index) {
      // console.log("row:", row);
      // console.log("index:", index);
      return false;
    },
    setTotal() {
      this.total = this.listTableData.length;
    },
    sortChange({ column, prop, order }) {},
    changeSwitch(row) {
      this.$emit("changeSwitch", row);
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.$emit("flipOver", this.pageInfo);
      this.$refs.singleTable.setCurrentRow();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$refs.singleTable.setCurrentRow();
      this.$emit("flipOver", this.pageInfo);
    },
    handleClick(row, name, index) {
      this.$emit("listActions", row, name, index);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.setTotal();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(this.multipleSelection.length);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scope lang="scss">
//@import url(); 引入公共css类
.opertionsT {
  width: 100%;
  .btns {
    float: right;
  }
}
.table-list .el-pagination {
  text-align: right;
  margin-top: 20px;
  position: relative;
}
.list-title {
  text-align: left;
  float: left;
  margin: 15px 0;
}
</style>
