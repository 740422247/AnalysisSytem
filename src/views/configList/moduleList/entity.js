export default {
  setTabHeards: () => ({
    index: true,
    selected: true,
    border: false,
    fixed: true,
    showSummary: false,
    headerAlign: "center",
    operations: {
      label: "操作",
      width:'200',
      actions: [
        // { label: "查看", name: "detail", type: "text", size: "small" },
        { label: "编辑", name: "edit", type: "primary", size: "mini" ,icon:'el-icon-edit'},
        { label: "删除", name: "delete", type: "danger", size: "mini" ,icon:'el-icon-delete'}
      ]
    },

    heards: [
      // { label: "模块名称", key: "modelName", width: 120, type: "string" },
      { label: "模块名称", key: "modelName", type: "string" },
      { label: "创建用户", key: "createUserName", type: "string" },
      { label: "修改用户", key: "updateUserName", type: "string" },
      { label: "修改时间", key: "updateDateTime", type: "string" },

    ]
  })
}
