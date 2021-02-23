/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-05-26 15:27:11
 * @LastEditors: wss
 * @LastEditTime: 2020-07-30 18:35:32
 */
export function listToTree(myId, pId, list) {
  // if (list == null) {
  //   return [];
  // }
  function exists(list, parentId) {
    for (var i = 0; i < list.length; i++) {
      if (list[i][myId] == parentId) return true;
    }
    return false;
  }
  var nodes = [];
  // get the top level nodes
  for (var i = 0; i < list.length; i++) {
    var row = list[i];
    if (!exists(list, row[pId])) {
      nodes.push(row);
    }
  }

  var toDo = [];
  for (var i = 0; i < nodes.length; i++) {
    toDo.push(nodes[i]);
  }
  while (toDo.length) {
    var node = toDo.shift(); // the parent node
    // get the children nodes
    for (var i = 0; i < list.length; i++) {
      var row = list[i];
      if (row[pId] == node[myId]) {
        //var child = {id:row.id,text:row.name};
        if (node.children) {
          node.children.push(row);
        } else {
          node.children = [row];
        }
        toDo.push(row);
      }
    }
  }
  return nodes;
}
