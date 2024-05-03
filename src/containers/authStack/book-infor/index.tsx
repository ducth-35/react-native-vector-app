import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Header } from "../../../components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardInforTutor } from "../../../components/card-infor-turtor";
import { scale } from "../../../common/scale";
import { ButtonConfirm } from "../../../components/button-confirm";
import { goBack } from "../../../navigators/navigation-services";
import TextApp from "@/components/textApp";
import { isNullOrEmpty } from "@/utils/method";
import { ModalizeSelectDay } from "@/components/modal/modal-select-day";
import { DAY } from "@/utils/mock-data";
import { ModalizeSelectTime } from "@/components/modal/modal-select-time";
import { Moment } from "moment";
import { convertTime } from "@/utils/format-time";
import { ModalizeCalendar } from "@/components/modal/modalize-calender";
import { ModalizeSelectSubject } from "@/components/modal/modal-select-subjects";
import { userInforSelector } from "@/store/auth/authSelector";
import { useSelector } from "react-redux";
import { ModalizeSelectChildren } from "@/components/modal/modal-select-children";
import { usePostBooking } from "./services";
import { HIT_SLOP, formatCurrency } from "@/utils/helper";
import { ModalBookingSuccess } from "./booking-success";
import { LoadingView } from "@/components/loading-view";
import { HomeSVG } from "@/asset";

