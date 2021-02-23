import { getCardListResult } from './../echartOption'
export const cardListFormat = {
  data: () => ({
    cardListDialog: { visible: false },
    cardState: {},
    cards: []
  }),
  methods: {

    showCardList() {
      this.cardListDialog = { ...this.cardListDialog, visible: true };
      this.cardState = this.state;
      const { childId, parentId } = this.selectEl;
      this.cards = this.els[parentId - 1].els[childId - 1].data.cardList || [];
    },
    closeCardList() {
      this.cardListDialog = { ...this.cardListDialog, visible: false }
    },
    saveCardList(data) {
      const cid = this.selectEl.childId - 1;
      const pid = this.selectEl.parentId - 1;
      this.els[pid].els[cid].data = { ...this.els[pid].els[cid].data, cardList: data, value: getCardListResult(data, this.currData[0]) };
      this.closeCardList();
    },
    setCardListUi(model, pid, cid) {
      this.setCardLayout(model, pid, cid)
      this.setContainer(model, pid, cid)
      this.setCardImg(model, pid, cid)
      this.setCardText(model, pid, cid)
      this.setCardValue(model, pid, cid)
      this.setCardUnit(model, pid, cid)
    },
    setContainer(model, pid, cid) {
      this.els[pid - 1].els[cid - 1].data.containerStyle = {
        // textAlign: model.textAlign || 'center'
        ...this.getJustifyContent(model)
      }
    },
    getJustifyContent(model) {
      if (this.selectEl.type === "jkCard:columList") {
        return {}
      } else {
        return { justifyContent: model.justifyContent || 'inherit' }
      }
    },
    setCardLayout(model, pid, cid) {
      this.els[pid - 1].els[cid - 1].type = model.cType ? 'jkCard:' + model.cType : "jkCard:columList";
      console.log('card layout:', this.els[pid - 1].els[cid - 1])
      this.toolModel = { ...this.toolModel, cType: model.cType };
      // console.log('layout:', this.els[pid - 1].els[cid - 1])
    },
    setCardImg(model, pid, cid) {
      const imgStyle = this.els[pid - 1].els[cid - 1].data.imgStyle;
      this.els[pid - 1].els[cid - 1].data.imgStyle = {
        boxShadow: model.isBoxShadow ? '0 0 24px rgba(195,198,217,.4)' : '',
        borderRadius: model.isBorderRadius ? '50%' : '0',
      }
      this.els[pid - 1].els[cid - 1].data.imgStyle = model.imgSize ? { ...imgStyle, width: `${model.imgSize}`, height: `${model.imgSize}` } : imgStyle
    },
    setCardText(model, pid, cid) {
      this.els[pid - 1].els[cid - 1].data.labelStyle = {
        fontSize: model.textSize ? model.textSize + 'px' : '10px',
        fontWeight: model.textFontWeight ? model.textFontWeight : 'normal',
        color: model.textColor ? model.textColor : '',
        padding: model.textPadding ? model.textPadding : ''
      }
    },
    setCardValue(model, pid, cid) {
      this.els[pid - 1].els[cid - 1].data.valStyle = {
        fontSize: model.valueSize ? model.valueSize + 'px' : '10px',
        fontWeight: model.valueFontWeight ? model.valueFontWeight : 'normal',
        color: model.valueColor ? model.valueColor : '',
        padding: model.valuePadding ? model.valuePadding : ''
      }
    },
    setCardUnit(model, pid, cid) {
      this.els[pid - 1].els[cid - 1].data.unitStyle = {
        fontSize: model.unitSize ? model.unitSize + 'px' : '10px',
        fontWeight: model.unitFontWeight ? model.unitFontWeight : 'normal',
        color: model.unitColor ? model.unitColor : '',
        padding: model.unitPadding ? model.unitPadding : ''
      }
    }
  },
}
