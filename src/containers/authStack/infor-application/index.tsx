import { HomeSVG } from "@/asset";
import { Header } from "@/components/header";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DeviceInfo from "react-native-device-info";
import TextApp from "@/components/textApp";
import { SCREEN_HEIGHT, scale } from "@/common/scale";
import FastImage from "react-native-fast-image";
import { ImageAsset } from "@/asset/image";

export const InforApplication = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Thông tin ứng dụng" canBack backIcon={<HomeSVG.BACK />} />
      <View>
        <FastImage
          source={ImageAsset.login_bg}
          resizeMode="cover"
          style={styles.viewBanner}
        />
        <FastImage source={ImageAsset.logo} style={styles.logo} />
      </View>
      <View style={styles.viewInfor}>
        <TextApp preset="text18BlackBold">Vector</TextApp>
        <TextApp preset="text15_medium" style={styles.txtVersion} >Phiên bản: {DeviceInfo.getVersion()}</TextApp>
        <TextApp preset="text15_regular" style={styles.txtInfor} >
          Vector là ứng dụng hỗ trợ phụ huynh và gia sư kết nối với nhau, đồng thời là trợ lý ảo giúp đắc lực phụ huynh quản lý con cái của mình.
        </TextApp>
      </View>


    </SafeAreaView >
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewBody: {
  },
  viewInfor: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(20),
    marginTop: '15%'
  },
  logo: {
    width: scale(98),
    height: scale(98),
    position: "absolute",
    zIndex: 1,
    bottom: -scale(40),
    left: "50%",
    marginLeft: -50,
  },
  viewBanner: {
    height: SCREEN_HEIGHT / 5,
    justifyContent: "center",
  },
  txtVersion: {
    marginVertical: scale(10),
    color: "#646c6c"
  },
  txtInfor: {
    textAlign: 'center',
    lineHeight: scale(22),
    color: '#222222'
  }
});
