import React from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Pressable, StyleSheet, View } from "react-native";
import TextApp from "@/components/textApp";
import { scale } from "@/common/scale";
import { ModalizeTimePicker } from "@/components/modal/modal-picker-time";
import DatePicker from "react-native-date-picker";
import { convertTime } from "@/utils/format-time";
import moment, { Moment } from "moment";
import { Button } from "@/components/btn";

type Props = {
  pressCancel?: () => void;
  onSave: (data: { startTime: Moment; endTime: Moment }) => void;
  valueStartTime?: moment.Moment | undefined;
  valueEndTime?: moment.Moment | undefined;
};

export const ModalizeSelectTime = React.forwardRef(
  ({ pressCancel, onSave, valueStartTime, valueEndTime }: Props, ref) => {
    const [startTime, setStartTime] = React.useState<Moment>(
      moment(valueStartTime) || moment()
    );
    const [endTime, setEndTime] = React.useState<Moment>(
      moment(valueEndTime) || moment()
    );

    const modalizeSelectTimeRef = React.useRef<any>(null);
    const [title, setTitle] = React.useState<string>("");
    const [isStartTime, setIsStartTime] = React.useState<boolean>(true);

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

    const handleTimeChange = (selectedDate: Moment) => {
      if (isStartTime) {
        setStartTime(selectedDate);
      } else {
        setEndTime(selectedDate);
      }
    };

    const handleConfirm = () => {
      const data = { startTime, endTime };
      onSave?.(data);
      pressCancel?.();
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
          closeOnOverlayTap={true}
          scrollViewProps={{
            showsVerticalScrollIndicator: false
          }}
        >
          <TextApp preset="text18" style={styles.title}>
            Chọn khoảng thời gian
          </TextApp>
          <View style={styles.viewTime}>
            <Pressable style={styles.selecttime} onPress={handleStartTime}>
              <TextApp style={styles.time}>{convertTime(startTime)}</TextApp>
            </Pressable>
            <View style={styles.line} />
            <Pressable style={styles.selecttime} onPress={handleEndTime}>
              <TextApp style={styles.time}>{convertTime(endTime)}</TextApp>
            </Pressable>
          </View>
          <View style={styles.btn}>
            <Button
              preset="blue"
              title="Hoàn thành chọn"
              onPress={handleConfirm}
            />
          </View>
        </Modalize>
        <ModalizeTimePicker
          ref={modalizeSelectTimeRef}
          title={title}
          children={
            <DatePicker
              mode="time"
              date={isStartTime ? startTime.toDate() : endTime.toDate()}
              androidVariant="iosClone"
              onDateChange={(date: Date) => handleTimeChange(moment(date))}
              // minimumDate={new Date()}
              is24hourSource={"locale"}
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
