import { scale } from "@/common/scale";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  markElement: {
    width: "100%",
    flexDirection: "row",
    height: "100%",
  },
  linear: {
    width: "100%",
    height: "100%",
  },
  wrapChildren: {
    flex: 1,
    backgroundColor: "transparent",
  },
  containerLineText: {
    justifyContent: "center",
    flexDirection: "row",
  },
  lineText: {
    width: scale(30),
    height: 3,
    backgroundColor: "red",
  },
  space: {
    width: "5%",
    height: 8,
  },
  wordView: {
    flexDirection: "row",
  },
  practiceDescribe: {
    marginLeft: 30,
  },
  container: {
    minHeight: 70,
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 25,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageOverlay: {
    width: "100%",
    height: 170,
    borderRadius: 4,
    color: "black",
  },
  avatarOverlay: {
    width: 40,
    height: 40,
    borderRadius: 4,
    color: "black",
  },
  practiceContainer: {
    flexDirection: "row",
    marginVertical: scale(6),
    alignItems: "center",
  },
  imageView: {
    backgroundColor: "red",
    width: 60,
    height: 60,
    borderRadius: 10,
  },
});
