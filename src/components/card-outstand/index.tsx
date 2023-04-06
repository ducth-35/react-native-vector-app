import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import TextApp from "../textApp";
import { OutStandInterface } from "../../types/outstand";
import FastImage from "react-native-fast-image";
import { scale } from "../../common/scale";
import { HomeSVG } from "../../asset";

type Props = {
  item: OutStandInterface;
  newStyle: ViewStyle;
  onPress: () => void;
};

export const CardOutStand = ({ item, newStyle, onPress }: Props) => {
  return (
    <TouchableOpacity style={newStyle} onPress={onPress}>
      <View style={styles.card}>
        <FastImage source={item.image} style={styles.avatar}>
          <View style={styles.viewStar}>
            <HomeSVG.STAR />
            <TextApp preset="text12" style={{ marginLeft: scale(5) }}>
              {item.star}
            </TextApp>
          </View>
        </FastImage>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "relative",
    overflow: "hidden",
  },
  avatar: {
    width: scale(68),
    height: scale(68),
    borderRadius: scale(12),
  },
  viewSubjec: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  viewItemSubjec: {
    backgroundColor: "#ffebf0",
    marginRight: scale(10),
    paddingVertical: scale(2),
    paddingHorizontal: scale(10),
    borderRadius: scale(5),
    marginBottom: scale(10),
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
    left: 10,
    right: 10,
    bottom: 0,
    borderRadius: 8,
    paddingHorizontal: scale(10),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
