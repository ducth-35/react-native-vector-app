import { HomeSVG } from "@/asset";
import { Header } from "@/components/header";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ClassDetailsParent = () => {
  return (
    <SafeAreaView style={style.container}>
      <Header title="Chi tiết lớp học" canBack backIcon={<HomeSVG.BACK />} />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
