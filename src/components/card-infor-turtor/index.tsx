import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import TextApp from "../textApp";
import { scale } from "../../common/scale";
import { HomeSVG } from "@/asset";
import { isNullOrEmpty } from "@/utils/method";
import { HIT_SLOP } from "@/utils/helper";
import { FontFamily } from "@/common/constant";

type CardInforTutor = {
  lable?: string;
  description?: string | Array<string>;
  isStar?: boolean;
  point?: string;
  isRightLable?: boolean;
  rightLable?: JSX.Element;
  placeholder?: string;
  onPress?: () => void;
  isRightDescription?: boolean;
  rightDescription?: JSX.Element;
  colorDescription?: string;
};

export const CardInforTutor = ({
  lable,
  description,
  isStar,
  point,
  isRightLable,
  isRightDescription,
  rightDescription,
  rightLable,
  placeholder,
  colorDescription = "#f24024",
  onPress,
}: CardInforTutor) => {
  return (
    <Pressable hitSlop={HIT_SLOP} style={styles.container} onPress={onPress}>
      <View style={styles.viewScore}>
        <View style={styles.viewLable}>
          <View style={styles.lableStar}>
            <TextApp preset="text16">{lable}</TextApp>
            {isStar && (
              <View style={styles.viewStar}>
                <HomeSVG.STAR />
                <TextApp style={{ marginLeft: scale(3) }} preset="text16">
                  {point}
                </TextApp>
              </View>
            )}
          </View>
          {isRightLable && rightLable}
        </View>
      </View>
      {isNullOrEmpty(description) ? (
        <TextApp
          style={{
            marginTop: scale(5),
            color: colorDescription,
            fontFamily: FontFamily.SFUIText_regular,
            fontSize: 14,
          }}
        >
          {placeholder}
        </TextApp>
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextApp style={styles.newText}>{description}</TextApp>
          {isRightDescription && rightDescription}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scale(20),
  },
  newText: {
    color: "#858597",
    marginTop: scale(5),
  },
  viewScore: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewStar: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: scale(5),
  },
  viewLable: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lableStar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
