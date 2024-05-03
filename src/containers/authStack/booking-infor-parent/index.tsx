import { HomeSVG } from "@/asset";
import { Button } from "@/components/btn";
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
import { ModalConfirmDelete } from "@/components/modal-delete";

export const BookingInforParent = ({ route }: any) => {
  const { id } = route?.params;
  const { state } = useGetBookingDetails(id);
  const { stateBooking, updateBooking } = useUpdateBooking();
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const handleReBooking = () => {
    const params = {
      state: BOOKING.pending,
      bookingId: state?.data.id || 0,
    };
    updateBooking(params);
  };

  const handleCancelBooking = () => {
    setShowModal(false);
    const params = {
      state: BOOKING.cancel_by_parent,
      bookingId: state?.data.id || 0,
    };
    updateBooking(params);
  };

  const handleCancelShowModal = () => {
    setShowModal(false);
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
            <Button preset="blue" title="Xem lớp học" />
          </View>
        );
      case "pending":
        return (
          <View
            style={{ marginHorizontal: scale(20), marginVertical: scale(10) }}
          >
            <Button
              preset="normal"
              styleTitle={{ color: "#3d5cff" }}
              title="Huỷ đặt"
              color="#3d5cff"
              isLoading={stateBooking?.loading}
              onPress={() => setShowModal(true)}
            />
          </View>
        );
      case "cancel_by_parent":
        return (
          <View
            style={{ marginHorizontal: scale(20), marginVertical: scale(10) }}
          >
            <Button
              preset="blue"
              title="Đặt lại"
              isLoading={stateBooking?.loading}
              onPress={handleReBooking}
            />
          </View>
        );
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
      <Header title="Chi tiết lịch đặt" canBack backIcon={<HomeSVG.BACK />} />
      {!state?.loading && (
        <ScrollView
          style={styles.viewBody}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: scale(50) }}
        >
          <CardInforTutor
            lable="Thời gian đặt"
            description={formatTime(state?.data?.createdAt || "")}
          />
          <CardInforTutor
            lable="Giáo viên"
            description={state?.data?.tutorFullName}
            isRightLable
            rightLable={status()}
          />
          <CardInforTutor
            lable="Trường"
            description={state?.data?.tutorSchool}
          />
          <CardInforTutor
            lable="Môn học"
            description={state?.data?.subjectName}
            isRightLable
            rightLable={<TextApp preset="text16">Giá một buổi học</TextApp>}
            isRightDescription
            rightDescription={
              <TextApp preset="text14Normal">
                {formatCurrency(Number(state?.data?.pricePerLesson))}
              </TextApp>
            }
          />
          <CardInforTutor
            lable="Học sinh"
            description={`${state?.data?.studentFullName} - ${state?.data?.studentGrade}`}
          />

          <CardInforTutor
            lable="Địa chỉ"
            description={state?.data?.parentLocation}
          />
          <CardInforTutor
            lable="Ngày học"
            description={
              Array.isArray(state?.data?.days)
                ? state?.data?.days.join(" - ")
                : state?.data?.days
            }
            isRightLable
            rightLable={<TextApp preset="text16">Giờ học</TextApp>}
            isRightDescription
            rightDescription={
              <TextApp preset="text14Normal">
                {state?.data?.startTime} - {state?.data?.endTime}
              </TextApp>
            }
          />
          <CardInforTutor
            lable="Ngày bắt đầu học"
            description={state?.data?.startDate}
          />
        </ScrollView>
      )}
      {renderButton()}
      <ModalConfirmDelete
        content={"Bạn có chắc chắn muốn huỷ đặt lịch ?"}
        txtcancel={"Huỷ"}
        txtconfirm={"Có"}
        visible={showModal}
        handleDelete={handleCancelBooking}
        handleCancel={handleCancelShowModal}
      />
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
    margin: scale(20),
  },
});
