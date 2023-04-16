import { StyleSheet } from "react-native";
import { SCREEN_HEIGHT, scale } from "../../../common/scale";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(50),
  },
  viewCalenders: {
    backgroundColor: "#fff",
    height: SCREEN_HEIGHT / 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    shadowRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },
});
