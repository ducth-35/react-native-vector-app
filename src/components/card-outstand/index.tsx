import React from "react";
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import TextApp from "../textApp";
import { OutStandInterface } from "../../types/outstand";
import FastImage from "react-native-fast-image";
import { scale } from "../../common/scale";
import { HomeSVG } from "../../assets";

type Props = {
  item: OutStandInterface;
  newStyle: ViewStyle;
};

export const CardOutStand = ({ item, newStyle }: Props) => {
  return (
    <View style={newStyle}>
      <View>
        <FastImage source={item.image} style={styles.avatar} />
        <View style={styles.viewStar}>
          <HomeSVG.STAR />
          <TextApp preset="text12" style={{ marginLeft: scale(5) }}>
            {item.star}
          </TextApp>
        </View>
      </View>
      <View style={styles.viewInfor}>
        <TextApp preset="text14">{item.name}</TextApp>
        <TextApp preset="text12" style={styles.school}>
          {item.school}
        </TextApp>
        <View style={styles.viewSubjec}>
          {item.subject.map((it) => (
            <View key={it} style={styles.viewItemSubjec}>
              <TextApp preset="text10" style={{ color: "#ff6905" }}>
                {it}
              </TextApp>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: scale(68),
    height: scale(68),
    borderRadius: scale(12),
  },
  viewSubjec: {
    flexDirection: "row",
  },
  viewItemSubjec: {
    backgroundColor: "#ffebf0",
    marginRight: scale(10),
    paddingVertical: scale(2),
    paddingHorizontal: scale(10),
    borderRadius: scale(5),
  },
  viewInfor: {
    marginLeft: scale(15),
  },
  school: {
    color: "#b8b8d2",
    marginVertical: scale(5),
  },
  viewStar: {
    backgroundColor: "#fff",
    position: "absolute",
    zIndex: 9,
    bottom: -scale(5),
    right: 12,
    left: 12,
    borderRadius: 8,
    width: scale(43),
    height: scale(20),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
