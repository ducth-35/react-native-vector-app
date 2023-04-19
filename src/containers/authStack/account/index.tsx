import React, { FC } from "react";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/header";
import TextApp from "@/components/textApp";
import { View } from "react-native";
import { TutorOptions } from "./tutor-options";

export const AccountScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Tài khoản"
        isRightIcon
        rightIcon={<TextApp preset="text16Blue">Sửa</TextApp>}
      />
      <View style={styles.body}>
        <TutorOptions />
      </View>
    </SafeAreaView>
  );
};
