import { HomeSVG } from "@/asset";
import { scale } from "@/common/scale";
import TextApp from "@/components/textApp";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  item: {
    name: string;
    subject: string;
    date: string;
  };
};

export const CardLatestResult = ({ item }: Props) => {
  const handleShowDetails = () => {
    navigate(APP_SCREEN.RESULT_LATEST_SCREEN);
  };
  return (
    <TouchableOpacity style={[styles.item]} onPress={handleShowDetails}>
      <View style={{ flex: 1 }}>
        <TextApp preset="text14">
          {item.name} - Môn {item.subject}
        </TextApp>
        <TextApp preset="text14Normal">{item.date}</TextApp>
      </View>
      <HomeSVG.NEXT />
    </TouchableOpacity>
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
