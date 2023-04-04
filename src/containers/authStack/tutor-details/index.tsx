import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import TextApp from "../../../components/textApp";
import { Header } from "../../../components/header";
import { HomeSVG } from "../../../assets";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../../../common/scale";
import FastImage from "react-native-fast-image";
import { ImageAsset } from "../../../assets/image";
import { CardInforTutor } from "../../../components/card-infor-turtor";
import { Button } from "../../../components/btn";
import { navigate } from "../../../navigators/navigation-services";
import { APP_SCREEN } from "../../../navigators/screen-type";

export const TutorDetailScreen = () => {
  const handleBooking = () => {
    navigate(APP_SCREEN.BOOKING_SCREEN);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header canBack title="Giáo viên" backIcon={<HomeSVG.BACK />} />
      <ScrollView>
        <View style={styles.viewBanner}>
          <HomeSVG.BANNER_TUTOR />
          <View style={styles.viewAvatar}>
            <FastImage source={ImageAsset.person} style={styles.avatar} />
          </View>
        </View>
        <View style={styles.viewBody}>
          <View style={styles.viewName}>
            <TextApp preset="text20">Trương Huỳnh Đức</TextApp>
            <TextApp preset="text20Blue">500k / buổi</TextApp>
          </View>
          <View style={styles.viewStar}>
            <HomeSVG.STAR />
            <TextApp preset="text12" style={{ marginLeft: scale(5) }}>
              4.5
            </TextApp>
            <View style={styles.viewSubjec}>
              {["Toán", "Lý"].map((it) => (
                <View key={it} style={styles.viewItemSubjec}>
                  <TextApp preset="text10" style={{ color: "#ff6905" }}>
                    {it}
                  </TextApp>
                </View>
              ))}
            </View>
          </View>
          <View>
            <CardInforTutor
              lable="Giới thiệu"
              description="Gia sư Phạm Trần Phương đã có kinh nghiệm 2 năm dạy học các bạn cấp 1. Liên tiếp là sinh viên xuất sắc cũng như đạt nhiều toán quốc gia trong nhiều năm liền."
            />
            <CardInforTutor
              lable="Trường"
              description="Sinh viên năm 2 - Đại Học Ngoại Thương"
            />
            <CardInforTutor
              lable="Lớp dạy"
              description="Chuyên gia sư từ lớp 1 - lớp 6"
            />
            <CardInforTutor
              lable="Thành tích"
              description="Giải nhì toán quốc gia 2018 - Giải ba nghiên cứu khoa học Đại học Ngoại Thương"
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.viewDone}>
        <Button preset="blue" title="Đặt lịch học" onPress={handleBooking} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewBanner: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(20),
  },
  viewAvatar: {
    position: "absolute",
    zIndex: 9,
    bottom: -scale(40),
    left: "50%",
    marginLeft: -50, // Điều chỉnh giá trị này bằng một nửa độ rộng của viewAvatar
    justifyContent: "center",
    alignItems: "center",
    width: scale(100),
    height: scale(100),
    backgroundColor: "#d9dfff",
    // opacity: 0.7,
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: "#fff",
  },
  avatar: {
    width: scale(68),
    height: scale(68),
    borderRadius: scale(12),
  },
  viewBody: {
    marginTop: "15%",
    marginHorizontal: scale(20),
  },
  viewName: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewStar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(10),
  },
  viewSubjec: {
    flexDirection: "row",
    marginLeft: scale(10),
  },
  viewItemSubjec: {
    backgroundColor: "#ffebf0",
    marginRight: scale(5),
    paddingVertical: scale(2),
    paddingHorizontal: scale(10),
    borderRadius: scale(5),
  },
  viewDone: {
    position: "absolute",
    left: scale(20),
    right: scale(20),
    bottom: scale(40),
  },
});
