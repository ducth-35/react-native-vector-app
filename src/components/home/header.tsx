import React from "react";
import { StyleSheet, View } from "react-native";
import { scale } from "../../common/scale";
import { HomeSVG } from "../../assets/icon/home/home-svg";
import TextApp from "../textApp";

export const Header = () => {
  return (
    <View style={style.container}>
      <View style={style.viewname}>
        <HomeSVG.AVATAR_DEFAULT />
        <TextApp preset="headerHome" style={style.textName}>
          Hi, Phạm Thị Ngọc An
        </TextApp>
      </View>
      <View>
        <HomeSVG.BELL />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    marginTop: scale(10),
    marginHorizontal: scale(20),
    justifyContent: "space-between",
    flexDirection: "row",
  },
  viewname: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textName: {
    marginLeft: scale(15),
  },
});
