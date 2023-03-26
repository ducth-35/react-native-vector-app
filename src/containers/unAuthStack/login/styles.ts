import { StyleSheet } from "react-native";
import { scale } from "../../../common/scale";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: scale(30),
  },
  viewFooter: {
    position: "absolute",
    bottom: scale(40),
    left: scale(10),
    right: scale(10),
  },
  textFooter: {
    textAlign: "center",
  },
  google: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "gray",
  },
  textGoogle: {
    color: "#000",
  },
  facabook: {
    marginBottom: scale(10),
    backgroundColor: "#4267B2",
  },
  viewOrther: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: scale(30),
  },
  textOrther: {
    marginHorizontal: scale(10),
  },
  line: {
    flex: 1,
    width: "100%",
    height: 1,
    backgroundColor: "gray",
  },
  phoneNumber: {
    marginTop: scale(40),
  },
});
