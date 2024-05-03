import { HomeSVG } from "@/asset";
import { scale } from "@/common/scale";
import { Header } from "@/components/header";
import { Otp } from "@/components/otp";
import PincodeInput from "@/components/pincode-input";
import TextApp from "@/components/textApp";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import React from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const ConfirmPassword = (props: any) => {
  const { phone, password } = props.route?.params;

  const pincodeInput = React.useRef<any>(null);
  const [pin, setPin] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleOnTextChange = (pin: string) => {
    setPin(pin);
  };

  const handleValid = () => {
    if (pin !== password) {
      setErrorMessage("Mật khẩu không đúng");
    } else {
      navigate(APP_SCREEN.SELECT_ACCOUNT_TYPE_SCREEN, {
        phone: phone,
        password: password,
        confirmPassword: pin,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Header canBack backIcon={<HomeSVG.CLOSE />} />
        <View style={styles.viewHeader}>
          <TextApp preset="text34BlueNormal">Xác nhận mật khẩu</TextApp>
          <TextApp preset="text17" style={{ marginTop: scale(5) }}>
            Nhập lại mật khẩu
          </TextApp>
          <View style={{ marginHorizontal: scale(20) }}>
            <PincodeInput
              ref={pincodeInput}
              length={6}
              pin={pin}
              autoFocus={true}
              onTextChange={handleOnTextChange}
              onValid={handleValid}
            />
          </View>
          {errorMessage !== "" && (
            <TextApp preset="text14tomato" style={styles.txtError}>
              Mật khẩu không đúng
            </TextApp>
          )}

          <TextApp preset="text14Normal">
            Vui lòng không chia sẻ mật khẩu với bất kì ai
          </TextApp>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(10),
  },
  OtpView: { marginVertical: scale(40) },
  err_border: { borderColor: "#FF5050" },
  txtError: {
    marginBottom: scale(20),
  },
});
