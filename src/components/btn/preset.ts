import { scale } from "../../common/scale";
import { StyleSheet } from "react-native";

export const ButtonPresets = StyleSheet.create({
  default: {
    backgroundColor: "#e83f3f",
    minWidth: "100%",
    minHeight: scale(45),
    paddingHorizontal: scale(10),
  },
  blue: {
    backgroundColor: "#3d5cff",
    minWidth: "100%",
    minHeight: scale(45),
    paddingHorizontal: scale(10),
    borderRadius: 12,
  },
  white: {
    backgroundColor: "#fff",
    minWidth: "100%",
    minHeight: scale(45),
    paddingHorizontal: scale(10),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3d5cff",
  },
});

export type ButtonPresetsName = keyof typeof ButtonPresets;
