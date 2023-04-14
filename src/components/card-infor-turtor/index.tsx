import React from "react";
import { StyleSheet, View } from "react-native";
import TextApp from "../textApp";
import { scale } from "../../common/scale";

type CardInforTutor = {
  lable?: string;
  description?: any;
};

export const CardInforTutor = ({ lable, description }: CardInforTutor) => {
  return (
    <View style={styles.container}>
      <TextApp preset="text16">{lable}</TextApp>
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
    marginTop: scale(10),
  },
});
