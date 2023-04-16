import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TextInput, View } from "react-native";
import TextApp from "../../../components/textApp";
import { scale } from "../../../common/scale";
import { FontFamily } from "../../../common/constant";
import { Button } from "../../../components/btn";
import { navigate } from "../../../navigators/navigation-services";
import { APP_SCREEN } from "../../../navigators/screen-type";

export const InputNumberScreen = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(APP_SCREEN.VERIFY_NUMBER_SCREEN);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewHeader}>
        <TextApp style={styles.textHeader1}>Nhập số điện thoại</TextApp>
        <TextApp> Nhập số điện thoại của bạn</TextApp>
      </View>
      <View style={styles.viewInputPhone}>
        <TextApp style={styles.textLableName}>Số điện thoại</TextApp>
        <View style={styles.viewInput}>
          <TextInput
            placeholder="Nhập số điện thoại"
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.viewDone}>
        <Button
          title="Xác nhận"
          style={styles.btn}
          onPress={handleVerify}
          isLoading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewHeader: {
    marginTop: scale(50),
    marginHorizontal: scale(30),
  },
  textHeader1: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: 28,
    marginBottom: scale(10),
  },
  viewInput: {
    borderColor: "#B8B8D2",
    borderWidth: 1,
    padding: scale(10),
    borderRadius: 5,
  },
  input: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: 16,
  },
  btn: {
    marginTop: scale(50),
  },
  textLableName: {
    color: "#858597",
    marginBottom: scale(10),
  },
  viewInputPhone: {
    marginTop: scale(50),
    marginHorizontal: scale(30),
  },
  viewDone: {
    marginHorizontal: scale(30),
  },
});
