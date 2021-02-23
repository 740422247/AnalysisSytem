import { dealZero } from '@components/chart/jkGraph/option/dataDeal'
// import { for } from 'core-js/fn/symbol';
// 获取options
export const getOptions = (component) => {
  const { argument, pageForms } = component;
  const legendData = getLegendData(
    argument.apiArgument,
    pageForms.showData,
    component
  );
  // console.log(legendData, component)
  return {
    grid: getGridBylegend(component),
    xAxis: { show: getAxisShow(component, component.pageForms.showX) },
    yAxis: { show: getAxisShow(component, component.pageForms.showY) },
    legend: {
      show: pageForms.legend,
      data: legendData,
      ...getLegend(component)
    },
    tooltip: getTooltip(component),
    series: getSeries(legendData, pageForms, component),
    ...getSpecial(component)
  }
}

export const getCardListResult = (forms, data) => {
  // console.log('get card list result:', forms, data)
  return forms.map(item => ({
    ...item,
    value: data[item.value],
    path: [item.path]
  }))
}

// 获取tooltip
const getTooltip = (component) => {
  if (!component.pageForms.showTooltip) {
    return { show: false }
  } else {
    return {
      show: true,
      formatter: (params) => getTooltipResult(params, component)
    }
  }
}
const getTooltipResult = (params, el) => {
  // console.log('get tool tip result:', params)
  if (isBar(el) || isLine(el) || isPie(el) || isPieDouble(el)) {
    return getCommonFormat(params, el)
  } else if (isScatter(el)) {
    return getScatterFormat(params, el)
  } else if (isRadar(el)) {
    return getRadarFormat(params, el)
  }
  // else if (isTwoBarChart(el)) {
  //   return getTwoBarChartFormat(params, el)
  // }
}
// 获取series
export const getSeries = (names, model, el) => {
  if (!names.length && isScatter(el)) {
    return getScatterSeries(names, model, el)
  } else if (!names.length) {
    return;
  };
  if (typeof (names) === 'string') { names = [names] };
  if (isPie(el)) {
    return getPieSeries(el, model)
  } else if (isPieDouble(el)) {
    return getPieDoubleSeries(el.data.value, model, el)
  } else if (isRadar(el)) {
    return getRadarSeries(el)
  } else if (isBar(el)) {
    return getBarSeries(names, model, el)
  } else if (isLine(el)) {
    return getLineSeries(names, model, el)
  } else {
    return names.map((item) => ({
      name: item,
      label: { show: model.tag, position: "top", color: '#fff' }
    }));
  }
}
// 获取特殊字段内容
export const getSpecial = (component) => {
  const { value, label } = component.data
  // if (!value) return;
  if (isRadar(component)) {
    const max = Math.max(...value.toString().split(',')) * 1.2;
    if (isPlanarArray(value)) {
      return { radar: { indicator: label.map((item, index) => ({ name: item, max })) } }
    } else {
      return { radar: { indicator: label.map((item, index) => ({ name: item, max: value[index] })) } }
    }
  } else {
    return {}
  }
}
// 获取legend数据
export const getLegendData = (apiArgument, showData, el) => {
  if (isPie(el) || isPieDouble(el)) {
    return el.data.label
  } else if (isScatter(el)) {
    return []
  } else if (isLine(el) || isBar(el)) {
    return el.pageForms.showData.map(item => el.argument.apiArgument.find(a => a.value === item).label.split('#')[0])
  } else if (isPlanarArray(el.data.value)) {
    return el.data.value //showData.map(item => apiArgument.find(a => a.value === item).label.split('#')[0])
  } else {
    return [apiArgument.find(item => item.value === showData[0]).label.split('#')[0]]
  }
}
export const getLegend = (component) => ({
  // type: component.data.label.length ? "scroll" : 'plain',
  icon: 'circle',
  pageIconColor: '#fff',
  pageIconInactiveColor: '#ccc',
  textStyle: { color: "#fff" },
  pageTextStyle: { color: "#fff" },
  ...dealLegend(component)
})

