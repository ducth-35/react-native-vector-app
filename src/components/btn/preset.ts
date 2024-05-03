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
  disabled: {
    backgroundColor: "#a1a1a1", // A different color for the disabled state
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
  normal: {
    backgroundColor: "#fff",
    minWidth: "100%",
    minHeight: scale(45),
    borderColor: "#3d5cff",
    borderWidth: 1,
    paddingHorizontal: scale(10),
    borderRadius: 12,
  },
});

export type ButtonPresetsName = keyof typeof ButtonPresets;
