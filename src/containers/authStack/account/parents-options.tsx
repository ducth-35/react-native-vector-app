import { HomeSVG } from "@/asset";
import { ImageAsset } from "@/asset/image";
import { scale } from "@/common/scale";
import TextApp from "@/components/textApp";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";

const options = [
  {
    id: 0,
    name: "Quản lý đặt lịch",
    icon: <HomeSVG.INFOR />,
    rightIcon: <HomeSVG.NEXT />,
  },
  {
    id: 1,
    name: "Quản lý lớp học của con",
    icon: <HomeSVG.INFOR />,
    rightIcon: <HomeSVG.NEXT />,
  },
  {
    id: 2,
    name: "Tài khoản vợ/chồng",
    icon: <HomeSVG.INFOR />,
    rightIcon: <HomeSVG.NEXT />,
  },
  {
    id: 3,
    name: "Tài khoản các con",
    icon: <HomeSVG.INFOR />,
    rightIcon: <HomeSVG.NEXT />,
  },
  {
    id: 4,
    name: "Thông tin ứng dụng",
    icon: <HomeSVG.INFOR />,
    rightIcon: <HomeSVG.NEXT />,
  },
  {
    id: 5,
    name: "Đăng xuất",
    icon: <HomeSVG.INFOR />,
    rightIcon: null,
  },
  {
    id: 6,
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

export const ParentsOptions = () => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <TouchableOpacity style={styles.viewAvatar}>
          <FastImage source={ImageAsset.person} style={styles.avatar} />
          <View style={styles.viewCamera}>
            <HomeSVG.CAMERA />
          </View>
        </TouchableOpacity>
        <TextApp preset="text18BlackBold" style={{ marginTop: scale(15) }}>
          Trương Huỳnh Đức
        </TextApp>
        <TextApp preset="text16" style={{ marginVertical: scale(5) }}>
          0988616818 - phuong_tran@gmail.com
        </TextApp>
        <TextApp preset="text14Medium" style={styles.text_align}>
          C020 Chung Cư Vinhomes Liễu Giai, 16 Liễu Giai, Ba Đình, Hà Nội
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
    flex: 1,
    marginHorizontal: scale(20),
  },
  viewAvatar: {
    width: scale(80),
    height: scale(80),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: scale(50),
  },
  avatar: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(50),
  },
  viewCamera: {
    position: "absolute",
    top: 1,
    right: scale(5),
  },
  itemAccount: {
    flexDirection: "row",
    marginVertical: 6,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: scale(20),
  },
  itemLeft: {
    flexDirection: "row",
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(20),
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
  text_align: {
    textAlign: "center",
  },
});
