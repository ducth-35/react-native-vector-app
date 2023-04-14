import React from "react";
import { StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import TextApp from "../../textApp";
import { scale } from "@/common/scale";
import { CardInput } from "@/components/card-input";
import { ButtonConfirm } from "@/components/button-confirm";

type Props = {
  title?: string;
  children?: JSX.Element;
  pressCancel: () => void;
  onSave: (data: { address: string; name: string; phone: string }) => void;
};

export const ModalizeAddInfor = React.forwardRef(
  ({ title, pressCancel, onSave }: Props, ref) => {
    const [address, setAddress] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");

    const handleConfirm = () => {
      const infor = { address, name, phone };
      onSave(infor);
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
        >
          <TextApp preset="text18" style={styles.title}>
            {title}
          </TextApp>
          <View style={{ marginBottom: scale(35) }}>
            <CardInput
              lable="Địa chỉ học"
              placeholder="Địa chỉ"
              value={address}
              onChangeText={setAddress}
            />
            <CardInput
              lable="Tên học sinh"
              placeholder="Tên học sinh"
              value={name}
              onChangeText={(value) => setName(value)}
            />
            <CardInput
              lable="Số điện thoại"
              placeholder="Số điện thoại"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View style={styles.btn}>
            <ButtonConfirm
              textConfirm={"Tiếp tục"}
              textCancel={"Huỷ"}
              pressCancel={pressCancel}
              pressConfirrm={() => handleConfirm()}
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
  },
  btn: {
    marginHorizontal: scale(20),
    marginBottom: scale(30),
  },
});
