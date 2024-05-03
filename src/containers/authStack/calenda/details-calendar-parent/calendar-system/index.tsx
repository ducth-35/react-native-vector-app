import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import TextApp from "@/components/textApp";
import { FontFamily } from "@/common/constant";
import { scale } from "@/common/scale";
import { Header } from "@/components/header";
import { HomeSVG } from "@/asset";
import {
  useCancelEvent,
  useGetEventDetail,
  useUpdateEvent,
} from "../../services";
import { SkeletonLoading } from "@/components/skeleton-loading";
import { CardInforTutor } from "@/components/card-infor-turtor";
import moment, { Moment } from "moment";
import { convertTimeCalendar } from "@/utils/format-time";
import { isNullOrEmpty } from "@/utils/method";
import { HIT_SLOP } from "@/utils/helper";
import { ModalizeSelectday } from "@/components/calendar/modalize-select-day";
import { ModalizeSelectTime } from "@/components/calendar/modalize-select-time";
import { ModalizeAddTitle } from "@/components/calendar/modalize-add-title";
import { Button } from "@/components/btn";
import { ModalConfirmDelete } from "@/components/modal-delete";

type Props = {
  id?: number;
};

export const CalendarSystem = ({ id = 0 }: Props) => {
  const { loading, data } = useGetEventDetail(id);
  const { isLoading, updateEvent } = useUpdateEvent(id);
  const { isloading, cancelEvent } = useCancelEvent(id);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const modalizeSelectdayRef = React.useRef<any>();
  const modalizeSelectTime = React.useRef<any>();
  const modalizeAddTitle = React.useRef<any>();
  const modalizeAddNote = React.useRef<any>();

  const [state, setState] = React.useState<{
    title: string;
    placeholder: string;
    valueTitle: string | undefined;
    dateStart: string | undefined;
    startTime: Moment;
    endTime: Moment;
    valueDescription: string | undefined;
    valueTutor: string | undefined;
  }>({
    title: "",
    placeholder: "",
    valueTitle: "",
    dateStart: "",
    startTime: moment(),
    endTime: moment(),
    valueDescription: "",
    valueTutor: "",
  });
  const [isChange, setIsChange] = React.useState<boolean>(false);

  React.useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      valueTitle: data?.title,
      startTime: moment(data?.startTime),
      endTime: moment(data?.endTime),
      dateStart: data?.day,
      valueDescription: data?.description,
      valueTutor: data?.tutor,
    }));
  }, [data]);

  React.useEffect(() => {
    const isDifferent =
      state.dateStart !== data?.day ||
      !state.startTime.isSame(moment(data?.startTime)) ||
      !state.endTime.isSame(moment(data?.endTime)) ||
      state.valueDescription !== data?.description;
    setIsChange(isDifferent);
  }, [state.dateStart, state.startTime, state.endTime, state.valueDescription]);

  const handleConfirmDate = React.useCallback((data: { dateStart: string }) => {
    setState((prevState) => ({ ...prevState, dateStart: data?.dateStart }));
  }, []);

  const handleSelectDate = React.useCallback(() => {
    modalizeSelectdayRef?.current?.open();
  }, []);

  const handleSelectTime = React.useCallback(() => {
    modalizeSelectTime?.current?.open();
  }, []);

  const handleAddTitle = React.useCallback(() => {
    modalizeAddTitle?.current?.open();
    setState((prevState) => ({ ...prevState, title: "Tiêu đề" }));
    setState((prevState) => ({
      ...prevState,
      placeholder: "Nội dung tiêu đề",
    }));
  }, []);

  const handleAddNote = React.useCallback(() => {
    modalizeAddNote?.current?.open();
    setState((prevState) => ({ ...prevState, title: "Ghi chú" }));
    setState((prevState) => ({
      ...prevState,
      placeholder: "Nội dung ghi chú",
    }));
  }, []);

  const handleConfirmTime = React.useCallback(
    (data: { startTime: Moment; endTime: Moment }) => {
      setState((prevState) => ({ ...prevState, startTime: data?.startTime }));
      setState((prevState) => ({ ...prevState, endTime: data?.endTime }));
    },
    []
  );

  const handleConfirmTitle = React.useCallback(
    (data: { description: string }) => {
      setState((prevState) => ({
        ...prevState,
        valueTitle: data?.description,
      }));
    },
    []
  );

  const handleConfirmNote = React.useCallback(
    (data: { description: string }) => {
      setState((prevState) => ({
        ...prevState,
        valueDescription: data?.description,
      }));
    },
    []
  );

  const handleUpdateEvent = () => {
    const params = {
      title: state?.valueTitle,
      startTime: moment(state?.startTime).format("HH:mm:ss"),
      endTime: moment(state?.endTime).format("HH:mm:ss"),
      note: state.valueDescription,
      day: state?.dateStart,
    };
    updateEvent(params);
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

  if (loading) {
    return (
      <SafeAreaView style={{ marginVertical: scale(30) }}>
        <SkeletonLoading />
      </SafeAreaView>
    );
  }

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
          lable="Giáo viên"
          colorDescription={"#858597"}
          description={state?.valueTutor}
        />
        <CardInforTutor
          lable="Thời gian"
          description={
            state?.startTime && state?.endTime
              ? `${convertTimeCalendar(
                  state?.startTime
                )} - ${convertTimeCalendar(state?.endTime)}`
              : ""
          }
          placeholder={
            !state?.startTime && !state?.endTime ? "Chọn khoảng thời gian" : ""
          }
          colorDescription={"#858597"}
          isRightLable
          rightLable={
            <>
              {state?.startTime && state?.endTime && (
                <TouchableOpacity hitSlop={HIT_SLOP} onPress={handleSelectTime}>
                  <TextApp preset="text14Blue">Sửa</TextApp>
                </TouchableOpacity>
              )}
            </>
          }
          onPress={handleSelectTime}
          isRightDescription
          rightDescription={
            <Pressable hitSlop={HIT_SLOP} onPress={handleSelectDate}>
              <TextApp preset="text14Normal">
                {isNullOrEmpty(state?.dateStart)
                  ? "Chọn ngày"
                  : `${state?.dateStart}`}
              </TextApp>
            </Pressable>
          }
        />
        <CardInforTutor
          lable="Ghi chú"
          placeholder={"Nội dung ghi chú"}
          colorDescription={"#858597"}
          description={state?.valueDescription}
          onPress={handleAddNote}
          isRightLable
          rightLable={
            <>
              {!isNullOrEmpty(state?.valueDescription) && (
                <TouchableOpacity onPress={handleAddNote}>
                  <TextApp preset="text14Blue">Sửa</TextApp>
                </TouchableOpacity>
              )}
            </>
          }
        />
      </View>
      {isChange ? (
        <View style={{ marginHorizontal: scale(20), marginBottom: scale(20) }}>
          <Button
            preset="blue"
            title="Lưu"
            onPress={handleUpdateEvent}
            isLoading={isLoading}
          />
        </View>
      ) : (
        <TouchableOpacity style={styles.cancel} onPress={handleCancleCalendar}>
          {isloading ? (
            <ActivityIndicator color={"#3d5cff"} />
          ) : (
            <TextApp style={styles.textcancel}>Huỷ lịch</TextApp>
          )}
        </TouchableOpacity>
      )}
      <ModalizeAddTitle
        title={state?.title}
        placeholder={state?.placeholder}
        ref={modalizeAddTitle}
        pressCancel={() => modalizeAddTitle.current?.close()}
        onSave={handleConfirmTitle}
        value={state?.valueTitle}
      />
      <ModalizeSelectday
        ref={modalizeSelectdayRef}
        title="Chọn ngày"
        onSave={handleConfirmDate}
        pressCancel={() => modalizeSelectdayRef?.current?.close()}
        valueDay={state?.dateStart}
      />
      <ModalizeSelectTime
        ref={modalizeSelectTime}
        pressCancel={() => modalizeSelectTime.current?.close()}
        onSave={handleConfirmTime}
        valueStartTime={state?.startTime}
        valueEndTime={state?.endTime}
      />
      <ModalizeAddTitle
        title={state?.title}
        placeholder={state?.placeholder}
        ref={modalizeAddNote}
        pressCancel={() => modalizeAddNote.current?.close()}
        onSave={handleConfirmNote}
        value={state?.valueDescription}
      />
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
