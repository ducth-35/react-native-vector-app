import { HomeSVG } from "@/asset";
import { scale } from "@/common/scale";
import TextApp from "@/components/textApp";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  item: {
    id: number;
    day: string;
  };
};

export const CardLatestResultDetails = ({ item }: Props) => {
  const handleShowDetails = () => {
    navigate(APP_SCREEN.LEARNING_OUTCOMES_SCREEN, { id: item.id });
  };
  return (
    <TouchableOpacity
      key={item.id + "result"}
      style={[styles.item]}
      onPress={handleShowDetails}
    >
      <TextApp preset="text14">Buổi học ngày - {item.day}</TextApp>
      <HomeSVG.NEXT />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  item: {
    marginVertical: scale(15),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
