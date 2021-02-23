/* eslint-disable no-use-before-define */
import { headerActions } from "./headerActions";
import {
  isBar,
  isLine,
  isPie,
  isPieDouble,
  isRadar,
  isScatter,
  isChart,
  isSysForms,
  isCardList,
  isFiche,
  isPoorCountry,
  isTable,
  isTimeLine,
  ratioChartList2
} from "./echartOption";

export default {
  // 获取tool entity
  getToolEntity: (type, state, componentType, configUrl, model) => {
    return type === "container"
      ? getContainerEntity({ type })
      : getComponetEntity(state, componentType, configUrl, model);
  },
  // 页面头部信息entity
  getHeaderToolEntity: state => getHeaderEntity(state),
  // 克隆
  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  // 获取接口设置配置
  getSetApiEntity,
  getTableHeaderCols,
  getTableHeader,
  getCardEntity,
  getTableFormEntity,
  getSysFormsEntity: (state, sysModel) =>
    getSysFormItemsEntity(state, sysModel),
  getCardListEntity: (state, model) => getCardsList(state, model)
};

const stateNone = { label: '无', value: '' }
const getCardsList = state => {
  return [
    getGroup("cardData", "卡片数据设置", [
      getInputEntity("label", "显示名字", "text"),
      getSelectEntity("value", "显示字段", [
        stateNone,
        ...state.subTitle,
        ...state.apiArgument
      ]),
      getInputEntity("unit", "单位", "text", "填写该数据单位"),
      getSelectEntity("path", "跳转页面", [
        stateNone,
        ...state.routers
      ]),
      {
        ...getSelectEntity('param', '子页参数', [
          stateNone,
          ...state.subTitle,
          ...state.apiArgument
        ]),
        type: 'selectMultiple'
      },
      {
        label: "卡片图标",
        key: "src",
        className: "is-full",
        labelWidth: "80",
        type: "uploader",
        autoUpload: false, //取消选中自动上传,转base64返回
        sum: 1 //能选中的张数
      }
    ]),
    getGroup('cardUI', '卡片样式设置', [
      getFormatEntity('卡片格式'),
      getSelectEntity('cardWidth', '卡片宽度', [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
        { label: "11", value: 11 },
        { label: "12", value: 12 },
        { label: "13", value: 13 },
        { label: "14", value: 14 },
        { label: "15", value: 15 },
        { label: "16", value: 16 },
        { label: "17", value: 17 },
        { label: "18", value: 18 },
        { label: "19", value: 19 },
        { label: "20", value: 20 },
        { label: "21", value: 21 },
        { label: "22", value: 22 },
        { label: "23", value: 23 },
        { label: "24", value: 24 },
      ], "总共24格，每格占整行的1/24"),
      getSelectEntity('border', '边框设置'),
      getSelectEntity('grid', '背景设置'),
      getInputEntity('cHeight', '组件高度', 'text', '高度可以输入，如100px，100vh；‘px’为固定高度，‘vh’为屏幕高度的百分比'),
      getInputEntity('cPadding', '内边距', 'text'),
      getInputEntity('cMargin', '外边距', 'text'),
    ]),
  ]
}

const getSysFormItemsEntity = (state, sysModel) => {
  return [
    getGroup('formData', '数据设置', [
      // getBtn('保存表单', 'saveForm'),
      getInputEntity('id', '字段名', 'text', '后端swagger对应的字段',
        // [{ required: true, message: "字段名不能为空", trigger: "change" }]
      ),
      getInputEntity('label', '显示名', 'text', '用于表单显示，可见的名字',
        // [{ required: true, message: "显示名不能为空", trigger: "change" }]
      ),
      getInputEntity('placeholder', '提示名称', 'text', '用于表单显示，可见的名字',
        // [{ required: true, message: "显示名不能为空", trigger: "change" }]
      ),
      getSelectEntity("type", "表单类型", [
        { label: "输入框", value: "input" },
        { label: "时间选择", value: "datetime" },
        { label: "下拉选择", value: "select" }
      ]),
      getSelectEntity('formSystem', '选择系统', state.sys, '选择对应的系统'),
      getSelectEntity("api", "相关接口", state.dictionaries, '选择对应的字典项接口'),
      getSelectEntity('formWidth', '表单宽度', [
        { label: '2格', value: '16.7%' },
        { label: '3格', value: '25%' },
        { label: '4格', value: '33%' },
        { label: '6格', value: '50%' },
        { label: '12格', value: '100%' },
      ], '3格为总宽度得25%\n 4格为总宽度得33%\n 6格为总宽度得50%\n 12格为总宽度得100%\n'),
    ])
  ];
};

