import React from "react";
import TextApp from "../textApp";
import { FlatList, StyleSheet, View, ListRenderItem } from "react-native";
import { scale } from "../../common/scale";
import { DataOutStand } from "../../utils/mock-data";
import { OutStandInterface } from "../../types/outstand";
import { CardOutStand } from "../card-outstand";

export const OutstandTutor = () => {
  const renderItem: ListRenderItem<OutStandInterface> = ({ item }) => {
    return <CardOutStand item={item} newStyle={style.viewCardOutStand} />;
  };
  return (
    <View style={style.container}>
      <View style={style.textHeader}>
        <TextApp preset="text18" style={style.title}>
          Gia sư nổi bật
        </TextApp>
        <TextApp preset="text14" style={[style.title, { color: "#3d5cff" }]}>
          Chi tiết
        </TextApp>
      </View>
      <View style={style.viewListOutStand}>
        <FlatList
          data={DataOutStand}
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
  },
  viewCardOutStand: {
    backgroundColor: "#f8f8ff",
    flexDirection: "row",
    padding: scale(15),
    marginTop: scale(10),
    borderRadius: scale(12),
    marginLeft: scale(20),
  },
  title: {
    marginHorizontal: scale(20),
  },
  textHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewListOutStand: {},
});
