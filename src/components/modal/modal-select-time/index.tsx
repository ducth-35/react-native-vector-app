import React from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import TextApp from "@/components/textApp";
import { ButtonConfirm } from "@/components/button-confirm";
import { scale } from "@/common/scale";
import { ModalizeTimePicker } from "../modal-picker-time";
import DatePicker from "react-native-date-picker";
import { convertTime } from "@/utils/format-time";
import moment, { Moment } from "moment";

type Props = {
  pressCancel?: () => void;
  onSave: (data: { startTime: Moment; endTime: Moment }) => void;
};

export const ModalizeSelectTime = React.forwardRef(
  ({ pressCancel, onSave }: Props, ref) => {
    const [startTime, setStartTime] = React.useState(new Date());
    const [endTime, setEndTime] = React.useState(new Date());
    const modalizeSelectTimeRef = React.useRef<Modalize>(null);
    const [title, setTitle] = React.useState<string>("");
    const [isStartTime, setIsStartTime] = React.useState(true);

    const momentStartTime = moment(startTime);
    const momentEndTime = moment(endTime);

    const handleStartTime = () => {
      setTitle("Giờ bắt đầu");
      setIsStartTime(true);
      modalizeSelectTimeRef.current?.open();
    };

    const handleEndTime = () => {
      setTitle("Giờ kết thúc");
      setIsStartTime(false);
      modalizeSelectTimeRef.current?.open();
    };

    const handleTimeChange = (selectedDate: Date) => {
      if (isStartTime) {
        setStartTime(selectedDate);
      } else {
        setEndTime(selectedDate);
      }
      modalizeSelectTimeRef.current?.close();
    };

    const handleConfirm = () => {
      const data = { startTime: momentStartTime, endTime: momentEndTime };
      onSave(data);
    };

    return (
      <Portal>
        <Modalize
          modalStyle={styles.container}
          adjustToContentHeight={true}
          ref={ref}
          handleStyle={{
            display: "none",
          }}
          closeOnOverlayTap={false}
        >
          <TextApp preset="text18" style={styles.title}>
            Giờ học
          </TextApp>
          <View style={styles.viewTime}>
            <Pressable style={styles.selecttime} onPress={handleStartTime}>
              <TextApp style={styles.time}>
                {convertTime(momentStartTime)}
              </TextApp>
            </Pressable>
            <TextApp preset="text18" style={styles.line}>
              -
            </TextApp>
            <Pressable style={styles.selecttime} onPress={handleEndTime}>
              <TextApp style={styles.time}>
                {convertTime(momentEndTime)}
              </TextApp>
            </Pressable>
          </View>
          <View style={styles.btn}>
            <ButtonConfirm
              textConfirm={"Tiếp tục"}
              textCancel={"Huỷ"}
              pressCancel={pressCancel}
              pressConfirrm={handleConfirm}
            />
          </View>
        </Modalize>
        <ModalizeTimePicker
          ref={modalizeSelectTimeRef}
          title={title}
          children={
            <DatePicker
              mode="time"
              date={isStartTime ? startTime : endTime}
              androidVariant="iosClone"
              onDateChange={handleTimeChange}
            />
          }
        />
      </Portal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  btn: {
    marginHorizontal: scale(20),
    marginBottom: scale(30),
  },
  title: {
    marginVertical: scale(20),
    textAlign: "center",
  },
  viewTime: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: scale(20),
    marginBottom: scale(30),
  },
  time: {
    color: "#3d5cff",
    fontSize: 16,
  },
  selecttime: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: scale(40),
    backgroundColor: "#f4f3fd",
    borderRadius: scale(5),
  },
  line: {
    color: "#3d5cff",
    marginHorizontal: scale(10),
  },
  selectedTime: {
    color: "blue",
  },
});
