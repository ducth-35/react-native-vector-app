import { HomeSVG } from "@/asset";
import { scale } from "@/common/scale";
import { Header } from "@/components/header";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet, View } from "react-native";
import { AvatarAccount } from "@/components/avatar-account";
import { Button } from "@/components/btn";
import { InputRegister } from "@/components/input-register";
import { ModalizeCamera } from "@/components/modal/modal-camera";
import {
  requestCameraPermission,
  requestMediaPermission,
} from "@/common/permission";
import { useSelector } from "react-redux";
import { userInforSelector } from "@/store/auth/authSelector";
import { useUpdateInforParent } from "./services";
import { ModalSelectLocation } from "@/components/modal/modal-location";
import { isUndefined } from "lodash";
import { UploadService } from "@/services/upload-image";
import { isNullOrEmpty } from "@/utils/method";

type ImageInterface = {
  path: string;
  sourceURL: string;
};

export const AccountParentsDetails = () => {
  const user = useSelector(userInforSelector);
  const { state, updateInforParent } = useUpdateInforParent();
  const { uploadImage } = UploadService.useUploadImage();

  const [input, setInput] = React.useState<{
    name: string;
    phone: string;
    email: string;
  }>({
    name: user?.fullName,
    phone: user?.phoneNumber,
    email: user?.email,
  });
  const [address, setAddress] = React.useState<{
    fullname: string | undefined;
    locationId: string | undefined;
  }>({
    fullname: user?.location,
    locationId: "",
  });

  const modalOpenCamera = React.useRef<any>();
  const modalOpenSelectLocation = React.useRef<any>();
  const [avatar, setAvatar] = React.useState<{
    fileName: string;
    url: string;
  }>({
    fileName: "",
    url: user?.avatar,
  });

  const handleModalCamera = async () => {
    await requestCameraPermission();
    await requestMediaPermission();
    modalOpenCamera?.current?.open();
  };

  const closeModal = () => {
    modalOpenCamera?.current?.close();
  };

  const handleUploadImage = async (file: ImageInterface) => {
    if (!isUndefined(file)) {
      const results: any = await uploadImage(file);
      setAvatar(results?.data);
    }
  };

  const handleOpenSelectLocation = () => {
    modalOpenSelectLocation?.current?.open();
  };

  const handleSelectLocation = (data: {
    fullname: string | undefined;
    locationId: string | undefined;
  }) => {
    setAddress((prevState) => ({
      ...prevState,
      fullname: data.fullname,
      locationId: data.locationId,
    }));
    modalOpenSelectLocation?.current?.close();
  };

  const handleUpdateInforParent = () => {
    const params = {
      fullName: input?.name,
      email: input?.email,
      location: address?.fullname,
      locationId: address?.locationId,
      parent: undefined,
      children: undefined,
      avatar: !isNullOrEmpty(avatar?.fileName) ? avatar?.fileName : undefined,
    };
    updateInforParent(params);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Tài khoản" canBack backIcon={<HomeSVG.BACK />} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: scale(30),
          marginTop: scale(15),
        }}
      >
        <View style={{ flex: 1 }}>
          <AvatarAccount onPress={handleModalCamera} source={avatar?.url} />
          <InputRegister
            lable="Tên bạn"
            value={input?.name}
            onChangeText={(value) =>
              setInput((prevState) => ({
                ...prevState,
                name: value as string,
              }))
            }
          />
          <InputRegister
            lable="Số điện thoại"
            value={input?.phone}
            editable={false}
            keyboardType={"number-pad"}
            onChangeText={(value) =>
              setInput((prevState) => ({
                ...prevState,
                phone: value as string,
              }))
            }
          />
          <InputRegister
            lable="Email"
            value={input?.email}
            onChangeText={(value) =>
              setInput((prevState) => ({
                ...prevState,
                email: value as string,
              }))
            }
          />
          <InputRegister
            lable="Địa chỉ"
            value={address?.fullname}
            editable={false}
            onPress={handleOpenSelectLocation}
          />
        </View>
      </ScrollView>
      <View style={styles.viewDone}>
        <Button
          isLoading={state?.loading}
          preset="blue"
          title="Cập nhật"
          onPress={handleUpdateInforParent}
        />
      </View>
      <ModalizeCamera
        ref={modalOpenCamera}
        callbackFunc={handleUploadImage}
        optionCameraPicker={styles.optionCameraPicker}
        optionGalleryPicker={styles.optionGalleryPicker}
        closeModal={closeModal}
      />
      <ModalSelectLocation
        ref={modalOpenSelectLocation}
        onSave={handleSelectLocation}
        onClose={() => modalOpenSelectLocation?.current?.close()}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flex: {},
  viewDone: {
    marginBottom: scale(10),
    marginHorizontal: scale(20),
    alignItems: "flex-end",
  },
  optionCameraPicker: {
    width: 335,
    height: 335,
    cropping: true,
    cropperCircleOverlay: true,
    mediaType: "photo",
    useFrontCamera: true,
  },
  optionGalleryPicker: {
    width: 300,
    height: 400,
    cropping: true,
    cropperCircleOverlay: true,
    mediaType: "photo",
  },
});
