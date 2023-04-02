import React from "react";
import TextApp from "../textApp";
import { StyleSheet, View } from "react-native";
import { scale } from "../../common/scale";

export const Calenda = () => {
  return (
    <View style={style.container}>
      <View style={style.textHeader}>
        <TextApp preset="text18" style={style.title}>
          Lịch
        </TextApp>
        <TextApp preset="text14" style={[style.title, { color: "#3d5cff" }]}>
          Chi tiết
        </TextApp>
      </View>
      <View></View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: scale(20),
  },
  title: {
    marginHorizontal: scale(20),
  },
  textHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
