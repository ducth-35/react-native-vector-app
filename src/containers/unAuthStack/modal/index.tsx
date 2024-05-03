import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { scale } from "@/common/scale";
import TextApp from "@/components/textApp";

type Props = {
  visible: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
};
export const ModalLogin = ({ visible, handleCancel, handleOk }: Props) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={style.container}>
        <View style={style.contentContainer}>
          <View style={style.margin}>
            <TextApp preset="text18BlackBold" style={style.txt_title}>
              Bạn muốn đăng nhập bằng tài khoản khác ?
            </TextApp>
            <View style={style.bt_container}>
              <TouchableOpacity style={[style.button]} onPress={handleCancel}>
                <TextApp style={style.txt_ok}>Để sau</TextApp>
              </TouchableOpacity>
              <View style={style.two_bt_container} />
              <TouchableOpacity style={style.button} onPress={handleOk}>
                <TextApp style={style.txt_cancel}>Đồng ý</TextApp>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(41, 41, 41, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(50),
  },
  contentContainer: {
    borderRadius: scale(15),
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  txt_title: {
    marginHorizontal: scale(25),
    textAlign: "center",
    justifyContent: 'center',
    marginBottom: scale(20),
  },
  txt_message: {
    width: scale(256),
    marginHorizontal: scale(17),
    textAlign: "center",
    fontWeight: "400",
    marginBottom: scale(21),
    lineHeight: scale(20),
  },
  bt_container: {
    width: "100%",
    borderTopWidth: scale(0.8),
    borderTopColor: "#D5D5D5",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  txt_ok: {
    marginVertical: scale(10),
    fontSize: 16,
    fontWeight: "600",
    color: "#007aff",
  },
  two_bt_container: {
    height: "100%",
    width: scale(0.5),
    backgroundColor: "#D5D5D5",
  },
  txt_cancel: {
    marginVertical: scale(10),
    fontSize: 16,
    fontWeight: "400",
    color: "#007aff",
  },
  button: { flex: 0.5, alignItems: "center" },
  margin: {
    paddingTop: scale(15),
  },
});
