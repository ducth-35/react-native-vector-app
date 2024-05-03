import { HomeSVG } from "@/asset";
import { SCREEN_HEIGHT, scale } from "@/common/scale";
import TextApp from "@/components/textApp";
import { HIT_SLOP } from "@/utils/helper";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
// import ImageViewer from "react-native-image-zoom-viewer";
import FastImage from "react-native-fast-image";

type Props = {
  closeModal?: () => void;
  deleteImage?: (index?: number) => void;
  imageData?: {
    item: ImageInterface;
    index: number;
  };
};

export const ModalViewerImage = React.forwardRef(
  ({ closeModal, deleteImage, imageData }: Props, ref) => {
    return (
      <Portal>
        <Modalize
          modalStyle={styles.container}
          ref={ref}
          adjustToContentHeight={true}
          handleStyle={{
            display: "none",
          }}
          panGestureEnabled={false}
          closeOnOverlayTap={false}
          disableScrollIfPossible={true}
        >
          <View style={styles.viewHeader}>
            <Pressable hitSlop={HIT_SLOP} onPress={closeModal}>
              <HomeSVG.BACK />
            </Pressable>
            <Pressable
              hitSlop={HIT_SLOP}
              onPress={() => deleteImage?.(imageData?.index)}
            >
              <TextApp preset="text14BlueBold">Xoá</TextApp>
            </Pressable>
          </View>
          <View style={styles.viewImage}>
            <FastImage
              source={{ uri: imageData?.item?.url }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </Modalize>
      </Portal>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    minHeight: "100%",
  },
  viewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: scale(15),
    marginTop: scale(10),
  },
  image: {
    width: scale(335),
    height: scale(335),
  },
  viewImage: {
    marginTop: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});
