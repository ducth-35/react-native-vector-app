import React, { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/header";
import { StyleSheet } from "react-native";

export const IncomeScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Thu nhập" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
