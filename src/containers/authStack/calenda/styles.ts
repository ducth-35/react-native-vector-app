import { Platform, StyleSheet } from "react-native";
import { SCREEN_HEIGHT, scale } from "../../../common/scale";
import { FontFamily } from "@/common/constant";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewHeader: {
    justifyContent: "center",
    // marginTop: Platform.OS === "ios" ? scale(40) : 0,
  },
  viewCalenders: {
  },
  eventDayContainer: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  calendarWrapper: {
    // backgroundColor: "red", // Set the background color to blue
    borderBottompLeftRadius: 16, // Apply custom border radius
    borderBottompRightRadius: 16, // Apply custom border radius
    overflow: "hidden", // Clip the content within the border radius
    // elevation: 0, // Remove the shadow effect
  },
  dayTextDisable: {
    fontSize: 14,
    color: "#f4f3fd",
    fontFamily: FontFamily.SFUIText_medium,
  },
  dayText: {
    fontFamily: FontFamily.SFUIText_medium,
    fontSize: 14,
    color: "#000",
  },
  textToday: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
    fontFamily: FontFamily.SFUIText_bold,
  },
  dayMarkText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
    fontFamily: FontFamily.SFUIText_bold,
  },
  dayMarkContainer: {
    width: scale(32),
    height: scale(32),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#f4f3fd",
  },
  dayContainer: {
    width: scale(32),
    height: scale(32),
    justifyContent: "center",
    alignItems: "center",
  },
  todayContainer: {
    width: scale(32),
    height: scale(32),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#4d6eff",
  },
  today: {
    fontSize: 14,
    color: "#4d6eff",
    fontWeight: "600",
    fontFamily: FontFamily.SFUIText_bold,
  },
});
