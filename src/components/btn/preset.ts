import { scale } from "../../common/scale";
import { StyleSheet } from "react-native";

export const ButtonPresets = StyleSheet.create({
  default: {
    backgroundColor: "#D64D47",
    minWidth: "100%",
    minHeight: scale(45),
    paddingHorizontal: scale(10),
  },
  blue: {
    backgroundColor: "#3d5cff",
    minWidth: "100%",
    minHeight: scale(45),
    paddingHorizontal: scale(10),
    borderRadius: 12
  },
});

export type ButtonPresetsName = keyof typeof ButtonPresets;
