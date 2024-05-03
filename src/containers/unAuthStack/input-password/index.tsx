import { HomeSVG } from "@/asset";
import { dispatch } from "@/common/redux";
import { scale } from "@/common/scale";
import { Header } from "@/components/header";
import { LoadingView } from "@/components/loading-view";
import { Otp } from "@/components/otp";
import PincodeInput from "@/components/pincode-input";
import TextApp from "@/components/textApp";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import {
  authErrorSelector,
  authLoadingSelector,
  selectDeviceToken,
} from "@/store/auth/authSelector";
import { authAction } from "@/store/auth/authSlice";
import { signIn } from "@/store/auth/middleware/auth.action";
import { isNullOrEmpty } from "@/utils/method";
import React from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export const InputPassword = (props: any) => {
  const phoneNumber = props.route?.params?.phone;
  const authLoading = useSelector(authLoadingSelector);
  const errorMsgSelector = useSelector(authErrorSelector);
  const deviceToken = useSelector(selectDeviceToken);

  const pincodeInput = React.useRef<any>(null);
  const [pin, setPin] = React.useState("");

  const handleOnTextChange = (pin: string) => {
    setPin(pin);
  };
  const handleValid = () => {
    dispatch(
      signIn({
        phoneNumber: phoneNumber,
        password: pin,
        deviceToken: deviceToken
      })
    );
  };

  React.useEffect(() => {
    //clear error
    dispatch(authAction.clearLoadingErrorAuth());
  }, []);

  React.useEffect(() => {
    if (errorMsgSelector) {
      setPin("");
    }
  }, [errorMsgSelector]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Header canBack backIcon={<HomeSVG.CLOSE />} />
        <View style={styles.viewHeader}>
          <TextApp preset="text34BlueNormal">Nhập mật khẩu</TextApp>
          <TextApp preset="text17" style={{ marginTop: scale(5) }}>
            Mật khẩu bảo vệ tài khoản của bạn
          </TextApp>
          <View style={{ marginHorizontal: scale(20), alignItems: "center" }}>
            <PincodeInput
              ref={pincodeInput}
              length={6}
              autoFocus={true}
              pin={pin}
              onTextChange={handleOnTextChange}
              onValid={handleValid}
            />
            {!isNullOrEmpty(errorMsgSelector) && (
              <View style={styles.errorView}>
                <TextApp preset="text14tomato">{errorMsgSelector}</TextApp>
              </View>
            )}
          </View>
        </View>
        {authLoading && <LoadingView />}
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
  viewInfor: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(35),
  },
  errorView: {
    minHeight: scale(40),
    marginBottom: scale(20),
  },
});
