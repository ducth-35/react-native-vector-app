import React from "react";
import { StyleSheet, View } from "react-native";
import TextApp from "../textApp";
import { scale } from "../../common/scale";
import { HomeSVG } from "@/asset";

type CardInforTutor = {
  lable?: string;
  description?: string;
  isStar?: boolean;
  point?: string;
};

export const CardInforTutor = ({
  lable,
  description,
  isStar,
  point,
}: CardInforTutor) => {
  return (
    <View style={styles.container}>
      <View style={styles.viewScore}>
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
      <TextApp preset="text14" style={styles.newText}>
        {description}
      </TextApp>
    </View>
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
});
