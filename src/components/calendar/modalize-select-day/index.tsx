import React from "react";
import { StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import TextApp from "../../textApp";
import { Calendar } from "react-native-calendars";
import { FontFamily } from "@/common/constant";
import { scale } from "@/common/scale";
import { Button } from "@/components/btn";

import moment from "moment";

type Props = {
  title?: string;
  pressCancel?: () => void;
  onSave: (data: { dateStart: string }) => void;
  valueDay?: Date | string;
};

const initialDate = moment().format("YYYY-MM-DD");

export const ModalizeSelectday = React.forwardRef(
  ({ title, pressCancel, onSave, valueDay }: Props, ref) => {
    const [selectedDate, setSelectedDate] = React.useState<string>(
      valueDay ? moment(valueDay).format("YYYY-MM-DD") : initialDate
    );

    const onDayPress = (day: { dateString: string }) => {
      setSelectedDate(day.dateString);
    };

    const pressConfirrm = () => {
      const date = { dateStart: selectedDate };
      onSave?.(date);
      pressCancel?.();
    };

    return (
      <Portal>
        <Modalize
          modalStyle={styles.calendar}
          adjustToContentHeight={true}
          ref={ref}
          handleStyle={{
            display: "none",
          }}
          closeOnOverlayTap={false}
          scrollViewProps={{
            showsVerticalScrollIndicator: false
          }}
        >
          <TextApp preset="text18" style={styles.title}>
            {title}
          </TextApp>
          <Calendar
            initialDate={initialDate}
            markingType={"custom"}
            locale={"vn"}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: "#4d6eff",
                customContainerStyle: {
                  borderRadius: 3,
                },
              },
            }}
            minDate={moment().format("YYYY-MM-DD")}
            onDayPress={onDayPress}
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
          <View style={styles.line} />
          <View style={styles.btn}>
            <Button
              preset="blue"
              title="Hoàn thành chọn"
              onPress={pressConfirrm}
            />
          </View>
        </Modalize>
      </Portal>
    );
  }
);

const styles = StyleSheet.create({
  calendar: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  title: {
    marginVertical: scale(20),
    textAlign: "center",
  },
  line: {
    backgroundColor: "#d8d8d8",
    height: 1,
    marginBottom: scale(30),
  },
  btn: {
    marginHorizontal: scale(20),
    marginBottom: scale(30),
  },
});
