import { scale } from "../../common/scale";
import { StyleSheet } from "react-native";

export const ButtonPresets = StyleSheet.create({
  default: {
    backgroundColor: "#D64D47",
    minWidth: "100%",
    minHeight: scale(45),
    paddingHorizontal: scale(10),
  },
});

export type ButtonPresetsName = keyof typeof ButtonPresets;
