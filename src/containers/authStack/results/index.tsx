import React, { FC } from "react";
import { FlatList, SectionList, StyleSheet, View } from "react-native";
import { Header } from "@/components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import TextApp from "@/components/textApp";
import { CardResultOverview } from "@/components/result/card-result";
import { scale } from "@/common/scale";
import { CardLatestResult } from "@/components/result/card-latest-result";
import { useGetResultOverview, useGetResults } from "@/services/results";
import { Skeleton } from "../search/skeleton";

const renderItemResultOverview = (item: any) => {
  return <CardResultOverview item={item.item} />;
};

const renderHeaderResultOverview = ({ section: { title } }: any) => (
  <TextApp preset="text16" style={{ marginVertical: scale(10) }}>
    {title}
  </TextApp>
);

const renderItemResultLatest = (item: any) => {
  return <CardLatestResult item={item.item} />;
};

const renderHeaderLatestResult = () => {
  return (
    <TextApp preset="text18BlueNormal" style={{ marginBottom: scale(10) }}>
      Kết quả gần nhất
    </TextApp>
  );
};

export const ResultScreen: FC = () => {
  const { resultOverview, loading } = useGetResultOverview();
  const { results, loadingGetResult } = useGetResults({});

  const renderListFooter = () => {
    return (
      <View>
        <View style={styles.line} />
        <FlatList
          data={results}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItemResultLatest}
          keyExtractor={(item: any) => item.id}
          ListHeaderComponent={renderHeaderLatestResult}
        />
      </View>
    );
  };

  if (loading && loadingGetResult) {
    return <Skeleton />
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Kết quả học " />
      {resultOverview.length > 0 && (
        <SectionList
          sections={resultOverview}
          keyExtractor={(item: any, index: any) => item + index}
          renderItem={renderItemResultOverview}
          renderSectionHeader={renderHeaderResultOverview}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginHorizontal: scale(15),
            paddingBottom: scale(100),
          }}
          stickySectionHeadersEnabled={false}
          ListFooterComponent={renderListFooter}
        />
      )}

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#3d5cff",
    marginVertical: scale(20),
  },
});
