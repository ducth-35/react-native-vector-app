import React from "react";
import TextApp from "../textApp";
import { FlatList, StyleSheet, View, ListRenderItem } from "react-native";
import { scale } from "../../common/scale";
import { CardArtCenter } from "../card-artcenter";
import { useGetCenters } from "@/services/home";

export const ArtCenter = () => {
  const { state } = useGetCenters();
  const renderItem: ListRenderItem<CenterInterface> = ({ item }) => {
    return <CardArtCenter item={item} newStyle={style.newStyle} />;
  };
  return (
    <View style={style.container}>
      <View style={style.textHeader}>
        <TextApp preset="text18" style={style.title}>
          Trung Tâm Nổi bật
        </TextApp>
      </View>
      <View style={style.viewListOutStand}>
        <FlatList
          data={state?.data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{ paddingLeft: scale(20) }}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: scale(20),
  },
  title: {
    marginHorizontal: scale(20),
  },
  textHeader: {},
  viewListOutStand: {},
  newStyle: {
    width: scale(250),
    backgroundColor: "#f8f8ff",
    marginRight: scale(20),
    marginTop: scale(10),
    borderRadius: scale(12),
  },
});