const getHeaderEntity = state => {
  const children = [
    getInputEntity('headerTitle', '标题设置', 'text'),
    getInputEntity('headerTitleAsync', '动态标题', 'textarea', '需要用来设置动态标题的字段,如：projectName&year'),
    getInputEntity('leftAndRight', '左右边距'),
    getInputEntity('topAndBottom', '上下边距'),
    { ...getSelectEntity('headerActions', '右侧按钮', headerActions), type: 'selectMultiple' },
    getSelectEntity('headerSubTitle', '副标题', [stateNone, ...state.headerTotal]),
    // getSelectEntity('headerSubTitle', '导出接口', state.headerTotal),
    {
      ...getSelectEntity("exportData", "导出设置", [stateNone, ...state.headerTotal]),
      type: "selectMultiple"
    }
  ];
  return [
    getGroup("headerTool", "头部信息", children),
    getGroup("headerFilter", "头部过滤", [
      getSelectEntity('headerFormSys', '选择系统', state.sys, '选择对应的系统'),
      getSelectEntity("headerApi", "相关接口", state.dictionaries, '选择对应的字典项接口'),
      getInputEntity('id', '字段名', 'text', '后端swagger对应的字段')
    ]),
  ];
};

function getSetApiEntity(state, el, model) {
  // console.log("get set api entity:", el);
  const { custom, isNoPath } = el;

  return [
    {
      label: "模块名称",
      key: "moduleName",
      type: "text",
      className: "is-full",
      labelWidth: "80",
      rules: [
        { required: true, message: "模块名称不能为空", trigger: "change" }
      ]
    },
    ...getApiPath(state, isNoPath, el),
    ...getApiModel(state, custom, model)
  ];
}

const getApiPath = (state, isNoPath, el) => isNoPath ? [] : [...getApiPathResult(state, el)];

const getApiPathResult = (state, el) => {
  const sys = getSelectEntity("systemId", "系统选择", state.sys, "", [
    { required: true, message: "系统不能为空", trigger: "change" }
  ]);
  if (el.configApi) {
    return [
      sys,
      ...el.configApi.map(item => ({
        label: item.name,
        key: item.value,
        type: "select",
        className: "is-full",
        labelWidth: 80,
        options: state.apiOpt
      }))
    ];
  } else {
    return [
      sys,
      {
        ...getSelectEntity("path", "接口选择", state.apiOpt, "选择对应得接口", [
          { required: true, message: "接口不能为空", trigger: "change" }
        ])
        // invisible: !model.systemId
      }
    ];
  }
};

function getApiModel(state, custom, model) {
  console.log("get api model", custom);
  if (!custom) {
    return [
      {
        label: "可选参数",
        key: "arguments",
        type: "selectMultiple",
        className: "is-full aaa",
        labelWidth: "80",
        // invisible: !model.path,
        options: state.apiArgument,
        rules: [
          {
            validator: (rule, value, callback) => {
              if (!value && !state.apiArgument) {
                return callback(new Error("可选参数不能为空"));
              } else {
                callback();
              }
            },
            trigger: "change"
          },
          { required: true, message: "可选参数不能为空", trigger: "blur" }
        ]
      },
      // {
      //   label: "是否单选",
      //   key: "isRadio",
      //   type: "select",
      //   className: "is-full aaa",
      //   labelWidth: "80",
      //   options: [
      //     { value: false, label: "否" },
      //     { value: true, label: "是" }
      //   ]
      // }
    ];
  }
  return [];
}

const alginArr = [
  { label: "left", value: "left" },
  { label: "center", value: "center" },
  { label: "right", value: "right" }
];

