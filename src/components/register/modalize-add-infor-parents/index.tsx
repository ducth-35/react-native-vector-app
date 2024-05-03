import React from "react";
import { StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import TextApp from "../../textApp";
import { scale } from "@/common/scale";
import { CardInput } from "@/components/card-input";
import { ButtonConfirm } from "@/components/button-confirm";
import { isNullOrEmpty } from "@/utils/method";
import ToastUtils from "@/utils/toastUtils";
import { validatePhoneNumber } from "@/utils/validate";

type Props = {
  title?: string;
  children?: JSX.Element;
  pressCancel?: () => void;
  onSave?: (data: { fullName: string; phone: string }) => void;
};

export const ModalizeAddInforParent = React.forwardRef(
  ({ title, pressCancel, onSave }: Props, ref) => {
    const [fullName, setFullName] = React.useState("");
    const [phone, setPhone] = React.useState("");

    const handleConfirm = () => {
      const infor = { fullName, phone };
      if (isNullOrEmpty(fullName)) {
        ToastUtils.show("Vui lòng nhập tên vợ/chồng");
      } else if (isNullOrEmpty(phone)) {
        ToastUtils.show("Vui lòng nhập số điện thoại");
      } else {
        const error = validatePhoneNumber(phone);
        if (error) {
          ToastUtils.show(error);
        } else {
          onSave?.(infor);
          pressCancel?.();
        }
      }
    };
    return (
      <Portal>
        <Modalize
          modalStyle={styles.container}
          adjustToContentHeight={true}
          ref={ref}
          handleStyle={{
            display: "none",
          }}
          closeOnOverlayTap={false}
          scrollViewProps={{
            showsVerticalScrollIndicator: false
          }}
        >
          <TextApp preset="text18" style={styles.title}>
            {title}
          </TextApp>
          <View style={{ marginBottom: scale(35) }}>
            <CardInput
              lable="Tên vợ/chồng"
              placeholder="Tên vợ/chồng"
              value={fullName}
              onChangeText={setFullName}
            />
            <CardInput
              lable="Tài khoản nhập"
              placeholder="Số điện thoại của vợ/chồng"
              value={phone}
              onChangeText={setPhone}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.btn}>
            <ButtonConfirm
              textConfirm={"Tiếp tục"}
              textCancel={"Huỷ"}
              pressCancel={pressCancel}
              pressConfirrm={handleConfirm}
            />
          </View>
        </Modalize>
      </Portal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  title: {
    marginVertical: scale(20),
    textAlign: "center",
    color: "#000",
  },
  btn: {
    marginHorizontal: scale(20),
    marginBottom: scale(30),
  },
});
