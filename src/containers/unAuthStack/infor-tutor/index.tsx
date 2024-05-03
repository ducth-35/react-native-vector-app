import { HomeSVG } from "@/asset";
import { ImageAsset } from "@/asset/image";
import {
  requestCameraPermission,
  requestMediaPermission,
} from "@/common/permission";
import { scale } from "@/common/scale";
import { Button } from "@/components/btn";
import { InputRegister } from "@/components/input-register";
import { ModalizeFilter } from "@/components/modal/Modalize-filter";
import { ModalizeAddSubjects } from "@/components/modal/modal-add-subjects";
import { ModalizeCamera } from "@/components/modal/modal-camera";
import { ModalSelectLocation } from "@/components/modal/modal-location";
import TextApp from "@/components/textApp";
import { useGetSchool } from "@/services/school";
import { userInforSelector } from "@/store/auth/authSelector";
import { Filter } from "@/utils/enum";
import { HIT_SLOP, parserLiteracy } from "@/utils/helper";
import { isNullOrEmpty } from "@/utils/method";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useUpdateInforTutor } from "./services";
import { isUndefined } from "lodash";
import { UploadService } from "@/services/upload-image";
import { ListDegreeImage } from "@/components/list-degree-image";

const LEVEL = {
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
};

export const RegisterInforTutor = () => {
  const user = useSelector(userInforSelector);
  const { uploadImage } = UploadService.useUploadImage();
  const { state, updateInforTutor } = useUpdateInforTutor();
  const { schools } = useGetSchool(undefined);

  const schoolSelect = {
    label: "Đơn vị công tác",
    item: schools,
  };

  const [selectedItemSubjects, setSelectedItemSubjects] =
    React.useState<subjectsInterface | null>(null);
  const [selectedIndexItemSubjects, setSelectedIndexItemSubjects] =
    React.useState<number>(0);

  const [isEditing, setIsEditing] = React.useState(false);

  const [dataModal, setDataModal] = React.useState<{
    label: string;
    item: string[];
  }>({
    label: "",
    item: [],
  });
  const [selectedLevelItems, setSelectedLevelItems] = React.useState<string[]>(
    []
  );
  const [subjectInfor, setSubjectInfor] = React.useState<subjectsInterface[]>(
    []
  );
  const [avatar, setAvatar] = React.useState<{
    fileName: string;
    url: string;
  }>({
    fileName: "",
    url: user?.avatar,
  });

  const [address, setAddress] = React.useState<{
    fullname: string | undefined;
    locationId: string | undefined;
  }>({
    fullname: "",
    locationId: "",
  });
  const [selectedSchoolItems, setSelectedSchoolItems] = React.useState<
    string[]
  >([]);
  const [literacyImages, setLiteracyImages] = React.useState<ImageInterface[]>(
    []
  );

  const [inputInfor, setInputInfor] = React.useState<{
    name: string;
    phone: string;
    email?: string | undefined;
    school?: string | undefined;
  }>({
    name: user?.fullName,
    phone: user?.phoneNumber,
    email: undefined,
    school: undefined,
  });
  const modalizeLevelRef = React.useRef<any>();
  const modalizeAddSubjectRef = React.useRef<any>();
  const modalizeSchoolRef = React.useRef<any>();
  const modalOpenCamera = React.useRef<any>();
  const modalOpenSelectLocation = React.useRef<any>();
  const inputRef = React.useRef<{
    experience: string;
    numberOfStudent: number;
    introduction: string;
    teachingMethod: string;
  }>({
    experience: "",
    numberOfStudent: 0,
    introduction: "",
    teachingMethod: "",
  });

  const handleOpenModal = (type: string) => {
    switch (type) {
      case Filter.LEVEL:
        modalizeLevelRef.current.open();
        setDataModal(LEVEL);
        break;
      case Filter.SCHOOL:
        modalizeSchoolRef.current.open();
        setDataModal(schoolSelect);
        break;
      default:
        break;
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

  const handleConfirmSubject = (
    data?: subjectsInterface,
    selectedIndex?: number,
    isEdit?: boolean
  ) => {
    if (!isEdit) {
      const updatedSubjectInfor = [...subjectInfor, data];
      setSubjectInfor(updatedSubjectInfor as subjectInterface[]);
    }
  };

  const handleUpdateTutor = () => {
    const params = {
      fullName: inputInfor?.name,
      email: inputInfor?.email,
      avatar: !isNullOrEmpty(avatar?.fileName) ? avatar?.fileName : undefined,
      locationId: address?.locationId,
      location: address?.fullname,
      literacy: parserLiteracy(selectedLevelItems),
      school:
        selectedSchoolItems.length > 0 ? selectedSchoolItems[0] : undefined,
      subjects: subjectInfor,
      introduction: inputRef?.current?.introduction,
      teachingMethod: inputRef?.current?.teachingMethod,
      literacyImages: literacyImages,
      experience: inputRef?.current?.experience,
      numberOfStudent: inputRef?.current?.numberOfStudent,
    };
    updateInforTutor(params);
  };

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

  const updateListDegree = (data: ImageInterface[]) => {
    setLiteracyImages(data);
  };

  const isButtonDisabled =
    isNullOrEmpty(inputInfor?.name) ||
    isNullOrEmpty(inputInfor?.email) ||
    isNullOrEmpty(address?.locationId) ||
    isNullOrEmpty(address?.fullname) ||
    isNullOrEmpty(parserLiteracy(selectedLevelItems)) ||
    selectedSchoolItems.length <= 0 ||
    subjectInfor.length <= 0 ||
    isNullOrEmpty(inputRef?.current?.introduction) ||
    isNullOrEmpty(inputRef?.current?.teachingMethod) ||
    isNullOrEmpty(inputRef?.current?.experience) ||
    isNullOrEmpty(inputRef?.current?.numberOfStudent) ||
    literacyImages.length <= 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TextApp preset="text34BlueNormal">Thông tin</TextApp>
          <TouchableOpacity
            style={styles.viewAvatar}
            onPress={handleModalCamera}
          >
            {!isNullOrEmpty(avatar) ? (
              <FastImage source={{ uri: avatar?.url }} style={styles.avatar} />
            ) : (
              <HomeSVG.AVATAR_DEFAULT width={68} height={68} />
            )}
            <View style={styles.viewCamera}>
              <HomeSVG.CAMERA />
            </View>
          </TouchableOpacity>
        </View>
        <InputRegister
          lable="Tên bạn"
          placeholder="Nhập tên bạn"
          value={inputInfor?.name}
          onChangeText={(value) =>
            setInputInfor((prevState) => ({
              ...prevState,
              name: value as string,
            }))
          }
        />
        <InputRegister
          lable="Số điện thoại"
          placeholder="Nhập số điện thoại"
          editable={false}
          value={inputInfor?.phone}
        />
        <InputRegister
          lable="Email"
          placeholder="Email của bạn"
          value={inputInfor?.email}
          onChangeText={(value) =>
            setInputInfor((prevState) => ({
              ...prevState,
              email: value as string,
            }))
          }
        />
        <InputRegister
          lable="Địa chỉ"
          placeholder="Địa chỉ chỗ ở hiện tại"
          value={address?.fullname}
          editable={false}
          onPress={handleOpenSelectLocation}
          onPressIn={handleOpenSelectLocation}
          isSelect
        />
        <InputRegister
          lable="Trình độ học vấn"
          placeholder="Trình độ của bạn"
          editable={false}
          isSelect
          onPressIn={handleOpenModal.bind(null, Filter.LEVEL)}
          value={selectedLevelItems}
        />
        <InputRegister
          lable="Đơn vị công tác"
          placeholder="Đơn vị công tác"
          editable={false}
          isSelect
          onPressIn={() => handleOpenModal(Filter.SCHOOL)}
          onPress={() => handleOpenModal(Filter.SCHOOL)}
          value={selectedSchoolItems}
        />
        <InputRegister
          lable="Kinh nghiệm dạy gia sư"
          placeholder="Thêm kinh nghiệm"
          keyboardType={"number-pad"}
          rightLable={<TextApp preset="text14Medium">Tháng</TextApp>}
          onChangeText={(value) =>
            (inputRef.current.experience = value.toString())
          }
        />
        <InputRegister
          lable="Học sinh đã dạy"
          placeholder="Thêm số học sinh"
          keyboardType={"number-pad"}
          rightLable={<TextApp preset="text14Medium">Học sinh</TextApp>}
          onChangeText={(value) =>
            (inputRef.current.numberOfStudent = Number(value))
          }
        />
        <InputRegister
          lable="Giới thiệu"
          placeholder="Nhập giới thiệu (không quá 150 từ)"
          newStyleInput={styles.inputIntro}
          multiline={true}
          maxLength={150}
          onChangeText={(value) =>
            (inputRef.current.introduction = value.toString())
          }
        />
        <InputRegister
          lable="Phương pháp dạy học"
          placeholder="Phương pháp dạy học của bạn (không quá 150 từ)"
          newStyleInput={styles.inputIntro}
          multiline={true}
          maxLength={150}
          onChangeText={(value) =>
            (inputRef.current.teachingMethod = value.toString())
          }
        />
        <ListDegreeImage
          label="Ảnh chụp bằng cấp liên quan"
          updateListDegree={updateListDegree}
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
                  value={`${item?.subject} - Lớp ${item?.grade} - ${item?.price}`}
                  // onPress={() => handleSelectItemSubjects(item, index)}
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
        <TouchableOpacity
          style={[styles.done, isButtonDisabled && styles.newBtn]}
          onPress={handleUpdateTutor}
          disabled={isButtonDisabled}
        >
          {state?.loading ? (
            <ActivityIndicator color={"#fff"} />
          ) : (
            <TextApp
              style={[styles.textdone, isButtonDisabled && styles.newTextBtn]}
            >
              Hoàn thành
            </TextApp>
          )}
        </TouchableOpacity>
      </ScrollView>
      <ModalizeFilter
        ref={modalizeLevelRef}
        data={dataModal}
        handleClose={() => modalizeLevelRef.current.close()}
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
  },
  contentContainer: {
    flex: 1,
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
  done: {
    alignItems: "center",
    backgroundColor: "#3d5cff",
    paddingVertical: scale(13),
    marginHorizontal: scale(20),
    borderRadius: scale(12),
    marginBottom: scale(30),
    marginTop: scale(20),
  },
  textdone: {
    color: "#fff",
  },
  newBtn: {
    backgroundColor: "#f4f3fd",
  },
  newTextBtn: {
    color: "#b8b8d2",
  },
});