function getTableFormEntity(state, code) {
  return [
    getGroup("tableHeader", "表头单元格信息设置", getTableHeaderCell()),
    getGroup("tableBody", "表格列信息设置", getTableBody(state, code))
  ];
}

function getContainerEntity(el) {
  return [
    {
      label: "容器样式",
      key: "c1",
      children: [
        ...getWidth(),
        ...getUi(el),
        getInputEntity("RPadding", "内边距", "text"),
        getInputEntity("RMargin", "外边距", "text")
      ]
    }
  ];
}

// 表格处理
function getTableHeaderCols(model, el, sortHeader) {
  const titleModel = sortHeader.map(item =>
    el.argument.apiArgument.find(argu => argu.value === item)
  );
  // eslint-disable-next-line prefer-const
  let result = {};
  titleModel.forEach(item => {
    const names = item.label.split("#");
    result[item.value] = {
      showName: names.length === 1 ? item.label : `${names[0]}(${names[1]})`,
      isUrl: false,
      style: {
        "text-align": "center",
        "max-width": "360px"
      }
    };
  });
  return [result];
}

function getTableHeader(old, now) {
  if (old.length > now.length) {
    const i = old.findIndex(item => !now.some(h => h === item));
    old.splice(i, 1);
  } else if (old.length < now.length) {
    const add = now.find(item => !old.some(h => h === item));
    old.push(add);
  }
  return old;
}

function getCardEntity(state, el) {
  const fontWeithArr = [
    { label: "较细", value: "lighter" },
    { label: "常规", value: "normal" },
    { label: "较粗", value: "bold" }
  ];
  return [
    getGroup("cardGroup", "卡片组设置", [
      getBtn("卡片细节设置", "cardListSet"),
      getSelectEntity("cType", "展示方式", [
        { label: "横向", value: "rowList" },
        { label: "纵向", value: "columList" }
      ]),
      // getSelectEntity('path', '跳转页面', state.routers, '可以选择需要跳转的页面，不选择则不跳转。'),
      ...getConfigUrl(state)
    ]),
    // 2020-12-28 其他组件待加入
    getGroup("contactComponent", "组件头部过滤设置", [
      ...getComponentFilter(state),
      {
        ...getSelectEntity(
          "contactIds",
          "选择组件",
          [stateNone, ...state.headerTotal],
          "选择需要关联的页面组件"
        ),
        type: "selectMultiple"
      },
    ]),
    getGroup("dealElStyle", "卡片组样式设置", [
      ...getComponentCommonStyle(el),
      getSelectEntity(
        "justifyContent",
        "内容位置",
        [
          { label: "靠左", value: "flex-start" },
          { label: "居中", value: "center" },
          { label: "靠右", value: "flex-end" }
        ],
        "卡片内容，包括图片，卡片标题及数据的整体位置。"
      )
    ]),
    getGroup("imgSet", "图标样式整体设置", [
      getInputEntity(
        "imgSize",
        "图标尺寸",
        "text",
        "图标尺寸为高宽相等的正方形，填入数字"
      ),
      getSelectEntity("isBoxShadow", "背影设置"),
      getSelectEntity("isBorderRadius", "容器形状", [
        { label: "圆形", value: "circle" },
        { label: "方形", value: "square" }
      ])
    ]),
    getGroup("textSet", "卡片标题整体设置", [
      getInputEntity("textSize", "文本大小"),
      getSelectEntity("textFontWeight", "文本粗细", fontWeithArr),
      getInputEntity(
        "textColor",
        "文本颜色",
        "text",
        "支持16进制格式和rgba格式"
      ),
      getInputEntity(
        "textPadding",
        "内边距",
        "text",
        "格式：10px 5px 3px 2px;分别是上、右、下、左四个方向的内边距值；"
      )
    ]),
    getGroup("valueSet", "卡片数据值整体设置", [
      getInputEntity("valueSize", "字体大小"),
      getSelectEntity("valueFontWeight", "字体粗细", fontWeithArr),
      getInputEntity(
        "valueColor",
        "字体颜色",
        "text",
        "支持16进制格式和rgba格式"
      ),
      getInputEntity(
        "valuePadding",
        "内边距",
        "text",
        "格式：10px 5px 3px 2px;分别是上、右、下、左四个方向的内边距值；"
      )
    ]),
    getGroup("unitSet", "卡片单位整体设置", [
      getInputEntity("unitSize", "字体大小"),
      getSelectEntity("unitFontWeight", "字体粗细", fontWeithArr),
      getInputEntity(
        "unitColor",
        "字体颜色",
        "text",
        "支持16进制格式和rgba格式"
      ),
      getInputEntity(
        "unitPadding",
        "内边距",
        "text",
        "格式：10px 5px 3px 2px;分别是上、右、下、左四个方向的内边距值；"
      )
    ]),
  ];

  // 2020/12/01  停止使用
  // return [getGroup('cardGroup', '卡片设置', [
  // getSelectEntity("cType", "展示方式", [
  //   { label: '横向', value: 'jkCard:row' },
  //   { label: '纵向', value: 'jkCard:colum' },
  // ]),
  //   ...getWidth(),
  //   ...getUi({ type: 'jkCard' }),
  //   getInputEntity('cHeight', '组件高度'),
  //   getInputEntity('cPadding', '内边距', 'text'),
  //   getSelectEntity("showData", "展示数据", state.apiArgument, undefined, [{ required: true, message: "接口不能为空", trigger: "change" }]),
  //   getSelectEntity("path", "页面跳转", state.routers),
  //   {
  //     label: "用户头像",
  //     key: "avatar",
  //     className: "is-full",
  //     labelWidth: '80',
  //     type: "uploader",
  //     autoUpload: false, //取消选中自动上传,转base64返回
  //     sum: 1 //能选中的张数
  //   }
  // ])]
}

