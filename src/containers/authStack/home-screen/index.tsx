import React, { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "../../../components/home/search";
import { Header } from "../../../components/home/header";
import { styles } from "./styles";
import { Subject } from "../../../components/home/subject";

export const HomeScreen: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Search />
      <Subject />
    </SafeAreaView>
  );
};
