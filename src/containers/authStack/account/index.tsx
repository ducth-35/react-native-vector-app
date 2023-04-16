import React, { FC } from "react";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/header";

export const AccountScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Tài khoản" />
    </SafeAreaView>
  );
};
