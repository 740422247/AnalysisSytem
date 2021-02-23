import echarts from "echarts";
import huangyuan from "assets/chart/huangyuan.png";
import lvguang from "assets/chart/lvguang.png";
import lvyuan from "assets/chart/lvyuan.png";
import jiantou from "assets/chart/jiantou.png";
// import store   from '@/store/store.js';
const targetCoord = [300, 220]//目标点坐标
const curveness = 0.25//区县幅度
let linesData = []
const categories = [{//输出点配置
    name: '流入中',
    symbol: 'image://' + huangyuan,
    // itemStyle: {
    //     normal: {
    //         color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
    //             offset: 0,
    //             color: '#01acca'
    //         }, {
    //             offset: 1,
    //             color: '#5adbe7'
    //         }]),
    //     }
    // },
    // label: {
    //     normal: {
    //         fontSize: '14'
    //     }
    // },
}
    , {
    name: '暂无流入',
    symbol: 'image://' + lvguang,
    symbolSize: 25,
    symbolKeepAspect: true,
    // itemStyle: {
    //     normal: {
    //         color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
    //             offset: 0,
    //             color: '#ffb402'
    //         }, {
    //             offset: 1,
    //             color: '#ffdc84'
    //         }]),
    //     }
    // },
    label: {
        normal: {
            fontSize: '20'
        }
    },
}
]

const item = {//目标点配置
    name: "数据中心",
    value: targetCoord,
    symbolSize: 30,
    symbol: 'image://' + lvyuan,
    // itemStyle: {
    //     normal: {
    //         color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
    //             offset: 0,
    //             color: '#157eff'
    //         }, {
    //             offset: 1,
    //             color: '#35c2ff'
    //         }]),
    //     }
    // },
    label: {
        normal: {
            fontSize: '14'
        }
    },
}
let items = [];
const itemsSum = [{
    name: "潼南区",
    category: 0,//0是绿点
    active: false,//是否显示箭头
    speed: '15000kb/s',//标线显示文本,
    curveness: 0.4,//单个幅度
    value: [170, 260]
}, {
    name: "大足区",
    category: 0,
    active: false,
    speed: '50kb/s',
    value: [160, 210]
}, {
    name: "荣昌区",
    active: true,
    category: 1,
    value: [140, 180]
}, {
    name: "永川区",
    active: true,//是否显示箭头
    category: 1,
    curveness: 0.3,
    value: [185, 185]
}
    , {
    name: "铜梁区",
    active: true,//是否显示箭头
    category: 1,
    curveness: 0.23,
    value: [210, 245]
}, {
    name: "江津区",
    active: true,//是否显示箭头
    category: 1,
    value: [250, 165]
}, {
    name: "璧山区",
    active: true,//是否显示箭头
    category: 1,
    curveness: 0.16,
    value: [230, 210]
}, {
    name: "綦江区",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.27,
    value: [310, 150]
}, {
    name: "万盛经开区",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.35,
    value: [350, 130]
}, {
    name: "南川区",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.4,
    value: [375, 170]
}
    , {
    name: "涪陵区",
    active: false,//是否显示箭头
    category: 0,
    curveness: -0.35,
    value: [430, 225]
}
    , {
    name: "长寿区",
    active: false,//是否显示箭头
    category: 0,
    curveness: -0.32,
    value: [380, 240]
}, {
    name: "垫江县",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.15,
    value: [430, 300]
}, {
    name: "梁平区",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.18,
    value: [487, 330]
}, {
    name: "开州区",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.285,
    value: [590, 410]
}, {
    name: "城口县",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.40,
    value: [630, 470]
}, {
    name: "巫溪县",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.47,
    value: [760, 420]
}, {
    name: "云阳县",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.35,
    value: [640, 360]
}, {
    name: "奉节县",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.38,
    value: [750, 370]
}, {
    name: "巫山县",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.46,
    value: [830, 380]
}, {
    name: "万州区",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.30,
    value: [600, 340]
}, {
    name: "忠县",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.25,
    value: [530, 290]
}, {
    name: "丰都县",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.15,
    value: [480, 248]
}, {
    name: "武隆区",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.05,
    value: [490, 180]
}, {
    name: "彭水苗族土家族自治县",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.15,
    value: [560, 170]
}, {
    name: "石柱土家族自治县",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.25,
    value: [550, 250]
}, {
    name: "黔江区",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.40,
    value: [650, 190]
}, {
    name: "酉阳土家族苗族自治县",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.35,
    value: [650, 120]
}, {
    name: "秀山土家族苗族自治县",
    active: true,//是否显示箭头
    category: 1,
    curveness: -0.48,
    value: [690, 70]
}
]
// const jiekou = store.state.pathChart.body
let data, links;
function init(dd) {
    linesData = []
    const itemsFilter = val => {
        let add = [];
        itemsSum.forEach(item => {
            const res = val.find(v => item.name === v.DISTRICTNAME);
            res && add.push({
                ...item,
                active:res.STATUS == "异常"? false:true,
                category: res.STATUS == "异常" ? 0 : 1
            })
        })
        items=add
        // console.log(add)
    }
    itemsFilter(dd)
     data = items.concat([item])

    items.forEach(function (el) {
        if (el.active) {
            linesData.push([{
                coord: el.value,
                lineStyle: { curveness: el.curveness ? el.curveness : curveness }
            }, {
                coord: targetCoord,
                lineStyle: { curveness: el.curveness ? el.curveness : curveness }
            }])
        }
    })
     links = items.map((el) => {
        return {
            source: el.name,
            target: item.name,
            speed: el.speed,
            // emphasis: {
            //     lineStyle: {
            //         type: el.category==0?'solid':'dotted',
            //         color:'red'
            //     }
            // },
            lineStyle: {
                normal: {//线条颜色或者文字
                    type: el.category == 1 ? 'solid' : 'dashed',
                    // color: el.speed ? '#12b5d0' : '#ff0000',
                    color: lineGradual(el.category),
                    curveness: el.curveness ? el.curveness : curveness
                }
            },
        }
    })
    function lineGradual(t) {
        if (t == 0) {
            let a = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#FFC808'
            }, {
                offset: 1,
                color: '#FFC808'
            }])
            return a
        } else {
            let a = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#20FEC1'
            }, {
                offset: 1,
                color: '#20FEC1'
            }])
            return a
        }
    }
}

