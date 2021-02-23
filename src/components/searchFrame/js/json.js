/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-11-11 14:46:47
 * @LastEditors: wss
 * @LastEditTime: 2020-11-11 17:35:25
 */
export const json = [
  {
    id: "capitalInvestment",
    label: "资金走向",
    placeholder: "请选择资金走向",
    putModel: null,
    showModel: null,
    type: "select",
    children: [
      { id: "L11", label: "“两不愁”" },
      { id: "L12", label: "住房保障" },
      { id: "L13", label: "教育保障" },
      { id: "L14", label: "医疗保障" },
      { id: "L15", label: "其他" }
    ]
  },
  {
    id: "projectName",
    label: "项目名称",
    placeholder: "请输入项目名称",
    putModel: null,
    showModel: null,
    type: "input"
  },
  {
    id: "projectName",
    label: "时间",
    placeholder: "请选择时间",
    putModel: null,
    showModel: null,
    formatting: "YYYY-MMM-DD",
    type: "datetime"
  },
  {
    id: "projectName",
    label: "项目名称",
    placeholder: "请输入项目名称",
    putModel: null,
    showModel: null,
    type: "select",
    _data: null,
    children: [
      {
        id: "L11",
        label: "“两不愁”",
        children: [
          { id: "p1", label: "“两不愁”" },
          { id: "p2", label: "住房保障" },
          { id: "p3", label: "教育保障" },
          { id: "p4", label: "医疗保障" },
          { id: "p5", label: "其他" }
        ]
      },
      { id: "L12", label: "住房保障" },
      { id: "L13", label: "教育保障" },
      { id: "L14", label: "医疗保障" },
      { id: "L15", label: "其他" }
    ]
  }
];
