/*
 * @Descripttion: 
 * @version: 
 * @Author: joykit
 * @Date: 2019-11-22 14:13:50
 * @LastEditors: joykit
 * @LastEditTime: 2019-11-29 14:34:25
 */
export function XM_TYPE(enter) {
    // console.log(enter);
    switch (enter) {
        case "xm":
            return [ //后端传入
            //     {
            //     col: 'RN',
            //     name: "序号",
            // },
            // {
            //     col: 'YEAR',
            //     name: "年度",
            // },
            // {
            //     col: 'XMS',
            //     name: "项目个数",
            // },
            // {
            //     col: 'JE',
            //     name: "项目金额"
            // },

            // {
            //     col: 'PCS',
            //     name: "总批次"
            // },
            // {
            //     col: 'RC',
            //     name: "总人次"
            // },
            // {
            //     col: 'RS',
            //     name: "设计人数"
            // },
            // {
            //     col: 'RJJE',
            //     name: "人均金额"
            // },
            // {
            //     col: '', //后端没有。暂定
            //     name: "人均项目个数"
            // },

            ];
            break;
        case "je":
            return [{
                col: 'RN',
                name: "序号",
            },
            {
                col: 'DISTRICTNAME',
                name: "区县名称",
            },
            {
                col: 'JE',
                name: "金额(万元)"
            },
            {
                col: 'RJJE',
                name: "人均金额(人次/元)"
            },
            {
                col: 'PROJECTNAME',
                name: "项目名称"
            },

            {
                col: 'RC',
                name: "人次(人)"
            },
            {
                col: 'RS',
                name: "人数(人)"
            },
            {
                col: 'PCS',
                name: "批次(个)"
            },
            ];
            break;
        case "rc":
            return [{
                col: 'RN',
                name: "序号",
            },
            {
                col: 'DISTRICTNAME',
                name: "区县名称",
            },
            {
                col: 'RC',
                name: "人次(人)"
            },
            {
                col: 'RS',
                name: "人数(人)"
            },
            {
                col: 'PCS',
                name: "批次(个)"
            },
            {
                col: 'PROJECTNAME',
                name: "项目名称"
            },

            {
                col: 'JE',
                name: "金额(万元)"
            },
            {
                col: 'RJJE',
                name: "人均金额(人次/元)"
            },
            ];
            break;
        case "rs":
            return [{
                col: 'RN',
                name: "序号",
            },
            {
                col: 'DISTRICTNAME',
                name: "区县名称",
            },
            {
                col: 'RS',
                name: "人数(人)"
            },
            {
                col: 'RC',
                name: "人次(人)"
            },
            {
                col: 'PCS',
                name: "批次(个)"
            },
            {
                col: 'PROJECTNAME',
                name: "项目名称"
            },

            {
                col: 'JE',
                name: "金额(万元)"
            },
            {
                col: 'RJJE',
                name: "人均金额(人次/元)"
            },
            ];
            break;
        default:
            break;
    }
}