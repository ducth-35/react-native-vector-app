import { StyleSheet } from "react-native";
import { FontFamily } from "../../../common/constant";
import { scale } from "../../../common/scale";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewHeader: {
    marginTop: scale(50),
    marginHorizontal: scale(30),
  },
  textHeader1: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: 34,
    marginBottom: scale(10),
  },
  viewInput: {
    borderColor: "#B8B8D2",
    borderWidth: 1,
    padding: scale(15),
    borderRadius: 5,
  },
  viewInputName: {
    marginTop: scale(20),
    marginHorizontal: scale(30),
  },
  inputName: {
    color: "#1f1f39",
  },
  textLableName: {
    color: "#858597",
    marginBottom: scale(10),
  },
  viewSeclectAccount: {
    marginTop: scale(20),
    marginHorizontal: scale(30),
  },
  viewDone: {
    position: "absolute",
    bottom: scale(100),
    left: scale(30),
    right: scale(30),
  },
  selectedAccount: {
    backgroundColor: "#3d5cff",
  },
  selectAccount: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(20),
    padding: scale(15),
    backgroundColor: "#f4f3fd",
    borderRadius: 5,
  },
  textselectAccount: {
    color: "#858597",
  },
  textselectedAccount: {
    color: "#fff",
  },
  viewDot: {
    width: scale(20),
    height: scale(20),
    borderWidth: 1,
    borderColor: "#858597",
    borderRadius: 30,
    marginRight: scale(10),
  },
  viewDotSlected: {
    borderWidth: 5,
    borderColor: "#fff",
  },
});
