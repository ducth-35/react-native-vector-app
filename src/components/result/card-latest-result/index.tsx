import { HomeSVG } from "@/asset";
import { scale } from "@/common/scale";
import TextApp from "@/components/textApp";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  item: {
    name: string;
    subject: string;
    date: string;
  };
};

export const CardLatestResult = ({ item }: Props) => {
  return (
    <View style={[styles.item]}>
      <View style={{ flex: 1 }}>
        <TextApp preset="text14">
          {item.name} - Môn {item.subject}
        </TextApp>
        <TextApp preset="text14Normal">{item.date}</TextApp>
      </View>
      <HomeSVG.NEXT />
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    marginVertical: scale(5),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
