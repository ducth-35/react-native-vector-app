import { HomeSVG } from "@/asset";
import { ImageAsset } from "@/asset/image";
import { dispatch } from "@/common/redux";
import { SCREEN_HEIGHT, scale } from "@/common/scale";
import { LoadingView } from "@/components/loading-view";
import PincodeInput from "@/components/pincode-input";
import TextApp from "@/components/textApp";
import { formattedPhoneNumber } from "@/network/utils";
import {
  authErrorSelector,
  authLoadingSelector,
  selectDeviceToken,
  userInforSelector,
} from "@/store/auth/authSelector";
import { authAction } from "@/store/auth/authSlice";
import { signIn } from "@/store/auth/middleware/auth.action";
import { isNullOrEmpty } from "@/utils/method";
import ToastUtils from "@/utils/toastUtils";
import React from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import { ModalLogin } from "../modal";
import { navigate } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";

export const LoginScreen = () => {
  const authLoading = useSelector(authLoadingSelector);
  const errorMsgSelector = useSelector(authErrorSelector);
  const deviceToken = useSelector(selectDeviceToken);

  const user = useSelector(userInforSelector);
  const pincodeInput = React.useRef<any>(null);
  const [pin, setPin] = React.useState("");
  const [showLogin, setShowLogin] = React.useState<boolean>(false);

  const handleOnTextChange = (pin: string) => {
    setPin(pin);
  };

  const handleValid = () => {
    dispatch(
      signIn({
        phoneNumber: user?.phoneNumber,
        password: pin,
        deviceToken: deviceToken,
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

  const handleLoginNewAccount = () => {
    setShowLogin(true);
  };

  const handleConfirmLoginAccount = () => {
    setShowLogin(false);
    navigate(APP_SCREEN.INPUT_NUMBER_SCREEN, { isLogin: false });
  };

  const handleCancelLoginAccount = () => {
    setShowLogin(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <FastImage
          source={ImageAsset.login_bg}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.viewInfor}>
            {isNullOrEmpty(user?.avatar) ? (
              <HomeSVG.AVATAR_DEFAULT width={scale(52)} height={scale(52)} />
            ) : (
              <FastImage source={{ uri: user?.avatar }} style={styles.avatar} />
            )}

            <View style={{ marginLeft: scale(20) }}>
              <TextApp preset="text18_white">Hi, {user?.fullName}</TextApp>
              <TextApp preset="text14_white" style={{ marginTop: scale(5) }}>
                {formattedPhoneNumber(user?.phoneNumber)}
              </TextApp>
            </View>
          </View>
        </FastImage>
        <View style={styles.body}>
          <TextApp preset="text18" style={{ fontWeight: "600" }}>
            Nhập mật khẩu để đăng nhập
          </TextApp>
          <PincodeInput
            ref={pincodeInput}
            length={6}
            pin={pin}
            onTextChange={handleOnTextChange}
            onValid={handleValid}
          />
          {!isNullOrEmpty(errorMsgSelector) && (
            <View style={styles.errorView}>
              <TextApp preset="text14tomato">{errorMsgSelector}</TextApp>
            </View>
          )}
          <Pressable style={{ marginTop: scale(50) }}>
            <TextApp preset="text14">Quên mật khẩu ?</TextApp>
          </Pressable>
          <Pressable
            style={{ marginTop: scale(10) }}
            onPress={handleLoginNewAccount}
          >
            <TextApp preset="text14">Đăng nhập tài khoản khác</TextApp>
          </Pressable>
        </View>
        {authLoading && <LoadingView />}
        <ModalLogin
          visible={showLogin}
          handleOk={handleConfirmLoginAccount}
          handleCancel={handleCancelLoginAccount}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    height: SCREEN_HEIGHT / 4,
    justifyContent: "center",
  },
  viewInfor: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(35),
  },
  body: {
    position: "absolute",
    top: SCREEN_HEIGHT / 5,
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: "#fff",
    height: SCREEN_HEIGHT,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    alignItems: "center",
    paddingHorizontal: scale(25),
    paddingTop: scale(50),
  },
  flexContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  viewPass: {
    flex: 1,
  },
  errorView: {
    minHeight: scale(40),
    marginBottom: scale(20),
  },
  txt_error: { fontSize: scale(11), fontWeight: "400" },
  avatar: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(50),
  },
});
