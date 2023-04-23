import { HomeSVG } from "@/asset";
import { ImageAsset } from "@/asset/image";
import { scale } from "@/common/scale";
import TextApp from "@/components/textApp";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

const options = [
  {
    id: 0,
    name: "Quản lý lịch đặt",
    icon: <HomeSVG.INFOR />,
    rightIcon: <HomeSVG.NEXT />,
  },
  {
    id: 1,
    name: "Thông tin ứng dụng",
    icon: <HomeSVG.INFOR />,
    rightIcon: <HomeSVG.NEXT />,
  },
  {
    id: 2,
    name: "Đăng xuất",
    icon: <HomeSVG.INFOR />,
    rightIcon: null,
  },
  {
    id: 3,
    name: "Xoá tài khoản",
    icon: <HomeSVG.INFOR />,
    rightIcon: null,
  },
];

type OptionItemsProps = {
  data: {
    id: number;
    name: string;
    icon: JSX.Element;
    rightIcon: JSX.Element | null;
  };
  // handlePress: (value: number) => void;
  // index: number;
};

export const TutorOptions = () => {
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={styles.viewAvatar}>
          <FastImage source={ImageAsset.person} style={styles.avatar} />
        </View>
        <TextApp preset="text18BlackBold" style={{ marginTop: scale(15) }}>
          Trương Huỳnh Đức
        </TextApp>
        <TextApp preset="text16" style={{ marginVertical: scale(5) }}>
          0988616818
        </TextApp>
        <TextApp preset="text14Medium">
          Đại học Ngoại Thương - Sinh viên năm 2
        </TextApp>
      </View>
      <View style={{ marginTop: scale(30) }}>
        {options.map((item, index) => (
          <OptionItems data={item} key={item.id} />
        ))}
      </View>
    </View>
  );
};

const OptionItems = ({ data }: OptionItemsProps) => {
  const { rightIcon, icon, name } = data;
  return (
    <TouchableOpacity style={[styles.itemAccount]}>
      <View style={styles.itemLeft}>
        <View style={styles.iconItem}>{icon}</View>
        <TextApp style={styles.textItem}>{name}</TextApp>
      </View>
      {rightIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scale(20),
  },
  viewAvatar: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(100),
    height: scale(100),
    backgroundColor: "#d9dfff",
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: "#fff",
  },
  avatar: {
    width: scale(68),
    height: scale(68),
    borderRadius: scale(12),
  },
  itemAccount: {
    flexDirection: "row",
    marginVertical: 6,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: scale(20),
    marginHorizontal: scale(20),
  },
  itemLeft: {
    flexDirection: "row",
  },
  iconItem: {
    alignSelf: "center",
    height: scale(25),
    width: scale(25),
    alignItems: "center",
    justifyContent: "center",
  },
  textItem: {
    textAlign: "center",
    lineHeight: scale(28),
    fontSize: scale(14),
    paddingLeft: scale(16),
    fontWeight: "400",
  },
});
