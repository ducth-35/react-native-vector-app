import { scale } from "@/common/scale";
import TextApp from "@/components/textApp";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  item: {
    name: string;
    teacher: string;
    icon: JSX.Element;
    color: string;
  };
};

export const CardResult = ({ item }: Props) => {
  return (
    <View style={[styles.item, { backgroundColor: item.color }]}>
      <View>{item.icon}</View>
      <View style={styles.flex_1}>
        <TextApp preset="text14">{item.name}</TextApp>
        <TextApp preset="text14">Gia sư: {item.name}</TextApp>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    marginVertical: scale(5),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: scale(12),
    padding: scale(15),
  },
  flex_1: {
    flex: 1,
    marginLeft: scale(15),
  },
});
