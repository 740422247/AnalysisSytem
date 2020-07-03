export const apiOptions = [
  {
    label: '地区数据',
    value: 'GetDistrictByYear',
    url: "/Api/MainPage/GetDistrictByYear",
    argument: { year: 2020 }
  },
  {
    label: '地图',
    value: 'GetMapAreaByYear',
    url: "/Api/MainPage/GetMapAreaByYear",
    argument: { year: 2020 }
  },
  {
    label: '项目列表',
    value: 'GetProjectListByYear',
    url:"/Api/MainPage/GetProjectListByYear",
    argument: { year: 2020 }
  },
  {
    label: '区县列表',
    value: 'GetCountryByYear',
    url:"/Api/MainPage/GetCountryByYear",
    argument: { year: 2020 }
  },
  {
    label: '乡镇列表',
    value: 'GetPoorCountryByYear',
    url:"/Api/MainPage/GetPoorCountryByYear",
    argument: { year: 2020 }
  },
]

