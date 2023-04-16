import { HomeSVG } from "@/asset";
import { FontFamily } from "@/common/constant";
import { SCREEN_HEIGHT, scale } from "@/common/scale";
import { Button } from "@/components/btn";
import { Header } from "@/components/header";
import { PaymentInfor } from "@/components/payment/payment-infor";
import TextApp from "@/components/textApp";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import moment from "moment";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

const initialDate = moment().format("YYYY-MM-DD");

export const PaymentDetails = () => {
  //   const [selectedDate, setSelectedDate] = React.useState(initialDate);
  const handlePayment = () => {
    navigate(APP_SCREEN.PAYMENT_GUIDE_SCREEN);
  };
  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        <View style={styles.viewHeader}>
          <Header
            canBack
            title="Lớp Toán - Mỹ An"
            backIcon={<HomeSVG.BACK />}
          />
        </View>
        <Calendar
          locale={"vn"}
          initialDate={initialDate}
          markingType={"custom"}
          markedDates={{
            [initialDate]: {
              selected: true,
              selectedColor: "#4d6eff",
              customContainerStyle: {
                borderRadius: 3,
              },
            },
          }}
          //   onDayPress={(day) => {
          //     onDayPress(day.dateString);
          //   }}
          animationType={"slide"}
          theme={{
            selectedDayBackgroundColor: "green",
            todayTextColor: "#333333",
            monthTextColor: "#000",
            textMonthFontWeight: "600",
            textDayFontWeight: "400",
            dayTextColor: "#333333",
            textDayFontFamily: FontFamily.poppins_regular,
            arrowColor: "#000",
            textMonthFontFamily: FontFamily.poppins_regular,
            arrowHeight: scale(30),
            arrowWidth: scale(30),
            textDayHeaderFontSize: 12,
          }}
        />
      </View>
      <ScrollView style={styles.infor}>
        <PaymentInfor
          lable="Giáo viên"
          description="Phạm Trần Phương"
          description2={"500/1 buổi"}
        />
        <PaymentInfor
          lable="Ngày học"
          description="Thứ 2 - Thứ 4 - Thứ"
          description2={"18:30 - 19:30"}
        />
        <PaymentInfor lable="Thời gian" description="01/04/2023 - 31/04/2" />
        <PaymentInfor lable="Trạng thái" description="Chưa thanh toán" />
      </ScrollView>
      <View style={styles.payment}>
        <View style={styles.flex1}>
          <Button preset="blue" title="Thanh toán" onPress={handlePayment} />
        </View>
        <View style={styles.price}>
          <TextApp style={styles.textPrice}>4.500.000 đ</TextApp>
          <TextApp preset="text14">/ 14 buổi học</TextApp>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  calendar: {
    backgroundColor: "#fff",
    paddingBottom: scale(20),
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    shadowRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },
  flex1: {
    flex: 1,
  },
  viewHeader: {
    marginTop: scale(50),
  },
  infor: {
    marginHorizontal: scale(20),
  },
  payment: {
    position: "absolute",
    bottom: scale(30),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    left: scale(20),
    right: scale(20),
  },
  price: {
    flex: 1,
    alignItems: "flex-end",
  },
  textPrice: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: FontFamily.poppins_bold,
    color: "#3d5cff",
  },
});
