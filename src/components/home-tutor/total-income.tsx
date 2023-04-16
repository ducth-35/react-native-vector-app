import React from "react";
import { StyleSheet, View } from "react-native";
import TextApp from "../textApp";
import { scale } from "@/common/scale";

export const TotalIncome = () => {
  return (
    <View style={styles.container}>
      <TextApp>Tổng thu nhập</TextApp>
      <TextApp preset="text18BlueBold">10.000.000 đ</TextApp>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f4f3fd",
    padding: scale(15),
    borderRadius: scale(15),
    margin: scale(20),
  },
});
