# 一、api设置页面

## 1、左侧为组件列表

由后台数据或者前端配置文件生成。显示形式暂定图片显示。

``` js 
    //组件引入
    import ApiSetMenu from "@draggable/apiSetMenu.vue";

    // 获取组件列表, 根据实际情况修改
    const menu = ["组件注册模块"].getComponentAll();
``` 

## 2、中间部分是选中的组件

数据是底层组件默认数据显示效果（暂由前端配置）。  

``` js

    //组件引入
    import ApiSetContent from "@draggable/ApiSetContent.vue";

    // 获取相应组件的数据模型及默认数据
    // 组件数据模型
    const componentModel = {
        // singleRank  multipleRank batteryRank
        type: "jkRank:singleRank", 
        // 可用于渲染类型选择框
        choice: typeRank,
        isHandle: false, // 是否具备操作 比如: 联动
        className: ["jk-col-24", "handle"], // 类名
        style: { height: "300px" }, // 样式
        text: "", //组件标题
        path: "", // 顶部跳转按钮
        border: true, // 显示组件边框
        grid: true, // 显示背景网格
        service: {
        api: "", //api地址
        params: {}, // api参数
        data: {
            // 返回的字段
        }
        },
        data: {
        symbol: [""],
        all: [666], // 总共多少数据， 用于计算占比
        value: [10, 20, 5555, 200], // 每项右侧数值 ,一维数组代表一条线
        label: [], // 每项小标题
        path: [] // 每项跳转路径
        }
    } 
    // 组件数据
    const componentData = {
        symbol: [""],
        all: [666], // 总共多少数据， 用于计算占比
        value: [10, 20, 5555, 200], // 每项右侧数值 ,一维数组代表一条线
        label: [], // 每项小标题
        path: [] // 每项跳转路径
        }
```
## 3、右侧为对应组件api等可设置项

- （1）、模块名称：

   - 保存到后台数据库，用于 `页面编辑` 时左侧可选菜单，方便识别。

- （2）、api下拉框选中相应接口

   - 问题：是否考虑多选？下拉框数据：暂由前端处理，后期新增api管理界面，由后台处理数据

``` js
    // 模块引入
    import FilterEntity from "@components/Admin/filterEntity";

    const entity = [
        // 设置模块名称
         {
            label: "模块名称",
            key: "moduleName",
            type: "text",
            className: "is-full",
            labelWidth: "80"
        },
        // 设置接口
        {
            label: "接口选择",
            key: "path",
            type: "selectMultiple",
            className: "is-full",
            labelWidth: "80",
            options: state.apiOpt
        },
        // 接口出参，选定供模块显示的相关字段
        // 例子 CODE、ISENABLE、MONEY、NAME、PERSON、      PERSONTIME、PROJECTS ...
    ]
```

## 4、指定模块可选参数

根据后端接口出参，列出所有字段，该处选择模块编辑时可编辑的字段（由开发指定可选字段，供给实施人员使用）

# 二、页面管理页面

暂定 `表格` ，可以进入页面 `新增与编辑界面`

- 页面如下：

序号|页面名称|页面编号|编辑用户|修改时间|备注
--|:--:|:--:|:--:|:--:|--:
1|首页|home|admin|2020-06-18|无
2|区县分析|county|admin|2020-06-19|未完成编辑
...|...|...|...|...|...

   - 备注 : 点击 `页面名称` 可以跳转到对应页面进行 `查看` 或 `修改`

- 接口输出

``` js
// 接口出参
const pageList = getPageList();

// 数据结构
pageModel = [
    {
        pageTitle: "首页",
        pageCode: "home",
        pageId: "123456",
        editor: "admin",
        editTime: "2020-06-18",
        remark: "无",
        ...
    },
    ...
]

```


# 三、页面新增与编辑

- 1、左侧为 `模块列表`

- 2、中间位置为页面最终效果的缩小版。由容器和模块组件两种组成。

   - （1）、容器组件：

      - 可以设置宽度（比列，共计12列）；高宽比；

   - （2）、模块组件：

      - ui公共部分可以设置宽度、高宽比及是否带有边框；
      - 数据部分，根据api设置页面所设置的可选字段，进行选择性显示数据内容。

- 3、问题：
   
   - 页面标题在哪里编辑?

# 四、预览及最终展示页面

根据要求进行页面展示。