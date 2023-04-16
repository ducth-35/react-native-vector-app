import React from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import TextApp from "../textApp";
import { SCREEN_WIDTH, scale } from "@/common/scale";
import { ItemNextCalenda } from "./item-next-calenda";
import { FontFamily } from "@/common/constant";

const data = [
  {
    id: 1,
    name: "Dạy toán",
    student: "Mỹ An",
    time: "18:30 PM - 19:30 PM",
    color: "#daf6f4",
  },
  {
    id: 2,
    name: "Dạy toán",
    student: "Mỹ An",
    time: "18:30 PM - 19:30 PM",
    color: "#fdf1db",
  },
  {
    id: 3,
    name: "Dạy toán",
    student: "Mỹ An",
    time: "18:30 PM - 19:30 PM",
    color: "#daf6f4",
  },
  {
    id: 4,
    name: "Dạy toán",
    student: "Mỹ An",
    time: "18:30 PM - 19:30 PM",
    color: "#fdf1db",
  },
];

const DAYS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

const renderItem = ({ item }: any) => {
  return <ItemNextCalenda item={item} />;
};

const renderListEmpty = () => {
  return (
    <View style={styles.viewEmpty}>
      <View>
        <TextApp preset="text14Normal">Bạn chưa có lịch dạy</TextApp>
        <View style={styles.line} />
        <TextApp preset="text14Normal">Thêm lịch cá nhân của bạn</TextApp>
      </View>
      <TouchableOpacity style={styles.btn}>
        <TextApp preset="text16White">Thêm lịch</TextApp>
      </TouchableOpacity>
    </View>
  );
};

const renderDay = (day: any, index: any) => {
  const today = new Date().getDate();
  const isToday = today === today + index;
  return (
    <View key={index} style={styles.viewCalendar}>
      <TextApp style={[styles.dayText]}>{day}</TextApp>
      <View style={[styles.marginTop, isToday && styles.today]}>
        <TextApp style={[styles.dateText, isToday && styles.textToday]}>
          {today + index}
        </TextApp>
      </View>
    </View>
  );
};

export const NextCalenda = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextApp>Lịch sắp tới</TextApp>
        <Pressable>
          <TextApp preset="text14NormalBlue">Chi tiết</TextApp>
        </Pressable>
      </View>
      <View style={styles.listBooking}>
        <View style={styles.calendar}>
          {DAYS.map((day, index) => renderDay(day, index))}
        </View>
        <FlatList
          data={[]}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
          ListEmptyComponent={renderListEmpty}
          contentContainerStyle={{
            marginRight: scale(10),
            paddingLeft: scale(10),
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: scale(30),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listBooking: {
    backgroundColor: "#fff",
    shadowRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 10, // thay đổi giá trị height để chỉ đổ bóng ở cạnh dưới
    },
    elevation: 3,
    borderRadius: scale(10),
    marginTop: scale(10),
  },
  viewCalendar: { justifyContent: "center", alignItems: "center" },
  calendar: {
    backgroundColor: "#f4f3fd",
    borderRadius: scale(10),
    padding: scale(20),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewEmpty: {
    width: SCREEN_WIDTH - 85,
    margin: scale(20),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    height: 2,
    width: scale(30),
    backgroundColor: "#3d5cff",
    marginVertical: scale(5),
  },
  btn: {
    backgroundColor: "#3d5cff",
    borderRadius: scale(5),
    padding: scale(10),
  },
  dayText: {
    fontSize: 16,
    color: "#818597",
    fontFamily: FontFamily.poppins_bold,
    fontWeight: "600",
  },
  dateText: {
    fontSize: 15,
    fontFamily: FontFamily.poppins_medium,
  },
  today: {
    backgroundColor: "#3d5cff",
    alignItems: "center",
    justifyContent: "center",
    width: scale(30),
    height: scale(30),
    borderRadius: scale(12),
  },
  textToday: {
    color: "#fff",
    fontFamily: FontFamily.poppins_bold,
    fontWeight: "600",
  },
  marginTop: {
    marginTop: scale(15),
  },
});
