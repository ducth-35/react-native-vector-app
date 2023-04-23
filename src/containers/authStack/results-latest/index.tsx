import { HomeSVG } from "@/asset";
import { scale } from "@/common/scale";
import { Header } from "@/components/header";
import { CardLatestResultDetails } from "@/components/result/card-latest-result-details";
import TextApp from "@/components/textApp";
import { useGetResultLatestDetails } from "@/services/parents";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadingView } from "@/components/loading-view";
import { ChartKit } from "@/components/chart";

const LATEST_RESULT_DETAILS = [
  { name: "Trần Ngọc An", subject: "Toán", date: "8/4/2023" },
  { name: "Trần Phương Linh", subject: "Toán", date: "8/4/2023" },
  { name: "Trần Ngọc Anh", subject: "Toán", date: "8/4/2023" },
];

const renderItemLatestDetails = (item: any) => {
  return <CardLatestResultDetails item={item.item} />;
};

const rendeHeaderList = () => {
  return (
    <TextApp preset="text18BlueNormal" style={{ marginBottom: scale(10) }}>
      Kết quả gần nhất
    </TextApp>
  );
};

export const ResultsLatest = () => {
  const { loading } = useGetResultLatestDetails();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        canBack
        backIcon={<HomeSVG.BACK />}
        title="Trần Ngọc Anh - môn Toán"
      />
      <TextApp
        preset="text16"
        style={{ textAlign: "center", marginTop: scale(20) }}
      >
        Gia sư: Phạm Trần Phương
      </TextApp>
      <ChartKit />
      <View style={{ flex: 1, margin: scale(20) }}>
        <View style={styles.line} />
        {loading ? (
          <LoadingView />
        ) : (
          <FlatList
            data={LATEST_RESULT_DETAILS}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItemLatestDetails}
            keyExtractor={(item: any) => item.name}
            ListHeaderComponent={rendeHeaderList}
          />
        )}
      </View>
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