const getSysFormEntity = state => [
  getGroup("formTools", "过滤设置", [
    getInputEntity("cHeight", "组件高度", 'text', '高度可以输入，如100px，100vh；‘px’为固定高度，‘vh’为屏幕高度的百分比'),

    getBtn("过滤条件设置", "setForms")
  ]),
  getGroup("contactComponent", "关联组件", [
    {
      ...getSelectEntity(
        "contactIds",
        "选择组件",
        [stateNone, ...state.headerTotal],
        "选择需要关联的页面组件"
      ),
      type: "selectMultiple"
    }
  ])
];

const getPoorCountryEntity = (state, el) => [
  getGroup("poorCountry", "跳转地址", [...getConfigUrl(state)]),
  getGroup("dealElStyle", "组件样式", getComponentCommonStyle(el))
];

const getRatioChartList2 = el => ([
  getGroup('dealElStyle', '组件样式', getComponentCommonStyle(el)),
])

const getTimeLineEntity = (state, el) => ([
  getGroup('timeLineSet', '时间线设置', [
    getSelectEntity('rc', '人次', state.subTitle),
    getSelectEntity('je', '金额', state.subTitle),
    getSelectEntity('ym', '年月', state.subTitle),
    ...getConfigUrl(state)
  ]),
  getGroup("dealElStyle", "组件样式", getComponentCommonStyle(el))
]);

const getFicheEntity = (el, state) => {
  const cardData = [
    { label: "无", value: "" },
    ...state.apiArgument,
    ...state.subTitle
  ];
  return [
    getGroup("ficheSet", "卡片2设置", [
      getSelectEntity("titleName", "左上角", cardData),
      getSelectEntity("amount", "右上角", cardData),
      getInputEntity("unit", "右下角", "text"),
      ...getConfigUrl(state)
    ]),
    getGroup("dealElStyle", "组件样式", getComponentCommonStyle(el))
  ];
};
///////////////////////////////////////////////新增处理方法 2020-10-22////////////////////////////////////////////////

