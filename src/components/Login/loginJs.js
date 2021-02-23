export const filterTitle = [
  {
    label: "标题大小(像素)",
    className: "is-2",
    labelWidth: 110,
    key: "fontSize",
    type: "string",
    placeholder: "像素"
  },
  {
    label: "标题颜色",
    className: "is-2",
    labelWidth: 110,
    key: "color",
    type: "string",
    placeholder: "请输入颜色"
  },
  {
    label: "标题宽度",
    className: "os-12",
    labelWidth: 110,
    key: "width",
    type: "string",
    placeholder: "标题宽度"
  },
  {
    label: "标题位置/左侧",
    className: "is-2",
    labelWidth: 110,
    key: "left",
    type: "string",
    placeholder: "百分比"
  },
  {
    label: "标题位置/顶部",
    labelWidth: 110,
    className: "is-2",
    key: "top",
    type: "string",
    placeholder: "百分比"
  },
  {
    label: "显示组件边框",
    labelWidth: 110,
    key: "border",
    type: "select",
    className: "is-2",
    placeholder: "默认",
    options: [
      { label: "是", value: "1" },
      { label: "否", value: "0" }
    ]
  },
  {
    label: "显示背景网格",
    labelWidth: 110,
    key: "grid",
    type: "select",
    className: "is-2",
    placeholder: "默认",
    options: [
      { label: "是", value: "1" },
      { label: "否", value: "0" }
    ]
  },
  {
    label: "标题背景图片",
    className: "is-2",
    labelWidth: 110,
    key: "bgImg",
    type: "select",
    placeholder: "默认",
    options: [
      { label: "是", value: "1" },
      { label: "否", value: "0" }
    ]
  },
  {
    label: "显示拐点折线",
    labelWidth: 110,
    key: "inflexion",
    type: "select",
    value: "1",
    className: "is-2",
    placeholder: "默认",
    options: [
      { label: "是", value: "1" },
      { label: "否", value: "0" }
    ]
  }
];
export const filterOther = [
  {
    label: "一键定位/左右",
    className: "os-12",
    labelWidth: 110,
    key: "autoLeft",
    type: "select",
    options: [
      { label: "手动输入", value: "-1" },
      { label: "左侧居中", value: "leftCenter" },
      { label: "页面居中", value: "center" },
      { label: "右侧居中", value: "rightCenter" }
    ],
    placeholder: "定位",
    expression2: (model, val, controlForms2) => {
      if (val !== "-1") {
        controlForms2(["left"], true);
      } else {
        controlForms2(["left"], false);
      }
    }
  },
  {
    label: "垂直居中",
    className: "os-12",
    labelWidth: 110,
    key: "autoTop",
    type: "select",
    options: [
      { label: "是", value: "1" },
      { label: "否", value: "0" }
    ],
    placeholder: "定位",
    expression2: (model, val, controlForms2) => {
      if (val === "0") {
        controlForms2(["top"], false, model);
      } else {
        controlForms2(["top"], true, model);
      }
    }
  },
  {
    label: "定位/左侧",
    className: "is-2",
    labelWidth: 110,
    key: "left",
    type: "string",
    placeholder: "百分比"
  },
  {
    label: "定位/顶部",
    labelWidth: 110,
    className: "is-2",
    key: "top",
    type: "string",
    placeholder: "百分比"
  },
  {
    label: "文本颜色",
    labelWidth: 110,
    className: "is-2",
    key: "color",
    type: "string",
    placeholder: "颜色"
  },
  {
    label: "按钮颜色",
    labelWidth: 110,
    className: "is-2",
    key: "colorBtn",
    type: "string",
    placeholder: "颜色"
  },
  {
    label: "按钮背景色",
    labelWidth: 110,
    className: "is-2",
    key: "bgcolorBtn",
    type: "string",
    placeholder: "背景色"
  },
  {
    label: "显示背景图片",
    labelWidth: 110,
    key: "backgroundImg",
    type: "select",
    className: "is-2",
    placeholder: "默认",
    options: [
      { label: "是", value: "1" },
      { label: "否", value: "0" }
    ]
  },
  {
    label: "反转图片",
    labelWidth: 110,
    key: "transform",
    type: "select",
    className: "is-2",
    placeholder: "默认",
    options: [
      { label: "是", value: "1" },
      { label: "否", value: "0" }
    ]
  },
  {
    label: "显示组件边框",
    labelWidth: 110,
    key: "border",
    type: "select",
    className: "is-2",
    placeholder: "默认",
    options: [
      { label: "是", value: "1" },
      { label: "否", value: "0" }
    ]
  },
  {
    label: "显示背景网格",
    labelWidth: 110,
    key: "grid",
    type: "select",
    className: "is-2",
    placeholder: "默认",
    options: [
      { label: "是", value: "1" },
      { label: "否", value: "0" }
    ]
  },
  {
    label: "显示拐点折线",
    labelWidth: 110,
    key: "inflexion",
    type: "select",
    value: "1",
    className: "is-2",
    placeholder: "默认",
    options: [
      { label: "是", value: "1" },
      { label: "否", value: "0" }
    ]
  }
];
export const filterPage = [
  {
    label: "一键定位/左右",
    className: "os-12",
    labelWidth: 110,
    key: "autoLeft",
    type: "select",
    options: [
      { label: "手动输入", value: "-1" },
      { label: "左侧居中", value: "leftCenter" },
      { label: "页面居中", value: "center" },
      { label: "右侧居中", value: "rightCenter" }
    ],
    placeholder: "定位",
    expression2: (model, val, controlForms2) => {
      // if (val !== "-1") {
      //   controlForms2(["left"], true);
      // } else {
      //   controlForms2(["left"], false);
      // }
    }
  },
  {
    label: "一键垂直居中",
    className: "os-12",
    labelWidth: 110,
    key: "autoTop",
    type: "select",
    options: [
      { label: "是", value: "1" },
      { label: "否", value: "0" }
    ],
    placeholder: "定位"
    // expression2: (model, val, controlForms2) => {
    //   if (val === "0") {
    //     controlForms2(["top"], false, model);
    //   } else {
    //     controlForms2(["top"], true, model);
    //   }
    // }
  },
  {
    label: "显示背景图片",
    labelWidth: 110,
    key: "backgroundImg",
    type: "select",
    className: "is-2",
    placeholder: "默认",
    options: [
      { label: "是", value: "1" },
      { label: "否", value: "0" }
    ]
  },
  {
    label: "反转图片",
    labelWidth: 110,
    key: "transform",
    type: "select",
    className: "is-2",
    placeholder: "默认",
    options: [
      { label: "是", value: "1" },
      { label: "否", value: "0" }
    ]
  }
];
