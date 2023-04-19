import { scale } from "@/common/scale";
import { CalendaFromParent } from "@/components/home-tutor/calenda-from-parent";
import { NextCalenda } from "@/components/home-tutor/next-calenda";
import { Header } from "@/components/home/header";
import { TotalIncome } from "@/components/total-income";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const HomeTutor = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header name={"Nguyễn Ánh"} />
      <ScrollView>
        <TotalIncome />
        <CalendaFromParent />
        <NextCalenda />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
