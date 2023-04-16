import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import TextApp from "../textApp";
import { scale } from "@/common/scale";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";

type Props = {
  isAll?: boolean;
  item: {
    color: string;
    icon: JSX.Element;
    name: string;
    last_ago: string;
    time: string;
    student?: string;
    class?: number;
  };
};
export const ItemCalendaFromParent = ({ item, isAll }: Props) => {
  const handleCalendaDetails = () => {
    navigate(APP_SCREEN.BOOKING_INFOR_TUTOR_SCREEN);
  };
  return (
    <Pressable
      style={[styles.item, { backgroundColor: item.color }]}
      onPress={handleCalendaDetails}
    >
      {item.icon}
      <View style={{ marginLeft: scale(15), flex: 1 }}>
        <View style={styles.name}>
          <TextApp preset="text14Medium">{item.name}</TextApp>
          {isAll && <TextApp preset="text12NormalBlue">Chưa nhận lịch</TextApp>}
        </View>
        <TextApp preset="text12" style={{ marginVertical: scale(5) }}>
          {item.last_ago}
        </TextApp>
        <TextApp preset="text14">{item.time}</TextApp>
        {isAll && (
          <TextApp preset="text14" style={{ marginTop: scale(5) }}>
            {item.student} - Lớp {item.class}
          </TextApp>
        )}
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: scale(15),
    borderRadius: scale(12),
  },
  name: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
