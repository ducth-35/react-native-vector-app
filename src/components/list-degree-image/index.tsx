import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import TextApp from "../textApp";
import { HomeSVG } from "@/asset";
import { HIT_SLOP } from "@/utils/helper";
import { scale } from "@/common/scale";
import FastImage from "react-native-fast-image";
import { ModalizeCamera } from "../modal/modal-camera";
import { ModalViewerImage } from "../modal/modal-image-viewer";
import { isUndefined } from "lodash";
import { UploadService } from "@/services/upload-image";

type Props = {
  label: string;
  updateListDegree?: (data: ImageInterface[]) => void;
  listImage?: ImageInterface[] | undefined;
};

export const ListDegreeImage = ({
  label,
  listImage,
  updateListDegree,
}: Props) => {
  const { uploadImage } = UploadService.useUploadImage();
  const [listDegree, setListDegree] = React.useState<ImageInterface[]>(
    listImage || []
  );
  const [degreeSelected, setDegreeSelected] = React.useState<{
    item: ImageInterface;
    index: number;
  }>();

  const modalOpenCamera = React.useRef<any>();
  const modalOpenImageViewer = React.useRef<any>();

  const handleOpenCamera = () => {
    modalOpenCamera?.current?.open();
  };

  const closeCameraModal = () => {
    modalOpenCamera?.current?.close();
  };

  const handleUploadImage = async (file: ImageInterface) => {
    if (!isUndefined(file)) {
      const results: any = await uploadImage(file);
      const newData = [...listDegree, results?.data];
      setListDegree(newData);
      // Gọi callback function để cập nhật danh sách ở component cha
      updateListDegree?.(newData as ImageInterface[]);
    }
  };

  const handleShowImage = (item: ImageInterface, index: number) => {
    modalOpenImageViewer.current.open();
    setDegreeSelected((prev) => ({
      ...prev,
      item: item,
      index: index,
    }));
  };

  const closeModalViewImage = () => {
    modalOpenImageViewer.current.close();
  };

  const deleteImage = (indexSelect?: number) => {
    // xoá ảnh theo id
    const updatedListImages = listDegree.filter(
      (item, index) => index !== indexSelect
    );
    setListDegree(updatedListImages);
    updateListDegree?.(updatedListImages as ImageInterface[]);
    closeModalViewImage?.();
  };

  return (
    <View>
      {listDegree?.length <= 0 ? (
        <View style={{ marginHorizontal: scale(20), marginTop: scale(20) }}>
          <TextApp preset="text14">{label}</TextApp>
          <Pressable
            style={styles.noImage}
            hitSlop={HIT_SLOP}
            onPress={handleOpenCamera}
          >
            <HomeSVG.CAMERA width={scale(40)} height={scale(40)} />
          </Pressable>
        </View>
      ) : (
        <View style={{ marginHorizontal: scale(20) }}>
          <View style={styles.viewTakeImage}>
            <TextApp preset="text14">{label}</TextApp>
            <Pressable hitSlop={HIT_SLOP} onPress={handleOpenCamera}>
              <HomeSVG.CAMERA />
            </Pressable>
          </View>
          <View style={styles.listImage}>
            {listDegree?.map((item, index) => (
              <Pressable
                key={index}
                style={styles.viewImage}
                onPress={() => handleShowImage(item, index)}
              >
                <FastImage
                  source={{ uri: item?.url }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </Pressable>
            ))}
          </View>
        </View>
      )}
      <ModalizeCamera
        ref={modalOpenCamera}
        callbackFunc={handleUploadImage}
        optionCameraPicker={styles.optionCameraPicker}
        optionGalleryPicker={styles.optionGalleryPicker}
        closeModal={closeCameraModal}
      />
      <ModalViewerImage
        ref={modalOpenImageViewer}
        closeModal={closeModalViewImage}
        deleteImage={deleteImage}
        imageData={degreeSelected}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  listImage: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: scale(10),
  },
  noImage: {
    height: scale(100),
    borderWidth: 1,
    borderColor: "#b8b8d2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(8),
    marginVertical: scale(10),
  },
  optionCameraPicker: {
    width: 335,
    height: 335,
    cropping: true,
    // cropperCircleOverlay: true,
    mediaType: "photo",
    useFrontCamera: true,
  },
  optionGalleryPicker: {
    width: 335,
    height: 335,
    cropping: true,
    // cropperCircleOverlay: true,
    mediaType: "photo",
  },
  viewImage: {
    width: scale(100),
    height: scale(100),
    marginHorizontal: scale(3),
    marginBottom: scale(10),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  viewTakeImage: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: scale(20),
    marginBottom: scale(20),
  },
});
