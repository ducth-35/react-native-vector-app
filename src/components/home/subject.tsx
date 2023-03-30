import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { scale } from "../../common/scale";
import TextApp from "../textApp";
import { HomeSVG } from "../../assets/icon/home/home-svg";

const dataSubject = [
  {
    name: "Toán",
    icon: <HomeSVG.TOAN />,
  },
  {
    name: "Lý",
    icon: <HomeSVG.LY />,
  },
  {
    name: "Hoá",
    icon: <HomeSVG.HOA />,
  },
  {
    name: "Vẽ",
    icon: <HomeSVG.VE />,
  },
  {
    name: "Piano",
    icon: <HomeSVG.PIANO />,
  },
  {
    name: "Guitar",
    icon: <HomeSVG.GITA />,
  },
  {
    name: "Nhảy - múa",
    icon: <HomeSVG.MUA />,
  },
  {
    name: "Violin",
    icon: <HomeSVG.VIOLIN />,
  },
];

export const Subject = () => {
  const renderItem = ({ item }: any) => {
    return (
      <View style={style.item}>
        {item.icon}
        <TextApp preset="text14" style={style.name}>
          {item.name}
        </TextApp>
      </View>
    );
  };
  return (
    <View style={style.container}>
      <TextApp preset="text18" style={style.title}>
        Môn học
      </TextApp>
      <FlatList
        data={dataSubject}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    marginVertical: scale(20),
  },
  title: {
    marginHorizontal: scale(20),
  },
  item: {
    marginTop: scale(15),
    marginLeft: scale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    marginTop: scale(5),
  },
});
