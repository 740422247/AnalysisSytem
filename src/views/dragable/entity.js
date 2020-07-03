export default {
  // 获取tool entity
  getToolEntity: (type, state, componentType) => {
    return type === "container"
      ? getContainerEntity()
      : getComponetEntity(state, componentType);
  },
  // 克隆
  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  // 获取接口设置配置
  getSetApiEntity(state) {
    return [
      {
        label: "模块名称",
        key: "moduleName",
        type: "text",
        className: "is-full",
        labelWidth: "80"
      },
      {
        label: "接口选择",
        key: "path",
        type: "select",
        className: "is-full",
        labelWidth: "80",
        options: state.apiOpt
      },
      // 待删除
      {
        label: "可选参数",
        key: "arguments",
        type: "selectMultiple",
        className: "is-full",
        labelWidth: "80",
        options: state.apiArgument
      }
    ]
  }
}

function getWidth() {
  return [
    {
      label: "宽度",
      key: "cWidth",
      type: "select",
      className: "is-full",
      labelWidth: 80,
      options: [
        { label: "1格", value: "jk-col-2" },
        { label: "2格", value: "jk-col-4" },
        { label: "3格", value: "jk-col-6" },
        { label: "4格", value: "jk-col-8" },
        { label: "5格", value: "jk-col-10" },
        { label: "6格", value: "jk-col-12" },
        { label: "7格", value: "jk-col-14" },
        { label: "8格", value: "jk-col-16" },
        { label: "9格", value: "jk-col-18" },
        { label: "10格", value: "jk-col-20" },
        { label: "11格", value: "jk-col-22" },
        { label: "12格", value: "jk-col-24" }
      ]
    }
  ]
}

function getComponetEntity(state, componentType) {
  return [
    {
      label: "标题",
      key: "title",
      type: "text",
      className: "is-full",
      labelWidth: "80"
    },
    ...getWidth(),
    {
      label: '边距',
      key: 'boxMargin',
      type: 'text',
      className: "is-full",
      labelWidth: 80
    },
    {
      label: "数据标题",
      key: "showTitle",
      type: "select",
      className: "is-full",
      labelWidth: 80,
      options: state.subTitle
    },
    {
      label: "展示数据",
      key: "showData",
      type: componentType ? componentType : 'select',
      className: "is-full",
      labelWidth: 80,
      options: state.apiArgument
    },
  ]
}
function getContainerEntity() {
  return [
    ...getWidth(),
    {
      label: "高宽比",
      key: "cHeight",
      type: "select",
      labelWidth: 80,
      className: "is-full",
      options: [
        { label: "自适应", value: 0 },
        { label: "1:1", value: 1 },
        { label: "1:2", value: 0.5 },
        { label: "2:1", value: 2 }
      ]
    },
    {
      label: "边框",
      key: "hasBorder",
      type: "select",
      className: "is-full",
      labelWidth: 80,
      options: [
        { label: "有边框", value: "1" },
        { label: "无边框", value: "0" }
      ]
    },
    {
      label: "内边距",
      key: "boxPadding",
      type: "text",
      labelWidth: 80,
      className: "is-full",
    },
  ]
}
