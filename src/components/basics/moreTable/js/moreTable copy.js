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
var a = false;
function p() {
  function w() {
    a = true;
  }
  w();
  return a;
}
p();
export const tablesJson = {
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
        headerName: "区县信息"
      },
      {
        rowSpan: "2",
        colSpan: 1,
        headerAlign: "center",
        isFixed: false,
        isSort: false,
        bodyAlign: "center",
        formatting: "String",
        headerName: "年份",
        bodyCode: "YEAR"
      },
      {
        rowSpan: 1,
        colSpan: "3",
        headerAlign: "center",
        isFixed: false,
        isSort: false,
        bodyAlign: "center",
        formatting: "String",
        headerName: "相关数据"
      }
    ],
    [
      {
        rowSpan: 1,
        colSpan: 1,
        headerAlign: "center",
        isFixed: false,
        isSort: false,
        bodyAlign: "center",
        formatting: "String",
        headerName: "名称",
        bodyCode: "DISTRICTNAME",
        minWidth: "120"
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
        bodyCode: "DISTRICTID"
      },
      {
        rowSpan: 1,
        colSpan: 1,
        headerAlign: "center",
        isFixed: false,
        isSort: true,
        bodyAlign: "right",
        formatting: "N0S",
        headerName: "人数（人）",
        minWidth: "120",
        bodyCode: "RS"
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
        bodyCode: "RC"
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
        bodyCode: "XMS"
      }
    ]
  ],
  Bodys: [
    {
      DISTRICTNAME: "全部",
      N_RC: 81.5098,
      N_XZS: 148.0,
      N_JE: 33659.393813,
      N_XMS: 84.0,
      H_RC: 0.0,
      H_XZS: 0.0,
      H_JE: 0.0,
      H_XMS: 0.0,
      RR: " ",
      RN: 1.0
    },
    {
      DISTRICTNAME: "万州区",
      N_RC: 1.8572,
      N_XZS: 1.0,
      N_JE: 682.7434,
      N_XMS: 15.0,
      H_RC: 0.0,
      H_XZS: 0.0,
      H_JE: 0.0,
      H_XMS: 0.0,
      RR: "500101",
      RN: 2.0
    }
  ]
};

