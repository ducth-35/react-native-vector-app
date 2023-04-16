import React from "react";
import { StyleSheet, View } from "react-native";
import { scale } from "../../common/scale";
import { HomeSVG } from "../../asset/icon/home/home-svg";
import TextApp from "../textApp";

type Props = {
  name?: string;
};

export const Header = ({ name }: Props) => {
  return (
    <View style={style.container}>
      <View style={style.viewname}>
        <HomeSVG.AVATAR_DEFAULT />
        <TextApp preset="headerHome" style={style.textName}>
          Hi, {name}
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
