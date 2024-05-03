import { HomeSVG } from "@/asset";
import { scale } from "@/common/scale";
import { CardOutStand } from "@/components/card-outstand";
import { Header } from "@/components/header";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { useGetTutorSuggestion } from "@/services/home";
import React from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Skeleton } from "./skeleton";

export const OutstandingTutor = () => {
  const { state } = useGetTutorSuggestion();

  const renderItem: ListRenderItem<TutorSuggestionInterface> = ({ item }) => {
    const handlePressItem = () => {
      navigate(APP_SCREEN.TUTOR_DETAIL_SCREEN, { id: item?.id });
    };
    return (
      <CardOutStand
        item={item}
        newStyle={styles.viewCardOutStand}
        onPress={handlePressItem}
      />
    );
  };

  if (state?.loading) {
    return <Skeleton />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header canBack title="Gia sư nổi bật" backIcon={<HomeSVG.BACK />} />
      <FlatList
        style={{ flex: 1 }}
        data={state?.data}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={{ paddingBottom: scale(50) }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  viewCardOutStand: {
    backgroundColor: "#f8f8ff",
    flexDirection: "row",
    padding: scale(10),
    marginTop: scale(15),
    borderRadius: scale(12),
    marginHorizontal: scale(20),
  },
});
