/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-16 16:53:13
 * @LastEditors: wss
 * @LastEditTime: 2021-01-11 16:18:31
 */
import api from "@api/api.js";
const Filters = () => import("@components/Admin/filterEntity.vue");
export const searchAll = {
  data() {
    return {
      indexSetting: 1, //配置项只读取一次,
      isLayout: false, //是否配置页
      showLayout: false, //显示输入层
      pitchOn: null, //当前选择模块
      routerList: [], //跳转地址集合
      paramFields: [], //参数字段
      moveFlag: false,
      positionX: 0,
      positionY: 0,
      filterEntityTitle: [],
      filterModelTitle: {},
      dynamicEntity: [], //动态实体
      dynamicModel: {}, //动态模块参数
      layoutOther: {},
      systemList: [], //系统列表
      interfaceList: [], //原始接口
      interfaceOption: [],
      configList: [], //所有配置项,12/24弃用
      configListAll: [], //所有配置项12/24弃用
      configListObj: {} //保存配置对象
    };
  },
  async created() {
    if (this.$route.meta.isConfig) {
      this.isLayout = true;
    } else {
      this.isLayout = false;
    }
    await this.init();
    this.getSetting();
    // api.ChartApiOption("GetPage", { ApiType: "Made" }).then(dd => {
    //   this.interfaceOption = dd.data.map(item => ({
    //     ...item,
    //     label: item.label,
    //     value: item.id
    //   }));
    // });
  },
  mounted() {},
  //方法集合
  methods: {
    async init() {
      // console.log("888888888888888");
      //跳转地址列表
      await api.ChartModule("getPageList", null).then(dd => {
        this.routerList = dd.data.items.map(item => ({
          ...item,
          label: item.moduleName,
          value: item.moduleId
        }));
      });
      //获取系统列表
      await api.SysBusiness("GetPage", {}).then(dd => {
        this.systemList = dd.data.map(item => ({
          ...item,
          label: item.name,
          value: item.businessId
        }));
      });
      //获取接口
      await api.ChartApiOption("GetPage", { ApiType: "Made" }).then(dd => {
        this.interfaceList = dd.data.map(item => ({
          ...item,
          label: item.label,
          value: item.id
        }));
      });
    },
    resetForm() {
      this.$refs.blurTitle1.$refs.filterModel.resetFields();
    },
    save() {
      const arr = [];
      const arg = Object.assign(this.filterModelTitle, this.dynamicModel);
      arr.push({
        settingId: `searchAll${this.pitchOn}`,
        settingType: "searchAll",
        settingName: this.pitchOn,
        settingValue: JSON.stringify(arg)
      });

      // console.log("arr:", arr);
      // return false;
      api.Setting("Set", arr).then(dd => {
        this.$message({
          type: "success",
          message: dd.msg ? dd.msg : dd.errMsg
        });
        this.getSetting();
      });
      this.showLayout = false;
    },
    async getTypeList() {
      if (this.configListObj.all) {
        const param = {
          conds: "none",
          key: "none"
        };
        const p = await this.GetList(param);
        this.newList = p.Items;
        this.searchSum = p.Group;
        const { PageIndex, PageSize, TotalCount, TotalPage } = p.PageInfo;
        this.PageInfo = {
          page: PageIndex, //当前页    PageIndex
          pageSize: PageSize, //每一页显示的数据条数  PageSize
          total: TotalCount, //总数据条数  TotalCount
          maxPage: 5 //显示页码个数(可固定)  TotalPage
        };
        // const p = await require("../js/searchAll.js");
        // this.newList = p.a.Data[0].BODYS.Items;
        // this.searchSum = p.a.Data[0].GROUP;
        if (this.indexSetting === 1) {
          this.indexSetting++;
          Object.getOwnPropertyNames(this.newList[0]).forEach(key => {
            this.paramFields.push({
              label: key,
              value: key
            });
          });
        }
        // console.log(this.paramFields);
      }
    },
    getPathParamResult(str) {
      if (!str.includes("=")) return;
      const result = {};
      str.split("&").forEach(item => {
        result[item.split("=")[0]] = item.split("=")[1];
      });
      return result;
    },
    getSetting() {
      this.configListObj = {};
      api.Setting("Get", { settingType: "searchAll" }).then(dd => {
        dd.data.map(item => {
          if (item.settingName) {
            this.configListObj[item.settingName] = JSON.parse(
              item.settingValue
            );
          }
        });
        // console.log(this.configListObj);
        //配置页初始查询
        if (this.isLayout) {
          this.getTypeList();
        }
        if (this.$route.query) {
          this.query = this.$route.query;
          this.text = this.query.content;
          if (this.text) {
            this.GetProcSearchAll('init');
          }
        }
        // console.log(this.configListObj);
        // dd.data.map(item => {
        //   if (item.settingId === "all") {
        //     arrAll.push({
        //       genre: item.settingName,
        //       inflexion: item.settingValue
        //     });
        //   } else {
        //     arr.push({ genre: item.settingName, path: item.settingValue });
        //     this.configList = arr;
        //     console.log(" this.configList:", this.configList);
        //   }
        // });
        // this.configListAll = arrAll;

        // console.log(" this.configListAll:", this.configListAll);
        // console.log(" this.configList:", this.configList);
      });
    },
    // blurTitle(dd) {
    // },
    setFilterEntityTitle() {
      return [
        {
          label: "跳转地址",
          labelWidth: 110,
          key: "moduleId",
          type: "select",
          value: "1",
          className: "is-full",
          placeholder: "请选择",
          options: this.routerList
        },
        {
          label: "模块类型",
          className: "is-full",
          labelWidth: 110,
          key: "moduleType",
          disabled: true,
          type: "string",
          placeholder: " "
        },
        {
          label: `特殊参数`,
          className: "is-full",
          labelWidth: 110,
          key: "specialKey",
          type: "string",
          placeholder: " "
        },
        {
          label: "跳转参数",
          labelWidth: 110,
          key: "arguments",
          type: "selectMultiple",
          value: "1",
          className: "is-full",
          placeholder: "默认",
          options: this.paramFields,
          autoEx: true, //自动触发下列规则
          expression: model => {
            // const it = this.interfaceList.filter(
            //   item => item.businessId === model.BusinessId
            // );
            // this.interfaceOption = it;
            // console.log(this.interfaceOption);
            this.dynamicEntity = this.setDynamicModelEntity(model.arguments);
          }
        },
        {
          label: "模块图标",
          key: "icon",
          type: "uploader",
          className: "is-full",
          autoUpload: false, //取消选中自动上传,转base64返回
          sum: 1, //能选中的张数
          rules: [
            {
              validator: (rule, value, callback) => {
                return new Promise((resolve, reject) => {
                  if (value && value.length > 0) {
                    resolve();
                  } else {
                    reject(new Error());
                  }
                });
              },
              message: "请选择头像",
              required: true,
              trigger: "change",
              type: "array"
            }
          ]
        }
      ];
    },
    setFilterEntityAll(type) {
      return [
        {
          label: "业务系统",
          labelWidth: 110,
          key: "BusinessId",
          type: "select",
          value: "1",
          className: "os-12",
          placeholder: "请选择业务系统",
          options: this.systemList,
          autoEx: true, //自动触发下列规则
          expression: model => {
            const it = this.interfaceList.filter(
              item => item.businessId === model.BusinessId
            );
            this.interfaceOption = it;
            console.log(this.interfaceOption);
            this.filterEntityTitle = this.setFilterEntityAll();
          }
        },
        {
          label: "搜索接口",
          labelWidth: 110,
          key: "interface",
          type: "select",
          value: "1",
          className: "os-12",
          placeholder: "请选择搜索接口",
          options: this.interfaceOption
        }
      ];
    },
    setDynamicModelEntity(arg) {
      const arr = [];
      arg.map(item => {
        arr.push({
          label: `映射名称'${item}'`,
          className: "is-full",
          labelWidth: 110,
          key: item,
          type: "string",
          rules: [{ required: true, message: "不能为空", trigger: "blur" }],
          placeholder: " "
        });
      });
      return arr;
    },
    move(e) {
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
      this.moveState = true;
      const floating = this.$refs.floating;
      const d = this.$refs.logDiv;
      const dWidth = parseFloat(getComputedStyle(d).width);
      const dHeight = parseFloat(getComputedStyle(d).height);
      // const odiv = e.target; //获取目标元素
      const floatingWidth = parseFloat(getComputedStyle(floating).width);
      const floatingHeidth = parseFloat(getComputedStyle(floating).height);
      //算出鼠标相对元素的位置
      const disX = e.clientX - floating.offsetLeft;
      const disY = e.clientY - floating.offsetTop;
      document.onmousemove = e => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        const left = e.clientX - disX;
        const top = e.clientY - disY;
        let left1, top1;
        if (left < 0) {
          left1 = 0;
        } else if (dWidth - floatingWidth < left) {
          left1 = dWidth - floatingWidth;
        } else {
          left1 = left;
        }
        if (top < 0) {
          top1 = 0;
        } else if (dHeight - floatingHeidth < top) {
          top1 = dHeight - floatingHeidth;
        } else {
          top1 = top;
        }
        floating.style.left = left1 + "px";
        floating.style.top = top1 + "px";
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    settingColor(u) {
      // console.log(u);
      if (!this.configListObj[u]) {
        return "warning-color";
      }
    },
    deleteTest() {
      delete this.configListObj.XZ;
      this.$forceUpdate();
      // this.newList = this.newList.slice(0, this.newList.length);
    },
    settingMk(dd) {
      this.pitchOn = dd.GP;
      this.isLayout = true;
      this.showLayout = true;
      this.$nextTick(() => {
        const floating = this.$refs.floating;
        floating.style.right = 10 + "px";
        floating.style.top = 300 + "px";
      });
      if (dd.GP === "all") {
        this.filterEntityTitle = this.setFilterEntityAll();
      } else {
        this.filterEntityTitle = this.setFilterEntityTitle(dd.GP);
      }
      if (this.configListObj[dd.GP]) {
        this.filterModelTitle = this.configListObj[dd.GP];
        this.dynamicModel = this.configListObj[dd.GP];
      } else {
        this.$set(this.filterModelTitle, "moduleType", this.pitchOn);
        // this.filterModelTitle = { moduleType: this.pitchOn };
      }
      // console.info(this.configListObj);
      // console.log(this.filterModelTitle);
    }
  },
  //监听属性 类似于data概念
  computed: {
    // settingColor() {
    //   return function(u) {
    //     console.log(u);
    //     if (!this.configListObj[u]) {
    //       return "warning-color";
    //     }
    //   };
    // }
  },
  //监控data中的数据变化
  watch: {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  beforeRouteEnter(to, from, next) {
    next(vm => {});
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  //import引入的组件需要注入到对象中才能使用
  components: { Filters }
};
