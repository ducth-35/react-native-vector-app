import { HomeSVG } from "@/asset";
import { Header } from "@/components/header";
import React from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNotification } from "./services";
import { Skeleton } from "../search/skeleton";
import { ItemNotification } from "@/components/item-notification";
import { scale } from "@/common/scale";

export const Notification = () => {
  const { data, loading, refreshing, onRefresh } = useNotification();

  const renderItem: ListRenderItem<NotificationInterface> = React.useCallback(
    ({ item }) => {
      return <ItemNotification item={item} />;
    },
    [data]
  );

  const onRefeshNotification = () => {
    onRefresh();
  };

  if (loading) {
    return (
      <SafeAreaView>
        <Skeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Thông báo" canBack backIcon={<HomeSVG.BACK />} />
      <View style={{ margin: scale(20) }}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefeshNotification}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
