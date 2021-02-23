export function getLegendData(apiArgument, showData) {
  return showData.map(item => apiArgument.find(a => a.value === item).label.split('#')[0])
}
