import React from "react";
import TextApp from "../textApp";
import { FlatList, StyleSheet, View, ListRenderItem } from "react-native";
import { scale } from "../../common/scale";
import { DataArtCenter } from "../../utils/mock-data";
import { CardArtCenter } from "../card-artcenter";
import { ArtCenterInterface } from "../../types/artCenter";

export const ArtCenter = () => {
  const renderItem: ListRenderItem<ArtCenterInterface> = ({ item }) => {
    return <CardArtCenter item={item} newStyle={style.newStyle} />;
  };
  return (
    <View style={style.container}>
      <View style={style.textHeader}>
        <TextApp preset="text18" style={style.title}>
          Trung Tâm Nghệ Thuật
        </TextApp>
      </View>
      <View style={style.viewListOutStand}>
        <FlatList
          data={DataArtCenter}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
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
    backgroundColor: "#f8f8ff",
    marginLeft: scale(20),
    marginTop: scale(10),
    borderRadius: scale(12),
  },
});
