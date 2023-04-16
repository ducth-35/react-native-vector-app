import React, { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "../../../components/home/search";
import { Header } from "../../../components/home/header";
import { styles } from "./styles";
import { Subject } from "../../../components/home/subject";
import { OutstandTutor } from "../../../components/home/oustand-tutor";
import { ArtCenter } from "../../../components/home/art-center";
import { ScrollView, View } from "react-native";
import { scale } from "../../../common/scale";
import { navigate } from "../../../navigators/navigation-services";
import { APP_SCREEN } from "../../../navigators/screen-type";
import { HomeSVG } from "@/asset";
import { NextCalenda } from "@/components/home-tutor/next-calenda";

export const HomeScreen: FC = () => {
  const handleSearch = () => {
    navigate(APP_SCREEN.SEARCH_SCREEN);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header name={"Phạm Ngọc An"} />
      <View style={styles.search}>
        <Search
          onPressIn={handleSearch}
          editable={false}
          leftIcon={<HomeSVG.SEARCH />}
          rightIcon={<HomeSVG.FILTER />}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scale(200) }}
      >
        <Subject />
        <NextCalenda />
        <OutstandTutor />
        <ArtCenter />
      </ScrollView>
    </SafeAreaView>
  );
};
