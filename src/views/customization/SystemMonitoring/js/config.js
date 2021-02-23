/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-16 16:53:13
 * @LastEditors: wss
 * @LastEditTime: 2020-12-11 10:19:41
 */
import api from "@api/api.js";
const Filters = () => import("@components/Admin/filterEntity.vue");
export const sysConfig = {
  data() {
    return {
      isLayout: false, //显示输入层
      showLayout: false, //是否配置页
      positionX: 0,
      positionY: 0,
      filterEntityTitle: [],
      filterModelTitle: {},
      systemList: [], //系统列表
      interfaceList: [], //原始接口
      interfaceOption: [], //筛选过后接口
      configList: [], //所有配置项
      configListAll: [] //所有配置项
    };
  },
  created() {},
  mounted() {
    // this.getSetting();
  },
  //方法集合
  methods: {
    async init() {
      //定制时候的参数获取
      await api.SysBusiness("GetPage", {}).then(dd => {
        //获取系统列表
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
      this.initData()
    },
    resetForm() {
      this.$refs.blurTitle1.$refs.filterModel.resetFields();
    },
    save() {
      const arr = [];
      console.log(this.filterModelTitle);
      for (const key in this.filterModelTitle) {
        //只遍历对象自身的属性，而不包含继承于原型链上的属性。
        if (
          Object.prototype.hasOwnProperty.call(this.filterModelTitle, key) ===
          true
        ) {
          arr.push({
            settingId: key,
            settingName: key,
            settingType: "SystemMonitoring",
            settingValue: this.filterModelTitle[key]
          });
        }
      }
      api.Setting("Set", arr).then(dd => {
        this.$message({
          type: "success",
          message: dd.msg ? dd.msg : dd.errMsg
        });
        this.getSetting();
      });
    },
    async getSetting() {
      const str = {};
      await api.Setting("Get", { settingType: "SystemMonitoring" }).then(dd => {
        dd.data.map(item => {
          str[item.settingName] = item.settingValue;
        });
        this.filterModelTitle = str;
        this.init();
      });
    },
    // blurTitle(dd) {
    // },

    setFilterEntityTitle(type) {
      return [
        {
          label: "跳转地址",
          className: "is-full",
          labelWidth: 110,
          key: "path",
          type: "string",
          placeholder: "跳转地址"
        },
        {
          label: "模块类型",
          className: "is-2",
          labelWidth: 110,
          key: "genre",
          disabled: true,
          type: "string",
          placeholder: " "
        }
        // {
        //   label: "模块类型",
        //   labelWidth: 110,
        //   key: "inflexion",
        //   type: "select",
        //   value: "1",
        //   className: "is-2",
        //   placeholder: "默认",
        //   options: [
        //     { label: "是", value: "1" },
        //     { label: "否", value: "0" }
        //   ]
        // }
      ];
    },
    setFilterEntityAll() {
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
          label: "同步接口",
          labelWidth: 110,
          key: "QxInflexion",
          type: "select",
          className: "os-12",
          placeholder: "请选择搜索接口",
          options: this.interfaceOption,
          rules: [
            {
              required: true,
              message: "必填项",
              trigger: "blur"
            }
          ]
        },
        {
          label: "手动同步接口",
          labelWidth: 110,
          key: "ManualQxInflexion",
          type: "select",
          className: "os-12",
          placeholder: "请选择接口",
          options: this.interfaceOption,
          rules: [
            {
              required: true,
              message: "必填项",
              trigger: "blur"
            }
          ]
        },
        {
          label: "CPU接口",
          labelWidth: 110,
          key: "CpuInflexion",
          type: "select",
          className: "os-12",
          placeholder: "请选择CPU接口",
          options: this.interfaceOption,
          rules: [
            {
              required: true,
              message: "必填项",
              trigger: "blur"
            }
          ]
        },
        {
          label: "内存接口",
          labelWidth: 110,
          key: "NcInflexion",
          type: "select",
          className: "os-12",
          placeholder: "请选择内存接口",
          options: this.interfaceOption,
          rules: [
            {
              required: true,
              message: "必填项",
              trigger: "blur"
            }
          ]
        },
        {
          label: "硬盘接口",
          labelWidth: 110,
          key: "YpInflexion",
          type: "select",
          value: "1",
          className: "os-12",
          placeholder: "请选择硬盘接口",
          options: this.interfaceOption,
          rules: [
            {
              required: true,
              message: "必填项",
              trigger: "blur"
            }
          ]
        }
      ];
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
      if (u === "all") {
        if (
          !this.configListAll.some(item => {
            console.log("inflexion", item.inflexion);
            return item.inflexion;
          })
        ) {
          return "warning-color";
        }
      } else {
        if (
          !this.configList.some(item => {
            if (item.genre === u) {
              return item.path;
            }
          })
        ) {
          return "warning-color";
        }
      }
      // const w = list.filter(item => {
      //   if (item.genre === u) {
      //     return item;
      //   }
      // });

      // if (!w || w.length === 0) {
      // return "warning-color";
      // }
    },
    settingMk() {
      this.showLayout = true;
      this.$nextTick(() => {
        const floating = this.$refs.floating;
        floating.style.right = 400 + "px";
        floating.style.top = 300 + "px";
      });

      // console.log(item);
    }
  },
  //监听属性 类似于data概念
  computed: {},
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