// lineGradual(0)
// console.log("data:", data)
// console.log("links:", links)
// console.log("linesData:", linesData)
// console.log("------------分割线---------------")

export function op(dd) {
    // itemsFilter(option)
    init(dd)
    return {
        grid: {//右上注释
            top: 0,
            left: 28,
            right: 0,
            bottom: 30,
            // containLabel:true
        },
        xAxis: {
            show: false,
            type: 'value',
            max: 1000
            // boundaryGap:0
        },
        yAxis: {
            show: false,
            type: 'value',
            max: 500
            // boundaryGap:0,
        },
        series: [{
            type: 'graph',
            layout: 'none',
            coordinateSystem: 'cartesian2d',//该系列使用的坐标系
            symbolSize: 25,//关系图节点标记的大小
            symbolOffset :[0,-3],
            z: 3,
            // layout :
            // edgeLabel: {//是否显示标签。暂时未发现用处
            //     normal: {
            //         show: false,
            //         textStyle: {
            //             fontSize: 14
            //         },
            //         formatter: function (params) {
            //             let txt = ''
            //             if (params.data.speed !== undefined) {
            //                 txt = params.data.speed
            //             }
            //             return txt
            //         },
            //     }
            // },
            label: {
                // 图形上的文本标签，
                normal: {
                    show: false,
                    position: 'bottom',
                    color: '#fff',
                    fontSize: 14
                }
            },
            itemStyle: {
                normal: {
                    shadowColor: 'none'
                },
                emphasis: {

                }
            },
            lineStyle: {
                normal: {
                    width: 2,
                    shadowColor: 'none'
                },
            },
            // edgeSymbol: ['none', 'arrow'],//两端图形
            edgeSymbolSize: 8,
            data: data,
            links: links,//线条配置
            categories: categories//输出点配置
        },
        //     {
        //     type: 'graph',
        //     layout: 'none',
        //     coordinateSystem: 'cartesian2d',//该系列使用的坐标系
        //     symbolSize: 25,//关系图节点标记的大小
        //     z: 3,
        //     label: {
        //         // 图形上的文本标签，
        //         normal: {
        //             show: false,
        //             position: 'bottom',
        //             color: '#5e5e5e'
        //         }
        //     },
        //     itemStyle: {
        //         normal: {
        //             shadowColor: 'none'
        //         },
        //         emphasis: {

        //         }
        //     },
        //     lineStyle: {
        //         normal: {
        //             width: 2,
        //             shadowColor: 'none'
        //         },
        //     },
        //     // edgeSymbol: ['none', 'arrow'],//两端图形
        //     edgeSymbolSize: 8,
        //     data: [{
        //         active: true,
        //         category: 0,
        //         name: "固定点1",
        //         value: [20, 270],
        //         length: 2
        //     },
        //     {
        //         active: true,
        //         category: 0,
        //         name: "固定点2",
        //         value: [18, 285],
        //         length: 2
        //     }, {
        //         active: true,
        //         category: 0,
        //         name: "固定点3",
        //         value: [16, 100],
        //         length: 2
        //     }],
        //     // links: links,//线条配置
        //     categories: categories//输出点配置
        // },
        {
            name: 'A',
            type: 'lines',
            coordinateSystem: 'cartesian2d',
            z: 1,
            // polyline:true,//是否是多段线。
            effect: {
                show: true,
                smooth: false,
                trailLength: 0,
                constantSpeed: '100',//速度
                symbol: 'image://' + jiantou,
                color: '#5AF2FF',
                symbolSize: 30
            },
            // lineStyle: {
            //     normal: {
            //         curveness: curveness
            //     }
            // },
            data: linesData//线条起止坐标
        }
        ]
    }
}
