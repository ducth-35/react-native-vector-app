import { FontFamily } from "@/common/constant";
import { scale } from "@/common/scale";
import { formatDate } from "@/utils/locales";
import {
  addDays,
  format,
  getDate,
  isSameDay,
  parseISO,
  startOfWeek,
} from "date-fns";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  date: string;
  onChange: (value: string) => void;
  markedDates?: string[] | undefined;
};

const WeekCalendar: React.FC<Props> = ({ date, onChange, markedDates }) => {
  const [week, setWeek] = useState<WeekDay[]>([]);

  useEffect(() => {
    const weekDays = getWeekDays(date).map((weekDay) => {
      const isMarked = markedDates?.includes(
        moment(weekDay.date).format("YYYY-MM-DD")
      );
      return { ...weekDay, isMarked };
    });
    setWeek(weekDays);
  }, [date, markedDates]);

  return (
    <View style={styles.container}>
      {week.map((weekDay) => {
        const sameDay = isSameDay(weekDay.date, new Date(date));
        return (
          <View style={styles.weekDayItem} key={weekDay.formatted}>
            <Text style={styles.weekDayText}>{weekDay.formatted}</Text>
            <View style={{ marginTop: scale(10) }}>
              <TouchableOpacity
                onPress={() => onChange(weekDay.date.toISOString())}
                style={[
                  weekDay.isMarked ? styles.marked : styles.touchable,
                  sameDay && styles.selectedTouchable,
                ]}
              >
                <Text
                  style={[
                    weekDay.isMarked ? styles.textMaked : styles.label,
                    sameDay && styles.selectedLabel,
                  ]}
                >
                  {weekDay.day}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  weekDayText: {
    color: "gray",
    marginBottom: 5,
    fontFamily: FontFamily.SFUIText_medium,
  },
  label: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
    fontFamily: FontFamily.SFUIText_medium,
  },
  selectedLabel: {
    color: "white",
    fontFamily: FontFamily.SFUIText_medium,
  },
  touchable: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: scale(30),
    width: scale(30),
  },
  selectedTouchable: {
    backgroundColor: "#4d6eff",
  },
  weekDayItem: {
    alignItems: "center",
  },
  marked: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: scale(30),
    width: scale(30),
    backgroundColor: "#f4f3fd",
  },
  textMaked: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    fontFamily: FontFamily.SFUIText_medium,
    
  },
});

type WeekDay = {
  formatted: string;
  date: Date;
  day: number;
  isMarked?: boolean;
};

export const getWeekDays = (dateString: string): WeekDay[] => {
  const date = parseISO(dateString);
  const start = startOfWeek(date, { weekStartsOn: 1 });

  const final = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(start, i);
    final.push({
      formatted: formatDate(format(currentDate, "EEE")),
      date: currentDate,
      day: getDate(currentDate),
    });
  }

  return final;
};

export default WeekCalendar;
