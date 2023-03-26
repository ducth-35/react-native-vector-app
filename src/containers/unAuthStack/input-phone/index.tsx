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
  const handleVerify = () => {
    navigate(APP_SCREEN.VERIFY_NUMBER_SCREEN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewHeader}>
        <TextApp style={styles.textHeader1}>Nhập số điện thoại</TextApp>
        <TextApp> Nhập số điện thoại của bạn</TextApp>
      </View>
      <View style={styles.viewInput}>
        <TextInput
          placeholder="Số điện thoại"
          style={styles.input}
          keyboardType="numeric"
        />
      </View>
      <Button title="Tiếp tục" style={styles.btn} onPress={handleVerify} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: scale(30),
  },
  viewHeader: {
    marginTop: scale(50),
    alignItems: "center",
  },
  textHeader1: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: scale(28),
    marginBottom: scale(10),
  },
  viewInput: {
    width: "100%",
    alignItems: "center",
    padding: scale(10),
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginTop: scale(50),
  },
  input: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: scale(16),
  },
  btn: {
    marginTop: scale(50),
  },
});
