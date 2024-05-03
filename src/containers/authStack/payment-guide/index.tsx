import { HomeSVG } from "@/asset";
import { SCREEN_WIDTH, scale } from "@/common/scale";
import { Button } from "@/components/btn";
import { Header } from "@/components/header";
import TextApp from "@/components/textApp";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const PaymentGuide = () => {

  const handleOnPressOk = () => {
    navigate(APP_SCREEN.HOME_SCREEN);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header canBack title="Lớp Toán - Mỹ An" backIcon={<HomeSVG.CLOSE />} />
      <View style={styles.body}>
        <TextApp style={styles.text18_black}>Mã thanh toán: 1118</TextApp>
        <TextApp>Số tiền</TextApp>
        <TextApp style={styles.text18_red}>4.500.000 đ</TextApp>
        <View style={styles.paymentGuide}>
          <View style={styles.line} />
          <TextApp style={styles.text16_black}>Hướng dẫn thanh toán</TextApp>
          <View style={styles.line} />
        </View>
        <TextApp style={styles.text16}>
          Quý khách vui lòng chuyển khoản với nội dung{" "}
          <TextApp style={styles.text16_red}>
            *0988616818 dấu cách 1188*
          </TextApp>{" "}
          tới tài khoản:
        </TextApp>
        <TextApp style={styles.text18_blue}>001001006008</TextApp>
        <TextApp>
          Ngân hàng <TextApp style={styles.text16_black}>Vietcombank</TextApp>
        </TextApp>
        <TextApp>Công ty cổ phần Vector edu</TextApp>
        <TextApp style={styles.text16_tealBlue}>Hoặc</TextApp>
        <TextApp style={styles.text18_blue}>0988666888</TextApp>
        <TextApp>
          Ngân hàng <TextApp style={styles.text16_black}>BIDV</TextApp>
        </TextApp>
        <TextApp>Công ty cổ phần Vector edu</TextApp>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btn: {
    position: "absolute",
    left: scale(20),
    right: scale(20),
    bottom: scale(30),
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: scale(20),
  },
  text18_black: {
    fontSize: 18,
    color: "#000",
    fontWeight: "600",
    marginVertical: scale(10),
  },
  text16_black: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
  text18_blue: {
    fontSize: 18,
    color: "#3d5cff",
    fontWeight: "600",
    marginVertical: scale(10),
  },
  text18_red: {
    fontSize: 18,
    color: "#f24024",
    fontWeight: "600",
    marginVertical: scale(10),
  },
  text16: {
    fontSize: 16,
    color: "#000",
    fontWeight: "400",
    textAlign: "center",
  },
  text16_red: {
    fontSize: 16,
    color: "#f24024",
    fontWeight: "400",
  },
  text16_tealBlue: {
    fontSize: 16,
    color: "#00a89d",
    fontWeight: "400",
    marginTop: scale(10),
  },
  line: {
    width: scale(50),
    height: 1,
    marginHorizontal: scale(10),
    backgroundColor: "#d8d8d8",
  },
  paymentGuide: {
    width: SCREEN_WIDTH,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scale(10),
  },
});
