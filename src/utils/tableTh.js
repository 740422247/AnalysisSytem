/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-11-03 09:43:17
 * @LastEditors: wss
 * @LastEditTime: 2020-11-13 17:52:53
 */
export function _convertToRows(originColumns) {
  let maxLevel = 1;
  const rows = [];
  let filterColum = [];
  const traverse = function(column, parent, parentsPath) {
    !column.headProp && (column.headProp = {});
    !column.bodyProp && (column.bodyProp = {});
    !column.headStyle && (column.headStyle = {});
    !column.bodyStyle && (column.bodyStyle = {});
    if (parent) {
      // 计算每级level children=>children=>children的树结构
      column.level = parent.level + 1;

      parentsPath += `${parent.id}-`;
      column.parentsPath = parentsPath; // 拼接祖先级路径

      // 从新覆盖最大层级
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    // 计算colSpan的核心算法
    if (column.children) {
      let colSpan = 0;
      column.children.map(subColumn => {
        traverse(subColumn, column, column.parentsPath);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
      filterColum.push(column);
    }
  };
  // 计算colSpan以及level
  originColumns.map(column => {
    column.level = 1;
    column.parentsPath = "";
    traverse(column);
  });

  for (let i = 0; i < maxLevel; i++) {
    // 先建可见行
    rows.push([]);
  }

  const allColumns = this._treeToArray1(originColumns); // 树结构转一维数组
  allColumns.map(column => {
    // 计算rowSpan
    if (column.children) {
      column.rowSpan = 1;
    } else {
      column.rowSpan = maxLevel - column.level + 1;
    }
    // 组装计算计算rowSpan、colSpan后的对象
    rows[column.level - 1].push(column);
  });

  // 自定义折叠属性
  filterColum.push({
    id: "_toggle",
    bodyStyle: {},
    bodyProp: {}
  });

  filterColum = [...filterColum];
  return {
    rows,
    filterColum
  };
}
export function TreeData(headers) {
  const maxRow = headers.length;
  for (let i = 0; i < headers.length; i++) {}
}
function genTree(data, relations) {
  const relationMap = relations.reduce(
    (map, rel) => map.set(`${rel.row},${rel.col}`, rel),
    new Map()
  );

  const root = [];

  _gen(root, data, 0, 0, data[0].length, relationMap);

  return root;

  function _gen(children, data, row, colStart, colEnd, relationMap) {
    if (row >= data.length) {
      return;
    }

    for (let col = colStart; col < colEnd; ) {
      const lastSameHeadRel = relationMap.get(`${row - 1},${col}`);
      if (
        lastSameHeadRel &&
        lastSameHeadRel.row + lastSameHeadRel.rowspan > row
      ) {
        // 跨行占位
        col += lastSameHeadRel.colspan;
        break;
      }

      let child = {
        label: data[row][col],
        children: []
      };

      children.push(child);

      const relation = relationMap.get(`${row},${col}`);
      const nextRow = row + (relation ? relation.rowspan : 1);
      const nextColStart = col;
      const nextColEnd = col + (relation ? relation.colspan : 1);
      _gen(
        child.children,
        data,
        nextRow,
        nextColStart,
        nextColEnd,
        relationMap
      );

      col = nextColEnd;
    }
  }
}
