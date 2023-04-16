import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Header } from "../../../components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardInforTutor } from "../../../components/card-infor-turtor";
import { scale } from "../../../common/scale";
import { ButtonConfirm } from "../../../components/button-confirm";
import { goBack } from "../../../navigators/navigation-services";
import { HomeSVG } from "@/asset";

export const BookingInforTutor = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Chi tiết đặt lịch" canBack backIcon={<HomeSVG.BACK />} />
      <ScrollView style={styles.viewBody}>
        <CardInforTutor lable="Môn dạy" description="Toán" />
        <CardInforTutor lable="Thu nhập" description="500k / 1 buổi" />
        <CardInforTutor lable="Ngày dạy" description="Thứ 2 - thứ 4 - thứ 6" />
        <CardInforTutor lable="Giờ dạy" description={"18:30 - 19:30"} />
        <CardInforTutor lable="Ngày bắt đầu học" description={"24/04/2023"} />
        <CardInforTutor
          lable="Học sinh"
          description={"Trần Phương Linh - Lớp 1"}
        />
        <CardInforTutor
          lable="Địa chỉ"
          description={
            "C020 Chung Cư Vinhomes Liễu Giai, 16 Liễu Giai, Ba Đình, Hà Nội"
          }
        />
      </ScrollView>
      <View style={styles.btn}>
        <ButtonConfirm
          textConfirm={"Nhận lịch"}
          textCancel={"Từ chối"}
          pressCancel={() => goBack()}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewBody: {
    marginTop: "5%",
    marginHorizontal: scale(20),
  },
  btn: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: scale(20),
  },
});