const getComponetEntity = (state, componentType, configUrl, el) => {
  console.log('component entity:', state, el)
  if (isCardList(el)) {
    return getCardEntity(state, el);
  } else if (isFiche(el)) {
    return getFicheEntity(el, state);
  } else if (isSysForms(el)) {
    return getSysFormEntity(state);
  } else if (isPoorCountry(el)) {
    return getPoorCountryEntity(state, el);
  } else if (isTimeLine(el)) {
    return getTimeLineEntity(state, el)
  } else if (ratioChartList2(el)) {
    return getRatioChartList2(el)
  }
  // else if (isTable(el)) {
  //   return
  // }

  return [
    getGroup(
      "dealData",
      "组件数据",
      getComponentData(state, componentType, el, configUrl)
    ),
    getGroup("dealElStyle", "组件样式", getComponentCommonStyle(el)),
    getGroup("contactComponent", "关联组件", [
      {
        ...getSelectEntity(
          "contactIds",
          "选择组件",
          [stateNone, ...state.headerTotal],
          "选择需要关联的页面组件"
        ),
        type: "selectMultiple"
      }
    ]),
    ...getSpecialGroup(el)
  ];
};
// 表头单元格格式 entity
const getTableHeaderCell = () => [
  getInputEntity("headerName", "列标题", "text", "表头名称", [
    { required: true, message: "表头名称不能为空", trigger: "blur" }
  ]),
  getInputEntity("rowSpan", "跨行数", "number", "单元格所占行的数量"),
  getInputEntity("colSpan", "跨列数", "number", "单元格所占列的数量"),
  getSelectEntity("headerAlign", "表头对齐", alginArr),
  getInputEntity("minWidth", "最小列宽"),
  // getSelectEntity("isFixed", "列固定", [
  //   { label: "不固定", value: false },
  //   { label: "固定", value: true }
  // ])
];
// 表格单元格格式 entity
const getTableBody = (state, code) => ([
  getSelectEntity('bodyCode', '列字段', code),
  getSelectEntity('isSort', '排序', [
    { label: '是', value: true },
    { label: '否', value: false }
  ], "‘是’表示该列支持排序，‘否’表示该列不支持排序"),
  // getSelectEntity('path', '跳转页面', state.routers, '可以选择需要跳转的页面，不选择则不跳转。'),
  ...getUrlPath(state, code),
  // { ...getSelectEntity('param', '子页参数', code, '子页面需要传入的参数'), type: 'selectMultiple' },
  getSelectEntity('bodyAlign', '表格对齐', alginArr),
  // 待处理 2020-12-21
  getFormatEntity('列格式')

])
// 数字格式化
const formatArr = [
  { label: '文本', value: 'String' },
  { label: '千分位分隔符，2位小数', value: 'N2S' },
  { label: '千分位分隔符，整数', value: 'N0S' },
  { label: '2位小数', value: 'n2' },
  { label: '整数', value: 'n0' }
]
const getFormatEntity = (label) =>
  getSelectEntity('formatting', label, formatArr)

// 表格汇总行设置 entity
const getTableTotalEntity = () => [
  getInputEntity("totalColor", "字体颜色", "text")
];
// 表格分页信息设置
const getTablePaging = () => [
  getSelectEntity('isPaging', '是否分页',
    [
      { label: '分页', value: false },
      { label: '不分页', value: true },
    ]
    , '默认分页,分页默认长度是一页10条,由于分页信息改变会重复请求，该功能在此处不展示，请在普通用户页面查看'),
  getInputEntity('tablePageSize', '页码长度', 'number', '一页需要显示的数量，由于分页信息改变会重复请求，该功能在此处不展示，请在普通用户页面查看')
]

///////////////////////////////////////// 组件个性样式
// 细节样式分组
const getSpecialGroup = el => {
  if (isChart(el)) {
    return [getGroup("dealSpecialStyle", "组件个性样式", getSpecialUi(el))];
  } else if (el.type.includes("jkTable")) {
    return [
      getGroup("tableTotal", "汇总行样式设置", getTableTotalEntity()),
      getGroup('tablePage', '表格分页信息', getTablePaging())
    ];
  } else if (el.type.includes('jkRank:multipleRank')) {
    return [getGroup("formatting", "需格式化的数据", getJkRankMultipleRankSpecial(el))]
  } else {
    return [];
  }
};
const getJkRankMultipleRankSpecial = (el) => {
  const { argument } = el
  const opt = argument.apiArgument.filter(item => item.label.includes('#')).map(item => ({ ...item, label: item.label.split('#')[0] }))
  // const opt = pageForms.showData.map(item => argument.apiArgument.find(a => a.value === item)).map(item => ({ ...item, label: item.label.split('#')[0] }))
  return opt.map(item => (getSelectEntity(item.value, item.label, formatArr)))
}
// tooltip
const getTooltip = type => [
  getSelectEntity("showTooltip", "提示框"),
  getInputEntity(
    "formatTooltip",
    "提示样式",
    "textarea",
    getTooltipString(type)
  )
];

