import api from "@api/api";
import * as types from "@store/mutation-types";

export const setPageHeader = {
  data: () => ({

  }),
  methods: {
    async initSys() {
      const sys = await api.SysBusiness("GetPage", {});
      this.state.sys = sys.data.map((item) => ({
        value: item.businessId,
        label: item.name,
      }));
      this.setPageComponents();
    },
    async initDictionaries(systemId) {
      const apis = await this.$store.dispatch(types.getAllApi, {
        ApiType: "condition",
        IsEnable: "是",
      });
      this.state.dictionaries = apis.data
        .filter((item) => item.businessId === systemId)
        .map((item) => ({
          label: `${item.label || ""}(${item.url})`,
          value: item.id,
        }));
      this.setPageComponents();
    },
  }
}