// 判断是否是pie 饼状图
export const isCardList = el => el.type.includes('jkCard')
export const isFiche = el => el.type.includes('wssFiche')
// 名字取错 遗憾
export const ratioChartList2 = el => el.type.includes('ratioChartList2')
export const isTimeLine = el => el.type.includes('timeLine')
export const isPoorCountry = el => el.type.includes('PoorCountry')
export const isSysForms = el => el.type.includes('wssForms')
export const isTable = el => el.type.includes('jkTable')
export const isChart = el => el.type.includes('Chart')
export const isBar = el => el.type.includes('barChart')
export const isLine = el => el.type.includes('lineChart')
export const isPie = el => el.type.includes('pieChart') && !isPieDouble(el)
export const isTwoBarChart = el => el.type.includes('twoBarChart')
export const isPieDouble = el => el.type.includes('pieChartDouble')
export const getRadius = (el) => ((isPie(el) && el.pageForms && el.pageForms.showType.includes('annular')) ? { radius: ['50%', '70%'] } : null)
// 判断是否是radar 雷达图
export const isRadar = el => el.type.includes('radarChart')
// 判断是否是 scatter 散点图
export const isScatter = el => el.type.includes('scatterChart')
// 判断是否是二维数组
export const isPlanarArray = arr => Array.isArray(arr) && Array.isArray(arr[0])
// 是否考虑显示坐标轴
/////////////////////////////////////////////////// 内部使用方法 //////////////////////////////////////////

const getAxisShow = (component, show) => !(isPie(component) || isRadar(component) || isPieDouble(component)) && show
// 根据图例位置获取grid结果集
const getGridBylegend = ({ pageForms }) => {
  const grid = {
    top: "6%",
    bottom: "6%",
    left: '6%',
    right: "6%"
  };
  if (!pageForms.legend) return grid;
  const flat = pageForms.legend;
  if (flat === 'left' || flat === 'right') {
    return { ...grid, [flat]: 120 }
  } else {
    return { ...grid, [flat]: 50 }
  }
}
// legend 调整
const dealLegend = ({ pageForms }) => {
  // eslint-disable-next-line no-useless-return
  if (!pageForms) return;
  if (pageForms.legend === 'left' || pageForms.legend === 'right') {
    return {
      left: pageForms.legend,
      top: 'middle',
      orient: 'vertical'
    }
  } else {
    return {
      left: 'center',
      top: pageForms.legend,
      orient: 'horizontal'
    }
  }
}

// 获取tooltip format 格式化字符串
const getCommonFormat = (params, el) => {
  const { formatTooltip } = el.pageForms;
  const { symbol } = el.data
  let result = '';
  if (!Array.isArray(params)) {
    params = [params]
  }
  params.forEach((item, index) => {
    if (typeof (item.color) === 'string') {
      result += item.marker
    } else {
      result += '<span style="background-color: ' +
        item.color.colorStops[0].color +
        ';display:inline-block;border-radius:12px;width:12px;height:12px;margin-right:8px"></span>'
    }
    if (isLine(el)) {
      result += getLineItemTooltip(item, symbol, formatTooltip, index);
    } else {
      result += !formatTooltip
        ? `${item.seriesName}${item.name}：${item.value}${symbol[index]}<br/>`
        : formatTooltip
          .replace(/{a}/g, item.seriesName)
          .replace(/{b}/g, item.name)
          .replace(/{c}/g, item.value)
          .replace(/{u}/g, symbol[index])
          .replace(/{d}/g, item.percent + '%') + '<br/>'
    }

  })
  return result;
}
const getLineItemTooltip = (item, symbol, formatTooltip, index) => !formatTooltip
  ? `${item.seriesId.split('0')[0]}${item.name}：${item.value}${symbol[index]}<br/>`
  : formatTooltip
    .replace(/{a}/g, item.seriesId.split('0')[0])
    .replace(/{b}/g, item.name)
    .replace(/{c}/g, item.value)
    .replace(/{u}/g, symbol[index])
    .replace(/{d}/g, item.percent + '%') + '<br/>'
