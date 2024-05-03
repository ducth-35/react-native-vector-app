import React from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Alert, Platform, Pressable, StyleSheet, View } from "react-native";
import TextApp from "@/components/textApp";
import { scale } from "@/common/scale";
import { checkPermission } from "@/common/permission";
import { PERMISSIONS, openSettings } from "react-native-permissions";
import ImagePicker from "react-native-image-crop-picker";

const handleBlockCameraPermission = () => {
  Alert.alert(
    "Truy cập bị từ chối",
    "Để tái kích hoạt camera, vui lòng vào phần cài đặt và bật camera dành cho Vector",
    [
      {
        text: "Hủy",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Cài đặt", onPress: () => openSettings() },
    ]
  );
};
const handleBlockLibrayPermission = () => {
  Alert.alert(
    "Truy cập Thư viện ảnh bị từ chối",
    "Để tái kích hoạt Thư viện ảnh, vui lòng vào phần cài đặt và bật Thư viện ảnh dành cho Vector",
    [
      {
        text: "Hủy",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Cài đặt", onPress: () => openSettings() },
    ]
  );
};

type Props = {
  closeModal?: () => void;
  callbackFunc?: Function;
  optionCameraPicker: any;
  optionGalleryPicker: any;
};

export const ModalizeCamera = React.forwardRef(
  (
    {
      closeModal,
      callbackFunc,
      optionCameraPicker,
      optionGalleryPicker,
    }: Props,
    ref
  ) => {
    const optionCamera = optionCameraPicker || { width: 335, height: 335 };
    const optionGallery = optionGalleryPicker || { width: 300, height: 400 };

    const handleOpenCamera = () => {
      ImagePicker.openCamera(optionCamera).then((image) => {
        closeModal?.();
        callbackFunc?.(image);
      });
    };
    const handleOpenLibrary = () => {
      ImagePicker.openPicker(optionGallery).then((image) => {
        closeModal?.();
        callbackFunc?.(image);
      });
    };

    const openCamera = async () => {
      await checkPermission(
        Platform.OS === "android"
          ? PERMISSIONS.ANDROID.CAMERA
          : PERMISSIONS.IOS.CAMERA,
        handleBlockCameraPermission,
        handleOpenCamera,
        handleOpenCamera,
        handleBlockCameraPermission,
        handleOpenCamera
      );
    };
    const openGallery = async () => {
      await checkPermission(
        Platform.OS === "android"
          ? PERMISSIONS.ANDROID.CAMERA
          : PERMISSIONS.IOS.PHOTO_LIBRARY,
        handleBlockLibrayPermission,
        handleOpenLibrary,
        handleOpenLibrary,
        handleBlockLibrayPermission,
        handleOpenLibrary
      );
    };
    return (
      <Portal>
        <Modalize
          modalStyle={styles.container}
          adjustToContentHeight={true}
          ref={ref}
          handleStyle={{
            display: "none",
          }}
          scrollViewProps={{
            showsVerticalScrollIndicator: false,
          }}
        >
          <TextApp preset="text18" style={styles.title}>
            Thêm ảnh
          </TextApp>
          <View style={styles.viewOption}>
            <Pressable onPress={openCamera}>
              <TextApp preset="text16">Chụp ảnh mới</TextApp>
            </Pressable>
            <View style={styles.line} />
            <Pressable onPress={openGallery}>
              <TextApp preset="text16">Chọn từ thiết bị </TextApp>
            </Pressable>
          </View>
        </Modalize>
      </Portal>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  btn: {
    marginHorizontal: scale(20),
    marginBottom: scale(30),
  },
  title: {
    marginVertical: scale(20),
    textAlign: "center",
  },
  line: {
    marginVertical: scale(10),
  },
  viewOption: {
    marginHorizontal: scale(20),
    marginBottom: scale(50),
  },
});
