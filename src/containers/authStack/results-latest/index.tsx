import { HomeSVG } from "@/asset";
import { scale } from "@/common/scale";
import { Header } from "@/components/header";
import { CardLatestResultDetails } from "@/components/result/card-latest-result-details";
import TextApp from "@/components/textApp";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadingView } from "@/components/loading-view";
import { ChartKit } from "@/components/header/chart";
import { useGetResults } from "@/services/results";

const renderItemLatestDetails = (item: any) => {
  return <CardLatestResultDetails item={item.item} />;
};

const renderHeaderList = () => {
  return (
    <TextApp preset="text18BlueNormal" style={{ marginBottom: scale(10) }} numberOfLines={1}>
      Kết quả gần nhất
    </TextApp>
  );
};

export const ResultsLatest = (props: any) => {
  const params: RouteResultsLatest = props.route?.params
  const isTutor = props.route?.params?.isTutor;

  const { results, loadingGetResult } = useGetResults({
    studentId: params.studentId
  });

  if (loadingGetResult) {
    return <></>
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        canBack
        backIcon={<HomeSVG.BACK />}
        title={params.studentName}
      />
      <TextApp preset="text16" style={{ textAlign: "center" }}>
        Môn: {params.subjectName}
      </TextApp>
      {!isTutor && (
        <TextApp preset="text16" style={{ textAlign: "center" }}>
          Gia sư: {params.tutor}
        </TextApp>
      )}
      <ChartKit />
      <View style={{ flex: 1, margin: scale(20) }}>
        <View style={styles.line} />
        <FlatList
          data={results}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItemLatestDetails}
          keyExtractor={(item: any) => item.id}
          ListHeaderComponent={renderHeaderList}
        />
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
