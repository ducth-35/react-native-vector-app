import { HomeSVG } from "@/asset";
import { FontFamily } from "@/common/constant";
import { dispatch } from "@/common/redux";
import { SCREEN_HEIGHT, scale } from "@/common/scale";
import { Button } from "@/components/btn";
import { ButtonPresetsName } from "@/components/btn/preset";
import { Header } from "@/components/header";
import { PaymentInfor } from "@/components/payment/payment-infor";
import TextApp from "@/components/textApp";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { RESPONSE_CODE } from "@/network/config";
import { getErrorMessage } from "@/network/utils";
import { useGetPaymentDetail, useUpdatePaymentOrder } from "@/services/payment";
import { userInforSelector } from "@/store/auth/authSelector";
import { authAction } from "@/store/auth/authSlice";
import { PAYMENT_STATUS, USER_TYPE } from "@/utils/enum";
import ToastUtils from "@/utils/toastUtils";
import { isPast } from "date-fns";
import moment from "moment";
import React, { useTransition } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const initialDate = moment().format("YYYY-MM-DD");



export const PaymentDetails = (props: any) => {
  const params: PaymentDetailRouters = props.route?.params

  const user = useSelector(userInforSelector);
  const [isLoadingPaymentOrder, setIsLoadingPaymentOrder] = React.useState<boolean>(false);
  const isTutor = user.role == USER_TYPE.TUTOR
  const isParent = user.role == USER_TYPE.PARENT

  const { paymentDetail, loading } = useGetPaymentDetail(params.id);
  const lessonsDay = []
  if (paymentDetail?.lessonsDay !== undefined) {
    for (const dateString of paymentDetail?.lessonsDay) {
      const [day, month, year] = dateString.split("/");
      const convertedDateString = `${year}-${month}-${day}`;
      lessonsDay.push(convertedDateString)
    }
  }
  const markedDates: MarkedDates = lessonsDay.reduce((acc, date) => {
    return {
      ...acc,
      [date]: {
        selected: true,
        selectedColor: "#4d6eff",
        customContainerStyle: {
          borderRadius: 3,
        },
      },
    };
  }, {});


  const handlePayment = async () => {
    if (isTutor) {
      setIsLoadingPaymentOrder(true);
      const res = await useUpdatePaymentOrder(params.id)
      if (res.status === RESPONSE_CODE.SUCCESS) {
        setIsLoadingPaymentOrder(false);
        ToastUtils.show("Cập nhật thành công !");
      } else {
        const messageError = getErrorMessage(res);
        ToastUtils.show(messageError?.message);
        setIsLoadingPaymentOrder(false);
      }
      dispatch(authAction.refreshData());
      return
    }
    navigate(APP_SCREEN.PAYMENT_GUIDE_SCREEN);
  };
  const renderStatus = () => <TextApp preset="text14tomato" style={paymentDetail?.status == PAYMENT_STATUS.paid ? styles.paid : paymentDetail?.status == PAYMENT_STATUS.order ? styles.order : styles.unpaid}>
    {paymentDetail?.status == PAYMENT_STATUS.paid ? "Đã thanh toán" : paymentDetail?.status == PAYMENT_STATUS.order ? "Đề nghị thanh toán" : "Chưa thanh toán"}
  </TextApp>;

  const renderPrice = () => (
    <TextApp preset="text14BlueBold">{paymentDetail?.price}đ / {paymentDetail?.sessions} buổi</TextApp>
  );

  const renderPayment = () => {
    if (paymentDetail?.status === PAYMENT_STATUS.paid) {
      return "Đã thanh toán"
    }
    if (isTutor) {
      if (paymentDetail?.status === PAYMENT_STATUS.unpaid) {
        return "Yêu cầu thanh toán"
      }
      if (paymentDetail?.status === PAYMENT_STATUS.order) {
        return "Chờ thanh toán"
      }
    }
    return "Thanh toán"
  };
  const renderButtonPayment = () => {
    let style = styles.buttonPaymentNormal
    if (isParent) {
      if (paymentDetail?.status == PAYMENT_STATUS.paid) {
        style = styles.buttonPaymentDisable
      } else {
        style = styles.buttonPaymentNormal
      }
    }
    if (isTutor) {
      if (paymentDetail?.status == PAYMENT_STATUS.unpaid) {
        style = styles.buttonPaymentNormal
      } else {
        style = styles.buttonPaymentDisable
      }
    }
    return <Button preset={style.color as ButtonPresetsName} title={renderPayment()} onPress={handlePayment} disabled={style.disable} isLoading={isLoadingPaymentOrder} />
  }
  return (
    <SafeAreaView edges={["right", "left", "bottom"]} style={styles.container}>
      <View style={styles.calendar}>
        <View style={Platform.OS === "ios" && styles.viewHeader}>
          <Header
            canBack
            title={paymentDetail?.studentName}
            backIcon={<HomeSVG.BACK />}
          />
        </View>
        <Calendar
          style={{ marginBottom: scale(10) }}
          locale={"vn"}
          initialDate={initialDate}
          markingType={"custom"}
          markedDates={markedDates}
          animationType={"slide"}
          theme={{
            selectedDayBackgroundColor: "green",
            todayTextColor: "#333333",
            monthTextColor: "#000",
            textMonthFontWeight: "600",
            textDayFontWeight: "400",
            dayTextColor: "#333333",
            textDayFontFamily: FontFamily.SFUIText_regular,
            arrowColor: "#000",
            textMonthFontFamily: FontFamily.SFUIText_regular,
            arrowHeight: scale(30),
            arrowWidth: scale(30),
            textDayHeaderFontSize: 12,
          }}
        />
      </View>
      <ScrollView style={styles.infor} showsVerticalScrollIndicator={false}>
        <PaymentInfor
          lable="Học sinh"
          description={paymentDetail?.studentName}
          description2={paymentDetail?.pricePerLesson + "đ/1 buổi"}
        />
        <PaymentInfor
          lable="Ngày học"
          description={paymentDetail?.days?.join(" - ")}
          description2={paymentDetail?.startTime + " - " + paymentDetail?.endTime}
        />
        <PaymentInfor lable="Thời gian" description={paymentDetail?.startDate + " - " + paymentDetail?.endDate} />
        <View style={{ marginTop: scale(15) }}>
          <TextApp preset="text16">Trạng thái</TextApp>
          <View style={styles.viewStatus}>
            {renderStatus()}
            {renderPrice()}
          </View>
        </View>
      </ScrollView>
      <View style={styles.payment}>
        <View style={styles.flex1}>
          {renderButtonPayment()}
        </View>
        <View style={styles.price}>
          <TextApp style={styles.textPrice}>{paymentDetail?.price}đ</TextApp>
          <TextApp preset="text14">/ {paymentDetail?.sessions} buổi học</TextApp>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  calendar: {
    backgroundColor: "#fff",
    paddingBottom: scale(10),
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    shadowRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 10,
  },
  flex1: {
    flex: 1,
  },
  viewHeader: {
    marginTop: scale(40),
  },
  infor: {
    marginHorizontal: scale(20),
    marginTop: scale(10),
    flex: 1,
  },
  payment: {
    flexDirection: "row",
    marginVertical: scale(10),
    marginHorizontal: scale(20),
  },
  price: {
    flex: 1,
    alignItems: "flex-end",
  },
  textPrice: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: FontFamily.SFUIText_bold,
    color: "#3d5cff",
  },
  viewStatus: {
    marginTop: scale(5),
    flexDirection: "row",
    justifyContent: "space-between",
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
  buttonPaymentNormal: {
    color: "blue",
    disable: false
  },
  buttonPaymentDisable: {
    color: "disabled",
    disable: true
  }
});
