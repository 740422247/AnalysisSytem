
export const sysFormsFormat = {
  data: () => ({
    sysFormsDialog: { visible: false },

  }),
  methods: {
    showSysForms() {
      this.sysFormsDialog = { ...this.sysFormsDialog, visible: true }
    },
    closeSysForms() {
      this.sysFormsDialog = { ...this.sysFormsDialog, visible: false }
    },
    saveForms(data, sysList) {
      const cid = this.selectEl.childId - 1;
      const pid = this.selectEl.parentId - 1;
      this.els[pid].els[cid].data.value = data.map((item, index) => ({ ...item, formWidth: sysList[index].formWidth }));
      this.closeSysForms();
    }
  },
}
