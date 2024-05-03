import React from "react";
import { StyleSheet, View } from "react-native";
import TextApp from "../textApp";
import { NOTIFICATION_TYPE } from "@/utils/enum";
import { HomeSVG } from "@/asset";
import { scale } from "@/common/scale";
import { formatTime } from "@/utils/format-time";

type Props = {
  item: NotificationInterface;
};
export const ItemNotification = ({ item }: Props) => {
  const Icon: any = NOTIFICATION_TYPE.find(
    (element) => element.type === item?.type
  );

  return (
    <View key={item?.id} style={styles.container}>
      <Icon.icon />
      <View style={styles.viewInfor}>
        <TextApp numberOfLines={1} preset="text12">
          {item?.title}
        </TextApp>
        <View style={styles.viewTime}>
          <HomeSVG.TIME />
          <TextApp preset="text12Regular" style={{ marginLeft: scale(5) }}>
            {formatTime(item?.createdAt || "")}
          </TextApp>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(20),
  },
  viewInfor: {
    marginLeft: scale(10),
    flex: 1,
  },
  viewTime: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(5),
  },
});
