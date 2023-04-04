import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Header } from "../../../components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardInforTutor } from "../../../components/card-infor-turtor";
import { scale } from "../../../common/scale";
import { ButtonConfirm } from "../../../components/button-confirm";
import { goBack } from "../../../navigators/navigation-services";

export const BookingInfor = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Thông tin đặt" />
      <ScrollView style={styles.viewBody}>
        <CardInforTutor lable="Giáo viên" description="Phạm Trần Phương" />
        <CardInforTutor
          lable="Trường"
          description="Sinh viên năm 2 - Đại Học Ngoại Thương"
        />
        <CardInforTutor lable="Giá 1 buổi học" description="500.000 VNĐ" />
        <CardInforTutor lable="Ngày học" description="Thứ 2 - Thứ 4 - Thứ 6" />
        <CardInforTutor lable="Giờ học" description="18:30 - 19:30" />
        <CardInforTutor lable="Ngày bắt đầu học" description="24/04/2023" />
        <CardInforTutor lable="Học sinh" description="Trần Phương Linh" />
        <CardInforTutor
          lable="Địa chỉ"
          description="C020 Chung Cư Vinhomes Liễu Giai, 16 Liễu Giai, Ba Đình, Hà Nội"
        />
      </ScrollView>
      <View style={styles.btn}>
        <ButtonConfirm textConfirm={"Đặt lịch"} textCancel={"Huỷ"} pressCancel={() => goBack()}/>
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