// 获取 scatter format
const getScatterFormat = (params, el) => {
  const { formatTooltip } = el.pageForms;
  const { value, marker } = params
  return !formatTooltip
    ? marker + `${value[2]}<br/>`
    : marker + formatTooltip
      .replace(/{a}/g, params.seriesName)
      .replace(/{b}/g, value[2])
      .replace(/{x}/g, value[0])
      .replace(/{y}/g, value[1]) + '<br/>'
}
// 获取 radar format
const getRadarFormat = (params, el) => {
  const { marker, name, value } = params;
  const { label } = el.data;
  const { formatTooltip } = el.pageForms;
  if (!formatTooltip) {
    return `${marker}${name}`
  } else {
    const a = `${formatTooltip.substr(0, formatTooltip.indexOf('{b}')).replace(/{a}/g, marker + name)}<br/>`;
    const b = formatTooltip.substr(formatTooltip.indexOf('{b}'));
    let body = ''
    if (formatTooltip.includes('{b}')) {
      label.forEach((item, index) => {
        body += b.replace(/{b}/g, `${item}：${value[index]}`) + '<br/>'
      })
      return a + body
    } else { return a }
  }
}
// 获取twobarChart format
const getTwoBarChartFormat = (params, el) => {
  console.log('getTwoBarChartFormat:', params, el)
}
//////////////////////////////////////////////////////// 获取 series
// 获取 scatter series
const getScatterSeries = (names, model, el) => {
  const { symbolSize } = model
  return [{ symbolSize: symbolSize || 20 }]
}

// 获取 PieDouble series
const getPieDoubleSeries = (value, model, el) => {
  if (!value.length) return null;
  // eslint-disable-next-line prefer-const
  let result = [];
  for (let i = 0; i < 2; i++) {
    result.push({ type: "pie", tooltip: getTooltip(el), label: { show: model.tag, color: '#fff' }, labelLine: { show: model.tag } })
  }
  return result;
}

// 获取 pie series
const getPieSeries = (el, model) => {
  const names = el.pageForms.showData.map(item => el.argument.apiArgument.find(a => a.value === item).label.split('#')[0])
  if (isPlanarArray(el.data.value)) {
    return el.data.value.map((item, index) => ({ name: names[index], type: "pie", label: { show: model.tag }, labelLine: { show: model.tag } }))
  } else if (el.data.value.length) {
    return [{ name: names[0], type: "pie", label: { show: model.tag, color: '#fff' }, labelLine: { show: model.tag }, ...getRadius(el) }]
  } else {
    return null
  }
}

// 获取 Radar series
const getRadarSeries = (el) => ([{
  data: [
    ...el.pageForms.showData.map((item, index) => ({ type: "pie", name: el.argument.apiArgument.find(a => a.value === item).label.split('#')[0], value: el.data.value[index] }))
  ]
}])

// 获取 bar series
const getBarSeries = (names, model, el) => {
  const { showType, barWidth } = el.pageForms;
  return names.map((item) => ({
    name: item,
    barWidth: barWidth || '9',
    label: { show: model.tag, position: showType.includes('pile') ? 'inside' : "top", color: '#fff' },
  }));
}

// 获取 Line Series
const getLineSeries = (names, model, el) => {
  const { lineWidth, smooth, symbol, symbolSize, symbolColor } = el.pageForms
  return names.map((item) => ({
    name: item,
    lineStyle: { width: lineWidth || 1 },
    smooth,
    symbol: symbol || 'none',
    symbolSize: symbolSize || 6,
    itemStyle: { color: symbolColor || '#ddd' },
    label: { show: model.tag, position: "top", color: '#fff' },
  }));
}
//////////////////////////////////////////////////////// 获取 series
