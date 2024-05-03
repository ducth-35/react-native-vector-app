import { HomeSVG } from "@/asset";
import { Button } from "@/components/btn";
import { ButtonConfirm } from "@/components/button-confirm";
import TextApp from "@/components/textApp";
import { BOOKING, STATUS_BOOKING } from "@/utils/enum";
import { formatTime } from "@/utils/format-time";
import { formatCurrency } from "@/utils/helper";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "../../../common/scale";
import { CardInforTutor } from "../../../components/card-infor-turtor";
import { Header } from "../../../components/header";
import { useGetBookingDetails, useUpdateBooking } from "./services";
import { SkeletonLoading } from "@/components/skeleton-loading";
import { LoadingView } from "@/components/loading-view";

export const BookingInforTutor = ({ route }: any) => {
  const { id } = route?.params;
  const { state } = useGetBookingDetails(id);
  const { stateBooking, updateBooking } = useUpdateBooking();

  const handleConfirmBooking = () => {
    const params = {
      state: BOOKING.accept,
      bookingId: state?.data.id || 0,
    };
    updateBooking(params);
  };
  const handleCancelBooking = () => {
    const params = {
      state: BOOKING.cancel_by_tutor,
      bookingId: state?.data.id || 0,
    };
    updateBooking(params);
  };

  const status = () => {
    switch (state?.data.state) {
      case "accept":
        return (
          <TextApp preset="text14tealBlue">{STATUS_BOOKING.accept}</TextApp>
        );
      case "pending":
        return <TextApp preset="text14Blue">{STATUS_BOOKING.pending}</TextApp>;
      case "cancel_by_parent":
        return (
          <TextApp preset="text14tomato">
            {STATUS_BOOKING.cancel_by_parent}
          </TextApp>
        );
      case "cancel_by_tutor":
        return (
          <TextApp preset="text14tomato">
            {STATUS_BOOKING.cancel_by_tutor}
          </TextApp>
        );
      default:
        break;
    }
  };

  const renderButton = () => {
    switch (state?.data.state) {
      case "accept":
        return (
          <View
            style={{ marginHorizontal: scale(20), marginVertical: scale(10) }}
          >
            <Button preset="blue" title="Xem lớp dạy" />
          </View>
        );
      case "pending":
        return (
          <View style={styles.btn}>
            <ButtonConfirm
              textConfirm={"Nhận lịch"}
              textCancel={"Từ chối"}
              pressCancel={handleCancelBooking}
              pressConfirrm={handleConfirmBooking}
              newstyle={styles.newBtn}
              newtext={styles.newTextBtn}
            />
          </View>
        );
      case "cancel_by_parent":
        return null;
      case "cancel_by_tutor":
        return null;
      default:
        break;
    }
  };

  if (state?.loading) {
    return (
      <SafeAreaView style={{ marginVertical: scale(30) }}>
        <SkeletonLoading />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Chi tiết đặt lịch" canBack backIcon={<HomeSVG.BACK />} />
      {!state?.loading && (
        <ScrollView
          style={styles.viewBody}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: scale(50) }}
        >
          <CardInforTutor
            lable="Thời gian đặt"
            description={formatTime(state?.data?.createdAt || "")}
            isRightLable
            rightLable={status()}
          />
          <CardInforTutor
            lable="Môn dạy"
            description={state?.data?.subjectName}
          />
          <CardInforTutor
            lable="Thu nhập"
            description={`${formatCurrency(
              Number(state?.data?.pricePerLesson)
            )} / 1 buổi`}
          />
          <CardInforTutor
            lable="Ngày dạy"
            description={
              Array.isArray(state?.data?.days)
                ? state?.data?.days.join(" - ")
                : state?.data?.days
            }
          />
          <CardInforTutor
            lable="Giờ dạy"
            description={`${state?.data?.startTime} - ${state?.data?.endTime}`}
          />
          <CardInforTutor
            lable="Ngày bắt đầu học"
            description={state?.data?.startDate}
          />
          <CardInforTutor
            lable="Học sinh"
            description={`${state?.data?.studentFullName} - ${state?.data?.studentGrade}`}
          />
          <CardInforTutor
            lable="Địa chỉ"
            description={state?.data?.parentLocation}
          />
        </ScrollView>
      )}
      {stateBooking?.loading && <LoadingView />}
      {renderButton()}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewBody: {
    flex: 1,
    marginHorizontal: scale(20),
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: scale(20),
    marginVertical: scale(10),
  },
  newBtn: {
    backgroundColor: "#f4f3fd",
  },
  newTextBtn: {
    color: "#b8b8d2",
  },
});
