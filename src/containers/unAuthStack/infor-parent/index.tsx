import { HomeSVG } from "@/asset";
import { ImageAsset } from "@/asset/image";
import {
  requestCameraPermission,
  requestMediaPermission,
} from "@/common/permission";
import { scale } from "@/common/scale";
import { Button } from "@/components/btn";
import { Header } from "@/components/header";
import { InputRegister } from "@/components/input-register";
import { ModalizeCamera } from "@/components/modal/modal-camera";
import { ModalSelectLocation } from "@/components/modal/modal-location";
import { ModalizeAddInforChildren } from "@/components/register/modalize-add-infor-childrens";
import { ModalizeAddInforParent } from "@/components/register/modalize-add-infor-parents";
import TextApp from "@/components/textApp";
import { navigateAndSimpleReset } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { UploadService } from "@/services/upload-image";
import { userInforSelector } from "@/store/auth/authSelector";
import { isNullOrEmpty } from "@/utils/method";
import { isUndefined } from "lodash";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useUpdateInforParent } from "./services";

type ImageInterface = {
  path: string;
  sourceURL: string;
};

interface Props {}

export const RegisterInforParent = ({}: Props) => {
  const user = useSelector(userInforSelector);
  const { uploadImage } = UploadService.useUploadImage();
  const { state, updateInforParent } = useUpdateInforParent();
  const [isAddParent, setIsAddParent] = React.useState<boolean>(true);
  const [input, setInput] = React.useState<{
    phone: string;
    email: string;
  }>({
    phone: user?.phoneNumber,
    email: "",
  });
  const [parentInfor, setParentInfor] = React.useState<{
    fullName: string;
    phone: string;
  }>({
    fullName: "",
    phone: "",
  });
  const [address, setAddress] = React.useState<{
    fullname: string | undefined;
    locationId: string | undefined;
  }>({
    fullname: "",
    locationId: "",
  });

  const [childrenInfor, setChildrenInfor] = React.useState<
    ChildrenInforInterface[]
  >([]);

  const [selectedItemChildren, setSelectedItemChildren] =
    React.useState<ChildrenInforInterface | null>(null);

  const [selectedIndexItemChildren, setSelectedIndexItemChildren] =
    React.useState(-1);

  const [isEditing, setIsEditing] = React.useState(false);
  const [avatar, setAvatar] = React.useState<{
    fileName: string;
    url: string;
  }>({
    fileName: "",
    url: user?.avatar,
  });

  const modalizeAddInfor = React.useRef<any>();
  const modalizeAddInforParent = React.useRef<any>();
  const modalOpenCamera = React.useRef<any>();
  const modalOpenSelectLocation = React.useRef<any>();

  const handleOpenAddInforChildren = () => {
    setSelectedIndexItemChildren(-1);
    setSelectedItemChildren(null);
    setIsEditing(false);
    modalizeAddInfor?.current?.open();
  };

  const handleOpenAddInforParent = () => {
    modalizeAddInforParent?.current?.open();
  };

  const handleConfirmInforParent = (data: {
    fullName: string;
    phone: string;
  }) => {
    setParentInfor(data);

    setIsAddParent(false);
  };

  const handleConfirmInforChildren = (
    data: { fullName: string; phone: string; grade: string },
    selectedIndex: number
  ) => {
    if (isEditing && selectedIndex !== -1) {
      const updatedChildrenInfor = [...childrenInfor];
      updatedChildrenInfor[selectedIndex] = data;
      setChildrenInfor(updatedChildrenInfor);
    } else {
      setChildrenInfor((prevChildrenInfor) => [...prevChildrenInfor, data]);
      setSelectedIndexItemChildren(-1); // Đặt selectedIndex thành -1
    }
    setIsEditing(false); // Đặt isEditing thành false sau khi xác định trạng thái
  };

  const handleEditAddInforChildren = (index: number) => {
    if (index !== -1) {
      const selectedItem = childrenInfor[index];
      setSelectedIndexItemChildren(index);
      setSelectedItemChildren(selectedItem);
      setIsEditing(true); // Đặt isEditing thành true khi chỉnh sửa
    } else {
      setSelectedIndexItemChildren(-1); // -1 cho biết đây là thêm mới
      setSelectedItemChildren(null);
      setIsEditing(false); // Đặt isEditing thành false khi thêm mới
    }
    modalizeAddInfor?.current?.open();
  };

  const handleModalCamera = async () => {
    await requestCameraPermission();
    await requestMediaPermission();
    modalOpenCamera?.current?.open();
  };

  const handleUploadImage = async (file: ImageInterface) => {
    if (!isUndefined(file)) {
      const results: any = await uploadImage(file);
      setAvatar(results?.data);
    }
  };

  const closeModal = () => {
    modalOpenCamera?.current?.close();
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

  const handleUpdateParent = () => {
    const params = {
      fullName: user?.fullName,
      email: input?.email,
      location: address?.fullname,
      locationId: address?.locationId,
      parent: parentInfor,
      children: childrenInfor,
    };
    updateInforParent(params);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        isRightIcon
        handleRightIcon={() => navigateAndSimpleReset(APP_SCREEN.MAIN_TAB)}
        rightIcon={<TextApp preset="text18BlueNormal">Bỏ qua</TextApp>}
      />
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TextApp preset="text34BlueNormal">{user?.fullName}</TextApp>
          <TouchableOpacity
            style={styles.viewAvatar}
            onPress={handleModalCamera}
          >
            <FastImage
              source={
                isNullOrEmpty(avatar?.url)
                  ? ImageAsset.person
                  : { uri: avatar?.url }
              }
              style={styles.avatar}
            />
            <View style={styles.viewCamera}>
              <HomeSVG.CAMERA />
            </View>
          </TouchableOpacity>
        </View>
        <InputRegister
          lable="Số điện thoại"
          placeholder="Nhập số điện thoại"
          keyboardType="numeric"
          value={input?.phone}
          editable={false}
        />
        <InputRegister
          lable="Email"
          placeholder="Email của bạn"
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
          placeholder="Địa chỉ học"
          value={address?.fullname}
          editable={false}
          onPress={handleOpenSelectLocation}
        />
        <InputRegister
          lable={
            isAddParent ? "Thêm tài khoản vợ/chồng" : "Tài khoản của vợ/chồng"
          }
          isAdd={isAddParent}
          editable={false}
          txtIsAdd="Thêm tài khoản"
          value={`${parentInfor?.fullName} - ${parentInfor?.phone}`}
          onPress={handleOpenAddInforParent}
        />
        {childrenInfor?.length > 0 && (
          <>
            {childrenInfor?.map((item, index) => (
              <View key={index}>
                <InputRegister
                  lable="Tài khoản của con"
                  editable={false}
                  isAdd={false}
                  value={`${item?.fullName} - ${item?.grade} - ${item?.phone}`}
                  onPress={handleEditAddInforChildren.bind(null, index)}
                />
              </View>
            ))}
          </>
        )}
        <InputRegister
          lable="Thêm tài khoản của con"
          editable={false}
          isAdd={true}
          txtIsAdd={"Thêm tài khoản"}
          onPress={handleOpenAddInforChildren}
        />

        <View style={styles.viewDone}>
          <Button
            preset="blue"
            title="Hoàn thành"
            onPress={handleUpdateParent}
            isLoading={state?.loading}
          />
        </View>
      </ScrollView>
      <ModalizeAddInforChildren
        ref={modalizeAddInfor}
        title="Thêm tài khoản của con"
        pressCancel={() => modalizeAddInfor?.current?.close()}
        onSave={handleConfirmInforChildren}
        selectedItem={selectedItemChildren}
        selectedIndex={selectedIndexItemChildren}
      />
      <ModalizeAddInforParent
        ref={modalizeAddInforParent}
        title="Thêm tài khoản vợ/chồng"
        pressCancel={() => modalizeAddInforParent?.current?.close()}
        onSave={handleConfirmInforParent}
      />
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
  },
  contentContainer: {},
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
