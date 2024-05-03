import { CalendaFromParent } from "@/components/home-tutor/calenda-from-parent";
import { NextCalenda } from "@/components/next-calendar";
import { Header } from "@/components/home/header";
import { TotalIncome } from "@/components/total-income";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authenStateSelector } from "@/store/auth/authSelector";
import { useSelector } from "react-redux";

export const HomeTutor = () => {
  const isSignIn = useSelector(authenStateSelector);
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        {isSignIn && (
          <TotalIncome />
        )}
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
