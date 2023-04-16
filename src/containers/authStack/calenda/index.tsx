import React, { FC } from "react";
import { View } from "react-native";
import TextApp from "../../../components/textApp";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import { FontFamily } from "../../../common/constant";
import { scale } from "../../../common/scale";
import moment from "moment";

const initialDate = moment().format("YYYY-MM-DD");
export const CalendaScreen: FC = () => {
  const [selectedDate, setSelectedDate] = React.useState(initialDate);

  const onDayPress = (day: string) => {
    setSelectedDate(day);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewCalenders}>
        <View style={styles.viewHeader}>
          <TextApp preset="text18"> Lịch </TextApp>
        </View>
        <Calendar
          locale={"vn"}
          initialDate={initialDate}
          markingType={"custom"}
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
            textDayHeaderFontSize: 12,
          }}
        />
      </View>
    </SafeAreaView>
  );
};
