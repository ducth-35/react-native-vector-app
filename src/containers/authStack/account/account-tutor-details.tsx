import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Header } from "@/components/header";
import { HomeSVG } from "@/asset";
import { AvatarAccount } from "@/components/avatar-account";
import { scale } from "@/common/scale";
import { InputRegister } from "@/components/input-register";
import { ModalizeFilter } from "@/components/modal/Modalize-filter";
import { Filter } from "@/utils/enum";
import { Button } from "@/components/btn";
import { useSelector } from "react-redux";
import { userInforSelector } from "@/store/auth/authSelector";
import {
  parserNameToLiteracy,
  parserLiteracyToName,
  formatCurrency,
  HIT_SLOP,
  formatAmount,
} from "@/utils/helper";
import { ModalizeAddSubjects } from "@/components/modal/modal-add-subjects";
import { useUpdateInforTutor } from "./services";
import { isNullOrEmpty } from "@/utils/method";
import { CardSelect } from "@/components/card-select";
import { useGetSchool } from "@/services/school";
import { ModalizeCamera } from "@/components/modal/modal-camera";
import {
  requestCameraPermission,
  requestMediaPermission,
} from "@/common/permission";
import { ModalSelectLocation } from "@/components/modal/modal-location";
import { isUndefined } from "lodash";
import { UploadService } from "@/services/upload-image";
import TextApp from "@/components/textApp";
import { ListDegreeImage } from "@/components/list-degree-image";

type ImageInterface = {
  path: string;
  sourceURL: string;
};