const getLegendOptions = [
  { label: "隐藏", value: false },
  { label: "左侧显示", value: "left" },
  { label: "右侧显示", value: "right" },
  { label: "顶部显示", value: "top" },
  { label: "底部显示", value: "bottom" }
];

const getTooltipString = type => {
  const t = { type };
  if (isBar(t) || isLine(t)) {
    return `{a}：展示数据名称，\n {b}：数据标题名称，\n {c}：展示数据对应的数据值，\n {u}：展示数据对应的单位`;
  } else if (isPie(t) || isPieDouble(t)) {
    return `{a}：展示数据名称，\n {b}：数据标题名称，\n {c}：展示数据对应的数据值，\n {d}：展示数据对应的百分比`;
  } else if (isRadar(t)) {
    return `{a}：展示数据名称，\n {b}：数据标题名称及展示数据数据值，`;
  } else if (isScatter(t)) {
    return `{a}：显示值的名称，\n {b}：显示值的数据值，\n{x}：x轴数据值，\n{y}：y轴数据值`;
  }
};

const getSpecialUi = ({ type }) => {
  if (!type.includes("Chart")) return [];
  const result = [
    getSelectEntity("tag", "标签"),
    getSelectEntity("legend", "图例", getLegendOptions),
    ...getTooltip(type)
  ];

  if (type.includes("barChart")) {
    return getBarSpecial(result);
  } else if (isPie({ type })) {
    return getPieSpecial(result);
  } else if (isPieDouble({ type })) {
    return getPieDoubleSpecial(result);
  } else if (type.includes("lineChart")) {
    return getLineSpecial(result);
  } else if (isScatter({ type })) {
    return getScatterSpecial(result);
  } else {
    return result;
  }
};

///////////////////////////////////////// 组件样式处理
const getComponentCommonStyle = el => {
  const common = [
    getInputEntity('title', '标题', 'text'),
    getFormatEntity('数值格式'),
    ...getUi(el),
    ...getWidth(),
    getInputEntity("cHeight", "组件高度", 'text', '高度可以输入，如100px，100vh；‘px’为固定高度，‘vh’为屏幕高度的百分比'),
    getInputEntity("cPadding", "内边距", "text")
  ];
  if (isTable(el)) {
    const yesOrNo = [
      { label: '是', value: true },
      { label: '否', value: false },
    ]
    return [
      ...common,
      getSelectEntity(
        "hideBorder",
        "隐藏边框",
        yesOrNo,
        "表格的边框是否显示，默认显示"
      ),

    ];
  } else {
    return common;
  }
};



const getWidth = () => ([
  {
    label: "宽度(格)",
    key: "cWidth",
    type: "select",
    className: "is-full",
    labelWidth: 80,
    options: [
      {
        label: 1,
        value: "jk-col-1"
      },
      {
        label: 2,
        value: "jk-col-2"
      },
      {
        label: 3,
        value: "jk-col-3"
      },
      {
        label: 4,
        value: "jk-col-4"
      },
      {
        label: 5,
        value: "jk-col-5"
      },
      {
        label: 6,
        value: "jk-col-6"
      },
      {
        label: 7,
        value: "jk-col-7"
      },
      {
        label: 8,
        value: "jk-col-8"
      },
      {
        label: 9,
        value: "jk-col-9"
      },
      {
        label: 10,
        value: "jk-col-10"
      },
      {
        label: 11,
        value: "jk-col-11"
      },
      {
        label: 12,
        value: "jk-col-12"
      },
      {
        label: 13,
        value: "jk-col-13"
      },
      {
        label: 14,
        value: "jk-col-14"
      },
      {
        label: 15,
        value: "jk-col-15"
      },
      {
        label: 16,
        value: "jk-col-16"
      },
      {
        label: 17,
        value: "jk-col-17"
      },
      {
        label: 18,
        value: "jk-col-18"
      },
      {
        label: 19,
        value: "jk-col-19"
      },
      {
        label: 20,
        value: "jk-col-20"
      },
      {
        label: 21,
        value: "jk-col-21"
      },
      {
        label: 22,
        value: "jk-col-22"
      },
      {
        label: 23,
        value: "jk-col-23"
      },
      {
        label: 24,
        value: "jk-col-24"
      }
    ]
  }
]);

