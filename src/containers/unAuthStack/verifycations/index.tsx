import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import TextApp from "../../../components/textApp";
import { scale } from "../../../common/scale";
import { FontFamily } from "../../../common/constant";
import { CountDown } from "./countdown";
import { Otp } from "@/components/otp";
import { dispatch } from "@/common/redux";
import { verifyOTP } from "@/store/auth/middleware/auth.action";
import { isNullOrEmpty } from "@/utils/method";
import { useSelector } from "react-redux";
import { authErrorSelector } from "@/store/auth/authSelector";
import { Button } from "@/components/btn";
import { Header } from "@/components/header";
import { HomeSVG } from "@/asset";

export const VerifyOTPScreen = (props: any) => {
  const errorMsgSelector = useSelector(authErrorSelector);
  const { phone } = props?.route?.params || 0;
  const otpRef = React.useRef("");

  const onChangeOtp = (value: string) => {
    otpRef.current = value;
  };
  const onContinue = () => {
    dispatch(verifyOTP({ phoneNumber: phone, otpCode: otpRef.current }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Header canBack backIcon={<HomeSVG.BACK />} />
        <View style={styles.viewHeader}>
          <TextApp style={styles.textHeader1}>Xác thực</TextApp>
          <TextApp style={{ color: "#000", textAlign: "center" }}>
            Vui lòng nhập mã xác thực được gửi đến số điện thoại của bạn.
          </TextApp>
        </View>
        <View style={{ marginHorizontal: scale(20) }}>
          <View style={styles.OTPField}>
            <Otp
              length={6}
              containerStyle={styles.OtpView}
              onChangeOtp={onChangeOtp}
              onOtpValid={onContinue}
              wrapInputStyle={styles.err_border}
            />
          </View>
          {!isNullOrEmpty(errorMsgSelector) && (
            <View style={styles.errorView}>
              <TextApp preset="text14tomato">{errorMsgSelector}</TextApp>
            </View>
          )}
          <CountDown phoneNumber={phone} handleConfirm={onContinue} />
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
    paddingHorizontal: scale(20),
  },
  textHeader1: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 34,
    marginBottom: scale(10),
    color: "#000",
    textAlign: "center",
  },
  OTPField: {},
  OtpView: { marginTop: scale(40) },
  err_border: { borderColor: "#FF5050" },
  errorView: {
    minHeight: scale(40),
    marginBottom: scale(10),
  },
});
