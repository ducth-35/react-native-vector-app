import { scale } from "@/common/scale";
import { Button } from "@/components/btn";
import TextApp from "@/components/textApp";
import { compareVersions } from "@/utils";
import { ANDROID_STORE_LINK, IOS_STORE_LINK } from "@/utils/enum";
import { isIos } from "@/utils/method";
import React from "react";
import { Linking, Modal, StyleSheet, View } from "react-native";
import VersionCheck from "react-native-version-check";
import { version } from "../../../../package.json";

export const ModalUpdateApp = () => {
  const [visible, setVisible] = React.useState<boolean>(false);

  const handleUpdateNow = () => {
    Linking.openURL(isIos ? IOS_STORE_LINK : ANDROID_STORE_LINK);
  };

  React.useEffect(() => {
    VersionCheck.getLatestVersion({
      provider: isIos ? "appStore" : "playStore",
    }).then(async (latestVersion: string) => {
      const isNeedUpdate = compareVersions(version, latestVersion);
      if (isNeedUpdate) {
        setVisible(!visible);
      }
    });
  }, []);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={style.container}>
        <View style={style.contentContainer}>
          <TextApp preset="text14" style={{ textAlign: "center" }}>
            Vector đã có phiên bản mới{"\n"}Quý khách hãy cập nhật ngay{"\n"}để
            có trải nghiệm tốt hơn nhé !
          </TextApp>
          <Button
            preset="blue"
            title="Cập nhật ngay"
            style={{ marginTop: scale(20) }}
            onPress={handleUpdateNow}
          />
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(41, 41, 41, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(50),
  },
  contentContainer: {
    borderRadius: scale(20),
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
    marginTop: scale(10),
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
});
