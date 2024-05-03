import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import TextApp from "../textApp";
import FastImage from "react-native-fast-image";
import { scale } from "../../common/scale";
import { HomeSVG } from "../../asset";
import { ImageAsset } from "@/asset/image";
import { formatNumber } from "@/utils/helper";
import { isNullOrEmpty } from "@/utils/method";

type Props = {
  item?: TutorSuggestionInterface;
  newStyle?: ViewStyle;
  onPress?: () => void;
};

export const CardOutStand = ({ item, newStyle, onPress }: Props) => {
  return (
    <TouchableOpacity style={newStyle} onPress={onPress}>
      <View style={styles.card}>
        {isNullOrEmpty(item?.avatar) ? (
          <HomeSVG.AVATAR_DEFAULT width={scale(52)} height={scale(52)} />
        ) : (
          <FastImage source={{ uri: item?.avatar }} style={styles.avatar} />
        )}
      </View>
      <View style={styles.viewInfor}>
        <TextApp preset="text14">{item?.fullName}</TextApp>
        <TextApp preset="text12" style={styles.school}>
          {item?.school}
        </TextApp>
        <View style={styles.viewSubjec}>
          {item?.subject.map((it, index) => (
            <View key={index} style={styles.viewItemSubjec}>
              <TextApp preset="text10" style={{ color: "#ff6905" }}>
                {it.gradeName}
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
    marginTop: scale(5),
  },
  viewItemSubjec: {
    backgroundColor: "#ffebf0",
    marginRight: scale(10),
    paddingVertical: scale(2),
    paddingHorizontal: scale(10),
    marginBottom: scale(10),
    borderRadius: scale(5),
  },
  viewInfor: {
    flex: 1,
    marginHorizontal: scale(15),
  },
  school: {
    color: "#b8b8d2",
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
