import { scale } from "../../common/scale";
import { StyleSheet } from "react-native";
import { FontFamily } from "../../common/constant";

export const textPresets = StyleSheet.create({
  default: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: 14,
    fontWeight: "400",
  },
  headerTxt: {
    fontFamily: FontFamily.poppins_bold,
    fontSize: 14,
    fontWeight: "700",
  },
  textWhite: {
    fontFamily: FontFamily.poppins_semibold,
    fontSize: 14,
    color: "#fff",
  },
  text16White: {
    fontFamily: FontFamily.poppins_medium,
    fontSize: 16,
    color: "#fff",
  },
  headerHome: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: 18,
    fontWeight: "400",
    color: "#1f1f39",
  },
  text18: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: 18,
    fontWeight: "400",
    color: "#1f1f39",
  },
  text14: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: 14,
    fontWeight: "400",
    color: "#1f1f39",
  },
  text14Medium: {
    fontFamily: FontFamily.poppins_medium,
    fontSize: 14,
    fontWeight: "400",
    color: "#1f1f39",
  },
  text14Normal: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: 14,
    fontWeight: "400",
    color: "#b8b8d2",
  },
  text12: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: 12,
    fontWeight: "400",
    color: "#1f1f39",
  },
  text10: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: 10,
    fontWeight: "400",
    color: "#1f1f39",
  },
  text20: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: 20,
    fontWeight: "400",
    color: "#1f1f39",
  },
  text20Blue: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: 20,
    fontWeight: "400",
    color: "#3d5cff",
  },
  text16: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: 16,
    fontWeight: "400",
    color: "#1f1f39",
  },
  text18BlueBold: {
    fontFamily: FontFamily.poppins_bold,
    fontSize: 18,
    fontWeight: "700",
    color: "#3d5cff",
  },
  text14NormalBlue: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: 14,
    fontWeight: "400",
    color: "#3d5cff",
  },
  text12NormalBlue: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: 12,
    fontWeight: "400",
    color: "#3d5cff",
  },
});

export type TextPresetNames = keyof typeof textPresets;
