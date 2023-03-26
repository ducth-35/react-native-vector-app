import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import TextApp from "../../../components/textApp";
import { scale } from "../../../common/scale";
import { FontFamily } from "../../../common/constant";
import { Button } from "../../../components/btn";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

export const VerifyNumberScreen = () => {
  const [value, setValue] = React.useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewHeader}>
        <TextApp style={styles.textHeader1}>Xác thực</TextApp>
        <TextApp>
          Vui lòng nhập mã xác thực được gửi đến số điện thoại của bạn.
        </TextApp>
      </View>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      <View style={{ marginTop: scale(20) }}>
        <TextApp> 23 giây</TextApp>
      </View>

      <Button title="Xác nhận" style={styles.btn} />
      <Pressable style={styles.reSend}>
        <TextApp style={styles.textResend}> Gửi lại</TextApp>
      </Pressable>
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
  },
  textHeader1: {
    fontFamily: FontFamily.poppins_regular,
    fontSize: scale(28),
    marginBottom: scale(10),
  },
  btn: {
    marginTop: scale(50),
  },

  root: { padding: 20, minHeight: 300 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cellRoot: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    textAlign: "center",
    borderBottomWidth: 1,
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    borderBottomColor: "gray",
    borderBottomWidth: 2,
  },
  reSend: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(50),
  },
  textResend: {
    color: "red",
    fontFamily: FontFamily.poppins_regular,
  },
});