export const BookingInfor = ({ route }: any) => {
  const { state, postBooking } = usePostBooking();
  const { subjects, name, schoolName, tutorId } = route?.params;
  const user = useSelector(userInforSelector);

  const [subject, setSubject] = React.useState<string[] | any>([]);
  const [student, setStudent] = React.useState<string[] | any>([]);
  const [day, setDay] = React.useState<string[]>([]);
  const [startTime, setStartTime] = React.useState<Moment>();
  const [endTime, setEndTime] = React.useState<Moment>();
  const [dateStart, setDateStart] = React.useState<string>();

  const [dataModal, setDataModal] = React.useState<{
    label: string;
    item: string[];
  }>({
    label: "",
    item: [],
  });

  const [dataModalChildren, setDataModalChildren] = React.useState<{
    label: string;
    item: childrenInterface[];
  }>({
    label: "",
    item: [],
  });

  // modalize
  const modalizeSubjectRef = React.useRef<any>();
  const modalizeSelectDay = React.useRef<any>();
  const modalizeSelectTime = React.useRef<any>();
  const modalizeCalendarRef = React.useRef<any>();
  const modalizeSelectChildren = React.useRef<any>();

  const handleOpenModalSubject = () => {
    const dataSubject = {
      label: "Môn học",
      item: subjects,
    };
    setDataModal(dataSubject);
    modalizeSubjectRef?.current?.open();
  };

  const handleOpeSelectChildren = () => {
    const dataChildren = {
      label: "Đặt lịch học cho con",
      item: user.children,
    };
    setDataModalChildren(dataChildren);
    modalizeSelectChildren?.current?.open();
  };

  const handleConfirmTime = (data: { startTime: Moment; endTime: Moment }) => {
    setStartTime(data.startTime);
    setEndTime(data.endTime);
    modalizeSelectTime.current.close();
  };

  const handleConfirmDateStart = (data: { dateStart: string }) => {
    setDateStart(data.dateStart);
    modalizeCalendarRef.current.close();
  };

  const handleOpenSelectDay = () => {
    modalizeSelectDay.current.open();
  };
  const handleContinueSelectDay = () => {
    modalizeSelectDay.current.close();
  };

  const handleSelectTime = () => {
    modalizeSelectTime.current.open();
  };

  const handleOpenDateStart = () => {
    modalizeCalendarRef.current.open();
  };

  const isButtonDisabled =
    subject.length === 0 ||
    student.length === 0 ||
    day.length === 0 ||
    !startTime ||
    !endTime ||
    !dateStart;

  const handleBooking = () => {
    const params = {
      tutorId: tutorId,
      subjectId: subject.length > 0 ? subject[0].subjectId : 0,
      studentId: student?.length > 0 ? student[0]?.id : 0,
      startDate: dateStart,
      startTime: convertTime(startTime),
      endTime: convertTime(endTime),
      days: day,
    };
    postBooking(params);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header canBack backIcon={<HomeSVG.BACK />} title="Thông tin đặt" />
      <ScrollView
        style={styles.viewBody}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scale(50) }}
      >
        <CardInforTutor
          lable="Giáo viên"
          description={name}
          isRightLable
          rightLable={
            <TouchableOpacity>
              <TextApp preset="text14Blue">Đổi giáo viên</TextApp>
            </TouchableOpacity>
          }
        />
        <CardInforTutor lable="Trường" description={schoolName} />
        <CardInforTutor
          lable="Môn học"
          description={subject.length > 0 ? subject[0].subjectName : ""}
          placeholder={"Chọn môn học"}
          isRightLable
          onPress={handleOpenModalSubject}
          rightLable={
            <>
              {!isNullOrEmpty(subject) && (
                <TouchableOpacity
                  hitSlop={HIT_SLOP}
                  onPress={handleOpenModalSubject}
                >
                  <TextApp preset="text14Blue">Sửa</TextApp>
                </TouchableOpacity>
              )}
            </>
          }
        />
        <CardInforTutor
          lable="Giá 1 buổi học"
          description={
            subject.length > 0 ? `${formatCurrency(subject[0].price)}` : ""
          }
          placeholder={isNullOrEmpty(subject) ? "Chưa chọn môn học" : ""}
        />
        <CardInforTutor
          lable="Học sinh"
          description={
            student?.length > 0
              ? `${student[0]?.fullName} - ${student[0]?.gradeName}`
              : ""
          }
          placeholder={"Chọn học sinh"}
          isRightLable
          onPress={handleOpeSelectChildren}
          rightLable={
            <>
              {!isNullOrEmpty(student) && (
                <TouchableOpacity
                  hitSlop={HIT_SLOP}
                  onPress={handleOpeSelectChildren}
                >
                  <TextApp preset="text14Blue">Sửa</TextApp>
                </TouchableOpacity>
              )}
            </>
          }
        />
        <CardInforTutor
          lable="Địa chỉ"
          description={user?.location}
        />
        <CardInforTutor
          lable="Ngày học"
          description={Array.isArray(day) ? day.join(" - ") : day}
          placeholder={"Chọn ngày học"}
          isRightLable
          onPress={handleOpenSelectDay}
          rightLable={
            <>
              {!isNullOrEmpty(day) && (
                <TouchableOpacity
                  hitSlop={HIT_SLOP}
                  onPress={handleOpenSelectDay}
                >
                  <TextApp preset="text14Blue">Sửa</TextApp>
                </TouchableOpacity>
              )}
            </>
          }
        />
        <CardInforTutor
          lable="Giờ học"
          description={
            startTime && endTime
              ? `${convertTime(startTime)} - ${convertTime(endTime)}`
              : ""
          }
          placeholder={!startTime && !endTime ? "Chọn giờ học" : ""}
          isRightLable
          onPress={handleSelectTime}
          rightLable={
            <>
              {startTime && endTime && (
                <TouchableOpacity hitSlop={HIT_SLOP} onPress={handleSelectTime}>
                  <TextApp preset="text14Blue">Sửa</TextApp>
                </TouchableOpacity>
              )}
            </>
          }
        />

        <CardInforTutor
          lable="Ngày bắt đầu học"
          description={dateStart}
          placeholder={"Chọn ngày bắt đầu học"}
          isRightLable
          onPress={handleOpenDateStart}
          rightLable={
            <>
              {!isNullOrEmpty(dateStart) && (
                <TouchableOpacity
                  hitSlop={HIT_SLOP}
                  onPress={handleOpenDateStart}
                >
                  <TextApp preset="text14Blue">Sửa</TextApp>
                </TouchableOpacity>
              )}
            </>
          }
        />
      </ScrollView>
      <View style={styles.btn}>
        <ButtonConfirm
          textConfirm={"Đặt lịch"}
          textCancel={"Huỷ"}
          pressCancel={() => goBack()}
          pressConfirrm={handleBooking}
          disabled={isButtonDisabled}
          newstyle={styles.newBtn}
          newtext={styles.newTextBtn}
        />
      </View>
      <ModalizeSelectSubject
        ref={modalizeSubjectRef}
        data={dataModal}
        isOneSelect
        handleClose={() => modalizeSubjectRef.current.close()}
        selectedItems={subject}
        setSelectedItems={setSubject}
        isDisable={isNullOrEmpty(dataModal?.item) ? true : false}
        newstyle={styles.newBtn}
        newtext={styles.newTextBtn}
      />
      <ModalizeSelectDay
        ref={modalizeSelectDay}
        data={DAY}
        handleClose={() => modalizeSelectDay.current.close()}
        handleOpenNewModal={handleContinueSelectDay}
        selectedItems={day}
        setSelectedItems={setDay}
      />
      <ModalizeSelectTime
        ref={modalizeSelectTime}
        pressCancel={() => modalizeSelectTime.current?.close()}
        onSave={handleConfirmTime}
      />
      <ModalizeCalendar
        ref={modalizeCalendarRef}
        title="Ngày bắt đầu học"
        onSave={handleConfirmDateStart}
        pressCancel={() => modalizeCalendarRef?.current?.close()}
      />

      <ModalizeSelectChildren
        ref={modalizeSelectChildren}
        data={dataModalChildren}
        isOneSelect
        handleClose={() => modalizeSelectChildren.current.close()}
        selectedItems={student}
        setSelectedItems={setStudent}
        isDisable={dataModalChildren?.item?.length === 0 ? true : false}
        newstyle={styles.newBtn}
        newtext={styles.newTextBtn}
      />
      {state?.showModal && <ModalBookingSuccess visible={state?.showModal} />}
      {state?.loading && <LoadingView />}
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
    paddingTop: scale(20),
    marginBottom: scale(10),
  },
  newBtn: {
    backgroundColor: "#f4f3fd",
  },
  newTextBtn: {
    color: "#b8b8d2",
  },
});
