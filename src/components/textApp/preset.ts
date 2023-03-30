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
});

export type TextPresetNames = keyof typeof textPresets;