export const AccountTutorDetails = () => {
  const { schools } = useGetSchool(undefined);
  const user = useSelector(userInforSelector);
  const { state, updateInforTutor } = useUpdateInforTutor();
  const { uploadImage } = UploadService.useUploadImage();

  const [input, setInput] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    school?: string;
    experience?: string;
    numberOfStudent?: number;
    introduction?: string;
    teachingMethod?: string;
    literacyImages?: ImageInterface[];
  }>({
    name: user?.fullName,
    phone: user?.phoneNumber,
    email: user?.email,
    school: user?.school,
    experience: user?.experience,
    numberOfStudent: user?.numberOfStudent,
    introduction: user?.introduction,
    teachingMethod: user?.teachingMethod,
    literacyImages: user?.literacyImages as ImageInterface[],
  });
  const [dataModal, setDataModal] = useState<{
    label: string;
    item: string[];
  }>({
    label: "",
    item: [],
  });

  const [levelModal, setLevelModal] = useState<{
    label: string;
    item: string[];
  }>({
    label: "Trình độ học vấn",
    item: [
      "Sinh viên đại học",
      "Giáo viên cấp 1",
      "Giáo viên cấp 2",
      "Giáo viên cấp 3",
      "Cử nhân đại học",
      "Thạc sĩ",
      "Tiến sĩ",
    ],
  });
  const literacy = parserLiteracyToName(user?.literacy);
  const [selectedLevelItems, setSelectedLevelItems] = useState<string[]>(
    literacy !== undefined ? [literacy] : []
  );

  const [subjectInfor, setSubjectInfor] = useState<subjectsInterface[]>(
    user?.subject
  );
  const [newSubjectInfor, setNewSubjectInfor] = useState<subjectsInterface[]>(
    []
  );
  const [selectedSchoolItems, setSelectedSchoolItems] = React.useState<
    string[]
  >(user?.school !== undefined ? [user?.school] : []);

  const [avatar, setAvatar] = React.useState<{
    fileName: string;
    url: string;
  }>({
    fileName: "",
    url: user?.avatar,
  });

  const schoolSelect = {
    label: "Trường của giáo viên",
    item: schools,
  };

  const [address, setAddress] = React.useState<{
    fullname: string | undefined;
    locationId: string | undefined;
  }>({
    fullname: user?.location,
    locationId: "",
  });

  const modalizeAddSubjectRef = React.useRef<any>();
  const modalizeLevelRef = React.useRef<any>();
  const modalizeSchoolRef = React.useRef<any>();
  const modalOpenCamera = React.useRef<any>();
  const modalOpenSelectLocation = React.useRef<any>();

  const handleOpenModal = (type: string) => {
    switch (type) {
      case Filter.LEVEL:
        modalizeLevelRef?.current?.open();
        break;
      case Filter.SCHOOL:
        modalizeSchoolRef.current.open();
        setDataModal(schoolSelect);
        break;
      default:
        break;
    }
  };

  const handleConfirmSubject = (
    data?: subjectsInterface,
    selectedIndex?: number,
    isEdit?: boolean
  ) => {
    if (!isEdit) {
      const updatedSubjectInfor = [...subjectInfor, data];
      setSubjectInfor(updatedSubjectInfor as subjectInterface[]);
      setNewSubjectInfor([data] as subjectInterface[]);
    }
  };

  const handleOpenAddSubjects = (
    item?: subjectsInterface,
    index?: number,
    isEdit?: boolean
  ) => {
    modalizeAddSubjectRef?.current?.showModal({
      item: item,
      index: index,
      isEditing: isEdit,
    });
  };

  const handleUpdateInforTutor = () => {
    const nameToLiteracy = parserNameToLiteracy(selectedLevelItems);
    const params: SignUpTutorInterface = {
      fullName: input?.name,
      email: input?.email,
      literacy: nameToLiteracy != "" ? nameToLiteracy : undefined,
      school:
        selectedSchoolItems.length > 0 ? selectedSchoolItems[0] : undefined,
      subjects: newSubjectInfor,
      location: address?.fullname,
      locationId: address?.locationId,
      avatar: !isNullOrEmpty(avatar?.fileName) ? avatar?.fileName : undefined,
      experience: input?.experience,
      numberOfStudent: input?.numberOfStudent,
      introduction: input?.introduction,
      teachingMethod: input?.teachingMethod,
      literacyImages: input?.literacyImages,
    };
    updateInforTutor(params);
  };

  if (isNullOrEmpty(user)) {
    return null;
  }

  const handleModalCamera = async () => {
    await requestCameraPermission();
    await requestMediaPermission();
    modalOpenCamera?.current?.open();
  };

  const closeModal = () => {
    modalOpenCamera?.current?.close();
  };

  const handleOpenSelectLocation = () => {
    modalOpenSelectLocation?.current?.open();
  };

  const handleUploadImage = async (file: ImageInterface) => {
    if (!isUndefined(file)) {
      const results: any = await uploadImage(file);
      setAvatar(results?.data);
    }
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

  const updateListDegree = (data: any) => {
    setInput((prevState) => ({
      ...prevState,
      literacyImages: data,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Tài khoản" canBack backIcon={<HomeSVG.BACK />} />
      <ScrollView
        contentContainerStyle={{
          marginTop: scale(20),
          paddingBottom: scale(20),
        }}
        showsVerticalScrollIndicator={false}
      >
        <AvatarAccount
          onPress={handleModalCamera}
          isAvatar
          source={avatar?.url}
        />

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
          keyboardType={"number-pad"}
          editable={false}
          disable
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
        <InputRegister
          lable="Trình độ học vấn"
          placeholder="Trình độ của bạn"
          editable={false}
          isSelect
          onPressIn={() => handleOpenModal(Filter.LEVEL)}
          value={selectedLevelItems}
        />
        <CardSelect
          lable="Đơn vị công tác"
          placeholder={"Chọn đơn vị công tác"}
          onPressIn={() => handleOpenModal(Filter.SCHOOL)}
          dataSelect={selectedSchoolItems}
        />
        <InputRegister
          lable="Kinh nghiệm dạy gia sư"
          placeholder="Thêm kinh nghiệm"
          keyboardType={"number-pad"}
          rightLable={<TextApp preset="text14Medium">Tháng</TextApp>}
          value={input?.experience}
          onChangeText={(value) =>
            setInput((prevState) => ({
              ...prevState,
              experience: value as string,
            }))
          }
        />
        <InputRegister
          lable="Học sinh đã dạy"
          placeholder="Thêm số học sinh"
          keyboardType={"number-pad"}
          rightLable={<TextApp preset="text14Medium">Học sinh</TextApp>}
          value={input?.numberOfStudent}
          onChangeText={(value) =>
            setInput((prevState) => ({
              ...prevState,
              numberOfStudent: value as number,
            }))
          }
        />
        <InputRegister
          lable="Giới thiệu"
          placeholder="Nhập giới thiệu (không quá 150 từ)"
          newStyleInput={styles.inputIntro}
          multiline={true}
          maxLength={150}
          value={input?.introduction}
          onChangeText={(value) =>
            setInput((prevState) => ({
              ...prevState,
              introduction: value as string,
            }))
          }
        />
        <InputRegister
          lable="Phương pháp dạy học"
          placeholder="Phương pháp dạy học của bạn (không quá 150 từ)"
          newStyleInput={styles.inputIntro}
          multiline={true}
          maxLength={150}
          value={input?.teachingMethod}
          onChangeText={(value) =>
            setInput((prevState) => ({
              ...prevState,
              teachingMethod: value as string,
            }))
          }
        />
        <ListDegreeImage
          label="Ảnh chụp bằng cấp liên quan"
          updateListDegree={updateListDegree}
          listImage={input?.literacyImages}
        />
        {subjectInfor?.length > 0 ? (
          <View>
            <View style={styles.viewAddSubject}>
              <TextApp preset="text14">Môn dạy</TextApp>
              <Pressable
                hitSlop={HIT_SLOP}
                onPress={() => handleOpenAddSubjects({}, 0, false)}
              >
                <HomeSVG.PLUS />
              </Pressable>
            </View>
            {subjectInfor?.map((item, index) => (
              <View key={index}>
                <InputRegister
                  hiddenLable
                  editable={false}
                  isAdd={false}
                  value={`${item?.subject} - ${item?.grade} - ${formatAmount(
                    Number(item?.price)
                  )} VNĐ`}
                  // onPress={() => handleOpenAddSubjects(item, index, true)}
                  rightLable={<HomeSVG.NEXT />}
                />
              </View>
            ))}
          </View>
        ) : (
          <View style={{ marginHorizontal: scale(20), marginTop: scale(20) }}>
            <TextApp preset="text14">Môn dạy</TextApp>
            <Pressable
              style={styles.noSubject}
              hitSlop={HIT_SLOP}
              onPress={() => handleOpenAddSubjects({}, 0, false)}
            >
              <TextApp
                preset="text14Medium"
                style={{ marginBottom: scale(10) }}
              >
                Thêm môn dạy
              </TextApp>
              <HomeSVG.PLUS width={scale(30)} height={scale(30)} />
            </Pressable>
          </View>
        )}
        <View style={styles.viewDone}>
          <Button
            preset="blue"
            title="Cập nhật"
            onPress={handleUpdateInforTutor}
            isLoading={state?.loading}
          />
        </View>
      </ScrollView>
      <ModalizeFilter
        ref={modalizeLevelRef}
        data={levelModal}
        handleClose={() => modalizeLevelRef?.current?.close()}
        selectedItems={selectedLevelItems}
        setSelectedItems={setSelectedLevelItems}
        isOneSelect
      />
      <ModalizeAddSubjects
        ref={modalizeAddSubjectRef}
        onSave={handleConfirmSubject}
      />
      <ModalizeFilter
        isSchool
        ref={modalizeSchoolRef}
        data={dataModal}
        handleClose={() => modalizeSchoolRef.current.close()}
        selectedItems={selectedSchoolItems}
        setSelectedItems={setSelectedSchoolItems}
        isOneSelect
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
    backgroundColor: "#fff",
  },
  viewDone: {
    marginTop: scale(20),
    marginHorizontal: scale(15),
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
  inputIntro: {
    height: scale(100),
    alignItems: "flex-start",
    padding: scale(5),
  },
  viewAddSubject: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: scale(20),
    marginBottom: scale(10),
    marginHorizontal: scale(20),
  },
  noSubject: {
    height: scale(100),
    borderWidth: 1,
    borderColor: "#b8b8d2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(8),
    marginVertical: scale(10),
  },
});
