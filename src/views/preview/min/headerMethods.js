
import api from "@api/api";
import * as types from "@store/mutation-types";
import { Message } from "element-ui";
export const headerMethods = {
  data: () => ({
  }),
  methods: {
    actionMethods(action) {
      switch (action) {
        case "logout":
          this.logout();
          break;
        case "editPwd":
          this.editTitle();
          break;
        case "changeHeadPhoto":
          this.editHeadPhoto();
          break;
        default:
          break;
      }
    },
    logout() {
      this.$confirm("确认退出?", "提示", {})
        .then(() => {
          this.$store.commit("Log_out", {});
          this.$router.replace({
            path: "/login",
          });
        })
        .catch(() => { });
    },
    editTitle(model) {
      this.dialogEntity = this.setDialogData();
      // eslint-disable-next-line no-unneeded-ternary
      this.dialogModel = model ? model : {};
      this.$refs.showDialog.showDialog();
    },
    editHeadPhoto() {
      document.querySelector("#uploadPhoto").click();
    },
    saveHeadPhoto(image) {
      api.publicApi(types.editPhoto, { avatar: image }, "post").then((res) => {
        if (res.code === 1) {
          this.headModel = { ...this.headModel, avatar: image };
          Message({ message: "头像设置成功", type: "success" });
          this.$store.commit("user/SET_avatar", image);
        } else {
          Message({ message: res.errMsg, type: "error" });
        }
      });
    },
  }
}
