import React from "react";
import { StyleSheet, View } from "react-native";
import TextApp from "../textApp";
import { scale } from "@/common/scale";

type Props = {
  item: {
    name: string;
    student: string;
    time: string;
    color: string;
  };
};

export const ItemNextCalenda = ({ item }: Props) => {
  return (
    <View style={[styles.container, { backgroundColor: item.color }]}>
      <TextApp>
        {item.name} - {item.student}
      </TextApp>
      <TextApp preset="text14Normal" style={{ marginTop: scale(5) }}>
        {item.time}
      </TextApp>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: scale(15),
    marginRight: scale(10),
    borderRadius: scale(12),
    padding: scale(15),
  },
});
