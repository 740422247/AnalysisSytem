/*
 * @Descripttion: 说明
 * @version: 1.0
 * @Author: wss
 * @Date: 2020-07-16 16:53:13
 * @LastEditors: wss
 *
 * 5931.8442 1,200.6288
 * @LastEditTime: 2021-01-18 10:58:09
 */
export const config = {
  data() {
    return {
      dwLeft: false, //是否左右定位
      dwTop: false //是否垂直定位
    };
  },
  created() {},
  mounted() {
  },
  //方法集合
  methods: {
    setFilterEntityPage() {
      const arr = [
        {
          label: "一键定位/左右",
          className: "os-12",
          labelWidth: 110,
          key: "autoLeft",
          type: "select",
          options: [
            { label: "手动输入", value: "-1" },
            { label: "左侧居中", value: "leftCenter" },
            { label: "页面居中", value: "center" },
            { label: "右侧居中", value: "rightCenter" }
          ],
          placeholder: "定位",
          expression2: (model, val, controlForms2) => {
            if (val === "-1" || !val) {
              this.dwLeft = false;
            } else {
              this.dwLeft = true;
            }
            this.filterEntityOther = this.setFilterEntityOther();
            this.filterEntityTitle = this.setFilterEntityTitle();
          }
        },
        {
          label: "一键垂直居中",
          className: "os-12",
          labelWidth: 110,
          key: "autoTop",
          type: "select",
          options: [
            { label: "是", value: "1" },
            { label: "否", value: "0" }
          ],
          placeholder: "定位",
          expression2: (model, val, controlForms2) => {
            if (val === "0" || !val) {
              this.dwTop = false;
            } else {
              this.dwTop = true;
            }
            this.filterEntityTitle = this.setFilterEntityTitle();
            this.filterEntityOther = this.setFilterEntityOther();
          }
        },
        {
          label: "显示背景图片",
          labelWidth: 110,
          key: "backgroundImg",
          type: "select",
          className: "is-2",
          placeholder: "默认",
          options: [
            { label: "是", value: "1" },
            { label: "否", value: "0" }
          ]
        },
        {
          label: "反转图片",
          labelWidth: 110,
          key: "transform",
          type: "select",
          className: "is-2",
          placeholder: "默认",
          options: [
            { label: "是", value: "1" },
            { label: "否", value: "0" }
          ]
        }
      ];
      return arr;
    },
    setFilterEntityTitle() {
      const arr = [
        {
          label: "左右定位",
          className: "is-2",
          labelWidth: 110,
          key: "left",
          type: "string",
          placeholder: "百分比"
        },
        {
          label: "垂直定位",
          labelWidth: 110,
          className: "is-2",
          key: "top",
          type: "string",
          placeholder: "百分比"
        },
        {
          label: "标题大小(像素)",
          className: "is-2",
          labelWidth: 110,
          key: "fontSize",
          type: "string",
          placeholder: "像素"
        },
        {
          label: "标题颜色",
          className: "is-2",
          labelWidth: 110,
          key: "color",
          type: "string",
          placeholder: "请输入颜色"
        },
        {
          label: "标题宽度",
          className: "os-12",
          labelWidth: 110,
          key: "width",
          type: "string",
          placeholder: "标题宽度"
        },
        {
          label: "显示组件边框",
          labelWidth: 110,
          key: "border",
          type: "select",
          className: "is-2",
          placeholder: "默认",
          options: [
            { label: "是", value: "1" },
            { label: "否", value: "0" }
          ]
        },
        {
          label: "显示背景网格",
          labelWidth: 110,
          key: "grid",
          type: "select",
          className: "is-2",
          placeholder: "默认",
          options: [
            { label: "是", value: "1" },
            { label: "否", value: "0" }
          ]
        },

        {
          label: "显示拐点折线",
          labelWidth: 110,
          key: "inflexion",
          type: "select",
          value: "1",
          className: "is-2",
          placeholder: "默认",
          options: [
            { label: "是", value: "1" },
            { label: "否", value: "0" }
          ]
        }
      ];
      if (this.dwLeft) {
        arr.splice(0, 1);
      }
      if (this.dwTop) {
        arr.splice(0, 1);
      }
      return arr;
    },
    setFilterEntityOther() {
      const arr = [
        {
          label: "左右定位",
          className: "is-2",
          labelWidth: 110,
          key: "left",
          type: "string",
          placeholder: "百分比"
        },
        {
          label: "垂直定位",
          labelWidth: 110,
          className: "is-2",
          key: "top",
          type: "string",
          placeholder: "百分比"
        },
        {
          label: "文本颜色",
          labelWidth: 110,
          className: "is-2",
          key: "color",
          type: "string",
          placeholder: "颜色"
        },
        {
          label: "按钮颜色",
          labelWidth: 110,
          className: "is-2",
          key: "colorBtn",
          type: "string",
          placeholder: "颜色"
        },
        {
          label: "按钮背景色",
          labelWidth: 110,
          className: "is-2",
          key: "bgcolorBtn",
          type: "string",
          placeholder: "背景色"
        },
        {
          label: "显示背景图片",
          labelWidth: 110,
          key: "backgroundImg",
          type: "select",
          className: "is-2",
          placeholder: "默认",
          options: [
            { label: "是", value: "1" },
            { label: "否", value: "0" }
          ]
        },

        {
          label: "显示组件边框",
          labelWidth: 110,
          key: "border",
          type: "select",
          className: "is-2",
          placeholder: "默认",
          options: [
            { label: "是", value: "1" },
            { label: "否", value: "0" }
          ]
        },
        {
          label: "显示背景网格",
          labelWidth: 110,
          key: "grid",
          type: "select",
          className: "is-2",
          placeholder: "默认",
          options: [
            { label: "是", value: "1" },
            { label: "否", value: "0" }
          ]
        },
        {
          label: "显示拐点折线",
          labelWidth: 110,
          key: "inflexion",
          type: "select",
          value: "1",
          className: "is-2",
          placeholder: "默认",
          options: [
            { label: "是", value: "1" },
            { label: "否", value: "0" }
          ]
        }
      ];
      if (this.dwLeft) {
        arr.splice(0, 1);
      }
      if (this.dwTop) {
        arr.splice(0, 1);
      }
      return arr;
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
  components: {}
};
