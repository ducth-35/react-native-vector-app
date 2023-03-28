import React, { FC } from "react";
import { View } from "react-native";
import TextApp from "../../../components/textApp";
import { styles } from "./styles";

export const ResultScreen: FC = () => {
  return (
    <View style={styles.container}>
      <TextApp> Result screen </TextApp>
    </View>
  );
};
