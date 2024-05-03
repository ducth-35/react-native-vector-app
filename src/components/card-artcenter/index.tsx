import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import TextApp from "../textApp";
import FastImage from "react-native-fast-image";
import { scale } from "../../common/scale";
import { HomeSVG } from "../../asset";
import { ImageAsset } from "@/asset/image";

type Props = {
  item: CenterInterface;
  newStyle: ViewStyle;
};

export const CardArtCenter = ({ item, newStyle }: Props) => {
  return (
    <View style={newStyle}>
      <FastImage source={ImageAsset.banner} style={styles.avatar} />
      <View style={styles.infor}>
        <TextApp preset="text12">{item.location}</TextApp>
        <TextApp preset="text14" style={{ marginVertical: scale(10) }}>
          {item.name}
        </TextApp>
        <View style={styles.viewSubjec}>
          {item?.subjects?.map((it) => (
            <View key={it.id} style={styles.viewItemSubjec}>
              <TextApp preset="text10" style={{ color: "#ff6905" }}>
                {it.name}
              </TextApp>
            </View>
          ))}
          <View style={styles.viewStar}>
            <HomeSVG.STAR />
            <TextApp preset="text12" style={{ marginLeft: scale(5) }}>
              {item.rating}
            </TextApp>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  avatar: {
    width: "100%",
    height: scale(130),
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
  },
  viewStar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  infor: {
    paddingVertical: scale(15),
    marginHorizontal: scale(10),
  },
});
