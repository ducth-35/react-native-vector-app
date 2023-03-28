import React, { FC } from "react";
import { View } from "react-native";
import TextApp from "../../../components/textApp";
import { styles } from "./styles";

export const AccountScreen: FC = () => {
  return (
    <View style={styles.container}>
      <TextApp> Account screen </TextApp>
    </View>
  );
};
