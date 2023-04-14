import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Header } from "../../../components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardInforTutor } from "../../../components/card-infor-turtor";
import { scale } from "../../../common/scale";
import { ButtonConfirm } from "../../../components/button-confirm";
import { goBack } from "../../../navigators/navigation-services";
import { RouteBookingInforInterface } from "@/types/booking";

type Props = {
  route: RouteBookingInforInterface;
};
export const BookingInfor = ({ route }: Props) => {
  const {
    params: { day, startTime, endTime, dateStart, address, name, phone },
  } = route;
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
        <CardInforTutor lable="Ngày học" description={day} />
        <CardInforTutor
          lable="Giờ học"
          description={`${startTime} - ${endTime}`}
        />
        <CardInforTutor lable="Ngày bắt đầu học" description={dateStart} />
        <CardInforTutor lable="Học sinh" description={name} />
        <CardInforTutor lable="Địa chỉ" description={address} />
      </ScrollView>
      <View style={styles.btn}>
        <ButtonConfirm
          textConfirm={"Đặt lịch"}
          textCancel={"Huỷ"}
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
