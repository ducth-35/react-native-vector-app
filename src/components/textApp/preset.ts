import { scale } from "../../common/scale";
import { StyleSheet } from "react-native";
import { FontFamily } from "../../common/constant";

export const textPresets = StyleSheet.create({
  default: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: scale(14),
    fontWeight: "400",
  },
  headerTxt: {
    fontFamily: FontFamily.poppins_bold,
    fontSize: scale(14),
    fontWeight: "700",
  },
  textWhite: {
    fontFamily: FontFamily.poppins_semibold,
    fontSize: scale(14),
    color: "#fff",
  },
  headerHome: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: scale(18),
    fontWeight: "400",
    color: "#1f1f39",
  },
  text18: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: scale(18),
    fontWeight: "400",
    color: "#1f1f39",
  },
  text14: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: scale(14),
    fontWeight: "400",
    color: "#1f1f39",
  },
  text12: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: scale(12),
    fontWeight: "400",
    color: "#1f1f39",
  },
  text10: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: scale(10),
    fontWeight: "400",
    color: "#1f1f39",
  },
  text20: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: scale(20),
    fontWeight: "400",
    color: "#1f1f39",
  },
  text20Blue: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: scale(20),
    fontWeight: "400",
    color: "#3d5cff",
  },
  text16: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: scale(16),
    fontWeight: "400",
    color: "#1f1f39",
  },
});

export type TextPresetNames = keyof typeof textPresets;
