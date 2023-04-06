import React, { Children } from "react";
import { StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import TextApp from "../../textApp";
import { Calendar } from "react-native-calendars";
import { FontFamily } from "@/common/constant";
import { scale } from "@/common/scale";
import moment from "moment";

type Props = {
  title?: string;
  children?: JSX.Element;
};

const initialDate = moment().format("YYYY-MM-DD");

export const ModalizeCalendar = React.forwardRef(
  ({ title, children }: Props, ref) => {
    const [selectedDate, setSelectedDate] = React.useState(initialDate);

    const onDayPress = (day: string) => {
      setSelectedDate(day);
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
            onDayPress={(day) => {
              onDayPress(day.dateString);
            }}
            animationType={"slide"}
            theme={{
              selectedDayBackgroundColor: "green",
              todayTextColor: "#333333",
              monthTextColor: "#000",
              textMonthFontWeight: "600",
              textDayFontWeight: "400",
              dayTextColor: "#333333",
              textDayFontFamily: FontFamily.poppins_regular,
              arrowColor: "#000",
              textMonthFontFamily: FontFamily.poppins_regular,
              arrowHeight: scale(30),
              arrowWidth: scale(30),
              textDayHeaderFontSize: scale(12),
            }}
          />
          <View style={styles.line} />
          {children}
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
});