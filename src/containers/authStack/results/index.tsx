import React, { FC } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { Header } from "@/components/header";
import { SafeAreaView } from "react-native-safe-area-context";

export const ResultScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Kết quả học" />
    </SafeAreaView>
  );
};
