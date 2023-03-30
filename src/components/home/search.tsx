import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { scale } from "../../common/scale";

export const Search = () => {
  return (
    <View style={style.container}>
      <TextInput placeholder="Tìm gia sư, lớp năng khiếu..." />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    margin: scale(20),
    padding: scale(15),
    backgroundColor: "#f4f3fd",
    borderRadius: scale(12),
  },
});
