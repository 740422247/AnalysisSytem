// 导出线性渐变色
const linearColors = [
  { start: "#3fc0fc", end: "#0426ff" },
  { start: "#47ef74", end: "#ebff5d" },
  { start: "#fa68ff", end: "#8d2aff" },
  { start: "#29f0ff", end: "#0070bb" },
  { start: "#ffea7e", end: "#ff9100" },
  { start: "#15ecb9", end: "#29ee6a" },
  { start: "#ffac4d", end: "#ff5b41" },
  { start: "#296aff", end: "#8427ff" }
];
function getLinearColor(colorModel, g) {
  return {
    type: "linear",
    x: 0,
    y: 0,
    x2: 1,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: colorModel.start // 0% 处的颜色
      },
      {
        offset: 1,
        color: colorModel.end // 100% 处的颜色
      }
    ],
    global: g
  };
}
function getRadialrColor(colorModel, g) {
  return {
    type: "radial",
    x: 0.1,
    y: 0.3,
    r: 0.9,
    colorStops: [
      {
        offset: 0,
        color: colorModel.start // 0% 处的颜色
      },
      {
        offset: 1,
        color: colorModel.end // 100% 处的颜色
      }
    ],
    global: g
  };
}
export function getLinearColors() {
  return linearColors.map(item => getLinearColor(item, false));
}
export function getRadialrColors() {
  return linearColors.map(item => getRadialrColor(item, false));
}

// 导出普通色
export function getColors() {
  return [
    "#0e57ff",
    "#069fe6",
    "#29f0ff",
    "#aee67c",
    "#41f57d",
    "#06e6b1",
    "#ffa35d",
    "#f3ec7f",
    "#ff5858",
    "#f94dff",
    "#a64dff",
    "#7351ff"
  ];
}
