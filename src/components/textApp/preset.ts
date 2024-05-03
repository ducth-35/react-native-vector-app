import { scale } from "../../common/scale";
import { StyleSheet } from "react-native";
import { FontFamily } from "../../common/constant";

export const textPresets = StyleSheet.create({
  default: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 14,
    fontWeight: "400",
    color: "#000",
  },
  txt10: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 10,
    fontWeight: "400",
    color: "#fff",
  },
  headerTxt: {
    fontFamily: FontFamily.SFUIText_bold,
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  textWhite: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 14,
    color: "#fff",
  },
  headerHome: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 18,
    fontWeight: "500",
    color: "#1f1f39",
  },
  text14: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 14,
    fontWeight: "400",
    color: "#1f1f39",
  },
  text14Medium: {
    fontFamily: FontFamily.SFUIText_medium,
    fontSize: 14,
    fontWeight: "400",
    color: "#1f1f39",
  },
  text14Normal: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 14,
    fontWeight: "400",
    color: "#b8b8d2",
  },
  text12: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 12,
    fontWeight: "400",
    color: "#1f1f39",
  },
  text12Regular: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 12,
    fontWeight: "400",
    color: "#b8b8d2",
  },
  text10: {
    // fontFamily: FontFamily.SFUIText_medium,
    fontSize: 10,
    color: "#1f1f39",
  },
  text20: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 20,
    fontWeight: "400",
    color: "#1f1f39",
  },
  text20Blue: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 20,
    fontWeight: "400",
    color: "#3d5cff",
  },
  text16: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 16,
    fontWeight: "400",
    color: "#1f1f39",
  },
  text16White: {
    fontFamily: FontFamily.SFUIText_medium,
    fontSize: 16,
    color: "#fff",
  },
  text16Red: {
    fontFamily: FontFamily.SFUIText_medium,
    fontSize: 16,
    color: "#e83f3f",
  },
  text16Blue: {
    fontFamily: FontFamily.SFUIText_medium,
    fontSize: 16,
    color: "#3d5cff",
  },
  text16tealBlue: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 16,
    color: "#00a89d",
  },
  text14Blue: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 14,
    color: "#3d5cff",
  },
  text14BlueBold: {
    fontFamily: FontFamily.SFUIText_bold,
    fontSize: 14,
    color: "#3d5cff",
  },
  text14Bold: {
    fontFamily: FontFamily.SFUIText_semibold,
    fontSize: 14,
  },
  text14tealBlue: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 14,
    color: "#00a89d",
  },
  text14tomato: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 14,
    color: "#f24024",
  },
  text14_white: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 14,
    color: "#fff",
  },
  text14Boldtomato: {
    fontFamily: FontFamily.SFUIText_bold,
    fontSize: 14,
    color: "#f24024",
  },
  text15_regular: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 15,
    color: "#000",
  },
  text15_medium: {
    fontFamily: FontFamily.SFUIText_medium,
    fontSize: 15,
    color: "#000",
  },
  text15_bold: {
    fontFamily: FontFamily.SFUIText_bold,
    fontSize: 15,
    color: "#000",
  },
  text17: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 17,
    fontWeight: "400",
    color: "#1f1f39",
  },
  text17Blue: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 17,
    fontWeight: "400",
    color: "#3d5cff",
  },
  text18: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 18,
    fontWeight: "400",
    color: "#1f1f39",
  },
  text18_white: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 18,
    fontWeight: "400",
    color: "#fff",
  },
  text18BlueBold: {
    fontFamily: FontFamily.SFUIText_bold,
    fontSize: 18,
    fontWeight: "700",
    color: "#3d5cff",
  },
  text18BlackBold: {
    fontFamily: FontFamily.SFUIText_bold,
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  text18GreenkBold: {
    fontFamily: FontFamily.SFUIText_bold,
    fontSize: 18,
    fontWeight: "700",
    color: "#53b30b",
  },
  text18BlueNormal: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 18,
    fontWeight: "400",
    color: "#3d5cff",
  },
  text14NormalBlue: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 14,
    fontWeight: "400",
    color: "#3d5cff",
  },
  text12NormalBlue: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 12,
    fontWeight: "400",
    color: "#3d5cff",
  },
  text34BlueNormal: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 34,
    fontWeight: "400",
    color: "#000",
  },
});

export type TextPresetNames = keyof typeof textPresets;
