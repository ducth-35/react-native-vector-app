import { HomeSVG } from "@/asset";
import { ImageAsset } from "@/asset/image";
import { scale } from "@/common/scale";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import TextApp from "../textApp";
import { HIT_SLOP } from "@/utils/helper";
import { useSelector } from "react-redux";
import { userInforSelector } from "@/store/auth/authSelector";
import { isNullOrEmpty } from "@/utils/method";

type Props = {
  isAvatar?: boolean;
  onPress?: () => void;
  source?: any;
};

export const AvatarAccount = ({ isAvatar, onPress, source }: Props) => {
  return (
    <View style={styles.body}>
      {isAvatar ? (
        <TouchableOpacity style={styles.viewAvatar} onPress={onPress}>
          {!isNullOrEmpty(source) ? (
            <FastImage source={{ uri: source }} style={styles.avatar} />
          ) : (
            <HomeSVG.AVATAR_DEFAULT width={68} height={68} />
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.viewNoAvatar}>
          {!isNullOrEmpty(source) ? (
            <FastImage source={{ uri: source }} style={styles.noAvatar} />
          ) : (
            <HomeSVG.AVATAR_DEFAULT width={68} height={68} />
          )}
          <TouchableOpacity
            style={styles.viewCamera}
            hitSlop={HIT_SLOP}
            onPress={onPress}
          >
            <HomeSVG.CAMERA />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewNoAvatar: {
    width: scale(64),
    height: scale(64),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(50),
  },
  noAvatar: {
    width: scale(64),
    height: scale(64),
    borderRadius: scale(50),
  },
  viewCamera: {
    position: "absolute",
    top: 1,
    right: 0,
  },

  viewAvatar: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(100),
    height: scale(100),
    backgroundColor: "#d9dfff",
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: "#fff",
  },
  avatar: {
    width: scale(68),
    height: scale(68),
    borderRadius: scale(12),
  },
});
