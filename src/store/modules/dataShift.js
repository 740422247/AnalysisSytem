export default (id, data, type) => {
  if (id === 'GetAgeSex') {
    return getObjectToArray(data.data);
  } else if (id === 'GetAgeGroupAnalysis') {
    return getApiValue(data);
  } else if (id === 'GetPoorCountryAnalysisLsit' || id === 'Getsxqkb') {
    return normalTable(type, data.data);
  } else if (id === 'GetProjectDetailSearch' || id === 'GetPerson') {
    const { Title, Items, Remark } = data.data[0];
    const { PageInfo, Total, ...rest } = Items
    return normalTable(type, rest.Items, Title, PageInfo, Total, Remark);
  } else if (id === "GetZdxzList" || id === 'GetQxList') {
    const { TITLE, items } = data.data[0];
    return normalTable(type, items, TITLE)
  }
  else {
    return data.data
  }

}

// 接口出参格式：{"nnd":["0-19岁","20-29岁","30-39岁","40-49岁","50-59岁","60-69岁","70-79岁","80-89岁","90岁以上"],
//                "mans":["70581","38163","54452","272416","383386","286870","194934","58915","5676"],
//                "womans":["64487","29978","27907","80498","95588","74317","68316","29233","4621"]}
function getObjectToArray(data) {
  const dataKeys = Object.keys(data);
  const first = data[dataKeys[0]];
  return first.map((_item, index) => {
    let obj = {};
    for (let k in data) {
      obj[k] = data[k][index];
    };
    return obj;
  });
}

// 接口出参格式：{data:[{VALUE:[]}]}
function getApiValue(data) {
  return data.data[0].VALUE;
}

// 接口出参格式：{data:[{表头},{body}]}
function normalTable(type, data, title, pageInfo, total, remark) {
  const result = type === 'table' ?
    {
      Headers: data[0],
      Bodys: data.slice(1, data.length),
      title, pageInfo, total, remark
    } : data.slice(1, data.length);
  return data.slice(1, data.length)
}
