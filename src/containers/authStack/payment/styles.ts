import { FontFamily } from "@/common/constant";
import { scale } from "@/common/scale";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textPice: {
    color: "#3d5cff",
    fontFamily: FontFamily.poppins_bold,
    fontSize: 18,
    fontWeight: "700",
  },
});
