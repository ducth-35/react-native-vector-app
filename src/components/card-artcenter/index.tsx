import React from "react";
import { StyleSheet, View } from "react-native";
import TextApp from "../textApp";
import FastImage from "react-native-fast-image";
import { scale } from "../../common/scale";
import { HomeSVG } from "../../assets";
import { ArtCenterInterface } from "../../types/artCenter";

type Props = {
  item: ArtCenterInterface;
};

export const CardArtCenter = (props: Props) => {
  const { item } = props;
  return (
    <View style={styles.container}>
      <FastImage source={item.image} style={styles.avatar} />
      <View style={styles.infor}>
        <TextApp preset="text12">{item.location}</TextApp>
        <TextApp preset="text14" style={{ marginVertical: scale(10) }}>
          {item.name}
        </TextApp>
        <View style={styles.viewSubjec}>
          {item.subject.map((it) => (
            <View key={it} style={styles.viewItemSubjec}>
              <TextApp preset="text10" style={{ color: "#ff6905" }}>
                {it}
              </TextApp>
            </View>
          ))}
          <View style={styles.viewStar}>
            <HomeSVG.STAR />
            <TextApp preset="text12">{item.star}</TextApp>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8ff",
    marginLeft: scale(20),
    marginTop: scale(10),
    borderRadius: scale(12),
  },
  avatar: {
    width: "100%",
    height: scale(130),
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
