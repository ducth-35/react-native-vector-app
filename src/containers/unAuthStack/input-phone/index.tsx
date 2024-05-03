import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import TextApp from "../../../components/textApp";
import { scale } from "../../../common/scale";
import { FontFamily } from "../../../common/constant";
import { Button } from "../../../components/btn";
import { validatePhoneNumber } from "@/utils/validate";
import { dispatch } from "@/common/redux";
import { createOTP } from "@/store/auth/middleware/auth.action";
import { useSelector } from "react-redux";
import { authLoadingSelector, authenStateSelector } from "@/store/auth/authSelector";
import { authAction } from "@/store/auth/authSlice";
import { navigate, replaceNavigation } from "@/navigators/navigation-services";
import { APP_SCREEN } from "@/navigators/screen-type";
import { HIT_SLOP } from "@/utils/helper";
import authService from '@/services/auth';

interface phoneNumberInterface {
  phoneNumber: string;
}

export const InputNumberScreen = (props: any) => {
  const isLogin = props.route?.params?.isLogin;
  const authLoading = useSelector(authLoadingSelector);
  const userInfor = React.useRef<phoneNumberInterface>({
    phoneNumber: "",
  });
  const phoneInputRef: React.RefObject<TextInput> = React.createRef();

  const [errorPhone, setErrorPhone] = React.useState("");

  const onChangeText = (value: string) => {
    userInfor.current.phoneNumber = value;
  };

  const isSignIn = useSelector(authenStateSelector);

  React.useEffect(() => {
    if (isSignIn === false) {
      authService.handleUpdateFcmToken();
    }
  }, [isSignIn])


  const handleValidate = (fieldName: string) => {
    let error = "";
    if (fieldName === "PHONE") {
      error = validatePhoneNumber(userInfor.current?.phoneNumber);
      setErrorPhone(error);
    }
    return error === "";
  };

  const handleOnBlurPhoneNumber = () => {
    handleValidate("PHONE");
  };
  const handleFocusPhoneNumber = () => {
    handleRemoveError("PHONE");
  };

  const handleSubmit = () => {
    phoneInputRef.current?.focus();
  };

  const handleVerify = () => {
    if (handleValidate("PHONE")) {
      if (!isLogin) {
        navigate(APP_SCREEN.INPUT_PASSWORD_SCREEN, {
          phone: userInfor.current.phoneNumber,
        });
      } else {
        dispatch(createOTP({ phoneNumber: userInfor.current.phoneNumber }));
      }
    }
  };

  const handleRemoveError = (fieldName: string) => {
    dispatch(authAction.clearLoadingErrorAuth());
    if (fieldName === "PHONE") {
      setErrorPhone("");
    }
  };

  const onPress = () => {
    if (!isLogin) {
      replaceNavigation(APP_SCREEN.INPUT_NUMBER_SCREEN, { isLogin: true });
    } else {
      replaceNavigation(APP_SCREEN.INPUT_NUMBER_SCREEN, { isLogin: false });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.viewHeader}>
          <TextApp style={styles.textHeader1}>Nhập số điện thoại</TextApp>
          <TextApp style={{ color: "#000" }}>
            Nhập số điện thoại của bạn
          </TextApp>
        </View>
        <View style={styles.viewInputPhone}>
          <TextApp style={styles.textLableName}>Số điện thoại</TextApp>
          <View
            style={[styles.viewInput, errorPhone && styles.inputError] as any}
          >
            <TextInput
              placeholder="Nhập số điện thoại..."
              style={styles.input}
              keyboardType="number-pad"
              onFocus={handleFocusPhoneNumber}
              onBlur={handleOnBlurPhoneNumber}
              // autoFocus={true}
              onChangeText={onChangeText}
              onSubmitEditing={handleSubmit}
            />
          </View>
          {errorPhone && (
            <TextApp style={styles.textError}>{errorPhone}</TextApp>
          )}
        </View>
        <View style={styles.viewDone}>
          <Button
            title="Xác nhận"
            style={styles.btn}
            onPress={handleVerify}
            isLoading={authLoading}
            disabled={authLoading}
          />
        </View>
        <Pressable
          style={{
            marginTop: scale(20),
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={onPress}
        >
          {!isLogin ? (
            <TextApp preset="text14">Đăng kí ngay</TextApp>
          ) : (
            <TextApp preset="text14">Đăng nhập ngay</TextApp>
          )}
        </Pressable>
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
    marginTop: scale(50),
    marginHorizontal: scale(20),
  },
  textHeader1: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 28,
    marginBottom: scale(10),
    color: "#000",
  },
  viewInput: {
    borderColor: "#B8B8D2",
    borderWidth: 1,
    height: Platform.OS === "ios" ? scale(45) : scale(50),
    justifyContent: "center",
    borderRadius: 5,
    paddingHorizontal: scale(10),
  },
  input: {
    fontFamily: FontFamily.SFUIText_regular,
    fontSize: 14,
  },
  btn: {
    marginTop: scale(30),
  },
  textLableName: {
    color: "#858597",
    marginBottom: scale(5),
  },
  viewInputPhone: {
    marginTop: scale(50),
    marginHorizontal: scale(20),
  },
  viewDone: {
    marginHorizontal: scale(20),
  },
  inputError: {
    borderColor: "#e83f3f",
  },
  textError: {
    color: "#e83f3f",
    fontSize: 14,
    marginTop: scale(10),
  },
});
