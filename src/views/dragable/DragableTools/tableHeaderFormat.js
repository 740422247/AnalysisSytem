export const tableHeaderFormat = {
  data: () => ({
    tableDialog: {},
    headersIdentity: []
  }),
  methods: {
    showTableHeaderForm() {
      this.tableDialog = { ...this.tableDialog, visible: true };
    },
    closeTableForm() {
      this.tableDialog = { ...this.tableDialog, visible: false }
    },
    setTableHeader() {
      // console.log('set table header')
      this.tableHeader = this.selectEl.data.value.Headers
      this.headersIdentity = this.selectEl.data.value.headersIdentity
    },
    saveHeader(data, headersIdentity) {
      // console.log('save header:', JSON.stringify(data));
      this.tableHeader = data;
      const pid = this.selectEl.parentId;
      const cid = this.selectEl.childId;
      const model = this.selectEl.pageForms;
      this.headersIdentity = headersIdentity;
      this.editTableData(model, pid, cid)
      this.closeTableForm();
    }
  }
}
