import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, scale } from "../common/scale";

export const style = StyleSheet.create({
  container: {
    marginBottom: scale(20),
  },
  title: {
    marginHorizontal: scale(20),
  },
  item: {
    width: SCREEN_WIDTH / 5.5,
    marginTop: scale(15),
    marginLeft: scale(10),
    alignItems: "center",
  },
  name: {
    marginTop: scale(5),
    textAlign: "center",
  },
  image: {
    width: scale(41),
    height: scale(41),
  },
});
