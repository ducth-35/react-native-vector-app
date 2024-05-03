import { FontFamily } from "@/common/constant";
import { scale } from "@/common/scale";
import TextApp from "@/components/textApp";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { PaymentInfor } from "@/types/payment";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { PAYMENT_STATUS } from "@/utils/enum";

type Props = {
  item: PaymentInfor;
};

export const CardPayment = ({ item }: Props) => {
  const handlePaymentDetails = () => {
    navigate(APP_SCREEN.PAYMENT_DETAIL_SCREEN, {id: item.id});
  };

  return (
    <Pressable
      style={styles.container}
      onPress={handlePaymentDetails.bind(null)}
    >
      <View style={[styles.name, { backgroundColor: item.color }]}>
        <TextApp>
          {item.subjectName} - {item?.studentName}
        </TextApp>
      </View>
      <View style={styles.price}>
        <TextApp preset="text16" style={styles.text16}>
          {item?.sessions} buổi
        </TextApp>
        <TextApp style={styles.textPice}>{item?.price} đ</TextApp>
      </View>
      <View style={styles.date}>
        <TextApp preset="text14" style={styles.text14}>
          {item.startDate} - {item?.endDate}
        </TextApp>
        <TextApp preset="text14" style={item.status == PAYMENT_STATUS.paid ? styles.paid : item.status == PAYMENT_STATUS.order ? styles.order : styles.unpaid}>
          {item.status == PAYMENT_STATUS.paid ? "Đã thanh toán" : item.status == PAYMENT_STATUS.order ? "Đề nghị thanh toán" : "Chưa thanh toán"}
        </TextApp>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: scale(20),
    marginVertical: scale(10),
    backgroundColor: "#fff",
    borderRadius: scale(20),
    shadowRadius: 5,
    shadowColor: "#000",
    elevation: 10,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  name: {
    backgroundColor: "#cfecff",
    padding: scale(10),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
  price: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: scale(15),
    marginVertical: scale(10),
  },
  date: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: scale(15),
    marginBottom: scale(20),
  },
  paid: {
    color: "#00a89d",
  },
  unpaid: {
    color: "#f24024",
  },
  order: {
    color: "#f24023",
  },
  text16: {
    color: "#858597",
    fontFamily: FontFamily.SFUIText_medium,
    fontWeight: "500",
  },
  text14: {
    color: "#858597",
    fontFamily: FontFamily.SFUIText_regular,
    fontWeight: "400",
  },
  textPice: {
    color: "#000",
    fontFamily: FontFamily.SFUIText_bold,
    fontSize: 16,
    fontWeight: "600",
  },
});
