import React, { FC } from "react";
import { FlatList, SectionList, StyleSheet, View } from "react-native";
import { Header } from "@/components/header";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeSVG } from "@/asset";
import TextApp from "@/components/textApp";
import { CardResult } from "@/components/result/card-result";
import { scale } from "@/common/scale";
import { CardLatestResult } from "@/components/result/card-latest-result";

const DATA = [
  {
    title: "Trần Ngọc An - Lớp 2",
    data: [
      {
        name: "Môn toán ",
        teacher: "Phạm Trần Phương",
        icon: <HomeSVG.TOAN />,
        color: "#f6dada",
      },
      {
        name: "Môn lý ",
        teacher: "Phạm Bích Hồng",
        icon: <HomeSVG.LY />,
        color: "#f6e5da",
      },
    ],
  },
  {
    title: "Trần Phương Linh - Lớp 2",
    data: [
      {
        name: "Môn toán ",
        teacher: "Phạm Trần Phương",
        icon: <HomeSVG.TOAN />,
        color: "#f6dada",
      },
      {
        name: "Môn lý ",
        teacher: "Phạm Bích Hồng",
        icon: <HomeSVG.LY />,
        color: "#f6e5da",
      },
    ],
  },
];

const LATEST_RESULT = [
  { name: "Trần Ngọc An", subject: "Toán", date: "8/4/2023" },
  { name: "Trần Phương Linh", subject: "Toán", date: "8/4/2023" },
  { name: "Trần Ngọc Anh", subject: "Toán", date: "8/4/2023" },
];

const renderItem = (item: any) => {
  return <CardResult item={item.item} />;
};

const renderHeader = ({ section: { title } }: any) => (
  <TextApp preset="text16" style={{ marginVertical: scale(10) }}>
    {title}
  </TextApp>
);

const renderItemLatest = (item: any) => {
  return <CardLatestResult item={item.item} />;
};

const renderHeaderList = () => {
  return (
    <TextApp preset="text18BlueNormal" style={{ marginBottom: scale(10) }}>
      Kết quả gần nhất
    </TextApp>
  );
};

export const ResultScreen: FC = () => {
  const renderListFooter = () => {
    return (
      <View>
        <View style={styles.line} />
        <FlatList
          data={LATEST_RESULT}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItemLatest}
          keyExtractor={(item: any) => item.name}
          ListHeaderComponent={renderHeaderList}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Kết quả học" />
      <SectionList
        sections={DATA}
        keyExtractor={(item: any, index: any) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderHeader}
        contentContainerStyle={{
          marginHorizontal: scale(15),
          marginTop: scale(20),
        }}
        stickySectionHeadersEnabled={false}
        ListFooterComponent={renderListFooter}
      />
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
