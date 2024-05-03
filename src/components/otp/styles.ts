import { SCREEN_WIDTH, scale } from "@/common/scale";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  otpView: {
    width: (SCREEN_WIDTH - scale(100)) / 6,
    height: (SCREEN_WIDTH - scale(100)) / 6,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: scale(1.5),
    borderBottomColor: "#d7d7d7",
  },
  otpViewActive: {
    borderBottomColor: "#f24024",
  },
  otpText: {
    fontSize: 26,
    color: "#333333",
    textAlignVertical: "bottom",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    position: "absolute",
    textAlign: "center",
    height: (SCREEN_WIDTH - scale(100)) / 6,
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    color: "transparent",
    opacity: 0,
  },
});
