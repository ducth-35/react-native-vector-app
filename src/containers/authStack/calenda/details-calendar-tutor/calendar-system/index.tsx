import { scale } from "@/common/scale";
import { CardInforTutor } from "@/components/card-infor-turtor";
import TextApp from "@/components/textApp";
import moment, { Moment } from "moment";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useCancelEvent,
  useGetEventDetail,
  useUpdateEvent,
} from "../../services";
import { convertTimeCalendar } from "@/utils/format-time";
import { SafeAreaView } from "react-native-safe-area-context";
import { SkeletonLoading } from "@/components/skeleton-loading";
import { Header } from "@/components/header";
import { HomeSVG } from "@/asset";
import { FontFamily } from "@/common/constant";
import { Button } from "@/components/btn";
import { Status_calendar } from "@/utils/enum";
import { ModalConfirmDelete } from "@/components/modal-delete";

type Props = {
  id?: number;
};
export const CalendarSystem = ({ id = 0 }: Props) => {
  const { loading, data } = useGetEventDetail(id);
  const { isloading, cancelEvent } = useCancelEvent(id);
  const { isLoading, updateEvent } = useUpdateEvent(id);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const [state, setState] = React.useState<{
    valueTitle: string | undefined;
    dateStart: string | undefined;
    startTime: Moment;
    endTime: Moment;
    valueDescription: string | undefined;
    student: string | undefined;
    address: string | undefined;
  }>({
    valueTitle: "",
    dateStart: "",
    startTime: moment(),
    endTime: moment(),
    valueDescription: "",
    student: "",
    address: "",
  });

  React.useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      valueTitle: data?.title,
      startTime: moment(data?.startTime),
      endTime: moment(data?.endTime),
      dateStart: data?.day,
      valueDescription: data?.description,
      student: data?.student,
      address: data?.location,
    }));
  }, [data]);

  if (loading) {
    return (
      <SafeAreaView style={{ marginVertical: scale(30) }}>
        <SkeletonLoading />
      </SafeAreaView>
    );
  }

  const IsButtonDisabled = () => {
    // Lấy thời gian hiện tại
    const currentTime = moment();
    const startTime = moment(state.startTime);
    // Tính số ngày trôi qua từ startTime đến currentTime
    const daysDiff = currentTime.diff(startTime, "days");
    // Kiểm tra nếu số ngày đã trôi qua là 0, tức là currentTime nằm trong 1 ngày tính từ startTime trở về trước
    if (daysDiff === 0) {
      return false; // Thời gian đã trôi qua hơn 1 ngày
    } else {
      return true; // Thời gian nằm trong 1 ngày trở về trước tính từ startTime
    }
  };

  const renderStartTeaching = () => {
    if (data?.status === Status_calendar.InProgress) {
      return (
        <View style={{ marginHorizontal: scale(20), marginBottom: scale(20) }}>
          <Button
            preset="blue"
            title="Kết thúc"
            onPress={handleEndEvent}
            isLoading={isLoading}
          />
        </View>
      );
    } else if (data?.status === Status_calendar.Completed) {
      return <View style={{ marginHorizontal: scale(20), marginBottom: scale(20) }}>
        <Button
          preset="disabled"
          title="Đã hoàn thành buổi dạy"
          disabled={true}
        />
      </View>

    } else {
      return (
        <View style={{ marginHorizontal: scale(20), marginBottom: scale(20) }}>
          <Button
            preset="blue"
            title="Bắt đầu dạy"
            onPress={handleStartEvent}
            isLoading={isLoading}
          />
        </View>
      );
    }
  };

  const handleStartEvent = () => {
    let params = { status: "InProgress" };
    updateEvent(params);
  };

  const handleEndEvent = () => {
    let params = { status: "Completed" };
    updateEvent(params, "end");
  };

  const handleCancleCalendar = () => {
    setShowModal(true);
  };

  const handleCancelBooking = () => {
    setShowModal(false);
    cancelEvent();
  };

  const handleCancelShowModal = () => {
    setShowModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Lịch" canBack backIcon={<HomeSVG.BACK />} />
      <View style={styles.viewContent}>
        <CardInforTutor
          lable="Tiêu đề"
          colorDescription={"#858597"}
          description={state?.valueTitle}
        />
        <CardInforTutor
          lable="Thời gian"
          description={`${convertTimeCalendar(
            state?.startTime
          )} - ${convertTimeCalendar(state?.endTime)}`}
          isRightDescription
          rightDescription={
            <TextApp preset="text14Normal">{state?.dateStart}</TextApp>
          }
        />
        <CardInforTutor
          lable="Học sinh"
          colorDescription={"#858597"}
          description={state?.student}
        />
        <CardInforTutor
          lable="Địa chỉ"
          colorDescription={"#858597"}
          description={state?.address}
        />
        <CardInforTutor
          lable="Ghi chú"
          colorDescription={"#858597"}
          description={state?.valueDescription}
        />
      </View>
      {IsButtonDisabled() ? (
        <TouchableOpacity
          disabled={IsButtonDisabled()}
          style={styles.cancel}
          onPress={handleCancleCalendar}
        >
          {isloading ? (
            <ActivityIndicator color={"#3d5cff"} />
          ) : (
            <TextApp style={styles.textcancel}>Huỷ lịch</TextApp>
          )}
        </TouchableOpacity>
      ) : (
        <>{renderStartTeaching()}</>
      )}
      <ModalConfirmDelete
        content={"Bạn có chắc chắn muốn huỷ lịch này?"}
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
  },
  viewContent: { flex: 1, paddingHorizontal: scale(20) },
  cancel: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#3d5cff",
    paddingVertical: scale(10),
    marginHorizontal: scale(20),
    marginBottom: scale(10),
  },
  textcancel: {
    color: "#3d5cff",
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 16,
  },
});
