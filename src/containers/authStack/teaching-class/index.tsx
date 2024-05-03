import { HomeSVG } from "@/asset";
import { scale } from "@/common/scale";
import { CardClass } from "@/components/card-class";
import { Header } from "@/components/header";
import TextApp from "@/components/textApp";
import { useGetResultOverview } from "@/services/results";
import React from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Skeleton } from "../search/skeleton";


export const TeachingClass = (props: any) => {
  const isParent = props.route?.params?.isParent;
  const { resultOverview, loading } = useGetResultOverview();

  const renderItem = (item: any) => {
    return <CardClass item={item.item} isParent={isParent} />;
  };

  const renderHeader = ({ section: { title } }: any) => (
    <TextApp preset="text16" style={{ marginVertical: scale(10) }}>
      {title}
    </TextApp>
  );

  if (loading) {
    return <Skeleton />
  }

  return (
    <SafeAreaView style={styles.container}>
      {isParent ? (
        <Header
          title="Quản lý lớp học của con"
          canBack
          backIcon={<HomeSVG.BACK />}
        />
      ) : (
        <Header title="Lớp học" />
      )}
      <View style={styles.contentContainer}>
        <SectionList
          sections={resultOverview}
          keyExtractor={(item: any, index: any) => item + index}
          renderItem={renderItem}
          renderSectionHeader={renderHeader}
          contentContainerStyle={{
            marginHorizontal: scale(15),
          }}
          stickySectionHeadersEnabled={false}
        />
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
