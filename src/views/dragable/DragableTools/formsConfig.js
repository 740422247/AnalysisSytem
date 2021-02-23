export default {
  type: "wssForms", // lineChart twoBarChart barChart
  // 可用于渲染类型选择框
  isRadio: true,
  // choice: typeForms,

  modelId: 'sysFormsId',
  modelType: 'sysFormsId',
  modelName: '表单',

  className: ["jk-col-24", "handle"], // 类名
  style: { height: "100px" }, // 样式
  isHandle: false, // 是否具备操作 比如: 联动
  text: "表单", //组件标题
  path: "", // 顶部跳转按钮
  border: false, // 显示组件边框
  grid: false, // 显示背景网格

  service: {
    api: "", //api地址
    params: {}, // api参数
    data: {
      // 返回的字段
    }
  },
  option: {},
  data: {

    // value: [
    //   {
    // id: "capitalInvestment",
    // label: "资金走向",
    // placeholder: "请选择资金走向",
    // putModel: null,
    // showModel: null,
    // type: "select",
    // children: [
    //   { id: "L11", label: "“两不愁”" },
    //   { id: "L12", label: "住房保障" },
    //   { id: "L13", label: "教育保障" },
    //   { id: "L14", label: "医疗保障" },
    //   { id: "L15", label: "其他" }
    // ]
    //   },
    //   {
    //     id: "projectName",
    //     label: "项目名称",
    //     placeholder: "请输入项目名称",
    //     putModel: null,
    //     showModel: null,
    //     type: "input"
    //   },
    //   {
    //     id: "projectName",
    //     label: "时间",
    //     placeholder: "请选择时间",
    //     putModel: null,
    //     showModel: null,
    //     formatting: "YYYY-MM-DD",
    //     type: "datetime"
    //   },
    // {
    //   id: "projectName",
    //   label: "项目名称",
    //   placeholder: "请输入项目名称",
    //   putModel: null,
    //   showModel: null,
    //   type: "select",
    //   _data: null,
    //   children: [
    //     {
    //       id: "L11",
    //       label: "“两不愁”",
    //       children: [
    //         { id: "p1", label: "“两不愁”" },
    //         { id: "p2", label: "住房保障" },
    //         { id: "p3", label: "教育保障" },
    //         { id: "p4", label: "医疗保障" },
    //         { id: "p5", label: "其他" }
    //       ]
    //     },
    //     { id: "L12", label: "住房保障" },
    //     { id: "L13", label: "教育保障" },
    //     { id: "L14", label: "医疗保障" },
    //     { id: "L15", label: "其他" }
    //   ]
    // }
    // ]
  }
}
