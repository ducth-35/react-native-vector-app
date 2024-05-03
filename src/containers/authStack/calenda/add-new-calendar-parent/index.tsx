import { HomeSVG } from "@/asset";
import { scale } from "@/common/scale";
import { Button } from "@/components/btn";
import { ModalizeAddTitle } from "@/components/calendar/modalize-add-title";
import { ModalizeSelectday } from "@/components/calendar/modalize-select-day";
import { ModalizeSelectTime } from "@/components/calendar/modalize-select-time";
import { CardInforTutor } from "@/components/card-infor-turtor";
import { Header } from "@/components/header";
import TextApp from "@/components/textApp";
import { convertTimeCalendar } from "@/utils/format-time";
import { HIT_SLOP } from "@/utils/helper";
import { isNullOrEmpty } from "@/utils/method";
import moment, { Moment } from "moment";
import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreateEvent } from "../services";
import ToastUtils from "@/utils/toastUtils";

export const AddNewCalendar = () => {
  const { loading, createEvent } = useCreateEvent();
  const modalizeSelectdayRef = React.useRef<any>();
  const modalizeSelectTime = React.useRef<any>();
  const modalizeAddTitle = React.useRef<any>();
  const modalizeAddNote = React.useRef<any>();
  const [state, setState] = React.useState<{
    title: string;
    placeholder: string;
    valueTitle: string;
    dateStart: string;
    startTime: Moment;
    endTime: Moment;
    valueDescription: string;
  }>({
    title: "",
    placeholder: "",
    valueTitle: "",
    dateStart: "",
    startTime: moment(),
    endTime: moment(),
    valueDescription: "",
  });

  const [allFieldsFilled, setAllFieldsFilled] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (
      state.dateStart &&
      state.startTime &&
      state.endTime &&
      state.valueDescription &&
      state.valueTitle
    ) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  }, [
    state.dateStart,
    state.startTime,
    state.endTime,
    state.valueDescription,
    state.valueTitle,
  ]);

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
    setState((prevState) => ({
      ...prevState,
      title: "Tiêu đề",
      placeholder: "Nội dung tiêu đề...",
    }));
  }, []);

  const handleAddNote = React.useCallback(() => {
    modalizeAddNote?.current?.open();
    setState((prevState) => ({
      ...prevState,
      title: "Ghi chú",
      placeholder: "Nội dung ghi chú",
    }));
  }, []);

  const handleConfirmTime = React.useCallback(
    (data: { startTime: Moment; endTime: Moment }) => {
      setState((prevState) => ({
        ...prevState,
        endTime: data?.endTime,
        startTime: data?.startTime,
      }));
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

  const handleCreateCalendar = () => {
    const startTime = moment(state?.startTime);
    const endTime = moment(state?.endTime);
    if (endTime.isSameOrBefore(startTime)) {
      ToastUtils.show("Giờ kết thúc phải lớn hơn giờ bắt đầu");
      return;
    }
    const params = {
      title: state?.valueTitle,
      startTime: startTime.format("HH:mm"),
      endTime: endTime.format("HH:mm"),
      note: state.valueDescription,
      day: state?.dateStart,
    };
    createEvent(params);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Thêm lịch mới" canBack backIcon={<HomeSVG.BACK />} />
      <View style={styles.body}>
        <CardInforTutor
          lable="Tiêu đề"
          placeholder={"Thêm tiêu đề"}
          colorDescription={"#858597"}
          description={state?.valueTitle}
          onPress={handleAddTitle}
          isRightLable
          rightLable={
            <>
              {!isNullOrEmpty(state?.valueTitle) && (
                <TouchableOpacity onPress={handleAddTitle}>
                  <TextApp preset="text14Blue">Sửa</TextApp>
                </TouchableOpacity>
              )}
            </>
          }
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
      {allFieldsFilled && (
        <View style={{ marginHorizontal: scale(20), marginBottom: scale(20) }}>
          <Button
            preset="blue"
            title="Tạo"
            onPress={handleCreateCalendar}
            isLoading={loading}
          />
        </View>
      )}

      <ModalizeSelectday
        ref={modalizeSelectdayRef}
        title="Chọn ngày"
        onSave={handleConfirmDate}
        pressCancel={() => modalizeSelectdayRef?.current?.close()}
      />
      <ModalizeSelectTime
        ref={modalizeSelectTime}
        pressCancel={() => modalizeSelectTime.current?.close()}
        onSave={handleConfirmTime}
      />
      <ModalizeAddTitle
        title={state?.title}
        placeholder={state?.placeholder}
        ref={modalizeAddTitle}
        pressCancel={() => modalizeAddTitle.current?.close()}
        onSave={handleConfirmTitle}
      />
      <ModalizeAddTitle
        title={state?.title}
        placeholder={state?.placeholder}
        ref={modalizeAddNote}
        pressCancel={() => modalizeAddNote.current?.close()}
        onSave={handleConfirmNote}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  body: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
});
