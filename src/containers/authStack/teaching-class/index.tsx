import { HomeSVG } from "@/asset";
import { scale } from "@/common/scale";
import { Header } from "@/components/header";
import { LoadingView } from "@/components/loading-view";
import { CardResult } from "@/components/result/card-result";
import TextApp from "@/components/textApp";
import { useGetTeachingClassTutor } from "@/services/tutor";
import React from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
  {
    title: "Trần Ngọc An - Lớp 2",
    data: [
      {
        name: "Môn toán ",
        teacher: "Phạm Trần Phương",
        time: "16:30 PM - 17:30 PM",
        icon: <HomeSVG.TOAN />,
        color: "#f6dada",
      },
      {
        name: "Môn lý ",
        teacher: "Phạm Bích Hồng",
        time: "16:30 PM - 17:30 PM",
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
        time: "16:30 PM - 17:30 PM",
        icon: <HomeSVG.TOAN />,
        color: "#f6dada",
      },
      {
        name: "Môn lý ",
        teacher: "Phạm Bích Hồng",
        time: "16:30 PM - 17:30 PM",
        icon: <HomeSVG.LY />,
        color: "#f6e5da",
      },
    ],
  },
];

const renderItem = (item: any) => {
  return <CardResult item={item.item} />;
};

const renderHeader = ({ section: { title } }: any) => (
  <TextApp preset="text16" style={{ marginVertical: scale(10) }}>
    {title}
  </TextApp>
);

export const TeachingClass = () => {
  const { data, loading } = useGetTeachingClassTutor();
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Lớp học" />
      <View style={styles.contentContainer}>
        {loading ? (
          <LoadingView />
        ) : (
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
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
