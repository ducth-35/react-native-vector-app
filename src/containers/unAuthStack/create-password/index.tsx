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

export const CreatePassword = (props: any) => {
  const phoneNumber = props.route?.params?.phone;

  const pincodeInput = React.useRef<any>(null);
  const [pin, setPin] = React.useState("");

  const handleOnTextChange = (pin: string) => {
    setPin(pin);
  };
  const handleValid = () => {
    navigate(APP_SCREEN.CONFIRM_PASSWORD_SCREEN, {
      phone: phoneNumber,
      password: pin,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Header canBack backIcon={<HomeSVG.CLOSE />} />
        <View style={styles.viewHeader}>
          <TextApp preset="text34BlueNormal">Tạo mật khẩu</TextApp>
          <TextApp preset="text17" style={{ marginTop: scale(5) }}>
            Mật khẩu bảo vệ tài khoản của bạn
          </TextApp>
          <View style={{ marginHorizontal: scale(20) }}>
            <PincodeInput
              ref={pincodeInput}
              length={6}
              autoFocus={true}
              pin={pin}
              onTextChange={handleOnTextChange}
              onValid={handleValid}
            />
          </View>
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
});
