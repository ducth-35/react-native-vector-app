import React, { FC } from "react";
import { View } from "react-native";
import TextApp from "../../../components/textApp";
import { styles } from "./styles";

export const PaymentScreen: FC = () => {
  return (
    <View style={styles.container}>
      <TextApp> Payment screen </TextApp>
    </View>
  );
};
