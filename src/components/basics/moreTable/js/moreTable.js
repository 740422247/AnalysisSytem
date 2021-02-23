export const moreTablesJson = [
  [
    {
      rowSpan: "2",
      colSpan: 1,
      headerAlign: "center",
      isFixed: false,
      bodyAlign: "center",
      formatting: "String",
      headerName: "AAA",
      minWidth: "80",
      bodyCode: "NAME",
      path: "Q7zFKm6I3U6KhRG6RPAbPA",
      param: ["CODE", "NAME", "PERSON"],
      headerStyle: { textAlign: "center", minWidth: "80px" },
      bodyStyle: { textAlign: "center" },
      location: {
        path: "Q7zFKm6I3U6KhRG6RPAbPA",
        param: ["CODE", "NAME", "PERSON"]
      }
    },
    {
      rowSpan: 1,
      colSpan: 1,
      headerAlign: "center",
      isFixed: false,
      bodyAlign: "center",
      formatting: "String",
      headerName: "BBB",
      minWidth: "159",
      headerStyle: { textAlign: "center", minWidth: "159px" },
      bodyStyle: { textAlign: "center" }
    }
  ],
  [
    {
      rowSpan: 1,
      colSpan: 1,
      headerAlign: "center",
      isFixed: false,
      bodyAlign: "right",
      formatting: "N2S",
      headerName: "B1",
      minWidth: "80",
      bodyCode: "PERSON",
      path: "744fc770d93a457c926e3940a6cdf8e7",
      param: ["PERSON", "NAME"],
      headerStyle: { textAlign: "center", minWidth: "80px" },
      bodyStyle: { textAlign: "right" },
      location: {
        path: "744fc770d93a457c926e3940a6cdf8e7",
        param: ["PERSON", "NAME"]
      }
    },
    {
      rowSpan: 1,
      colSpan: 1,
      headerAlign: "center",
      isFixed: false,
      bodyAlign: "center",
      formatting: "n2",
      headerName: "B2",
      bodyCode: "PERSONTIME",
      path: "f6b46c53bb254981bc4d7b1e4229559c",
      param: ["PERSON", "PERSONTIME", "CODE"],
      headerStyle: { textAlign: "center", minWidth: "undefinedpx" },
      bodyStyle: { textAlign: "center" },
      location: {
        path: "f6b46c53bb254981bc4d7b1e4229559c",
        param: ["PERSON", "PERSONTIME", "CODE"]
      }
    }
  ]
];
export const tablesJson = {
  globals: { isSerialNumBer: false }, //是否显示序号
  Headers: [
    [
      {
        rowSpan: "1",
        colSpan: "2",
        headerAlign: "center",
        isFixed: true,
        isSort: false,
        bodyAlign: "center",
        formatting: "String",
        headerName: "区县信息",
        headerStyle: {
          textAlign: "center",
          minWidth: "undefinedpx"
        },
        bodyStyle: {
          textAlign: "center"
        }
      },
      {
        rowSpan: 1,
        colSpan: "3",
        headerAlign: "center",
        isFixed: false,
        isSort: false,
        bodyAlign: "center",
        formatting: "String",
        headerName: "相关数据",
        headerStyle: {
          textAlign: "center",
          minWidth: "undefinedpx"
        },
        bodyStyle: {
          textAlign: "center"
        }
      },
      {
        rowSpan: "2",
        colSpan: 1,
        headerAlign: "center",
        isFixed: false,
        isSort: true,
        bodyAlign: "center",
        formatting: "String",
        headerName: "年份",
        bodyCode: "YEAR",
        headerStyle: {
          textAlign: "center",
          minWidth: "undefinedpx"
        },
        bodyStyle: {
          textAlign: "center"
        }
      }
    ],
    [
      {
        rowSpan: 1,
        colSpan: 1,
        headerAlign: "center",
        isFixed: false,
        isSort: true,
        bodyAlign: "center",
        formatting: "String",
        headerName: "名称",
        sortord: "front", //前端排序
        bodyCode: "DISTRICTNAME",
        minWidth: "120",
        headerStyle: {
          textAlign: "center",
          minWidth: "120px"
        },
        bodyStyle: {
          textAlign: "center"
        }
      },
      {
        rowSpan: 1,
        colSpan: 1,
        headerAlign: "center",
        isFixed: false,
        isSort: false,
        bodyAlign: "right",
        formatting: "String",
        headerName: "编码",
        minWidth: "100",
        bodyCode: "DISTRICTID",
        headerStyle: {
          textAlign: "center",
          minWidth: "100px"
        },
        bodyStyle: {
          textAlign: "right"
        }
      },
      {
        rowSpan: 1,
        colSpan: 1,
        headerAlign: "center",
        isFixed: false,
        isSort: false,
        bodyAlign: "right",
        formatting: "N0S",
        headerName: "人次（人次）",
        minWidth: "120",
        bodyCode: "RC",
        headerStyle: {
          textAlign: "center",
          minWidth: "120px"
        },
        bodyStyle: {
          textAlign: "right"
        }
      },
      {
        rowSpan: 1,
        colSpan: 1,
        headerAlign: "center",
        isFixed: false,
        isSort: true,
        bodyAlign: "right",
        formatting: "N2S",
        headerName: "人数（人）",
        minWidth: "120",
        bodyCode: "RS",
        headerStyle: {
          textAlign: "center",
          minWidth: "120px"
        },
        bodyStyle: {
          textAlign: "right"
        },
        path: "7lFmWiBZskOyIoShTmtAWQ",
        // param: ["DISTRICTID"],
        //测试参数传递
        location: {
          path: "7lFmWiBZskOyIoShTmtAWQ",
          param: ["DISTRICTID"]
        }
      },
      {
        rowSpan: 1,
        colSpan: 1,
        headerAlign: "center",
        isFixed: false,
        isSort: true,
        bodyAlign: "right",
        formatting: "n2",
        headerName: "项目数（个）",
        minWidth: "120",
        bodyCode: "XMS",
        headerStyle: {
          textAlign: "center",
          minWidth: "120px"
        },
        bodyStyle: {
          textAlign: "right"
        }
      }
    ]
  ],
  Bodys: [
    {
      DISTRICTNAME: "6排序测试.硕大的1",
      DISTRICTID: "A",
      RS: 78888,
      YEAR: 2017,
      RC: 15024,
      XMS: 2544
    },
    {
      DISTRICTNAME: "212硕大的2",
      DISTRICTID: "B",
      RS: 788.88,
      YEAR: 2017,
      RC: 15024,
      XMS: 2.544
    },
    {
      DISTRICTNAME: "1ASD硕大的3",
      DISTRICTID: "D",
      RS: 178888,
      YEAR: 20217,
      RC: 15024,
      XMS: 2544
    },
    {
      DISTRICTNAME: "5*u^@硕大的4",
      DISTRICTID: "C",
      RS: 28888,
      YEAR: 22017,
      RC: 154024,
      XMS: 12544
    },
    {
      DISTRICTNAME: "5*u^@硕大的4",
      DISTRICTID: "C",
      RS: 28888,
      YEAR: 22017,
      RC: 154024,
      XMS: 12544
    },
    {
      DISTRICTNAME: "5*u^@硕大的4",
      DISTRICTID: "C",
      RS: 28888,
      YEAR: 22017,
      RC: 154024,
      XMS: 12544
    },
    {
      DISTRICTNAME: "5*u^@硕大的4",
      DISTRICTID: "C",
      RS: 28888,
      YEAR: 22017,
      RC: 154024,
      XMS: 12544
    },
    {
      DISTRICTNAME: "5*u^@硕大的4",
      DISTRICTID: "C",
      RS: 28888,
      YEAR: 22017,
      RC: 154024,
      XMS: 12544
    },
    {
      DISTRICTNAME: "5*u^@硕大的4",
      DISTRICTID: "C",
      RS: 28888,
      YEAR: 22017,
      RC: 154024,
      XMS: 12544
    },
    {
      DISTRICTNAME: "5*u^@硕大的4",
      DISTRICTID: "C",
      RS: 28888,
      YEAR: 22017,
      RC: 154024,
      XMS: 12544
    },
    {
      DISTRICTNAME: "5*u^@硕大的4",
      DISTRICTID: "C",
      RS: 28888,
      YEAR: 22017,
      RC: 154024,
      XMS: 12544
    },
    {
      DISTRICTNAME: "5*u^@硕大的4",
      DISTRICTID: "C",
      RS: 28888,
      YEAR: 22017,
      RC: 154024,
      XMS: 12544
    },
    {
      DISTRICTNAME: "5*u^@硕大的4",
      DISTRICTID: "C",
      RS: 28888,
      YEAR: 22017,
      RC: 154024,
      XMS: 12544
    },
    {
      DISTRICTNAME: "汇总",
      DISTRICTID: "汇总2",
      RS: 28888,
      YEAR: 22017,
      RC: 154024,
      XMS: 12544
    }
  ],
  headersIdentity: [
    {
      id: "CFS-bHSsqkiFk3SO6BkhKQ",
      parentId: "ROOT",
      index2: 6,
      level: 2,
      index: 9,
      fieldName: "YEAR",
      isFixed: false,
      headerName: "年份",
      alignment: "Left",
      formatType: "Default"
    },
    {
      id: "O5HeHVWS40Ks-YR5RdOZXA",
      parentId: "H8NgaO0T7UiyXkcMdRNFoA",
      index2: 1,
      level: 3,
      index: 3,
      fieldName: "DISTRICTNAME",
      isFixed: false,
      headerName: "名称",
      alignment: "Left",
      formatType: "Default"
    },
    {
      id: "8vR02Me40Eih1fF9HltRMg",
      parentId: "H8NgaO0T7UiyXkcMdRNFoA",
      index2: 2,
      level: 3,
      index: 4,
      fieldName: "DISTRICTID",
      isFixed: false,
      headerName: "编码",
      alignment: "Left",
      formatType: "Default"
    },
    {
      id: "C0LoMqdjD0ml89yHSERYhw",
      parentId: "AOE31LvlskSDQnYvFOoYRg",
      index2: 3,
      level: 3,
      index: 6,
      fieldName: "RC",
      isFixed: false,
      headerName: "人次（人次）",
      alignment: "Left",
      formatType: "N0S"
    },
    {
      id: "VjkZ2dhlW0CAJkxAsg1e_g",
      parentId: "AOE31LvlskSDQnYvFOoYRg",
      index2: 4,
      level: 3,
      index: 7,
      fieldName: "RS",
      isFixed: false,
      headerName: "人数（人）",
      alignment: "Left",
      formatType: "N2S"
    },
    {
      id: "2PAU3VcJZ0yngNF3D9T2LA",
      parentId: "AOE31LvlskSDQnYvFOoYRg",
      index2: 5,
      level: 3,
      index: 8,
      fieldName: "XMS",
      isFixed: false,
      headerName: "项目数（个）",
      alignment: "Left",
      formatType: "Default"
    }
  ]
};
