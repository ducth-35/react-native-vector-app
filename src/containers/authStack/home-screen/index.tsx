import React, { FC } from "react";
import { View } from "react-native";
import TextApp from "../../../components/textApp";
import { styles } from "./styles";

export const HomeScreen: FC = () => {
  return (
    <View style={styles.container}>
      <TextApp> Home screen </TextApp>
    </View>
  );
};
