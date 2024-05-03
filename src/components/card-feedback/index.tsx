import React from "react";
import { View, StyleSheet } from "react-native";
import TextApp from "../textApp";
import { SCREEN_WIDTH, scale } from "@/common/scale";
import { HomeSVG } from "@/asset";
import { formatNumber } from "@/utils/helper";
import { isNullOrEmpty } from "@/utils/method";
import FastImage from "react-native-fast-image";

type Props = {
  item: RatingResponseItem;
  index: number;
};

export const CardFeedBackItem = ({ item, index }: Props) => {
  return (
    <View
      style={[styles.container, { marginLeft: index === 0 ? scale(20) : 0 }]}
    >
      <View style={styles.viewRating}>
        <TextApp preset="text14Boldtomato">Dạy rất tốt</TextApp>
        <View style={styles.viewStar}>
          <HomeSVG.STAR />
          <TextApp preset="text12" style={{ marginLeft: scale(5) }}>
            {formatNumber(item.rating || 0)}
          </TextApp>
        </View>
      </View>
      <View style={{ marginTop: scale(5) }}>
        <TextApp preset="text14Medium" style={{ lineHeight: scale(28) }}>
          {item?.comment}
        </TextApp>
      </View>
      <View style={styles.viewInforFeedback}>
        <View>
          {isNullOrEmpty(item.avatar) ? (
            <HomeSVG.AVATAR_DEFAULT width={scale(40)} height={scale(40)} />
          ) : (
            <FastImage
              source={{ uri: item?.avatar }}
              style={styles.viewAvatar}
            />
          )}
        </View>
        <TextApp preset="text14Medium">{item.fullName}</TextApp>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginVertical: scale(20),
    borderRadius: scale(10),
    marginRight: scale(20),
    padding: scale(15),
    width: SCREEN_WIDTH / 1.2,
    shadowRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 10,
  },
  viewInforFeedback: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(10),
  },
  viewAvatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(10),
  },
  viewRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewStar: {
    flexDirection: "row",
    alignItems: "center",
  },
});
