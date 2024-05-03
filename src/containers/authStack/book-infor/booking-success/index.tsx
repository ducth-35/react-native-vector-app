import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { scale } from "@/common/scale";
import { HomeSVG } from "@/asset";
import TextApp from "@/components/textApp";

type Props = {
  visible: boolean;
};
export const ModalBookingSuccess = ({ visible }: Props) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={style.container}>
        <View style={style.contentContainer}>
          <HomeSVG.BOOKING_SUCCESS />
          <TextApp preset="text18GreenkBold" style={{ marginTop: scale(10) }}>
            Đã đặt lịch
          </TextApp>
          <TextApp
            preset="text14"
            style={{ textAlign: "center", marginTop: scale(10) }}
          >
            Quý khách đã đặt lịch học vui lòng đợi xác nhận từ gia sư
          </TextApp>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(30),
    paddingBottom: scale(30),
    marginTop: scale(10),
  },
});