const getUi = el => {
  if (el.type.includes("jkTable")) {
    return [getSelectEntity("border", "边框设置")];
  } else {
    return [
      getSelectEntity("border", "边框设置"),
      getSelectEntity("grid", "背景设置")
    ];
  }
  // if (el.type.includes('wssForms')) return []
};

/////////////////////////////////////////组件数据处理

// 调整整体设置
const getUrlPath = (state, code) => {
  // console.log('get url path:', state, code)
  const none = { label: "无需跳转", value: "" };
  const common = [
    getSelectEntity("path", "页面跳转", [none, ...state.routers]),
    getInputEntity(
      "pathParam",
      "固定参数",
      "textarea",
      '子界面需要传入的固定参数，格式：projectId=aaa&projectName="两不愁"'
    )
  ];
  return !code ? common : [...common, { ...getSelectEntity('param', '子页参数', code, '子页面需要传入的参数'), type: 'selectMultiple' }]
}

const getConfigUrl = (state, configUrl) => {
  const none = { label: "无需跳转", value: "" };
  if (!configUrl) {
    return getUrlPath(state)
    // [
    //   getSelectEntity("path", "页面跳转", [none, ...state.routers]),
    //   getInputEntity(
    //     "pathParam",
    //     "固定参数",
    //     "textarea",
    //     '子界面需要传入的固定参数，格式：projectId=aaa&projectName="两不愁"'
    //   )
    // ];
  } else {
    return configUrl.map(item => ({
      label: item.name,
      key: item.value,
      type: "select",
      className: "is-full",
      labelWidth: 80,
      options: [none, ...state.routers]
    }));
  }
};

// // 获取组件公共数据
const getComponentFilter = state => [
  getSelectEntity(
    "selectLabel",
    "过滤显示",
    [stateNone, ...state.subTitle, ...state.apiArgument],
    "用于过滤条件显示"
  ),
  getSelectEntity(
    "selectValue",
    "过滤字段",
    [stateNone, ...state.subTitle, ...state.apiArgument],
    "用于查询得字段"
  ),
  getInputEntity('selectKey', '字段名', 'text')
];
const getComponentData = (state, componentType, el, configUrl) => {
  if (!el.custom) {
    console.log('get component data')
    if (isTable(el)) {
      return [
        getBtn("表头设置", "formatTableHeader"),
        ...getConfigUrl(state, configUrl),
        ...getComponentFilter(state)
      ];
    } else if (isScatter({ type: el.type })) {
      return [
        ...getConfigUrl(state, configUrl),
        getSelectEntity("XData", "X轴数据", state.apiArgument, undefined, [
          { required: true, message: "X数据不能为空", trigger: "change" }
        ]),
        getSelectEntity("YData", "Y轴数据", state.apiArgument, undefined, [
          { required: true, message: "Y数据不能为空", trigger: "change" }
        ]),
        getSelectEntity("showData", "显示值", state.subTitle, undefined, [
          { required: true, message: "显示值不能为空", trigger: "change" }
        ]),
        ...getComponentFilter(state)
      ];
    } else {
      return [
        ...getConfigUrl(state, configUrl),
        getSelectEntity("showTitle", "数据标题", state.subTitle, undefined, [
          { required: true, message: "数据标题不能为空", trigger: "change" }
        ]),
        {
          label: "展示数据",
          key: "showData",
          type: componentType ? "select" : "selectMultiple",
          className: "is-full",
          labelWidth: 80,
          options: state.apiArgument,
          rules: [
            { required: true, message: "展示数据不能为空", trigger: "change" }
          ]
        },
        ...getComponentFilter(state)
      ];
    }
  } else {
    return getConfigUrl(state, configUrl);
  }
};

