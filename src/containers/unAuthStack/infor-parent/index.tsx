import { HomeSVG } from "@/asset";
import { ImageAsset } from "@/asset/image";
import { scale } from "@/common/scale";
import { Header } from "@/components/header";
import { InputRegister } from "@/components/input-register";
import TextApp from "@/components/textApp";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/btn";

export const RegisterInforParent = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        isRightIcon
        handleRightIcon={() => navigate(APP_SCREEN.MAIN_TAB)}
        rightIcon={<TextApp preset="text18BlueNormal">Bỏ qua</TextApp>}
      />
      <View style={styles.contentContainer}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TextApp preset="text34BlueNormal"> Trần Phương</TextApp>
          <TouchableOpacity style={styles.viewAvatar}>
            <FastImage source={ImageAsset.person} style={styles.avatar} />
            <View style={styles.viewCamera}>
              <HomeSVG.CAMERA />
            </View>
          </TouchableOpacity>
        </View>
        <InputRegister lable="Số điện thoại" placeholder="Nhập số điện thoại" />
        <InputRegister lable="Email" placeholder="Email của bạn" />
        <InputRegister lable="Địa chỉ" placeholder="Địa chỉ học" />
        <InputRegister lable="Thêm tài khoản vợ/chồng" isAdd />
        <InputRegister lable="Thêm tài khoản của con" isAdd />
        <View style={styles.viewDone}>
          <Button title="Hoàn thành" />
        </View>
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
    marginTop: scale(20),
  },
  viewAvatar: {
    width: scale(60),
    height: scale(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(50),
    marginTop: scale(15),
  },
  avatar: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(50),
  },
  viewCamera: {
    position: "absolute",
    top: 1,
    right: scale(1),
  },
  viewDone: {
    margin: scale(20),
  },
});
