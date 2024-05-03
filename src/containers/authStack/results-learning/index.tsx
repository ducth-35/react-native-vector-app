import { SCREEN_WIDTH, scale } from "@/common/scale";
import { Header } from "@/components/header";
import { InputRegister } from "@/components/input-register";
import TextApp from "@/components/textApp";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { AirbnbRating } from "react-native-ratings";
import { Button } from "@/components/btn";
import { HomeSVG } from "@/asset";
import { ModalizeCamera } from "@/components/modal/modal-camera";
import {
  requestCameraPermission,
  requestMediaPermission,
} from "@/common/permission";
import { isNullOrEmpty } from "@/utils/method";
import FastImage from "react-native-fast-image";
import { usePostResultsLearning } from "./services";

type ImageInterface = {
  path: string;
  sourceURL: string;
};

export const CreateResultLearning = (props: any) => {
  const { id } = props?.route?.params || 0;

  const modalOpenCamera = React.useRef<any>();
  const [file, setFile] = React.useState<ImageInterface>();
  const [input, setInput] = React.useState<{
    content: string;
    numberOfTaskComplete: number;
    numberOfTaskWrong: number;
    numberOfTaskNotComplete: number;
    testMark: number;
    learningSpiritNote: string;
    learningAbilityNote: string;
    assignments: string;
  }>({
    content: "",
    numberOfTaskComplete: 0,
    numberOfTaskWrong: 0,
    numberOfTaskNotComplete: 0,
    testMark: 0,
    learningSpiritNote: "",
    learningAbilityNote: "",
    assignments: "",
  });
  const [learningSpirit, setLearningSpirit] = React.useState<number>(0);
  const [learningAbility, setLearningAbility] = React.useState<number>(0);

  const { uploadResultsLearning, loading } = usePostResultsLearning();

  const ratingLearningSpirit = (rating: number) => {
    setLearningSpirit(rating);
  };

  const ratingLearningAbility = (rating: number) => {
    setLearningAbility(rating);
  };

  const handleModalCamera = async () => {
    await requestCameraPermission();
    await requestMediaPermission();
    modalOpenCamera?.current?.open();
  };

  const handleUploadImage = (image: ImageInterface) => {
    setFile(image);
  };

  const colseModal = () => {
    modalOpenCamera?.current?.close();
  };

  const onSubmit = () => {
    const params = {
      eventId: id,
      content: input?.content,
      numberOfTaskComplete: input?.numberOfTaskComplete,
      numberOfTaskWrong: input?.numberOfTaskWrong,
      numberOfTaskNotComplete: input?.numberOfTaskNotComplete,
      testMark: input?.testMark,
      learningSpirit: learningSpirit,
      learningSpiritNote: input?.learningSpiritNote,
      learningAbility: learningAbility,
      learningAbilityNote: input?.learningAbilityNote,
    };
    uploadResultsLearning(file, params);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Kết quả buổi học" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <TextApp preset="text16" style={styles.txthomework}>
            Bài tập về nhà
          </TextApp>
          <InputRegister
            lable="Nội dung bài tập về nhà"
            placeholder="Nhập nội dung..."
            value={input?.content}
            onChangeText={(value) =>
              setInput((prevState) => ({
                ...prevState,
                content: value as string,
              }))
            }
          />
          <InputRegister
            lable="Số bài hoàn thành"
            placeholder="Nhập số bài..."
            keyboardType="number-pad"
            value={input?.numberOfTaskComplete}
            onChangeText={(value) =>
              setInput((prevState) => ({
                ...prevState,
                numberOfTaskComplete: value as number,
              }))
            }
          />
          <InputRegister
            lable="Số bài làm sai"
            placeholder="Nhập số bài làm sai..."
            keyboardType="number-pad"
            value={input?.numberOfTaskWrong}
            onChangeText={(value) =>
              setInput((prevState) => ({
                ...prevState,
                numberOfTaskWrong: value as number,
              }))
            }
          />
          <InputRegister
            lable="Số bài chưa hoàn thành"
            placeholder="Nhập số bài chưa hoàn thành..."
            keyboardType="number-pad"
            value={input?.numberOfTaskNotComplete}
            onChangeText={(value) =>
              setInput((prevState) => ({
                ...prevState,
                numberOfTaskNotComplete: value as number,
              }))
            }
          />
        </View>
        <View style={styles.line} />
        <View>
          <TextApp preset="text16" style={styles.learntoday}>
            Buổi học hôm nay
          </TextApp>
          <InputRegister
            lable="Số điểm kiểm tra (nếu có)"
            placeholder="Nhập số điểm..."
            keyboardType="number-pad"
            value={input?.testMark}
            onChangeText={(value) =>
              setInput((prevState) => ({
                ...prevState,
                testMark: value as number,
              }))
            }
          />
          <TextApp preset="text14" style={styles.txtStar}>
            Tinh thần học
          </TextApp>
          <AirbnbRating
            count={5}
            showRating={false}
            defaultRating={1}
            size={25}
            ratingContainerStyle={{ marginHorizontal: 10 }}
            starContainerStyle={{
              width: SCREEN_WIDTH - 50,
              justifyContent: "space-evenly",
            }}
            onFinishRating={ratingLearningSpirit}
          />
          <InputRegister
            placeholder="Ghi chú..."
            value={input?.learningSpiritNote}
            onChangeText={(value) =>
              setInput((prevState) => ({
                ...prevState,
                learningSpiritNote: value as string,
              }))
            }
          />
          <TextApp preset="text14" style={styles.txtStar}>
            Mức độ tiếp thu
          </TextApp>
          <AirbnbRating
            count={5}
            showRating={false}
            defaultRating={1}
            size={25}
            ratingContainerStyle={{ marginHorizontal: 10 }}
            starContainerStyle={{
              width: SCREEN_WIDTH - 50,
              justifyContent: "space-evenly",
            }}
            onFinishRating={ratingLearningAbility}
          />
          <InputRegister
            placeholder="Ghi chú..."
            value={input?.learningAbilityNote}
            onChangeText={(value) =>
              setInput((prevState) => ({
                ...prevState,
                learningAbilityNote: value as string,
              }))
            }
          />
        </View>

        <View style={{ padding: scale(20) }}>
          <TextApp preset="text14">Bài tâp về nhà</TextApp>
          {!isNullOrEmpty(file) ? (
            <Pressable
              onPress={handleModalCamera}
              style={{ marginTop: scale(5) }}
            >
              <FastImage
                source={{ uri: file?.path }}
                style={styles.image}
                resizeMode="cover"
              />
            </Pressable>
          ) : (
            <Pressable style={styles.viewImage} onPress={handleModalCamera}>
              <HomeSVG.CAMERA />
              <TextApp preset="text14" style={{ marginTop: scale(10) }}>
                Chụp ảnh bài tập về nhà
              </TextApp>
            </Pressable>
          )}
        </View>
        <View style={{ margin: scale(20) }}>
          <Button preset="blue" title="Gửi" onPress={onSubmit} isLoading={loading}/>
        </View>
      </ScrollView>
      <ModalizeCamera
        ref={modalOpenCamera}
        callbackFunc={handleUploadImage}
        optionCameraPicker={styles.optionCameraPicker}
        optionGalleryPicker={styles.optionGalleryPicker}
        closeModal={colseModal}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  line: {
    height: scale(1.5),
    backgroundColor: "#3d5cff",
    marginVertical: scale(25),
    marginHorizontal: scale(20),
  },
  txthomework: {
    textAlign: "center",
    marginTop: scale(20),
  },
  learntoday: {
    textAlign: "center",
  },
  txtStar: {
    margin: scale(20),
  },
  viewImage: {
    height: scale(100),
    borderWidth: 1,
    borderColor: "#b8b8d2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(5),
    marginTop: scale(5),
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
  image: {
    height: scale(200),
  },
});