/////////////////////////////////////////////// 各种图形特殊配置项 /////////////////////////////////////////

// 柱条图
const getBarSpecial = result => [
  ...result,
  getSelectEntity("showType", "显示类型", [
    { label: "簇状柱形", value: "commonBar" },
    { label: "堆叠柱状", value: "pileBar" },
    { label: "簇状条形", value: "commonStrip" },
    { label: "堆叠条形", value: "pileStrip" }
  ]),
  getSelectEntity("showX", "X轴"),
  getSelectEntity("showY", "Y轴"),
  getSelectEntity("isBorderRadius", "是否圆角", [
    { label: "是", value: true },
    { label: "否", value: false }
  ]),
  getSelectEntity("showZero", "显示0值"),
  {
    label: "柱形宽度",
    key: "barWidth",
    type: "text",
    className: "is-full",
    labelWidth: "80"
  }
];
// 饼状图
const getPieSpecial = result => [
  ...result,
  getSelectEntity("showType", "显示类型", [
    { label: "饼形图", value: "cakePie" },
    { label: "环形图", value: "annular" }
  ]),
  ...getPieCommon()
];
// 饼形公共项
const getPieCommon = () => [
  getInputEntity("radiusWidth", "环形宽度"),
  getInputEntity("radiusInterval", "环间距")
];
// 饼形复合图
const getPieDoubleSpecial = result => [
  ...result,
  getSelectEntity("segmentation", "分割依据", [
    { label: "值", value: "value" },
    { label: "百分比值", value: "percentage" }
  ]),
  getInputEntity("lessThan", "值小于", "text"),
  getInputEntity("zoom", "两圆比例"),
  ...getPieCommon()
];
// 折线图
const getLineSpecial = result => [
  ...result,
  getSelectEntity("showZero", "显示0值"),
  getSelectEntity("smooth", "是否平滑", [
    { label: "是", value: true },
    { label: "否", value: false }
  ]),
  {
    label: "线条宽度",
    key: "lineWidth",
    type: "number",
    className: "is-full",
    labelWidth: "80"
  },
  getSelectEntity("symbol", "标记样式", [
    stateNone,
    { label: "◉", value: "circle" },
    { label: "◼", value: "rect" },
    // { label: '■', value: 'roundRect' },
    { label: "▲", value: "triangle" },
    { label: "◆", value: "diamond" },
    { label: "大头针", value: "pin" },
    { label: "箭头", value: "arrow" }
  ]),
  getInputEntity("symbolSize", "标记大小"),
  getInputEntity("symbolColor", "标记颜色", "text")
];
// 散点图
const getScatterSpecial = result => [
  getInputEntity("symbolSize", "标记大小", "number"),
  ...getTooltip("jkChart:scatterChart")
];

/////////////////////////////////////////////// 各种图形特殊配置项 /////////////////////////////////////////

// entity 公共方法
function getSelectEntity(key, label, opt, title, rules = []) {
  // eslint-disable-next-line no-unneeded-ternary
  const options = opt
    ? opt
    : [
      { label: "显示", value: true },
      { label: "隐藏", value: false }
    ];
  return {
    label: label,
    key: key,
    type: "select",
    className: "is-full",
    labelWidth: "80",
    options,
    rules,
    title
  };
}

const getInputEntity = (key, label, type = "number", title, rules = []) => ({
  label,
  key,
  type,
  className: "is-full",
  labelWidth: 80,
  rules,
  title
});

const getGroup = (key, label, children) => ({ key, label, children });

const getBtn = (name, key, icon) => ({
  name,
  key,
  type: "action",
  className: "is-full",
  icon,
  labelWidth: 1,
  style: { float: "left" }
});
