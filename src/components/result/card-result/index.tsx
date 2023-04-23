import { scale } from "@/common/scale";
import TextApp from "@/components/textApp";
// import { navigate } from "@/navigators/navigation-services";
// import { APP_SCREEN } from "@/navigators/screen-type";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  item: {
    name: string;
    teacher: string;
    icon: JSX.Element;
    color: string;
  };
};

export const CardResult = ({ item }: Props) => {
  const handleShowDetails = () => {};
  return (
    <Pressable
      style={[styles.item, { backgroundColor: item.color }]}
      onPress={handleShowDetails}
    >
      <View>{item.icon}</View>
      <View style={styles.contentContainer}>
        <TextApp preset="text14">{item.name}</TextApp>
        <TextApp preset="text14">Gia sư: {item.teacher}</TextApp>
      </View>
    </Pressable>
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
  contentContainer: {
    flex: 1,
    marginLeft: scale(20),
  },
});
